import { createFileRoute, Link } from "@tanstack/react-router";
import { Tag, Clock, Percent, Gift, ArrowRight } from "lucide-react";
import dishPasta from "@/assets/dish-pasta.jpg";
import dishSteak from "@/assets/dish-steak.jpg";
import dishDessert from "@/assets/dish-dessert.jpg";
import { useLang } from "@/lib/language";

export const Route = createFileRoute("/offers")({
  head: () => ({
    meta: [
      { title: "Offers & Deals — Masala Mood Restaurant" },
      { name: "description", content: "Exclusive deals and seasonal promotions at Masala Mood." },
      { property: "og:title", content: "Offers & Deals — Masala Mood Restaurant" },
      { property: "og:description", content: "Exclusive deals at Masala Mood." },
    ],
  }),
  component: OffersPage,
});

function OffersPage() {
  const { t } = useLang();

  const offers = [
    {
      title: t("Family Feast Special", "فیملی فیسٹ اسپیشل"),
      desc: t("Two biryani + seekh kebabs + drinks for $39. Every Friday & Saturday.", "دو بریانی + سیخ کباب + مشروبات صرف $39 میں۔ ہر جمعہ اور ہفتہ۔"),
      image: dishSteak, badge: t("Weekend", "ہفتہ وار"), discount: t("Save 30%", "30% بچائیں"), expires: t("Every weekend", "ہر ویک اینڈ"),
    },
    {
      title: t("Lunch Express", "لنچ ایکسپریس"),
      desc: t("Any main course + starter + drink for just $29. Quick luxury lunch.", "کوئی بھی مین کورس + سٹارٹر + ڈرنک صرف $29 میں۔"),
      image: dishPasta, badge: t("Weekdays", "ہفتے کے دن"), discount: t("From $29", "$29 سے"), expires: t("Mon–Fri, 11AM–3PM", "پیر–جمعہ، 11 صبح–3 دوپہر"),
    },
    {
      title: t("Sweet Endings Bundle", "میٹھے کا بنڈل"),
      desc: t("Order any 2 desserts and get the 3rd free. Life is too short to skip dessert.", "کوئی بھی 2 میٹھے آرڈر کریں اور تیسرا مفت۔"),
      image: dishDessert, badge: t("All Week", "پورا ہفتہ"), discount: t("Buy 2 Get 1", "2 خریدیں 1 مفت"), expires: t("Limited time", "محدود وقت"),
    },
  ];

  const perks = [
    { icon: Gift, title: t("Loyalty Rewards", "وفاداری انعامات"), desc: t("Earn points on every order. Redeem for free meals.", "ہر آرڈر پر پوائنٹس کمائیں۔ مفت کھانے کے لیے استعمال کریں۔") },
    { icon: Percent, title: t("First Order Discount", "پہلے آرڈر پر رعایت"), desc: t("Get 15% off your first delivery order with code Masala Mood15.", "پہلے آرڈر پر کوڈ Masala Mood15 سے 15% رعایت۔") },
    { icon: Clock, title: t("Happy Hour", "ہیپی آور"), desc: t("50% off all drinks, daily from 4PM to 6PM.", "تمام مشروبات پر 50% رعایت، روزانہ 4 سے 6 بجے۔") },
  ];

  return (
    <div className="pt-20 min-h-screen bg-background">
      <div className="section-padding max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">{t("Special", "خصوصی")}</p>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground">
            {t("Offers &", "آفرز اور")} <span className="text-gradient-gold">{t("Deals", "ڈیلز")}</span>
          </h1>
          <p className="mt-4 text-muted-foreground max-w-md mx-auto">{t("Exclusive promotions to make your dining experience even more special", "آپ کے کھانے کے تجربے کو مزید خاص بنانے کے لیے خصوصی پیشکشیں")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {offers.map((o, i) => (
            <div key={o.title} className="group bg-card rounded-2xl overflow-hidden gold-border hover-lift animate-fade-up" style={{ animationDelay: `${i * 0.15}s` }}>
              <div className="relative overflow-hidden h-56">
                <img src={o.image} alt={o.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" width={800} height={800} />
                <div className="absolute top-3 left-3 bg-primary/90 backdrop-blur-sm text-primary-foreground text-xs font-semibold px-3 py-1.5 rounded-full">{o.badge}</div>
                <div className="absolute top-3 right-3 bg-warm/90 backdrop-blur-sm text-warm-foreground text-xs font-bold px-3 py-1.5 rounded-full">{o.discount}</div>
              </div>
              <div className="p-6">
                <h3 className="font-heading text-xl font-semibold text-foreground mb-2">{o.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{o.desc}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{o.expires}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">
            {t("MMasala Mood", "ممبر")} <span className="text-gradient-gold">{t("Perks", "فوائد")}</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {perks.map((p, i) => (
            <div key={p.title} className="bg-card rounded-2xl p-8 gold-border text-center hover-lift animate-fade-up" style={{ animationDelay: `${i * 0.15}s` }}>
              <div className="w-16 h-16 rounded-full bg-gradient-gold flex items-center justify-center mx-auto mb-6">
                <p.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-3">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/delivery" className="inline-flex items-center gap-2 bg-gradient-gold text-primary-foreground px-8 py-4 rounded-xl font-semibold hover:opacity-90 transition-opacity">
            <Tag className="w-5 h-5" />
            {t("Start Ordering", "آرڈر شروع کریں")}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
