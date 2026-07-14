import alooTikki from "@/assets/aloo_tikki.webp";
import broast from "@/assets/broast.jpg";
import chapliKebab from "@/assets/chapli_kebab.jpg";
import chickenBiryani from "@/assets/chicken_biryani.jpg";
import chickenKarahi from "@/assets/chicken_karahi.jpg";
import chickenShawarma from "@/assets/chicken_shawarma.jpg";
import chickenTikka from "@/assets/chicken_tikka.jpg";
import dahiBhalla from "@/assets/dahi_bhalla.jpg";
import doodhPatti from "@/assets/doodh_patti.jpg";
import golgappa from "@/assets/golgappa.jpg";
import haleem from "@/assets/haleem.jpg";
import loadedFries from "@/assets/loaded_fries.jpg";
import malaiBoti from "@/assets/malai_boti.jpg";
import mangoLassi from "@/assets/mango_lassi.jpg";
import muttonBiryani from "@/assets/mutton_biryani.jpg";
import muttonQorma from "@/assets/mutton_qorma.jpg";
import nehari from "@/assets/nehari.jpg";
import roohAfza from "@/assets/rooh_afza.webp";
import samosaChaat from "@/assets/samosa_chaat.jpg";
import sekhKaba from "@/assets/sekh_kaba.jpg";
import zingerBurger from "@/assets/zinger_burger.avif";

export interface MockCategory {
  id: string;
  name: string;
  name_ur: string;
  sort_order: number;
}

export interface MockMenuItem {
  id: string;
  category_id: string;
  name: string;
  name_ur: string;
  description: string;
  description_ur: string;
  price: number;
  image_url: string;
  is_available: boolean;
  sort_order: number;
}

export const MOCK_CATEGORIES: MockCategory[] = [
  { id: "cat-desi-specials", name: "Desi Specials", name_ur: "دیسی اسپیشل", sort_order: 1 },
  { id: "cat-bbq-tikka", name: "BBQ & Tikka", name_ur: "بی بی کیو اور ٹکہ", sort_order: 2 },
  { id: "cat-fast-food", name: "Fast Food", name_ur: "فاسٹ فوڈ", sort_order: 3 },
  { id: "cat-chaat-street", name: "Chaat & Street Food", name_ur: "چاٹ اور اسٹریٹ فوڈ", sort_order: 4 },
  { id: "cat-drinks", name: "Drinks", name_ur: "مشروبات", sort_order: 5 }
];

export const MOCK_MENU_ITEMS: MockMenuItem[] = [
  // Desi Specials
  {
    id: "item-chicken-biryani",
    category_id: "cat-desi-specials",
    name: "Chicken Biryani",
    name_ur: "چکن بریانی",
    description: "Aromatic basmati rice layered with tender spiced chicken and saffron",
    description_ur: "خوشبودار باسمتی چاول مصالحہ دار چکن اور زعفران کے ساتھ",
    price: 350,
    image_url: chickenBiryani,
    is_available: true,
    sort_order: 1
  },
  {
    id: "item-mutton-biryani",
    category_id: "cat-desi-specials",
    name: "Mutton Biryani",
    name_ur: "مٹن بریانی",
    description: "Rich aromatic rice cooked with premium mutton and spices",
    description_ur: "عمدہ مٹن اور خوشبو دار مصالحوں کے ساتھ پکے ہوئے چاول",
    price: 550,
    image_url: muttonBiryani,
    is_available: true,
    sort_order: 2
  },
  {
    id: "item-chicken-karahi",
    category_id: "cat-desi-specials",
    name: "Chicken Karahi",
    name_ur: "چکن کڑاہی",
    description: "Spicy and flavorful chicken curry cooked in a traditional wok",
    description_ur: "کڑاہی میں تیار کردہ ذائقہ دار چکن سالن",
    price: 800,
    image_url: chickenKarahi,
    is_available: true,
    sort_order: 3
  },
  {
    id: "item-mutton-qorma",
    category_id: "cat-desi-specials",
    name: "Mutton Qorma",
    name_ur: "مٹن قورمہ",
    description: "Rich, slow-cooked mutton curry with aromatic spices",
    description_ur: "خوشبودار مصالحوں کے ساتھ پکا ہوا روایتی مٹن قورمہ",
    price: 950,
    image_url: muttonQorma,
    is_available: true,
    sort_order: 4
  },
  {
    id: "item-haleem",
    category_id: "cat-desi-specials",
    name: "Haleem",
    name_ur: "حلیم",
    description: "Slow-cooked stew of beef, lentils, and wheat, garnished with ginger and lemon",
    description_ur: "گوشت، دالوں اور گندم کا آہستہ پکا ہوا گاڑھا سٹو",
    price: 280,
    image_url: haleem,
    is_available: true,
    sort_order: 5
  },
  {
    id: "item-nehari",
    category_id: "cat-desi-specials",
    name: "Nihari",
    name_ur: "نہاری",
    description: "Traditional slow-cooked beef shank stew served with ginger and lemon",
    description_ur: "نہایت لذیذ آہستہ پکا ہوا بیف کا روایتی سالن",
    price: 450,
    image_url: nehari,
    is_available: true,
    sort_order: 6
  },

  // BBQ & Tikka
  {
    id: "item-chicken-tikka",
    category_id: "cat-bbq-tikka",
    name: "Chicken Tikka",
    name_ur: "چکن ٹکہ",
    description: "Spiced chicken quarter leg/breast grilled over charcoal",
    description_ur: "کوئلوں پر سینکا ہوا چکن کا مصالحہ دار ٹکڑا",
    price: 220,
    image_url: chickenTikka,
    is_available: true,
    sort_order: 1
  },
  {
    id: "item-seekh-kebab",
    category_id: "cat-bbq-tikka",
    name: "Seekh Kebab",
    name_ur: "سیخ کباب",
    description: "Tender minced beef kebabs grilled to perfection",
    description_ur: "انتہائی نرم اور لذیذ گائے کے قیمے کے سیخ کباب",
    price: 300,
    image_url: sekhKaba,
    is_available: true,
    sort_order: 2
  },
  {
    id: "item-chapli-kebab",
    category_id: "cat-bbq-tikka",
    name: "Chapli Kebab",
    name_ur: "چپلی کباب",
    description: "Peshawari style pan-fried minced beef patty",
    description_ur: "پشاور کے روایتی انداز کے تلے ہوئے کباب",
    price: 250,
    image_url: chapliKebab,
    is_available: true,
    sort_order: 3
  },
  {
    id: "item-malai-boti",
    category_id: "cat-bbq-tikka",
    name: "Malai Boti",
    name_ur: "ملائی بوٹی",
    description: "Creamy, melt-in-the-mouth grilled chicken chunks",
    description_ur: "ملائی اور دہی سے بنی انتہائی نرم چکن بوٹی",
    price: 380,
    image_url: malaiBoti,
    is_available: true,
    sort_order: 4
  },

  // Fast Food
  {
    id: "item-zinger-burger",
    category_id: "cat-fast-food",
    name: "Zinger Burger",
    name_ur: "زنگر برگر",
    description: "Crispy fried chicken breast fillet in a soft bun with lettuce and mayo",
    description_ur: "کرسپی چکن فلٹ، مایونیز اور لیٹس کے ساتھ بند برگر",
    price: 320,
    image_url: zingerBurger,
    is_available: true,
    sort_order: 1
  },
  {
    id: "item-chicken-shawarma",
    category_id: "cat-fast-food",
    name: "Chicken Shawarma",
    name_ur: "چکن شوارما",
    description: "Spiced chicken wrap with garlic sauce and pickles",
    description_ur: "پراٹھے یا روٹی میں لپٹا چکن، مایو گارلک ساس کے ساتھ",
    price: 180,
    image_url: chickenShawarma,
    is_available: true,
    sort_order: 2
  },
  {
    id: "item-broast-chicken",
    category_id: "cat-fast-food",
    name: "Broast Chicken (4 pcs)",
    name_ur: "بروسٹ چکن (4 پی سیز)",
    description: "Crispy pressure-fried chicken, juicy inside, golden outside",
    description_ur: "خستہ اور رسیلا تلا ہوا چکن، ساس کے ساتھ",
    price: 480,
    image_url: broast,
    is_available: true,
    sort_order: 3
  },
  {
    id: "item-loaded-fries",
    category_id: "cat-fast-food",
    name: "Loaded Fries",
    name_ur: "لوڈڈ فرائز",
    description: "French fries loaded with melted cheese, chicken bits, and sauces",
    description_ur: "پگھلے ہوئے پنیر، چکن اور چٹنیوں سے بھرے ہوئے آلو کے چپس",
    price: 220,
    image_url: loadedFries,
    is_available: true,
    sort_order: 4
  },

  // Chaat & Street Food
  {
    id: "item-gol-gappa",
    category_id: "cat-chaat-street",
    name: "Gol Gappa (12 pcs)",
    name_ur: "گول گپا (12 پی سیز)",
    description: "Crispy hollow puris served with spicy sour water and chickpea filling",
    description_ur: "خستہ پوریاں، کھٹے میٹھے پانی اور چنوں کے مصالحے کے ساتھ",
    price: 180,
    image_url: golgappa,
    is_available: true,
    sort_order: 1
  },
  {
    id: "item-dahi-bhalla",
    category_id: "cat-chaat-street",
    name: "Dahi Bhalla",
    name_ur: "دہی بھلا",
    description: "Soft lentil dumplings in sweet/tangy yogurt with chutneys",
    description_ur: "دہی میں ڈوبے ہوئے بھلے، روایتی چٹنیوں کے ساتھ",
    price: 160,
    image_url: dahiBhalla,
    is_available: true,
    sort_order: 2
  },
  {
    id: "item-samosa-chaat",
    category_id: "cat-chaat-street",
    name: "Samosa Chaat",
    name_ur: "سموسہ چاٹ",
    description: "Crushed samosa with chickpeas, onions, yogurt, and chutneys",
    description_ur: "گرما گرم سموسے، دہی، چنے اور کھٹی میٹھی چٹنی کے ساتھ",
    price: 150,
    image_url: samosaChaat,
    is_available: true,
    sort_order: 3
  },
  {
    id: "item-aloo-tikki",
    category_id: "cat-chaat-street",
    name: "Aloo Tikki",
    name_ur: "آلو ٹکی",
    description: "Crispy pan-fried potato patties with green chutney",
    description_ur: "آلو اور مصالحوں کی تلی ہوئی ٹکیاں ہری چٹنی کے ساتھ",
    price: 100,
    image_url: alooTikki,
    is_available: true,
    sort_order: 4
  },

  // Drinks
  {
    id: "item-mango-lassi",
    category_id: "cat-drinks",
    name: "Mango Lassi",
    name_ur: "مینگو لسی",
    description: "Creamy yogurt drink blended with sweet mangoes",
    description_ur: "آم اور دہی سے بنی میٹھی اور ٹھنڈی لسی",
    price: 150,
    image_url: mangoLassi,
    is_available: true,
    sort_order: 1
  },
  {
    id: "item-doodh-patti",
    category_id: "cat-drinks",
    name: "Doodh Patti Chai",
    name_ur: "دودھ پتی چائے",
    description: "Strong, milky tea brewed to perfection",
    description_ur: "خالص دودھ اور پتی سے تیار کردہ کڑک چائے",
    price: 80,
    image_url: doodhPatti,
    is_available: true,
    sort_order: 2
  },
  {
    id: "item-rooh-afza",
    category_id: "cat-drinks",
    name: "Rooh Afza",
    name_ur: "روح افزا",
    description: "Refreshing traditional red syrup drink served chilled",
    description_ur: "خوشبودار روایتی لال شربت ٹھنڈے پانی یا دودھ کے ساتھ",
    price: 90,
    image_url: roohAfza,
    is_available: true,
    sort_order: 3
  }
];
