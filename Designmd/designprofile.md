# designprofile.md — NutriTrack Profile Detail Design Specification

## 1. Tujuan Dokumen

Dokumen ini adalah panduan implementasi tampilan halaman **Profile Detail** dari file `profiledetail.html` ke project lokal berbasis **React PWA + Tailwind CSS**.

Fokus utama halaman ini adalah menampilkan profil pengguna secara premium dan data-driven, dengan komposisi visual berupa:

- shared app shell dengan sidebar kiri dan top app bar,
- hero profile banner dengan avatar besar overlay,
- identitas pengguna dan status membership,
- bio dan tag minat/kebiasaan,
- health stats overview,
- personal records,
- badge collection,
- weekly consistency chart,
- contextual floating action button untuk share profile,
- micro-interaction hover, animated bar chart, dan responsive dashboard layout.

Halaman ini cocok diposisikan sebagai halaman **account/profile analytics** dalam aplikasi NutriTrack.

---

## 2. Karakter Visual Halaman

### 2.1 Kesan Utama

Halaman `profiledetail.html` memakai gaya visual **premium health dashboard** dengan pendekatan:

- **clean medical wellness UI** melalui background `#f8f9ff`,
- **glassmorphism card** untuk menjaga kesan modern,
- **bento-grid dashboard** untuk membagi informasi profil, statistik, pencapaian, dan konsistensi,
- **large profile identity area** dengan banner dan avatar overlapping,
- **achievement-driven UI** dengan badge, streak, personal record, dan weekly consistency chart,
- **energetic accent** melalui orange, purple, blue, dan green.

### 2.2 Pola Layout

Struktur halaman:

```txt
AppShell
├── Sidebar / Primary Navigation
├── Main Content
│   ├── Top App Bar
│   ├── Profile Hero Banner
│   ├── Bento Grid
│   │   ├── Bio Card
│   │   ├── Health Stats Card
│   │   ├── Personal Records Card
│   │   └── Badge Collection Card
│   ├── Weekly Consistency Chart
│   └── Share FAB
```

### 2.3 Nilai UI/UX yang Ditonjolkan

| Area | Fungsi UX | Kesan Visual |
|---|---|---|
| Hero banner | Menampilkan identitas pengguna secara kuat | Premium, personal, visual-first |
| Avatar besar | Menjadi focal point profil | Human-centered |
| PRO MEMBER badge | Status membership | Eksklusif, achievement-based |
| Bio tags | Menunjukkan persona pengguna | Social identity |
| Health Stats | Data kesehatan cepat | Analytical, measurable |
| Personal Records | Riwayat pencapaian | Motivational |
| Badge Collection | Gamification | Reward-driven |
| Weekly Consistency | Ringkasan kebiasaan | Progress tracking |
| Share FAB | Aksi kontekstual utama | Social sharing |

---

## 3. Design Token

### 3.1 Color Palette

Gunakan token warna ini di `tailwind.config.js` supaya konsisten dengan halaman NutriTrack lain.

```js
colors: {
  background: '#f8f9ff',
  surface: '#f8f9ff',
  'surface-bright': '#f8f9ff',
  'surface-container-lowest': '#ffffff',
  'surface-container-low': '#eff4ff',
  'surface-container': '#e5eeff',
  'surface-container-high': '#dce9ff',
  'surface-container-highest': '#d3e4fe',
  'surface-variant': '#d3e4fe',
  'surface-dim': '#cbdbf5',

  primary: '#006e2f',
  'primary-container': '#22c55e',
  'primary-fixed': '#6bff8f',
  'primary-fixed-dim': '#4ae176',
  'on-primary': '#ffffff',
  'on-primary-container': '#004b1e',
  'on-primary-fixed': '#002109',
  'on-primary-fixed-variant': '#005321',

  secondary: '#0058be',
  'secondary-container': '#2170e4',
  'secondary-fixed': '#d8e2ff',
  'secondary-fixed-dim': '#adc6ff',
  'on-secondary': '#ffffff',
  'on-secondary-container': '#fefcff',
  'on-secondary-fixed': '#001a42',
  'on-secondary-fixed-variant': '#004395',

  tertiary: '#9e4036',
  'tertiary-container': '#ff8b7c',
  'tertiary-fixed': '#ffdad5',
  'tertiary-fixed-dim': '#ffb4a9',
  'on-tertiary': '#ffffff',
  'on-tertiary-container': '#76231b',
  'on-tertiary-fixed': '#410001',
  'on-tertiary-fixed-variant': '#7f2a21',

  'on-background': '#0b1c30',
  'on-surface': '#0b1c30',
  'on-surface-variant': '#3d4a3d',
  outline: '#6d7b6c',
  'outline-variant': '#bccbb9',

  'mint-surface': '#f0fdf4',
  'energy-orange': '#f97316',
  'achievement-purple': '#a855f7',
  'warning-yellow': '#eab308',
  'error-red': '#ef4444',

  'inverse-surface': '#213145',
  'inverse-on-surface': '#eaf1ff',
  'inverse-primary': '#4ae176',

  'card-light': '#ffffff',
  'card-dark': '#1e293b',
  'bg-light': '#f8fafc',
  'bg-dark': '#0f172a'
}
```

### 3.2 Semantic Color Usage

| Token | Fungsi pada halaman Profile |
|---|---|
| `primary` | Brand, ring BMI, progress bar utama, tag bio, sidebar icon |
| `primary-container` | Active nav, avatar border, membership accent, badge text background |
| `energy-orange` | Edit/share action, weight goal accent, personal record highlight |
| `achievement-purple` | Pro member badge, badge collection, premium identity |
| `secondary` | Badge gradient dan accent statistik |
| `warning-yellow` | Badge reward / achievement warm accent |
| `surface-container` | Card inner background, inactive chart bars |
| `on-surface` | Teks utama |
| `on-surface-variant` | Teks deskripsi dan metadata |
| `outline-variant` | Border ringan pada card dan divider |

---

## 4. Typography

### 4.1 Font Stack

File HTML memakai:

- **Poppins** untuk headline,
- **Nunito** untuk body,
- **Inter** untuk label,
- **JetBrains Mono** untuk metric/numeric value.

```js
fontFamily: {
  'headline-md': ['Poppins'],
  'headline-lg': ['Poppins'],
  'headline-xl': ['Poppins'],
  'headline-lg-mobile': ['Poppins'],
  'body-md': ['Nunito'],
  'body-lg': ['Nunito'],
  'label-sm': ['Inter'],
  'label-md': ['Inter'],
  'metrics-mono': ['JetBrains Mono']
}
```

### 4.2 Type Scale

```js
fontSize: {
  'headline-xl': ['48px', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '700' }],
  'headline-lg': ['32px', { lineHeight: '1.25', fontWeight: '600' }],
  'headline-md': ['24px', { lineHeight: '1.3', fontWeight: '600' }],
  'headline-lg-mobile': ['28px', { lineHeight: '1.25', fontWeight: '600' }],
  'body-lg': ['18px', { lineHeight: '1.6', fontWeight: '400' }],
  'body-md': ['16px', { lineHeight: '1.5', fontWeight: '400' }],
  'label-md': ['14px', { lineHeight: '1.4', letterSpacing: '0.01em', fontWeight: '500' }],
  'label-sm': ['12px', { lineHeight: '1.4', letterSpacing: '0.05em', fontWeight: '600' }],
  'metrics-mono': ['16px', { lineHeight: '1', fontWeight: '500' }]
}
```

### 4.3 Rekomendasi Penggunaan

| Elemen | Class rekomendasi |
|---|---|
| Nama profil di hero | `font-headline-lg text-headline-lg` |
| Section title | `font-headline-md text-headline-md` |
| Body bio | `font-body-md text-on-surface-variant leading-relaxed` |
| Label statistik | `font-label-sm text-label-sm uppercase tracking-wider` |
| Nilai numerik | `font-metrics-mono` |
| Badge label | `text-[10px] font-bold tracking-widest` |

---

## 5. Spacing, Radius, dan Shadow

### 5.1 Spacing Token

```js
spacing: {
  unit: '4px',
  'gutter-mobile': '16px',
  'gutter-desktop': '24px',
  'card-padding': '20px',
  'section-gap': '32px',
  'margin-page': '24px'
}
```

### 5.2 Radius Pattern

| Elemen | Radius |
|---|---|
| Sidebar logo box | `rounded-xl` |
| Sidebar nav | `rounded-xl` |
| Main glass card | `rounded-[2rem]` |
| Large hero banner | `rounded-[2rem]` |
| Profile avatar | `rounded-[2.5rem]` |
| Inner stat card | `rounded-[1.5rem]` |
| FAB | `rounded-full` |
| Badge circle | `rounded-full` |

### 5.3 Shadow Pattern

```css
.glass-card {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(226, 232, 240, 0.5);
  box-shadow: 0 10px 25px -5px rgba(0, 110, 47, 0.05);
}
```

Hover enhancement:

```css
.glass-card:hover {
  box-shadow: 0 20px 40px -10px rgba(0, 110, 47, 0.1);
  border-color: rgba(0, 110, 47, 0.2);
}
```

---

## 6. App Shell Layout

### 6.1 Sidebar

Sidebar konsisten dengan halaman dashboard lain.

Karakteristik:

- fixed left,
- width default `w-64`,
- collapse ke `72px`,
- hide penuh dengan `translateX(-110%)`,
- active nav pada menu `Profile`,
- upgrade card di area bawah,
- help center dan logout di footer sidebar.

Tailwind base:

```tsx
<aside
  id="sidebar"
  role="navigation"
  aria-label="Primary navigation"
  className="h-screen w-64 fixed left-0 top-0 z-50 bg-surface-container-low border-r border-outline-variant/20 shadow-md flex flex-col py-margin-page px-4 hidden xl:flex"
>
  {/* Sidebar content */}
</aside>
```

Active nav item:

```tsx
<NavItem
  href="/profile"
  icon="person"
  label="Profile"
  active
/>
```

Active style:

```txt
bg-primary-container text-on-primary-container rounded-xl font-bold shadow-sm
```

Inactive style:

```txt
text-on-surface-variant hover:bg-surface-variant/40 hover:text-on-surface transition-all rounded-xl
```

### 6.2 Sidebar Collapse CSS

```css
aside#sidebar {
  transition: width 0.22s ease, transform 0.22s ease;
}

aside#sidebar.collapsed {
  width: 72px;
}

aside#sidebar .nav-label {
  display: inline;
  transition: opacity 0.15s ease;
  white-space: nowrap;
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

### 6.3 Top App Bar

Fungsi:

- menampilkan judul halaman `Profile Detail`,
- subtitle nama user,
- search input,
- notification/settings icon,
- avatar mini.

Komponen:

```tsx
<header className="sticky top-0 z-40 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/30 px-gutter-desktop h-16 flex items-center justify-between">
  <div>
    <h2 className="font-headline-md text-headline-md font-bold text-primary">Profile Detail</h2>
    <p className="text-label-md text-on-surface-variant/60">Alex Rivera</p>
  </div>

  <div className="flex items-center gap-6">
    <SearchInput placeholder="Search metrics, meals, or friends..." />
    <IconButton icon="notifications" />
    <IconButton icon="settings" />
    <MiniProfile />
  </div>
</header>
```

---

## 7. Profile Hero Section

### 7.1 Struktur Visual

Hero profile adalah elemen paling dominan.

Komposisi:

- banner image tinggi `h-72`,
- rounded `2rem`,
- overlay gradient hitam dari bawah,
- avatar besar `w-44 h-44` berada overlap di bawah banner,
- nama dan membership badge di atas banner bagian bawah,
- tombol `Edit Profile` di kanan bawah.

### 7.2 Implementasi React

```tsx
function ProfileHero({ user }: { user: UserProfile }) {
  return (
    <section className="relative">
      <div className="h-72 w-full rounded-[2rem] overflow-hidden relative shadow-lg">
        <img
          src={user.bannerUrl}
          alt="Profile Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      </div>

      <div className="absolute -bottom-12 left-10 flex items-end gap-6">
        <div className="w-44 h-44 rounded-[2.5rem] overflow-hidden border-4 border-white shadow-2xl relative z-10 bg-surface">
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="mb-6 space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="font-headline-lg text-headline-lg text-white drop-shadow-md">
              {user.name}
            </h1>
            <ProBadge />
          </div>

          <p className="text-white/90 font-body-md flex items-center gap-2 drop-shadow-sm">
            <span className="material-symbols-outlined text-[18px]">location_on</span>
            {user.location} • Joined {user.joinedAt}
          </p>
        </div>
      </div>

      <div className="absolute bottom-6 right-10">
        <button className="bg-primary text-on-primary px-8 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-xl hover:scale-105 active:scale-95 transition-all">
          <span className="material-symbols-outlined text-[20px]">edit</span>
          Edit Profile
        </button>
      </div>
    </section>
  );
}
```

### 7.3 PRO Member Badge

```tsx
function ProBadge() {
  return (
    <span className="px-3 py-1 bg-achievement-purple/20 backdrop-blur-md border border-achievement-purple/40 text-achievement-purple rounded-full text-[10px] font-bold tracking-widest flex items-center gap-1 shadow-sm">
      <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
        verified
      </span>
      PRO MEMBER
    </span>
  );
}
```

### 7.4 Mobile Adjustment

Untuk mobile, hero perlu disederhanakan agar tidak overflow:

```tsx
<div className="absolute -bottom-10 left-4 right-4 flex flex-col sm:flex-row sm:items-end gap-4">
  <div className="w-28 h-28 sm:w-44 sm:h-44 rounded-[2rem] sm:rounded-[2.5rem]" />
</div>
```

Rekomendasi:

- gunakan `mt-20` setelah hero pada mobile,
- tombol edit dipindahkan ke bawah nama jika viewport kecil,
- jangan pakai teks putih di luar area gradient.

---

## 8. Bento Grid Layout

File HTML memakai `.bento-grid`:

```css
.bento-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 24px;
}
```

Tailwind equivalent:

```tsx
<div className="grid grid-cols-12 gap-6 mt-16">
  <BioCard className="col-span-12 lg:col-span-4" />
  <HealthStatsCard className="col-span-12 lg:col-span-8" />
  <PersonalRecordsCard className="col-span-12 lg:col-span-5" />
  <BadgeCollectionCard className="col-span-12 lg:col-span-7" />
</div>
```

Responsive rule:

- Mobile: semua `col-span-12`, stacked vertical.
- Desktop: bio 4 kolom, stats 8 kolom, records 5 kolom, badges 7 kolom.

---

## 9. Bio Card

### 9.1 Fungsi

Menampilkan deskripsi pengguna dan identitas lifestyle.

Elemen:

- title dengan icon `psychology`,
- paragraf bio,
- tag/hobby chip.

### 9.2 Implementasi

```tsx
function BioCard({ bio, tags }: { bio: string; tags: string[] }) {
  return (
    <section className="col-span-12 lg:col-span-4 glass-card p-8 rounded-[2rem] hover:-translate-y-1 transition-transform">
      <h3 className="font-headline-md text-headline-md mb-5 flex items-center gap-3">
        <span className="material-symbols-outlined text-primary text-3xl">psychology</span>
        Bio
      </h3>

      <p className="font-body-md text-on-surface-variant leading-relaxed">
        {bio}
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-4 py-1.5 bg-mint-surface border border-primary/10 text-primary rounded-xl text-sm font-label-md"
          >
            #{tag}
          </span>
        ))}
      </div>
    </section>
  );
}
```

### 9.3 UX Notes

- Tag harus clickable bila nanti fitur komunitas/profile discovery sudah aktif.
- Batasi tag maksimal 5 agar card tidak terlalu panjang.
- Tambahkan `line-clamp` jika bio terlalu panjang.

---

## 10. Health Stats at a Glance

### 10.1 Fungsi

Menampilkan ringkasan kesehatan pengguna:

- BMI gauge,
- current weight vs goal,
- progress bar weight goal,
- progress status per bulan,
- goal completion percentage.

### 10.2 BMI Circular Gauge

HTML menggunakan SVG circle dengan:

- circle background `surface-container`,
- circle progress `primary`,
- radius `48`,
- stroke width `10`,
- stroke dasharray `301.6`,
- stroke dashoffset `75.4`,
- nilai BMI `22.4` di tengah.

Rumus umum SVG circle:

```txt
circumference = 2 * π * radius
progressOffset = circumference - (progressPercent / 100) * circumference
```

Untuk radius 48:

```txt
circumference ≈ 301.6
```

### 10.3 BMI Gauge Component

```tsx
function BmiGauge({ value, progress = 75 }: { value: number; progress?: number }) {
  const radius = 48;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg className="w-28 h-28 -rotate-90">
        <circle
          className="text-surface-container"
          cx="56"
          cy="56"
          r={radius}
          fill="transparent"
          stroke="currentColor"
          strokeWidth="10"
        />
        <circle
          className="text-primary transition-all duration-700"
          cx="56"
          cy="56"
          r={radius}
          fill="transparent"
          stroke="currentColor"
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <span className="absolute font-metrics-mono text-headline-xl text-primary">
        {value.toFixed(1)}
      </span>
    </div>
  );
}
```

### 10.4 Weight vs Goal Component

```tsx
function WeightGoalCard({ current, goal, progress }: WeightGoalProps) {
  return (
    <div className="bg-surface-container/40 p-6 rounded-[1.5rem] border border-outline-variant/10 col-span-1 md:col-span-2">
      <p className="font-label-sm text-label-sm text-on-surface-variant mb-6 uppercase tracking-wider">
        Weight vs Goal
      </p>

      <div className="space-y-6">
        <div>
          <div className="flex justify-between mb-2">
            <span className="font-bold text-lg">Current: {current} kg</span>
            <span className="font-bold text-lg text-energy-orange">Goal: {goal} kg</span>
          </div>

          <div className="w-full bg-surface-container rounded-full h-4 overflow-hidden">
            <div
              className="bg-gradient-to-r from-primary to-energy-orange h-full rounded-full transition-all duration-700"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="flex justify-between items-center pt-4">
          <div className="flex items-center gap-3 bg-white/50 px-4 py-2 rounded-xl">
            <span className="material-symbols-outlined text-primary">trending_down</span>
            <span className="font-label-md font-bold">-2.5kg this month</span>
          </div>

          <span className="font-label-md bg-primary-container/20 text-on-primary-container px-4 py-1.5 rounded-full font-bold">
            {progress}% of Goal
          </span>
        </div>
      </div>
    </div>
  );
}
```

### 10.5 Scientific UX Note

Untuk aplikasi nutrisi/kesehatan, tampilkan BMI dengan hati-hati:

- BMI cocok sebagai indikator populasi, bukan satu-satunya indikator kesehatan individu.
- Tambahkan tooltip: `BMI is an estimate and should be interpreted with activity level, body composition, and medical context.`
- Untuk akurasi lebih baik, tambahkan metric tambahan: body fat %, waist circumference, activity level, dan trend weight 7/30 hari.

---

## 11. Personal Records Card

### 11.1 Fungsi

Menampilkan pencapaian personal:

- longest streak,
- calories burned,
- average daily activity.

### 11.2 Visual Pattern

Card utama:

```txt
border-l-8 border-energy-orange
rounded-[2rem]
glass-card
```

Item record:

```txt
bg-surface-container/40
hover:bg-surface-container
rounded-[1.5rem]
icon box 56x56
```

### 11.3 Implementasi

```tsx
const records = [
  {
    label: 'Longest Streak',
    value: '42 Days',
    icon: 'local_fire_department',
    color: 'energy-orange'
  },
  {
    label: 'Calories Burned',
    value: '1,240 kcal',
    icon: 'bolt',
    color: 'primary'
  },
  {
    label: 'Avg Daily Activity',
    value: '78 Minutes',
    icon: 'fitness_center',
    color: 'achievement-purple'
  }
];
```

```tsx
function PersonalRecordsCard() {
  return (
    <section className="col-span-12 lg:col-span-5 glass-card p-8 rounded-[2rem] shadow-sm border-l-8 border-energy-orange hover:-translate-y-1 transition-transform">
      <h3 className="font-headline-md text-headline-md flex items-center gap-3 mb-8">
        <span className="material-symbols-outlined text-energy-orange text-3xl">military_tech</span>
        Personal Records
      </h3>

      <div className="space-y-4">
        {records.map((record) => (
          <div
            key={record.label}
            className="flex items-center gap-5 bg-surface-container/40 p-4 rounded-[1.5rem] hover:bg-surface-container transition-colors"
          >
            <div className={`w-14 h-14 bg-${record.color}/10 rounded-2xl flex items-center justify-center text-${record.color}`}>
              <span className="material-symbols-outlined text-3xl">{record.icon}</span>
            </div>
            <div className="flex-1">
              <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">
                {record.label}
              </p>
              <p className="font-headline-md text-2xl text-on-surface">
                {record.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
```

> Catatan Tailwind: dynamic class seperti `text-${record.color}` tidak otomatis terscan. Gunakan mapping class eksplisit.

```tsx
const colorClassMap = {
  orange: {
    bg: 'bg-energy-orange/10',
    text: 'text-energy-orange'
  },
  primary: {
    bg: 'bg-primary/10',
    text: 'text-primary'
  },
  purple: {
    bg: 'bg-achievement-purple/10',
    text: 'text-achievement-purple'
  }
};
```

---

## 12. Badge Collection

### 12.1 Fungsi

Menampilkan gamification achievement yang sudah diperoleh dan badge yang masih locked.

Elemen:

- section title dengan icon `stars`,
- tombol `View All`,
- grid badge 4 sampai 5 kolom,
- badge circle gradient,
- icon putih,
- tooltip hover,
- locked badge dengan dashed border.

### 12.2 Badge Animation

HTML memakai transition custom:

```css
.achievement-badge {
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.achievement-badge:hover {
  transform: translateY(-8px) scale(1.1);
}
```

Tailwind equivalent:

```txt
transition-transform duration-300 hover:-translate-y-2 hover:scale-110
```

Untuk efek bounce lebih mirip, tambahkan custom timing:

```css
.ease-badge {
  transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

### 12.3 Badge Data Model

```ts
export type AchievementBadge = {
  id: string;
  title: string;
  tooltip: string;
  icon: string;
  gradient: 'orange-yellow' | 'green' | 'purple-blue' | 'blue-orange';
  locked?: boolean;
};
```

Contoh data:

```ts
export const badges: AchievementBadge[] = [
  {
    id: 'early-bird',
    title: 'Early Bird',
    tooltip: 'Early Riser (10 Days)',
    icon: 'workspace_premium',
    gradient: 'orange-yellow'
  },
  {
    id: 'veggies',
    title: 'Veggies',
    tooltip: 'Green Giant (50 Meals)',
    icon: 'eco',
    gradient: 'green'
  },
  {
    id: 'master',
    title: 'Master',
    tooltip: 'Master (100 Days)',
    icon: 'military_tech',
    gradient: 'purple-blue'
  },
  {
    id: 'hydrated',
    title: 'Hydrated',
    tooltip: 'Hydration King',
    icon: 'water_drop',
    gradient: 'blue-orange'
  },
  {
    id: 'locked-1',
    title: 'Locked',
    tooltip: 'Complete more goals to unlock',
    icon: 'lock',
    gradient: 'green',
    locked: true
  }
];
```

### 12.4 Badge Component

```tsx
function BadgeCollectionCard({ badges }: { badges: AchievementBadge[] }) {
  return (
    <section className="col-span-12 lg:col-span-7 glass-card p-8 rounded-[2rem] hover:-translate-y-1 transition-transform">
      <div className="flex items-center justify-between mb-10">
        <h3 className="font-headline-md text-headline-md flex items-center gap-3">
          <span className="material-symbols-outlined text-achievement-purple text-3xl">stars</span>
          Badge Collection
        </h3>
        <button className="text-primary font-bold text-label-md hover:underline bg-primary-container/10 px-4 py-1.5 rounded-full">
          View All
        </button>
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-5 gap-8">
        {badges.map((badge) => (
          <AchievementBadgeItem key={badge.id} badge={badge} />
        ))}
      </div>
    </section>
  );
}
```

```tsx
function AchievementBadgeItem({ badge }: { badge: AchievementBadge }) {
  if (badge.locked) {
    return (
      <div className="flex flex-col items-center gap-3 opacity-30">
        <div className="w-20 h-20 rounded-full border-2 border-dashed border-outline flex items-center justify-center">
          <span className="material-symbols-outlined text-outline text-3xl">lock</span>
        </div>
        <p className="font-bold text-xs text-center text-on-surface-variant">Locked</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <div className={`achievement-badge w-20 h-20 rounded-full ${gradientClassMap[badge.gradient]} flex items-center justify-center shadow-lg relative group cursor-help`}>
        <span className="material-symbols-outlined text-white text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
          {badge.icon}
        </span>
        <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 bg-on-surface text-white text-[11px] px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 shadow-xl">
          {badge.tooltip}
        </div>
      </div>
      <p className="font-bold text-xs text-center text-on-surface">{badge.title}</p>
    </div>
  );
}
```

Gradient mapping:

```ts
const gradientClassMap = {
  'orange-yellow': 'bg-gradient-to-br from-energy-orange to-warning-yellow',
  green: 'bg-gradient-to-br from-primary to-primary-fixed-dim',
  'purple-blue': 'bg-gradient-to-br from-achievement-purple to-secondary',
  'blue-orange': 'bg-gradient-to-br from-blue-400 to-energy-orange'
};
```

---

## 13. Weekly Consistency Chart

### 13.1 Fungsi

Menampilkan progres completion goal 7 hari terakhir.

Elemen:

- title `Weekly Consistency`,
- subtitle,
- legend `Goal Met` dan `Missed`,
- bar chart sederhana 7 hari,
- tinggi bar dikontrol inline style,
- animasi height pada load.

### 13.2 Data Model

```ts
export type WeeklyConsistencyItem = {
  day: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';
  value: number; // 0-100
  status: 'met' | 'missed' | 'highlight';
};
```

Contoh data:

```ts
export const weeklyConsistency: WeeklyConsistencyItem[] = [
  { day: 'Mon', value: 80, status: 'met' },
  { day: 'Tue', value: 95, status: 'met' },
  { day: 'Wed', value: 40, status: 'missed' },
  { day: 'Thu', value: 75, status: 'met' },
  { day: 'Fri', value: 90, status: 'met' },
  { day: 'Sat', value: 100, status: 'highlight' },
  { day: 'Sun', value: 65, status: 'met' }
];
```

### 13.3 Chart Component

```tsx
function WeeklyConsistencyChart({ data }: { data: WeeklyConsistencyItem[] }) {
  return (
    <section className="mt-section-gap glass-card rounded-[2.5rem] p-8 shadow-sm">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h3 className="font-headline-md text-headline-md text-on-surface">
            Weekly Consistency
          </h3>
          <p className="text-label-md text-on-surface-variant">
            Goal completion over the last 7 days
          </p>
        </div>

        <div className="flex gap-6">
          <LegendDot color="bg-primary" label="Goal Met" />
          <LegendDot color="bg-surface-container" label="Missed" />
        </div>
      </div>

      <div className="flex justify-between items-end h-56 gap-4 px-4">
        {data.map((item, index) => (
          <ConsistencyBar key={item.day} item={item} index={index} />
        ))}
      </div>
    </section>
  );
}
```

```tsx
function ConsistencyBar({ item, index }: { item: WeeklyConsistencyItem; index: number }) {
  const colorClass = {
    met: 'bg-primary/20 hover:bg-primary',
    missed: 'bg-surface-container/50 hover:bg-surface-container',
    highlight: 'bg-energy-orange/40 hover:bg-energy-orange'
  }[item.status];

  return (
    <div className="flex-1 flex flex-col items-center gap-4 group">
      <div
        className={`w-full ${colorClass} rounded-t-2xl transition-all cursor-pointer relative shadow-sm animate-bar-grow`}
        style={{
          height: `${item.value}%`,
          animationDelay: `${index * 150}ms`
        }}
        title={`${item.day}: ${item.value}%`}
      />
      <span className={`font-bold text-sm ${item.status === 'highlight' ? 'text-energy-orange' : 'text-on-surface-variant'}`}>
        {item.day}
      </span>
    </div>
  );
}
```

### 13.4 Bar Grow Animation

```css
@keyframes barGrow {
  from {
    transform: scaleY(0);
    transform-origin: bottom;
  }
  to {
    transform: scaleY(1);
    transform-origin: bottom;
  }
}

.animate-bar-grow {
  animation: barGrow 1.2s cubic-bezier(0.16, 1, 0.3, 1) both;
}
```

Catatan implementasi:

- Lebih baik pakai transform `scaleY` daripada mengubah `height` langsung karena lebih smooth.
- Tambahkan `motion-reduce:animate-none` untuk aksesibilitas.

---

## 14. Share Floating Action Button

### 14.1 Fungsi

Aksi utama halaman profile adalah share profile.

Visual:

- fixed bottom-right,
- warna orange,
- shadow orange besar,
- icon `share`,
- tooltip muncul di kiri saat hover,
- icon rotate sedikit saat hover.

### 14.2 Implementasi

```tsx
function ShareProfileFab() {
  return (
    <button className="fixed bottom-10 right-10 w-16 h-16 bg-energy-orange text-white rounded-full shadow-[0_20px_50px_rgba(249,115,22,0.3)] flex items-center justify-center group hover:scale-110 active:scale-95 transition-all z-50">
      <span className="material-symbols-outlined text-3xl group-hover:rotate-12 transition-transform">
        share
      </span>
      <span className="absolute right-24 bg-on-surface text-white px-5 py-2 rounded-xl text-sm font-bold opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap -translate-x-4 group-hover:translate-x-0">
        Share Profile
      </span>
    </button>
  );
}
```

### 14.3 PWA Enhancement

Jika browser mendukung Web Share API:

```ts
async function shareProfile(userId: string) {
  const shareData = {
    title: 'NutriTrack Profile',
    text: 'Check out my NutriTrack progress profile.',
    url: `${window.location.origin}/profile/${userId}`
  };

  if (navigator.share) {
    await navigator.share(shareData);
  } else {
    await navigator.clipboard.writeText(shareData.url);
    // show toast: Link copied
  }
}
```

---

## 15. Animation & Micro-Interaction Specification

### 15.1 Card Hover

Original behavior:

- hover card mengubah shadow,
- border menjadi green-transparent,
- transition cubic-bezier.

CSS:

```css
.profile-card-hover {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.profile-card-hover:hover {
  box-shadow: 0 20px 40px -10px rgba(0, 110, 47, 0.1);
  border-color: rgba(0, 110, 47, 0.2);
  transform: translateY(-4px);
}
```

Tailwind:

```txt
hover:-translate-y-1 hover:shadow-xl transition-all duration-300
```

### 15.2 Badge Hover

```css
.achievement-badge {
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.achievement-badge:hover {
  transform: translateY(-8px) scale(1.1);
}
```

### 15.3 Avatar & Hero Interaction

Tambahkan optional subtle interaction:

```txt
avatar: hover:scale-[1.03] transition-transform duration-300
banner: group-hover:scale-105 transition-transform duration-700
```

### 15.4 Button Press

```txt
hover:scale-105 active:scale-95 transition-all
```

### 15.5 Reduced Motion

Tambahkan ke CSS global:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 16. Recommended React Folder Structure

```txt
src/
├── app/
│   ├── App.tsx
│   └── routes.tsx
├── components/
│   ├── app-shell/
│   │   ├── AppShell.tsx
│   │   ├── Sidebar.tsx
│   │   ├── TopAppBar.tsx
│   │   ├── NavItem.tsx
│   │   └── UpgradeCard.tsx
│   ├── profile/
│   │   ├── ProfileHero.tsx
│   │   ├── ProBadge.tsx
│   │   ├── BioCard.tsx
│   │   ├── HealthStatsCard.tsx
│   │   ├── BmiGauge.tsx
│   │   ├── WeightGoalCard.tsx
│   │   ├── PersonalRecordsCard.tsx
│   │   ├── BadgeCollectionCard.tsx
│   │   ├── AchievementBadgeItem.tsx
│   │   ├── WeeklyConsistencyChart.tsx
│   │   └── ShareProfileFab.tsx
│   └── ui/
│       ├── GlassCard.tsx
│       ├── IconButton.tsx
│       ├── SearchInput.tsx
│       └── Tooltip.tsx
├── data/
│   └── profile.mock.ts
├── pages/
│   └── ProfileDetailPage.tsx
├── styles/
│   └── app-shell.css
└── types/
    └── profile.ts
```

---

## 17. Page Composition Example

```tsx
import { ProfileHero } from '@/components/profile/ProfileHero';
import { BioCard } from '@/components/profile/BioCard';
import { HealthStatsCard } from '@/components/profile/HealthStatsCard';
import { PersonalRecordsCard } from '@/components/profile/PersonalRecordsCard';
import { BadgeCollectionCard } from '@/components/profile/BadgeCollectionCard';
import { WeeklyConsistencyChart } from '@/components/profile/WeeklyConsistencyChart';
import { ShareProfileFab } from '@/components/profile/ShareProfileFab';
import { mockProfile } from '@/data/profile.mock';

export default function ProfileDetailPage() {
  const user = mockProfile;

  return (
    <AppShell
      title="Profile Detail"
      subtitle={user.name}
      searchPlaceholder="Search metrics, meals, or friends..."
      activePath="/profile"
    >
      <div className="p-8 max-w-[1400px] mx-auto space-y-section-gap">
        <ProfileHero user={user} />

        <div className="grid grid-cols-12 gap-6 mt-16">
          <BioCard bio={user.bio} tags={user.tags} />
          <HealthStatsCard stats={user.healthStats} />
          <PersonalRecordsCard records={user.records} />
          <BadgeCollectionCard badges={user.badges} />
        </div>

        <WeeklyConsistencyChart data={user.weeklyConsistency} />
      </div>

      <ShareProfileFab userId={user.id} />
    </AppShell>
  );
}
```

---

## 18. Data Model

### 18.1 Profile Type

```ts
export type UserProfile = {
  id: string;
  name: string;
  membership: 'free' | 'pro' | 'premium';
  location: string;
  joinedAt: string;
  avatarUrl: string;
  bannerUrl: string;
  bio: string;
  tags: string[];
  healthStats: HealthStats;
  records: PersonalRecord[];
  badges: AchievementBadge[];
  weeklyConsistency: WeeklyConsistencyItem[];
};
```

### 18.2 Health Stats

```ts
export type HealthStats = {
  bmi: number;
  bmiLabel: string;
  bmiProgress: number;
  currentWeightKg: number;
  goalWeightKg: number;
  monthlyChangeKg: number;
  goalProgress: number;
};
```

### 18.3 Personal Record

```ts
export type PersonalRecord = {
  id: string;
  label: string;
  value: string;
  icon: string;
  tone: 'orange' | 'primary' | 'purple' | 'secondary';
};
```

### 18.4 Mock Data

```ts
export const mockProfile: UserProfile = {
  id: 'alex-rivera',
  name: 'Alex Rivera',
  membership: 'pro',
  location: 'San Francisco, CA',
  joinedAt: 'Jan 2023',
  avatarUrl: '/images/profile/alex-avatar.jpg',
  bannerUrl: '/images/profile/alex-banner.jpg',
  bio: 'Nutrition enthusiast and marathon runner. Focused on high-protein plant-based diets and optimizing recovery times. Currently training for the Big Sur International Marathon. Believe in the power of data to drive transformation.',
  tags: ['MarathonRunner', 'PlantBased', 'BioHacking'],
  healthStats: {
    bmi: 22.4,
    bmiLabel: 'Healthy Range',
    bmiProgress: 75,
    currentWeightKg: 76.5,
    goalWeightKg: 74,
    monthlyChangeKg: -2.5,
    goalProgress: 82
  },
  records: [
    { id: 'streak', label: 'Longest Streak', value: '42 Days', icon: 'local_fire_department', tone: 'orange' },
    { id: 'calories', label: 'Calories Burned', value: '1,240 kcal', icon: 'bolt', tone: 'primary' },
    { id: 'activity', label: 'Avg Daily Activity', value: '78 Minutes', icon: 'fitness_center', tone: 'purple' }
  ],
  badges: badges,
  weeklyConsistency: weeklyConsistency
};
```

---

## 19. Tailwind Config Minimum

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#f8f9ff',
        surface: '#f8f9ff',
        'surface-container-low': '#eff4ff',
        'surface-container': '#e5eeff',
        'surface-container-high': '#dce9ff',
        'surface-container-highest': '#d3e4fe',
        'surface-variant': '#d3e4fe',
        primary: '#006e2f',
        'primary-container': '#22c55e',
        'primary-fixed-dim': '#4ae176',
        'on-primary': '#ffffff',
        'on-primary-container': '#004b1e',
        secondary: '#0058be',
        'on-surface': '#0b1c30',
        'on-surface-variant': '#3d4a3d',
        'outline-variant': '#bccbb9',
        'mint-surface': '#f0fdf4',
        'energy-orange': '#f97316',
        'achievement-purple': '#a855f7',
        'warning-yellow': '#eab308',
        'error-red': '#ef4444'
      },
      spacing: {
        'gutter-mobile': '16px',
        'gutter-desktop': '24px',
        'card-padding': '20px',
        'section-gap': '32px',
        'margin-page': '24px'
      },
      fontFamily: {
        'headline-md': ['Poppins'],
        'headline-lg': ['Poppins'],
        'headline-xl': ['Poppins'],
        'body-md': ['Nunito'],
        'body-lg': ['Nunito'],
        'label-sm': ['Inter'],
        'label-md': ['Inter'],
        'metrics-mono': ['JetBrains Mono']
      }
    }
  },
  plugins: []
};
```

---

## 20. Global CSS Recommended

```css
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800;900&family=Nunito:wght@400;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .glass-card {
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(226, 232, 240, 0.5);
    box-shadow: 0 10px 25px -5px rgba(0, 110, 47, 0.05);
  }

  .profile-card-hover {
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .profile-card-hover:hover {
    box-shadow: 0 20px 40px -10px rgba(0, 110, 47, 0.1);
    border-color: rgba(0, 110, 47, 0.2);
    transform: translateY(-4px);
  }

  .achievement-badge {
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .achievement-badge:hover {
    transform: translateY(-8px) scale(1.1);
  }
}

.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
  vertical-align: middle;
}
```

---

## 21. PWA Implementation Notes

### 21.1 Profile Offline Strategy

Untuk halaman profile, cache data yang aman dan tidak terlalu sensitif:

- nama display,
- avatar thumbnail,
- badge summary,
- weekly consistency summary,
- cached profile UI shell.

Hindari menyimpan data sangat sensitif tanpa enkripsi seperti:

- data medis detail,
- alamat lengkap,
- catatan kesehatan pribadi,
- token autentikasi dalam localStorage.

### 21.2 Workbox Cache Rule

```ts
VitePWA({
  registerType: 'autoUpdate',
  workbox: {
    runtimeCaching: [
      {
        urlPattern: ({ request }) => request.destination === 'image',
        handler: 'CacheFirst',
        options: {
          cacheName: 'profile-images',
          expiration: {
            maxEntries: 80,
            maxAgeSeconds: 60 * 60 * 24 * 14
          }
        }
      },
      {
        urlPattern: ({ url }) => url.pathname.startsWith('/api/profile'),
        handler: 'NetworkFirst',
        options: {
          cacheName: 'profile-api',
          networkTimeoutSeconds: 3,
          expiration: {
            maxEntries: 20,
            maxAgeSeconds: 60 * 60
          }
        }
      }
    ]
  }
});
```

---

## 22. Accessibility Checklist

| Area | Rekomendasi |
|---|---|
| Profile image | Gunakan alt yang spesifik, contoh `Profile photo of Alex Rivera` |
| Banner image | Jika dekoratif, gunakan `alt=""`; jika bermakna, pakai deskripsi singkat |
| Edit button | Tambahkan `aria-label="Edit profile"` |
| Share FAB | Tambahkan `aria-label="Share profile"` |
| Badge tooltip | Jangan hanya mengandalkan hover; tambahkan `aria-label` |
| Chart bar | Tambahkan `title` atau `aria-label` per bar |
| Sidebar collapse | Sinkronkan `aria-expanded` |
| Active nav | Pakai `aria-current="page"` |
| Color-only data | Gunakan label teks selain warna, contoh `Goal Met`, `Missed` |

Contoh accessible badge:

```tsx
<button
  className="achievement-badge ..."
  aria-label={`${badge.title}: ${badge.tooltip}`}
>
  <span className="material-symbols-outlined" aria-hidden="true">
    {badge.icon}
  </span>
</button>
```

---

## 23. Implementation Priority

### Phase 1 — Core Layout

1. Buat `AppShell`, `Sidebar`, dan `TopAppBar` reusable.
2. Buat `ProfileDetailPage` dengan layout `max-w-[1400px]`.
3. Implementasikan `ProfileHero` responsive.
4. Tambahkan token warna dan font di Tailwind.

### Phase 2 — Profile Components

1. Buat `BioCard`.
2. Buat `HealthStatsCard` + `BmiGauge`.
3. Buat `PersonalRecordsCard`.
4. Buat `BadgeCollectionCard`.
5. Buat `WeeklyConsistencyChart`.

### Phase 3 — Interaction

1. Tambahkan hover pada card dan badge.
2. Tambahkan bar chart grow animation.
3. Tambahkan share FAB dengan Web Share API fallback.
4. Tambahkan tooltip badge.

### Phase 4 — Data & PWA

1. Integrasikan data dari API `/api/profile/:id`.
2. Tambahkan loading skeleton.
3. Tambahkan offline cache untuk profile image dan profile summary.
4. Tambahkan fallback saat image gagal dimuat.

### Phase 5 — Quality Optimization

1. Ganti remote image dengan local/static optimized assets.
2. Gunakan lazy loading untuk image.
3. Validasi responsive layout mobile/tablet.
4. Tambahkan reduced motion handling.
5. Tambahkan tests untuk komponen kritikal.

---

## 24. Perbaikan dari HTML Asli Saat Migrasi React

| Masalah di HTML statis | Solusi React |
|---|---|
| Inline script DOM manipulation | Pindahkan ke state, hook, atau CSS animation |
| Inline height chart bar | Gunakan data-driven component dan CSS variable |
| Remote image langsung | Buat asset layer/fallback image |
| Tooltip hanya hover | Tambahkan accessible tooltip atau aria-label |
| Data profil hardcoded | Gunakan `UserProfile` model dan API response |
| Sidebar logic duplikatif antar halaman | Jadikan `AppShell` reusable |
| Color class dynamic berisiko tidak terbaca Tailwind | Pakai mapping class eksplisit |
| BMI tanpa konteks | Tambahkan helper/tooltip interpretasi |

---

## 25. Contoh Route React

```tsx
import { createBrowserRouter } from 'react-router-dom';
import ProfileDetailPage from '@/pages/ProfileDetailPage';

export const router = createBrowserRouter([
  {
    path: '/profile',
    element: <ProfileDetailPage />
  },
  {
    path: '/profile/:userId',
    element: <ProfileDetailPage />
  }
]);
```

---

## 26. Final Visual Direction

Halaman Profile Detail sebaiknya dipertahankan sebagai halaman **premium personal analytics** dengan komposisi:

- hero banner besar untuk identitas,
- avatar overlap sebagai focal point,
- bento analytics untuk data kesehatan,
- gamification untuk engagement,
- bar chart mingguan untuk habit tracking,
- FAB orange untuk aksi sosial.

Kunci kualitas implementasi React:

1. **Pisahkan layout shell dari konten profile.**
2. **Jadikan semua statistik berbasis data model.**
3. **Gunakan component mapping untuk record dan badge.**
4. **Hindari DOM manipulation langsung.**
5. **Optimalkan mobile hero karena area overlap besar rawan pecah.**
6. **Tambahkan aksesibilitas pada badge, chart, dan tombol share.**

Dengan struktur ini, halaman dapat langsung dikembangkan sebagai modul profile yang scalable untuk pengguna umum, coach, admin, atau komunitas NutriTrack.
