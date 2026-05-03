import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Phone, Globe } from "lucide-react";
import { useLang } from "@/lib/language";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { t, toggleLang, lang } = useLang();

  const navLinks = [
    { to: "/", label: t("Home", "ہوم") },
    { to: "/menu", label: t("Menu", "مینو") },
    { to: "/delivery", label: t("Delivery", "ڈیلیوری") },
    { to: "/dine-in", label: t("Dine In", "ڈائن ان") },
    { to: "/about", label: t("About", "ہمارے بارے میں") },
    { to: "/reviews", label: t("Reviews", "جائزے") },
    { to: "/offers", label: t("Offers", "آفرز") },
  ] as const;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="font-heading text-2xl md:text-3xl font-bold text-gradient-gold tracking-wide">
            Masala Mood
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-300 tracking-wide uppercase"
                activeProps={{ className: "text-sm font-medium text-primary tracking-wide uppercase" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={toggleLang}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors px-3 py-1.5 rounded-lg bg-secondary/50"
            >
              <Globe className="w-4 h-4" />
              <span>{lang === "en" ? "اردو" : "English"}</span>
            </button>
            <a href="tel:+1234567890" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
              <Phone className="w-4 h-4" />
              <span>(123) 456-7890</span>
            </a>
            <Link
              to="/delivery"
              className="bg-gradient-gold text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              {t("Order Now", "آرڈر کریں")}
            </Link>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleLang}
              className="text-sm text-muted-foreground hover:text-primary transition-colors px-2 py-1.5 rounded-lg bg-secondary/50"
            >
              <Globe className="w-5 h-5" />
            </button>
            <button onClick={() => setOpen(!open)} className="text-foreground p-2">
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border animate-fade-up">
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="block text-base font-medium text-muted-foreground hover:text-primary transition-colors uppercase tracking-wide"
                activeProps={{ className: "block text-base font-medium text-primary uppercase tracking-wide" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/delivery"
              onClick={() => setOpen(false)}
              className="block text-center bg-gradient-gold text-primary-foreground px-5 py-3 rounded-lg text-sm font-semibold mt-4"
            >
              {t("Order Now", "آرڈر کریں")}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
