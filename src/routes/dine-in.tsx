import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Clock, Phone, Navigation } from "lucide-react";
import interiorImg from "@/assets/restaurant-interior.jpg";
import { useLang } from "@/lib/language";

export const Route = createFileRoute("/dine-in")({
  head: () => ({
    meta: [
      { title: "Our Location — Masala Mood Restaurant" },
      { name: "description", content: "Visit Masala Mood restaurant. Find our location, hours, and contact details." },
      { property: "og:title", content: "Our Location — Masala Mood Restaurant" },
      { property: "og:description", content: "Find Masala Mood restaurant near you." },
    ],
  }),
  component: DineInPage,
});

function DineInPage() {
  const { t } = useLang();

  const areas = [
    {
      name: t("Main Branch — Downtown", "مین برانچ — ڈاؤن ٹاؤن"),
      address: t("123 Gourmet Avenue, Downtown District", "123 گورمے ایونیو، ڈاؤن ٹاؤن ڈسٹرکٹ"),
      phone: "(123) 456-7890",
      hours: t("Mon–Sun: 11:00 AM – 12:00 AM", "پیر–اتوار: 11:00 صبح – 12:00 رات"),
    },
    {
      name: t("Gulshan Branch", "گلشن برانچ"),
      address: t("45 Food Street, Gulshan-e-Iqbal", "45 فوڈ اسٹریٹ، گلشنِ اقبال"),
      phone: "(123) 456-7891",
      hours: t("Mon–Sun: 12:00 PM – 11:00 PM", "پیر–اتوار: 12:00 دوپہر – 11:00 رات"),
    },
    {
      name: t("DHA Branch", "ڈی ایچ اے برانچ"),
      address: t("78 Zamzama Blvd, DHA Phase 5", "78 زم زمہ بلیوارڈ، ڈی ایچ اے فیز 5"),
      phone: "(123) 456-7892",
      hours: t("Mon–Sun: 11:00 AM – 11:00 PM", "پیر–اتوار: 11:00 صبح – 11:00 رات"),
    },
    {
      name: t("North Nazimabad Branch", "نارتھ ناظم آباد برانچ"),
      address: t("Block H, North Nazimabad", "بلاک ایچ، نارتھ ناظم آباد"),
      phone: "(123) 456-7893",
      hours: t("Mon–Sun: 12:00 PM – 12:00 AM", "پیر–اتوار: 12:00 دوپہر – 12:00 رات"),
    },
  ];

  return (
    <div className="pt-20 min-h-screen bg-background">
      {/* Hero */}
      <div className="relative h-[50vh] min-h-[400px]">
        <img src={interiorImg} alt="Restaurant interior" className="w-full h-full object-cover" width={1200} height={800} />
        <div className="absolute inset-0 bg-hero-overlay flex items-center justify-center">
          <div className="text-center">
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">{t("Visit Us", "ہمارے پاس آئیں")}</p>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground">
              {t("Our", "ہمارے")} <span className="text-gradient-gold">{t("Locations", "مقامات")}</span>
            </h1>
          </div>
        </div>
      </div>

      <div className="section-padding max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-muted-foreground max-w-xl mx-auto">
            {t(
              "Find an Masala Mood branch near you. Walk in anytime — no reservation needed!",
              "اپنے قریب Masala Mood برانچ تلاش کریں۔ کسی بھی وقت آئیں — ریزرویشن کی ضرورت نہیں!"
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {areas.map((area, i) => (
            <div
              key={area.name}
              className="bg-card rounded-2xl p-8 gold-border hover-lift animate-fade-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="flex items-start gap-3 mb-5">
                <Navigation className="w-6 h-6 text-primary shrink-0 mt-1" />
                <h3 className="font-heading text-xl font-semibold text-foreground">{area.name}</h3>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>{area.address}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary shrink-0" />
                  <a href={`tel:${area.phone}`} className="text-foreground hover:text-primary transition-colors">{area.phone}</a>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>{area.hours}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Ambiance gallery */}
        <div className="mt-16">
          <h2 className="font-heading text-3xl font-bold text-foreground text-center mb-8">
            {t("Our", "ہماری")} <span className="text-gradient-gold">{t("Ambiance", "فضا")}</span>
          </h2>
          <div className="rounded-2xl overflow-hidden gold-border">
            <img src={interiorImg} alt="Restaurant ambiance" className="w-full h-80 object-cover" loading="lazy" width={1200} height={800} />
          </div>
        </div>
      </div>
    </div>
  );
}
