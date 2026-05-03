import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { useLang } from "@/lib/language";
import {
  Plus, Pencil, Trash2, Search, Package, ShoppingCart,
  ChefHat, LogOut, Eye, EyeOff, Upload, X, Clock,
  Truck, CheckCircle, AlertCircle
} from "lucide-react";
import { toast } from "sonner";

type MenuItem = Tables<"menu_items">;
type Category = Tables<"categories">;
type Order = Tables<"orders"> & { order_items?: Tables<"order_items">[] };

export const Route = createFileRoute("/admin/dashboard")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const { t } = useLang();
  const [tab, setTab] = useState<"menu" | "orders">("menu");

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate({ to: "/admin/login" });
    }
  }, [user, isAdmin, loading, navigate]);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-background text-foreground">Loading...</div>;
  if (!user || !isAdmin) return null;

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-heading text-3xl font-bold text-foreground">
              Admin <span className="text-gradient-gold">Dashboard</span>
            </h1>
            <p className="text-muted-foreground text-sm mt-1">{user.email}</p>
          </div>
          <button onClick={() => { signOut(); navigate({ to: "/" }); }} className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-xl text-foreground hover:bg-accent transition-colors">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>

        <div className="flex gap-2 mb-8">
          <button onClick={() => setTab("menu")} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition-colors ${tab === "menu" ? "bg-gradient-gold text-primary-foreground" : "bg-card text-foreground hover:bg-accent"}`}>
            <ChefHat className="w-4 h-4" /> Menu Items
          </button>
          <button onClick={() => setTab("orders")} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition-colors ${tab === "orders" ? "bg-gradient-gold text-primary-foreground" : "bg-card text-foreground hover:bg-accent"}`}>
            <ShoppingCart className="w-4 h-4" /> Orders
          </button>
        </div>

        {tab === "menu" ? <MenuManager /> : <OrderManager />}
      </div>
    </div>
  );
}

/* ====== MENU MANAGER ====== */
function MenuManager() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<MenuItem | null>(null);

  const fetchData = async () => {
    const [{ data: menuData }, { data: catData }] = await Promise.all([
      supabase.from("menu_items").select("*").order("sort_order"),
      supabase.from("categories").select("*").order("sort_order"),
    ]);
    setItems(menuData || []);
    setCategories(catData || []);
  };

  useEffect(() => { fetchData(); }, []);

  // Realtime
  useEffect(() => {
    const channel = supabase.channel("menu-realtime").on("postgres_changes", { event: "*", schema: "public", table: "menu_items" }, () => fetchData()).subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  const toggleAvailability = async (item: MenuItem) => {
    await supabase.from("menu_items").update({ is_available: !item.is_available }).eq("id", item.id);
    toast.success(item.is_available ? "Marked out of stock" : "Marked available");
    fetchData();
  };

  const deleteItem = async (id: string) => {
    if (!confirm("Delete this item?")) return;
    await supabase.from("menu_items").delete().eq("id", id);
    toast.success("Item deleted");
    fetchData();
  };

  const filtered = items.filter((i) => {
    const matchSearch = i.name.toLowerCase().includes(search.toLowerCase()) || i.name_ur.includes(search);
    const matchCat = !filterCat || i.category_id === filterCat;
    return matchSearch && matchCat;
  });

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input type="text" placeholder="Search items..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-12 pr-4 py-3 bg-card rounded-xl border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
        </div>
        <select value={filterCat} onChange={(e) => setFilterCat(e.target.value)} className="px-4 py-3 bg-card rounded-xl border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
          <option value="">All Categories</option>
          {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <button onClick={() => { setEditing(null); setShowForm(true); }} className="flex items-center gap-2 px-5 py-3 bg-gradient-gold text-primary-foreground rounded-xl font-semibold hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" /> Add Item
        </button>
      </div>

      {showForm && (
        <MenuItemForm
          item={editing}
          categories={categories}
          onClose={() => { setShowForm(false); setEditing(null); }}
          onSave={() => { setShowForm(false); setEditing(null); fetchData(); }}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((item) => {
          const cat = categories.find((c) => c.id === item.category_id);
          return (
            <div key={item.id} className={`bg-card rounded-2xl overflow-hidden gold-border transition-opacity ${!item.is_available ? "opacity-60" : ""}`}>
              {item.image_url && (
                <img src={item.image_url} alt={item.name} className="w-full h-40 object-cover" loading="lazy" />
              )}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-foreground">{item.name}</h3>
                    {item.name_ur && <p className="text-muted-foreground text-sm">{item.name_ur}</p>}
                  </div>
                  <span className="text-gradient-gold font-bold text-lg">Rs. {item.price}</span>
                </div>
                {cat && <span className="text-xs text-muted-foreground uppercase tracking-wider">{cat.name}</span>}
                {!item.is_available && <span className="ml-2 text-xs text-destructive font-semibold">Out of Stock</span>}
                <div className="flex gap-2 mt-4">
                  <button onClick={() => toggleAvailability(item)} className="flex-1 flex items-center justify-center gap-1 py-2 rounded-lg bg-secondary text-foreground text-sm hover:bg-accent transition-colors">
                    {item.is_available ? <><EyeOff className="w-3.5 h-3.5" /> Out of Stock</> : <><Eye className="w-3.5 h-3.5" /> Available</>}
                  </button>
                  <button onClick={() => { setEditing(item); setShowForm(true); }} className="p-2 rounded-lg bg-secondary text-foreground hover:bg-accent transition-colors">
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button onClick={() => deleteItem(item.id)} className="p-2 rounded-lg bg-destructive/20 text-destructive hover:bg-destructive/30 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {filtered.length === 0 && <p className="text-center text-muted-foreground py-12">No items found</p>}
    </div>
  );
}

/* ====== MENU ITEM FORM ====== */
function MenuItemForm({ item, categories, onClose, onSave }: { item: MenuItem | null; categories: Category[]; onClose: () => void; onSave: () => void }) {
  const [name, setName] = useState(item?.name || "");
  const [nameUr, setNameUr] = useState(item?.name_ur || "");
  const [description, setDescription] = useState(item?.description || "");
  const [descUr, setDescUr] = useState(item?.description_ur || "");
  const [price, setPrice] = useState(item?.price?.toString() || "");
  const [categoryId, setCategoryId] = useState(item?.category_id || "");
  const [imageUrl, setImageUrl] = useState(item?.image_url || "");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `menu/${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("food-images").upload(path, file);
    if (error) {
      toast.error("Upload failed: " + error.message);
      setUploading(false);
      return;
    }
    const { data: { publicUrl } } = supabase.storage.from("food-images").getPublicUrl(path);
    setImageUrl(publicUrl);
    setUploading(false);
    toast.success("Image uploaded!");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !price) return;
    setSaving(true);

    const payload = {
      name: name.trim(),
      name_ur: nameUr.trim(),
      description: description.trim(),
      description_ur: descUr.trim(),
      price: parseFloat(price),
      category_id: categoryId || null,
      image_url: imageUrl,
    };

    if (item) {
      await supabase.from("menu_items").update(payload).eq("id", item.id);
      toast.success("Item updated!");
    } else {
      await supabase.from("menu_items").insert(payload);
      toast.success("Item added!");
    }
    setSaving(false);
    onSave();
  };

  return (
    <div className="bg-card rounded-2xl p-6 gold-border mb-6 animate-scale-in">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-heading text-xl font-semibold text-foreground">{item ? "Edit Item" : "Add New Item"}</h3>
        <button onClick={onClose} className="p-2 rounded-lg hover:bg-secondary transition-colors text-foreground"><X className="w-5 h-5" /></button>
      </div>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input placeholder="Name (English)" value={name} onChange={(e) => setName(e.target.value)} required className="px-4 py-3 bg-background rounded-xl border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
        <input placeholder="نام (اردو)" value={nameUr} onChange={(e) => setNameUr(e.target.value)} dir="rtl" className="px-4 py-3 bg-background rounded-xl border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
        <input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="px-4 py-3 bg-background rounded-xl border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
        <input placeholder="تفصیل (اردو)" value={descUr} onChange={(e) => setDescUr(e.target.value)} dir="rtl" className="px-4 py-3 bg-background rounded-xl border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
        <input type="number" step="0.01" placeholder="Price (Rs.)" value={price} onChange={(e) => setPrice(e.target.value)} required className="px-4 py-3 bg-background rounded-xl border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
        <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className="px-4 py-3 bg-background rounded-xl border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
          <option value="">Select Category</option>
          {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <div className="md:col-span-2">
          <div className="flex items-center gap-4">
            {imageUrl && <img src={imageUrl} alt="Preview" className="w-20 h-20 rounded-xl object-cover" />}
            <label className="flex items-center gap-2 px-4 py-3 bg-secondary rounded-xl cursor-pointer hover:bg-accent transition-colors text-foreground">
              <Upload className="w-4 h-4" />
              {uploading ? "Uploading..." : "Upload Image"}
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
          </div>
        </div>
        <div className="md:col-span-2 flex gap-3 justify-end">
          <button type="button" onClick={onClose} className="px-5 py-2.5 bg-secondary text-foreground rounded-xl hover:bg-accent transition-colors">Cancel</button>
          <button type="submit" disabled={saving} className="px-5 py-2.5 bg-gradient-gold text-primary-foreground rounded-xl font-semibold hover:opacity-90 transition-opacity disabled:opacity-50">
            {saving ? "Saving..." : item ? "Update" : "Add Item"}
          </button>
        </div>
      </form>
    </div>
  );
}

/* ====== ORDER MANAGER ====== */
function OrderManager() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const fetchOrders = async () => {
    const { data } = await supabase
      .from("orders")
      .select("*, order_items(*)")
      .order("created_at", { ascending: false });
    setOrders((data as Order[]) || []);
  };

  useEffect(() => { fetchOrders(); }, []);

  useEffect(() => {
    const channel = supabase.channel("orders-realtime").on("postgres_changes", { event: "*", schema: "public", table: "orders" }, () => fetchOrders()).subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("orders").update({ status: status as any }).eq("id", id);
    toast.success(`Order status → ${status.replace("_", " ")}`);
    fetchOrders();
  };

  const deleteOrder = async (id: string) => {
    if (!confirm("Delete this order?")) return;
    await supabase.from("orders").delete().eq("id", id);
    toast.success("Order deleted");
    fetchOrders();
  };

  const statusColors: Record<string, string> = {
    pending: "bg-yellow-500/20 text-yellow-400",
    preparing: "bg-blue-500/20 text-blue-400",
    out_for_delivery: "bg-purple-500/20 text-purple-400",
    completed: "bg-green-500/20 text-green-400",
    cancelled: "bg-red-500/20 text-red-400",
  };

  const statusIcons: Record<string, typeof Clock> = {
    pending: Clock,
    preparing: ChefHat,
    out_for_delivery: Truck,
    completed: CheckCircle,
    cancelled: AlertCircle,
  };

  const filtered = orders.filter((o) => !statusFilter || o.status === statusFilter);

  const paymentLabels: Record<string, string> = { cod: "Cash on Delivery", easypaisa: "Easypaisa", card: "Credit/Debit Card" };

  return (
    <div>
      <div className="flex gap-2 mb-6 flex-wrap">
        {["", "pending", "preparing", "out_for_delivery", "completed", "cancelled"].map((s) => (
          <button key={s} onClick={() => setStatusFilter(s)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${statusFilter === s ? "bg-gradient-gold text-primary-foreground" : "bg-card text-foreground hover:bg-accent"}`}>
            {s ? s.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) : "All"}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map((order) => {
          const StatusIcon = statusIcons[order.status] || Clock;
          return (
            <div key={order.id} className="bg-card rounded-2xl gold-border overflow-hidden">
              <div className="p-4 flex items-center justify-between cursor-pointer" onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}>
                <div className="flex items-center gap-4">
                  <div className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${statusColors[order.status] || ""}`}>
                    <StatusIcon className="w-3.5 h-3.5" />
                    {order.status.replace(/_/g, " ")}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{order.customer_name}</p>
                    <p className="text-xs text-muted-foreground">{new Date(order.created_at).toLocaleString()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-gradient-gold font-bold">Rs. {order.total_amount}</p>
                  <p className="text-xs text-muted-foreground">{paymentLabels[order.payment_method] || order.payment_method}</p>
                </div>
              </div>

              {expandedOrder === order.id && (
                <div className="border-t border-border p-4 space-y-4 animate-fade-in">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div><span className="text-muted-foreground">Phone:</span> <span className="text-foreground ml-1">{order.customer_phone}</span></div>
                    <div><span className="text-muted-foreground">Address:</span> <span className="text-foreground ml-1">{order.delivery_address}</span></div>
                    {order.notes && <div className="sm:col-span-2"><span className="text-muted-foreground">Notes:</span> <span className="text-foreground ml-1">{order.notes}</span></div>}
                    {order.map_lat && order.map_lng && (
                      <div className="sm:col-span-2">
                        <a href={`https://www.google.com/maps?q=${order.map_lat},${order.map_lng}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-sm">📍 View on Google Maps</a>
                      </div>
                    )}
                  </div>

                  {order.order_items && order.order_items.length > 0 && (
                    <div>
                      <p className="text-sm font-semibold text-foreground mb-2">Items:</p>
                      <div className="space-y-1">
                        {order.order_items.map((oi) => (
                          <div key={oi.id} className="flex justify-between text-sm">
                            <span className="text-foreground">{oi.quantity}x {oi.item_name}</span>
                            <span className="text-muted-foreground">Rs. {oi.unit_price * oi.quantity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {["pending", "preparing", "out_for_delivery", "completed", "cancelled"].map((s) => (
                      <button key={s} onClick={() => updateStatus(order.id, s)} disabled={order.status === s} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${order.status === s ? "bg-primary/20 text-primary cursor-default" : "bg-secondary text-foreground hover:bg-accent"}`}>
                        {s.replace(/_/g, " ")}
                      </button>
                    ))}
                    <button onClick={() => deleteOrder(order.id)} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-destructive/20 text-destructive hover:bg-destructive/30 transition-colors ml-auto">
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {filtered.length === 0 && <p className="text-center text-muted-foreground py-12">No orders found</p>}
    </div>
  );
}
