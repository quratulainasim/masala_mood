import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useLang } from "@/lib/language";
import { supabase } from "@/integrations/supabase/client";
import { useCart } from "@/hooks/useCart";
import { Plus, Minus } from "lucide-react";
import { toast } from "sonner";
import type { Tables } from "@/integrations/supabase/types";
import { MOCK_CATEGORIES, MOCK_MENU_ITEMS, type MockCategory, type MockMenuItem } from "@/lib/mockData";

type MenuItem = Tables<"menu_items"> | MockMenuItem;
type Category = Tables<"categories"> | MockCategory;

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu — Masala Mood Restaurant" },
      { name: "description", content: "Explore Masala Mood's full menu of authentic Pakistani cuisine." },
    ],
  }),
  component: MenuPage,
});

function MenuPage() {
  const { t } = useLang();
  const { items: cartItems, addItem, removeItem, updateQuantity } = useCart();
  const [items, setItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCat, setActiveCat] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const [{ data: menuData }, { data: catData }] = await Promise.all([
          supabase.from("menu_items").select("*").eq("is_available", true).order("sort_order"),
          supabase.from("categories").select("*").order("sort_order"),
        ]);
        if (!menuData || !catData) {
          throw new Error("No data returned from Supabase");
        }
        setItems(menuData || []);
        setCategories(catData || []);
      } catch (err) {
        console.warn("Supabase fetch failed, falling back to mock data:", err);
        setItems(MOCK_MENU_ITEMS);
        setCategories(MOCK_CATEGORIES);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const getCartQty = (id: string) => cartItems.find((c) => c.id === id)?.quantity || 0;

  const grouped = categories.map((cat) => ({
    ...cat,
    items: items.filter((i) => i.category_id === cat.id),
  })).filter((g) => g.items.length > 0);

  const displayed = activeCat ? grouped.filter((g) => g.id === activeCat) : grouped;

  return (
    <div className="pt-20 min-h-screen bg-background">
      <div className="section-padding max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">{t("Our Menu", "ہمارا مینو")}</p>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground">
            {t("Explore Our", "ہمارے")} <span className="text-gradient-gold">{t("Dishes", "پکوان")}</span>
          </h1>
        </div>

        <div className="flex gap-2 flex-wrap justify-center mb-10">
          <button onClick={() => setActiveCat("")} className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-colors ${!activeCat ? "bg-gradient-gold text-primary-foreground" : "bg-card text-foreground hover:bg-accent"}`}>
            {t("All", "سب")}
          </button>
          {categories.map((c) => (
            <button key={c.id} onClick={() => setActiveCat(c.id)} className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-colors ${activeCat === c.id ? "bg-gradient-gold text-primary-foreground" : "bg-card text-foreground hover:bg-accent"}`}>
              {t(c.name, c.name_ur)}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-12 text-muted-foreground">Loading menu...</div>
        ) : (
          <div className="space-y-16">
            {displayed.map((group) => (
              <section key={group.id}>
                <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-6 border-b border-border pb-3">
                  {t(group.name, group.name_ur)}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {group.items.map((item) => (
                    <div key={item.id} className="bg-card rounded-2xl overflow-hidden gold-border hover-lift animate-fade-up group">
                      {item.image_url && (
                        <div className="relative overflow-hidden h-48">
                          <img src={item.image_url} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                        </div>
                      )}
                      <div className="p-5">
                        <h3 className="font-heading text-lg font-semibold text-foreground">{t(item.name, item.name_ur)}</h3>
                        {item.description && <p className="text-muted-foreground text-sm mt-1 line-clamp-2">{t(item.description, item.description_ur || "")}</p>}
                        <div className="flex items-center justify-between mt-4">
                          <span className="text-gradient-gold font-bold text-xl">Rs. {item.price}</span>
                          <div className="flex items-center gap-2">
                            {getCartQty(item.id) > 0 && (
                              <>
                                <button onClick={() => {
                                  updateQuantity(item.id, getCartQty(item.id) - 1);
                                  toast.error(`${t(item.name, item.name_ur)} ${t("removed from cart", "ٹوکری سے نکال دیا گیا")}`);
                                }} className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-foreground hover:bg-accent transition-colors">
                                  <Minus className="w-4 h-4" />
                                </button>
                                <span className="w-6 text-center font-semibold text-foreground text-sm">{getCartQty(item.id)}</span>
                              </>
                            )}
                            <button onClick={() => {
                              addItem({ id: item.id, name: item.name, name_ur: item.name_ur, price: Number(item.price), image_url: item.image_url || "" });
                              toast.success(`${t(item.name, item.name_ur)} ${t("added to cart", "ٹوکری میں شامل کر دیا گیا")}`);
                            }} className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center text-primary-foreground hover:opacity-90 transition-opacity">
                              <Plus className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
        {!loading && displayed.length === 0 && <p className="text-center text-muted-foreground py-12">{t("No items found", "کوئی آئٹم نہیں ملا")}</p>}
      </div>
    </div>
  );
}
