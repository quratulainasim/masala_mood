import { createFileRoute } from "@tanstack/react-router";
import HeroSection from "@/components/HeroSection";
import FeaturedDishes from "@/components/FeaturedDishes";
import AboutPreview from "@/components/AboutPreview";
import ReviewsPreview from "@/components/ReviewsPreview";
import CTASection from "@/components/CTASection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Masala Mood Restaurant — Taste the Art of Fire" },
      { name: "description", content: "Award-winning cuisine crafted with passion. Order delivery or reserve a table at Masala Mood." },
      { property: "og:title", content: "Masala Mood Restaurant — Taste the Art of Fire" },
      { property: "og:description", content: "Award-winning cuisine crafted with passion." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div>
      <HeroSection />
      <FeaturedDishes />
      <AboutPreview />
      <ReviewsPreview />
      <CTASection />
    </div>
  );
}
