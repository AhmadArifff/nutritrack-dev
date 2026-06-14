# designfoods.md — NutriTrack Food Database UI Implementation Guide

## 1. Ringkasan Tampilan

Halaman **Food Database** adalah halaman katalog makanan untuk aplikasi NutriTrack. Tujuan utama halaman ini adalah:

- Menampilkan database makanan dalam bentuk grid card visual.
- Memberikan filter kategori cepat seperti `Semua`, `Sarapan`, `Lunch`, dan `Snack`.
- Menyediakan entry point ke halaman detail makanan.
- Menyediakan area placeholder untuk fitur lanjutan seperti favorite foods, advanced filters, skeleton loading, infinite scroll, dan custom food upload.
- Mempertahankan app-shell yang konsisten dengan halaman Dashboard, Log Food, Meal Planner, Progress, dan Nutrition.

Karakter visual halaman ini adalah **clean health dashboard**, dominan putih transparan, hijau nutrisi, surface biru muda, border soft, dan kartu makanan berbasis gambar.

---

## 2. Struktur UI Utama

```txt
FoodDatabasePage
├── AppShell
│   ├── Sidebar
│   │   ├── Logo NutriTrack
│   │   ├── Main Navigation
│   │   ├── Upgrade Card
│   │   ├── Help Center
│   │   └── Logout
│   └── MainContent
│       ├── TopAppBar
│       │   ├── Page Title
│       │   ├── Subtitle
│       │   ├── Search Input
│       │   ├── Notification Button
│       │   ├── Settings Button
│       │   └── Profile Link
│       └── PageBody
│           ├── Food Browser Section
│           │   ├── Section Header
│           │   ├── Category Filter Chips
│           │   ├── Food Card Grid
│           │   └── Custom Food Card
│           └── Utility Bento Section
│               ├── Favorite Foods Card
│               ├── Filters Card
│               └── Skeleton Loading Card
```

---

## 3. Layout Canvas

### Body

```tsx
<body className="bg-surface text-on-surface font-body-md overflow-x-hidden">
```

**Tujuan desain:**

- `bg-surface` memberi background putih kebiruan yang lembut.
- `text-on-surface` menjaga kontras teks utama.
- `overflow-x-hidden` mencegah horizontal scroll tidak disengaja dari sidebar/fixed element.

### Main Content

```tsx
<main
  id="mainContent"
  className="flex-1 xl:ml-64 p-gutter-desktop w-full"
>
```

**Catatan implementasi React:**

- Saat sidebar normal: `xl:ml-64`.
- Saat sidebar collapse: tambahkan class `main-collapsed`.
- Saat sidebar hidden: tambahkan class `hidden-sidebar`.
- Sebaiknya logic ini dibuat di `AppShellContext`.

---

## 4. Design Tokens

### 4.1 Color Palette

Gunakan token berikut di `tailwind.config.js` supaya semua halaman NutriTrack konsisten.

```js
colors: {
  primary: '#006e2f',
  'primary-container': '#22c55e',
  'on-primary': '#ffffff',
  'on-primary-container': '#004b1e',

  surface: '#f8f9ff',
  'surface-container': '#e5eeff',
  'surface-container-low': '#eff4ff',
  'surface-variant': '#d3e4fe',

  'outline-variant': '#bccbb9',

  'on-surface': '#0b1c30',
  'on-surface-variant': '#3d4a3d',

  'secondary-container': '#2170e4',
  'on-secondary-container': '#fefcff',

  'energy-orange': '#f97316',
  'error-red': '#ef4444',
}
```

### 4.2 Semantic Usage

| Token | Fungsi UI |
|---|---|
| `primary` | CTA, active nav, icon nutrisi, active filter |
| `primary-container` | Background active nav dan highlight lembut |
| `surface` | Page background |
| `surface-container` | Input, filter inactive, utility card background |
| `surface-container-low` | Sidebar background dan area soft |
| `outline-variant` | Border card dan divider |
| `on-surface` | Teks utama |
| `on-surface-variant` | Subtitle, metadata, caption |
| `energy-orange` | Accent untuk kalori, fat, energy label |
| `error-red` | Logout hover atau state destructive |

---

## 5. Typography

HTML asli memakai Google Fonts:

```txt
Inter: body, label, navigation, metadata
Poppins: heading
Material Symbols Outlined: icon system
```

### Tailwind Token

```js
fontFamily: {
  'body-md': ['Inter'],
  'label-md': ['Inter'],
  'headline-md': ['Poppins'],
  'headline-lg': ['Poppins'],
},
fontSize: {
  'label-md': ['14px', { lineHeight: '1.4', fontWeight: '500' }],
  'headline-md': ['24px', { lineHeight: '1.3', fontWeight: '700' }],
  'headline-lg': ['32px', { lineHeight: '1.25', fontWeight: '700' }],
}
```

### Rekomendasi penggunaan

| Elemen | Class |
|---|---|
| Judul halaman | `font-headline-md text-headline-md font-bold text-primary` |
| Heading section | `font-headline-lg text-headline-lg` |
| Judul card | `font-bold text-on-surface` |
| Metadata makanan | `text-sm text-on-surface-variant` |
| Tombol filter | `font-bold text-label-md` |

---

## 6. Shared Component: Sidebar

Sidebar pada halaman Food Database sama dengan shell halaman lain.

### Struktur navigasi

```txt
Dashboard
Log Food
Meal Planner
Progress
Nutrition
Foods ← active
Community
Profile
```

### Active State Foods

```tsx
<a
  href="/foods"
  aria-current="page"
  className="flex items-center gap-3 px-4 py-3 bg-primary-container text-on-primary-container rounded-xl font-bold shadow-sm"
>
  <span className="material-symbols-outlined filled">nutrition</span>
  <span className="font-label-md text-label-md nav-label">Foods</span>
</a>
```

### State sidebar

| State | Behavior |
|---|---|
| Normal | Width 256px |
| Collapsed | Width 72px, label dan logo text hilang |
| Hidden | Sidebar translate keluar layar |
| Mobile | Drawer fixed, dibuka via hamburger di app shell |

### CSS Shell

```css
aside#sidebar {
  transition: width 0.22s ease, transform 0.22s ease;
}

aside#sidebar.collapsed {
  width: 72px;
}

aside#sidebar.collapsed .nav-label,
aside#sidebar.collapsed .logo-text {
  opacity: 0;
  width: 0;
  display: none;
}

main#mainContent {
  transition: margin-left 0.22s ease, width 0.22s ease;
}

main#mainContent.main-collapsed {
  margin-left: 72px;
}

aside#sidebar.hidden-full {
  transform: translateX(-110%);
  width: 0 !important;
}

main#mainContent.hidden-sidebar {
  margin-left: 0 !important;
}
```

---

## 7. Top App Bar

### Visual

Top app bar menggunakan sticky header dengan blur.

```tsx
<header className="sticky top-0 z-40 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/30 px-gutter-desktop h-16 flex items-center justify-between">
```

### Konten

- Title: `Food Database`
- Subtitle: `Browse, filter, favorite, and add foods`
- Search input: `Search foods...`
- Icon actions: notifications, settings
- Profile avatar + user name + membership label

### Search Input

```tsx
<div className="relative hidden md:block">
  <input
    className="bg-surface-container border-none rounded-full px-5 py-2 pl-12 focus:ring-2 focus:ring-primary w-64 text-label-md"
    placeholder="Search foods..."
    type="text"
  />
  <span className="material-symbols-outlined absolute left-4 top-2 text-on-surface-variant">
    search
  </span>
</div>
```

### Rekomendasi React Enhancement

Tambahkan state pencarian:

```tsx
const [search, setSearch] = useState('');

const filteredFoods = foods.filter((food) =>
  food.name.toLowerCase().includes(search.toLowerCase())
);
```

---

## 8. Food Browser Section

### Container

```tsx
<section className="glass-card rounded-[2rem] p-8">
```

### Visual style

```css
.glass-card {
  background: rgba(255, 255, 255, 0.86);
  border: 1px solid rgba(188, 203, 185, 0.55);
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.06);
}
```

**Efek desain:**

- Transparan putih lembut.
- Border hijau-abu soft.
- Shadow kecil untuk depth.
- Cocok untuk PWA karena ringan, tidak memerlukan library animasi.

---

## 9. Header Section: Browse Foods

### Struktur

```tsx
<div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
  <div>
    <p className="text-label-md text-on-surface-variant mb-2">
      Database makanan Indonesia
    </p>
    <h1 className="font-headline-lg text-headline-lg">
      Browse Foods
    </h1>
  </div>

  <CategoryFilter />
</div>
```

### Fungsi UX

Bagian ini memberi konteks bahwa halaman adalah katalog makanan. Subtitle "Database makanan Indonesia" membuat halaman terasa lokal dan relevan untuk pengguna Indonesia.

---

## 10. Category Filter Chips

### HTML asli

Filter chip terdiri dari:

- Semua
- Sarapan
- Lunch
- Snack

### Active Chip

```tsx
<button className="px-4 py-2 rounded-xl bg-primary text-white font-bold">
  Semua
</button>
```

### Inactive Chip

```tsx
<button className="px-4 py-2 rounded-xl bg-surface-container font-bold">
  Sarapan
</button>
```

### React Data Model

```ts
type FoodCategory = 'Semua' | 'Sarapan' | 'Lunch' | 'Snack';

const categories: FoodCategory[] = ['Semua', 'Sarapan', 'Lunch', 'Snack'];
```

### Component

```tsx
function CategoryFilter({
  activeCategory,
  onChange,
}: {
  activeCategory: string;
  onChange: (category: string) => void;
}) {
  const categories = ['Semua', 'Sarapan', 'Lunch', 'Snack'];

  return (
    <div className="flex flex-wrap gap-3">
      {categories.map((category) => {
        const active = category === activeCategory;

        return (
          <button
            key={category}
            onClick={() => onChange(category)}
            className={[
              'px-4 py-2 rounded-xl font-bold transition-all',
              active
                ? 'bg-primary text-white shadow-md'
                : 'bg-surface-container text-on-surface hover:bg-surface-variant',
            ].join(' ')}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
```

---

## 11. Food Card Grid

### Layout

```tsx
<div className="grid md:grid-cols-3 gap-5">
```

### Responsive Behavior

| Breakpoint | Layout |
|---|---|
| Mobile | 1 column |
| Tablet/Desktop | 3 columns |
| Large desktop | Tetap 3 columns dalam container 1400px |

### Food Card Anatomy

```txt
FoodCard
├── Image
├── Content
│   ├── Food Name
│   ├── Calories
│   └── Macro Summary
```

### Base Food Card

```tsx
<a
  href={`/foods/${food.id}`}
  className="rounded-2xl border border-outline-variant/40 bg-white overflow-hidden hover:-translate-y-1 transition shadow-sm"
>
  <img
    className="h-40 w-full object-cover"
    src={food.image}
    alt={food.name}
  />

  <div className="p-5">
    <div className="flex justify-between gap-4">
      <b>{food.name}</b>
      <span className="text-primary font-bold whitespace-nowrap">
        {food.calories} kcal
      </span>
    </div>

    <p className="text-sm text-on-surface-variant mt-2">
      Protein {food.protein}g / Carbs {food.carbs}g / Fat {food.fat}g
    </p>
  </div>
</a>
```

### Hover Behavior

HTML asli memakai:

```txt
hover:-translate-y-1 transition shadow-sm
```

**Efek:**

- Card naik 4px.
- Visual terasa responsif.
- Shadow tetap ringan.
- Cocok untuk grid yang banyak item karena tidak berat.

### Enhancement yang disarankan

Tambahkan:

```tsx
hover:shadow-lg hover:border-primary/30 active:scale-[0.98]
```

Final class:

```tsx
className="rounded-2xl border border-outline-variant/40 bg-white overflow-hidden shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-primary/30 active:scale-[0.98]"
```

---

## 12. Food Data dari HTML

Data makanan yang terlihat pada UI:

```ts
const foods = [
  {
    id: 'gado-gado',
    name: 'Gado-Gado',
    category: 'Lunch',
    calories: 320,
    protein: 12,
    carbs: 38,
    fat: 14,
    image:
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'nasi-ayam-panggang',
    name: 'Nasi Ayam Panggang',
    category: 'Lunch',
    calories: 520,
    protein: 34,
    carbs: 58,
    fat: 16,
    image:
      'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'oatmeal-pisang',
    name: 'Oatmeal Pisang',
    category: 'Sarapan',
    calories: 290,
    protein: 10,
    carbs: 51,
    fat: 5,
    image:
      'https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'greek-yogurt-parfait',
    name: 'Greek Yogurt Parfait',
    category: 'Snack',
    calories: 240,
    protein: 18,
    carbs: 26,
    fat: 6,
    image:
      'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'tempe-bakar',
    name: 'Tempe Bakar',
    category: 'Lunch',
    calories: 180,
    protein: 16,
    carbs: 12,
    fat: 8,
    image:
      'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=900&q=80',
  },
];
```

---

## 13. Custom Food Card

### Visual

Card terakhir adalah placeholder untuk menambahkan makanan custom.

```tsx
<a
  href="/foods/custom/new"
  className="rounded-2xl border border-dashed border-primary/40 bg-mint-surface p-6 flex flex-col items-center justify-center text-center min-h-[260px] transition-all hover:bg-primary/10 hover:-translate-y-1"
>
  <span className="material-symbols-outlined text-primary text-5xl mb-4">
    add_circle
  </span>
  <b>Tambah Makanan Custom</b>
  <p className="text-sm text-on-surface-variant mt-2">
    Frontend placeholder untuk upload foto dan data nutrisi.
  </p>
</a>
```

### Fungsi

Ini adalah CTA untuk fitur:

- Upload foto makanan.
- Input manual nutrisi.
- AI estimate nutrition.
- Simpan ke user custom database.

### Rekomendasi routing

```txt
/foods/new
/foods/custom/new
```

---

## 14. Utility Bento Section

Bagian bawah memiliki 3 kartu informasi:

```txt
Favorite Foods
Filters
Skeleton Loading
```

### Layout

```tsx
<section className="grid lg:grid-cols-3 gap-6">
```

### Utility Card

```tsx
<div className="glass-card rounded-[2rem] p-7">
  <h3 className="font-headline-md text-headline-md mb-3">
    Favorite Foods
  </h3>
  <p className="text-on-surface-variant">
    Quick-add dari makanan yang sering disimpan.
  </p>
</div>
```

### Rekomendasi implementasi lanjutan

| Card | Fitur nyata |
|---|---|
| Favorite Foods | List makanan favorit pengguna, quick add ke log |
| Filters | Filter kalori, protein tinggi, rendah gula, vegetarian |
| Skeleton Loading | Placeholder saat data sedang fetch dari API |
| Infinite Scroll | Load page berikutnya saat scroll mendekati bawah |

---

## 15. Animation & Micro-interaction

### Existing animation

Pada HTML asli, animasi utama menggunakan Tailwind class:

```txt
hover:-translate-y-1
transition
hover:bg-surface-variant
focus:ring-2
```

### Rekomendasi Animasi Halus

Tambahkan token CSS:

```css
.nt-transition {
  transition:
    transform 180ms ease,
    box-shadow 180ms ease,
    border-color 180ms ease,
    background-color 180ms ease,
    color 180ms ease;
}

.nt-card-hover:hover {
  transform: translateY(-4px);
  box-shadow: 0 18px 36px rgba(15, 23, 42, 0.08);
}

.nt-card-active:active {
  transform: scale(0.98);
}
```

### Framer Motion variant opsional

```tsx
const cardVariant = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  whileHover: { y: -4, scale: 1.01 },
  whileTap: { scale: 0.98 },
};
```

Untuk performa PWA, gunakan Framer Motion hanya jika halaman membutuhkan animasi masuk yang lebih premium. Untuk grid banyak item, Tailwind transition lebih ringan.

---

## 16. React Component Breakdown

```txt
src/
├── app/
│   └── routes/
│       └── foods/
│           ├── FoodDatabasePage.tsx
│           └── data.ts
├── components/
│   ├── layout/
│   │   ├── AppShell.tsx
│   │   ├── Sidebar.tsx
│   │   └── TopAppBar.tsx
│   └── foods/
│       ├── CategoryFilter.tsx
│       ├── FoodGrid.tsx
│       ├── FoodCard.tsx
│       ├── CustomFoodCard.tsx
│       ├── UtilityBento.tsx
│       └── FoodSkeletonCard.tsx
```

---

## 17. FoodDatabasePage Example

```tsx
import { useMemo, useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { CategoryFilter } from '@/components/foods/CategoryFilter';
import { FoodCard } from '@/components/foods/FoodCard';
import { CustomFoodCard } from '@/components/foods/CustomFoodCard';
import { foods } from './data';

export function FoodDatabasePage() {
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [search, setSearch] = useState('');

  const filteredFoods = useMemo(() => {
    return foods.filter((food) => {
      const matchCategory =
        activeCategory === 'Semua' || food.category === activeCategory;

      const matchSearch = food.name
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchCategory && matchSearch;
    });
  }, [activeCategory, search]);

  return (
    <AppShell
      activeRoute="foods"
      title="Food Database"
      subtitle="Browse, filter, favorite, and add foods"
      searchPlaceholder="Search foods..."
      searchValue={search}
      onSearchChange={setSearch}
    >
      <div className="p-8 max-w-[1400px] mx-auto space-y-section-gap">
        <section className="glass-card rounded-[2rem] p-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
            <div>
              <p className="text-label-md text-on-surface-variant mb-2">
                Database makanan Indonesia
              </p>
              <h1 className="font-headline-lg text-headline-lg">
                Browse Foods
              </h1>
            </div>

            <CategoryFilter
              activeCategory={activeCategory}
              onChange={setActiveCategory}
            />
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {filteredFoods.map((food) => (
              <FoodCard key={food.id} food={food} />
            ))}

            <CustomFoodCard />
          </div>
        </section>

        <UtilityBento />
      </div>
    </AppShell>
  );
}
```

---

## 18. Accessibility Checklist

| Area | Requirement |
|---|---|
| Food image | `alt` harus memakai nama makanan |
| Food card link | Card harus bisa diakses keyboard |
| Category chips | Gunakan `button`, bukan `div` |
| Active filter | Tambahkan `aria-pressed={active}` |
| Sidebar active | Tambahkan `aria-current="page"` |
| Search | Gunakan label tersembunyi atau `aria-label` |
| Custom food card | Jelaskan fungsi upload/custom food |

Contoh:

```tsx
<button
  aria-pressed={active}
  className={...}
>
  {category}
</button>
```

---

## 19. PWA Consideration

Untuk aplikasi lokal React PWA:

### Cache Strategy

| Resource | Strategy |
|---|---|
| App shell JS/CSS | Cache First |
| Food images | Stale While Revalidate |
| Food API data | Network First |
| Static icons/fonts | Cache First |
| User custom food | IndexedDB fallback |

### Offline State

Tambahkan empty/offline banner:

```tsx
{!navigator.onLine && (
  <div className="rounded-2xl bg-energy-orange/10 text-energy-orange p-4 font-bold">
    Anda sedang offline. Data makanan terakhir tetap tersedia dari cache.
  </div>
)}
```

---

## 20. Recommended Data Model

```ts
export interface FoodItem {
  id: string;
  name: string;
  category: 'Sarapan' | 'Lunch' | 'Snack' | 'Dinner';
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  image: string;
  tags?: string[];
  isFavorite?: boolean;
  source?: 'system' | 'custom' | 'ai-estimated';
}
```

---

## 21. API Endpoint Rekomendasi

```txt
GET    /api/foods
GET    /api/foods?category=Lunch&search=gado
GET    /api/foods/:id
POST   /api/foods/custom
PATCH  /api/foods/:id/favorite
POST   /api/food-logs
```

---

## 22. Prioritas Implementasi

### Priority 1 — Wajib

- Shared `AppShell`.
- Food grid.
- Food card.
- Search input.
- Category filter.
- Food detail route.
- Responsive layout.

### Priority 2 — Penting

- Favorite foods.
- Skeleton loading.
- Empty search state.
- API integration.
- Offline cache.

### Priority 3 — Premium

- AI estimate custom food.
- Upload photo.
- Nutrition OCR/vision analysis.
- Infinite scroll.
- Advanced filters: kalori, protein, diet tag.

---

## 23. Catatan Optimasi

Halaman ini sudah cukup ringan karena tidak memakai chart berat. Optimasi utama:

- Gunakan `loading="lazy"` untuk gambar.
- Gunakan `srcSet` jika gambar banyak.
- Hindari re-render grid dengan `useMemo`.
- Skeleton loading hanya render saat fetch.
- Gunakan virtualization jika data > 500 item.
- Simpan filter dan search query di URL supaya shareable.

Contoh URL:

```txt
/foods?category=Lunch&search=ayam
```

---

## 24. Kesimpulan

Halaman Food Database berfungsi sebagai katalog makanan utama NutriTrack. Desainnya sudah konsisten dengan app shell lain: sidebar tetap, top app bar sticky, glass card, surface lembut, dan active color hijau. Untuk konversi ke React PWA, bagian yang paling penting adalah memisahkan komponen menjadi `FoodCard`, `CategoryFilter`, `FoodGrid`, dan `CustomFoodCard`, lalu menghubungkannya ke data model makanan agar halaman siap diintegrasikan dengan backend atau IndexedDB.
