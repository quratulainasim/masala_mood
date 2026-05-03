import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useCart } from "@/hooks/useCart";
import { useLang } from "@/lib/language";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  ShoppingCart, User, Phone, MapPin, CreditCard, Banknote,
  Smartphone, Minus, Plus, Trash2, CheckCircle, ArrowLeft
} from "lucide-react";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Masala Mood Restaurant" },
      { name: "description", content: "Complete your order from Masala Mood Restaurant." },
    ],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { t } = useLang();
  const { items, updateQuantity, removeItem, clearCart, totalPrice, totalItems } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState<"cart" | "form" | "success">("cart");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "easypaisa" | "card">("cod");
  const [submitting, setSubmitting] = useState(false);
  const [orderId, setOrderId] = useState("");

  if (items.length === 0 && step !== "success") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background pt-20 px-4">
        <ShoppingCart className="w-16 h-16 text-muted-foreground mb-4" />
        <h2 className="font-heading text-2xl font-bold text-foreground mb-2">{t("Your cart is empty", "آپ کی ٹوکری خالی ہے")}</h2>
        <Link to="/delivery" className="mt-4 px-6 py-3 bg-gradient-gold text-primary-foreground rounded-xl font-semibold hover:opacity-90 transition-opacity">
          {t("Browse Menu", "مینو دیکھیں")}
        </Link>
      </div>
    );
  }

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !address.trim()) {
      toast.error(t("Please fill all required fields", "تمام ضروری فیلڈز بھریں"));
      return;
    }
    setSubmitting(true);

    const newOrderId = crypto.randomUUID();

    const { error: orderError } = await supabase
      .from("orders")
      .insert({
        id: newOrderId,
        customer_name: name.trim(),
        customer_phone: phone.trim(),
        delivery_address: address.trim(),
        payment_method: paymentMethod,
        total_amount: totalPrice,
        notes: notes.trim(),
      });

    if (orderError) {
      toast.error("Failed to place order: " + (orderError?.message || "Unknown error"));
      setSubmitting(false);
      return;
    }

    const orderItems = items.map((item) => ({
      order_id: newOrderId,
      menu_item_id: item.id,
      item_name: item.name,
      quantity: item.quantity,
      unit_price: item.price,
    }));

    const { error: itemsError } = await supabase.from("order_items").insert(orderItems);
    if (itemsError) {
      toast.error("Failed to save order items");
      setSubmitting(false);
      return;
    }

    setOrderId(newOrderId.slice(0, 8).toUpperCase());
    clearCart();
    setStep("success");
    setSubmitting(false);
  };

  if (step === "success") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background pt-20 px-4">
        <div className="bg-card rounded-2xl p-8 gold-border max-w-md w-full text-center animate-scale-in">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="font-heading text-3xl font-bold text-foreground mb-2">{t("Order Placed!", "آرڈر ہو گیا!")}</h2>
          <p className="text-muted-foreground mb-4">{t("Your order ID:", "آپ کا آرڈر نمبر:")} <span className="text-primary font-bold">#{orderId}</span></p>
          <p className="text-sm text-muted-foreground mb-6">
            {paymentMethod === "cod" ? t("Pay when your order arrives.", "آرڈر آنے پر ادائیگی کریں۔") : t("Your payment has been recorded.", "آپ کی ادائیگی ریکارڈ ہو گئی ہے۔")}
          </p>
          <Link to="/" className="px-6 py-3 bg-gradient-gold text-primary-foreground rounded-xl font-semibold hover:opacity-90 transition-opacity inline-block">
            {t("Back to Home", "واپس ہوم")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => step === "form" ? setStep("cart") : navigate({ to: "/delivery" })} className="p-2 rounded-lg bg-card hover:bg-accent transition-colors text-foreground">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="font-heading text-3xl font-bold text-foreground">
            {step === "cart" ? t("Your Cart", "آپ کی ٹوکری") : t("Checkout", "چیک آؤٹ")}
          </h1>
        </div>

        {step === "cart" && (
          <div>
            <div className="space-y-3 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 bg-card rounded-2xl p-4 gold-border">
                  {item.image_url && <img src={item.image_url} alt={item.name} className="w-20 h-20 rounded-xl object-cover shrink-0" />}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading text-lg font-semibold text-foreground">{item.name}</h3>
                    <p className="text-primary font-bold">Rs. {item.price}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-foreground hover:bg-accent transition-colors">
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-semibold text-foreground">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 rounded-full bg-gradient-gold flex items-center justify-center text-primary-foreground hover:opacity-90">
                      <Plus className="w-4 h-4" />
                    </button>
                    <button onClick={() => removeItem(item.id)} className="w-8 h-8 rounded-full bg-destructive/20 flex items-center justify-center text-destructive hover:bg-destructive/30 ml-2">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-card rounded-2xl p-6 gold-border">
              <div className="flex justify-between text-lg font-semibold mb-4">
                <span className="text-foreground">{t("Total", "کل")} ({totalItems} {t("items", "اشیاء")})</span>
                <span className="text-gradient-gold">Rs. {totalPrice}</span>
              </div>
              <button onClick={() => setStep("form")} className="w-full bg-gradient-gold text-primary-foreground py-3.5 rounded-xl font-semibold hover:opacity-90 transition-opacity">
                {t("Proceed to Checkout", "چیک آؤٹ کریں")}
              </button>
            </div>
          </div>
        )}

        {step === "form" && (
          <form onSubmit={handleSubmitOrder} className="space-y-6">
            <div className="bg-card rounded-2xl p-6 gold-border space-y-4">
              <h3 className="font-heading text-xl font-semibold text-foreground flex items-center gap-2">
                <User className="w-5 h-5 text-primary" /> {t("Delivery Details", "ڈیلیوری کی تفصیلات")}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input placeholder={t("Full Name *", "پورا نام *")} value={name} onChange={(e) => setName(e.target.value)} required className="w-full pl-12 pr-4 py-3.5 bg-background rounded-xl border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input placeholder={t("Phone Number *", "فون نمبر *")} value={phone} onChange={(e) => setPhone(e.target.value)} required className="w-full pl-12 pr-4 py-3.5 bg-background rounded-xl border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
              </div>
              <div className="relative">
                <MapPin className="absolute left-4 top-4 w-5 h-5 text-muted-foreground" />
                <textarea placeholder={t("Delivery Address *", "ڈیلیوری ایڈریس *")} value={address} onChange={(e) => setAddress(e.target.value)} required rows={3} className="w-full pl-12 pr-4 py-3.5 bg-background rounded-xl border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" />
              </div>
              <textarea placeholder={t("Special instructions (optional)", "خصوصی ہدایات (اختیاری)")} value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} className="w-full px-4 py-3.5 bg-background rounded-xl border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" />
            </div>

            <div className="bg-card rounded-2xl p-6 gold-border space-y-4">
              <h3 className="font-heading text-xl font-semibold text-foreground flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-primary" /> {t("Payment Method", "ادائیگی کا طریقہ")}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {([
                  { val: "cod" as const, icon: Banknote, label: t("Cash on Delivery", "کیش آن ڈیلیوری") },
                  { val: "easypaisa" as const, icon: Smartphone, label: "Easypaisa" },
                  { val: "card" as const, icon: CreditCard, label: t("Credit/Debit Card", "کریڈٹ/ڈیبٹ کارڈ") },
                ]).map(({ val, icon: Icon, label }) => (
                  <button key={val} type="button" onClick={() => setPaymentMethod(val)} className={`flex items-center gap-3 p-4 rounded-xl border transition-colors ${paymentMethod === val ? "border-primary bg-primary/10" : "border-border bg-background hover:bg-accent"}`}>
                    <Icon className={`w-5 h-5 ${paymentMethod === val ? "text-primary" : "text-muted-foreground"}`} />
                    <span className={`text-sm font-medium ${paymentMethod === val ? "text-primary" : "text-foreground"}`}>{label}</span>
                  </button>
                ))}
              </div>
              {paymentMethod === "easypaisa" && (
                <div className="bg-background rounded-xl p-4 border border-border">
                  <p className="text-sm text-muted-foreground">{t("Send payment to:", "ادائیگی بھیجیں:")} <span className="text-primary font-bold">0300-1234567</span></p>
                  <p className="text-xs text-muted-foreground mt-1">{t("Share screenshot on WhatsApp after payment", "ادائیگی کے بعد واٹس ایپ پر اسکرین شاٹ بھیجیں")}</p>
                </div>
              )}
              {paymentMethod === "card" && (
                <div className="bg-background rounded-xl p-4 border border-border">
                  <p className="text-sm text-muted-foreground">{t("Card payment will be processed securely after order confirmation.", "آرڈر کی تصدیق کے بعد کارڈ کی ادائیگی محفوظ طریقے سے ہوگی۔")}</p>
                </div>
              )}
            </div>

            <div className="bg-card rounded-2xl p-6 gold-border">
              <h3 className="font-heading text-xl font-semibold text-foreground mb-4">{t("Order Summary", "آرڈر کا خلاصہ")}</h3>
              <div className="space-y-2 mb-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-foreground">{item.quantity}x {item.name}</span>
                    <span className="text-muted-foreground">Rs. {item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-border pt-4 flex justify-between text-lg font-bold">
                <span className="text-foreground">{t("Total", "کل")}</span>
                <span className="text-gradient-gold">Rs. {totalPrice}</span>
              </div>
            </div>

            <button type="submit" disabled={submitting} className="w-full bg-gradient-gold text-primary-foreground py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-opacity disabled:opacity-50">
              {submitting ? t("Placing Order...", "آرڈر دیا جا رہا ہے...") : t("Place Order", "آرڈر دیں")} — Rs. {totalPrice}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
