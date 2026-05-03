import { Link } from "@tanstack/react-router";
import { Star, ArrowRight, Quote } from "lucide-react";
import { useLang } from "@/lib/language";

export default function ReviewsPreview() {
  const { t } = useLang();

  const reviews = [
    { name: t("Ahmed K.", "احمد ک."), text: t("Best biryani in the city! The flavors remind me of home. Absolutely incredible experience.", "شہر کی بہترین بریانی! ذائقے گھر کی یاد دلاتے ہیں۔ بالکل ناقابل یقین تجربہ۔"), rating: 5, date: t("2 weeks ago", "2 ہفتے پہلے") },
    { name: t("Fatima S.", "فاطمہ س."), text: t("The nihari and naan were divine. We celebrated our anniversary here and it was magical.", "نہاری اور نان لاجواب تھے۔ ہم نے اپنی سالگرہ یہاں منائی اور یہ جادوئی تھا۔"), rating: 5, date: t("1 month ago", "1 مہینہ پہلے") },
    { name: t("Ali R.", "علی ر."), text: t("The seekh kebabs alone are worth the visit. And the chai? Simply divine.", "سیخ کباب اکیلے آنے کی وجہ ہیں۔ اور چائے؟ بالکل لاجواب۔"), rating: 5, date: t("3 weeks ago", "3 ہفتے پہلے") },
  ];

  return (
    <section className="section-padding bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">{t("Testimonials", "تعریفیں")}</p>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-foreground">
            {t("What Our", "ہمارے")} <span className="text-gradient-gold">{t("Guests", "مہمان")}</span> {t("Say", "کیا کہتے ہیں")}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <div key={r.name} className="bg-card rounded-2xl p-8 gold-border hover-lift animate-fade-up" style={{ animationDelay: `${i * 0.15}s` }}>
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

        <div className="text-center mt-12">
          <Link to="/reviews" className="inline-flex items-center gap-2 text-primary font-semibold hover:underline underline-offset-4">
            {t("Read All Reviews", "تمام جائزے پڑھیں")} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
