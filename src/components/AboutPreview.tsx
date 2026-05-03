import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import chefImg from "@/assets/chef.jpg";
import { useLang } from "@/lib/language";

export default function AboutPreview() {
  const { t } = useLang();

  return (
    <section className="section-padding bg-surface">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative animate-fade-up">
            <div className="rounded-2xl overflow-hidden gold-border">
              <img src={chefImg} alt="Executive Chef" className="w-full h-[500px] object-cover" loading="lazy" width={800} height={1000} />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-card gold-border rounded-2xl p-6 hidden lg:block">
              <p className="text-3xl font-heading font-bold text-gradient-gold">15+</p>
              <p className="text-sm text-muted-foreground">{t("Years of Excellence", "سالوں کی عمدگی")}</p>
            </div>
          </div>

          <div className="animate-fade-up delay-200">
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">{t("Our Story", "ہماری کہانی")}</p>
            <h2 className="font-heading text-4xl sm:text-5xl font-bold text-foreground leading-tight">
              {t("Passion in Every", "ہر شعلے میں")} <span className="text-gradient-gold">{t("Flame", "جذبہ")}</span>
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              {t(
                "Born from a love for open-fire cooking, Masala Mood brings the ancient art of flame to the modern table. Our executive chef, with over 15 years of international experience, creates dishes that honor tradition while pushing culinary boundaries.",
                "کھلی آگ پر کھانا پکانے کے شوق سے پیدا ہوا، Masala Mood آگ کے قدیم فن کو جدید دسترخوان پر لاتا ہے۔ ہمارے ایگزیکٹو شیف، 15 سال سے زائد بین الاقوامی تجربے کے ساتھ، ایسے پکوان تیار کرتے ہیں جو روایت کا احترام کرتے ہیں۔"
              )}
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              {t(
                "Every ingredient is sourced from local farms and premium suppliers. We believe in letting the natural flavors sing, enhanced by the kiss of fire and the magic of simplicity.",
                "ہر جزو مقامی فارمز اور پریمیم سپلائرز سے حاصل کیا جاتا ہے۔ ہم قدرتی ذائقوں کو نکھارنے پر یقین رکھتے ہیں۔"
              )}
            </p>
            <Link to="/about" className="inline-flex items-center gap-2 mt-8 text-primary font-semibold hover:underline underline-offset-4 transition-all">
              {t("Learn More About Us", "ہمارے بارے میں مزید جانیں")}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
