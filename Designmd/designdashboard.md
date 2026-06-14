# designdashboard.md — NutriTrack Dashboard Design System & Implementation Guide

> Dokumen ini adalah hasil analisis tampilan dari `dashboard.html` untuk dikonversi ke project lokal berbasis **React PWA + Tailwind CSS**. Fokus utama dokumen ini adalah menjaga visual, warna, layout, micro-interaction, responsive behavior, dan struktur komponen agar konsisten saat diimplementasikan ulang.

---

## 1. Ringkasan Tampilan

Dashboard NutriTrack menggunakan pendekatan **health-tech dashboard** dengan karakter visual:

- **Clean light UI** dengan background biru-putih sangat lembut.
- **Glassmorphism card** untuk membuat elemen dashboard terlihat ringan, modern, dan premium.
- **Primary green** sebagai warna utama kesehatan/nutrisi.
- **Secondary blue**, **tertiary red-brown**, **orange energy**, dan **purple achievement** sebagai warna kategorikal untuk makro nutrisi, motivasi, dan status.
- **Sidebar fixed desktop** dengan mode collapse dan hide.
- **Top app bar sticky** untuk greeting, search, notification, settings, dan profile.
- **Bento grid dashboard** untuk kalori, makro, jadwal makan, weight trend, dan daily wisdom.
- **Micro-interaction** berupa hover translate, button scale, sidebar transition, dan floating animation.

Target konversi ke React PWA sebaiknya menggunakan:

```txt
React + Vite
Tailwind CSS v3
vite-plugin-pwa
lucide-react atau Material Symbols
Recharts / SVG custom untuk chart dan calorie ring
Context API / Zustand untuk app shell state
```

---

## 2. Identitas UI

| Area | Karakter |
|---|---|
| Brand | NutriTrack Pro Companion |
| Domain | Nutrition tracking, meal planner, health dashboard |
| Mood | Clean, profesional, sehat, ringan, friendly |
| Visual language | Rounded card, glass card, soft border, pastel surface |
| Interaction style | Subtle lift, scale, sticky navigation, collapsible shell |
| Layout density | Medium-high dashboard density, tetapi tetap breathable |
| Recommended user context | Desktop dashboard utama, tablet, dan mobile drawer |

---

## 3. Struktur Halaman Asli

Struktur besar dari `dashboard.html`:

```txt
html.light
└── body.bg-background.text-on-surface.font-body-md
    ├── aside#sidebar
    │   ├── Brand logo NutriTrack
    │   ├── Collapse button
    │   ├── Primary nav menu
    │   ├── Upgrade premium card
    │   ├── Help Center
    │   └── Logout
    │
    ├── main#mainContent
    │   ├── header sticky top app bar
    │   │   ├── Greeting
    │   │   ├── Search foods input
    │   │   ├── Notification button
    │   │   ├── Settings button
    │   │   └── Profile entry
    │   │
    │   └── dashboard content
    │       ├── Hero grid
    │       │   ├── Daily Fuel calorie card
    │       │   └── Macro bento grid
    │       │       ├── Protein
    │       │       ├── Carbs
    │       │       ├── Fats
    │       │       └── Fiber
    │       │
    │       ├── Today's Schedule horizontal meal timeline
    │       └── Bottom row
    │           ├── Weight Trend mini chart
    │           └── Motivation / Daily Wisdom card
    │
    └── Floating Action Button
```

---

## 4. Design Token

### 4.1 Warna Utama

Gunakan token ini di `tailwind.config.js` agar semua class asli dari HTML tetap kompatibel.

```js
// tailwind.config.js
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
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
        "primary": "#006e2f",
      },
    },
  },
};
```

### 4.2 Fungsi Warna

| Token | Hex | Fungsi UI |
|---|---:|---|
| `primary` | `#006e2f` | CTA utama, teks brand, progress utama |
| `primary-container` | `#22c55e` | active nav, badge goal, border avatar |
| `mint-surface` | `#f0fdf4` | card meal selesai, icon health surface |
| `secondary` | `#0058be` | carbs, upgrade, accent biru |
| `secondary-container` | `#2170e4` | gradient upgrade card |
| `tertiary` | `#9e4036` | protein |
| `energy-orange` | `#f97316` | fats, energy, gradient motivasi |
| `achievement-purple` | `#a855f7` | achievement/motivation card |
| `warning-yellow` | `#eab308` | rating/status warning bila diperlukan |
| `background` | `#f8f9ff` | page background |
| `surface` | `#f8f9ff` | top app bar surface |
| `surface-container` | `#e5eeff` | card inner block, chart background |
| `surface-container-low` | `#eff4ff` | sidebar background |
| `surface-container-highest` | `#d3e4fe` | placeholder tile |
| `outline-variant` | `#bccbb9` | border lembut |
| `on-surface` | `#0b1c30` | teks utama |
| `on-surface-variant` | `#3d4a3d` | teks sekunder |

### 4.3 Typography

Dashboard menggunakan 4 keluarga font:

| Token | Font | Fungsi |
|---|---|---|
| `Poppins` | Headline | Judul dashboard, brand, section title |
| `Nunito` | Body | Body dashboard dan paragraph |
| `Inter` | Label | Label kecil, menu, metadata |
| `JetBrains Mono` | Metrics | Angka kalori/metric agar terasa data-driven |

Konfigurasi Tailwind:

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
  "headline-lg": ["Poppins"],
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
  "headline-lg": ["32px", { lineHeight: "1.25", fontWeight: "600" }],
}
```

### 4.4 Spacing & Radius

```js
spacing: {
  "gutter-mobile": "16px",
  "card-padding": "20px",
  "gutter-desktop": "24px",
  "unit": "4px",
  "section-gap": "32px",
  "margin-page": "24px",
},
borderRadius: {
  DEFAULT: "0.25rem",
  lg: "0.5rem",
  xl: "0.75rem",
  full: "9999px",
}
```

Tambahan radius non-token yang dipakai langsung:

| Class | Nilai | Lokasi |
|---|---:|---|
| `rounded-xl` | `0.75rem` | nav item, button |
| `rounded-2xl` | `1rem` | mini cards, inputs, meal cards |
| `rounded-[1.5rem]` | `1.5rem` | macro card |
| `rounded-[2rem]` | `2rem` | main dashboard cards |
| `rounded-full` | `9999px` | FAB, icon button, avatar |

---

## 5. Global CSS Utilities

Letakkan di `src/styles/dashboard.css` atau `src/index.css` menggunakan `@layer components`.

```css
@layer components {
  .glass-card {
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(226, 232, 240, 0.5);
    box-shadow: 0 10px 25px -5px rgba(0, 110, 47, 0.05);
  }

  .achievement-gradient {
    background: linear-gradient(135deg, #a855f7 0%, #f97316 100%);
  }

  .macro-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }

  @keyframes float {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-10px);
    }
    100% {
      transform: translateY(0px);
    }
  }

  .float-animation {
    animation: float 4s ease-in-out infinite;
  }

  .mobile-drawer-backdrop {
    display: none;
    position: fixed;
    inset: 0;
    background: rgba(2, 6, 23, 0.5);
    z-index: 40;
  }

  .mobile-drawer-backdrop.active {
    display: block;
  }
}
```

### Catatan Konversi

Di React, hindari `document.querySelectorAll()` untuk hover. Gunakan:

```html
<div className="glass-card transition-transform duration-200 hover:-translate-y-1">
```

Alasannya:

- Lebih declarative.
- Tidak ada manual event listener.
- Tidak rawan memory leak.
- Lebih sesuai React rendering.

---

## 6. Analisis Per Elemen Tampilan

---

# 6.1 Body & App Canvas

## Desain Asli

```html
<body class="bg-background text-on-surface font-body-md overflow-x-hidden">
```

## Fungsi

- Background utama memakai `#f8f9ff`.
- Teks default memakai `on-surface`.
- Font default `Nunito`.
- `overflow-x-hidden` mencegah scroll horizontal dari sidebar/drawer dan FAB.

## Implementasi React

```jsx
export default function App() {
  return (
    <div className="min-h-screen bg-background text-on-surface font-body-md overflow-x-hidden">
      <DashboardPage />
    </div>
  );
}
```

## Rekomendasi

Tambahkan `selection:bg-primary/20 selection:text-primary` agar interaksi teks lebih rapi.

---

# 6.2 Sidebar / Left Navigation Shell

## Desain Asli

Sidebar fixed desktop:

```html
<aside
  id="sidebar"
  role="navigation"
  aria-label="Primary navigation"
  class="h-screen w-64 fixed left-0 top-0 z-50 bg-surface-container-low border-r border-outline-variant/20 shadow-md flex flex-col py-margin-page px-4 hidden xl:flex"
>
```

## Elemen Sidebar

| Elemen | Detail |
|---|---|
| Width normal | `w-64` / 256px |
| Width collapse | 72px |
| Position | fixed, left-0, top-0 |
| Background | `surface-container-low` |
| Border | `border-r border-outline-variant/20` |
| Shadow | `shadow-md` |
| Desktop visibility | `hidden xl:flex` |
| Mobile behavior | CSS drawer tersedia, tetapi belum ada tombol hamburger di HTML |

## State Sidebar

| State | Class | Efek |
|---|---|---|
| Normal | `w-64` | label dan logo tampil |
| Collapsed | `.collapsed` | width 72px, label hilang |
| Hidden full | `.hidden-full` | sidebar translate keluar |
| Mobile open | `.mobile-open` | drawer masuk dari kiri |
| Mobile backdrop | `.mobile-drawer-backdrop.active` | overlay gelap |

## React State

```jsx
const [collapsed, setCollapsed] = useState(false);
const [hidden, setHidden] = useState(false);
const [mobileOpen, setMobileOpen] = useState(false);
```

## Class Mapping

```jsx
const sidebarClass = clsx(
  "h-screen fixed left-0 top-0 z-50 bg-surface-container-low border-r border-outline-variant/20 shadow-md flex flex-col py-margin-page px-4 transition-all duration-200",
  collapsed ? "w-[72px]" : "w-64",
  hidden && "hidden xl:flex xl:-translate-x-[110%] xl:w-0",
  mobileOpen ? "translate-x-0" : "-translate-x-[110%] xl:translate-x-0"
);
```

## Komponen React

```jsx
function Sidebar({ collapsed, hidden, mobileOpen, onToggleCollapse, onHide }) {
  const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: "dashboard", active: true },
    { label: "Log Food", href: "/log-food", icon: "add_box" },
    { label: "Meal Planner", href: "/meal-planner", icon: "restaurant_menu" },
    { label: "Progress", href: "/progress", icon: "insights" },
    { label: "Nutrition", href: "/nutrition", icon: "bar_chart" },
    { label: "Foods", href: "/foods", icon: "nutrition" },
    { label: "Community", href: "/community", icon: "group" },
    { label: "Profile", href: "/profile", icon: "person" },
  ];

  return (
    <aside
      role="navigation"
      aria-label="Primary navigation"
      className={clsx(
        "h-screen fixed left-0 top-0 z-50 bg-surface-container-low border-r border-outline-variant/20 shadow-md flex flex-col py-margin-page px-4 transition-all duration-200",
        collapsed ? "w-[72px]" : "w-64",
        hidden ? "-translate-x-[110%] w-0" : "",
        mobileOpen ? "translate-x-0" : "-translate-x-[110%] xl:translate-x-0"
      )}
    >
      <div className="mb-10 px-2 flex items-center gap-3">
        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-on-primary">
          <MaterialIcon name="nutrition" />
        </div>

        {!collapsed && (
          <div>
            <h1 className="font-headline-md text-headline-md font-black text-primary">
              NutriTrack
            </h1>
            <p className="text-[10px] font-label-md uppercase tracking-widest text-on-surface-variant/60">
              Pro Companion
            </p>
          </div>
        )}

        <button
          type="button"
          aria-expanded={!collapsed}
          onClick={onToggleCollapse}
          className="ml-auto hidden lg:inline-flex w-9 h-9 items-center justify-center rounded-full hover:bg-surface-variant text-on-surface-variant"
        >
          <MaterialIcon name={collapsed ? "chevron_right" : "chevron_left"} />
        </button>
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <SidebarItem key={item.href} item={item} collapsed={collapsed} />
        ))}
      </nav>

      <SidebarFooter collapsed={collapsed} onHide={onHide} />
    </aside>
  );
}
```

## Review UI

Kuat:

- Visual navigation jelas.
- Active item kuat dengan `primary-container`.
- Collapse behavior baik untuk dashboard desktop.
- Premium card memberi monetization slot.

Perlu diperbaiki:

- HTML asli sudah punya CSS mobile drawer, tetapi belum ada tombol hamburger pada top bar.
- `hidden xl:flex` membuat sidebar tidak muncul di bawah 1280px, sehingga perlu mobile trigger.
- Hide sidebar button berada di upgrade card, kurang intuitif. Lebih baik hide/collapse control ditempatkan di header sidebar.
- Saat hidden full, user butuh tombol untuk menampilkan kembali sidebar.

---

# 6.3 Sidebar Nav Item

## State Active

```html
<a class="flex items-center gap-3 px-4 py-3 bg-primary-container text-on-primary-container rounded-xl font-bold shadow-sm">
```

## State Normal

```html
<a class="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-variant/40 hover:text-on-surface transition-all rounded-xl">
```

## Implementasi Komponen

```jsx
function SidebarItem({ item, collapsed }) {
  return (
    <a
      href={item.href}
      aria-current={item.active ? "page" : undefined}
      className={clsx(
        "flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
        item.active
          ? "bg-primary-container text-on-primary-container font-bold shadow-sm"
          : "text-on-surface-variant hover:bg-surface-variant/40 hover:text-on-surface"
      )}
    >
      <MaterialIcon
        name={item.icon}
        filled={item.active}
        className="shrink-0"
      />
      {!collapsed && (
        <span className="font-label-md text-label-md whitespace-nowrap">
          {item.label}
        </span>
      )}
    </a>
  );
}
```

## Catatan UX

- Active indicator sudah jelas.
- Untuk aksesibilitas, pertahankan `aria-current="page"`.
- Saat collapsed, tambahkan `title={item.label}` agar user tetap tahu menu saat hover.

---

# 6.4 Upgrade Premium Card

## Desain

```html
<div class="p-4 bg-gradient-to-br from-secondary-container/80 to-secondary/20 rounded-2xl mb-6 relative overflow-hidden upgrade-card">
```

## Elemen

- Label: `Upgrade to Premium`
- Deskripsi: `Get personalized AI meal plans and deep analytics.`
- Button: `Get Started`
- Icon dekoratif: `workspace_premium`
- Mode compact saat sidebar collapsed

## Implementasi React

```jsx
function UpgradeCard({ collapsed, onHide }) {
  return (
    <div
      role="region"
      aria-label="Upgrade to premium"
      className="p-4 rounded-2xl mb-6 relative overflow-hidden bg-gradient-to-br from-secondary-container/80 to-secondary/20"
    >
      {!collapsed ? (
        <div className="relative z-10">
          <p className="text-on-secondary-container font-bold text-label-md mb-1">
            Upgrade to Premium
          </p>
          <p className="text-[#072044] text-[12px] mb-3">
            Get personalized AI meal plans and deep analytics.
          </p>
          <button className="w-full bg-on-secondary-container text-white py-2 rounded-lg text-label-sm font-bold hover:scale-105 transition-transform shadow-md">
            Get Started
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <MaterialIcon name="workspace_premium" className="text-primary" />
        </div>
      )}

      <div className="absolute -right-4 -bottom-4 opacity-10">
        <MaterialIcon name="workspace_premium" className="text-6xl" />
      </div>

      {!collapsed && (
        <button
          type="button"
          onClick={onHide}
          className="absolute top-2 left-2 w-8 h-8 rounded-full bg-white/30 hover:bg-white/50 text-on-secondary-container hidden lg:inline-flex items-center justify-center"
          aria-label="Hide sidebar"
        >
          <MaterialIcon name="close" />
        </button>
      )}
    </div>
  );
}
```

## Rekomendasi

Lebih baik jadikan upgrade card sebagai komponen reusable:

```txt
src/components/app-shell/UpgradeCard.jsx
```

---

# 6.5 Top App Bar

## Desain Asli

```html
<header class="sticky top-0 z-40 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/30 px-gutter-desktop h-16 flex items-center justify-between">
```

## Elemen

| Elemen | Fungsi |
|---|---|
| Greeting | Personalisasi user |
| Date | Konteks harian |
| Search input | Search foods |
| Notification icon | Link notifikasi |
| Settings icon | Link pengaturan |
| Profile card | Avatar + nama + plan |

## Implementasi React

```jsx
function TopAppBar({ onOpenMobileSidebar }) {
  return (
    <header className="sticky top-0 z-40 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/30 px-gutter-desktop h-16 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenMobileSidebar}
          className="xl:hidden w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface-variant text-on-surface-variant"
          aria-label="Open navigation menu"
        >
          <MaterialIcon name="menu" />
        </button>

        <div>
          <h2 className="font-headline-md text-headline-md font-bold text-primary">
            Good Morning, Alex
          </h2>
          <p className="text-label-md text-on-surface-variant/60">
            Tuesday, October 24
          </p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <SearchInput />

        <div className="flex gap-2">
          <IconButton href="/notifications" icon="notifications" label="Open notifications" />
          <IconButton href="/settings" icon="settings" label="Open settings" />
        </div>

        <ProfileShortcut />
      </div>
    </header>
  );
}
```

## Review UI

Kuat:

- Sticky header cocok untuk dashboard.
- Search input tersembunyi di mobile/tablet kecil (`hidden md:block`) sehingga layout tidak sesak.
- Icon button memakai rounded hover surface.

Perlu diperbaiki:

- Tambahkan hamburger mobile karena sidebar mobile sudah disiapkan.
- Greeting masih hardcoded. Di React, ambil dari user profile.
- Date masih hardcoded. Gunakan formatter lokal Indonesia jika aplikasi target Indonesia.

Contoh formatter:

```js
const formattedDate = new Intl.DateTimeFormat("id-ID", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
}).format(new Date());
```

---

# 6.6 Search Input

## Desain

```html
<input class="bg-surface-container border-none rounded-full px-5 py-2 pl-12 focus:ring-2 focus:ring-primary w-64 text-label-md" placeholder="Search foods..." type="text"/>
```

## Implementasi

```jsx
function SearchInput() {
  return (
    <div className="relative hidden md:block">
      <input
        className="bg-surface-container border-none rounded-full px-5 py-2 pl-12 focus:ring-2 focus:ring-primary w-64 text-label-md"
        placeholder="Search foods..."
        type="text"
      />
      <MaterialIcon
        name="search"
        className="absolute left-4 top-2 text-on-surface-variant"
      />
    </div>
  );
}
```

## Rekomendasi Data Engineer / App Logic

Search bisa dihubungkan ke:

```txt
GET /api/foods?query=...
```

Dengan debounce:

```js
useEffect(() => {
  const timer = setTimeout(() => {
    if (query.trim()) searchFoods(query);
  }, 300);

  return () => clearTimeout(timer);
}, [query]);
```

---

# 6.7 Dashboard Content Container

## Desain

```html
<div class="p-8 max-w-[1400px] mx-auto space-y-section-gap">
```

## Fungsi

- `p-8` memberi ruang besar pada content.
- `max-w-[1400px]` menjaga dashboard tidak terlalu melebar.
- `space-y-section-gap` memberi jarak antar section 32px.

## Implementasi

```jsx
<div className="p-4 md:p-8 max-w-[1400px] mx-auto space-y-section-gap">
  <HeroGrid />
  <MealTimeline />
  <BottomAnalyticsRow />
</div>
```

## Perbaikan Responsive

HTML asli menggunakan `p-8` langsung. Untuk mobile lebih baik:

```txt
p-4 md:p-8
```

---

# 6.8 Hero Grid: Daily Fuel + Macro Bento

## Layout

```html
<section class="grid grid-cols-12 gap-6">
  <div class="col-span-12 lg:col-span-5">Daily Fuel</div>
  <div class="col-span-12 lg:col-span-7 grid grid-cols-2 gap-6">Macro Cards</div>
</section>
```

## Behavior

| Breakpoint | Layout |
|---|---|
| Mobile | Semua `col-span-12`, stacking vertikal |
| Large | Daily Fuel 5/12, Macro grid 7/12 |
| Macro grid | 2 kolom |

## Rekomendasi Mobile

Macro grid pada layar kecil sebaiknya:

```html
<div className="col-span-12 lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
```

Agar tidak terlalu sempit di smartphone.

---

# 6.9 Daily Fuel / Calorie Ring Card

## Desain Asli

Card:

```html
<div class="col-span-12 lg:col-span-5 glass-card rounded-[2rem] p-8 relative flex flex-col items-center justify-center group transition-transform hover:scale-[1.01]">
```

Konten:

```txt
Daily Fuel
Energy balance overview
Badge: 72% Goal
Center metric: 1,640 Calories Left
Bottom stats:
- Consumed 1,260 kcal
- Target 2,900 kcal
```

## Masalah Penting

Di HTML asli, area ring:

```html
<div class="relative w-64 h-64 my-6 flex items-center justify-center">
  <div class="text-center z-10 pointer-events-none">
    ...
  </div>
</div>
```

Belum ada SVG/canvas/conic-gradient ring. Artinya secara visual card ini menyiapkan ruang untuk **3D Calorie Ring**, tetapi ring-nya belum digambar.

## Implementasi Ring yang Disarankan

Gunakan SVG circular progress agar ringan, responsif, dan PWA-friendly.

```jsx
function CalorieRing({ progress = 72, caloriesLeft = 1640 }) {
  const radius = 104;
  const stroke = 18;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative w-64 h-64 my-6 flex items-center justify-center">
      <svg
        width="256"
        height="256"
        viewBox="0 0 256 256"
        className="absolute inset-0 drop-shadow-sm -rotate-90"
      >
        <circle
          cx="128"
          cy="128"
          r={normalizedRadius}
          stroke="currentColor"
          strokeWidth={stroke}
          fill="transparent"
          className="text-surface-container"
        />
        <circle
          cx="128"
          cy="128"
          r={normalizedRadius}
          stroke="currentColor"
          strokeWidth={stroke}
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="text-primary transition-all duration-700 ease-out"
        />
      </svg>

      <div className="text-center z-10 pointer-events-none">
        <p className="font-metrics-mono text-headline-xl text-primary">
          {caloriesLeft.toLocaleString("en-US")}
        </p>
        <p className="font-label-md text-on-surface-variant uppercase tracking-tighter">
          Calories Left
        </p>
      </div>
    </div>
  );
}
```

## Full Component

```jsx
function DailyFuelCard() {
  return (
    <div className="col-span-12 lg:col-span-5 glass-card rounded-[2rem] p-8 relative flex flex-col items-center justify-center transition-transform hover:scale-[1.01]">
      <div className="w-full flex justify-between items-start mb-4">
        <div>
          <h3 className="font-headline-md text-headline-md text-on-surface">
            Daily Fuel
          </h3>
          <p className="text-label-md text-on-surface-variant">
            Energy balance overview
          </p>
        </div>

        <div className="bg-primary-container/20 text-on-primary-container px-3 py-1 rounded-full text-label-sm font-bold">
          72% Goal
        </div>
      </div>

      <CalorieRing progress={72} caloriesLeft={1640} />

      <div className="w-full grid grid-cols-2 gap-4 mt-4">
        <MetricTile label="Consumed" value="1,260 kcal" />
        <MetricTile label="Target" value="2,900 kcal" />
      </div>
    </div>
  );
}
```

## Review UI

Kuat:

- Hierarki informasi jelas.
- Metric besar menggunakan `JetBrains Mono`, bagus untuk angka.
- Badge `72% Goal` memberi konteks cepat.

Perlu diperbaiki:

- Tambahkan visual ring asli.
- Gunakan `aria-label` untuk ring agar screen reader mengerti progress.
- Gunakan data dinamis dari backend/user state.

---

# 6.10 Macro Bento Grid

## Data Macro

| Macro | Current | Target | Progress | Color | Icon |
|---|---:|---:|---:|---|---|
| Protein | 120g | 180g | 66% | `tertiary` | `egg` |
| Carbs | 210g | 300g | 70% | `secondary` | `bakery_dining` |
| Fats | 45g | 75g | 60% | `energy-orange` | `opacity` |
| Fiber | 22g | 35g | 62% | `primary` | `eco` |

## Pattern Card

```html
<div class="glass-card rounded-[1.5rem] p-6 flex flex-col justify-between hover:translate-y-[-4px] transition-transform">
```

## React Data

```js
const macroItems = [
  {
    name: "Protein",
    icon: "egg",
    current: 120,
    target: 180,
    unit: "g",
    progress: 66,
    colorClass: "bg-tertiary",
    textClass: "text-tertiary",
    iconBgClass: "bg-tertiary-container/20",
  },
  {
    name: "Carbs",
    icon: "bakery_dining",
    current: 210,
    target: 300,
    unit: "g",
    progress: 70,
    colorClass: "bg-secondary",
    textClass: "text-secondary",
    iconBgClass: "bg-secondary-container/10",
  },
  {
    name: "Fats",
    icon: "opacity",
    current: 45,
    target: 75,
    unit: "g",
    progress: 60,
    colorClass: "bg-energy-orange",
    textClass: "text-energy-orange",
    iconBgClass: "bg-energy-orange/10",
  },
  {
    name: "Fiber",
    icon: "eco",
    current: 22,
    target: 35,
    unit: "g",
    progress: 62,
    colorClass: "bg-primary",
    textClass: "text-primary",
    iconBgClass: "bg-primary/10",
  },
];
```

## Komponen

```jsx
function MacroCard({ item }) {
  return (
    <div className="glass-card rounded-[1.5rem] p-6 flex flex-col justify-between transition-transform hover:-translate-y-1">
      <div className="flex justify-between items-start">
        <div className={clsx("w-10 h-10 rounded-xl flex items-center justify-center", item.iconBgClass, item.textClass)}>
          <MaterialIcon name={item.icon} />
        </div>
        <span className="text-label-sm font-bold text-on-surface-variant">
          {item.current}{item.unit} / {item.target}{item.unit}
        </span>
      </div>

      <div className="mt-8">
        <h4 className="font-headline-md text-lg text-on-surface">
          {item.name}
        </h4>
        <div
          className="w-full h-3 bg-surface-container rounded-full mt-3 overflow-hidden"
          role="progressbar"
          aria-valuenow={item.progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${item.name} progress`}
        >
          <div
            className={clsx("h-full rounded-full transition-all duration-700", item.colorClass)}
            style={{ width: `${item.progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
```

## Review UI

Kuat:

- Bento grid cepat dibaca.
- Color coding per macro sangat bagus.
- Progress bar ringkas.

Perlu diperbaiki:

- Pada mobile kecil, 2 kolom bisa terlalu padat; gunakan `grid-cols-1 sm:grid-cols-2`.
- Progress value sebaiknya tidak inline hardcoded.
- Tambahkan tooltip atau detail macro saat klik.

---

# 6.11 Today's Schedule / Horizontal Meal Timeline

## Desain

```html
<section class="glass-card rounded-[2rem] p-8">
```

Header:

```txt
Today's Schedule
4 meals planned • 2 completed
Button: Log New Meal
```

Timeline:

- Horizontal scroll.
- Completed meal memakai `bg-mint-surface/50 border-primary/20`.
- Planned meal memakai `bg-surface-container border-outline-variant/30`.
- Completed icon `check_circle`.
- Planned icon `radio_button_unchecked`.

## Data Meal

| Time | Meal | Calories | Status | Visual |
|---|---|---:|---|---|
| 07:30 AM | Avocado Toast | 450 kcal | Completed | Image |
| 12:45 PM | Quinoa Power Bowl | 620 kcal | Completed | Image |
| 04:00 PM | Green Apple & Nuts | 190 kcal | Planned | Placeholder icon |
| 07:30 PM | Salmon & Asparagus | 540 kcal | Planned | Placeholder icon |

## React Data

```js
const meals = [
  {
    time: "07:30 AM",
    title: "Avocado Toast",
    meta: "450 kcal • High Fiber",
    completed: true,
    image: "/images/avocado-toast.jpg",
  },
  {
    time: "12:45 PM",
    title: "Quinoa Power Bowl",
    meta: "620 kcal • High Protein",
    completed: true,
    image: "/images/quinoa-bowl.jpg",
  },
  {
    time: "04:00 PM",
    title: "Green Apple & Nuts",
    meta: "190 kcal • Planned",
    completed: false,
    icon: "apps",
  },
  {
    time: "07:30 PM",
    title: "Salmon & Asparagus",
    meta: "540 kcal • Planned",
    completed: false,
    icon: "set_meal",
  },
];
```

## Komponen

```jsx
function MealTimeline() {
  const completedCount = meals.filter((meal) => meal.completed).length;

  return (
    <section className="glass-card rounded-[2rem] p-6 md:p-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
        <div>
          <h3 className="font-headline-md text-headline-md text-on-surface">
            Today's Schedule
          </h3>
          <p className="text-label-md text-on-surface-variant">
            {meals.length} meals planned • {completedCount} completed
          </p>
        </div>

        <button className="bg-primary text-on-primary px-6 py-2 rounded-xl text-label-md font-bold shadow-md hover:scale-105 transition-transform flex items-center justify-center gap-2">
          <MaterialIcon name="add" />
          Log New Meal
        </button>
      </div>

      <div className="relative overflow-x-auto pb-4">
        <div className="flex gap-6 min-w-max">
          {meals.map((meal) => (
            <MealCard key={`${meal.time}-${meal.title}`} meal={meal} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

## Meal Card

```jsx
function MealCard({ meal }) {
  return (
    <article
      className={clsx(
        "w-72 rounded-2xl p-4 flex flex-col gap-4 border relative",
        meal.completed
          ? "bg-mint-surface/50 border-primary/20"
          : "bg-surface-container border-outline-variant/30"
      )}
    >
      <div className="flex justify-between">
        <span
          className={clsx(
            "text-[10px] font-bold uppercase tracking-widest",
            meal.completed ? "text-primary" : "text-on-surface-variant"
          )}
        >
          {meal.time}
        </span>

        <MaterialIcon
          name={meal.completed ? "check_circle" : "radio_button_unchecked"}
          filled={meal.completed}
          className={meal.completed ? "text-primary" : "text-on-surface-variant/40"}
        />
      </div>

      <div className="flex gap-3">
        {meal.image ? (
          <img
            alt={meal.title}
            className="w-16 h-16 rounded-xl object-cover"
            src={meal.image}
            loading="lazy"
          />
        ) : (
          <div className="w-16 h-16 bg-surface-container-highest rounded-xl flex items-center justify-center">
            <MaterialIcon
              name={meal.icon}
              className="text-on-surface-variant/60"
            />
          </div>
        )}

        <div>
          <p className="font-bold text-on-surface">{meal.title}</p>
          <p className="text-label-sm text-on-surface-variant">{meal.meta}</p>
        </div>
      </div>
    </article>
  );
}
```

## Review UI

Kuat:

- Timeline horizontal cocok untuk jadwal harian.
- Completed vs planned state mudah dikenali.
- Card width `w-72` stabil untuk horizontal scroll.

Perlu diperbaiki:

- Tambahkan scrollbar styling atau gradient fade kanan/kiri.
- Tambahkan state `missed`, `upcoming`, `current`.
- Button `Log New Meal` sebaiknya membuka modal/form.
- Gunakan format jam lokal dari data.

---

# 6.12 Weight Trend Mini Chart

## Desain Asli

```html
<div class="h-48 w-full bg-surface-container/50 rounded-2xl relative overflow-hidden flex items-end px-4 gap-2">
  <div class="flex-1 bg-primary/20 rounded-t-lg h-[80%] hover:bg-primary transition-all cursor-pointer"></div>
  ...
</div>
```

## Data Visual

Bar chart mingguan:

| Day | Height |
|---|---:|
| Mon | 80% |
| Tue | 78% |
| Wed | 75% |
| Thu | 76% |
| Fri | 72% |
| Sat | 74% |
| Sun | 70% |

## Implementasi Sederhana

```jsx
const weightBars = [
  { day: "Mon", height: 80 },
  { day: "Tue", height: 78 },
  { day: "Wed", height: 75 },
  { day: "Thu", height: 76 },
  { day: "Fri", height: 72 },
  { day: "Sat", height: 74 },
  { day: "Sun", height: 70, active: true },
];
```

```jsx
function WeightTrendCard() {
  return (
    <div className="col-span-12 lg:col-span-8 glass-card rounded-[2rem] p-6 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-headline-md text-headline-md text-on-surface">
          Weight Trend
        </h3>

        <div className="flex gap-4">
          <MetricInline label="Current" value="74.2 kg" />
          <MetricInline label="Target" value="70.0 kg" valueClass="text-primary" />
        </div>
      </div>

      <div className="h-48 w-full bg-surface-container/50 rounded-2xl relative overflow-hidden flex items-end px-4 gap-2">
        {weightBars.map((bar) => (
          <div
            key={bar.day}
            title={`${bar.day}: ${bar.height}%`}
            className={clsx(
              "flex-1 rounded-t-lg transition-all cursor-pointer hover:bg-primary",
              bar.active ? "bg-primary/40" : "bg-primary/20"
            )}
            style={{ height: `${bar.height}%` }}
          />
        ))}
      </div>

      <div className="flex justify-between mt-4 px-2 text-label-sm text-on-surface-variant">
        {weightBars.map((bar) => (
          <span key={bar.day}>{bar.day}</span>
        ))}
      </div>
    </div>
  );
}
```

## Versi Lebih Bagus dengan Recharts

Untuk production dashboard, lebih baik gunakan `recharts`:

```bash
npm install recharts
```

```jsx
import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip } from "recharts";

const data = [
  { day: "Mon", weight: 75.6 },
  { day: "Tue", weight: 75.2 },
  { day: "Wed", weight: 74.9 },
  { day: "Thu", weight: 75.0 },
  { day: "Fri", weight: 74.6 },
  { day: "Sat", weight: 74.8 },
  { day: "Sun", weight: 74.2 },
];

function WeightTrendChart() {
  return (
    <div className="h-48 w-full bg-surface-container/50 rounded-2xl p-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="day" axisLine={false} tickLine={false} />
          <Tooltip />
          <Bar dataKey="weight" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
```

## Review UI

Kuat:

- Mudah dibaca.
- Hover bar memberi feedback.
- Cocok sebagai mini chart ringan.

Perlu diperbaiki:

- Bar height tidak merepresentasikan skala berat dengan jelas.
- Tambahkan tooltip dan axis jika data real.
- Jangan memakai chart statis untuk data kesehatan real.

---

# 6.13 Motivation / Daily Wisdom Card

## Desain

```html
<div class="col-span-12 lg:col-span-4 achievement-gradient rounded-[2rem] p-8 text-white flex flex-col justify-center relative overflow-hidden shadow-xl">
```

Gradient:

```css
.achievement-gradient {
  background: linear-gradient(135deg, #a855f7 0%, #f97316 100%);
}
```

Konten:

```txt
Icon: tips_and_updates
Quote: "Your food is your fuel..."
Label: Daily Wisdom
Background quote icon large opacity 20%
```

## Implementasi

```jsx
function MotivationCard() {
  return (
    <div className="col-span-12 lg:col-span-4 achievement-gradient rounded-[2rem] p-8 text-white flex flex-col justify-center relative overflow-hidden shadow-xl">
      <div className="absolute -top-10 -right-10 opacity-20">
        <MaterialIcon name="format_quote" className="text-[200px]" />
      </div>

      <div className="relative z-10">
        <MaterialIcon name="tips_and_updates" className="text-4xl mb-4" />
        <p className="font-headline-md text-headline-md leading-snug mb-6 italic">
          "Your food is your fuel. Choose the high-grade version for the best performance."
        </p>

        <div className="flex items-center gap-3">
          <div className="w-10 h-1 rounded-full bg-white/40" />
          <p className="text-label-md font-bold uppercase tracking-widest">
            Daily Wisdom
          </p>
        </div>
      </div>
    </div>
  );
}
```

## Review UI

Kuat:

- Card menjadi visual anchor.
- Gradient purple-orange memberi variasi emosional.
- Quote icon besar memperkaya depth.

Perlu diperbaiki:

- Quote bisa dipersonalisasi dari data harian user.
- Tambahkan `min-h` agar tinggi konsisten dengan Weight Trend card.
- Pastikan kontras teks putih tetap bagus pada gradient.

---

# 6.14 Floating Action Button

## Desain

```html
<button class="fixed bottom-8 right-8 w-14 h-14 bg-primary text-on-primary rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50">
```

## Fungsi

FAB dipakai sebagai shortcut aksi utama, kemungkinan `Log New Meal`.

## Implementasi

```jsx
function FloatingActionButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Add new meal"
      className="fixed bottom-8 right-8 w-14 h-14 bg-primary text-on-primary rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50"
    >
      <MaterialIcon name="add" className="text-3xl" />
    </button>
  );
}
```

## Rekomendasi Mobile

Untuk PWA mobile:

```txt
bottom: calc(env(safe-area-inset-bottom) + 24px)
```

CSS:

```css
.fab-safe {
  bottom: calc(env(safe-area-inset-bottom) + 2rem);
}
```

---

## 7. Motion & Animation System

### 7.1 Existing Motion

| Motion | Trigger | Nilai |
|---|---|---|
| Glass card hover | mouseenter | translateY(-4px) |
| Glass card leave | mouseleave | translateY(0) |
| Sidebar collapse | click | width 256px → 72px |
| Sidebar hide | click | translateX(-110%) |
| Mobile drawer | class `.mobile-open` | translateX(0) |
| Button hover | hover | scale 1.05 / 1.10 |
| Button active | active | scale 0.95 |
| Float animation | infinite | translateY 0 → -10px → 0 |

### 7.2 React/Tailwind Motion Replacement

Gunakan class:

```txt
transition-transform duration-200 hover:-translate-y-1
transition-all duration-200
hover:scale-105 active:scale-95
```

### 7.3 Framer Motion Opsional

Kalau ingin UI lebih premium:

```bash
npm install framer-motion
```

Card entrance:

```jsx
import { motion } from "framer-motion";

function AnimatedCard({ children, className }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

Stagger grid:

```jsx
const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};
```

### 7.4 Motion Guidelines

| Elemen | Durasi | Easing |
|---|---:|---|
| Sidebar width | 220ms | ease |
| Card hover | 180–220ms | ease-out |
| Button scale | 150ms | ease-out |
| Progress bar fill | 600–800ms | ease-out |
| Drawer backdrop | 180ms | ease |
| Page enter | 300–400ms | ease-out |

### 7.5 Reduced Motion

Tambahkan support accessibility:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 8. Struktur Folder React PWA

Rekomendasi struktur:

```txt
src/
├── app/
│   ├── App.jsx
│   └── routes.jsx
│
├── assets/
│   └── images/
│       ├── avatar.jpg
│       ├── avocado-toast.jpg
│       └── quinoa-bowl.jpg
│
├── components/
│   ├── icons/
│   │   └── MaterialIcon.jsx
│   │
│   ├── app-shell/
│   │   ├── AppShell.jsx
│   │   ├── Sidebar.jsx
│   │   ├── SidebarItem.jsx
│   │   ├── SidebarFooter.jsx
│   │   ├── UpgradeCard.jsx
│   │   ├── TopAppBar.jsx
│   │   └── FloatingActionButton.jsx
│   │
│   └── dashboard/
│       ├── DashboardPage.jsx
│       ├── HeroGrid.jsx
│       ├── DailyFuelCard.jsx
│       ├── CalorieRing.jsx
│       ├── MetricTile.jsx
│       ├── MacroGrid.jsx
│       ├── MacroCard.jsx
│       ├── MealTimeline.jsx
│       ├── MealCard.jsx
│       ├── BottomAnalyticsRow.jsx
│       ├── WeightTrendCard.jsx
│       └── MotivationCard.jsx
│
├── data/
│   └── dashboard.mock.js
│
├── hooks/
│   ├── useSidebar.js
│   └── useCurrentDate.js
│
├── styles/
│   ├── index.css
│   └── dashboard.css
│
├── main.jsx
└── vite-env.d.ts
```

---

## 9. Komponen App Shell

### 9.1 AppShell.jsx

```jsx
import { useState } from "react";
import clsx from "clsx";
import Sidebar from "./Sidebar";
import TopAppBar from "./TopAppBar";
import FloatingActionButton from "./FloatingActionButton";

export default function AppShell({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-on-surface font-body-md overflow-x-hidden">
      <div
        className={clsx(
          "mobile-drawer-backdrop",
          mobileOpen && "active"
        )}
        onClick={() => setMobileOpen(false)}
      />

      <Sidebar
        collapsed={collapsed}
        hidden={hidden}
        mobileOpen={mobileOpen}
        onToggleCollapse={() => setCollapsed((value) => !value)}
        onHide={() => setHidden(true)}
      />

      <main
        className={clsx(
          "flex-1 p-gutter-desktop max-w-[1200px] mx-auto w-full transition-all duration-200",
          !hidden && !collapsed && "xl:ml-64 xl:w-[calc(100%-16rem)]",
          !hidden && collapsed && "xl:ml-[72px] xl:w-[calc(100%-72px)]",
          hidden && "xl:ml-0 xl:w-full"
        )}
      >
        <TopAppBar onOpenMobileSidebar={() => setMobileOpen(true)} />

        {hidden && (
          <button
            type="button"
            onClick={() => setHidden(false)}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary text-on-primary px-4 py-2 font-label-md text-label-md shadow-md"
          >
            Show Sidebar
          </button>
        )}

        {children}
      </main>

      <FloatingActionButton onClick={() => console.log("Open log meal modal")} />
    </div>
  );
}
```

---

## 10. DashboardPage.jsx

```jsx
import HeroGrid from "./HeroGrid";
import MealTimeline from "./MealTimeline";
import BottomAnalyticsRow from "./BottomAnalyticsRow";

export default function DashboardPage() {
  return (
    <div className="p-4 md:p-8 max-w-[1400px] mx-auto space-y-section-gap">
      <HeroGrid />
      <MealTimeline />
      <BottomAnalyticsRow />
    </div>
  );
}
```

---

## 11. HeroGrid.jsx

```jsx
import DailyFuelCard from "./DailyFuelCard";
import MacroGrid from "./MacroGrid";

export default function HeroGrid() {
  return (
    <section className="grid grid-cols-12 gap-6">
      <DailyFuelCard />
      <MacroGrid />
    </section>
  );
}
```

---

## 12. MacroGrid.jsx

```jsx
import MacroCard from "./MacroCard";
import { macroItems } from "../../data/dashboard.mock";

export default function MacroGrid() {
  return (
    <div className="col-span-12 lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
      {macroItems.map((item) => (
        <MacroCard key={item.name} item={item} />
      ))}
    </div>
  );
}
```

---

## 13. BottomAnalyticsRow.jsx

```jsx
import WeightTrendCard from "./WeightTrendCard";
import MotivationCard from "./MotivationCard";

export default function BottomAnalyticsRow() {
  return (
    <section className="grid grid-cols-12 gap-6">
      <WeightTrendCard />
      <MotivationCard />
    </section>
  );
}
```

---

## 14. MaterialIcon.jsx

Jika tetap memakai Google Material Symbols:

```jsx
export default function MaterialIcon({
  name,
  filled = false,
  className = "",
}) {
  return (
    <span
      className={`material-symbols-outlined ${className}`}
      style={{
        fontVariationSettings: `'FILL' ${filled ? 1 : 0}, 'wght' 400, 'GRAD' 0, 'opsz' 24`,
      }}
      aria-hidden="true"
    >
      {name}
    </span>
  );
}
```

Import font di `index.html`:

```html
<link
  href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
  rel="stylesheet"
/>
```

Alternatif lebih ringan: pakai `lucide-react`, tetapi icon style-nya akan berbeda dari HTML asli.

---

## 15. Data Mock Dashboard

`src/data/dashboard.mock.js`

```js
export const macroItems = [
  {
    name: "Protein",
    icon: "egg",
    current: 120,
    target: 180,
    unit: "g",
    progress: 66,
    colorClass: "bg-tertiary",
    textClass: "text-tertiary",
    iconBgClass: "bg-tertiary-container/20",
  },
  {
    name: "Carbs",
    icon: "bakery_dining",
    current: 210,
    target: 300,
    unit: "g",
    progress: 70,
    colorClass: "bg-secondary",
    textClass: "text-secondary",
    iconBgClass: "bg-secondary-container/10",
  },
  {
    name: "Fats",
    icon: "opacity",
    current: 45,
    target: 75,
    unit: "g",
    progress: 60,
    colorClass: "bg-energy-orange",
    textClass: "text-energy-orange",
    iconBgClass: "bg-energy-orange/10",
  },
  {
    name: "Fiber",
    icon: "eco",
    current: 22,
    target: 35,
    unit: "g",
    progress: 62,
    colorClass: "bg-primary",
    textClass: "text-primary",
    iconBgClass: "bg-primary/10",
  },
];

export const meals = [
  {
    time: "07:30 AM",
    title: "Avocado Toast",
    meta: "450 kcal • High Fiber",
    completed: true,
    image: "/images/avocado-toast.jpg",
  },
  {
    time: "12:45 PM",
    title: "Quinoa Power Bowl",
    meta: "620 kcal • High Protein",
    completed: true,
    image: "/images/quinoa-bowl.jpg",
  },
  {
    time: "04:00 PM",
    title: "Green Apple & Nuts",
    meta: "190 kcal • Planned",
    completed: false,
    icon: "apps",
  },
  {
    time: "07:30 PM",
    title: "Salmon & Asparagus",
    meta: "540 kcal • Planned",
    completed: false,
    icon: "set_meal",
  },
];

export const weightBars = [
  { day: "Mon", height: 80 },
  { day: "Tue", height: 78 },
  { day: "Wed", height: 75 },
  { day: "Thu", height: 76 },
  { day: "Fri", height: 72 },
  { day: "Sat", height: 74 },
  { day: "Sun", height: 70, active: true },
];
```

---

## 16. Setup Tailwind CSS v3

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

`tailwind.config.js`:

```js
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#006e2f",
        "primary-container": "#22c55e",
        "on-primary": "#ffffff",
        "on-primary-container": "#004b1e",
        secondary: "#0058be",
        "secondary-container": "#2170e4",
        tertiary: "#9e4036",
        "tertiary-container": "#ff8b7c",
        "energy-orange": "#f97316",
        "achievement-purple": "#a855f7",
        "warning-yellow": "#eab308",
        background: "#f8f9ff",
        surface: "#f8f9ff",
        "surface-container": "#e5eeff",
        "surface-container-low": "#eff4ff",
        "surface-container-high": "#dce9ff",
        "surface-container-highest": "#d3e4fe",
        "surface-variant": "#d3e4fe",
        "outline-variant": "#bccbb9",
        outline: "#6d7b6c",
        "on-surface": "#0b1c30",
        "on-surface-variant": "#3d4a3d",
        "mint-surface": "#f0fdf4",
        "error-red": "#ef4444",
      },
      spacing: {
        "gutter-mobile": "16px",
        "card-padding": "20px",
        "gutter-desktop": "24px",
        "unit": "4px",
        "section-gap": "32px",
        "margin-page": "24px",
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
        "headline-lg": ["Poppins"],
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
        "headline-lg": ["32px", { lineHeight: "1.25", fontWeight: "600" }],
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/container-queries"),
  ],
};
```

Install plugin:

```bash
npm install -D @tailwindcss/forms @tailwindcss/container-queries
```

---

## 17. PWA Implementation Notes

Install:

```bash
npm install -D vite-plugin-pwa
```

`vite.config.js`:

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        "favicon.ico",
        "apple-touch-icon.png",
        "mask-icon.svg",
      ],
      manifest: {
        name: "NutriTrack Dashboard",
        short_name: "NutriTrack",
        description: "Nutrition tracking dashboard PWA",
        theme_color: "#006e2f",
        background_color: "#f8f9ff",
        display: "standalone",
        orientation: "portrait",
        icons: [
          {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "gstatic-fonts-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
            },
          },
        ],
      },
    }),
  ],
});
```

---

## 18. Accessibility Checklist

| Area | Status Asli | Perbaikan |
|---|---|---|
| Sidebar | Ada `role="navigation"` dan `aria-label` | Pertahankan |
| Active nav | Ada `aria-current="page"` | Pertahankan |
| Collapse button | Ada `aria-expanded` dan `aria-controls` | Gunakan state React |
| Hide button | Ada `aria-label` | Tambahkan visible restore button |
| Icon buttons | Ada label pada notifications/settings | Pertahankan |
| FAB | Belum ada `aria-label` | Tambahkan `aria-label="Add new meal"` |
| Progress bar | Belum ada semantic progressbar | Tambahkan role dan aria value |
| Meal cards | Belum semantic article/list | Gunakan `section`, `article`, atau `ul/li` |
| Chart bars | Belum ada label | Tambahkan title/aria-label/tooltip |
| Reduced motion | Belum ada | Tambahkan CSS `prefers-reduced-motion` |

---

## 19. Responsive Checklist

| Breakpoint | Dashboard Behavior |
|---|---|
| `<640px` | Content padding `p-4`, macro grid 1 kolom, meal timeline horizontal scroll |
| `640px–1024px` | Macro grid 2 kolom, sidebar drawer, search bisa disembunyikan |
| `1024px–1279px` | Dashboard grid large bisa aktif, sidebar masih drawer jika mengikuti CSS asli |
| `>=1280px` | Sidebar fixed desktop, main content punya margin-left |
| `>=1400px` | Content capped max width 1400px |

### Perbaikan Mobile Wajib

Tambahkan tombol hamburger di top bar:

```jsx
<button
  type="button"
  onClick={onOpenMobileSidebar}
  className="xl:hidden w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface-variant text-on-surface-variant"
  aria-label="Open navigation menu"
>
  <MaterialIcon name="menu" />
</button>
```

---

## 20. Performance Notes

### Masalah Potensial

1. **Google-hosted images panjang**  
   URL image asli sangat panjang dan remote. Untuk project lokal, lebih baik simpan asset ke `/public/images` atau `src/assets`.

2. **Material Symbols font**  
   Icon font bisa menambah request. Jika ingin lebih ringan gunakan `lucide-react`.

3. **Manual DOM listener**  
   HTML asli memakai `document.querySelectorAll(".glass-card")`. Di React harus diganti class Tailwind.

4. **Hardcoded chart**  
   Bar chart statis bagus untuk prototype, tetapi production perlu data real dan tooltip.

5. **Calorie Ring belum tergambar**  
   Ruang visual sudah ada, tetapi elemen SVG ring belum ada. Implementasikan custom SVG ring.

### Optimasi Yang Disarankan

| Optimasi | Efek |
|---|---|
| Convert image remote ke local assets | Lebih cepat, bisa precache PWA |
| Lazy load meal image | Mengurangi initial load |
| SVG Calorie Ring | Ringan, tajam, tidak perlu library |
| Recharts lazy import | Bundle awal lebih kecil |
| `prefers-reduced-motion` | Aksesibilitas lebih baik |
| Replace DOM listener dengan Tailwind hover | Lebih stabil di React |
| Component memo untuk cards | Mengurangi rerender jika data besar |

---

## 21. Review Perbaikan UI/UX Prioritas

### Prioritas Tinggi

1. **Tambahkan visual Calorie Ring**
   - Saat ini center metric terlihat kosong karena ring belum digambar.
   - Implementasi SVG circular progress memberi visual dashboard lebih kuat.

2. **Tambahkan mobile hamburger**
   - CSS drawer sudah tersedia, tapi trigger tidak ada.
   - Tanpa trigger, user mobile tidak bisa akses navigasi.

3. **Ganti manual JavaScript DOM interaction ke React state**
   - Collapse/hide sidebar harus memakai `useState`.
   - Hover card cukup Tailwind class.

4. **Responsive macro grid**
   - Gunakan `grid-cols-1 sm:grid-cols-2`, bukan langsung `grid-cols-2`.

5. **Asset management**
   - Pindahkan avatar/meal images ke local assets atau CDN yang stabil.
   - Tambahkan `loading="lazy"`.

### Prioritas Sedang

1. **Tambah empty/loading state**
   - Untuk meal timeline, chart, dan macro data.

2. **Tambah modal Log New Meal**
   - Button dan FAB harus punya action konsisten.

3. **Tambah real chart**
   - Recharts untuk trend weight.
   - Tooltip untuk nilai harian.

4. **Tambah dark mode**
   - Config sudah `darkMode: "class"`, tetapi token dark belum lengkap.

### Prioritas Rendah

1. **Animasi entrance page**
   - Bisa pakai Framer Motion.
2. **Achievement gamification**
   - Quote card bisa berubah berdasarkan progress.
3. **Micro illustration**
   - Premium card bisa diberi SVG ilustrasi custom.

---

## 22. Mapping HTML ke Komponen React

| HTML Section | React Component |
|---|---|
| `aside#sidebar` | `Sidebar.jsx` |
| Brand block | `SidebarBrand.jsx` |
| Nav links | `SidebarItem.jsx` |
| Upgrade card | `UpgradeCard.jsx` |
| Header top app bar | `TopAppBar.jsx` |
| Search input | `SearchInput.jsx` |
| Profile shortcut | `ProfileShortcut.jsx` |
| Daily Fuel card | `DailyFuelCard.jsx` |
| Ring area | `CalorieRing.jsx` |
| Consumed/Target tile | `MetricTile.jsx` |
| Macro bento grid | `MacroGrid.jsx` |
| Individual macro card | `MacroCard.jsx` |
| Today's Schedule | `MealTimeline.jsx` |
| Meal card | `MealCard.jsx` |
| Weight Trend | `WeightTrendCard.jsx` |
| Motivation Card | `MotivationCard.jsx` |
| FAB | `FloatingActionButton.jsx` |

---

## 23. Suggested Backend Data Contract

Agar dashboard siap dinamis:

```json
{
  "user": {
    "name": "Alex Carter",
    "membership": "Pro Member",
    "avatarUrl": "/images/avatar.jpg"
  },
  "dailyFuel": {
    "goalPercent": 72,
    "caloriesLeft": 1640,
    "consumedKcal": 1260,
    "targetKcal": 2900
  },
  "macros": [
    {
      "name": "Protein",
      "current": 120,
      "target": 180,
      "unit": "g",
      "progress": 66
    }
  ],
  "meals": [
    {
      "time": "07:30",
      "title": "Avocado Toast",
      "calories": 450,
      "tag": "High Fiber",
      "status": "completed",
      "imageUrl": "/images/avocado-toast.jpg"
    }
  ],
  "weightTrend": {
    "currentKg": 74.2,
    "targetKg": 70.0,
    "items": [
      {
        "day": "Mon",
        "weightKg": 75.6
      }
    ]
  },
  "dailyWisdom": {
    "quote": "Your food is your fuel. Choose the high-grade version for the best performance.",
    "label": "Daily Wisdom"
  }
}
```

---

## 24. Implementation Roadmap

### Phase 1 — Setup UI Foundation

- Install Vite React.
- Install Tailwind CSS v3.
- Masukkan color, spacing, font token.
- Tambahkan Google Fonts dan Material Symbols.
- Buat global `.glass-card`, `.achievement-gradient`, dan reduced motion.

### Phase 2 — Build App Shell

- Buat `AppShell`.
- Buat sidebar desktop.
- Implement collapse state.
- Implement hide sidebar state.
- Implement mobile drawer + backdrop.
- Buat top app bar.

### Phase 3 — Build Dashboard Cards

- Daily Fuel + SVG Calorie Ring.
- Macro cards dari data array.
- Meal timeline horizontal.
- Weight mini chart.
- Motivation gradient card.
- Floating action button.

### Phase 4 — Data & Interaction

- Hubungkan search input ke local state.
- Buat modal `Log New Meal`.
- Hubungkan FAB dan button `Log New Meal`.
- Siapkan API adapter.

### Phase 5 — PWA & Polish

- Setup `vite-plugin-pwa`.
- Precache assets.
- Optimasi image.
- Tambahkan skeleton loading.
- Tambahkan aria labels.
- Uji responsive dan Lighthouse.

---

## 25. Kesimpulan Desain

Dashboard ini sudah memiliki pondasi visual yang kuat untuk aplikasi nutrisi modern:

- Sistem warna konsisten.
- Layout dashboard jelas.
- Sidebar shell sudah siap untuk aplikasi multi-page.
- Card system sudah reusable.
- Micro-interaction cukup halus.
- Cocok dikonversi ke React PWA.

Namun untuk implementasi lokal yang lebih optimal, ada beberapa hal penting:

1. **Calorie ring harus dibuat benar-benar terlihat**, karena HTML asli hanya menyediakan ruangnya.
2. **Mobile sidebar perlu tombol pembuka**.
3. **Interaksi DOM harus dikonversi ke React state dan class Tailwind**.
4. **Data hardcoded perlu dipisah menjadi mock data / API contract**.
5. **Asset remote perlu dirapikan agar PWA stabil dan cepat**.

Dengan struktur komponen dan token di dokumen ini, tampilan `dashboard.html` bisa dikonversi ke project lokal React PWA secara konsisten, maintainable, dan siap dikembangkan menjadi dashboard production.
