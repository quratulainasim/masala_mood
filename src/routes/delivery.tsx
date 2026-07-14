import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { ShoppingCart, Plus, Minus, Truck, Clock, Tag, Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useCart } from "@/hooks/useCart";
import { useLang } from "@/lib/language";
import { toast } from "sonner";
import type { Tables } from "@/integrations/supabase/types";
import { MOCK_CATEGORIES, MOCK_MENU_ITEMS, type MockCategory, type MockMenuItem } from "@/lib/mockData";

type MenuItem = Tables<"menu_items"> | MockMenuItem;
type Category = Tables<"categories"> | MockCategory;

export const Route = createFileRoute("/delivery")({
  head: () => ({
    meta: [
      { title: "Order Delivery — Masala Mood Restaurant" },
      { name: "description", content: "Order Masala Mood's finest Pakistani dishes delivered to your door." },
    ],
  }),
  component: DeliveryPage,
});

function DeliveryPage() {
  const { t } = useLang();
  const { items: cartItems, addItem, removeItem, updateQuantity, totalItems, totalPrice } = useCart();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let channel: any = null;
    const fetchMenu = async () => {
      try {
        const [{ data: items }, { data: cats }] = await Promise.all([
          supabase.from("menu_items").select("*").eq("is_available", true).order("sort_order"),
          supabase.from("categories").select("*").order("sort_order"),
        ]);
        if (!items || !cats) {
          throw new Error("No data returned from Supabase");
        }
        setMenuItems(items || []);
        setCategories(cats || []);

        channel = supabase.channel("delivery-menu").on("postgres_changes", { event: "*", schema: "public", table: "menu_items" }, () => {
          supabase.from("menu_items").select("*").eq("is_available", true).order("sort_order").then(({ data }) => setMenuItems(data || []));
        }).subscribe();
      } catch (err) {
        console.warn("Supabase fetch failed on delivery, falling back to mock data:", err);
        setMenuItems(MOCK_MENU_ITEMS);
        setCategories(MOCK_CATEGORIES);
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();

    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, []);

  const filtered = menuItems.filter((i) => {
    const matchSearch = i.name.toLowerCase().includes(search.toLowerCase()) || (i.name_ur || "").includes(search);
    const matchCat = !filterCat || i.category_id === filterCat;
    return matchSearch && matchCat;
  });

  const getCartQty = (id: string) => cartItems.find((c) => c.id === id)?.quantity || 0;

  return (
    <div className="pt-20 min-h-screen bg-background">
      <div className="section-padding max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">{t("Home Delivery", "ہوم ڈیلیوری")}</p>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground">
            {t("Order", "آرڈر")} <span className="text-gradient-gold">{t("Online", "آن لائن")}</span>
          </h1>
        </div>

        <div className="bg-gradient-gold rounded-2xl p-6 mb-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Tag className="w-6 h-6 text-primary-foreground" />
            <span className="text-primary-foreground font-semibold">{t("Free delivery on orders over Rs. 2000!", "Rs. 2000 سے زیادہ آرڈر پر مفت ڈیلیوری!")}</span>
          </div>
          <div className="flex items-center gap-3 text-primary-foreground/80 text-sm">
            <Clock className="w-4 h-4" />
            <span>{t("Average delivery: 25–40 min", "اوسط ڈیلیوری: 25–40 منٹ")}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-md mx-auto sm:mx-0">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input type="text" placeholder={t("Search dishes...", "پکوان تلاش کریں...")} value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-12 pr-4 py-3.5 bg-card rounded-xl border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
          </div>
          <div className="flex gap-2 flex-wrap justify-center">
            <button onClick={() => setFilterCat("")} className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${!filterCat ? "bg-gradient-gold text-primary-foreground" : "bg-card text-foreground hover:bg-accent"}`}>
              {t("All", "سب")}
            </button>
            {categories.map((c) => (
              <button key={c.id} onClick={() => setFilterCat(c.id)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${filterCat === c.id ? "bg-gradient-gold text-primary-foreground" : "bg-card text-foreground hover:bg-accent"}`}>
                {t(c.name, c.name_ur)}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12 text-muted-foreground">Loading menu...</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {filtered.map((item) => {
                const qty = getCartQty(item.id);
                return (
                  <div key={item.id} className="flex items-center gap-4 bg-card rounded-2xl p-4 gold-border hover-lift animate-fade-up">
                    {item.image_url && <img src={item.image_url} alt={item.name} className="w-24 h-24 rounded-xl object-cover shrink-0" loading="lazy" width={96} height={96} />}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-heading text-lg font-semibold text-foreground truncate">{t(item.name, item.name_ur)}</h3>
                      {item.description && <p className="text-xs text-muted-foreground mt-0.5 truncate">{t(item.description, item.description_ur || "")}</p>}
                      <div className="flex items-center gap-3 mt-1">
                        <span className="flex items-center gap-1 text-xs text-muted-foreground"><Truck className="w-3 h-3" />25-40 min</span>
                      </div>
                      <p className="text-primary font-bold mt-2">Rs. {item.price}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {qty > 0 && (
                        <>
                          <button onClick={() => {
                            updateQuantity(item.id, qty - 1);
                            toast.error(`${t(item.name, item.name_ur)} ${t("removed from cart", "ٹوکری سے نکال دیا گیا")}`);
                          }} className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-foreground hover:bg-accent transition-colors">
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-semibold text-foreground">{qty}</span>
                        </>
                      )}
                      <button onClick={() => {
                        addItem({ id: item.id, name: item.name, name_ur: item.name_ur, price: Number(item.price), image_url: item.image_url || "" });
                        toast.success(`${t(item.name, item.name_ur)} ${t("added to cart", "ٹوکری میں شامل کر دیا گیا")}`);
                      }} className="w-9 h-9 rounded-full bg-gradient-gold flex items-center justify-center text-primary-foreground hover:opacity-90 transition-opacity">
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
              {filtered.length === 0 && <p className="text-center text-muted-foreground py-12">{t("No items found", "کوئی آئٹم نہیں ملا")}</p>}
            </div>

            <div className="lg:sticky lg:top-24 h-fit">
              <div className="bg-card rounded-2xl p-6 gold-border">
                <div className="flex items-center gap-2 mb-6">
                  <ShoppingCart className="w-5 h-5 text-primary" />
                  <h3 className="font-heading text-xl font-semibold text-foreground">{t("Your Order", "آپ کا آرڈر")}</h3>
                  {totalItems > 0 && <span className="bg-primary text-primary-foreground text-xs font-bold px-2.5 py-1 rounded-full ml-auto">{totalItems}</span>}
                </div>
                {totalItems === 0 ? (
                  <p className="text-muted-foreground text-sm text-center py-8">{t("Your cart is empty", "آپ کی ٹوکری خالی ہے")}</p>
                ) : (
                  <>
                    <div className="space-y-3 mb-6">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex items-center justify-between text-sm">
                          <span className="text-foreground">{item.quantity}x {item.name}</span>
                          <span className="text-primary font-semibold">Rs. {item.price * item.quantity}</span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-border pt-4 mb-6">
                      <div className="flex justify-between font-semibold">
                        <span className="text-foreground">{t("Total", "کل")}</span>
                        <span className="text-gradient-gold text-lg">Rs. {totalPrice}</span>
                      </div>
                      {totalPrice >= 2000 && <p className="text-xs text-primary mt-1">🎉 {t("Free delivery applied!", "مفت ڈیلیوری لاگو!")}</p>}
                    </div>
                    <Link to="/checkout" className="block w-full bg-gradient-gold text-primary-foreground py-3.5 rounded-xl font-semibold hover:opacity-90 transition-opacity text-center">
                      {t("Checkout", "چیک آؤٹ")} — Rs. {totalPrice}
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
