# designfoodsdetail.md — NutriTrack Food Detail UI Implementation Guide

## 1. Ringkasan Tampilan

Halaman **Food Detail** adalah halaman detail nutrisi untuk satu makanan. Dari HTML yang dianalisis, halaman ini menampilkan detail makanan **Gado-Gado** dengan gambar besar, metadata kategori, ringkasan nutrisi, kalkulator porsi berbasis range input, CTA untuk menambahkan ke log, tombol simpan favorit, dan tabel nutrisi lengkap.

Tujuan halaman:

- Memberikan informasi makanan secara jelas dan cepat.
- Menampilkan kalori dan makro utama.
- Memberikan kontrol porsi.
- Menghubungkan detail makanan ke fitur log makanan.
- Menyediakan ruang untuk tabel nutrisi lanjutan.
- Tetap memakai shell NutriTrack yang konsisten.

---

## 2. Struktur UI Utama

```txt
FoodDetailPage
├── AppShell
│   ├── Sidebar
│   └── MainContent
│       ├── TopAppBar
│       └── PageBody
│           ├── BackLink
│           ├── FoodHeroDetail
│           │   ├── Large Food Image
│           │   └── FoodInfoCard
│           │       ├── Category Tag
│           │       ├── Food Name
│           │       ├── Description
│           │       ├── Nutrition Summary Grid
│           │       ├── Portion Range Slider
│           │       ├── Add To Log Button
│           │       └── Save Favorite Button
│           └── FullNutritionTable
```

---

## 3. Layout Canvas

### Main Container

```tsx
<main id="mainContent" className="flex-1 xl:ml-64 p-gutter-desktop w-full">
  <div className="p-8 max-w-[1200px] mx-auto space-y-section-gap">
    ...
  </div>
</main>
```

### Kenapa `max-w-[1200px]`

Halaman detail menggunakan layout dua kolom. `1200px` ideal karena:

- Gambar 460px tinggi tetap terlihat premium.
- Card detail tidak terlalu melebar.
- Tabel nutrisi tetap nyaman dibaca.
- Lebih fokus daripada halaman database yang memakai `1400px`.

---

## 4. Design Tokens

Gunakan token yang sama dengan Food Database.

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

---

## 5. Typography

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

### Mapping

| Elemen | Class |
|---|---|
| Page title topbar | `font-headline-md text-headline-md font-bold text-primary` |
| Food name | `font-headline-lg text-headline-lg` |
| Category tag | `text-primary font-bold` |
| Description | `text-on-surface-variant` |
| Nutrition value | `block text-2xl font-bold` |
| CTA | `font-extrabold` |

---

## 6. Shared Sidebar

Halaman detail masih berada dalam menu **Foods**, sehingga active navigation tetap pada item Foods.

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

**Catatan routing:**

```txt
/foods
/foods/:foodId
```

Pada kedua route tersebut, active menu tetap `foods`.

---

## 7. Top App Bar

### Konten

- Title: `Food Detail`
- Subtitle: `Nutrition facts and portion calculator`
- Search: `Search foods...`
- Icon: notification, settings
- Profile area

### Component Example

```tsx
<TopAppBar
  title="Food Detail"
  subtitle="Nutrition facts and portion calculator"
  searchPlaceholder="Search foods..."
/>
```

### UX Note

Search pada halaman detail sebaiknya tetap aktif untuk berpindah makanan tanpa harus kembali ke database.

---

## 8. Back Link

### Visual

```tsx
<a
  className="inline-flex items-center gap-2 text-primary font-bold"
  href="/foods"
>
  <span className="material-symbols-outlined">arrow_back</span>
  Kembali ke database
</a>
```

### Rekomendasi React Router

```tsx
import { Link } from 'react-router-dom';

<Link
  to="/foods"
  className="inline-flex items-center gap-2 text-primary font-bold transition-colors hover:text-on-primary-container"
>
  <span className="material-symbols-outlined">arrow_back</span>
  Kembali ke database
</Link>
```

---

## 9. Hero Detail Section

### Layout

```tsx
<section className="grid lg:grid-cols-2 gap-8 items-start">
  <FoodImage />
  <FoodInfoCard />
</section>
```

### Responsive Behavior

| Breakpoint | Layout |
|---|---|
| Mobile | Image di atas, info card di bawah |
| Desktop | 2 kolom sejajar |
| Large desktop | Max width 1200px |

---

## 10. Large Food Image

### HTML asli

```tsx
<img
  className="w-full h-[460px] object-cover rounded-[2rem] shadow-xl"
  src="..."
  alt="Gado-Gado"
/>
```

### Fungsi visual

- Menjadikan halaman detail terasa premium.
- Memperjelas identitas makanan.
- `object-cover` memastikan gambar penuh tanpa distorsi.
- `rounded-[2rem]` konsisten dengan glass card lain.

### Enhancement

```tsx
<img
  loading="lazy"
  className="w-full h-[320px] md:h-[460px] object-cover rounded-[2rem] shadow-xl transition-transform duration-500 hover:scale-[1.01]"
  src={food.image}
  alt={food.name}
/>
```

---

## 11. Food Info Card

### Container

```tsx
<div className="glass-card rounded-[2rem] p-8">
```

### Content Order

```txt
1. Category metadata
2. Food name
3. Description
4. Nutrition summary grid
5. Portion slider
6. CTA buttons
```

### Category Metadata

```tsx
<p className="text-primary font-bold mb-2">
  Indonesian / Vegetarian friendly
</p>
```

### Food Name

```tsx
<h1 className="font-headline-lg text-headline-lg mb-4">
  Gado-Gado
</h1>
```

### Description

```tsx
<p className="text-on-surface-variant mb-8">
  Sayuran rebus, tahu, tempe, telur, dan saus kacang. Cocok untuk makan siang kaya serat.
</p>
```

---

## 12. Nutrition Summary Grid

### Visual

Grid 2x2:

```txt
Kalori   Protein
Carbs    Fat
```

### Component

```tsx
function NutritionSummary({ food, multiplier }: Props) {
  const items = [
    {
      label: 'Kalori',
      value: Math.round(food.calories * multiplier),
      suffix: '',
      className: 'text-primary',
    },
    {
      label: 'Protein',
      value: food.protein * multiplier,
      suffix: 'g',
    },
    {
      label: 'Carbs',
      value: food.carbs * multiplier,
      suffix: 'g',
    },
    {
      label: 'Fat',
      value: food.fat * multiplier,
      suffix: 'g',
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 mb-8">
      {items.map((item) => (
        <div key={item.label} className="p-4 rounded-2xl bg-surface-container">
          <span className="text-sm text-on-surface-variant">
            {item.label}
          </span>
          <b className={`block text-2xl ${item.className ?? ''}`}>
            {item.value}
            {item.suffix}
          </b>
        </div>
      ))}
    </div>
  );
}
```

---

## 13. Portion Range Slider

### HTML asli

```tsx
<label className="block mb-6">
  <span className="font-bold">Porsi: 1 plate</span>
  <input className="w-full mt-3 accent-primary" type="range" min="1" max="3" value="1" />
</label>
```

### React State

```tsx
const [portion, setPortion] = useState(1);
```

### Component

```tsx
<label className="block mb-6">
  <span className="font-bold">
    Porsi: {portion} plate
  </span>

  <input
    className="w-full mt-3 accent-primary"
    type="range"
    min={1}
    max={3}
    step={0.5}
    value={portion}
    onChange={(event) => setPortion(Number(event.target.value))}
  />
</label>
```

### Efek Data

Nutrisi harus ikut berubah saat porsi berubah.

```tsx
const nutrition = {
  calories: Math.round(food.calories * portion),
  protein: food.protein * portion,
  carbs: food.carbs * portion,
  fat: food.fat * portion,
};
```

---

## 14. CTA Buttons

### Add To Log

```tsx
<Link
  to={`/logfood?foodId=${food.id}&portion=${portion}`}
  className="h-12 rounded-2xl bg-primary text-white font-extrabold flex items-center justify-center transition-all hover:brightness-110 active:scale-[0.98]"
>
  Tambah ke Log
</Link>
```

### Save Favorite

```tsx
<button
  type="button"
  onClick={toggleFavorite}
  className="h-12 rounded-2xl bg-surface-container font-extrabold transition-all hover:bg-surface-variant active:scale-[0.98]"
>
  Simpan Favorit
</button>
```

### Button Grid

```tsx
<div className="grid sm:grid-cols-2 gap-3">
  ...
</div>
```

---

## 15. Full Nutrition Table

### HTML asli

```txt
Fiber 8g
Calcium 12%
Iron 15%
Sodium 420mg
```

### Layout

```tsx
<section className="glass-card rounded-[2rem] p-8">
  <h2 className="font-headline-md text-headline-md mb-6">
    Tabel Nutrisi Lengkap
  </h2>

  <div className="grid md:grid-cols-4 gap-4 text-sm">
    ...
  </div>
</section>
```

### Component

```tsx
function FullNutritionTable({ nutrients }: { nutrients: Nutrient[] }) {
  return (
    <section className="glass-card rounded-[2rem] p-8">
      <h2 className="font-headline-md text-headline-md mb-6">
        Tabel Nutrisi Lengkap
      </h2>

      <div className="grid md:grid-cols-4 gap-4 text-sm">
        {nutrients.map((nutrient) => (
          <div
            key={nutrient.name}
            className="p-4 rounded-xl bg-white border border-outline-variant/40"
          >
            {nutrient.name} {nutrient.value}
            {nutrient.unit}
          </div>
        ))}
      </div>
    </section>
  );
}
```

---

## 16. Food Detail Data dari HTML

```ts
const gadoGado = {
  id: 'gado-gado',
  name: 'Gado-Gado',
  category: 'Indonesian',
  tags: ['Vegetarian friendly'],
  description:
    'Sayuran rebus, tahu, tempe, telur, dan saus kacang. Cocok untuk makan siang kaya serat.',
  servingLabel: 'plate',
  image:
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80',
  calories: 320,
  protein: 12,
  carbs: 38,
  fat: 14,
  nutrients: [
    { name: 'Fiber', value: 8, unit: 'g' },
    { name: 'Calcium', value: 12, unit: '%' },
    { name: 'Iron', value: 15, unit: '%' },
    { name: 'Sodium', value: 420, unit: 'mg' },
  ],
};
```

---

## 17. Recommended TypeScript Model

```ts
export interface FoodDetail {
  id: string;
  name: string;
  category: string;
  tags: string[];
  description: string;
  servingLabel: string;
  image: string;

  calories: number;
  protein: number;
  carbs: number;
  fat: number;

  nutrients: Nutrient[];
  isFavorite?: boolean;
}

export interface Nutrient {
  name: string;
  value: number;
  unit: 'g' | 'mg' | 'mcg' | '%' | '';
}
```

---

## 18. React Component Breakdown

```txt
src/
├── app/
│   └── routes/
│       └── foods/
│           ├── FoodDetailPage.tsx
│           └── data.ts
├── components/
│   ├── layout/
│   │   ├── AppShell.tsx
│   │   ├── Sidebar.tsx
│   │   └── TopAppBar.tsx
│   └── foods/
│       ├── FoodHeroImage.tsx
│       ├── FoodInfoCard.tsx
│       ├── NutritionSummary.tsx
│       ├── PortionSlider.tsx
│       ├── FoodActionButtons.tsx
│       └── FullNutritionTable.tsx
```

---

## 19. FoodDetailPage Example

```tsx
import { Link, useParams } from 'react-router-dom';
import { AppShell } from '@/components/layout/AppShell';
import { foods } from './data';

export function FoodDetailPage() {
  const { foodId } = useParams();
  const food = foods.find((item) => item.id === foodId) ?? foods[0];

  return (
    <AppShell
      activeRoute="foods"
      title="Food Detail"
      subtitle="Nutrition facts and portion calculator"
      searchPlaceholder="Search foods..."
    >
      <div className="p-8 max-w-[1200px] mx-auto space-y-section-gap">
        <Link
          to="/foods"
          className="inline-flex items-center gap-2 text-primary font-bold transition-colors hover:text-on-primary-container"
        >
          <span className="material-symbols-outlined">arrow_back</span>
          Kembali ke database
        </Link>

        <FoodHeroDetail food={food} />

        <FullNutritionTable nutrients={food.nutrients} />
      </div>
    </AppShell>
  );
}
```

---

## 20. FoodHeroDetail Example

```tsx
function FoodHeroDetail({ food }: { food: FoodDetail }) {
  const [portion, setPortion] = useState(1);

  return (
    <section className="grid lg:grid-cols-2 gap-8 items-start">
      <img
        loading="lazy"
        className="w-full h-[320px] md:h-[460px] object-cover rounded-[2rem] shadow-xl transition-transform duration-500 hover:scale-[1.01]"
        src={food.image}
        alt={food.name}
      />

      <FoodInfoCard
        food={food}
        portion={portion}
        onPortionChange={setPortion}
      />
    </section>
  );
}
```

---

## 21. Interaction & Animation

### Hover Image

```tsx
transition-transform duration-500 hover:scale-[1.01]
```

### CTA Press

```tsx
active:scale-[0.98]
```

### Favorite Feedback

```tsx
const [isFavorite, setIsFavorite] = useState(food.isFavorite ?? false);

<button
  onClick={() => setIsFavorite((value) => !value)}
  className={isFavorite ? 'bg-primary-container text-on-primary-container' : 'bg-surface-container'}
>
  {isFavorite ? 'Tersimpan' : 'Simpan Favorit'}
</button>
```

### Toast UX

Saat user klik **Tambah ke Log**, tampilkan toast:

```txt
Gado-Gado berhasil ditambahkan ke log makanan.
```

---

## 22. Accessibility Checklist

| Area | Requirement |
|---|---|
| Back link | Harus memakai link yang jelas |
| Image | `alt={food.name}` |
| Portion slider | Harus punya label eksplisit |
| Nutrition card | Jangan hanya mengandalkan warna |
| CTA | Button/link harus keyboard accessible |
| Favorite button | Gunakan `aria-pressed` |
| Nutrient table | Bisa ditingkatkan ke semantic table jika data detail banyak |

Contoh favorite:

```tsx
<button
  aria-pressed={isFavorite}
  onClick={toggleFavorite}
>
  {isFavorite ? 'Tersimpan' : 'Simpan Favorit'}
</button>
```

---

## 23. PWA & Offline Consideration

### Cache

| Resource | Strategy |
|---|---|
| Food detail API | Network First |
| Food image | Stale While Revalidate |
| Static app shell | Cache First |
| Favorite state | IndexedDB / localStorage fallback |
| Pending add-to-log action | Background Sync queue |

### Offline Add To Log

Jika user offline, simpan aksi ke queue:

```ts
type PendingFoodLog = {
  foodId: string;
  portion: number;
  createdAt: string;
  synced: false;
};
```

Saat koneksi kembali online, sync ke backend.

---

## 24. API Endpoint Rekomendasi

```txt
GET    /api/foods/:id
POST   /api/food-logs
PATCH  /api/foods/:id/favorite
GET    /api/foods/:id/related
```

---

## 25. Validation

Untuk porsi:

```ts
function validatePortion(portion: number) {
  if (Number.isNaN(portion)) return 1;
  if (portion < 0.25) return 0.25;
  if (portion > 5) return 5;
  return portion;
}
```

### Kenapa max HTML asli 3 bisa ditingkatkan

HTML asli memakai `min=1` dan `max=3`. Di aplikasi nyata, lebih fleksibel jika:

- min `0.25`
- max `5`
- step `0.25`

Karena user bisa makan setengah porsi atau 1.5 porsi.

---

## 26. Prioritas Implementasi

### Priority 1 — Wajib

- Route `/foods/:foodId`.
- Load detail by ID.
- Food image.
- Nutrition summary.
- Portion slider.
- Add to log.
- Back link.
- Responsive layout.

### Priority 2 — Penting

- Favorite toggle.
- Dynamic nutrition calculation by portion.
- Full nutrition table.
- Toast feedback.
- Loading state.
- Not found state.

### Priority 3 — Premium

- Related foods.
- Compare portion presets.
- AI nutrition note.
- Ingredient breakdown.
- Food image upload/custom variant.
- Offline add-to-log queue.

---

## 27. Kesimpulan

Halaman Food Detail adalah halaman transaksi informasi: user melihat nutrisi, mengatur porsi, lalu menambahkan makanan ke log. Desain HTML aslinya sudah bersih dan sangat cocok dikonversi ke React PWA. Bagian yang perlu dibuat dinamis adalah kalkulasi nutrisi berdasarkan porsi, status favorite, dan integrasi `Tambah ke Log` ke data harian pengguna.
