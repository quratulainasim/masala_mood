import { Link } from "@tanstack/react-router";
import { ArrowRight, Star } from "lucide-react";
import heroBurger from "@/assets/hero-burger.jpg";
import { useLang } from "@/lib/language";

export default function HeroSection() {
  const { t } = useLang();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroBurger} alt="Gourmet burger" className="w-full h-full object-cover animate-slow-zoom" width={1920} height={1080} />
        <div className="absolute inset-0 bg-hero-overlay" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-secondary/80 backdrop-blur-sm rounded-full px-4 py-2 mb-8 animate-fade-up gold-border">
            <Star className="w-4 h-4 text-primary fill-primary" />
            <span className="text-sm font-medium text-primary">{t("Award-Winning Cuisine", "ایوارڈ یافتہ کھانے")}</span>
          </div>

          <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground leading-tight animate-fade-up delay-100">
            {t("Taste the", "چکھیں")}
            <span className="block text-gradient-gold">{t("Art of Fire", "آگ کا فن")}</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-lg animate-fade-up delay-200">
            {t(
              "Every dish is a masterpiece, crafted with passion and the finest ingredients. Let your senses ignite.",
              "ہر ڈش ایک شاہکار ہے، جذبے اور بہترین اجزاء سے تیار کی گئی۔ اپنے ذائقے کو جگائیں۔"
            )}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-10 animate-fade-up delay-300">
            <Link
              to="/delivery"
              className="inline-flex items-center justify-center gap-2 bg-gradient-gold text-primary-foreground px-8 py-4 rounded-xl text-base font-semibold hover:opacity-90 transition-opacity animate-pulse-glow"
            >
              {t("Order Now", "ابھی آرڈر کریں")}
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/dine-in"
              className="inline-flex items-center justify-center gap-2 bg-secondary/80 backdrop-blur-sm text-foreground px-8 py-4 rounded-xl text-base font-semibold gold-border hover:bg-accent transition-colors"
            >
              {t("Visit Us", "ہمارے پاس آئیں")}
            </Link>
          </div>

          <div className="flex gap-8 mt-14 animate-fade-up delay-400">
            {[
              { value: "4.9", label: t("Rating", "ریٹنگ") },
              { value: "12K+", label: t("Happy Guests", "خوش گاہک") },
              { value: "150+", label: t("Dishes", "پکوان") },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-2xl font-bold text-gradient-gold font-heading">{s.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
