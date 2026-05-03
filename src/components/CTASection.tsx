import { Link } from "@tanstack/react-router";
import { ArrowRight, Truck, UtensilsCrossed } from "lucide-react";
import interiorImg from "@/assets/restaurant-interior.jpg";
import { useLang } from "@/lib/language";

export default function CTASection() {
  const { t } = useLang();

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0">
        <img src={interiorImg} alt="Restaurant ambiance" className="w-full h-full object-cover" loading="lazy" width={1200} height={800} />
        <div className="absolute inset-0 bg-hero-overlay" />
      </div>
      <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
        <h2 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-6 animate-fade-up">
          {t("Ready to", "تیار ہیں")} <span className="text-gradient-gold">{t("Indulge", "لطف اٹھانے کے لیے")}</span>?
        </h2>
        <p className="text-lg text-muted-foreground mb-10 max-w-lg mx-auto animate-fade-up delay-100">
          {t("Whether at our table or yours, every meal is an experience you'll never forget.", "چاہے ہمارے دسترخوان پر ہو یا آپ کے، ہر کھانا ایک ناقابل فراموش تجربہ ہے۔")}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up delay-200">
          <Link to="/delivery" className="inline-flex items-center justify-center gap-3 bg-gradient-gold text-primary-foreground px-8 py-4 rounded-xl text-base font-semibold hover:opacity-90 transition-opacity">
            <Truck className="w-5 h-5" />
            {t("Order Delivery", "ڈیلیوری آرڈر کریں")}
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link to="/dine-in" className="inline-flex items-center justify-center gap-3 bg-secondary/80 backdrop-blur-sm text-foreground px-8 py-4 rounded-xl text-base font-semibold gold-border hover:bg-accent transition-colors">
            <UtensilsCrossed className="w-5 h-5" />
            {t("Visit Us", "ہمارے پاس آئیں")}
          </Link>
        </div>
      </div>
    </section>
  );
}
