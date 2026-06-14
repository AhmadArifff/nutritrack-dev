# designnutrition.md — UI Implementation Guide Nutrition Analysis

> Dokumen ini dibuat dari analisis tampilan `nutrition.html` untuk dikonversi ke project lokal berbasis **React PWA + Tailwind CSS**. Fokus utama halaman ini adalah analisis nutrisi harian: pembagian makro, progress protein/karbohidrat/lemak/fiber, vitamin & mineral tracker, hydration card, dan shared app shell NutriTrack.

---

## 1. Ringkasan Visual Halaman

Halaman **Nutrition Analysis** memakai gaya dashboard modern dengan pendekatan:

- **Clean health analytics UI**
- Background terang `#f8f9ff`
- Card putih semi-glass `rgba(255,255,255,.86)`
- Aksen utama hijau nutrisi `#006e2f`
- Layout berbasis sidebar kiri + top app bar sticky
- Grid analytics 12 kolom untuk desktop
- Komponen utama:
  - Sidebar navigasi NutriTrack
  - Top app bar
  - Daily Macro Split donut chart
  - Macro progress cards
  - Vitamin & Mineral Tracker
  - Hydration card

Secara UX, halaman ini berfungsi sebagai **ringkasan analitik nutrisi**, bukan halaman input makanan. Jadi informasi harus cepat dibaca, visual, dan memakai progress indicator yang langsung menunjukkan kondisi target pengguna.

---

## 2. Struktur Halaman dari HTML

Struktur utama halaman:

```txt
body
├── aside#sidebar
│   ├── Logo NutriTrack
│   ├── Navigation menu
│   ├── Upgrade card
│   ├── Help Center
│   └── Logout
│
└── main#mainContent
    ├── header TopAppBar
    │   ├── Page title: Nutrition Analysis
    │   ├── Subtitle: Macro, vitamin, mineral, and hydration
    │   ├── Search nutrients input
    │   ├── Notification button
    │   ├── Settings button
    │   └── Profile avatar
    │
    └── content wrapper
        ├── Macro Overview Section
        │   ├── Daily Macro Split donut
        │   └── 4 Macro Progress Cards
        │       ├── Protein
        │       ├── Carbs
        │       ├── Fat
        │       └── Fiber
        │
        └── Micronutrient + Hydration Section
            ├── Vitamin & Mineral Tracker
            │   ├── Vitamin C
            │   ├── Calcium
            │   ├── Iron
            │   └── Magnesium
            │
            └── Hydration Card
```

---

## 3. Design Token Warna

Token warna ini diambil dari konfigurasi Tailwind pada `nutrition.html`.

### 3.1 Brand & Surface Colors

| Token | Hex | Fungsi UI |
|---|---:|---|
| `primary` | `#006e2f` | Brand utama, icon aktif, progress utama, CTA |
| `primary-container` | `#22c55e` | Background menu aktif/sidebar, border avatar |
| `on-primary` | `#ffffff` | Text/icon di atas primary |
| `on-primary-container` | `#004b1e` | Text di atas primary-container |
| `surface` | `#f8f9ff` | Background global halaman |
| `surface-container` | `#e5eeff` | Input/search background, track progress |
| `surface-container-low` | `#eff4ff` | Sidebar background, hover area |
| `surface-variant` | `#d3e4fe` | Hover navigation/button |
| `outline-variant` | `#bccbb9` | Border halus |
| `on-surface` | `#0b1c30` | Text utama |
| `on-surface-variant` | `#3d4a3d` | Text sekunder |
| `secondary-container` | `#2170e4` | Upgrade card / aksen biru |
| `on-secondary-container` | `#fefcff` | Text di atas secondary-container |
| `error-red` | `#ef4444` | Error/logout hover |
| `energy-orange` | `#f97316` | Lemak/fat, energy marker |

### 3.2 Rekomendasi Penambahan Token

Pada HTML masih ada penggunaan warna langsung:

- `bg-blue-600`
- `bg-emerald-700`
- `bg-purple-600`
- `bg-white`

Untuk React PWA yang konsisten, sebaiknya ubah menjadi token:

```js
colors: {
  primary: "#006e2f",
  "primary-container": "#22c55e",
  "on-primary": "#ffffff",
  "on-primary-container": "#004b1e",

  surface: "#f8f9ff",
  "surface-container": "#e5eeff",
  "surface-container-low": "#eff4ff",
  "surface-variant": "#d3e4fe",

  "outline-variant": "#bccbb9",
  "on-surface": "#0b1c30",
  "on-surface-variant": "#3d4a3d",

  secondary: "#0058be",
  "secondary-container": "#2170e4",
  "energy-orange": "#f97316",
  "fiber-green": "#047857",
  "mineral-purple": "#9333ea",
  "error-red": "#ef4444",
}
```

---

## 4. Typography System

HTML memakai:

- `Inter` untuk body, label, input, dan angka normal.
- `Poppins` untuk headline.

### 4.1 Font Family

```js
fontFamily: {
  "body-md": ["Inter", "sans-serif"],
  "label-md": ["Inter", "sans-serif"],
  "headline-md": ["Poppins", "sans-serif"],
  "headline-lg": ["Poppins", "sans-serif"],
}
```

### 4.2 Font Size

```js
fontSize: {
  "label-md": ["14px", { lineHeight: "1.4", fontWeight: "500" }],
  "headline-md": ["24px", { lineHeight: "1.3", fontWeight: "700" }],
  "headline-lg": ["32px", { lineHeight: "1.25", fontWeight: "700" }],
}
```

### 4.3 Review Typography per Elemen

| Elemen | Class asal | Karakter |
|---|---|---|
| Page title topbar | `font-headline-md text-headline-md font-bold text-primary` | Judul compact, kuat, brand-oriented |
| Subtitle topbar | `text-label-md text-on-surface-variant/60` | Informasi pendukung |
| Macro total kcal | `font-headline-lg text-headline-lg` | Angka utama halaman |
| Donut center percent | `text-3xl text-primary` | Highlight target |
| Card title | `font-headline-md text-headline-md` | Section heading |
| Progress card label | `b` + text default | Perlu distandarkan ke `font-bold text-on-surface` |

---

## 5. Spacing & Layout Token

```js
spacing: {
  "gutter-desktop": "24px",
  "margin-page": "24px",
  "section-gap": "32px",
}
```

### Layout utama:

```tsx
<main className="flex-1 xl:ml-64 p-gutter-desktop w-full">
  <TopAppBar />
  <div className="p-8 max-w-[1400px] mx-auto space-y-section-gap">
    <MacroOverview />
    <MicronutrientAndHydration />
  </div>
</main>
```

### Breakpoint behavior:

| Ukuran | Behavior |
|---|---|
| `< xl` | Sidebar hidden / mobile drawer disarankan |
| `xl+` | Sidebar fixed 256px, main `xl:ml-64` |
| `lg+` | Macro split 4 kolom + macro cards 8 kolom |
| `md+` | Macro card grid 2 kolom |
| mobile | Semua section stack 1 kolom |

---

## 6. Shared App Shell

Halaman nutrition memakai shell yang sama dengan dashboard/logfood/mealplanner/progress:

- Sidebar fixed kiri
- Logo NutriTrack
- Active menu state pada `Nutrition`
- Upgrade to Premium card
- Help Center & Logout
- Top app bar sticky
- Search input
- Notification/settings/profile

### 6.1 Sidebar Active State

Menu aktif:

```html
<a class="flex items-center gap-3 px-4 py-3 bg-primary-container text-on-primary-container rounded-xl font-bold shadow-sm">
  <span class="material-symbols-outlined" style="font-variation-settings:'FILL' 1;">bar_chart</span>
  <span>Nutrition</span>
</a>
```

Implementasi React:

```tsx
const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: "dashboard" },
  { label: "Log Food", href: "/log-food", icon: "add_box" },
  { label: "Meal Planner", href: "/meal-planner", icon: "restaurant_menu" },
  { label: "Progress", href: "/progress", icon: "insights" },
  { label: "Nutrition", href: "/nutrition", icon: "bar_chart" },
  { label: "Foods", href: "/foods", icon: "nutrition" },
  { label: "Community", href: "/community", icon: "group" },
  { label: "Profile", href: "/profile", icon: "person" },
];
```

```tsx
function SidebarItem({ item, active }) {
  return (
    <NavLink
      to={item.href}
      className={
        active
          ? "flex items-center gap-3 px-4 py-3 bg-primary-container text-on-primary-container rounded-xl font-bold shadow-sm"
          : "flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-variant/40 hover:text-on-surface transition-all rounded-xl"
      }
    >
      <span
        className="material-symbols-outlined"
        style={active ? { fontVariationSettings: "'FILL' 1" } : undefined}
      >
        {item.icon}
      </span>
      <span className="font-label-md text-label-md nav-label">{item.label}</span>
    </NavLink>
  );
}
```

### 6.2 Sidebar Collapse & Hide

HTML memiliki JS toggle:

```js
sidebar.classList.toggle("collapsed");
sidebar.classList.toggle("hidden-full");
main.classList.toggle("main-collapsed");
main.classList.toggle("hidden-sidebar");
```

Untuk React, gunakan state:

```tsx
const [collapsed, setCollapsed] = useState(false);
const [hidden, setHidden] = useState(false);
```

Class utama:

```tsx
<aside
  className={cn(
    "h-screen fixed left-0 top-0 z-50 bg-surface-container-low border-r border-outline-variant/20 shadow-md flex flex-col py-margin-page px-4 hidden xl:flex transition-all duration-200",
    collapsed ? "w-[72px]" : "w-64",
    hidden && "-translate-x-[110%] w-0"
  )}
>
```

Main content:

```tsx
<main
  className={cn(
    "flex-1 p-gutter-desktop w-full transition-all duration-200",
    !hidden && !collapsed && "xl:ml-64",
    !hidden && collapsed && "xl:ml-[72px]",
    hidden && "xl:ml-0"
  )}
>
```

---

## 7. Top App Bar

### 7.1 Visual

Top app bar:

```html
<header class="sticky top-0 z-40 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/30 px-gutter-desktop h-16 flex items-center justify-between">
```

Karakter UI:

- Sticky di atas
- Semi-transparent background
- Blur untuk glass effect
- Height 64px
- Border bawah lembut
- Search input hanya tampil `md+`
- Profile avatar dengan border hijau

### 7.2 Implementasi React

```tsx
export function TopAppBar() {
  return (
    <header className="sticky top-0 z-40 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/30 px-gutter-desktop h-16 flex items-center justify-between">
      <div>
        <h2 className="font-headline-md text-headline-md font-bold text-primary">
          Nutrition Analysis
        </h2>
        <p className="text-label-md text-on-surface-variant/60">
          Macro, vitamin, mineral, and hydration
        </p>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative hidden md:block">
          <input
            className="bg-surface-container border-none rounded-full px-5 py-2 pl-12 focus:ring-2 focus:ring-primary w-64 text-label-md"
            placeholder="Search nutrients..."
            type="text"
          />
          <span className="material-symbols-outlined absolute left-4 top-2 text-on-surface-variant">
            search
          </span>
        </div>

        <IconButton icon="notifications" label="Open notifications" />
        <IconButton icon="settings" label="Open settings" />
        <ProfileButton />
      </div>
    </header>
  );
}
```

---

## 8. Glass Card System

HTML:

```css
.glass-card {
  background: rgba(255,255,255,.86);
  border: 1px solid rgba(188,203,185,.55);
  box-shadow: 0 12px 28px rgba(15,23,42,.06);
}
```

### Rekomendasi Tailwind Utility

Tambahkan di `src/styles/components.css`:

```css
@layer components {
  .glass-card {
    background: rgba(255, 255, 255, 0.86);
    border: 1px solid rgba(188, 203, 185, 0.55);
    box-shadow: 0 12px 28px rgba(15, 23, 42, 0.06);
  }

  .glass-card-hover {
    transition: transform 180ms ease, box-shadow 180ms ease;
  }

  .glass-card-hover:hover {
    transform: translateY(-2px);
    box-shadow: 0 16px 34px rgba(15, 23, 42, 0.08);
  }
}
```

---

## 9. Main Content Layout

HTML section utama:

```html
<section class="grid grid-cols-1 lg:grid-cols-12 gap-6">
  <div class="lg:col-span-4">Daily Macro Split</div>
  <div class="lg:col-span-8 grid md:grid-cols-2 gap-6">Macro Cards</div>
</section>

<section class="grid lg:grid-cols-3 gap-6">
  <div class="lg:col-span-2">Vitamin & Mineral Tracker</div>
  <div>Hydration</div>
</section>
```

React:

```tsx
export default function NutritionPage() {
  return (
    <AppShell activePath="/nutrition">
      <div className="p-8 max-w-[1400px] mx-auto space-y-section-gap">
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <DailyMacroSplit />
          <MacroProgressGrid />
        </section>

        <section className="grid lg:grid-cols-3 gap-6">
          <VitaminMineralTracker />
          <HydrationCard />
        </section>
      </div>
    </AppShell>
  );
}
```

---

## 10. Daily Macro Split Donut

### 10.1 Elemen HTML

```html
<div class="relative w-64 h-64 mx-auto rounded-full bg-[conic-gradient(#006e2f_0_40%,#0058be_40%_72%,#f97316_72%_92%,#dce9ff_92%_100%)] flex items-center justify-center">
  <div class="w-36 h-36 rounded-full bg-white flex flex-col items-center justify-center">
    <b class="text-3xl text-primary">92%</b>
    <span class="text-xs text-on-surface-variant">target</span>
  </div>
</div>
```

### 10.2 Visual Meaning

Donut menggunakan `conic-gradient` untuk menunjukkan split:

| Segment | Range | Warna | Makna |
|---|---:|---|---|
| Protein | 0–40% | `#006e2f` | Primary nutrition |
| Carbs | 40–72% | `#0058be` | Secondary blue |
| Fat | 72–92% | `#f97316` | Energy orange |
| Remaining | 92–100% | `#dce9ff` | Empty target |

### 10.3 Implementasi React Data-driven

```tsx
type MacroSegment = {
  label: string;
  value: number;
  color: string;
};

const macroSegments: MacroSegment[] = [
  { label: "Protein", value: 40, color: "#006e2f" },
  { label: "Carbs", value: 32, color: "#0058be" },
  { label: "Fat", value: 20, color: "#f97316" },
  { label: "Remaining", value: 8, color: "#dce9ff" },
];
```

Helper gradient:

```ts
function buildConicGradient(segments: MacroSegment[]) {
  let cursor = 0;

  return `conic-gradient(${segments
    .map((segment) => {
      const start = cursor;
      const end = cursor + segment.value;
      cursor = end;
      return `${segment.color} ${start}% ${end}%`;
    })
    .join(",")})`;
}
```

Component:

```tsx
export function DailyMacroSplit() {
  const gradient = buildConicGradient(macroSegments);

  return (
    <div className="lg:col-span-4 glass-card rounded-[2rem] p-8 glass-card-hover">
      <p className="text-label-md text-on-surface-variant mb-2">
        Daily Macro Split
      </p>

      <h1 className="font-headline-lg text-headline-lg mb-8">
        2,100 kcal
      </h1>

      <div
        className="relative w-64 h-64 mx-auto rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-[1.02]"
        style={{ background: gradient }}
        aria-label="Daily macro split chart"
      >
        <div className="w-36 h-36 rounded-full bg-white flex flex-col items-center justify-center shadow-inner">
          <b className="text-3xl text-primary">92%</b>
          <span className="text-xs text-on-surface-variant">target</span>
        </div>
      </div>

      <MacroLegend />
    </div>
  );
}
```

### 10.4 Rekomendasi Tambahan

Tambahkan legend di bawah donut agar user tahu arti warna:

```tsx
function MacroLegend() {
  return (
    <div className="grid grid-cols-2 gap-3 mt-8 text-sm">
      <LegendDot color="bg-primary" label="Protein" />
      <LegendDot color="bg-secondary" label="Carbs" />
      <LegendDot color="bg-energy-orange" label="Fat" />
      <LegendDot color="bg-surface-container-high" label="Remaining" />
    </div>
  );
}
```

---

## 11. Macro Progress Cards

### 11.1 Data

Dari HTML:

| Macro | Current | Target | Progress | Color |
|---|---:|---:|---:|---|
| Protein | 120g | 180g | 66.67% | `primary` |
| Carbs | 210g | 300g | 70% | `blue-600` |
| Fat | 45g | 75g | 60% | `energy-orange` |
| Fiber | 22g | 35g | 62.86% | `emerald-700` |

### 11.2 Model Data

```ts
type MacroProgress = {
  name: string;
  current: number;
  target: number;
  unit: string;
  colorClass: string;
};

const macroProgress: MacroProgress[] = [
  {
    name: "Protein",
    current: 120,
    target: 180,
    unit: "g",
    colorClass: "bg-primary",
  },
  {
    name: "Carbs",
    current: 210,
    target: 300,
    unit: "g",
    colorClass: "bg-secondary",
  },
  {
    name: "Fat",
    current: 45,
    target: 75,
    unit: "g",
    colorClass: "bg-energy-orange",
  },
  {
    name: "Fiber",
    current: 22,
    target: 35,
    unit: "g",
    colorClass: "bg-fiber-green",
  },
];
```

### 11.3 Component

```tsx
function MacroProgressCard({ item }: { item: MacroProgress }) {
  const percent = Math.min(100, Math.round((item.current / item.target) * 100));

  return (
    <article className="glass-card rounded-[2rem] p-6 glass-card-hover">
      <div className="flex justify-between mb-3">
        <b className="text-on-surface">{item.name}</b>
        <span className="text-on-surface-variant">
          {item.current}
          {item.unit} / {item.target}
          {item.unit}
        </span>
      </div>

      <div className="h-3 rounded-full bg-surface-container overflow-hidden">
        <div
          className={`h-full rounded-full ${item.colorClass} transition-all duration-700 ease-out`}
          style={{ width: `${percent}%` }}
        />
      </div>

      <p className="mt-3 text-xs text-on-surface-variant">
        {percent}% dari target harian
      </p>
    </article>
  );
}
```

### 11.4 Grid

```tsx
function MacroProgressGrid() {
  return (
    <div className="lg:col-span-8 grid md:grid-cols-2 gap-6">
      {macroProgress.map((item) => (
        <MacroProgressCard key={item.name} item={item} />
      ))}
    </div>
  );
}
```

---

## 12. Vitamin & Mineral Tracker

### 12.1 Struktur UI

HTML:

```html
<div class="lg:col-span-2 glass-card rounded-[2rem] p-8">
  <h3>Vitamin & Mineral Tracker</h3>
  <div class="grid md:grid-cols-2 gap-5 text-sm">
    ...
  </div>
</div>
```

Nutrient item:

- Label kiri
- Persentase kanan
- Progress bar 2px
- Warna berbeda per nutrisi

### 12.2 Data

```ts
type NutrientProgress = {
  name: string;
  percent: number;
  colorClass: string;
};

const nutrients: NutrientProgress[] = [
  { name: "Vitamin C", percent: 82, colorClass: "bg-primary" },
  { name: "Calcium", percent: 64, colorClass: "bg-secondary" },
  { name: "Iron", percent: 51, colorClass: "bg-energy-orange" },
  { name: "Magnesium", percent: 76, colorClass: "bg-mineral-purple" },
];
```

### 12.3 Component

```tsx
function NutrientProgressRow({ item }: { item: NutrientProgress }) {
  return (
    <div>
      <div className="flex justify-between mb-2">
        <b className="text-on-surface">{item.name}</b>
        <span className="text-on-surface-variant">{item.percent}%</span>
      </div>

      <div className="h-2 bg-surface-container rounded-full overflow-hidden">
        <div
          className={`h-full ${item.colorClass} rounded-full transition-all duration-700 ease-out`}
          style={{ width: `${item.percent}%` }}
        />
      </div>
    </div>
  );
}
```

```tsx
export function VitaminMineralTracker() {
  return (
    <section className="lg:col-span-2 glass-card rounded-[2rem] p-8 glass-card-hover">
      <h3 className="font-headline-md text-headline-md mb-6">
        Vitamin & Mineral Tracker
      </h3>

      <div className="grid md:grid-cols-2 gap-5 text-sm">
        {nutrients.map((item) => (
          <NutrientProgressRow key={item.name} item={item} />
        ))}
      </div>
    </section>
  );
}
```

### 12.4 Rekomendasi UX Tambahan

Tambahkan status ringan:

| Percent | Status | Warna |
|---:|---|---|
| `>= 80` | Optimal | Primary |
| `60–79` | Cukup | Secondary |
| `< 60` | Perlu ditingkatkan | Orange/Error |

Contoh:

```ts
function getNutrientStatus(percent: number) {
  if (percent >= 80) return "Optimal";
  if (percent >= 60) return "Cukup";
  return "Perlu ditingkatkan";
}
```

---

## 13. Hydration Card

### 13.1 Elemen Visual

HTML:

```html
<div class="glass-card rounded-[2rem] p-8 bg-mint-surface">
  <span class="material-symbols-outlined text-primary text-5xl">water_drop</span>
  <h3>Hydration</h3>
  <p>6 dari 8 gelas tercatat hari ini.</p>
  <button>Tambah Gelas</button>
</div>
```

Karakter:

- Background mint `bg-mint-surface`
- Icon besar `water_drop`
- CTA primary penuh
- Card berdiri sendiri, cocok untuk quick action

### 13.2 Tambahkan Token `mint-surface`

HTML memakai class `bg-mint-surface`, tapi Tailwind config di nutrition hanya belum memasukkan `mint-surface`. Tambahkan:

```js
"mint-surface": "#f0fdf4"
```

### 13.3 Component

```tsx
type HydrationState = {
  currentGlasses: number;
  targetGlasses: number;
};

export function HydrationCard() {
  const [hydration, setHydration] = useState<HydrationState>({
    currentGlasses: 6,
    targetGlasses: 8,
  });

  const percent = Math.round(
    (hydration.currentGlasses / hydration.targetGlasses) * 100
  );

  return (
    <section className="glass-card rounded-[2rem] p-8 bg-mint-surface glass-card-hover">
      <span className="material-symbols-outlined text-primary text-5xl">
        water_drop
      </span>

      <h3 className="font-headline-md text-headline-md mt-5">
        Hydration
      </h3>

      <p className="text-on-surface-variant mb-5">
        {hydration.currentGlasses} dari {hydration.targetGlasses} gelas tercatat hari ini.
      </p>

      <div className="h-2 bg-white rounded-full overflow-hidden mb-5">
        <div
          className="h-full bg-primary rounded-full transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>

      <button
        type="button"
        className="w-full py-3 rounded-xl bg-primary text-white font-bold hover:brightness-110 active:scale-[0.98] transition-all"
        onClick={() =>
          setHydration((prev) => ({
            ...prev,
            currentGlasses: Math.min(prev.targetGlasses, prev.currentGlasses + 1),
          }))
        }
      >
        Tambah Gelas
      </button>
    </section>
  );
}
```

---

## 14. Animasi & Micro Interaction

HTML nutrition masih minim animasi. Ada hover pada sidebar dan button, tetapi belum ada animasi untuk chart/progress. Untuk React PWA, ini bisa ditingkatkan.

### 14.1 Animasi yang Direkomendasikan

| Elemen | Animasi | Tujuan |
|---|---|---|
| Glass card | `hover:translate-y-[-2px]` | Memberi rasa interaktif |
| Progress bar | Width transition `duration-700` | Data terasa hidup |
| Donut chart | Scale hover `hover:scale-[1.02]` | Highlight visual utama |
| Hydration button | `active:scale-[0.98]` | Feedback input |
| Sidebar collapse | `transition-all duration-200` | Navigasi smooth |
| Search input | `focus:ring-2 focus:ring-primary` | Fokus jelas |

### 14.2 CSS Component Layer

```css
@layer components {
  .card-lift {
    transition:
      transform 180ms ease,
      box-shadow 180ms ease,
      border-color 180ms ease;
  }

  .card-lift:hover {
    transform: translateY(-2px);
    box-shadow: 0 16px 34px rgba(15, 23, 42, 0.08);
  }

  .pressable {
    transition:
      transform 120ms ease,
      filter 120ms ease;
  }

  .pressable:active {
    transform: scale(0.98);
  }

  .progress-fill {
    transition: width 700ms ease-out;
  }
}
```

### 14.3 Framer Motion Optional

Untuk hasil lebih smooth:

```bash
npm install framer-motion
```

```tsx
import { motion } from "framer-motion";

export function MotionCard({ children }: { children: React.ReactNode }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className="glass-card rounded-[2rem] p-6"
    >
      {children}
    </motion.article>
  );
}
```

---

## 15. Data Model untuk Backend / Local State

Supaya halaman ini mudah dihubungkan ke backend, gunakan struktur data seperti berikut.

### 15.1 Nutrition Summary

```ts
export type NutritionSummary = {
  calories: {
    consumed: number;
    target: number;
  };
  macros: {
    protein: NutritionMetric;
    carbs: NutritionMetric;
    fat: NutritionMetric;
    fiber: NutritionMetric;
  };
  micronutrients: NutritionPercentMetric[];
  hydration: {
    currentGlasses: number;
    targetGlasses: number;
  };
};

export type NutritionMetric = {
  current: number;
  target: number;
  unit: "g" | "mg" | "kcal";
};

export type NutritionPercentMetric = {
  name: string;
  percent: number;
  category: "vitamin" | "mineral";
};
```

### 15.2 Example Data

```ts
export const nutritionSummary: NutritionSummary = {
  calories: {
    consumed: 2100,
    target: 2280,
  },
  macros: {
    protein: { current: 120, target: 180, unit: "g" },
    carbs: { current: 210, target: 300, unit: "g" },
    fat: { current: 45, target: 75, unit: "g" },
    fiber: { current: 22, target: 35, unit: "g" },
  },
  micronutrients: [
    { name: "Vitamin C", percent: 82, category: "vitamin" },
    { name: "Calcium", percent: 64, category: "mineral" },
    { name: "Iron", percent: 51, category: "mineral" },
    { name: "Magnesium", percent: 76, category: "mineral" },
  ],
  hydration: {
    currentGlasses: 6,
    targetGlasses: 8,
  },
};
```

---

## 16. File Structure React PWA

Rekomendasi struktur:

```txt
src/
├── app/
│   ├── App.tsx
│   └── routes.tsx
│
├── components/
│   ├── shell/
│   │   ├── AppShell.tsx
│   │   ├── Sidebar.tsx
│   │   ├── TopAppBar.tsx
│   │   ├── IconButton.tsx
│   │   └── ProfileButton.tsx
│   │
│   └── ui/
│       ├── GlassCard.tsx
│       ├── ProgressBar.tsx
│       └── MaterialIcon.tsx
│
├── features/
│   └── nutrition/
│       ├── NutritionPage.tsx
│       ├── DailyMacroSplit.tsx
│       ├── MacroProgressGrid.tsx
│       ├── MacroProgressCard.tsx
│       ├── VitaminMineralTracker.tsx
│       ├── NutrientProgressRow.tsx
│       ├── HydrationCard.tsx
│       ├── nutrition.data.ts
│       └── nutrition.types.ts
│
├── styles/
│   ├── globals.css
│   └── components.css
│
└── pwa/
    └── registerSW.ts
```

---

## 17. Tailwind Config Final

Gunakan config berikut agar class dari HTML tetap kompatibel.

```js
// tailwind.config.js
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#006e2f",
        "primary-container": "#22c55e",
        "on-primary": "#ffffff",
        "on-primary-container": "#004b1e",

        surface: "#f8f9ff",
        "surface-container": "#e5eeff",
        "surface-container-low": "#eff4ff",
        "surface-container-high": "#dce9ff",
        "surface-variant": "#d3e4fe",

        "outline-variant": "#bccbb9",
        "on-surface": "#0b1c30",
        "on-surface-variant": "#3d4a3d",

        secondary: "#0058be",
        "secondary-container": "#2170e4",
        "on-secondary-container": "#fefcff",

        "energy-orange": "#f97316",
        "fiber-green": "#047857",
        "mineral-purple": "#9333ea",
        "mint-surface": "#f0fdf4",
        "error-red": "#ef4444",
      },
      spacing: {
        "gutter-desktop": "24px",
        "margin-page": "24px",
        "section-gap": "32px",
        "card-padding": "20px",
      },
      fontFamily: {
        "body-md": ["Inter", "sans-serif"],
        "label-md": ["Inter", "sans-serif"],
        "headline-md": ["Poppins", "sans-serif"],
        "headline-lg": ["Poppins", "sans-serif"],
      },
      fontSize: {
        "label-md": ["14px", { lineHeight: "1.4", fontWeight: "500" }],
        "headline-md": ["24px", { lineHeight: "1.3", fontWeight: "700" }],
        "headline-lg": ["32px", { lineHeight: "1.25", fontWeight: "700" }],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
```

---

## 18. Global CSS

```css
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Poppins:wght@600;700;800&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap");

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }

  body {
    @apply bg-surface text-on-surface font-body-md overflow-x-hidden;
  }

  .material-symbols-outlined {
    font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24;
  }
}

@layer components {
  .glass-card {
    background: rgba(255, 255, 255, 0.86);
    border: 1px solid rgba(188, 203, 185, 0.55);
    box-shadow: 0 12px 28px rgba(15, 23, 42, 0.06);
  }

  .glass-card-hover {
    transition:
      transform 180ms ease,
      box-shadow 180ms ease;
  }

  .glass-card-hover:hover {
    transform: translateY(-2px);
    box-shadow: 0 16px 34px rgba(15, 23, 42, 0.08);
  }

  .pressable {
    transition:
      transform 120ms ease,
      filter 120ms ease;
  }

  .pressable:active {
    transform: scale(0.98);
  }

  .upgrade-card {
    background: linear-gradient(
      135deg,
      rgba(33, 112, 228, 0.08),
      rgba(33, 112, 228, 0.14)
    );
  }
}
```

---

## 19. PWA Setup

Install:

```bash
npm install vite-plugin-pwa
```

`vite.config.ts`:

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "apple-touch-icon.png"],
      manifest: {
        name: "NutriTrack",
        short_name: "NutriTrack",
        description: "Nutrition tracking and health companion dashboard.",
        theme_color: "#006e2f",
        background_color: "#f8f9ff",
        display: "standalone",
        start_url: "/nutrition",
        icons: [
          {
            src: "/icons/icon-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icons/icon-512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
```

---

## 20. Accessibility Checklist

| Area | Status HTML | Rekomendasi React |
|---|---|---|
| Sidebar | Sudah ada `role="navigation"` dan `aria-label` | Pertahankan |
| Active route | Sudah ada `aria-current="page"` | Pertahankan via `NavLink` |
| Icon buttons | Belum semua punya `aria-label` | Tambahkan `aria-label` |
| Donut chart | Belum ada semantic label | Tambahkan `aria-label` atau summary text |
| Progress bars | Belum ada `role="progressbar"` | Tambahkan `role`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax` |
| Hydration button | Text jelas | Tambahkan disabled saat target penuh |
| Search input | Placeholder ada | Tambahkan `aria-label="Search nutrients"` |

Contoh progress bar aksesibel:

```tsx
<div
  role="progressbar"
  aria-valuemin={0}
  aria-valuemax={100}
  aria-valuenow={percent}
  aria-label={`${item.name} progress ${percent}%`}
  className="h-3 rounded-full bg-surface-container overflow-hidden"
>
  <div
    className={`h-full rounded-full ${item.colorClass}`}
    style={{ width: `${percent}%` }}
  />
</div>
```

---

## 21. Catatan Perbaikan dari HTML Asli

### 21.1 Tailwind Config Belum Selengkap Halaman Lain

`nutrition.html` hanya memakai subset token. Padahal class seperti `bg-mint-surface` dipakai pada hydration card. Pastikan token `mint-surface` ada di config final.

### 21.2 Sidebar Collapse Bergantung pada CSS Eksternal

HTML memanggil `app-shell.css`, tetapi inline CSS halaman ini tidak memuat semua class seperti:

- `aside#sidebar.collapsed`
- `.nav-label`
- `.hidden-full`
- `.main-collapsed`
- `.upgrade-card`

Untuk project React, pindahkan semua app-shell behavior ke komponen `AppShell` dan CSS component layer agar tidak tergantung file global yang tidak jelas.

### 21.3 Warna Hardcoded Perlu Distandarkan

Ganti:

```html
bg-blue-600
bg-emerald-700
bg-purple-600
```

Menjadi:

```html
bg-secondary
bg-fiber-green
bg-mineral-purple
```

Manfaat:

- Lebih konsisten
- Mudah theming
- Cocok untuk dark mode
- Lebih maintainable

### 21.4 Donut Chart Masih Static

Conic gradient di HTML hardcoded:

```css
conic-gradient(#006e2f_0_40%, #0058be_40%_72%, ...)
```

Di React, buat data-driven agar angka berubah otomatis dari backend/state.

### 21.5 Belum Ada FAB

Berbeda dari dashboard/logfood/mealplanner/progress, halaman nutrition tidak memiliki FAB. Jika halaman nutrition juga akan punya quick action, tambahkan FAB untuk:

- Add water
- Log food
- Scan food
- Add supplement

Rekomendasi:

```tsx
<FloatingActionButton icon="add" label="Add nutrition entry" />
```

---

## 22. Prioritas Implementasi

### Prioritas 1 — Wajib

- Buat `AppShell`, `Sidebar`, `TopAppBar`
- Pindahkan token warna ke `tailwind.config.js`
- Buat `NutritionPage`
- Buat `DailyMacroSplit`
- Buat `MacroProgressCard`
- Buat `VitaminMineralTracker`
- Buat `HydrationCard`

### Prioritas 2 — UX Improvement

- Progress bar animated
- Donut chart data-driven
- Glass card hover lift
- Hydration increment state
- Search focus effect
- Progress bar accessibility

### Prioritas 3 — Production Ready

- Fetch data dari API `/api/nutrition/summary`
- Skeleton loading
- Error state
- Empty state
- Offline cache untuk PWA
- Dark mode token

---

## 23. Contoh API Response

```json
{
  "date": "2026-06-13",
  "calories": {
    "consumed": 2100,
    "target": 2280
  },
  "macros": {
    "protein": { "current": 120, "target": 180, "unit": "g" },
    "carbs": { "current": 210, "target": 300, "unit": "g" },
    "fat": { "current": 45, "target": 75, "unit": "g" },
    "fiber": { "current": 22, "target": 35, "unit": "g" }
  },
  "micronutrients": [
    { "name": "Vitamin C", "percent": 82, "category": "vitamin" },
    { "name": "Calcium", "percent": 64, "category": "mineral" },
    { "name": "Iron", "percent": 51, "category": "mineral" },
    { "name": "Magnesium", "percent": 76, "category": "mineral" }
  ],
  "hydration": {
    "currentGlasses": 6,
    "targetGlasses": 8
  }
}
```

---

## 24. Kesimpulan Desain

Halaman `nutrition.html` sudah kuat sebagai **nutrition analytics dashboard** yang compact dan mudah dibaca. Kekuatan utamanya ada pada:

- Donut macro split yang langsung menarik fokus
- Progress card yang sederhana dan informatif
- Vitamin/mineral tracker yang ringan
- Hydration card sebagai quick action
- Visual consistency dengan halaman NutriTrack lain

Agar optimal saat dikonversi ke React PWA, bagian paling penting adalah membuat semua visual menjadi **data-driven**, menyatukan token Tailwind, memperbaiki aksesibilitas progress chart, dan memindahkan sidebar behavior dari DOM script ke state React.
