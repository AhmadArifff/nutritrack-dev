# designprogress.md — NutriTrack Progress / Weight Journey

Dokumen ini adalah spesifikasi desain teknis untuk mengonversi tampilan `progress.html` menjadi halaman **React PWA + Tailwind CSS**. Fokus halaman ini adalah **monitoring perjalanan berat badan**, input progress harian, BMI summary, milestone, streak, dan riwayat log berat badan dengan foto progress.

---

## 1. Identitas Halaman

| Item | Nilai |
|---|---|
| Nama halaman | Weight Journey / Progress |
| Route rekomendasi | `/progress` |
| Tujuan utama | Menampilkan grafik progress berat badan, input berat badan baru, status BMI, milestone, streak, dan riwayat log |
| Karakter UI | Clean health-tech dashboard, glassmorphism, soft pastel, metric-oriented, modern PWA |
| Layout utama | App shell dengan fixed sidebar + sticky top app bar + responsive dashboard grid |
| Framework target | React + Vite + Tailwind CSS + PWA |

---

## 2. Ringkasan Visual Tampilan

Halaman `Progress` memakai struktur dashboard yang konsisten dengan halaman NutriTrack lain:

1. **Sidebar kiri fixed** untuk navigasi utama.
2. **Top App Bar sticky** berisi judul halaman, subtitle progress, search, notification, settings, dan profile shortcut.
3. **Header section** sebagai pengulangan konteks halaman.
4. **Main analytics grid**:
   - Kartu besar `Progress Trends` dengan line chart SVG.
   - Kolom kanan berisi `Log Weight` form dan `Current BMI` card.
5. **Milestone cards row**:
   - Target Date.
   - Next Milestone.
   - Consistency.
6. **History & Logs** sebagai daftar riwayat berat badan dan foto progress.
7. **Mobile FAB** untuk aksi cepat menambahkan progress.

Secara visual, halaman ini kuat sebagai **fitness analytics dashboard** karena memadukan angka metrik, grafik tren, micro-interaction, dan history log.

---

## 3. Design Token Warna

Gunakan token berikut pada `tailwind.config.js` agar seluruh halaman konsisten dengan desain HTML sumber.

```js
// tailwind.config.js
export default {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'surface-dim': '#cbdbf5',
        'on-primary-container': '#004b1e',
        'on-surface': '#0b1c30',
        'on-tertiary-container': '#76231b',
        'secondary': '#0058be',
        'inverse-on-surface': '#eaf1ff',
        'error-container': '#ffdad6',
        'primary-container': '#22c55e',
        'on-primary': '#ffffff',
        'tertiary': '#9e4036',
        'energy-orange': '#f97316',
        'tertiary-fixed-dim': '#ffb4a9',
        'on-tertiary': '#ffffff',
        'surface': '#f8f9ff',
        'on-error-container': '#93000a',
        'surface-variant': '#d3e4fe',
        'on-tertiary-fixed': '#410001',
        'secondary-fixed': '#d8e2ff',
        'outline': '#6d7b6c',
        'card-light': '#ffffff',
        'inverse-surface': '#213145',
        'primary-fixed-dim': '#4ae176',
        'surface-container-lowest': '#ffffff',
        'outline-variant': '#bccbb9',
        'achievement-purple': '#a855f7',
        'surface-container-low': '#eff4ff',
        'tertiary-fixed': '#ffdad5',
        'background': '#f8f9ff',
        'error-red': '#ef4444',
        'surface-container-highest': '#d3e4fe',
        'primary-fixed': '#6bff8f',
        'on-surface-variant': '#3d4a3d',
        'surface-container-high': '#dce9ff',
        'card-dark': '#1e293b',
        'surface-container': '#e5eeff',
        'secondary-container': '#2170e4',
        'bg-light': '#f8fafc',
        'secondary-fixed-dim': '#adc6ff',
        'on-background': '#0b1c30',
        'tertiary-container': '#ff8b7c',
        'on-error': '#ffffff',
        'mint-surface': '#f0fdf4',
        'warning-yellow': '#eab308',
        'inverse-primary': '#4ae176',
        'on-secondary-container': '#fefcff',
        'error': '#ba1a1a',
        'surface-tint': '#006e2f',
        'on-secondary-fixed': '#001a42',
        'bg-dark': '#0f172a',
        'surface-bright': '#f8f9ff',
        'primary': '#006e2f'
      }
    }
  }
};
```

### Fungsi Warna Per Elemen

| Token | Hex | Fungsi UI |
|---|---:|---|
| `primary` | `#006e2f` | Aksi utama, chart line, active nav, tombol submit |
| `primary-container` | `#22c55e` | Active sidebar item, selection background, aksen sehat |
| `mint-surface` | `#f0fdf4` | Background lembut untuk card log weight dan health status |
| `secondary` | `#0058be` | BMI value, tombol success state, milestone card |
| `energy-orange` | `#f97316` | Target date / prediction card |
| `achievement-purple` | `#a855f7` | Next milestone dan achievement visual |
| `error-red` | `#ef4444` | Indikasi perubahan berat negatif/alert |
| `background` | `#f8f9ff` | Canvas utama halaman |
| `surface-container-low` | `#eff4ff` | Hover row, sidebar background lembut |
| `surface-container-high` | `#dce9ff` | Icon container dan placeholder photo |
| `outline-variant` | `#bccbb9` | Border lembut antar elemen |
| `on-surface` | `#0b1c30` | Teks utama |
| `on-surface-variant` | `#3d4a3d` | Teks sekunder |

---

## 4. Typography System

Halaman memakai kombinasi font:

- **Poppins** untuk headline dan judul section.
- **Nunito** untuk body text.
- **Inter** untuk label UI.
- **JetBrains Mono** untuk angka metrik seperti berat, BMI, dan nilai chart.

```js
fontFamily: {
  'body-lg': ['Nunito'],
  'label-sm': ['Inter'],
  'label-md': ['Inter'],
  'headline-lg-mobile': ['Poppins'],
  'body-md': ['Nunito'],
  'headline-xl': ['Poppins'],
  'metrics-mono': ['JetBrains Mono'],
  'headline-md': ['Poppins'],
  'headline-lg': ['Poppins']
},
fontSize: {
  'body-lg': ['18px', { lineHeight: '1.6', fontWeight: '400' }],
  'label-sm': ['12px', { lineHeight: '1.4', letterSpacing: '0.05em', fontWeight: '600' }],
  'label-md': ['14px', { lineHeight: '1.4', letterSpacing: '0.01em', fontWeight: '500' }],
  'headline-lg-mobile': ['28px', { lineHeight: '1.25', fontWeight: '600' }],
  'body-md': ['16px', { lineHeight: '1.5', fontWeight: '400' }],
  'headline-xl': ['48px', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '700' }],
  'metrics-mono': ['16px', { lineHeight: '1', fontWeight: '500' }],
  'headline-md': ['24px', { lineHeight: '1.3', fontWeight: '600' }],
  'headline-lg': ['32px', { lineHeight: '1.25', fontWeight: '600' }]
}
```

### Mapping Typography

| Elemen | Class rekomendasi |
|---|---|
| Page title `Weight Journey` | `font-headline-lg text-headline-lg font-bold` |
| Card title | `font-headline-md text-headline-md` |
| Metric angka berat | `font-metrics-mono text-lg font-bold` |
| Label kecil | `font-label-sm text-label-sm uppercase tracking-wider` |
| Body subtitle | `font-body-md text-on-surface-variant` |
| Button text | `font-label-md font-bold` |

---

## 5. Spacing, Radius, dan Layout Token

```js
spacing: {
  'gutter-mobile': '16px',
  'card-padding': '20px',
  'gutter-desktop': '24px',
  'unit': '4px',
  'section-gap': '32px',
  'margin-page': '24px'
},
borderRadius: {
  DEFAULT: '0.25rem',
  lg: '0.5rem',
  xl: '0.75rem',
  full: '9999px'
}
```

### Radius Aktual dari Halaman

| Elemen | Radius |
|---|---:|
| Sidebar logo icon | `rounded-xl` |
| Nav active/hover item | `rounded-xl` |
| Glass card utama | `rounded-2xl` |
| Input form | `rounded-xl` |
| Time range segmented control | `rounded-lg` |
| History photo thumbnail | `rounded-lg` |
| FAB | `rounded-full` |

---

## 6. Struktur Layout Halaman

```txt
ProgressPage
├── AppShell
│   ├── Sidebar
│   └── MainContent
│       ├── TopAppBar
│       ├── PageHeader
│       ├── ProgressAnalyticsGrid
│       │   ├── ProgressTrendChartCard
│       │   └── RightColumn
│       │       ├── LogWeightCard
│       │       └── BMIGaugeCard
│       ├── GoalInsightCards
│       │   ├── TargetDateCard
│       │   ├── NextMilestoneCard
│       │   └── ConsistencyCard
│       ├── HistoryLogsCard
│       │   └── HistoryLogItem[]
│       └── MobileFAB
```

---

## 7. App Shell dan Sidebar

### Fungsi Sidebar

Sidebar berfungsi sebagai navigasi utama seluruh modul NutriTrack. Pada halaman ini item aktif adalah **Progress** dengan icon `insights` dan background `primary-container`.

### Elemen Sidebar

| Elemen | Fungsi | Detail Visual |
|---|---|---|
| Brand block | Identitas app | Icon nutrition hijau, teks NutriTrack, sublabel Pro Companion |
| Collapse button | Memperkecil sidebar desktop | Mengubah lebar dari `256px` ke `72px` |
| Nav item aktif | Menunjukkan halaman aktif | `bg-primary-container text-on-primary-container font-bold` |
| Nav item default | Navigasi lain | `text-on-surface-variant hover:bg-surface-variant/40` |
| Upgrade card | CTA premium | Gradient biru lembut, illustration icon, close button |
| Help Center | Navigasi support | Hover text `on-surface` |
| Logout | Keluar akun | Hover text `error-red` |

### Behavior Sidebar

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
  display: none;
}

aside#sidebar.hidden-full {
  transform: translateX(-110%);
  width: 0 !important;
}
```

### React State Sidebar

```jsx
const [collapsed, setCollapsed] = useState(false);
const [hidden, setHidden] = useState(false);

<aside
  className={clsx(
    'h-screen fixed left-0 top-0 z-50 bg-surface-container-low border-r border-outline-variant/20 shadow-md flex flex-col py-margin-page px-4 hidden xl:flex transition-all duration-200',
    collapsed ? 'w-[72px]' : 'w-64',
    hidden && '-translate-x-[110%] !w-0'
  )}
>
  ...
</aside>
```

---

## 8. Top App Bar

Top app bar menggunakan `sticky top-0 z-40`, background translucent, dan `backdrop-blur-xl`.

### Komponen Top App Bar

| Elemen | Konten | Class utama |
|---|---|---|
| Title | `Weight Journey` | `font-headline-md text-headline-md font-bold text-primary` |
| Subtitle | `You've lost 2.4kg...` | `text-label-md text-on-surface-variant/60` |
| Search input | `Search data...` | `bg-surface-container rounded-full focus:ring-2 focus:ring-primary` |
| Notification icon | Link ke notifikasi | `hover:bg-surface-variant` |
| Settings icon | Link ke pengaturan | `hover:bg-surface-variant` |
| Profile summary | Avatar + name + role | border kiri `outline-variant` |

### Implementasi React

```jsx
function TopAppBar() {
  return (
    <header className="sticky top-0 z-40 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/30 px-gutter-desktop h-16 flex items-center justify-between">
      <div>
        <h2 className="font-headline-md text-headline-md font-bold text-primary">Weight Journey</h2>
        <p className="text-label-md text-on-surface-variant/60">
          You've lost 2.4kg in the last 30 days. Stay consistent!
        </p>
      </div>
      <div className="flex items-center gap-6">
        <div className="relative hidden md:block">
          <input
            className="bg-surface-container border-none rounded-full px-5 py-2 pl-12 focus:ring-2 focus:ring-primary w-64 text-label-md"
            placeholder="Search data..."
          />
          <span className="material-symbols-outlined absolute left-4 top-2 text-on-surface-variant">search</span>
        </div>
      </div>
    </header>
  );
}
```

---

## 9. Page Header

Terdapat header section setelah top bar. Secara konten terlihat repetitif dengan top app bar, tetapi tetap berguna untuk layout dashboard karena memberi konteks halaman saat user scroll.

```jsx
function ProgressHeader() {
  return (
    <div className="mb-8">
      <h2 className="font-headline-lg text-headline-lg text-on-surface mb-2">
        Weight Journey
      </h2>
      <p className="text-on-surface-variant font-body-md">
        You've lost 2.4kg in the last 30 days. Stay consistent!
      </p>
    </div>
  );
}
```

### Saran Optimasi

Untuk project lokal, Anda bisa membuat subtitle dinamis:

```js
const weightDelta = startWeight - currentWeight;
const subtitle = weightDelta > 0
  ? `You've lost ${weightDelta.toFixed(1)}kg in the last 30 days. Stay consistent!`
  : `You're tracking consistently. Keep logging your progress.`;
```

---

## 10. Glass Card System

Semua card utama menggunakan style `glass-card`.

```css
.glass-card {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(226, 232, 240, 0.5);
}
```

### Rekomendasi Tailwind Utility

```jsx
const glassCard = 'bg-white/80 backdrop-blur-xl border border-slate-200/50';
```

Lebih baik dibuat sebagai component agar tidak duplikatif:

```jsx
function GlassCard({ className = '', children }) {
  return (
    <div className={`bg-white/80 backdrop-blur-xl border border-slate-200/50 ${className}`}>
      {children}
    </div>
  );
}
```

---

## 11. Progress Trends Chart Card

### Fungsi

Kartu ini menampilkan grafik tren berat badan dalam rentang waktu tertentu. HTML sumber menggunakan SVG statis dengan path curve dan area gradient.

### Elemen

| Elemen | Detail |
|---|---|
| Card title | `Progress Trends` |
| Time filter | `1M`, `3M`, `6M`, `1Y` |
| Active range | `1M` dengan background putih dan shadow |
| Chart | SVG line chart berwarna primary |
| Current metric | `78.5 kg Current` di kanan atas chart |

### Class Utama

```html
<div class="lg:col-span-8 glass-card rounded-2xl p-card-padding shadow-md">
```

### Implementasi React Data-Driven

```jsx
const ranges = ['1M', '3M', '6M', '1Y'];
const [activeRange, setActiveRange] = useState('1M');

function RangeSelector() {
  return (
    <div className="flex gap-2 bg-surface-container-low p-1 rounded-lg">
      {ranges.map((range) => (
        <button
          key={range}
          onClick={() => setActiveRange(range)}
          className={clsx(
            'px-3 py-1 text-label-sm rounded-md transition-all',
            activeRange === range
              ? 'font-bold bg-white shadow-sm text-primary'
              : 'text-on-surface-variant hover:text-on-surface'
          )}
        >
          {range}
        </button>
      ))}
    </div>
  );
}
```

### SVG Chart Component

```jsx
function ProgressLineChart({ currentWeight = 78.5 }) {
  return (
    <div className="h-64 w-full bg-surface-container-lowest/50 rounded-xl relative overflow-hidden flex items-end px-4 pb-4">
      <svg className="w-full h-full text-primary drop-shadow-lg" viewBox="0 0 400 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.3" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0,80 C50,75 100,85 150,60 C200,35 250,45 300,30 C350,15 400,20 450,10 L450,100 L0,100 Z"
          fill="url(#chartGradient)"
        />
        <path
          d="M0,80 C50,75 100,85 150,60 C200,35 250,45 300,30 C350,15 400,20 450,10"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="3"
        />
        <circle cx="150" cy="60" r="4" fill="white" stroke="currentColor" strokeWidth="2" />
        <circle cx="300" cy="30" r="4" fill="white" stroke="currentColor" strokeWidth="2" />
      </svg>
      <div className="absolute top-4 right-4 flex flex-col items-end">
        <span className="font-metrics-mono text-primary font-bold">{currentWeight} kg</span>
        <span className="text-label-sm text-on-surface-variant">Current</span>
      </div>
    </div>
  );
}
```

### Catatan Optimasi

Untuk production, ganti SVG statis dengan chart library:

- **Recharts**: paling cocok untuk dashboard React.
- **Chart.js**: bagus, tetapi styling custom lebih verbose.
- **Visx**: paling fleksibel, tetapi development lebih lama.

Rekomendasi: **Recharts** karena cukup cepat, mudah, dan cocok untuk PWA.

---

## 12. Log Weight Card

### Fungsi

Form input berat badan harian. HTML sumber memiliki feedback submit:

1. User submit form.
2. Tombol berubah menjadi loading spinner.
3. Setelah 1.2 detik berubah menjadi `Saved!`.
4. Setelah 2 detik reset kembali.

### Elemen UI

| Elemen | Detail |
|---|---|
| Card title | `Log Weight` |
| Label | `Current Weight (kg)` |
| Input | type number, step 0.1, placeholder `00.0` |
| Button | `Record Progress` |
| Background | `from-white to-mint-surface` |

### Implementasi React

```jsx
function LogWeightCard({ onSubmit }) {
  const [weight, setWeight] = useState('');
  const [status, setStatus] = useState('idle');

  async function handleSubmit(e) {
    e.preventDefault();
    if (!weight || Number(weight) <= 0) return;

    setStatus('loading');
    await new Promise((resolve) => setTimeout(resolve, 800));
    onSubmit?.({ weight: Number(weight), loggedAt: new Date().toISOString() });
    setStatus('saved');

    setTimeout(() => {
      setWeight('');
      setStatus('idle');
    }, 1500);
  }

  return (
    <GlassCard className="rounded-2xl p-card-padding shadow-md bg-gradient-to-br from-white to-mint-surface">
      <h4 className="font-headline-md text-on-surface mb-4">Log Weight</h4>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="relative">
          <label className="block text-label-sm text-on-surface-variant mb-1 ml-1">
            Current Weight (kg)
          </label>
          <input
            className="w-full h-12 bg-white border-outline-variant/30 rounded-xl focus:ring-primary focus:border-primary px-4 font-metrics-mono text-lg"
            placeholder="00.0"
            step="0.1"
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
        <button
          className={clsx(
            'w-full py-3 rounded-xl font-bold shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2',
            status === 'saved'
              ? 'bg-secondary text-on-primary'
              : 'bg-primary text-on-primary shadow-primary/20 hover:brightness-110'
          )}
          type="submit"
          disabled={status === 'loading'}
        >
          {status === 'loading' && <span className="material-symbols-outlined animate-spin">refresh</span>}
          {status === 'saved' && <span className="material-symbols-outlined">check</span>}
          {status === 'idle' ? 'Record Progress' : status === 'saved' ? 'Saved!' : ''}
        </button>
      </form>
    </GlassCard>
  );
}
```

### Validasi Rekomendasi

Tambahkan validasi supaya lebih layak production:

```js
function validateWeight(value) {
  const weight = Number(value);
  if (!value) return 'Weight is required';
  if (Number.isNaN(weight)) return 'Weight must be a number';
  if (weight < 20 || weight > 300) return 'Weight must be between 20 and 300 kg';
  return null;
}
```

---

## 13. BMI Gauge Card

### Fungsi

Menampilkan BMI saat ini. HTML sumber mencantumkan `.bmi-gauge-container { perspective: 1000px; }`, tetapi konten gauge masih kosong. Ini berarti area disiapkan untuk visual 3D/gauge.

### Elemen

| Elemen | Nilai |
|---|---|
| Label | `Current BMI` |
| BMI value | `23.8` |
| Status | `Healthy` |
| Accent color | `secondary` |
| Container gauge | `w-32 h-32 relative bmi-gauge-container` |

### Implementasi Gauge Sederhana

```jsx
function BMIGaugeCard({ bmi = 23.8, status = 'Healthy' }) {
  const percentage = Math.min(Math.max((bmi - 15) / (35 - 15), 0), 1) * 100;

  return (
    <GlassCard className="rounded-2xl p-card-padding shadow-md flex items-center justify-between overflow-hidden relative">
      <div className="z-10">
        <h4 className="text-label-md font-bold text-on-surface-variant uppercase tracking-wider mb-1">
          Current BMI
        </h4>
        <div className="flex items-baseline gap-1">
          <span className="font-headline-lg text-secondary">{bmi}</span>
          <span className="text-label-sm text-on-surface-variant font-bold">{status}</span>
        </div>
      </div>

      <div className="w-32 h-32 relative [perspective:1000px] flex items-center justify-center">
        <div className="w-28 h-28 rounded-full bg-surface-container-high shadow-inner relative overflow-hidden">
          <div
            className="absolute bottom-0 left-0 right-0 bg-secondary/50 transition-all duration-700"
            style={{ height: `${percentage}%` }}
          />
          <div className="absolute inset-3 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center">
            <span className="material-symbols-outlined text-secondary">monitor_weight</span>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
```

### Rumus BMI

```js
function calculateBMI(weightKg, heightCm) {
  const heightM = heightCm / 100;
  return Number((weightKg / (heightM * heightM)).toFixed(1));
}

function getBMIStatus(bmi) {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Healthy';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
}
```

---

## 14. Goal Insight Cards

Ada tiga kartu insight horizontal:

1. **Target Date**
2. **Next Milestone**
3. **Consistency**

### Layout

```html
<div class="grid grid-cols-1 md:grid-cols-3 gap-gutter-desktop mb-section-gap">
```

### Spesifikasi Per Card

| Card | Border | Icon | Judul | Nilai | Subtitle |
|---|---|---|---|---|---|
| Target Date | `border-l-energy-orange` | `bolt` | Target Date | `Oct 12, 2023` | Based on your current pace |
| Next Milestone | `border-l-achievement-purple` | `emoji_events` | Next Milestone | `-1.5 kg to go` | 75kg Goal Milestone |
| Consistency | `border-l-secondary` | `calendar_today` | Consistency | `12 Day Streak` | Daily logging hero |

### Component Reusable

```jsx
function InsightCard({ colorClass, icon, label, value, description, filledIcon = false }) {
  return (
    <GlassCard className={`p-card-padding rounded-2xl shadow-sm hover:-translate-y-1 transition-transform border-l-4 ${colorClass.border}`}>
      <div className="flex items-center gap-3 mb-2">
        <span
          className={`material-symbols-outlined ${colorClass.text}`}
          style={filledIcon ? { fontVariationSettings: `'FILL' 1` } : undefined}
        >
          {icon}
        </span>
        <span className="text-label-md font-bold text-on-surface-variant">{label}</span>
      </div>
      <p className="font-headline-md text-on-surface">{value}</p>
      <p className="text-label-sm text-on-surface-variant">{description}</p>
    </GlassCard>
  );
}
```

### Data Model

```js
const insightCards = [
  {
    icon: 'bolt',
    label: 'Target Date',
    value: 'Oct 12, 2023',
    description: 'Based on your current pace',
    color: 'energy-orange'
  },
  {
    icon: 'emoji_events',
    label: 'Next Milestone',
    value: '-1.5 kg to go',
    description: '75kg Goal Milestone',
    color: 'achievement-purple'
  },
  {
    icon: 'calendar_today',
    label: 'Consistency',
    value: '12 Day Streak',
    description: 'Daily logging hero',
    color: 'secondary'
  }
];
```

---

## 15. History & Logs Card

### Fungsi

Menampilkan riwayat input berat badan dengan tanggal, waktu, nilai berat, perubahan berat, dan thumbnail foto progress.

### Struktur

```txt
HistoryLogsCard
├── Header
│   ├── Title: History & Logs
│   └── View All button
└── List
    ├── HistoryLogItem
    ├── HistoryLogItem
    └── HistoryLogItem
```

### Elemen History Item

| Elemen | Detail |
|---|---|
| Date icon | `calendar_month` dalam square `surface-container-high` |
| Date | contoh `Sep 28, 2023` |
| Meta | `Morning Entry • 7:15 AM` |
| Weight | `78.5 kg` |
| Delta | `-0.2 kg` atau `+0.1 kg` |
| Photo | thumbnail `w-14 h-14 rounded-lg` |
| No photo | icon `no_photography` dengan dashed border |

### Catatan Warna Delta

HTML sumber menggunakan:

- `text-error-red` untuk `-0.2 kg` dan `-0.4 kg`.
- `text-primary` untuk `+0.1 kg`.

Secara logika kesehatan, untuk program turun berat badan biasanya penurunan berat adalah progress positif. Maka rekomendasi implementasi:

```js
function getWeightDeltaColor(delta, goalType = 'lose_weight') {
  if (goalType === 'lose_weight') {
    return delta < 0 ? 'text-primary' : 'text-error-red';
  }
  if (goalType === 'gain_weight') {
    return delta > 0 ? 'text-primary' : 'text-error-red';
  }
  return 'text-on-surface-variant';
}
```

### React Component

```jsx
function HistoryLogItem({ log, goalType = 'lose_weight' }) {
  const deltaColor = getWeightDeltaColor(log.delta, goalType);

  return (
    <div className="p-card-padding flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-surface-container-low transition-colors group">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-primary font-bold">
          <span className="material-symbols-outlined">calendar_month</span>
        </div>
        <div>
          <p className="font-bold text-on-surface">{log.date}</p>
          <p className="text-label-sm text-on-surface-variant">{log.session} • {log.time}</p>
        </div>
      </div>

      <div className="flex items-center gap-8">
        <div className="text-right">
          <p className="font-metrics-mono text-lg font-bold text-on-surface">{log.weight} kg</p>
          <p className={`text-label-sm ${deltaColor}`}>{log.delta > 0 ? '+' : ''}{log.delta} kg</p>
        </div>

        {log.photoUrl ? (
          <button className="w-14 h-14 rounded-lg overflow-hidden border border-outline-variant/30 group-hover:scale-110 transition-transform cursor-zoom-in">
            <img src={log.photoUrl} alt="Progress photo" className="w-full h-full object-cover" />
          </button>
        ) : (
          <div className="w-14 h-14 rounded-lg bg-surface-container flex items-center justify-center border border-dashed border-outline-variant/50 text-on-surface-variant">
            <span className="material-symbols-outlined text-sm">no_photography</span>
          </div>
        )}
      </div>
    </div>
  );
}
```

### Data Dummy

```js
const progressLogs = [
  {
    id: 1,
    date: 'Sep 28, 2023',
    session: 'Morning Entry',
    time: '7:15 AM',
    weight: 78.5,
    delta: -0.2,
    photoUrl: '/images/progress-1.jpg'
  },
  {
    id: 2,
    date: 'Sep 27, 2023',
    session: 'Morning Entry',
    time: '7:30 AM',
    weight: 78.7,
    delta: 0.1,
    photoUrl: null
  },
  {
    id: 3,
    date: 'Sep 26, 2023',
    session: 'Morning Entry',
    time: '7:20 AM',
    weight: 78.6,
    delta: -0.4,
    photoUrl: '/images/progress-2.jpg'
  }
];
```

---

## 16. Floating Action Button

HTML sumber menampilkan FAB hanya pada breakpoint mobile/tablet karena memakai `xl:hidden`.

```html
<button class="fixed bottom-8 right-8 w-14 h-14 bg-primary text-on-primary rounded-full shadow-2xl flex items-center justify-center scale-interaction xl:hidden z-50">
```

### Behavior

| State | Efek |
|---|---|
| Default | Floating circular primary button |
| Active | `scale(0.98)` |
| Visibility | Hidden pada desktop besar, visible pada mobile sampai lg |

### React

```jsx
function MobileProgressFAB({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-8 right-8 w-14 h-14 bg-primary text-on-primary rounded-full shadow-2xl flex items-center justify-center active:scale-[0.98] xl:hidden z-50"
      aria-label="Add weight progress"
    >
      <span className="material-symbols-outlined">add</span>
    </button>
  );
}
```

---

## 17. Animasi dan Micro-Interaction

### 17.1 Glass Card Hover Lift

HTML sumber:

```css
.hover-lift:hover {
  transform: translateY(-4px);
  transition: transform 0.2s ease-out;
}
```

Tailwind:

```html
hover:-translate-y-1 transition-transform duration-200 ease-out
```

### 17.2 Active Scale Interaction

HTML sumber:

```css
.scale-interaction:active { transform: scale(0.98); }
```

Tailwind:

```html
active:scale-[0.98] transition-transform
```

### 17.3 Submit Loading Animation

HTML sumber menggunakan icon `refresh` dengan `animate-spin`, lalu mengubah tombol menjadi `Saved!`.

React state:

```js
const statusMap = {
  idle: 'Record Progress',
  loading: 'refresh icon spinning',
  saved: 'Saved!'
};
```

### 17.4 Photo Hover Zoom

Thumbnail foto di history log:

```html
group-hover:scale-110 transition-transform cursor-zoom-in
```

Ini memberi affordance bahwa foto bisa dibuka detail/modal.

### 17.5 Sidebar Transition

```css
transition: width 0.22s ease, transform 0.22s ease;
```

Gunakan:

```html
transition-all duration-200 ease-out
```

---

## 18. Rekomendasi Komponen React

### Struktur Folder

```txt
src/
├── app/
│   ├── App.jsx
│   └── routes.jsx
├── components/
│   ├── app-shell/
│   │   ├── AppShell.jsx
│   │   ├── Sidebar.jsx
│   │   ├── TopAppBar.jsx
│   │   └── MobileDrawer.jsx
│   ├── ui/
│   │   ├── GlassCard.jsx
│   │   ├── IconButton.jsx
│   │   ├── MetricBadge.jsx
│   │   └── FloatingActionButton.jsx
│   └── progress/
│       ├── ProgressHeader.jsx
│       ├── ProgressTrendChartCard.jsx
│       ├── RangeSelector.jsx
│       ├── LogWeightCard.jsx
│       ├── BMIGaugeCard.jsx
│       ├── InsightCard.jsx
│       ├── GoalInsightCards.jsx
│       ├── HistoryLogsCard.jsx
│       └── HistoryLogItem.jsx
├── data/
│   └── progress.mock.js
├── hooks/
│   ├── useSidebarState.js
│   ├── useWeightProgress.js
│   └── useBMI.js
├── styles/
│   └── index.css
└── pages/
    └── ProgressPage.jsx
```

---

## 19. Progress Page Skeleton

```jsx
import AppShell from '@/components/app-shell/AppShell';
import ProgressHeader from '@/components/progress/ProgressHeader';
import ProgressTrendChartCard from '@/components/progress/ProgressTrendChartCard';
import LogWeightCard from '@/components/progress/LogWeightCard';
import BMIGaugeCard from '@/components/progress/BMIGaugeCard';
import GoalInsightCards from '@/components/progress/GoalInsightCards';
import HistoryLogsCard from '@/components/progress/HistoryLogsCard';
import MobileProgressFAB from '@/components/progress/MobileProgressFAB';

export default function ProgressPage() {
  return (
    <AppShell
      activeRoute="progress"
      title="Weight Journey"
      subtitle="You've lost 2.4kg in the last 30 days. Stay consistent!"
      searchPlaceholder="Search data..."
    >
      <div className="mb-8">
        <ProgressHeader />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-section-gap mb-section-gap">
        <div className="lg:col-span-8">
          <ProgressTrendChartCard />
        </div>
        <div className="lg:col-span-4 space-y-gutter-desktop">
          <LogWeightCard />
          <BMIGaugeCard />
        </div>
      </div>

      <GoalInsightCards />
      <HistoryLogsCard />
      <MobileProgressFAB />
    </AppShell>
  );
}
```

---

## 20. Data Model untuk Backend/API

Agar halaman ini siap terhubung ke backend, gunakan struktur data berikut.

### Weight Log

```ts
type WeightLog = {
  id: string;
  userId: string;
  weightKg: number;
  deltaKg: number;
  loggedAt: string;
  sessionLabel: 'Morning Entry' | 'Afternoon Entry' | 'Evening Entry';
  photoUrl?: string | null;
  note?: string | null;
};
```

### Progress Summary

```ts
type ProgressSummary = {
  currentWeightKg: number;
  startWeightKg: number;
  targetWeightKg: number;
  weightChange30dKg: number;
  bmi: number;
  bmiStatus: 'Underweight' | 'Healthy' | 'Overweight' | 'Obese';
  targetDate: string;
  nextMilestoneKg: number;
  streakDays: number;
};
```

### Chart Point

```ts
type WeightChartPoint = {
  date: string;
  weightKg: number;
};
```

---

## 21. Local State dan Hook

### useWeightProgress

```jsx
function useWeightProgress(initialLogs = []) {
  const [logs, setLogs] = useState(initialLogs);

  const currentWeight = logs[0]?.weightKg ?? 0;
  const previousWeight = logs[1]?.weightKg ?? currentWeight;
  const deltaKg = Number((currentWeight - previousWeight).toFixed(1));

  function addLog(weightKg) {
    const previous = logs[0]?.weightKg ?? weightKg;
    const newLog = {
      id: crypto.randomUUID(),
      weightKg,
      deltaKg: Number((weightKg - previous).toFixed(1)),
      loggedAt: new Date().toISOString(),
      sessionLabel: 'Morning Entry',
      photoUrl: null
    };
    setLogs((prev) => [newLog, ...prev]);
  }

  return {
    logs,
    currentWeight,
    deltaKg,
    addLog
  };
}
```

---

## 22. PWA Implementation Notes

Untuk React PWA, halaman progress perlu dipersiapkan agar tetap nyaman dipakai mobile.

### Install

```bash
npm install @vitejs/plugin-react vite-plugin-pwa clsx
npm install recharts
```

### vite.config.js

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'NutriTrack',
        short_name: 'NutriTrack',
        description: 'Nutrition and health progress tracker',
        theme_color: '#006e2f',
        background_color: '#f8f9ff',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/icons/icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
});
```

---

## 23. Accessibility Checklist

| Elemen | Rekomendasi |
|---|---|
| Sidebar | Gunakan `role="navigation"` dan `aria-label="Primary navigation"` |
| Active route | Tambahkan `aria-current="page"` pada nav aktif |
| Collapse sidebar | Gunakan `aria-expanded` dan `aria-controls` |
| Search input | Tambahkan label tersembunyi atau `aria-label="Search progress data"` |
| Weight input | Pastikan `label` menggunakan `htmlFor` |
| Submit button | Gunakan disabled saat loading |
| FAB | Tambahkan `aria-label="Add weight progress"` |
| Chart | Tambahkan summary teks karena SVG chart tidak cukup untuk screen reader |
| Photo thumbnail | Gunakan alt yang tidak terlalu deskriptif sensitif, misalnya `Progress photo from Sep 28` |

---

## 24. Responsive Behavior

| Breakpoint | Behavior |
|---|---|
| Mobile `<768px` | Grid menjadi satu kolom, top search disembunyikan, FAB tampil |
| Tablet `768px-1024px` | Insight cards 3 kolom mulai aktif di `md`, sidebar masih drawer/hidden |
| Desktop `>=1280px` | Sidebar fixed tampil, main content punya margin kiri `xl:ml-64` |
| Sidebar collapsed | Main margin kiri menjadi `72px` |
| Sidebar hidden | Main width penuh |

### Main Content Class

```html
<main class="flex-1 xl:ml-64 p-gutter-desktop max-w-[1200px] mx-auto w-full">
```

### Saran Mobile Padding

HTML sumber memakai `p-gutter-desktop` untuk semua ukuran. Untuk mobile, lebih baik:

```html
<main class="flex-1 xl:ml-64 p-gutter-mobile md:p-gutter-desktop max-w-[1200px] mx-auto w-full">
```

---

## 25. Perbaikan Penting dari HTML Sumber

### 25.1 Duplikasi Script Sidebar

Di bagian bawah HTML terdapat dua blok script sidebar collapse/hide yang melakukan logic serupa. Ini berisiko event listener ganda.

**Solusi React:** pindahkan semua logic sidebar ke hook tunggal:

```jsx
function useSidebarState() {
  const [collapsed, setCollapsed] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return {
    collapsed,
    hidden,
    mobileOpen,
    toggleCollapsed: () => setCollapsed((v) => !v),
    toggleHidden: () => setHidden((v) => !v),
    setMobileOpen
  };
}
```

### 25.2 FAB hanya muncul `xl:hidden`

Ini baik untuk mobile, tetapi pada desktop tidak ada tombol cepat untuk log weight selain form kanan. Jika UX ingin lebih cepat, desktop bisa menampilkan action button di header card.

### 25.3 BMI Gauge masih kosong

Area `.bmi-gauge-container` belum berisi visual. Wajib diimplementasikan saat konversi React.

### 25.4 Data tanggal tidak konsisten dengan current state

HTML memakai tanggal September/Oktober 2023 sebagai dummy. Di project lokal, harus ambil dari state/API.

### 25.5 Delta color perlu disesuaikan dengan tujuan user

Penurunan berat bisa positif untuk program weight loss. Jangan hardcode `text-error-red` untuk angka negatif tanpa memperhatikan goal.

---

## 26. Rekomendasi Animasi Tailwind

Tambahkan animasi ringan ke `tailwind.config.js`.

```js
extend: {
  keyframes: {
    fadeUp: {
      '0%': { opacity: 0, transform: 'translateY(12px)' },
      '100%': { opacity: 1, transform: 'translateY(0)' }
    },
    pulseSoft: {
      '0%, 100%': { opacity: 1 },
      '50%': { opacity: 0.75 }
    }
  },
  animation: {
    fadeUp: 'fadeUp 0.35s ease-out both',
    pulseSoft: 'pulseSoft 1.6s ease-in-out infinite'
  }
}
```

### Penggunaan

```html
<div class="animate-fadeUp">
  ...
</div>
```

---

## 27. Final Implementation Priority

### Prioritas 1 — Wajib

1. Buat shared `AppShell`, `Sidebar`, dan `TopAppBar` supaya konsisten dengan halaman dashboard/log food/meal planner.
2. Buat `ProgressTrendChartCard` dengan Recharts atau SVG reusable.
3. Buat `LogWeightCard` dengan validasi dan submit feedback.
4. Buat `HistoryLogsCard` yang datanya berasal dari array/state/API.
5. Tambahkan responsive layout mobile.

### Prioritas 2 — Sangat Disarankan

1. Implementasi BMI gauge visual.
2. Tambahkan modal preview progress photo.
3. Tambahkan range filter chart `1M/3M/6M/1Y` yang benar-benar mengubah data.
4. Tambahkan `loading`, `empty`, dan `error state`.
5. Simpan data log sementara ke IndexedDB/localStorage untuk PWA offline.

### Prioritas 3 — Enhancement

1. Sync ke backend Supabase/PostgreSQL.
2. Tambahkan upload foto progress.
3. Tambahkan predictive target date berdasarkan slope berat badan.
4. Tambahkan achievement badge jika streak tercapai.
5. Tambahkan export progress ke PDF/CSV.

---

## 28. Kesimpulan Desain

Halaman `progress.html` sudah memiliki fondasi UI yang kuat untuk modul **health progress analytics**. Elemen yang paling penting untuk dipertahankan saat konversi ke React PWA adalah:

- **Glassmorphism card system** untuk kesan modern dan ringan.
- **Primary green health identity** sebagai warna utama aksi dan chart.
- **Metric-oriented typography** dengan JetBrains Mono untuk angka.
- **Sticky app bar + fixed sidebar** sebagai dashboard shell.
- **Micro-interaction** seperti hover lift, active scale, submit feedback, dan photo zoom.
- **Data-driven component architecture** supaya chart, history, BMI, dan milestone bisa terhubung ke API.

Jika diimplementasikan dengan React + Tailwind + Recharts + PWA, halaman ini sudah siap menjadi modul progress tracking yang profesional, responsive, dan scalable.
