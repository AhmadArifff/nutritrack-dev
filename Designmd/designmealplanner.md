# designmealplanner.md — Analisis UI & Panduan Implementasi React PWA + Tailwind CSS

Dokumen ini adalah spesifikasi desain teknis untuk mengonversi halaman `mealplanner.html` menjadi halaman **Weekly Meal Planner** pada project lokal berbasis **React PWA + Tailwind CSS**.

Fokus halaman ini adalah **perencanaan makanan mingguan**, **ringkasan target nutrisi**, **grid horizontal 7 hari**, **smart shopping list**, **insight AI**, **pantry inventory sync**, serta shell dashboard yang konsisten dengan halaman NutriTrack lainnya.

---

## 1. Ringkasan Karakter Visual

Halaman `mealplanner.html` menggunakan karakter UI:

- **Clean health dashboard**
- **Glassmorphism ringan**
- **Rounded bento layout**
- **Horizontal planning board**
- **Green-first nutrition identity**
- **Smart assistant / AI planning feel**
- **Premium PWA app shell**

Secara visual, halaman ini lebih fokus pada **planning workflow** dibanding dashboard analitik. Layout utamanya adalah **kanban horizontal per hari**, lalu diperkuat dengan panel belanja dan insight rekomendasi.

---

## 2. Struktur Halaman Utama

Hierarki halaman:

```txt
<body>
└── AppShell
    ├── Sidebar Navigation
    │   ├── Logo NutriTrack
    │   ├── Primary Menu
    │   ├── Upgrade Premium Card
    │   ├── Help Center
    │   └── Logout
    │
    ├── Main Content
    │   ├── Top App Bar
    │   │   ├── Page Title: Meal Architecture
    │   │   ├── Search Recipe / Ingredients
    │   │   ├── Notification Button
    │   │   ├── Settings Button
    │   │   └── User Profile
    │   │
    │   ├── Page Content
    │   │   ├── Weekly Summary Header
    │   │   ├── Weekly Metric Cards
    │   │   ├── Horizontal 7-Day Meal Planner Grid
    │   │   ├── Smart Shopping List
    │   │   ├── Insights Panel
    │   │   ├── Smart Assistant Quote Card
    │   │   └── Pantry Inventory Sync Banner
    │   │
    │   └── Floating Action Button
```

---

## 3. Design Token Warna

Warna halaman ini konsisten dengan identitas NutriTrack. Gunakan token warna di `tailwind.config.js`, jangan hardcode di komponen React.

### 3.1 Primary Palette

| Token | Hex | Fungsi |
|---|---:|---|
| `primary` | `#006e2f` | Brand utama, CTA, active state, progress |
| `primary-container` | `#22c55e` | Active menu, badge, soft CTA |
| `on-primary` | `#ffffff` | Teks di atas primary |
| `on-primary-container` | `#004b1e` | Teks di atas primary-container |
| `primary-fixed` | `#6bff8f` | Accent hijau terang |
| `primary-fixed-dim` | `#4ae176` | Accent footer/dark |
| `mint-surface` | `#f0fdf4` | Background hijau muda untuk section aktif |

### 3.2 Secondary Palette

| Token | Hex | Fungsi |
|---|---:|---|
| `secondary` | `#0058be` | CTA sekunder, shopping action |
| `secondary-container` | `#2170e4` | Gradient upgrade card |
| `secondary-fixed` | `#d8e2ff` | Background soft blue |
| `secondary-fixed-dim` | `#adc6ff` | Blue dim accent |
| `on-secondary-container` | `#fefcff` | Teks di secondary-container |
| `on-secondary-fixed` | `#001a42` | Teks blue container |

### 3.3 Accent / Semantic Palette

| Token | Hex | Fungsi |
|---|---:|---|
| `energy-orange` | `#f97316` | Kalori, warning energi, gradient assistant |
| `achievement-purple` | `#a855f7` | Achievement, assistant quote gradient |
| `warning-yellow` | `#eab308` | Alert / warning visual |
| `tertiary` | `#9e4036` | Protein & dairy category |
| `tertiary-container` | `#ff8b7c` | Soft tertiary container |
| `error-red` | `#ef4444` | Logout danger / error |
| `error` | `#ba1a1a` | Error formal |
| `error-container` | `#ffdad6` | Soft error background |

### 3.4 Surface Palette

| Token | Hex | Fungsi |
|---|---:|---|
| `background` | `#f8f9ff` | Body background |
| `surface` | `#f8f9ff` | Top app bar |
| `surface-container-lowest` | `#ffffff` | White card / slot |
| `surface-container-low` | `#eff4ff` | Sidebar background, empty day header |
| `surface-container` | `#e5eeff` | Input, empty slot, progress bg |
| `surface-container-high` | `#dce9ff` | Empty icon box |
| `surface-container-highest` | `#d3e4fe` | Metric pill empty state |
| `surface-variant` | `#d3e4fe` | Hover nav |
| `surface-dim` | `#cbdbf5` | Disabled surface |
| `surface-bright` | `#f8f9ff` | Bright surface |
| `card-light` | `#ffffff` | Main card base |
| `card-dark` | `#1e293b` | Dark mode card reserve |
| `bg-light` | `#f8fafc` | Global fallback |
| `bg-dark` | `#0f172a` | Dark background reserve |

### 3.5 Text & Outline

| Token | Hex | Fungsi |
|---|---:|---|
| `on-background` | `#0b1c30` | Text di body |
| `on-surface` | `#0b1c30` | Text utama |
| `on-surface-variant` | `#3d4a3d` | Text sekunder |
| `outline` | `#6d7b6c` | Border kuat |
| `outline-variant` | `#bccbb9` | Border halus |
| `inverse-surface` | `#213145` | Tooltip / inverse card |
| `inverse-on-surface` | `#eaf1ff` | Text di inverse |
| `inverse-primary` | `#4ae176` | Primary pada dark inverse |

---

## 4. Typography System

File HTML memakai kombinasi font:

- **Poppins** untuk heading.
- **Nunito** untuk body copy.
- **Inter** untuk label.
- **JetBrains Mono** untuk angka metrik.

### 4.1 Font Family Tailwind

```js
fontFamily: {
  "headline-md": ["Poppins"],
  "headline-lg": ["Poppins"],
  "headline-xl": ["Poppins"],
  "headline-lg-mobile": ["Poppins"],
  "body-md": ["Nunito"],
  "body-lg": ["Nunito"],
  "label-sm": ["Inter"],
  "label-md": ["Inter"],
  "metrics-mono": ["JetBrains Mono"],
}
```

### 4.2 Penggunaan Typography

| Area | Font | Style |
|---|---|---|
| Logo `NutriTrack` | Poppins | `font-black`, green |
| Sidebar label | Inter | 14px, medium |
| Top app title | Poppins | 24px, bold |
| Weekly Summary title | Poppins | 32px |
| Body explanation | Nunito | 18px |
| Metric number | JetBrains Mono | 24px |
| Day name | Inter | 12px uppercase, tracking wide |
| Date | Poppins | 24px |
| Meal title | Nunito / default bold | 16px bold |
| Shopping item | Nunito | 16px |
| Insight title | Nunito bold | 16px bold |

---

## 5. Spacing, Radius, dan Sizing

### 5.1 Spacing Token

```js
spacing: {
  "unit": "4px",
  "section-gap": "32px",
  "gutter-mobile": "16px",
  "gutter-desktop": "24px",
  "margin-page": "24px",
  "card-padding": "20px",
}
```

### 5.2 Pola Spacing

| Elemen | Class Asli | Rekomendasi React |
|---|---|---|
| Main canvas | `p-gutter-desktop` | `p-4 md:p-6` |
| Page content | `p-8 space-y-section-gap` | `p-4 md:p-8 space-y-8` |
| Horizontal day gap | `gap-6` | `gap-6` |
| Bento analytics | `gap-8` | `gap-6 lg:gap-8` |
| Card content | `p-6`, `p-8` | konsisten 24px/32px |

### 5.3 Radius System

| Elemen | Radius |
|---|---|
| Sidebar icon | `rounded-xl` |
| Nav item | `rounded-xl` |
| Top search input | `rounded-full` |
| Glass card | `rounded-[2rem]`, `rounded-[2.5rem]` |
| Pantry banner | `rounded-[3rem]` |
| Meal slot | `rounded-2xl` |
| FAB | `rounded-full` |
| KPI card | `rounded-2xl` |

**Catatan implementasi:** gunakan radius besar untuk menciptakan nuansa **soft health-tech**, tetapi jangan berlebihan pada elemen kecil seperti checkbox dan icon box.

---

## 6. App Shell Layout

### 6.1 Sidebar

Sidebar bersifat:

- Fixed di kiri.
- Lebar normal `w-64`.
- Bisa collapse menjadi `72px`.
- Bisa hidden penuh.
- Mobile drawer sudah disiapkan pada CSS/JS, tetapi HTML belum menyediakan tombol mobile dan backdrop yang benar-benar tampil.

#### Struktur Sidebar

```txt
Sidebar
├── Brand block
│   ├── Icon nutrition
│   ├── Logo text
│   └── Collapse button
├── Primary nav
│   ├── Dashboard
│   ├── Log Food
│   ├── Meal Planner active
│   ├── Progress
│   ├── Nutrition
│   ├── Foods
│   ├── Community
│   └── Profile
├── Upgrade Premium Card
├── Help Center
└── Logout
```

### 6.2 Active State Sidebar

Active item pada Meal Planner:

```html
bg-primary-container text-on-primary-container rounded-xl font-bold shadow-sm
```

Icon aktif memakai Material Symbols dengan fill:

```html
style="font-variation-settings: 'FILL' 1;"
```

### 6.3 Sidebar Behavior React

Gunakan state:

```tsx
const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
const [sidebarHidden, setSidebarHidden] = useState(false);
const [mobileOpen, setMobileOpen] = useState(false);
```

Mapping class:

```tsx
<aside
  className={cn(
    "h-screen fixed left-0 top-0 z-50 bg-surface-container-low border-r border-outline-variant/20 shadow-md flex flex-col py-margin-page px-4 transition-all duration-200",
    sidebarCollapsed ? "w-[72px]" : "w-64",
    sidebarHidden && "-translate-x-[110%] !w-0",
    mobileOpen ? "translate-x-0" : "-translate-x-[110%] xl:translate-x-0"
  )}
>
```

### 6.4 Issue yang Harus Diperbaiki

Pada HTML, script sudah mencari:

```js
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const drawerBackdrop = document.getElementById('drawerBackdrop');
```

Namun elemen tersebut tidak tersedia di markup. Untuk React PWA, tambahkan:

```tsx
<button id="mobileMenuBtn" className="xl:hidden ...">
  <span className="material-symbols-outlined">menu</span>
</button>

<div
  id="drawerBackdrop"
  className={cn(
    "fixed inset-0 bg-slate-950/50 z-40 xl:hidden",
    mobileOpen ? "block" : "hidden"
  )}
/>
```

---

## 7. Top App Bar

Top app bar menggunakan:

- Sticky header.
- Glass background.
- Title `Meal Architecture`.
- Subtitle `Weekly Plan`.
- Search input.
- Notification button.
- Settings button.
- Profile avatar.

### 7.1 Struktur

```txt
TopAppBar
├── Title group
│   ├── Meal Architecture
│   └── Weekly Plan
├── Search recipe / ingredients input
├── Icon actions
│   ├── notifications
│   └── settings
└── User profile
```

### 7.2 Styling

```html
sticky top-0 z-40 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/30 px-gutter-desktop h-16 flex items-center justify-between
```

### 7.3 Search Input

```html
bg-surface-container border-none rounded-full px-5 py-2 pl-12 focus:ring-2 focus:ring-primary w-64 text-label-md
```

### 7.4 Rekomendasi React

Buat komponen reusable:

```tsx
type TopAppBarProps = {
  title: string;
  subtitle: string;
  searchPlaceholder?: string;
};
```

Contoh:

```tsx
<TopAppBar
  title="Meal Architecture"
  subtitle="Weekly Plan"
  searchPlaceholder="Search recipes or ingredients..."
/>
```

---

## 8. Weekly Summary Header

Bagian ini berada setelah top app bar.

### 8.1 Struktur Visual

```txt
WeeklySummary
├── Text block
│   ├── Weekly Summary
│   └── Precision nutrition tailored...
└── Metric cards
    ├── Target kcal: 2,450
    └── Protein Goal: 185g
```

### 8.2 Styling Text Block

Judul:

```html
font-headline-lg text-headline-lg text-on-surface mb-2
```

Deskripsi:

```html
font-body-lg text-body-lg text-on-surface-variant
```

### 8.3 Metric Card

```html
glass-card px-6 py-4 rounded-2xl flex flex-col items-center min-w-[120px]
```

Metrik memakai `metrics-mono` agar angka terlihat seperti data dashboard.

### 8.4 Implementasi Data

```ts
const weeklySummary = {
  targetKcal: 2450,
  proteinGoal: 185,
  description:
    "Precision nutrition tailored for your vitality. Manage your week's macros and energy levels with AI-assisted planning.",
};
```

---

## 9. 7-Day Horizontal Meal Planner Grid

Bagian inti halaman adalah horizontal rail berisi kartu hari.

### 9.1 Struktur

```txt
WeekPlannerRail
├── DayCard Monday
│   ├── Day header
│   ├── Total kcal badge
│   └── Meal slots
│       ├── Breakfast
│       ├── Lunch
│       ├── Dinner
│       └── Add snack empty slot
├── DayCard Tuesday Empty
├── DayCard Wednesday
└── DayCard Thursday Empty
```

Pada HTML baru terlihat 4 hari, tetapi konsepnya harus dikembangkan menjadi 7 hari penuh.

### 9.2 Container Rail

```html
flex gap-6 overflow-x-auto pb-6 custom-scrollbar snap-x
```

Rancang sebagai horizontal scrolling board:

```tsx
<section className="flex gap-6 overflow-x-auto pb-6 custom-scrollbar snap-x">
  {weekDays.map((day) => (
    <DayPlannerCard key={day.date} day={day} />
  ))}
</section>
```

### 9.3 Day Card

Ukuran:

```html
flex-shrink-0 w-[320px] snap-start
```

Card:

```html
glass-card rounded-[2rem] overflow-hidden flex flex-col h-full border border-outline-variant/30 transition-transform hover:scale-[1.01]
```

### 9.4 Day Header Aktif

Untuk hari yang sudah memiliki plan:

```html
bg-mint-surface/50 p-6 flex justify-between items-center border-b border-primary/10
```

Label day:

```html
font-label-sm text-label-sm text-primary font-bold uppercase tracking-widest
```

Badge kcal:

```html
bg-primary text-on-primary rounded-full px-3 py-1 font-metrics-mono text-xs font-bold
```

### 9.5 Empty Day Header

Untuk hari kosong:

```html
bg-surface-container-low p-6 flex justify-between items-center border-b border-outline-variant/20
```

Badge:

```html
bg-surface-container-highest text-on-surface-variant rounded-full px-3 py-1 font-metrics-mono text-xs font-bold
```

### 9.6 Meal Slot

Slot berisi:

- Label jenis makan.
- Icon edit saat hover.
- Nama menu.
- Informasi kcal dan protein.

```html
meal-slot-hover p-4 rounded-2xl bg-white border border-outline-variant/20 transition-all duration-300 group/item cursor-pointer
```

Hover CSS:

```css
.meal-slot-hover:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 110, 47, 0.08);
}
```

### 9.7 Empty Snack Slot

```html
p-4 rounded-2xl bg-surface-container border border-dashed border-outline-variant/50
```

Gunakan dashed border untuk menandakan area yang bisa diisi.

### 9.8 Empty Day State

Untuk hari kosong:

```txt
EmptyDayState
├── Restaurant icon box
├── "Plan is currently empty"
└── Add Meals button
```

Styling:

```html
p-6 flex flex-col items-center justify-center min-h-[400px] space-y-4 bg-white/40
```

Button:

```html
bg-primary-container/20 text-on-primary-container px-6 py-2 rounded-xl font-bold text-label-md hover:bg-primary-container/30 transition-all
```

### 9.9 Data Model React

```ts
type MealSlot = {
  id: string;
  type: "Breakfast" | "Lunch" | "Dinner" | "Snack";
  title: string;
  kcal?: number;
  protein?: number;
  isEmpty?: boolean;
};

type DayPlan = {
  id: string;
  dayName: string;
  dateLabel: string;
  totalKcal: number;
  isPlanned: boolean;
  meals: MealSlot[];
};
```

Contoh:

```ts
const weekPlans: DayPlan[] = [
  {
    id: "mon-2023-10-23",
    dayName: "Monday",
    dateLabel: "Oct 23",
    totalKcal: 2120,
    isPlanned: true,
    meals: [
      {
        id: "m1",
        type: "Breakfast",
        title: "Avocado Toast with Poached Egg",
        kcal: 420,
        protein: 18,
      },
      {
        id: "m2",
        type: "Lunch",
        title: "Quinoa & Roasted Veggie Bowl",
        kcal: 580,
        protein: 22,
      },
      {
        id: "m3",
        type: "Dinner",
        title: "Pan-Seared Salmon with Asparagus",
        kcal: 650,
        protein: 42,
      },
    ],
  },
];
```

---

## 10. Smart Shopping List

Panel ini mengambil data dari weekly plan dan menghasilkan daftar belanja otomatis.

### 10.1 Struktur

```txt
SmartShoppingList
├── Header
│   ├── Title
│   ├── Subtitle: Generated from weekly plan
│   └── Export List button
├── Category grid
│   ├── Fresh Produce
│   │   ├── Ripe Avocados
│   │   ├── Baby Spinach
│   │   ├── Fresh Asparagus checked
│   │   └── Red Bell Peppers
│   └── Protein & Dairy
│       ├── Atlantic Salmon Fillets
│       ├── Organic Greek Yogurt
│       ├── Free-range Eggs checked
│       └── Ground Turkey
└── Send to InstaCart button
```

### 10.2 Card Styling

```html
col-span-12 lg:col-span-8 glass-card rounded-[2.5rem] p-8 flex flex-col
```

### 10.3 Category Header

Fresh Produce:

```html
text-primary font-bold
```

Protein & Dairy:

```html
text-tertiary font-bold
```

Icon box:

```html
w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center
```

### 10.4 Checkbox Item

Unchecked:

```html
w-5 h-5 rounded border-2 border-primary
```

Checked:

```html
w-5 h-5 rounded bg-primary border-2 border-primary
```

Text checked:

```html
line-through text-on-surface-variant/50
```

### 10.5 Data Model React

```ts
type ShoppingItem = {
  id: string;
  name: string;
  amount: string;
  checked: boolean;
};

type ShoppingCategory = {
  id: string;
  title: string;
  icon: string;
  color: "primary" | "tertiary" | "secondary" | "energy-orange";
  items: ShoppingItem[];
};
```

### 10.6 Behavior yang Direkomendasikan

Untuk implementasi PWA:

- Simpan checklist di `IndexedDB` atau `localStorage`.
- Toggle checkbox tanpa refresh.
- Generate otomatis dari menu mingguan.
- Export list ke PDF/print-friendly page atau clipboard.
- Tambahkan filter: `All`, `Unchecked`, `Checked`.

---

## 11. Insights Panel

Panel insight berisi rekomendasi AI / rule-based planner.

### 11.1 Struktur

```txt
InsightsCard
├── Header
│   ├── lightbulb icon
│   └── Insights
├── Insight item 1
│   ├── colored vertical bar primary
│   ├── title
│   └── description
├── Insight item 2
│   ├── colored vertical bar orange
│   ├── title
│   └── description
└── Macro Balance progress
```

### 11.2 Styling Card

```html
glass-card rounded-[2.5rem] p-8 bg-mint-surface/30 border border-primary/10
```

### 11.3 Insight Item dengan Pseudo Element

HTML memakai Tailwind pseudo:

```html
relative pl-6 before:absolute before:left-0 before:top-1 before:w-1.5 before:h-[80%] before:bg-primary before:rounded-full
```

Di React, gunakan class yang sama.

### 11.4 Macro Balance

```html
bg-white/60 p-5 rounded-2xl border border-primary/10 mt-4 shadow-sm
```

Progress:

```html
w-full bg-surface-container rounded-full h-3 overflow-hidden
```

Bar:

```html
bg-primary h-full rounded-full
```

### 11.5 Data Model

```ts
type Insight = {
  id: string;
  title: string;
  description: string;
  tone: "primary" | "energy-orange" | "secondary" | "tertiary";
};

const insights: Insight[] = [
  {
    id: "batch-cook",
    title: "Batch Cook Wednesday",
    description:
      "Your Wednesday lunch and Thursday dinner use similar ingredients. Pre-roast your veggies once!",
    tone: "primary",
  },
  {
    id: "fiber",
    title: "Fiber Deficiency Detected",
    description:
      "Current plan is 15% below fiber goal. Consider adding chia seeds to breakfast.",
    tone: "energy-orange",
  },
];
```

---

## 12. Smart Assistant Quote Card

Card gradient yang memberi kesan premium dan AI assistant.

### 12.1 Styling

```html
bg-gradient-to-br from-achievement-purple to-energy-orange rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-xl flex flex-col justify-center
```

### 12.2 Elemen Dekoratif

Quote mark besar:

```html
absolute -top-10 -right-10 opacity-20
```

Icon:

```html
material-symbols-outlined text-[160px]
```

### 12.3 Copy

```txt
"Pantry Inventory Sync is active. We've removed items you already own."
```

Label:

```txt
Smart Assistant
```

### 12.4 Rekomendasi React

Buat komponen reusable:

```tsx
<AssistantCard
  message="Pantry Inventory Sync is active. We've removed items you already own."
  label="Smart Assistant"
/>
```

---

## 13. Pantry Inventory Sync Banner

Bagian visual paling besar di bawah halaman.

### 13.1 Struktur

```txt
PantryBanner
├── Background image
├── Hover image scale
├── Green gradient overlay
└── Text content
    ├── photo_camera icon
    ├── Pantry Inventory Sync
    └── description
```

### 13.2 Container

```html
relative h-64 rounded-[3rem] overflow-hidden shadow-2xl group
```

### 13.3 Image

```html
w-full h-full object-cover transition-transform duration-700 group-hover:scale-110
```

### 13.4 Overlay

```html
absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/40 to-transparent flex items-center px-16
```

### 13.5 Catatan Responsif

`px-16` terlalu besar untuk mobile. Gunakan:

```tsx
px-6 md:px-12 lg:px-16
```

Judul di mobile:

```tsx
text-2xl md:text-headline-lg
```

---

## 14. Floating Action Button

FAB berada di kanan bawah.

### 14.1 Styling

```html
fixed bottom-8 right-8 w-16 h-16 bg-primary text-on-primary rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50
```

### 14.2 Fungsi Ideal

FAB dapat membuka modal:

- Add meal to day.
- Generate weekly plan.
- Add ingredient.
- Import pantry photo.

### 14.3 Rekomendasi UX

Untuk halaman Meal Planner, FAB sebaiknya tidak hanya icon `+`, tapi membuka action sheet:

```txt
Quick Action Sheet
├── Generate AI Plan
├── Add Meal
├── Add Shopping Item
└── Upload Pantry Photo
```

---

## 15. CSS Custom yang Perlu Dipindahkan ke React/Tailwind

### 15.1 Glass Card

```css
.glass-card {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(226, 232, 240, 0.5);
  box-shadow: 0 10px 25px -5px rgba(0, 110, 47, 0.05);
}
```

Tailwind alternatif:

```tsx
className="bg-white/80 backdrop-blur-xl border border-slate-200/50 shadow-[0_10px_25px_-5px_rgba(0,110,47,0.05)]"
```

### 15.2 Meal Slot Hover

```css
.meal-slot-hover:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 110, 47, 0.08);
}
```

Tailwind alternatif:

```tsx
hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,110,47,0.08)] transition-all duration-300
```

### 15.3 Custom Scrollbar

```css
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #bccbb9;
  border-radius: 10px;
}
```

Rekomendasi: letakkan di `src/styles/globals.css`.

### 15.4 Sidebar Transition

```css
aside#sidebar {
  transition: width 0.22s ease, transform 0.22s ease;
}
```

Tailwind:

```tsx
transition-[width,transform] duration-200 ease-out
```

---

## 16. Animasi dan Microinteraction

### 16.1 Animasi yang Ada di HTML

| Elemen | Trigger | Efek |
|---|---|---|
| Meal slot | Hover | `translateY(-2px)`, shadow hijau |
| Meal slot | Click | scale `0.98` selama 150ms |
| Search input | Focus | ring primary, bg white |
| Sidebar | Collapse | width dari 256px ke 72px |
| Sidebar | Hide | translateX -110% |
| Day card | Hover | scale 1.01 |
| Pantry image | Hover | scale 1.10 |
| CTA button | Hover | scale 1.05 |
| FAB | Hover | scale 1.10 |
| FAB | Active | scale 0.95 |

### 16.2 Implementasi React untuk Click Scale

Gunakan state atau cukup CSS active:

```tsx
<button className="active:scale-[0.98] transition-transform duration-150">
  ...
</button>
```

Untuk meal slot:

```tsx
<div className="meal-slot-hover active:scale-[0.98] transition-all duration-300">
  ...
</div>
```

### 16.3 Framer Motion Opsional

Jika ingin lebih halus:

```tsx
import { motion } from "framer-motion";

<motion.div
  whileHover={{ y: -2, scale: 1.005 }}
  whileTap={{ scale: 0.98 }}
  transition={{ type: "spring", stiffness: 320, damping: 24 }}
>
  ...
</motion.div>
```

### 16.4 Rekomendasi untuk Performa

Untuk PWA, animasi utama cukup menggunakan **CSS transform** agar GPU-friendly:

- `translateY`
- `scale`
- `opacity`

Hindari animasi `width` terlalu banyak pada mobile karena bisa memicu layout recalculation. Sidebar collapse masih boleh karena hanya satu elemen shell.

---

## 17. Struktur Komponen React yang Disarankan

```txt
src/
├── app/
│   ├── routes/
│   │   └── MealPlannerPage.tsx
│   └── App.tsx
│
├── components/
│   ├── shell/
│   │   ├── AppShell.tsx
│   │   ├── Sidebar.tsx
│   │   ├── TopAppBar.tsx
│   │   └── MobileDrawerBackdrop.tsx
│   │
│   ├── meal-planner/
│   │   ├── WeeklySummary.tsx
│   │   ├── SummaryMetricCard.tsx
│   │   ├── WeekPlannerRail.tsx
│   │   ├── DayPlannerCard.tsx
│   │   ├── MealSlotCard.tsx
│   │   ├── EmptyDayState.tsx
│   │   ├── SmartShoppingList.tsx
│   │   ├── ShoppingCategory.tsx
│   │   ├── ShoppingItemRow.tsx
│   │   ├── InsightsPanel.tsx
│   │   ├── AssistantQuoteCard.tsx
│   │   ├── PantryInventoryBanner.tsx
│   │   └── MealPlannerFAB.tsx
│   │
│   └── ui/
│       ├── GlassCard.tsx
│       ├── IconButton.tsx
│       ├── ProgressBar.tsx
│       └── MetricPill.tsx
│
├── data/
│   ├── mealPlans.ts
│   ├── shoppingList.ts
│   └── insights.ts
│
├── styles/
│   └── globals.css
│
└── pwa/
    ├── manifest.webmanifest
    └── service-worker.ts
```

---

## 18. Tailwind Config Rekomendasi

Gunakan config ini sebagai dasar agar semua class dari HTML bisa hidup di React lokal.

```js
// tailwind.config.js
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "surface": "#f8f9ff",
        "background": "#f8f9ff",
        "on-background": "#0b1c30",
        "on-surface": "#0b1c30",
        "on-surface-variant": "#3d4a3d",

        "primary": "#006e2f",
        "primary-container": "#22c55e",
        "on-primary": "#ffffff",
        "on-primary-container": "#004b1e",
        "primary-fixed": "#6bff8f",
        "primary-fixed-dim": "#4ae176",

        "secondary": "#0058be",
        "secondary-container": "#2170e4",
        "on-secondary": "#ffffff",
        "on-secondary-container": "#fefcff",
        "secondary-fixed": "#d8e2ff",
        "secondary-fixed-dim": "#adc6ff",

        "tertiary": "#9e4036",
        "tertiary-container": "#ff8b7c",
        "tertiary-fixed": "#ffdad5",
        "tertiary-fixed-dim": "#ffb4a9",

        "energy-orange": "#f97316",
        "achievement-purple": "#a855f7",
        "warning-yellow": "#eab308",
        "error-red": "#ef4444",
        "error": "#ba1a1a",
        "error-container": "#ffdad6",

        "mint-surface": "#f0fdf4",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#eff4ff",
        "surface-container": "#e5eeff",
        "surface-container-high": "#dce9ff",
        "surface-container-highest": "#d3e4fe",
        "surface-variant": "#d3e4fe",
        "surface-dim": "#cbdbf5",
        "surface-bright": "#f8f9ff",
        "outline": "#6d7b6c",
        "outline-variant": "#bccbb9",

        "inverse-surface": "#213145",
        "inverse-on-surface": "#eaf1ff",
        "inverse-primary": "#4ae176",

        "card-light": "#ffffff",
        "card-dark": "#1e293b",
        "bg-light": "#f8fafc",
        "bg-dark": "#0f172a",
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px",
      },
      spacing: {
        unit: "4px",
        "section-gap": "32px",
        "gutter-mobile": "16px",
        "gutter-desktop": "24px",
        "margin-page": "24px",
        "card-padding": "20px",
      },
      fontFamily: {
        "headline-md": ["Poppins", "sans-serif"],
        "headline-lg": ["Poppins", "sans-serif"],
        "headline-xl": ["Poppins", "sans-serif"],
        "headline-lg-mobile": ["Poppins", "sans-serif"],
        "body-md": ["Nunito", "sans-serif"],
        "body-lg": ["Nunito", "sans-serif"],
        "label-sm": ["Inter", "sans-serif"],
        "label-md": ["Inter", "sans-serif"],
        "metrics-mono": ["JetBrains Mono", "monospace"],
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
      boxShadow: {
        glass: "0 10px 25px -5px rgba(0, 110, 47, 0.05)",
        "green-soft": "0 4px 12px rgba(0, 110, 47, 0.08)",
      },
    },
  },
  plugins: [],
};
```

---

## 19. Global CSS

```css
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800;900&family=Nunito:wght@400;600;700&family=Inter:wght@500;600&family=JetBrains+Mono:wght@500&display=swap");

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .glass-card {
    @apply bg-white/80 backdrop-blur-xl border border-slate-200/50 shadow-glass;
  }

  .meal-slot-hover {
    @apply transition-all duration-300;
  }

  .meal-slot-hover:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 110, 47, 0.08);
  }

  .material-symbols-outlined {
    font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24;
  }

  .material-symbols-filled {
    font-variation-settings: "FILL" 1, "wght" 400, "GRAD" 0, "opsz" 24;
  }
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #bccbb9;
  border-radius: 10px;
}
```

---

## 20. Contoh Komponen React

### 20.1 GlassCard

```tsx
import { PropsWithChildren } from "react";
import { cn } from "@/lib/cn";

type GlassCardProps = PropsWithChildren<{
  className?: string;
}>;

export function GlassCard({ children, className }: GlassCardProps) {
  return (
    <div className={cn("glass-card", className)}>
      {children}
    </div>
  );
}
```

### 20.2 SummaryMetricCard

```tsx
type SummaryMetricCardProps = {
  value: string;
  label: string;
  tone?: "primary" | "energy-orange" | "secondary" | "achievement-purple";
};

const toneClass = {
  primary: "text-primary",
  "energy-orange": "text-energy-orange",
  secondary: "text-secondary",
  "achievement-purple": "text-achievement-purple",
};

export function SummaryMetricCard({
  value,
  label,
  tone = "primary",
}: SummaryMetricCardProps) {
  return (
    <div className="glass-card px-6 py-4 rounded-2xl flex flex-col items-center min-w-[120px]">
      <span className={`font-metrics-mono text-2xl font-bold ${toneClass[tone]}`}>
        {value}
      </span>
      <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-tighter">
        {label}
      </span>
    </div>
  );
}
```

### 20.3 MealSlotCard

```tsx
type MealSlotCardProps = {
  type: string;
  title: string;
  kcal?: number;
  protein?: number;
  empty?: boolean;
  onClick?: () => void;
};

export function MealSlotCard({
  type,
  title,
  kcal,
  protein,
  empty,
  onClick,
}: MealSlotCardProps) {
  if (empty) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="w-full meal-slot-hover p-4 rounded-2xl bg-surface-container border border-dashed border-outline-variant/50 transition-all duration-300 active:scale-[0.98]"
      >
        <div className="flex justify-between items-center">
          <p className="text-label-md text-on-surface-variant/60 italic">
            {title}
          </p>
          <span className="material-symbols-outlined text-primary">
            add_circle
          </span>
        </div>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full text-left meal-slot-hover p-4 rounded-2xl bg-white border border-outline-variant/20 transition-all duration-300 group/item cursor-pointer active:scale-[0.98]"
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
          {type}
        </span>
        <span className="material-symbols-outlined text-on-surface-variant/40 text-sm group-hover/item:text-primary">
          edit
        </span>
      </div>
      <p className="font-bold text-on-surface">{title}</p>
      {(kcal || protein) && (
        <p className="text-label-sm text-on-surface-variant mt-1">
          {kcal ? `${kcal} kcal` : ""}
          {kcal && protein ? " • " : ""}
          {protein ? `${protein}g Protein` : ""}
        </p>
      )}
    </button>
  );
}
```

### 20.4 DayPlannerCard

```tsx
type DayPlannerCardProps = {
  dayName: string;
  dateLabel: string;
  totalKcal: number;
  meals: MealSlotCardProps[];
};

export function DayPlannerCard({
  dayName,
  dateLabel,
  totalKcal,
  meals,
}: DayPlannerCardProps) {
  const isEmpty = meals.length === 0;

  return (
    <article className="flex-shrink-0 w-[320px] snap-start">
      <div className="glass-card rounded-[2rem] overflow-hidden flex flex-col h-full border border-outline-variant/30 transition-transform hover:scale-[1.01]">
        <div
          className={
            isEmpty
              ? "bg-surface-container-low p-6 flex justify-between items-center border-b border-outline-variant/20"
              : "bg-mint-surface/50 p-6 flex justify-between items-center border-b border-primary/10"
          }
        >
          <div>
            <span
              className={
                isEmpty
                  ? "font-label-sm text-label-sm text-on-surface-variant/60 font-bold uppercase tracking-widest"
                  : "font-label-sm text-label-sm text-primary font-bold uppercase tracking-widest"
              }
            >
              {dayName}
            </span>
            <h3 className="font-headline-md text-headline-md text-on-surface">
              {dateLabel}
            </h3>
          </div>
          <div
            className={
              isEmpty
                ? "bg-surface-container-highest text-on-surface-variant rounded-full px-3 py-1 font-metrics-mono text-xs font-bold"
                : "bg-primary text-on-primary rounded-full px-3 py-1 font-metrics-mono text-xs font-bold"
            }
          >
            {totalKcal.toLocaleString("en-US")} kcal
          </div>
        </div>

        {isEmpty ? (
          <div className="p-6 flex flex-col items-center justify-center min-h-[400px] space-y-4 bg-white/40">
            <div className="w-16 h-16 bg-surface-container-high rounded-2xl flex items-center justify-center">
              <span className="material-symbols-outlined text-4xl text-on-surface-variant/40">
                restaurant
              </span>
            </div>
            <p className="text-center font-label-md text-on-surface-variant">
              Plan is currently empty
            </p>
            <button className="bg-primary-container/20 text-on-primary-container px-6 py-2 rounded-xl font-bold text-label-md hover:bg-primary-container/30 transition-all">
              Add Meals
            </button>
          </div>
        ) : (
          <div className="p-6 space-y-4 bg-white/40">
            {meals.map((meal) => (
              <MealSlotCard key={`${meal.type}-${meal.title}`} {...meal} />
            ))}
            <MealSlotCard type="Snack" title="Add a snack..." empty />
          </div>
        )}
      </div>
    </article>
  );
}
```

---

## 21. PWA Implementation Notes

### 21.1 PWA Fitur yang Relevan untuk Meal Planner

| Fitur | Manfaat |
|---|---|
| Offline weekly plan | User tetap bisa lihat menu mingguan tanpa internet |
| IndexedDB meal plan | Data plan tersimpan lokal |
| Background sync | Sinkronisasi saat koneksi kembali |
| Push reminder | Reminder meal prep / belanja |
| Installable app | UX seperti aplikasi mobile |
| Asset caching | Gambar pantry dan font lebih cepat |
| Update prompt | User tahu ketika versi planner baru tersedia |

### 21.2 Storage Strategy

Gunakan:

- `IndexedDB` untuk meal plan, shopping list, pantry items.
- `localStorage` hanya untuk preferensi ringan seperti sidebar collapsed.
- API sync untuk data user jika backend tersedia.

Contoh key:

```txt
nutritrack:meal-plans
nutritrack:shopping-list
nutritrack:pantry-inventory
nutritrack:ui-sidebar-collapsed
```

### 21.3 Service Worker Cache

Cache:

- App shell.
- CSS/JS bundle.
- Icon Material Symbols.
- Font Google jika di-self-host lebih optimal.
- Placeholder image pantry.
- API GET weekly plan dengan stale-while-revalidate.

---

## 22. Responsiveness

### 22.1 Desktop

- Sidebar terlihat fixed.
- Main content memiliki margin-left `16rem`.
- Day planner scroll horizontal.
- Shopping list 8 kolom, insights 4 kolom.
- Pantry banner tinggi 256px.

### 22.2 Tablet

- Sidebar menjadi drawer.
- Top search masih bisa tampil.
- Weekly summary metric card turun ke bawah bila sempit.
- Day card tetap horizontal scroll.

### 22.3 Mobile

Perbaikan penting:

1. Tambahkan hamburger button.
2. Top search bisa berubah menjadi icon search.
3. Weekly metric cards menjadi horizontal scroll kecil.
4. Pantry banner gunakan `px-6`, bukan `px-16`.
5. Shopping list menjadi 1 kolom.
6. FAB harus mempertimbangkan safe area:

```tsx
bottom-[calc(2rem+env(safe-area-inset-bottom))]
```

---

## 23. Aksesibilitas

### 23.1 Yang Sudah Baik

- Sidebar menggunakan `role="navigation"`.
- Sidebar memiliki `aria-label="Primary navigation"`.
- Active nav memakai `aria-current="page"`.
- Notification/settings/profile memakai `aria-label`.
- Collapse button punya `aria-expanded` dan `aria-controls`.

### 23.2 Yang Perlu Ditambah

- Meal slot harus berupa `<button>` bukan `<div>` agar bisa diakses keyboard.
- Shopping item perlu checkbox asli atau `role="checkbox"`.
- FAB perlu `aria-label`.
- Empty day Add Meals perlu menyebut tanggal.
- Pantry background image harus dekoratif atau alt lebih ringkas.
- Search input perlu `aria-label`.

Contoh:

```tsx
<button
  aria-label={`Edit ${meal.type} on ${dayName}`}
>
  ...
</button>
```

Checkbox:

```tsx
<button
  role="checkbox"
  aria-checked={checked}
  aria-label={`Mark ${name} as purchased`}
>
  ...
</button>
```

---

## 24. Kritik UI dan Rekomendasi Optimalisasi

### 24.1 Kekuatan Desain

- Konsisten dengan dashboard dan log food page.
- Visual hierarchy jelas: summary → planner → shopping list → insight.
- Horizontal planner cocok untuk workflow mingguan.
- Glass-card memberikan kesan modern tanpa terlalu berat.
- Empty state jelas dan actionable.
- Smart shopping list memperkuat nilai produk.

### 24.2 Masalah yang Perlu Diperbaiki

| Masalah | Dampak | Solusi |
|---|---|---|
| Mobile drawer script mencari elemen yang tidak ada | Menu mobile tidak jalan | Tambah `mobileMenuBtn` dan `drawerBackdrop` |
| Banyak data hardcoded | Sulit integrasi backend | Pindahkan ke data model |
| Meal slot masih `div` | Kurang accessible | Ubah menjadi `<button>` |
| Shopping checkbox bukan input/role | Kurang accessible | Gunakan checkbox atau role |
| Search hanya visual | Tidak ada UX search real | Tambahkan state autocomplete |
| 7-day grid baru 4 hari | Planner belum lengkap | Generate 7 hari dinamis |
| `Send to InstaCart` kurang relevan Indonesia | UX kurang lokal | Ubah ke `Export Belanja`, `Kirim ke WhatsApp`, atau `Buka Checklist` |
| Pantry sync butuh fitur upload | Saat ini hanya visual | Tambah flow upload foto pantry |
| Banyak image eksternal | PWA offline kurang optimal | Self-host asset penting |

### 24.3 Rekomendasi Lokalisasi Indonesia

Ganti beberapa copy:

| Asli | Rekomendasi |
|---|---|
| Meal Architecture | Perencanaan Makan |
| Weekly Plan | Rencana Mingguan |
| Weekly Summary | Ringkasan Mingguan |
| Smart Shopping List | Daftar Belanja Pintar |
| Generated from weekly plan | Dibuat otomatis dari rencana mingguan |
| Send to InstaCart | Export Daftar Belanja / Kirim ke WhatsApp |
| Pantry Inventory Sync | Sinkronisasi Stok Dapur |
| Add Meals | Tambah Menu |
| Target kcal | Target Kalori |
| Protein Goal | Target Protein |

---

## 25. Implementasi Fitur yang Paling Penting

Prioritas implementasi:

### Prioritas 1 — Wajib

- App shell reusable.
- Sidebar active route.
- Top app bar.
- Weekly summary metric.
- 7-day dynamic planner.
- Meal slot add/edit/delete.
- Shopping list generated dari meal plan.
- Local persistence.

### Prioritas 2 — Sangat Direkomendasikan

- Search recipe / ingredients.
- Empty state action.
- Modal add meal.
- Progress macro balance.
- Responsive drawer mobile.
- Export shopping list.

### Prioritas 3 — Premium / Lanjutan

- AI meal plan generation.
- Pantry photo upload.
- Pantry inventory sync.
- Recommendation engine.
- Offline background sync.
- Push reminder meal prep.

---

## 26. Rekomendasi Data Flow

```txt
User opens Meal Planner
        ↓
Load weekly plan from IndexedDB/API
        ↓
Render 7-day planner
        ↓
User adds/edits/deletes meal
        ↓
Recalculate:
  - total kcal per day
  - weekly target
  - protein goal
  - shopping list
  - insights
        ↓
Persist locally
        ↓
Sync to backend if online
```

---

## 27. Contoh State Management

Untuk project kecil-menengah:

- `useReducer` untuk meal planner.
- `Zustand` jika banyak halaman saling berbagi state.
- `TanStack Query` jika backend API sudah tersedia.

Contoh reducer action:

```ts
type MealPlannerAction =
  | { type: "ADD_MEAL"; dayId: string; meal: MealSlot }
  | { type: "UPDATE_MEAL"; dayId: string; mealId: string; meal: Partial<MealSlot> }
  | { type: "DELETE_MEAL"; dayId: string; mealId: string }
  | { type: "TOGGLE_SHOPPING_ITEM"; itemId: string }
  | { type: "GENERATE_SHOPPING_LIST" };
```

---

## 28. Checklist Konversi ke React PWA

Gunakan checklist ini saat implementasi:

```txt
[ ] Setup Tailwind token sesuai HTML
[ ] Tambahkan Google Fonts atau self-host fonts
[ ] Tambahkan Material Symbols
[ ] Buat AppShell reusable
[ ] Buat Sidebar dengan collapse/hide/mobile drawer
[ ] Buat TopAppBar reusable
[ ] Buat WeeklySummary
[ ] Buat SummaryMetricCard
[ ] Buat WeekPlannerRail horizontal scroll
[ ] Buat DayPlannerCard
[ ] Buat MealSlotCard sebagai button accessible
[ ] Buat EmptyDayState
[ ] Buat SmartShoppingList
[ ] Buat ShoppingCategory
[ ] Buat ShoppingItemRow dengan checkbox accessible
[ ] Buat InsightsPanel
[ ] Buat AssistantQuoteCard
[ ] Buat PantryInventoryBanner
[ ] Buat FAB + action sheet
[ ] Tambahkan local persistence
[ ] Tambahkan responsive mobile drawer
[ ] Tambahkan PWA manifest
[ ] Tambahkan service worker caching
[ ] Test di desktop, tablet, mobile
[ ] Audit Lighthouse: Performance, Accessibility, PWA
```

---

## 29. Kesimpulan Desain

Halaman `mealplanner.html` sudah kuat sebagai **planning dashboard** karena memiliki struktur yang jelas:

- **Atas:** ringkasan target mingguan.
- **Tengah:** planner 7 hari berbentuk horizontal board.
- **Bawah:** shopping list dan insight otomatis.
- **Akhir:** pantry inventory banner sebagai fitur premium/AI.

Untuk konversi ke React PWA, elemen paling penting adalah memindahkan semua bagian yang masih hardcoded menjadi **data-driven component**. Dengan begitu halaman ini tidak hanya menjadi tampilan statis, tetapi bisa menjadi fitur meal planning yang benar-benar interaktif, offline-ready, dan siap disambungkan ke backend.

Tahap optimal untuk halaman ini adalah ketika sudah memiliki:

1. Planner 7 hari dinamis.
2. Add/edit/delete meal.
3. Auto-generate shopping list.
4. Local persistence.
5. Mobile drawer yang benar-benar berfungsi.
6. Export/share shopping list.
7. PWA offline support.
