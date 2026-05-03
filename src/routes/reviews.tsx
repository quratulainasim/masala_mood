import { createFileRoute } from "@tanstack/react-router";
import { Star, Quote } from "lucide-react";
import { useLang } from "@/lib/language";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Reviews — Masala Mood Restaurant" },
      { name: "description", content: "See what our guests say about Masala Mood." },
      { property: "og:title", content: "Reviews — Masala Mood Restaurant" },
      { property: "og:description", content: "Guest reviews and testimonials." },
    ],
  }),
  component: ReviewsPage,
});

function ReviewsPage() {
  const { t } = useLang();

  const allReviews = [
    { name: t("Ahmed K.", "احمد ک."), text: t("Best biryani in the city! Absolutely incredible experience.", "شہر کی بہترین بریانی! بالکل ناقابل یقین تجربہ۔"), rating: 5, date: t("2 weeks ago", "2 ہفتے پہلے") },
    { name: t("Fatima S.", "فاطمہ س."), text: t("The nihari was beyond perfection. We celebrated our anniversary here.", "نہاری کمال سے بھی اوپر تھی۔ ہم نے یہاں سالگرہ منائی۔"), rating: 5, date: t("1 month ago", "1 مہینہ پہلے") },
    { name: t("Ali R.", "علی ر."), text: t("The seekh kebabs are worth the visit. And the chai? Simply divine.", "سیخ کباب آنے کی وجہ ہیں۔ اور چائے؟ لاجواب۔"), rating: 5, date: t("3 weeks ago", "3 ہفتے پہلے") },
    { name: t("Hassan M.", "حسن م."), text: t("As a food critic, Masala Mood exceeded all my expectations. The biryani is a masterpiece.", "ایک فوڈ کریٹک کے طور پر، Masala Mood نے میری تمام توقعات سے بڑھ کر کام کیا۔"), rating: 5, date: t("1 week ago", "1 ہفتہ پہلے") },
    { name: t("Ayesha P.", "عائشہ پ."), text: t("Perfect family dinner spot. The karahi and naan were unforgettable.", "بہترین خاندانی ڈنر کی جگہ۔ کڑاہی اور نان ناقابل فراموش تھے۔"), rating: 5, date: t("2 months ago", "2 مہینے پہلے") },
    { name: t("Usman W.", "عثمان و."), text: t("Ordered delivery for a party. Everything arrived hot and fresh. Guests loved it.", "پارٹی کے لیے ڈیلیوری آرڈر کی۔ سب کچھ گرم آیا۔ مہمانوں کو بہت پسند آیا۔"), rating: 4, date: t("3 weeks ago", "3 ہفتے پہلے") },
    { name: t("Sara A.", "سارہ ا."), text: t("The gol gappa and chaat are to die for! Fresh and flavorful.", "گول گپے اور چاٹ کمال ہیں! تازہ اور مزیدار۔"), rating: 5, date: t("1 month ago", "1 مہینہ پہلے") },
    { name: t("Bilal H.", "بلال ح."), text: t("Best broast chicken I've ever tasted. Five stars, no question.", "میں نے کبھی اتنا اچھا بروسٹ نہیں کھایا۔ پانچ ستارے۔"), rating: 5, date: t("2 weeks ago", "2 ہفتے پہلے") },
    { name: t("Zainab L.", "زینب ل."), text: t("From haleem to dessert, it was pure magic. Highly recommend!", "حلیم سے لے کر میٹھے تک، سب جادو تھا۔ بہت سفارش!"), rating: 5, date: t("1 month ago", "1 مہینہ پہلے") },
  ];

  const avg = (allReviews.reduce((s, r) => s + r.rating, 0) / allReviews.length).toFixed(1);

  return (
    <div className="pt-20 min-h-screen bg-background">
      <div className="section-padding max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">{t("Testimonials", "تعریفیں")}</p>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground">
            {t("Guest", "مہمانوں کے")} <span className="text-gradient-gold">{t("Reviews", "جائزے")}</span>
          </h1>
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-6 h-6 text-primary fill-primary" />
              ))}
            </div>
            <span className="text-2xl font-bold text-gradient-gold font-heading">{avg}</span>
            <span className="text-muted-foreground">({allReviews.length} {t("reviews", "جائزے")})</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allReviews.map((r, i) => (
            <div key={r.name} className="bg-card rounded-2xl p-8 gold-border hover-lift animate-fade-up" style={{ animationDelay: `${i * 0.08}s` }}>
              <Quote className="w-8 h-8 text-primary/30 mb-4" />
              <p className="text-foreground leading-relaxed mb-6">{r.text}</p>
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: r.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-primary fill-primary" />
                ))}
              </div>
              <div className="flex items-center justify-between">
                <p className="font-semibold text-foreground">{r.name}</p>
                <p className="text-sm text-muted-foreground">{r.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
