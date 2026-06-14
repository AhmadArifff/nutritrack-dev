# design.md — Konversi Landing Page NutriTrack ke React PWA + Tailwind CSS

> Sumber analisis: `landingpage.html` yang berisi landing page NutriTrack dengan Tailwind CDN, Google Fonts, Material Symbols, CSS custom animation, dan JavaScript DOM untuk scroll animation/interaksi hover.

---

## 1. Ringkasan Tampilan

Landing page ini memakai gaya **clean health-tech**, dominan **hijau nutrisi**, permukaan putih/biru muda, card besar rounded, efek glassmorphism, dan micro-interaction ringan.

Karakter visual utamanya:

- **Brand tone:** sehat, profesional, modern, ramah, data-driven.
- **Layout utama:** landing page one-page dengan sticky navbar, hero 2 kolom, bento stats, step guide, feature list, testimonial, CTA, footer.
- **UI style:** Material Design inspired dengan semantic token seperti `primary`, `surface`, `on-surface`, `surface-container`.
- **Animasi:** floating hero card, stagger reveal pada section langkah, hover scale card, active-ring, dan perubahan shadow navbar saat scroll.
- **Target implementasi lokal:** React + Vite + PWA + Tailwind CSS lokal, bukan CDN Tailwind.

---

## 2. Audit Struktur Elemen dari `landingpage.html`

| Urutan | Elemen | Fungsi UI | Layout Utama | Catatan Implementasi React |
|---:|---|---|---|---|
| 1 | `Header / Navbar` | Navigasi sticky, brand, CTA login/register | `sticky top-0`, tinggi `h-16`, max width `max-w-7xl` | Buat komponen `Navbar.jsx`; tambahkan hamburger untuk mobile karena HTML asli menyembunyikan nav desktop tapi belum menyediakan menu mobile. |
| 2 | `Hero Section` | Value proposition, CTA utama, social proof, visual meal card | Grid 1 kolom mobile, 2 kolom desktop | Buat `HeroSection.jsx`; pecah visual card menjadi `NutritionPreviewCard.jsx`. |
| 3 | `Bento Stats Section` | Highlight nutrisi dan program berat badan | Grid 1 kolom mobile, 3 kolom desktop | Buat `BentoStats.jsx`; card kiri `md:col-span-2`, card kanan accent green. |
| 4 | `How It Works` | 3 langkah penggunaan | Grid 1 kolom mobile, 3 kolom desktop dengan dashed connector | Buat `HowItWorks.jsx`; gunakan hook IntersectionObserver untuk reveal. |
| 5 | `Features Section` | List fitur cerdas dan floating reminder card | Flex column mobile, row desktop | Ada area visual kiri yang kosong di HTML asli. Disarankan isi dengan mockup dashboard/phone. |
| 6 | `Testimonials` | Social proof 3 kartu pengguna | Grid responsive | Buat data-driven array `testimonials`. |
| 7 | `CTA Section` | Final conversion | Card besar hijau, rounded 3rem | Buat `CTASection.jsx`. |
| 8 | `Footer` | Navigasi sekunder dan branding | Grid 1 kolom mobile, 4 kolom desktop | Buat `Footer.jsx`; gunakan data array untuk link. |

---

## 3. Design Token Warna

### 3.1 Palet Warna Lengkap dari HTML

| Token Tailwind | Hex |
|---|---|
| `error` | `#ba1a1a` |
| `surface-variant` | `#d3e4fe` |
| `tertiary` | `#9e4036` |
| `error-red` | `#ef4444` |
| `on-primary-container` | `#004b1e` |
| `primary` | `#006e2f` |
| `surface-container` | `#e5eeff` |
| `surface-container-high` | `#dce9ff` |
| `surface-container-lowest` | `#ffffff` |
| `on-primary-fixed-variant` | `#005321` |
| `primary-container` | `#22c55e` |
| `tertiary-container` | `#ff8b7c` |
| `inverse-on-surface` | `#eaf1ff` |
| `primary-fixed` | `#6bff8f` |
| `mint-surface` | `#f0fdf4` |
| `on-error` | `#ffffff` |
| `energy-orange` | `#f97316` |
| `background` | `#f8f9ff` |
| `on-background` | `#0b1c30` |
| `on-tertiary` | `#ffffff` |
| `primary-fixed-dim` | `#4ae176` |
| `on-surface-variant` | `#3d4a3d` |
| `on-secondary` | `#ffffff` |
| `on-tertiary-container` | `#76231b` |
| `tertiary-fixed` | `#ffdad5` |
| `on-error-container` | `#93000a` |
| `on-tertiary-fixed-variant` | `#7f2a21` |
| `secondary-fixed-dim` | `#adc6ff` |
| `error-container` | `#ffdad6` |
| `on-surface` | `#0b1c30` |
| `outline-variant` | `#bccbb9` |
| `secondary` | `#0058be` |
| `on-primary` | `#ffffff` |
| `on-secondary-fixed-variant` | `#004395` |
| `on-secondary-container` | `#fefcff` |
| `bg-light` | `#f8fafc` |
| `surface-container-highest` | `#d3e4fe` |
| `tertiary-fixed-dim` | `#ffb4a9` |
| `surface-bright` | `#f8f9ff` |
| `on-tertiary-fixed` | `#410001` |
| `secondary-container` | `#2170e4` |
| `secondary-fixed` | `#d8e2ff` |
| `surface-tint` | `#006e2f` |
| `card-dark` | `#1e293b` |
| `surface-container-low` | `#eff4ff` |
| `on-secondary-fixed` | `#001a42` |
| `on-primary-fixed` | `#002109` |
| `surface-dim` | `#cbdbf5` |
| `achievement-purple` | `#a855f7` |
| `outline` | `#6d7b6c` |
| `inverse-surface` | `#213145` |
| `warning-yellow` | `#eab308` |
| `surface` | `#f8f9ff` |
| `card-light` | `#ffffff` |
| `bg-dark` | `#0f172a` |
| `inverse-primary` | `#4ae176` |

### 3.2 Token Warna Utama yang Harus Dipakai

| Kategori | Token | Hex | Fungsi |
|---|---|---:|---|
| Primary brand | `primary` | `#006e2f` | Tombol utama, ikon brand, teks highlight. |
| Primary light accent | `primary-container` | `#22c55e` | CTA secondary, card accent, badge. |
| Background | `background` / `surface` | `#f8f9ff` | Latar halaman. |
| Surface elevated | `surface-container` | `#e5eeff` | Card biru muda, section testimonial. |
| Surface low | `surface-container-low` | `#eff4ff` | Hover feature item. |
| Text utama | `on-background` / `on-surface` | `#0b1c30` | Heading dan teks utama. |
| Text sekunder | `on-surface-variant` | `#3d4a3d` | Paragraph, nav link, metadata. |
| Secondary blue | `secondary` | `#0058be` | Macro card, ikon meal scheduling. |
| Energy orange | `energy-orange` | `#f97316` | Karbo, reminder api, elemen energi. |
| Achievement purple | `achievement-purple` | `#a855f7` | Badge achievement/trophy. |
| Warning star | `warning-yellow` | `#eab308` | Rating bintang. |

### 3.3 Catatan Kontras Aksesibilitas

Hasil estimasi contrast ratio untuk pasangan penting:

| Pair | Rasio | Status |
|---|---:|---|
| `primary #006e2f` + `white` | 6.42:1 | Aman untuk teks normal. |
| `primary-container #22c55e` + `on-primary-container #004b1e` | 4.55:1 | Lolos minimum teks normal, tetapi jangan diperkecil ekstrem. |
| `background #f8f9ff` + `on-background #0b1c30` | 16.34:1 | Sangat aman. |
| `surface-container #e5eeff` + `on-surface-variant #3d4a3d` | 8.02:1 | Sangat aman. |
| `achievement-purple #a855f7` + `white` | 3.96:1 | Cocok untuk ikon besar/badge, kurang ideal untuk teks kecil. Gunakan teks gelap/ungu tua jika dipakai sebagai teks kecil. |

---

## 4. Typography System

Landing page memakai 4 font family:

| Fungsi | Font | Penggunaan |
|---|---|---|
| Heading | `Poppins` | H1, H2, H3, brand name. |
| Body | `Nunito` | Paragraph dan teks konten. |
| Label/UI | `Inter` | Nav link, label kecil, CTA label. |
| Metric | `JetBrains Mono` | Angka progress seperti `85%`. |

### Skala Font

| Token | Size | Line Height | Weight | Penggunaan |
|---|---:|---:|---:|---|
| `label-sm` | 12px | 1.4 | 600 | Badge kecil, label versi. |
| `label-md` | 14px | 1.4 | 500 | Navbar, label card. |
| `body-md` | 16px | 1.5 | 400 | Body default. |
| `body-lg` | 18px | 1.6 | 400 | Paragraph hero. |
| `headline-md` | 24px | 1.3 | 600 | Judul card/fitur. |
| `headline-lg` | 32px | 1.25 | 600 | Section heading. |
| `headline-xl` | 48px | 1.2 | 700 | Hero heading desktop. |
| `headline-lg-mobile` | 28px | 1.25 | 600 | Hero/section mobile fallback. |
| `metrics-mono` | 16px | 1 | 500 | Angka progress/statistik. |

---

## 5. Spacing, Radius, Shadow, dan Layout

### 5.1 Spacing Token

| Token | Value | Penggunaan |
|---|---:|---|
| `unit` | 4px | Unit dasar. |
| `gutter-mobile` | 16px | Padding horizontal mobile. |
| `gutter-desktop` | 24px | Padding horizontal desktop. |
| `section-gap` | 32px | Gap antar blok. |
| `card-padding` | 20px | Padding standar card. |
| `margin-page` | 24px | Margin halaman. |

### 5.2 Radius

| Token/Class | Value | Penggunaan |
|---|---:|---|
| `rounded-xl` | 0.75rem | Tombol dan small card. |
| `rounded-2xl` | 1rem | Metric cards, progress cards. |
| `rounded-3xl` | 1.5rem | Icon container, floating reminder. |
| `rounded-[2rem]` | 2rem | Bento card, testimonial card. |
| `rounded-[2.5rem]` | 2.5rem | Hero visual card. |
| `rounded-[3rem]` | 3rem | CTA section. |
| `rounded-full` | 9999px | Avatar, pill badge, icon circle. |

### 5.3 Shadow

| Class | Fungsi |
|---|---|
| `shadow-sm` | Header/card lembut. |
| `shadow-md` | Header ketika scroll. |
| `shadow-lg` | CTA utama dan accent card. |
| `shadow-xl` | Icon step dan achievement badge. |
| `shadow-2xl` | Hero card, floating reminder, CTA card. |

---

## 6. Animasi dan Micro Interaction

### 6.1 Floating Hero Card

Dipakai pada visual card hero dengan class `.floating`.

```css
@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
}

.floating {
  animation: float 4s ease-in-out infinite;
}
```

**Konversi Tailwind lokal yang disarankan:**

```js
// tailwind.config.js
theme: {
  extend: {
    keyframes: {
      float: {
        "0%, 100%": { transform: "translateY(0px)" },
        "50%": { transform: "translateY(-10px)" },
      },
    },
    animation: {
      float: "float 4s ease-in-out infinite",
    },
  },
}
```

Lalu pakai:

```jsx
<div className="animate-float bg-white p-6 rounded-[2.5rem] shadow-2xl">
  ...
</div>
```

### 6.2 Stagger Reveal on Scroll

HTML asli memakai `IntersectionObserver` untuk menambah class `.visible` pada `.staggered-item`.

```css
.staggered-item {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s ease-out;
}

.staggered-item.visible {
  opacity: 1;
  transform: translateY(0);
}
```

**Versi React yang disarankan:**

```jsx
// src/hooks/useRevealOnScroll.js
import { useEffect } from "react";

export function useRevealOnScroll(selector = ".reveal-item") {
  useEffect(() => {
    const elements = document.querySelectorAll(selector);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [selector]);
}
```

```css
/* src/index.css */
.reveal-item {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 600ms ease-out, transform 600ms ease-out;
}

.reveal-item.is-visible {
  opacity: 1;
  transform: translateY(0);
}
```

### 6.3 Active Ring on Hover

HTML asli menambah class `.active-ring` dengan JavaScript ketika hover card.

```css
.active-ring {
  box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.2);
}
```

**Versi React/Tailwind lebih optimal:**

```jsx
<div className="transition-all hover:scale-[1.02] hover:ring-4 hover:ring-primary-container/20">
  ...
</div>
```

Efeknya lebih deklaratif, tidak perlu `querySelector`, dan lebih aman untuk lifecycle React.

### 6.4 Header Scroll Effect

HTML asli mengganti `shadow-sm` menjadi `shadow-md` saat `window.scrollY > 50`.

**Versi React:**

```jsx
import { useEffect, useState } from "react";

export function useScrolled(threshold = 50) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}
```

```jsx
const scrolled = useScrolled();

<header
  className={`sticky top-0 z-50 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/30 transition-shadow ${scrolled ? "shadow-md" : "shadow-sm"}`}
>
  ...
</header>
```

### 6.5 Button Interaction

Pattern tombol:

```txt
hover:scale-105 active:scale-95 transition-all
```

Gunakan untuk CTA utama agar terasa responsif. Untuk aksesibilitas, tambahkan `focus-visible:ring-4 focus-visible:ring-primary/20`.

---

## 7. Implementasi Tailwind Lokal

### 7.1 Install Tailwind untuk React Vite PWA

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm install vite-plugin-pwa
```

Jika tetap ingin ikon seperti HTML asli:

```bash
# Tidak wajib. Material Symbols bisa via link font di index.html.
```

Alternatif lebih React-native:

```bash
npm install lucide-react
```

### 7.2 `tailwind.config.js`

```js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "error": "#ba1a1a",
        "surface-variant": "#d3e4fe",
        "tertiary": "#9e4036",
        "error-red": "#ef4444",
        "on-primary-container": "#004b1e",
        "primary": "#006e2f",
        "surface-container": "#e5eeff",
        "surface-container-high": "#dce9ff",
        "surface-container-lowest": "#ffffff",
        "on-primary-fixed-variant": "#005321",
        "primary-container": "#22c55e",
        "tertiary-container": "#ff8b7c",
        "inverse-on-surface": "#eaf1ff",
        "primary-fixed": "#6bff8f",
        "mint-surface": "#f0fdf4",
        "on-error": "#ffffff",
        "energy-orange": "#f97316",
        "background": "#f8f9ff",
        "on-background": "#0b1c30",
        "on-tertiary": "#ffffff",
        "primary-fixed-dim": "#4ae176",
        "on-surface-variant": "#3d4a3d",
        "on-secondary": "#ffffff",
        "on-tertiary-container": "#76231b",
        "tertiary-fixed": "#ffdad5",
        "on-error-container": "#93000a",
        "on-tertiary-fixed-variant": "#7f2a21",
        "secondary-fixed-dim": "#adc6ff",
        "error-container": "#ffdad6",
        "on-surface": "#0b1c30",
        "outline-variant": "#bccbb9",
        "secondary": "#0058be",
        "on-primary": "#ffffff",
        "on-secondary-fixed-variant": "#004395",
        "on-secondary-container": "#fefcff",
        "bg-light": "#f8fafc",
        "surface-container-highest": "#d3e4fe",
        "tertiary-fixed-dim": "#ffb4a9",
        "surface-bright": "#f8f9ff",
        "on-tertiary-fixed": "#410001",
        "secondary-container": "#2170e4",
        "secondary-fixed": "#d8e2ff",
        "surface-tint": "#006e2f",
        "card-dark": "#1e293b",
        "surface-container-low": "#eff4ff",
        "on-secondary-fixed": "#001a42",
        "on-primary-fixed": "#002109",
        "surface-dim": "#cbdbf5",
        "achievement-purple": "#a855f7",
        "outline": "#6d7b6c",
        "inverse-surface": "#213145",
        "warning-yellow": "#eab308",
        "surface": "#f8f9ff",
        "card-light": "#ffffff",
        "bg-dark": "#0f172a",
        "inverse-primary": "#4ae176"
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px"
      },
      spacing: {
        unit: "4px",
        "section-gap": "32px",
        "gutter-mobile": "16px",
        "gutter-desktop": "24px",
        "card-padding": "20px",
        "margin-page": "24px"
      },
      fontFamily: {
        "label-sm": ["Inter", "sans-serif"],
        "label-md": ["Inter", "sans-serif"],
        "body-lg": ["Nunito", "sans-serif"],
        "headline-md": ["Poppins", "sans-serif"],
        "metrics-mono": ["JetBrains Mono", "monospace"],
        "headline-lg": ["Poppins", "sans-serif"],
        "body-md": ["Nunito", "sans-serif"],
        "headline-xl": ["Poppins", "sans-serif"],
        "headline-lg-mobile": ["Poppins", "sans-serif"]
      },
      fontSize: {
        "label-sm": ["12px", { lineHeight: "1.4", letterSpacing: "0.05em", fontWeight: "600" }],
        "label-md": ["14px", { lineHeight: "1.4", letterSpacing: "0.01em", fontWeight: "500" }],
        "body-lg": ["18px", { lineHeight: "1.6", fontWeight: "400" }],
        "headline-md": ["24px", { lineHeight: "1.3", fontWeight: "600" }],
        "metrics-mono": ["16px", { lineHeight: "1", fontWeight: "500" }],
        "headline-lg": ["32px", { lineHeight: "1.25", fontWeight: "600" }],
        "body-md": ["16px", { lineHeight: "1.5", fontWeight: "400" }],
        "headline-xl": ["48px", { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "700" }],
        "headline-lg-mobile": ["28px", { lineHeight: "1.25", fontWeight: "600" }]
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" }
        }
      },
      animation: {
        float: "float 4s ease-in-out infinite"
      }
    }
  },
  plugins: [
    require("@tailwindcss/forms")
  ]
};
```

### 7.3 `src/index.css`

```css
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;900&family=Nunito:wght@400;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap");

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }

  body {
    @apply bg-background text-on-background font-body-md overflow-x-hidden;
  }
}

@layer components {
  .glass {
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.3);
  }

  .material-symbols-outlined {
    font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24;
  }

  .material-filled {
    font-variation-settings: "FILL" 1, "wght" 400, "GRAD" 0, "opsz" 24;
  }

  .reveal-item {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 600ms ease-out, transform 600ms ease-out;
  }

  .reveal-item.is-visible {
    opacity: 1;
    transform: translateY(0);
  }

  .focus-ring {
    @apply focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20;
  }

  .btn-primary {
    @apply inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 text-lg font-bold text-white shadow-lg transition-all hover:scale-105 hover:shadow-primary/20 active:scale-95 focus-ring;
  }

  .btn-glass {
    @apply inline-flex items-center justify-center gap-2 rounded-xl px-8 py-4 text-lg font-bold transition-all hover:bg-white/90 focus-ring;
  }

  .section-shell {
    @apply px-gutter-mobile md:px-gutter-desktop;
  }

  .container-shell {
    @apply mx-auto max-w-7xl;
  }

  .card-soft {
    @apply rounded-[2rem] border border-outline-variant/30 bg-white shadow-sm;
  }
}
```

---

## 8. Struktur Folder React PWA

```txt
src/
  assets/
    images/
      hero-food.webp
      avatar-andi.webp
      avatar-siti.webp
      avatar-budi.webp
  components/
    layout/
      Navbar.jsx
      Footer.jsx
    landing/
      HeroSection.jsx
      NutritionPreviewCard.jsx
      BentoStats.jsx
      HowItWorks.jsx
      FeaturesSection.jsx
      Testimonials.jsx
      CTASection.jsx
      MaterialIcon.jsx
  data/
    landingData.js
  hooks/
    useRevealOnScroll.js
    useScrolled.js
  App.jsx
  main.jsx
  index.css
tailwind.config.js
vite.config.js
public/
  manifest.webmanifest
  icons/
```

---

## 9. Data Model untuk Konten Landing Page

Gunakan data array agar UI mudah di-maintain.

```js
// src/data/landingData.js
export const navLinks = [
  { label: "Cara Kerja", href: "#how-it-works" },
  { label: "Fitur", href: "#features" },
  { label: "Testimoni", href: "#testimonials" },
];

export const macroStats = [
  { label: "PROTEIN", value: "124g", colorClass: "text-primary" },
  { label: "KARBO", value: "210g", colorClass: "text-energy-orange" },
  { label: "LEMAK", value: "55g", colorClass: "text-secondary" },
];

export const steps = [
  {
    number: 1,
    title: "Log Makanan",
    description: "Catat apa pun yang Anda makan. Database kami mencakup ribuan masakan lokal Indonesia.",
    icon: "add_box",
    colorClass: "text-primary",
    bgClass: "bg-primary",
    borderClass: "border-primary/10",
    delay: "100ms"
  },
  {
    number: 2,
    title: "Pantau Berat",
    description: "Ukur berat badan berkala dan biarkan AI kami menganalisis tren serta progres kesehatan Anda.",
    icon: "insights",
    colorClass: "text-secondary",
    bgClass: "bg-secondary",
    borderClass: "border-secondary/10",
    delay: "300ms"
  },
  {
    number: 3,
    title: "Raih Achievement",
    description: "Kumpulkan badge dan poin setiap kali Anda mencapai target mingguan atau harian.",
    icon: "stars",
    colorClass: "text-achievement-purple",
    bgClass: "bg-achievement-purple",
    borderClass: "border-achievement-purple/10",
    delay: "500ms"
  }
];

export const features = [
  {
    title: "Analisis Nutrisi AI",
    description: "AI memprediksi sisa kalori harian dan merekomendasikan porsi yang tepat untuk mencapai target Anda.",
    icon: "psychology",
    iconClass: "text-primary",
    iconBg: "bg-mint-surface",
    borderClass: "border-primary/10"
  },
  {
    title: "Meal Scheduling Otomatis",
    description: "Atur jadwal makan mingguan dan dapatkan pengingat tepat waktu di browser atau smartphone.",
    icon: "calendar_month",
    iconClass: "text-secondary",
    iconBg: "bg-surface-container",
    borderClass: "border-secondary/10"
  },
  {
    title: "Hydration Tracker 3D",
    description: "Visualisasi botol air 3D yang mengisi seiring catatan asupan air harian.",
    icon: "water_drop",
    iconClass: "text-tertiary",
    iconBg: "bg-tertiary-fixed",
    borderClass: "border-tertiary/10"
  }
];

export const testimonials = [
  {
    name: "Andi Pratama",
    role: "Karyawan Swasta",
    quote: "Dulu saya sering lupa makan teratur karena sibuk di kantor. Berkat fitur reminder NutriTrack, pola makan saya jadi jauh lebih stabil dan saya berhasil turun 5kg!",
    image: "/images/avatar-andi.webp"
  },
  {
    name: "Siti Aminah",
    role: "Mahasiswi",
    quote: "Database makanannya sangat lengkap, bahkan sampai jajanan pasar pun ada kalorinya! Sangat membantu saya yang sedang program bulking sehat.",
    image: "/images/avatar-siti.webp"
  },
  {
    name: "Budi Santoso",
    role: "Entrepreneur",
    quote: "Aplikasi paling user-friendly yang pernah saya coba. Progres grafiknya sangat jelas dan badge achievement-nya bikin semangat setiap hari.",
    image: "/images/avatar-budi.webp"
  }
];
```

---

## 10. Review Per Elemen dan Arahan Implementasi

### 10.1 Navbar

**Elemen visual:**

- Sticky top navigation.
- Background semi-transparan `bg-surface/80`.
- Blur `backdrop-blur-xl`.
- Border bawah `border-outline-variant/30`.
- Brand memakai ikon `restaurant_menu` + teks `NutriTrack`.
- CTA kanan: `Masuk` dan `Daftar Sekarang`.

**Class utama:**

```txt
w-full sticky top-0 z-50 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/30 shadow-sm
```

**Upgrade untuk project lokal:**

- Tambahkan hamburger mobile.
- Tambahkan `aria-label`.
- Tambahkan `focus-visible` ring.
- Pada PWA, gunakan safe-area untuk perangkat mobile modern.

```jsx
<header className="sticky top-0 z-50 border-b border-outline-variant/30 bg-surface/80 backdrop-blur-xl transition-shadow">
  <div className="container-shell flex h-16 items-center justify-between px-gutter-mobile md:px-gutter-desktop">
    ...
  </div>
</header>
```

---

### 10.2 Hero Section

**Elemen visual:**

- Hero tinggi besar `min-h-[921px]`.
- Grid 1 kolom mobile, 2 kolom desktop.
- Badge versi `Versi 1.0.0 Resmi Diluncurkan`.
- H1 besar dengan highlight `text-primary`.
- CTA utama dan secondary glass.
- Avatar stack dan social proof `15,000+`.
- Card visual floating berisi image makanan, meal summary, progress target, badge trophy.

**Catatan optimasi:**

- `min-h-[921px]` sangat fixed. Untuk React PWA lebih adaptif:
  - Desktop: `min-h-[calc(100svh-64px)]`
  - Mobile: `py-20`
- Image dari remote Google harus diganti local asset/webp agar PWA lebih cepat dan bisa cache offline.
- Gunakan `loading="eager"` untuk hero image jika LCP, avatar bisa `loading="lazy"`.

**Class utama section:**

```txt
relative min-h-[921px] flex items-center pt-20 pb-32 px-gutter-mobile md:px-gutter-desktop overflow-hidden
```

**Rekomendasi class React:**

```txt
relative flex min-h-[calc(100svh-64px)] items-center overflow-hidden px-gutter-mobile py-20 md:px-gutter-desktop lg:py-28
```

---

### 10.3 Hero Visual Card

**Elemen visual:**

- Card putih besar, rounded 2.5rem.
- Shadow tebal, border putih transparan.
- Efek floating 4 detik.
- Background glow hijau blur `absolute w-[120%] h-[120%] bg-primary/5 rounded-full blur-3xl`.
- Badge trophy 3D mini: `absolute -top-6 -right-6`, purple, rotate 12 derajat.

**Class card:**

```txt
relative floating bg-white p-6 rounded-[2.5rem] shadow-2xl border border-white/50 max-w-[450px]
```

**Rekomendasi React:**

```jsx
<div className="relative animate-float max-w-[450px] rounded-[2.5rem] border border-white/50 bg-white p-6 shadow-2xl">
  ...
</div>
```

---

### 10.4 Bento Stats Section

**Elemen visual:**

- Section putih.
- Card kiri span 2 kolom, background `surface-container`.
- Metric cards horizontal scroll.
- Card kanan hijau terang `primary-container`.
- Hover scale pada card kanan.

**Catatan UI:**

- Metric cards `min-w-[140px]` bagus untuk mobile horizontal scrolling.
- Tambahkan scrollbar styling atau `scrollbar-hide` bila ingin lebih clean.
- Bisa dihubungkan ke data real app: total protein/karbo/lemak harian user.

---

### 10.5 How It Works

**Elemen visual:**

- 3 step card dengan icon besar.
- Connector garis dashed di desktop.
- Step item muncul dengan stagger delay 0.1s, 0.3s, 0.5s.

**Class penting:**

```txt
hidden md:block absolute top-1/2 left-1/4 right-1/4 h-0.5 border-t-2 border-dashed border-primary/20 -translate-y-12
```

**React Implementation:**

- Render `steps.map`.
- Tambahkan `style={ transitionDelay: step.delay }`.
- Panggil `useRevealOnScroll(".reveal-item")` di component.

---

### 10.6 Features Section

**Elemen visual:**

- Layout 2 kolom desktop.
- Sebelah kanan berisi heading dan 3 feature rows.
- Setiap feature row hover menjadi `bg-surface-container-low`.
- Icon container berukuran `w-14 h-14`, rounded-2xl.
- Ada floating reminder card di kiri bawah.

**Temuan penting:**

Di HTML asli, area kiri `relative` hampir kosong dan hanya ada floating reminder card absolute. Hasilnya kemungkinan terlihat seperti section kiri kosong, terutama desktop. Untuk implementasi lokal, tambahkan salah satu:

1. Mockup phone dashboard.
2. Screenshot dashboard nutrisi.
3. Ilustrasi 3D hydration bottle.
4. Mini chart calories/progress.

**Rekomendasi:**

```jsx
<div className="relative mx-auto aspect-[4/5] w-full max-w-[420px] rounded-[2.5rem] bg-surface-container p-6 shadow-xl">
  <DashboardMockup />
  <ReminderCard className="absolute -bottom-6 -left-6" />
</div>
```

---

### 10.7 Testimonials

**Elemen visual:**

- Section background `surface-container`.
- 3 kartu putih dengan rounded 2rem.
- 5 star icon warna `warning-yellow`.
- Quote italic.
- Avatar + nama + role.

**Optimasi:**

- Render dari data array.
- Pakai `loading="lazy"` untuk avatar.
- Hover scale dapat dibuat murni Tailwind:
  `hover:scale-[1.02] hover:ring-4 hover:ring-primary-container/20`.

---

### 10.8 CTA Section

**Elemen visual:**

- Card besar hijau `bg-primary`.
- Rounded 3rem.
- Text putih.
- Dua tombol: putih-primary dan primary-container.
- Shadow 2xl.

**Class utama:**

```txt
max-w-5xl mx-auto bg-primary rounded-[3rem] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl
```

**Upgrade:**

- Tambahkan glow radial background:
  `before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_45%)]`
- Tambahkan `aria-label` pada CTA.

---

### 10.9 Footer

**Elemen visual:**

- Background `on-background #0b1c30`.
- Brand hijau terang `primary-fixed-dim`.
- Grid 4 kolom desktop.
- Link putih opacity 60%, hover hijau.
- Border top putih 10%.

**Rekomendasi:**

- Footer link sebaiknya dibuat data-driven.
- Gunakan semantic `<nav aria-label="Footer">`.
- Link internal React bisa memakai `react-router-dom` jika bukan anchor external.

---

## 11. Komponen Ikon

Jika ingin tetap sama seperti HTML asli, buat wrapper:

```jsx
// src/components/landing/MaterialIcon.jsx
export default function MaterialIcon({
  children,
  filled = false,
  className = "",
  ...props
}) {
  return (
    <span
      className={`material-symbols-outlined ${filled ? "material-filled" : ""} ${className}`}
      aria-hidden="true"
      {...props}
    >
      {children}
    </span>
  );
}
```

Pemakaian:

```jsx
<MaterialIcon filled className="text-primary text-3xl">
  restaurant_menu
</MaterialIcon>
```

---

## 12. Checklist Implementasi React PWA

### 12.1 Wajib

- [ ] Pindahkan Tailwind config dari CDN ke `tailwind.config.js`.
- [ ] Pindahkan CSS custom ke `src/index.css`.
- [ ] Buat component-based architecture.
- [ ] Ganti DOM manipulation manual dengan state/hook React.
- [ ] Tambahkan hamburger menu mobile.
- [ ] Tambahkan `aria-label` pada tombol hamburger dan CTA penting.
- [ ] Gunakan local optimized image `.webp`.
- [ ] Tambahkan `loading="lazy"` untuk image non-hero.
- [ ] Tambahkan `focus-visible` state.
- [ ] Setup PWA manifest dan service worker.

### 12.2 PWA

Gunakan `vite-plugin-pwa`:

```js
// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "icons/*.png"],
      manifest: {
        name: "NutriTrack",
        short_name: "NutriTrack",
        description: "Pendamping kesehatan dan nutrisi profesional.",
        theme_color: "#006e2f",
        background_color: "#f8f9ff",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "/icons/icon-192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/icons/icon-512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      }
    })
  ]
});
```

---

## 13. Contoh Struktur `App.jsx`

```jsx
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import HeroSection from "./components/landing/HeroSection";
import BentoStats from "./components/landing/BentoStats";
import HowItWorks from "./components/landing/HowItWorks";
import FeaturesSection from "./components/landing/FeaturesSection";
import Testimonials from "./components/landing/Testimonials";
import CTASection from "./components/landing/CTASection";

export default function App() {
  return (
    <div className="min-h-screen bg-background text-on-background font-body-md overflow-x-hidden">
      <Navbar />
      <main>
        <HeroSection />
        <BentoStats />
        <HowItWorks />
        <FeaturesSection />
        <Testimonials />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
```

---

## 14. Prioritas Perbaikan dari HTML Asli

| Prioritas | Masalah / Peluang | Solusi |
|---:|---|---|
| P0 | Tailwind masih CDN | Pindahkan ke `tailwind.config.js` agar build production optimal. |
| P0 | Mobile nav belum ada hamburger | Tambahkan drawer/menu mobile. |
| P0 | Interaksi DOM manual | Ubah menjadi React hooks dan Tailwind state. |
| P1 | Feature visual kiri kosong | Tambahkan dashboard mockup/phone mockup agar section seimbang. |
| P1 | Remote image panjang dari Googleusercontent | Simpan sebagai local optimized assets, convert ke WebP/AVIF. |
| P1 | Fixed hero height `min-h-[921px]` | Ganti ke responsive `min-h-[calc(100svh-64px)]`. |
| P2 | Banyak font request redundant | Pakai 1 `@import` Google Fonts atau self-host font. |
| P2 | `achievement-purple` + white kurang ideal untuk teks kecil | Pakai hanya ikon besar/badge atau buat token `on-achievement`. |
| P2 | Belum ada reduced-motion support | Tambahkan `motion-reduce:animate-none`. |

---

## 15. Rekomendasi Final UI/UX

1. **Pertahankan warna hijau `primary` sebagai identitas utama.** Warna ini sudah kuat untuk tema kesehatan dan punya contrast bagus dengan putih.
2. **Gunakan surface biru muda sebagai pembeda section.** Ini membuat landing page terasa modern dan tidak flat.
3. **Perkuat visual section fitur.** Tambahkan mockup app karena saat ini sisi kiri terlihat kurang lengkap.
4. **Gunakan animation secukupnya.** Floating card dan scroll reveal sudah cukup; jangan menambahkan terlalu banyak motion agar PWA tetap ringan.
5. **Jadikan semua konten data-driven.** Testimonials, macro stats, nav links, fitur, dan footer link sebaiknya berasal dari array.
6. **Optimalkan PWA.** Simpan gambar lokal, lazy load, cache static assets, dan gunakan manifest dengan warna `#006e2f`.
7. **Tambahkan mobile drawer.** Ini wajib karena HTML asli sudah menyembunyikan nav desktop pada mobile, tetapi belum menyediakan pengganti navigasi.

---

## 16. Acceptance Criteria

Landing page React PWA dianggap selesai jika:

- [ ] Tampilan desktop memiliki layout identik/minimal sangat mirip dengan HTML sumber.
- [ ] Tampilan mobile punya navbar hamburger yang bisa dibuka/tutup.
- [ ] Semua token warna tersedia di `tailwind.config.js`.
- [ ] Hero card memiliki animasi floating.
- [ ] How It Works muncul dengan reveal animation saat scroll.
- [ ] Header shadow berubah saat halaman discroll.
- [ ] Semua CTA punya hover, active, dan focus state.
- [ ] Tidak ada Tailwind CDN di production.
- [ ] PWA bisa di-install di browser.
- [ ] Lighthouse Performance minimal 85 untuk mobile setelah image dioptimasi.
- [ ] Tidak ada console error dari React lifecycle atau DOM selector manual.

---

## 17. Catatan Adaptasi untuk Project Lokal Anda

Jika landing page ini dipakai untuk project lokal lain, misalnya aplikasi dashboard, croscek, data analyst, atau sistem internal:

- Ganti brand `NutriTrack` dengan nama aplikasi.
- Pertahankan semantic token warna, tetapi ubah `primary` sesuai brand utama.
- Hero visual card dapat diganti menjadi:
  - dashboard KPI,
  - tabel preview,
  - chart analytics,
  - card status real-time,
  - progress import/export data.
- Bento stats cocok untuk angka KPI seperti total user, data valid, data error, progress harian.
- How It Works cocok untuk alur: upload data → validasi → proses → rekap/export.
- Testimonials bisa diganti menjadi `Case Study`, `Benefit`, atau `Core Feature`.

