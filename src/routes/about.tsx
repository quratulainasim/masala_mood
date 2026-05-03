import { createFileRoute } from "@tanstack/react-router";
import { Heart, Award, Leaf } from "lucide-react";
import chefImg from "@/assets/chef.jpg";
import interiorImg from "@/assets/restaurant-interior.jpg";
import { useLang } from "@/lib/language";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Masala Mood Restaurant" },
      { name: "description", content: "Learn about Masala Mood's story, our passionate chef, and our commitment to culinary excellence." },
      { property: "og:title", content: "About Us — Masala Mood Restaurant" },
      { property: "og:description", content: "Our story, our passion." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { t } = useLang();

  const values = [
    { icon: Heart, title: t("Passion", "جذبہ"), desc: t("Every dish is crafted with love and dedication to the art of cooking.", "ہر ڈش محبت اور لگن سے تیار کی جاتی ہے۔") },
    { icon: Award, title: t("Excellence", "عمدگی"), desc: t("We strive for perfection in every ingredient, every plate, every experience.", "ہم ہر جزو، ہر پلیٹ، ہر تجربے میں کمال کے لیے کوشاں ہیں۔") },
    { icon: Leaf, title: t("Quality", "معیار"), desc: t("Finest ingredients, locally sourced, seasonally inspired.", "بہترین اجزاء، مقامی طور پر حاصل کردہ۔") },
  ];

  return (
    <div className="pt-20 min-h-screen bg-background">
      <div className="relative h-[50vh] min-h-[400px]">
        <img src={interiorImg} alt="Masala Mood restaurant" className="w-full h-full object-cover" width={1200} height={800} />
        <div className="absolute inset-0 bg-hero-overlay flex items-center justify-center">
          <div className="text-center">
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">{t("Our Story", "ہماری کہانی")}</p>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground">
              {t("About", "بارے میں")} <span className="text-gradient-gold">Masala Mood</span>
            </h1>
          </div>
        </div>
      </div>

      <div className="section-padding max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="animate-fade-up">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-6">
              {t("Born from", "پیدا ہوا")} <span className="text-gradient-gold">{t("Fire", "آگ سے")}</span>
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                {t(
                  "Masala Mood was founded in 2010 with a simple belief: the best flavors come from the most primal source of cooking — fire. What started as a small open-flame kitchen has grown into one of the city's most celebrated dining destinations.",
                  "Masala Mood کی بنیاد 2010 میں ایک سادہ عقیدے کے ساتھ رکھی گئی: بہترین ذائقے کھانا پکانے کے سب سے قدیم ذریعے — آگ سے آتے ہیں۔ جو ایک چھوٹے سے کچن سے شروع ہوا وہ شہر کی مشہور ترین کھانے کی جگہوں میں شامل ہو گیا۔"
                )}
              </p>
              <p>
                {t(
                  "Our philosophy is rooted in respect — for ingredients, for tradition, and for our guests. Every dish tells a story of its origins, from the farm to your table.",
                  "ہمارا فلسفہ احترام پر مبنی ہے — اجزاء کا، روایت کا، اور ہمارے مہمانوں کا۔ ہر ڈش اپنی اصل کی کہانی سناتی ہے۔"
                )}
              </p>
            </div>
          </div>
          <div className="animate-fade-up delay-200">
            <div className="rounded-2xl overflow-hidden gold-border">
              <img src={chefImg} alt="Chef at work" className="w-full h-[500px] object-cover" loading="lazy" width={800} height={1000} />
            </div>
          </div>
        </div>

        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">
              {t("Our", "ہماری")} <span className="text-gradient-gold">{t("Values", "اقدار")}</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <div key={v.title} className="bg-card rounded-2xl p-8 gold-border text-center hover-lift animate-fade-up" style={{ animationDelay: `${i * 0.15}s` }}>
                <div className="w-16 h-16 rounded-full bg-gradient-gold flex items-center justify-center mx-auto mb-6">
                  <v.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-foreground mb-3">{v.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
