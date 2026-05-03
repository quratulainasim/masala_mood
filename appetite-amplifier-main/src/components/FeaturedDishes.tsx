import { Link } from "@tanstack/react-router";
import { Star, ArrowRight } from "lucide-react";
import chickenBiryani from "@/assets/chicken_biryani.jpg";
import sekhKaba from "@/assets/sekh_kaba.jpg";
import nehari from "@/assets/nehari.jpg";
import dishDessert from "@/assets/dish-dessert.jpg";
import { useLang } from "@/lib/language";

export default function FeaturedDishes() {
  const { t } = useLang();

  const dishes = [
    { name: t("Chicken Biryani", "چکن بریانی"), price: "$16", rating: 4.9, tag: t("Bestseller", "مقبول ترین"), image: chickenBiryani, desc: t("Aromatic basmati rice layered with tender spiced chicken and saffron", "خوشبودار باسمتی چاول مصالحہ دار چکن اور زعفران کے ساتھ") },
    { name: t("Seekh Kebab Tikka", "سیخ کباب ٹکہ"), price: "$14", rating: 5.0, tag: t("Chef's Special", "شیف اسپیشل"), image: sekhKaba, desc: t("Charcoal-grilled minced beef kebabs with mint chutney", "کوئلوں پر بھنے ہوئے قیمے کے کباب پودینے کی چٹنی کے ساتھ") },
    { name: t("Nihari", "نہاری"), price: "$18", rating: 4.8, tag: t("Must Try", "ضرور کھائیں"), image: nehari, desc: t("Slow-cooked beef shank stew with rich spices, served with naan", "آہستہ پکا ہوا گوشت مصالحوں کے ساتھ، نان کے ساتھ") },
    { name: t("Broast Chicken", "بروسٹ چکن"), price: "$12", rating: 4.7, tag: t("Popular", "مقبول"), image: dishDessert, desc: t("Crispy pressure-fried chicken, juicy inside, golden outside", "کرسپی فرائیڈ چکن، اندر سے رسیلا، باہر سے سنہرا") },
  ];

  return (
    <section className="section-padding bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">{t("Our Signature", "ہماری خاص")}</p>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-foreground">
            {t("Featured", "نمایاں")} <span className="text-gradient-gold">{t("Dishes", "پکوان")}</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-md mx-auto">{t("Authentic Pakistani flavors crafted with love and the finest spices", "اصل پاکستانی ذائقے محبت اور بہترین مصالحوں سے تیار")}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {dishes.map((dish, i) => (
            <div key={dish.name} className="group bg-card rounded-2xl overflow-hidden gold-border hover-lift animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="relative overflow-hidden aspect-square">
                <img src={dish.image} alt={dish.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" width={800} height={800} />
                <div className="absolute top-3 left-3 bg-primary/90 backdrop-blur-sm text-primary-foreground text-xs font-semibold px-3 py-1.5 rounded-full">{dish.tag}</div>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-heading text-lg font-semibold text-foreground">{dish.name}</h3>
                  <span className="text-primary font-bold">{dish.price}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">{dish.desc}</p>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-primary fill-primary" />
                  <span className="text-sm font-medium text-foreground">{dish.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/menu" className="inline-flex items-center gap-2 text-primary font-semibold hover:underline underline-offset-4 transition-all">
            {t("View Full Menu", "مکمل مینو دیکھیں")}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
