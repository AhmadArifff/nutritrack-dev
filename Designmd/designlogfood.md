# designlogfood.md — Analisis UI & Panduan Implementasi React PWA + Tailwind CSS

Dokumen ini berisi hasil analisis tampilan dari `logfood.html` untuk dikonversi ke project lokal berbasis **React PWA + Tailwind CSS**. Fokus utama dokumen ini adalah memastikan semua elemen visual, warna, layout, interaksi, dan animasi dari halaman **Daily Food Log — NutriTrack** dapat diimplementasikan ulang secara konsisten, modular, dan siap dikembangkan menjadi aplikasi produksi.

---

## 1. Ringkasan Tampilan

Halaman `logfood.html` adalah halaman pencatatan makanan harian dengan konsep **health-tech dashboard**. Tampilan memakai gaya:

- **Clean light dashboard**
- **Glassmorphism card**
- **Material Design-inspired color token**
- **Bento grid layout**
- **Sidebar app shell**
- **Floating action button**
- **Micro-interaction hover**
- **Nutrition data visualization**

Secara visual, halaman ini cocok untuk aplikasi:
- food tracker,
- meal planner,
- calorie counter,
- habit tracker,
- dashboard nutrisi berbasis AI,
- PWA kesehatan personal.

---

## 2. Identitas Visual

### Brand

| Item | Nilai |
|---|---|
| Nama aplikasi | NutriTrack |
| Halaman | Daily Food Log |
| Karakter UI | Modern, bersih, ringan, profesional |
| Tema utama | Nutrisi, kesehatan, produktivitas |
| Visual mood | Fresh, reliable, data-driven |
| Warna dominan | Hijau primer, biru sekunder, oranye energi |
| Layout utama | Sidebar kiri + content canvas |
| Style card | Glass card dengan blur dan border soft |

---

## 3. Struktur Halaman

Urutan struktur utama dari halaman:

```txt
body
├── aside#sidebar
│   ├── logo brand
│   ├── collapse button
│   ├── primary navigation
│   ├── premium upgrade card
│   ├── help center link
│   └── logout link
│
├── main#mainContent
│   ├── sticky top app bar
│   │   ├── page title
│   │   ├── date
│   │   ├── search input
│   │   ├── notification button
│   │   ├── settings button
│   │   └── profile shortcut
│   │
│   ├── page header & summary
│   │   ├── title Daily Food Log
│   │   ├── date
│   │   └── calorie summary card
│   │
│   ├── food search & log section
│   │   ├── left column
│   │   │   ├── search food database card
│   │   │   └── recent history card
│   │   │
│   │   └── right column
│   │       ├── session cards grid
│   │       │   ├── Breakfast card
│   │       │   ├── Lunch card
│   │       │   ├── Dinner empty state
│   │       │   └── Snacks card
│   │       └── macro distribution visual card
│   │
│   └── quick add FAB
```

---

## 4. Design Token Warna

Warna di file HTML menggunakan skema token semantik yang mirip **Material You / Material Design 3**. Untuk project React + Tailwind, pertahankan token ini agar landing page, dashboard, dan log food tetap konsisten.

### 4.1 Core Brand Colors

| Token | Hex | Fungsi |
|---|---:|---|
| `primary` | `#006e2f` | Warna brand utama, CTA, icon aktif |
| `primary-container` | `#22c55e` | Background menu aktif, badge hijau |
| `on-primary` | `#ffffff` | Text/icon di atas primary |
| `on-primary-container` | `#004b1e` | Text di atas primary-container |
| `secondary` | `#0058be` | Aksen biru, lunch, carbs, link sekunder |
| `secondary-container` | `#2170e4` | Background aksen premium |
| `on-secondary-container` | `#fefcff` | Text di atas secondary-container |
| `tertiary` | `#9e4036` | Aksen protein / reddish brown |
| `tertiary-container` | `#ff8b7c` | Background tertiary soft |
| `energy-orange` | `#f97316` | Aksen energi, snack, fat |
| `achievement-purple` | `#a855f7` | Dinner, achievement, premium feeling |

### 4.2 Surface & Background

| Token | Hex | Fungsi |
|---|---:|---|
| `background` | `#f8f9ff` | Background utama halaman |
| `surface` | `#f8f9ff` | Surface top app bar |
| `surface-container-lowest` | `#ffffff` | Card putih murni |
| `surface-container-low` | `#eff4ff` | Sidebar background, card subtle |
| `surface-container` | `#e5eeff` | Input, progress base, chip |
| `surface-container-high` | `#dce9ff` | Summary card |
| `surface-container-highest` | `#d3e4fe` | Empty placeholder, icon block |
| `surface-variant` | `#d3e4fe` | Hover nav, soft state |
| `mint-surface` | `#f0fdf4` | Success/healthy background |

### 4.3 Text & Outline

| Token | Hex | Fungsi |
|---|---:|---|
| `on-surface` | `#0b1c30` | Text utama |
| `on-background` | `#0b1c30` | Text utama di background |
| `on-surface-variant` | `#3d4a3d` | Text sekunder |
| `outline` | `#6d7b6c` | Border kuat |
| `outline-variant` | `#bccbb9` | Border soft |
| `inverse-surface` | `#213145` | Tooltip background |
| `inverse-on-surface` | `#eaf1ff` | Tooltip text |
| `error-red` | `#ef4444` | Logout/error |
| `warning-yellow` | `#eab308` | Warning/star jika diperlukan |

---

## 5. Typography

Halaman memakai kombinasi font:

| Font | Penggunaan |
|---|---|
| `Poppins` | Heading, title, brand |
| `Nunito` | Body text |
| `Inter` | Label, navigation, small UI text |
| `JetBrains Mono` | Angka metrik, kcal, numeric summary |
| `Material Symbols Outlined` | Icon system |

### Tailwind Font Token

```js
fontFamily: {
  "body-lg": ["Nunito"],
  "label-sm": ["Inter"],
  "label-md": ["Inter"],
  "headline-lg-mobile": ["Poppins"],
  "body-md": ["Nunito"],
  "headline-xl": ["Poppins"],
  "metrics-mono": ["JetBrains Mono"],
  "headline-md": ["Poppins"],
  "headline-lg": ["Poppins"]
}
```

### Font Size Token

```js
fontSize: {
  "body-lg": ["18px", { lineHeight: "1.6", fontWeight: "400" }],
  "label-sm": ["12px", { lineHeight: "1.4", letterSpacing: "0.05em", fontWeight: "600" }],
  "label-md": ["14px", { lineHeight: "1.4", letterSpacing: "0.01em", fontWeight: "500" }],
  "headline-lg-mobile": ["28px", { lineHeight: "1.25", fontWeight: "600" }],
  "body-md": ["16px", { lineHeight: "1.5", fontWeight: "400" }],
  "headline-xl": ["48px", { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "700" }],
  "metrics-mono": ["16px", { lineHeight: "1", fontWeight: "500" }],
  "headline-md": ["24px", { lineHeight: "1.3", fontWeight: "600" }],
  "headline-lg": ["32px", { lineHeight: "1.25", fontWeight: "600" }]
}
```

---

## 6. Spacing, Radius, dan Elevation

### Spacing Token

| Token | Nilai | Penggunaan |
|---|---:|---|
| `unit` | `4px` | Base spacing |
| `gutter-mobile` | `16px` | Padding mobile |
| `gutter-desktop` | `24px` | Padding desktop |
| `card-padding` | `20px` | Padding card |
| `section-gap` | `32px` | Jarak antar section |
| `margin-page` | `24px` | Padding sidebar/page |

### Radius

| Class | Nilai | Penggunaan |
|---|---:|---|
| `rounded-xl` | `0.75rem` | Button, nav item, input |
| `rounded-2xl` | `1rem` | Recent item, search card |
| `rounded-3xl` | `1.5rem` | Session card, summary card, visual card |
| `rounded-full` | `9999px` | Avatar, icon button, FAB |

### Elevation

| Elemen | Shadow |
|---|---|
| Sidebar | `shadow-md` |
| Search card | `shadow-md` |
| Summary card | `shadow-sm` |
| Session cards | `shadow-sm` → `hover:shadow-md` |
| FAB | `shadow-lg` |
| Tooltip | no heavy shadow, uses inverse surface |

---

## 7. Global Tailwind Config

Gunakan konfigurasi ini di `tailwind.config.js`.

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
        "surface-dim": "#cbdbf5",
        "on-primary-container": "#004b1e",
        "on-surface": "#0b1c30",
        "on-tertiary-container": "#76231b",
        "secondary": "#0058be",
        "inverse-on-surface": "#eaf1ff",
        "error-container": "#ffdad6",
        "primary-container": "#22c55e",
        "on-primary": "#ffffff",
        "tertiary": "#9e4036",
        "energy-orange": "#f97316",
        "tertiary-fixed-dim": "#ffb4a9",
        "on-tertiary": "#ffffff",
        "surface": "#f8f9ff",
        "on-error-container": "#93000a",
        "surface-variant": "#d3e4fe",
        "on-tertiary-fixed": "#410001",
        "secondary-fixed": "#d8e2ff",
        "outline": "#6d7b6c",
        "card-light": "#ffffff",
        "inverse-surface": "#213145",
        "primary-fixed-dim": "#4ae176",
        "surface-container-lowest": "#ffffff",
        "outline-variant": "#bccbb9",
        "achievement-purple": "#a855f7",
        "on-tertiary-fixed-variant": "#7f2a21",
        "surface-container-low": "#eff4ff",
        "tertiary-fixed": "#ffdad5",
        "background": "#f8f9ff",
        "error-red": "#ef4444",
        "on-primary-fixed": "#002109",
        "surface-container-highest": "#d3e4fe",
        "primary-fixed": "#6bff8f",
        "on-surface-variant": "#3d4a3d",
        "on-secondary": "#ffffff",
        "surface-container-high": "#dce9ff",
        "card-dark": "#1e293b",
        "surface-container": "#e5eeff",
        "on-primary-fixed-variant": "#005321",
        "secondary-container": "#2170e4",
        "bg-light": "#f8fafc",
        "secondary-fixed-dim": "#adc6ff",
        "on-background": "#0b1c30",
        "tertiary-container": "#ff8b7c",
        "on-error": "#ffffff",
        "mint-surface": "#f0fdf4",
        "warning-yellow": "#eab308",
        "inverse-primary": "#4ae176",
        "on-secondary-container": "#fefcff",
        "error": "#ba1a1a",
        "on-secondary-fixed-variant": "#004395",
        "surface-tint": "#006e2f",
        "on-secondary-fixed": "#001a42",
        "bg-dark": "#0f172a",
        "surface-bright": "#f8f9ff",
        "primary": "#006e2f"
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px"
      },
      spacing: {
        "gutter-mobile": "16px",
        "card-padding": "20px",
        "gutter-desktop": "24px",
        "unit": "4px",
        "section-gap": "32px",
        "margin-page": "24px"
      },
      fontFamily: {
        "body-lg": ["Nunito"],
        "label-sm": ["Inter"],
        "label-md": ["Inter"],
        "headline-lg-mobile": ["Poppins"],
        "body-md": ["Nunito"],
        "headline-xl": ["Poppins"],
        "metrics-mono": ["JetBrains Mono"],
        "headline-md": ["Poppins"],
        "headline-lg": ["Poppins"]
      },
      fontSize: {
        "body-lg": ["18px", { lineHeight: "1.6", fontWeight: "400" }],
        "label-sm": ["12px", { lineHeight: "1.4", letterSpacing: "0.05em", fontWeight: "600" }],
        "label-md": ["14px", { lineHeight: "1.4", letterSpacing: "0.01em", fontWeight: "500" }],
        "headline-lg-mobile": ["28px", { lineHeight: "1.25", fontWeight: "600" }],
        "body-md": ["16px", { lineHeight: "1.5", fontWeight: "400" }],
        "headline-xl": ["48px", { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "700" }],
        "metrics-mono": ["16px", { lineHeight: "1", fontWeight: "500" }],
        "headline-md": ["24px", { lineHeight: "1.3", fontWeight: "600" }],
        "headline-lg": ["32px", { lineHeight: "1.25", fontWeight: "600" }]
      },
      keyframes: {
        "soft-float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" }
        },
        "slide-in-right": {
          "0%": { opacity: "0", transform: "translateX(100%)" },
          "100%": { opacity: "1", transform: "translateX(0)" }
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        }
      },
      animation: {
        "soft-float": "soft-float 4s ease-in-out infinite",
        "slide-in-right": "slide-in-right 180ms ease-out",
        "fade-up": "fade-up 250ms ease-out"
      }
    }
  },
  plugins: [
    require("@tailwindcss/forms")
  ]
}
```

---

## 8. CSS Utility Tambahan

Pindahkan CSS custom dari HTML ke `src/styles/app-shell.css` atau `src/index.css`.

```css
.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
  vertical-align: middle;
}

.glass-card {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(226, 232, 240, 0.5);
  transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}

.upgrade-card {
  background: linear-gradient(135deg, rgba(33,112,228,0.08), rgba(33,112,228,0.14));
}

.upgrade-card .upgrade-content p {
  color: #072044;
}
```

---

## 9. Layout Shell

### 9.1 Sidebar

Sidebar adalah navigasi utama aplikasi. Di desktop, sidebar fixed di kiri dengan lebar `w-64`. Di mode collapsed, lebar menjadi `72px`.

#### Visual Sidebar

| Elemen | Detail |
|---|---|
| Container | `fixed left-0 top-0 h-screen w-64` |
| Background | `bg-surface-container-low` |
| Border | `border-r border-outline-variant/20` |
| Shadow | `shadow-md` |
| Padding | `py-margin-page px-4` |
| Breakpoint visible | `hidden xl:flex` |
| Role | `role="navigation"` |
| Active menu | `bg-primary-container text-on-primary-container rounded-xl font-bold` |

#### Menu Sidebar

| Menu | Icon | Route |
|---|---|---|
| Dashboard | `dashboard` | `/dashboard` |
| Log Food | `add_box` | `/logfood` |
| Meal Planner | `restaurant_menu` | `/mealplanner` |
| Progress | `insights` | `/progress` |
| Nutrition | `bar_chart` | `/nutrition` |
| Foods | `nutrition` | `/foods` |
| Community | `group` | `/community` |
| Profile | `person` | `/profile` |

#### State Sidebar

| State | Behavior |
|---|---|
| Normal | Lebar 256px, label terlihat |
| Collapsed | Lebar 72px, label disembunyikan |
| Hidden full | Sidebar geser ke kiri dan main content full width |
| Mobile drawer | Sidebar slide-in dari kiri |

---

## 10. Sidebar Interaction untuk React

HTML asli memakai manipulasi DOM langsung. Untuk React, gunakan state agar logic lebih bersih.

```tsx
import { useState } from "react";

export function useSidebarShell() {
  const [collapsed, setCollapsed] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return {
    collapsed,
    hidden,
    mobileOpen,
    toggleCollapsed: () => setCollapsed((value) => !value),
    toggleHidden: () => setHidden((value) => !value),
    openMobile: () => setMobileOpen(true),
    closeMobile: () => setMobileOpen(false)
  };
}
```

### Class Mapping

```tsx
const sidebarClass = [
  "h-screen fixed left-0 top-0 z-50 bg-surface-container-low border-r border-outline-variant/20 shadow-md flex flex-col py-margin-page px-4 transition-all duration-200",
  collapsed ? "w-[72px]" : "w-64",
  hidden ? "-translate-x-[110%] !w-0" : "translate-x-0",
  mobileOpen ? "translate-x-0" : "max-lg:-translate-x-[110%]",
  "max-lg:fixed"
].join(" ");

const mainClass = [
  "flex-1 p-gutter-desktop max-w-[1200px] mx-auto w-full transition-all duration-200",
  hidden ? "xl:ml-0 xl:w-full" : collapsed ? "xl:ml-[72px] xl:w-[calc(100%-72px)]" : "xl:ml-64 xl:w-[calc(100%-16rem)]"
].join(" ");
```

---

## 11. Top App Bar

Top App Bar menampilkan judul halaman, tanggal, pencarian global, icon notifikasi, settings, dan profil.

### Elemen Top Bar

| Elemen | Style |
|---|---|
| Container | `sticky top-0 z-40 h-16 flex items-center justify-between` |
| Background | `bg-surface/80 backdrop-blur-xl` |
| Border | `border-b border-outline-variant/30` |
| Title | `font-headline-md text-headline-md font-bold text-primary` |
| Date | `text-label-md text-on-surface-variant/60` |
| Search | `bg-surface-container rounded-full` |
| Icon button | `w-10 h-10 rounded-full hover:bg-surface-variant` |
| Avatar | `w-10 h-10 rounded-full border-2 border-primary-container` |

### Catatan Implementasi

Di mobile, search input disembunyikan dengan `hidden md:block`. Untuk PWA mobile, disarankan tambah tombol hamburger di kiri top bar karena sidebar mobile sudah memiliki style `mobile-open`, tetapi HTML belum menyediakan trigger mobile.

Contoh tambahan:

```tsx
<button
  className="xl:hidden w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface-variant"
  aria-label="Open navigation"
  onClick={openMobile}
>
  <span className="material-symbols-outlined">menu</span>
</button>
```

---

## 12. Page Header & Calorie Summary

Setelah top app bar, halaman memiliki header lokal:

```txt
Daily Food Log
Tuesday, October 24th, 2023
```

Lalu ada summary card dengan tiga metrik:

| Metric | Nilai | Warna |
|---|---:|---|
| Consumed | `1,450` | `primary` |
| Daily Goal | `2,100` | `energy-orange` |
| Remaining | `650` | `secondary` |

### Style Summary Card

```tsx
<div className="flex items-center gap-8 bg-surface-container-high px-8 py-4 rounded-3xl shadow-sm border border-outline-variant/30">
  ...
</div>
```

### Rekomendasi Data Model

```ts
type CalorieSummary = {
  consumed: number;
  dailyGoal: number;
  remaining: number;
};
```

### Perhitungan

```ts
const remaining = Math.max(dailyGoal - consumed, 0);
const progress = Math.min((consumed / dailyGoal) * 100, 100);
```

---

## 13. Main Grid: Food Search & Daily Sessions

Layout utama memakai grid:

```txt
grid grid-cols-1 xl:grid-cols-12 gap-gutter-desktop

left column  : xl:col-span-4
right column : xl:col-span-8
```

### Fungsi Layout

| Kolom | Fungsi |
|---|---|
| Kiri | Search food database + recent history |
| Kanan | Meal session cards + macro distribution |

Pada layar kecil, kedua kolom otomatis menjadi satu kolom.

---

## 14. Food Search Database Card

Search card berisi:
- judul kecil `Search Food Database`,
- input search dengan icon,
- autocomplete suggestions.

### Style Input

```tsx
<input
  className="w-full pl-10 pr-4 py-3 bg-surface-container rounded-xl border-none ring-1 ring-outline-variant/30 focus:ring-2 focus:ring-primary transition-all font-body-md text-on-surface outline-none"
  placeholder="Search for chicken, rice, coffee..."
/>
```

### Bug dari HTML Asli

Autocomplete menggunakan class:

```html
group-focus-within:max-h-60
```

Namun parent card tidak memiliki class `group`. Akibatnya, suggestion tidak akan terbuka secara konsisten.

### Perbaikan

Tambahkan `group` pada parent card:

```tsx
<div className="glass-card group p-card-padding rounded-2xl shadow-md border border-outline-variant/50 relative">
  ...
  <div className="mt-3 space-y-1 overflow-hidden transition-all max-h-0 group-focus-within:max-h-60">
    ...
  </div>
</div>
```

### Rekomendasi State React

```tsx
const [query, setQuery] = useState("");
const [suggestions, setSuggestions] = useState<FoodItem[]>([]);
const [focused, setFocused] = useState(false);
```

---

## 15. Food Item Type

Gunakan type ini agar data search, recent history, dan session item konsisten.

```ts
export type MealType = "breakfast" | "lunch" | "dinner" | "snacks";

export type FoodItem = {
  id: string;
  name: string;
  serving: string;
  calories: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  fiber?: number;
  icon?: string;
  color?: "primary" | "secondary" | "energy-orange" | "achievement-purple" | "tertiary";
  imageUrl?: string;
};

export type LoggedFoodItem = FoodItem & {
  mealType: MealType;
  loggedAt: string;
};
```

---

## 16. Recent History Card

Recent History adalah list makanan yang pernah dicatat. Card memakai scroll internal dengan custom scrollbar.

### Struktur Item

```txt
RecentHistoryCard
├── icon box
├── food name
├── meal & serving
├── kcal value
└── hover action overlay
    ├── add
    ├── edit
    └── delete
```

### Style Container

```tsx
<div className="glass-card p-card-padding rounded-2xl shadow-md">
  <div className="space-y-3 max-h-[400px] overflow-y-auto custom-scrollbar pr-1">
    ...
  </div>
</div>
```

### Recent Item Aktif / Healthy

```tsx
<div className="group flex items-center gap-3 p-3 bg-mint-surface/50 rounded-xl border border-primary/10 hover:shadow-sm transition-all relative overflow-hidden">
```

### Recent Item Default

```tsx
<div className="group flex items-center gap-3 p-3 bg-surface-container-low rounded-xl border border-outline-variant/20 hover:shadow-sm transition-all relative overflow-hidden">
```

### Hover Overlay

HTML menggunakan overlay yang muncul saat hover:

```tsx
<div className="absolute inset-0 bg-primary/95 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity translate-x-full group-hover:translate-x-0">
  ...
</div>
```

### Rekomendasi Perbaikan Animasi

Agar slide overlay terasa lebih smooth, gabungkan `transition-all duration-200 ease-out`.

```tsx
<div className="absolute inset-0 bg-primary/95 flex items-center justify-center gap-4 opacity-0 translate-x-full group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 ease-out">
```

### Accessibility

Overlay action sebaiknya diberi `aria-label`.

```tsx
<button aria-label="Add Black Coffee to log">...</button>
<button aria-label="Edit Black Coffee">...</button>
<button aria-label="Delete Black Coffee from history">...</button>
```

---

## 17. Daily Session Cards

Session cards adalah area utama untuk melihat makanan yang dicatat berdasarkan waktu makan.

### Meal Sessions

| Session | Warna Border | Icon | State |
|---|---|---|---|
| Breakfast | `primary` | `wb_sunny` | Filled |
| Lunch | `secondary` | `lunch_dining` | Filled |
| Dinner | `achievement-purple` | `dinner_dining` | Empty |
| Snacks | `energy-orange` | `icecream` | Filled |

### Base Card

```tsx
<div className="glass-card p-card-padding rounded-3xl shadow-sm border-l-4 flex flex-col min-h-[180px] hover:shadow-md transition-shadow">
  ...
</div>
```

### Header Session Card

```tsx
<div className="flex justify-between items-start mb-4">
  <div className="flex items-center gap-2">
    <span className="material-symbols-outlined text-primary">wb_sunny</span>
    <h4 className="font-headline-md text-on-surface">Breakfast</h4>
  </div>
  <div className="text-right">
    <p className="font-metrics-mono text-lg font-bold text-on-surface">
      420 <span className="text-xs uppercase font-normal text-on-surface-variant">kcal</span>
    </p>
  </div>
</div>
```

### Food List Row

```tsx
<div className="flex justify-between text-sm">
  <span className="text-on-surface-variant">Oatmeal with Blueberries</span>
  <span className="font-metrics-mono">310</span>
</div>
```

### Add Item Button

```tsx
<button className="mt-auto flex items-center justify-center gap-2 py-3 border-2 border-dashed border-outline-variant/50 rounded-xl text-on-surface-variant hover:border-primary hover:text-primary transition-all">
  <span className="material-symbols-outlined text-sm">add</span>
  <span className="font-label-md text-label-md">Add Item</span>
</button>
```

---

## 18. Empty State Dinner

Dinner card menampilkan empty state:

```txt
Waiting... kcal
No items logged yet
restaurant icon
Add Item button
```

### Style Empty State

```tsx
<div className="flex-grow flex flex-col items-center justify-center opacity-60">
  <span className="material-symbols-outlined text-4xl mb-2 text-outline-variant">restaurant</span>
  <p className="text-label-sm text-on-surface-variant">No items logged yet</p>
</div>
```

### Rekomendasi UX

Untuk empty state, tambahkan CTA lebih jelas:

```txt
Belum ada makanan tercatat untuk Dinner.
Klik Add Item untuk menambahkan menu makan malam.
```

Atau versi English sesuai HTML:

```txt
No dinner logged yet.
Add your first dinner item.
```

---

## 19. Macro Distribution Visual

Bagian bawah kanan adalah visual simulasi distribusi makro. HTML belum memakai chart library; hanya placeholder dengan gradient background dan chip persentase.

### Visual Structure

```txt
Macro Distribution Card
├── gradient background
├── analytics icon
├── title
└── macro chips
    ├── Protein: 40%
    ├── Carbs: 35%
    └── Fat: 25%
```

### Style

```tsx
<div className="relative h-48 w-full rounded-3xl overflow-hidden bg-gradient-to-br from-mint-surface to-surface-container-low shadow-inner border border-outline-variant/30 flex items-center justify-center">
  ...
</div>
```

### Chip Style

```tsx
<span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-xs font-bold">
  Protein: 40%
</span>
```

### Rekomendasi Produksi

Untuk implementasi serius, ganti placeholder dengan chart:
- `recharts` untuk PieChart / RadialBarChart,
- `framer-motion` untuk animated progress,
- `react-spring` untuk transisi angka.

Contoh data:

```ts
const macroDistribution = [
  { name: "Protein", value: 40, color: "primary" },
  { name: "Carbs", value: 35, color: "secondary" },
  { name: "Fat", value: 25, color: "energy-orange" }
];
```

---

## 20. Quick Add Floating Action Button

FAB berada di kanan bawah.

### Visual FAB

| Properti | Nilai |
|---|---|
| Position | `fixed bottom-8 right-8` |
| Size | `w-16 h-16` |
| Background | `bg-primary` |
| Text | `text-on-primary` |
| Radius | `rounded-full` |
| Shadow | `shadow-lg` |
| Hover | `hover:scale-110` |
| Active | `active:scale-95` |
| Z-index | `z-50` |

### Tooltip

Tooltip muncul di kiri FAB saat hover:

```tsx
<span className="absolute right-20 bg-inverse-surface text-inverse-on-surface px-4 py-2 rounded-xl text-sm font-label-md whitespace-nowrap opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all pointer-events-none">
  Log Food Item
</span>
```

### Icon Rotation

```tsx
<span className="material-symbols-outlined text-3xl group-hover:rotate-90 transition-transform">
  add
</span>
```

### Rekomendasi Mobile

Di mobile, tooltip sebaiknya disembunyikan karena hover tidak relevan:

```tsx
<span className="hidden sm:block absolute right-20 ...">
```

---

## 21. Animasi dan Micro Interaction

### Animasi yang Ada di HTML

| Elemen | Animasi |
|---|---|
| Glass card | `translateY(-2px)` saat hover via JS |
| Recent item overlay | opacity + slide horizontal saat hover |
| FAB | scale saat hover dan active |
| FAB icon | rotate 90° saat hover |
| Sidebar | width + transform 0.22s |
| Mobile drawer | transform slide dari kiri |
| Search input | ring focus |
| Session card | shadow transition |
| Add button | border/text color transition |

### Masalah Teknis

HTML memakai JavaScript imperative:

```js
card.style.transform = 'translateY(-2px)';
```

Di React + Tailwind, lebih baik langsung gunakan utility:

```tsx
hover:-translate-y-0.5 transition-transform duration-200
```

atau:

```tsx
hover:-translate-y-1 hover:shadow-md transition-all duration-200 ease-out
```

### Utility Animasi Rekomendasi

```tsx
const interactiveCard = "transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-md";
const softButton = "transition-all duration-150 ease-out hover:scale-105 active:scale-95";
const iconButton = "w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface-variant transition-colors";
```

---

## 22. Komponen React yang Disarankan

Struktur komponen:

```txt
src/
├── app/
│   └── App.tsx
├── components/
│   ├── app-shell/
│   │   ├── AppShell.tsx
│   │   ├── Sidebar.tsx
│   │   ├── TopAppBar.tsx
│   │   ├── NavItem.tsx
│   │   └── PremiumUpgradeCard.tsx
│   ├── log-food/
│   │   ├── LogFoodPage.tsx
│   │   ├── FoodSummaryCard.tsx
│   │   ├── FoodSearchCard.tsx
│   │   ├── RecentHistoryCard.tsx
│   │   ├── RecentFoodItem.tsx
│   │   ├── MealSessionGrid.tsx
│   │   ├── MealSessionCard.tsx
│   │   ├── MacroDistributionCard.tsx
│   │   └── QuickAddFab.tsx
│   └── ui/
│       ├── MaterialIcon.tsx
│       ├── GlassCard.tsx
│       ├── IconButton.tsx
│       └── KcalText.tsx
├── hooks/
│   ├── useSidebarShell.ts
│   └── useFoodSearch.ts
├── data/
│   └── mockFoodLog.ts
├── types/
│   └── food.ts
├── styles/
│   └── index.css
└── main.tsx
```

---

## 23. AppShell Component

```tsx
import { Sidebar } from "./Sidebar";
import { TopAppBar } from "./TopAppBar";
import { useSidebarShell } from "../../hooks/useSidebarShell";

type AppShellProps = {
  children: React.ReactNode;
  title: string;
  subtitle: string;
};

export function AppShell({ children, title, subtitle }: AppShellProps) {
  const sidebar = useSidebarShell();

  return (
    <div className="min-h-screen bg-background text-on-surface font-body-md">
      <Sidebar {...sidebar} />

      {sidebar.mobileOpen && (
        <button
          className="fixed inset-0 z-40 bg-slate-950/50 xl:hidden"
          aria-label="Close navigation backdrop"
          onClick={sidebar.closeMobile}
        />
      )}

      <main
        className={[
          "flex-1 p-gutter-desktop max-w-[1200px] mx-auto w-full transition-all duration-200",
          sidebar.hidden
            ? "xl:ml-0 xl:w-full"
            : sidebar.collapsed
              ? "xl:ml-[72px] xl:w-[calc(100%-72px)]"
              : "xl:ml-64 xl:w-[calc(100%-16rem)]"
        ].join(" ")}
      >
        <TopAppBar
          title={title}
          subtitle={subtitle}
          onOpenMobileNav={sidebar.openMobile}
        />
        {children}
      </main>
    </div>
  );
}
```

---

## 24. MaterialIcon Component

```tsx
type MaterialIconProps = {
  name: string;
  className?: string;
  filled?: boolean;
};

export function MaterialIcon({ name, className = "", filled = false }: MaterialIconProps) {
  return (
    <span
      className={`material-symbols-outlined ${className}`}
      style={{
        fontVariationSettings: `'FILL' ${filled ? 1 : 0}, 'wght' 400, 'GRAD' 0, 'opsz' 24`
      }}
      aria-hidden="true"
    >
      {name}
    </span>
  );
}
```

---

## 25. FoodSummaryCard Component

```tsx
type FoodSummaryCardProps = {
  consumed: number;
  dailyGoal: number;
};

export function FoodSummaryCard({ consumed, dailyGoal }: FoodSummaryCardProps) {
  const remaining = Math.max(dailyGoal - consumed, 0);

  return (
    <div className="flex items-center gap-8 bg-surface-container-high px-8 py-4 rounded-3xl shadow-sm border border-outline-variant/30">
      <Metric label="Consumed" value={consumed} colorClass="text-primary" />
      <Divider />
      <Metric label="Daily Goal" value={dailyGoal} colorClass="text-energy-orange" />
      <Divider />
      <Metric label="Remaining" value={remaining} colorClass="text-secondary" />
    </div>
  );
}

function Metric({
  label,
  value,
  colorClass
}: {
  label: string;
  value: number;
  colorClass: string;
}) {
  return (
    <div className="text-center">
      <span className={`block font-metrics-mono text-xl font-bold ${colorClass}`}>
        {value.toLocaleString("en-US")}
      </span>
      <span className="text-label-sm uppercase tracking-tighter text-on-surface-variant">
        {label}
      </span>
    </div>
  );
}

function Divider() {
  return <div className="h-10 w-px bg-outline-variant/50" />;
}
```

---

## 26. FoodSearchCard Component

```tsx
import { useMemo, useState } from "react";
import { MaterialIcon } from "../ui/MaterialIcon";
import type { FoodItem } from "../../types/food";

type FoodSearchCardProps = {
  foods: FoodItem[];
  onSelectFood: (food: FoodItem) => void;
};

export function FoodSearchCard({ foods, onSelectFood }: FoodSearchCardProps) {
  const [query, setQuery] = useState("");

  const suggestions = useMemo(() => {
    if (!query.trim()) return [];
    return foods
      .filter((food) => food.name.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 5);
  }, [foods, query]);

  return (
    <div className="glass-card group p-card-padding rounded-2xl shadow-md border border-outline-variant/50 relative">
      <h3 className="font-label-md text-label-md text-on-surface-variant mb-3 uppercase tracking-wider">
        Search Food Database
      </h3>

      <div className="relative">
        <MaterialIcon
          name="search"
          className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant"
        />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-surface-container rounded-xl border-none ring-1 ring-outline-variant/30 focus:ring-2 focus:ring-primary transition-all font-body-md text-on-surface outline-none"
          placeholder="Search for chicken, rice, coffee..."
          type="text"
        />
      </div>

      <div className="mt-3 space-y-1 overflow-hidden transition-all max-h-0 group-focus-within:max-h-60">
        {suggestions.map((food) => (
          <button
            key={food.id}
            type="button"
            onClick={() => onSelectFood(food)}
            className="w-full p-2 hover:bg-surface-variant/40 rounded-lg cursor-pointer flex justify-between items-center text-sm text-left"
          >
            <span>{food.name}</span>
            <span className="text-on-surface-variant/60">
              {food.calories} kcal / {food.serving}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
```

---

## 27. RecentFoodItem Component

```tsx
import { MaterialIcon } from "../ui/MaterialIcon";
import type { LoggedFoodItem } from "../../types/food";

type RecentFoodItemProps = {
  item: LoggedFoodItem;
  highlight?: boolean;
  onAdd: (item: LoggedFoodItem) => void;
  onEdit: (item: LoggedFoodItem) => void;
  onDelete: (item: LoggedFoodItem) => void;
};

const colorMap = {
  primary: "bg-primary-container/20 text-primary",
  secondary: "bg-secondary/10 text-secondary",
  "energy-orange": "bg-energy-orange/10 text-energy-orange",
  "achievement-purple": "bg-achievement-purple/10 text-achievement-purple",
  tertiary: "bg-tertiary-container/20 text-tertiary"
};

export function RecentFoodItem({
  item,
  highlight = false,
  onAdd,
  onEdit,
  onDelete
}: RecentFoodItemProps) {
  return (
    <div
      className={[
        "group flex items-center gap-3 p-3 rounded-xl hover:shadow-sm transition-all relative overflow-hidden",
        highlight
          ? "bg-mint-surface/50 border border-primary/10"
          : "bg-surface-container-low border border-outline-variant/20"
      ].join(" ")}
    >
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorMap[item.color ?? "primary"]}`}>
        <MaterialIcon name={item.icon ?? "restaurant"} />
      </div>

      <div className="flex-grow">
        <p className="font-label-md text-on-surface">{item.name}</p>
        <p className="text-label-sm text-on-surface-variant">
          {item.mealType} • {item.serving}
        </p>
      </div>

      <div className="text-right">
        <p className="font-metrics-mono font-bold text-on-surface">
          {item.calories} <span className="text-[10px] uppercase">kcal</span>
        </p>
      </div>

      <div className="absolute inset-0 bg-primary/95 flex items-center justify-center gap-4 opacity-0 translate-x-full group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 ease-out">
        <button
          type="button"
          aria-label={`Add ${item.name} to log`}
          onClick={() => onAdd(item)}
          className="p-2 bg-white/20 rounded-full text-white hover:bg-white/40"
        >
          <MaterialIcon name="add" />
        </button>
        <button
          type="button"
          aria-label={`Edit ${item.name}`}
          onClick={() => onEdit(item)}
          className="p-2 bg-white/20 rounded-full text-white hover:bg-white/40"
        >
          <MaterialIcon name="edit" />
        </button>
        <button
          type="button"
          aria-label={`Delete ${item.name}`}
          onClick={() => onDelete(item)}
          className="p-2 bg-white/20 rounded-full text-white hover:bg-white/40"
        >
          <MaterialIcon name="delete" />
        </button>
      </div>
    </div>
  );
}
```

---

## 28. MealSessionCard Component

```tsx
import { MaterialIcon } from "../ui/MaterialIcon";
import type { FoodItem, MealType } from "../../types/food";

type MealSessionCardProps = {
  title: string;
  type: MealType;
  icon: string;
  colorClass: string;
  borderClass: string;
  foods: FoodItem[];
  targetCalories?: number;
  onAddItem: (type: MealType) => void;
};

export function MealSessionCard({
  title,
  type,
  icon,
  colorClass,
  borderClass,
  foods,
  targetCalories,
  onAddItem
}: MealSessionCardProps) {
  const totalCalories = foods.reduce((sum, food) => sum + food.calories, 0);
  const percentage = targetCalories ? Math.min((totalCalories / targetCalories) * 100, 100) : 0;

  return (
    <div className={`glass-card p-card-padding rounded-3xl shadow-sm border-l-4 ${borderClass} flex flex-col min-h-[180px] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200`}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2">
          <MaterialIcon name={icon} className={colorClass} />
          <h4 className="font-headline-md text-on-surface">{title}</h4>
        </div>

        <div className="text-right">
          {foods.length > 0 ? (
            <>
              <p className="font-metrics-mono text-lg font-bold text-on-surface">
                {totalCalories} <span className="text-xs uppercase font-normal text-on-surface-variant">kcal</span>
              </p>
              {targetCalories && (
                <div className="w-24 h-1 bg-surface-container rounded-full mt-1 overflow-hidden">
                  <div
                    className={`h-full ${colorClass.replace("text-", "bg-")}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              )}
            </>
          ) : (
            <p className="font-metrics-mono text-lg font-bold text-on-surface-variant italic">
              Waiting... <span className="text-xs uppercase font-normal">kcal</span>
            </p>
          )}
        </div>
      </div>

      {foods.length > 0 ? (
        <div className="flex-grow space-y-2 mb-4">
          {foods.map((food) => (
            <div key={food.id} className="flex justify-between text-sm">
              <span className="text-on-surface-variant">{food.name}</span>
              <span className="font-metrics-mono">{food.calories}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex-grow flex flex-col items-center justify-center opacity-60">
          <MaterialIcon name="restaurant" className="text-4xl mb-2 text-outline-variant" />
          <p className="text-label-sm text-on-surface-variant">No items logged yet</p>
        </div>
      )}

      <button
        type="button"
        onClick={() => onAddItem(type)}
        className={`mt-auto flex items-center justify-center gap-2 py-3 border-2 border-dashed border-outline-variant/50 rounded-xl text-on-surface-variant hover:${borderClass.replace("border-l-", "border-")} hover:${colorClass} transition-all`}
      >
        <MaterialIcon name="add" className="text-sm" />
        <span className="font-label-md text-label-md">Add Item</span>
      </button>
    </div>
  );
}
```

Catatan: Tailwind tidak selalu aman untuk dynamic class seperti `hover:${colorClass}` ketika build purge berjalan. Untuk produksi, gunakan mapping class eksplisit.

---

## 29. Class Mapping Aman untuk Tailwind

Gunakan object mapping agar Tailwind dapat mendeteksi semua class.

```ts
export const mealStyleMap = {
  breakfast: {
    icon: "wb_sunny",
    text: "text-primary",
    bg: "bg-primary",
    borderLeft: "border-l-primary",
    hoverBorder: "hover:border-primary",
    hoverText: "hover:text-primary"
  },
  lunch: {
    icon: "lunch_dining",
    text: "text-secondary",
    bg: "bg-secondary",
    borderLeft: "border-l-secondary",
    hoverBorder: "hover:border-secondary",
    hoverText: "hover:text-secondary"
  },
  dinner: {
    icon: "dinner_dining",
    text: "text-achievement-purple",
    bg: "bg-achievement-purple",
    borderLeft: "border-l-achievement-purple",
    hoverBorder: "hover:border-achievement-purple",
    hoverText: "hover:text-achievement-purple"
  },
  snacks: {
    icon: "icecream",
    text: "text-energy-orange",
    bg: "bg-energy-orange",
    borderLeft: "border-l-energy-orange",
    hoverBorder: "hover:border-energy-orange",
    hoverText: "hover:text-energy-orange"
  }
} as const;
```

---

## 30. MacroDistributionCard Component

```tsx
import { MaterialIcon } from "../ui/MaterialIcon";

type MacroDistribution = {
  protein: number;
  carbs: number;
  fat: number;
};

export function MacroDistributionCard({ protein, carbs, fat }: MacroDistribution) {
  return (
    <div className="relative h-48 w-full rounded-3xl overflow-hidden bg-gradient-to-br from-mint-surface to-surface-container-low shadow-inner border border-outline-variant/30 flex items-center justify-center">
      <div className="z-10 text-center">
        <MaterialIcon
          name="analytics"
          filled
          className="text-primary text-5xl mb-2"
        />
        <h3 className="font-headline-md text-on-primary-container">
          Macro Distribution
        </h3>
        <div className="flex flex-wrap justify-center gap-4 mt-2">
          <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-xs font-bold">
            Protein: {protein}%
          </span>
          <span className="px-3 py-1 bg-secondary/20 text-secondary rounded-full text-xs font-bold">
            Carbs: {carbs}%
          </span>
          <span className="px-3 py-1 bg-energy-orange/20 text-energy-orange rounded-full text-xs font-bold">
            Fat: {fat}%
          </span>
        </div>
      </div>
    </div>
  );
}
```

---

## 31. QuickAddFab Component

```tsx
import { MaterialIcon } from "../ui/MaterialIcon";

type QuickAddFabProps = {
  onClick: () => void;
};

export function QuickAddFab({ onClick }: QuickAddFabProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Log food item"
      className="fixed bottom-8 right-8 w-16 h-16 bg-primary text-on-primary rounded-full shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 group"
    >
      <MaterialIcon name="add" className="text-3xl group-hover:rotate-90 transition-transform" />
      <span className="hidden sm:block absolute right-20 bg-inverse-surface text-inverse-on-surface px-4 py-2 rounded-xl text-sm font-label-md whitespace-nowrap opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all pointer-events-none">
        Log Food Item
      </span>
    </button>
  );
}
```

---

## 32. Mock Data

```ts
import type { FoodItem, LoggedFoodItem } from "../types/food";

export const foodDatabase: FoodItem[] = [
  {
    id: "food-001",
    name: "Grilled Chicken Breast",
    serving: "100g",
    calories: 165,
    protein: 31,
    carbs: 0,
    fat: 3.6,
    icon: "restaurant",
    color: "primary"
  },
  {
    id: "food-002",
    name: "Brown Rice",
    serving: "100g",
    calories: 111,
    protein: 2.6,
    carbs: 23,
    fat: 0.9,
    icon: "rice_bowl",
    color: "secondary"
  },
  {
    id: "food-003",
    name: "Black Coffee",
    serving: "1 cup",
    calories: 2,
    icon: "coffee",
    color: "primary"
  },
  {
    id: "food-004",
    name: "Fuji Apple",
    serving: "1 medium",
    calories: 95,
    icon: "apps",
    color: "energy-orange"
  }
];

export const recentFoods: LoggedFoodItem[] = [
  {
    id: "recent-001",
    name: "Black Coffee",
    mealType: "breakfast",
    serving: "1 cup",
    calories: 2,
    icon: "coffee",
    color: "primary",
    loggedAt: "2023-10-24T07:30:00"
  },
  {
    id: "recent-002",
    name: "Omelette with Spinach",
    mealType: "breakfast",
    serving: "2 eggs",
    calories: 240,
    icon: "egg",
    color: "secondary",
    loggedAt: "2023-10-24T08:00:00"
  },
  {
    id: "recent-003",
    name: "Fuji Apple",
    mealType: "snacks",
    serving: "1 medium",
    calories: 95,
    icon: "apps",
    color: "energy-orange",
    loggedAt: "2023-10-24T16:00:00"
  }
];
```

---

## 33. LogFoodPage Composition

```tsx
import { AppShell } from "../app-shell/AppShell";
import { FoodSummaryCard } from "./FoodSummaryCard";
import { FoodSearchCard } from "./FoodSearchCard";
import { RecentHistoryCard } from "./RecentHistoryCard";
import { MealSessionGrid } from "./MealSessionGrid";
import { MacroDistributionCard } from "./MacroDistributionCard";
import { QuickAddFab } from "./QuickAddFab";
import { foodDatabase, recentFoods } from "../../data/mockFoodLog";

export function LogFoodPage() {
  return (
    <AppShell title="Daily Food Log" subtitle="Tuesday, October 24th, 2023">
      <div className="space-y-gutter-desktop">
        <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface mb-1">
              Daily Food Log
            </h1>
            <p className="text-on-surface-variant font-body-md">
              Tuesday, October 24th, 2023
            </p>
          </div>

          <FoodSummaryCard consumed={1450} dailyGoal={2100} />
        </section>

        <section className="grid grid-cols-1 xl:grid-cols-12 gap-gutter-desktop">
          <div className="xl:col-span-4 space-y-gutter-desktop">
            <FoodSearchCard
              foods={foodDatabase}
              onSelectFood={(food) => console.log("selected", food)}
            />
            <RecentHistoryCard
              items={recentFoods}
              onAdd={(item) => console.log("add", item)}
              onEdit={(item) => console.log("edit", item)}
              onDelete={(item) => console.log("delete", item)}
            />
          </div>

          <div className="xl:col-span-8 space-y-6">
            <MealSessionGrid />
            <MacroDistributionCard protein={40} carbs={35} fat={25} />
          </div>
        </section>
      </div>

      <QuickAddFab onClick={() => console.log("open quick add")} />
    </AppShell>
  );
}
```

---

## 34. PWA Implementation

### Install Dependency

```bash
npm install @vitejs/plugin-react vite-plugin-pwa @tailwindcss/forms
```

### `vite.config.ts`

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "apple-touch-icon.png"],
      manifest: {
        name: "NutriTrack",
        short_name: "NutriTrack",
        description: "Daily food log, nutrition tracking, and meal planning dashboard.",
        theme_color: "#006e2f",
        background_color: "#f8f9ff",
        display: "standalone",
        orientation: "portrait",
        start_url: "/",
        icons: [
          {
            src: "/icons/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/icons/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png"
          },
          {
            src: "/icons/pwa-512x512-maskable.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable"
          }
        ]
      }
    })
  ]
});
```

---

## 35. Routing React

Gunakan `react-router-dom`.

```tsx
import { createBrowserRouter } from "react-router-dom";
import { LogFoodPage } from "./components/log-food/LogFoodPage";
import { DashboardPage } from "./components/dashboard/DashboardPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardPage />
  },
  {
    path: "/dashboard",
    element: <DashboardPage />
  },
  {
    path: "/logfood",
    element: <LogFoodPage />
  }
]);
```

---

## 36. State Management Minimal

Untuk awal, cukup gunakan local state.

```tsx
const [loggedFoods, setLoggedFoods] = useState<LoggedFoodItem[]>([]);
```

Untuk project lebih besar:
- gunakan `zustand` untuk global food log,
- simpan cache harian di `localStorage`,
- sinkronkan dengan backend ketika online,
- gunakan service worker queue untuk offline-first PWA.

---

## 37. Data Flow yang Disarankan

```txt
FoodSearchCard
  └── user memilih food
      └── buka modal pilih mealType + serving
          └── submit
              └── update loggedFoods
                  ├── FoodSummaryCard recalculates calories
                  ├── MealSessionGrid updates session list
                  ├── MacroDistributionCard recalculates macro percentage
                  └── RecentHistoryCard updated
```

---

## 38. Rekomendasi Modal Quick Add

HTML belum memiliki modal. Untuk PWA, FAB sebaiknya membuka modal / bottom sheet.

### Desktop

- modal di tengah,
- search input,
- select meal type,
- input serving,
- preview calories.

### Mobile

- bottom sheet,
- full width,
- sticky submit button,
- easy thumb reach.

Contoh state:

```ts
const [quickAddOpen, setQuickAddOpen] = useState(false);
```

---

## 39. Accessibility Checklist

| Elemen | Rekomendasi |
|---|---|
| Sidebar | `role="navigation"`, `aria-label="Primary navigation"` sudah bagus |
| Active nav | gunakan `aria-current="page"` sudah bagus |
| Icon button | semua tombol icon harus punya `aria-label` |
| FAB | tambahkan `aria-label="Log food item"` |
| Recent overlay action | add/edit/delete harus punya `aria-label` |
| Input search | tambahkan label tersembunyi atau `aria-label` |
| Mobile drawer | backdrop harus bisa close via `Escape` |
| Button type | gunakan `type="button"` untuk tombol non-submit |
| Color contrast | primary cukup kuat; text variant perlu dicek pada background gradient |
| Tooltip | jangan hanya mengandalkan hover untuk informasi penting |

---

## 40. Responsive Behavior

### Desktop ≥ 1280px

- Sidebar visible fixed.
- Main content offset `xl:ml-64`.
- Search global visible.
- Layout utama 12 kolom.
- Left column 4 kolom, right column 8 kolom.
- Session cards 2 kolom.

### Tablet

- Sidebar hidden by default.
- Main content full width.
- Search global masih visible pada `md`.
- Layout utama 1 kolom.
- Session cards 2 kolom jika `md`.

### Mobile

- Sidebar drawer dengan hamburger.
- Search global top bar hidden.
- Header summary card harus wrap atau stack.
- Session cards 1 kolom.
- FAB tetap fixed, ukuran bisa dikurangi menjadi `w-14 h-14`.
- Tooltip FAB disembunyikan.

### Perbaikan Summary Mobile

HTML memakai `flex` horizontal. Di mobile kecil, ini bisa terlalu lebar. Gunakan:

```tsx
<div className="w-full grid grid-cols-3 gap-3 md:flex md:items-center md:gap-8 ...">
```

Atau:

```tsx
<div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center gap-4 ...">
```

---

## 41. Masalah dan Perbaikan dari HTML Asli

| Temuan | Dampak | Perbaikan |
|---|---|---|
| `group-focus-within` dipakai tanpa parent `.group` | Autocomplete tidak terbuka | Tambahkan class `group` pada search card |
| Sidebar mobile punya class `mobile-open`, tapi tidak ada hamburger trigger | Drawer mobile tidak bisa dibuka | Tambahkan button menu di top bar |
| Ada manipulasi DOM langsung untuk hover card | Tidak idiomatis di React | Gunakan Tailwind `hover:-translate-y-*` |
| Input focus script menambah class `ring-primary` ke parent | Efek tidak jelas karena class ring width tidak ada | Gunakan `focus-within:ring-2 focus-within:ring-primary` |
| Duplikasi title di top app bar dan page header | Bisa repetitif | Pertahankan jika top bar sebagai global context; atau ubah top bar jadi compact |
| Bahasa HTML `lang="en"` sementara project lokal mungkin Indonesia | SEO/accessibility kurang konsisten | Gunakan `lang="id"` jika UI dilokalkan |
| Recent overlay hanya hover | Mobile tidak bisa akses action overlay | Tambahkan menu action button permanen atau swipe action |
| Tooltip FAB hover-only | Mobile tidak terbaca | Sembunyikan tooltip dan gunakan aria-label |
| Macro visual masih placeholder | Data belum informatif | Gunakan chart library atau radial/pie chart |
| Tidak ada reduced motion support | User sensitif animasi bisa terganggu | Tambahkan `motion-reduce:transition-none` |

---

## 42. Implementasi Input Focus yang Lebih Baik

Ganti JavaScript focus manual dengan Tailwind `focus-within`.

```tsx
<div className="glass-card group p-card-padding rounded-2xl shadow-md border border-outline-variant/50 relative focus-within:ring-2 focus-within:ring-primary/40">
  ...
</div>
```

---

## 43. Reduced Motion Support

Tambahkan class `motion-reduce`.

```tsx
<div className="transition-all duration-200 hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
```

Untuk CSS:

```css
@media (prefers-reduced-motion: reduce) {
  .glass-card,
  aside#sidebar,
  main#mainContent {
    transition: none !important;
  }
}
```

---

## 44. Rekomendasi UX Lanjutan

### 44.1 Food Search

Tambahkan:
- debounce search 300ms,
- keyboard navigation untuk suggestions,
- recent search,
- barcode scan untuk mobile,
- quick serving presets: `1 cup`, `100g`, `1 plate`.

### 44.2 Food Logging

Tambahkan:
- modal edit serving,
- meal time picker,
- duplicate item,
- copy yesterday's meal,
- favorite item.

### 44.3 Nutrition Analytics

Tambahkan:
- progress bar kalori harian,
- macro radial chart,
- warning jika protein/fiber kurang,
- hydration reminder.

### 44.4 PWA Experience

Tambahkan:
- offline food log,
- local notification reminder,
- install prompt,
- background sync ketika online.

---

## 45. Prioritas Implementasi

### Prioritas 1 — Wajib

- Buat AppShell reusable.
- Buat Sidebar responsive + collapse.
- Buat TopAppBar.
- Buat LogFoodPage layout.
- Buat FoodSummaryCard.
- Buat FoodSearchCard.
- Buat RecentHistoryCard.
- Buat MealSessionCard.
- Buat FAB.

### Prioritas 2 — Interaktif

- Search suggestion real-time.
- Add/edit/delete food item.
- Quick add modal.
- Update calorie summary otomatis.
- Update meal cards otomatis.
- Mobile drawer trigger.

### Prioritas 3 — Produksi

- Backend API food database.
- User authentication.
- Persistent storage.
- Offline PWA support.
- Macro chart real.
- Unit test komponen.
- Accessibility refinement.

---

## 46. Checklist Konversi dari HTML ke React

- [ ] Pindahkan Tailwind config ke `tailwind.config.js`.
- [ ] Pindahkan CSS custom ke `src/index.css`.
- [ ] Buat `MaterialIcon` component.
- [ ] Buat `AppShell`.
- [ ] Buat `Sidebar`.
- [ ] Buat `TopAppBar`.
- [ ] Buat `LogFoodPage`.
- [ ] Pecah search, recent, meal session, macro card, FAB menjadi komponen.
- [ ] Ganti DOM event listener dengan state React.
- [ ] Tambahkan mobile hamburger.
- [ ] Tambahkan modal quick add.
- [ ] Tambahkan data model TypeScript.
- [ ] Tambahkan PWA manifest.
- [ ] Tes responsive desktop/tablet/mobile.
- [ ] Tes keyboard navigation.
- [ ] Tes screen reader labels.

---

## 47. Kesimpulan Desain

Halaman `logfood.html` sudah memiliki fondasi visual yang kuat untuk aplikasi food tracker modern. Kekuatan utamanya ada pada:

- design token warna yang konsisten,
- sidebar shell yang dapat dipakai lintas halaman,
- glassmorphism card yang halus,
- session-based food logging yang mudah dipahami,
- recent history dengan hover action,
- FAB yang jelas untuk aksi utama,
- struktur layout yang siap dipecah menjadi komponen React.

Bagian yang paling penting untuk diperbaiki saat konversi ke React adalah **menghapus DOM manipulation imperative**, memperbaiki **autocomplete focus state**, menambahkan **mobile sidebar trigger**, dan mengubah placeholder macro distribution menjadi visualisasi data yang benar-benar dinamis.

Dengan panduan ini, halaman bisa dikonversi menjadi React PWA yang rapi, modular, scalable, dan konsisten dengan halaman NutriTrack lain seperti landing page dan dashboard.
