# designonboarding.md — NutriTrack Onboarding Page Design & React PWA Implementation

> Dokumen ini dibuat untuk mengonversi halaman HTML statis NutriTrack ke project lokal berbasis **React + Vite PWA + Tailwind CSS**.
> Fokus utama: mempertahankan visual asli, merapikan struktur komponen, mengganti CDN Tailwind menjadi konfigurasi lokal, dan menyiapkan state/validasi agar siap diintegrasikan dengan backend.

## 1. Ringkasan Tampilan

`onboarding.html` adalah halaman setup profil pertama setelah login/verify email. Halaman ini menampilkan **six-step self-service onboarding** untuk menghitung target kalori dan makro.

Elemen utama:

- Sticky header putih translucent.
- Brand NutriTrack kiri.
- Link `Lewati` ke dashboard.
- Hero intro dengan progress bar penuh.
- Grid utama:
  - Kiri: 6 step card berurutan.
  - Kanan: sticky summary card `Target harian`.
- Step:
  1. Kenali Tubuhmu
  2. Pilih Program
  3. Target & Timeline
  4. Level Aktivitas
  5. Preferensi Makanan
  6. Jadwal & Notifikasi

## 2. Design Token Utama

| Token | Nilai | Fungsi |
|---|---:|---|
| `primary` | `#007a35` | Warna brand, CTA utama, icon logo, link aktif |
| `mint` | `#e9f8ef` | Surface hijau lembut untuk tombol sekunder, icon badge, highlight |
| `ink` | `#071727` | Heading dan teks utama |
| `page` | `#f4f7fb` | Background halaman auth/onboarding |
| `slate-50` | Tailwind default | Background input |
| `slate-200` | Tailwind default | Border card/input |
| `green-900/10` | Tailwind alpha | Focus ring input |
| `white` | `#ffffff` | Card utama dan text CTA kontras |

### Typography

| Elemen | Font | Tailwind |
|---|---|---|
| Body | Plus Jakarta Sans | `font-sans` |
| Brand | Plus Jakarta Sans ExtraBold/Black | `font-black` |
| Heading page/card | Plus Jakarta Sans Black | `text-3xl md:text-5xl font-black` |
| Label form | Plus Jakarta Sans Bold | `text-sm font-bold` |
| Helper text | Plus Jakarta Sans Regular/Semibold | `text-slate-500/600` |

### Radius dan spacing

| Elemen | Class asal | Rekomendasi React |
|---|---|---|
| Auth card | `rounded-[28px]` / `rounded-[32px]` | `rounded-auth-card` / `rounded-auth-card-xl` |
| Input | `rounded-2xl h-12` | Standarisasi field auth |
| Logo mark | `w-11 h-11 rounded-xl` | Komponen `BrandMark` |
| Page padding | `px-6 py-12` | Konsisten di semua halaman auth/legal |

```js
// tailwind.config.js
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Plus Jakarta Sans", "sans-serif"],
      },
      colors: {
        primary: "#007a35",
        mint: "#e9f8ef",
        ink: "#071727",
        page: "#f4f7fb",
      },
      borderRadius: {
        "auth-card": "28px",
        "auth-card-xl": "32px",
      },
      boxShadow: {
        auth: "0 20px 45px rgba(15, 23, 42, 0.08)",
        "green-soft": "0 12px 28px rgba(0, 122, 53, 0.20)",
      },
    },
  },
};
```

## 3. Layout Structure

```jsx
export default function OnboardingPage() {
  return (
    <div className="min-h-screen bg-page font-sans text-ink">
      <OnboardingHeader />
      <main className="max-w-7xl mx-auto px-6 py-10">
        <OnboardingIntro progress={100} />
        <section className="grid lg:grid-cols-[1fr_360px] gap-8 items-start">
          <div className="grid gap-5">
            <BodyProfileStep />
            <ProgramStep />
            <TargetTimelineStep />
            <ActivityLevelStep />
            <FoodPreferenceStep />
            <ScheduleNotificationStep />
          </div>
          <DailyTargetSummary />
        </section>
      </main>
    </div>
  );
}
```

## 4. Header

```jsx
function OnboardingHeader() {
  return (
    <header className="h-16 bg-white/80 backdrop-blur-xl border-b border-slate-200 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <span className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center material-symbols-outlined">
            nutrition
          </span>
          <span className="font-black text-xl text-primary">NutriTrack</span>
        </Link>
        <Link className="text-sm font-bold text-slate-500 hover:text-primary" to="/dashboard">
          Lewati
        </Link>
      </div>
    </header>
  );
}
```

## 5. Hero Intro + Progress Bar

```jsx
function OnboardingIntro({ progress }) {
  return (
    <div className="mb-10">
      <p className="uppercase tracking-[0.28em] text-xs font-extrabold text-primary mb-3">
        Self-service onboarding
      </p>
      <h1 className="text-4xl md:text-5xl font-black mb-4">Setup profil sehatmu</h1>
      <p className="text-slate-600 max-w-2xl">
        Enam langkah pertama sesuai PRD untuk menghitung target kalori, makro, preferensi, dan jadwal makan.
      </p>
      <div
        className="mt-6 h-3 bg-white rounded-full overflow-hidden border border-slate-200"
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className="h-full bg-primary rounded-full transition-all duration-700" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
```

## 6. Step Card Component

```jsx
function StepCard({ number, title, colorClass, children }) {
  return (
    <article className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:-translate-y-1 transition">
      <div className="flex items-center gap-3 mb-5">
        <span className={`w-10 h-10 rounded-xl flex items-center justify-center font-black ${colorClass}`}>
          {number}
        </span>
        <h2 className="text-xl font-black">{title}</h2>
      </div>
      {children}
    </article>
  );
}
```

## 7. Review Per Step

### Step 1 — Kenali Tubuhmu

Input asli: `Alex Carter`, `29 tahun`, `178 cm`, `78.5 kg`.

Rekomendasi:
- Pisahkan value dan unit.
- Gunakan `type="number"` untuk umur, tinggi, berat.
- Tambahkan validasi range.

### Step 2 — Pilih Program

Tiga kartu pilihan:
- Turun Berat Badan — orange.
- Naik Berat Badan — blue.
- Pola Makan Sehat — mint/green.

Gunakan button dengan `aria-pressed`.

### Step 3 — Target & Timeline

Field:
- Target 70 kg.
- Normal 0.5 kg/minggu.
- Estimasi `~30 minggu`.

Timeline sebaiknya computed.

### Step 4 — Level Aktivitas

Lima chip:
- Jarang
- Ringan
- Sedang aktif
- Aktif
- Sangat Aktif

### Step 5 — Preferensi Makanan

Chip:
- Halal Only
- Masakan Indonesia
- Tidak ada alergi
- Omnivora

Gunakan multi-select chip.

### Step 6 — Jadwal & Notifikasi

Input jadwal:
- Sarapan 07:00
- Lunch 12:30
- Dinner 19:00

Gunakan `<input type="time">`.

## 8. Daily Target Summary

```jsx
function DailyTargetSummary({ target }) {
  return (
    <aside className="bg-white rounded-[32px] p-7 border border-slate-200 shadow-xl sticky top-24">
      <p className="uppercase tracking-[0.22em] text-xs font-extrabold text-primary mb-3">
        Rencana siap
      </p>
      <h2 className="text-2xl font-black mb-5">Target harian</h2>
      <div className="space-y-3 text-sm">
        <SummaryRow label="Kalori" value={`${target.calories} kcal`} />
        <SummaryRow label="Protein" value={`${target.protein} g`} />
        <SummaryRow label="Karbohidrat" value={`${target.carbs} g`} />
        <SummaryRow label="Lemak" value={`${target.fat} g`} />
      </div>
      <Link className="mt-7 h-12 rounded-2xl bg-primary text-white font-extrabold flex items-center justify-center" to="/dashboard">
        Mulai Perjalananku
      </Link>
    </aside>
  );
}
```

## 9. Data Model

```ts
export type OnboardingProfile = {
  fullName: string;
  age: number;
  heightCm: number;
  weightKg: number;
  program: "lose_weight" | "gain_weight" | "healthy_eating";
  targetWeightKg: number;
  pacePerWeekKg: number;
  activityLevel: "sedentary" | "light" | "moderate" | "active" | "very_active";
  foodPreferences: string[];
  allergies: string[];
  dietType: "omnivore" | "vegetarian" | "vegan" | "pescatarian";
  mealSchedule: {
    breakfast: string;
    lunch: string;
    dinner: string;
  };
  notificationsEnabled: boolean;
};
```

## 10. Kalkulasi Target Placeholder

```js
export function calculateDailyTargets(profile) {
  const base =
    profile.program === "lose_weight"
      ? 1800
      : profile.program === "gain_weight"
        ? 2600
        : 2200;

  return {
    calories: base,
    protein: Math.round(profile.weightKg * 1.7),
    carbs: Math.round((base * 0.4) / 4),
    fat: Math.round((base * 0.3) / 9),
  };
}
```

## 11. Animasi

| Elemen | Animasi |
|---|---|
| Step card | fade-up stagger |
| Program option | hover `-translate-y-1` |
| Progress bar | width transition `duration-700` |
| Summary card | sticky + subtle hover shadow |
| CTA | hover scale 1.01, active scale 0.99 |

## 12. Struktur File React

```txt
src/
  pages/onboarding/OnboardingPage.jsx
  components/onboarding/OnboardingHeader.jsx
  components/onboarding/OnboardingIntro.jsx
  components/onboarding/StepCard.jsx
  components/onboarding/ProgramStep.jsx
  components/onboarding/ActivityLevelStep.jsx
  components/onboarding/FoodPreferenceStep.jsx
  components/onboarding/DailyTargetSummary.jsx
  utils/onboarding/calculateDailyTargets.js
```

## 13. Accessibility Checklist

- Semua input punya label atau `aria-label`.
- Program dan activity chip gunakan button.
- Gunakan `aria-pressed` untuk pilihan aktif.
- Progress bar gunakan `role="progressbar"`.
- Link `Lewati` harus keyboard-focusable.

## 14. Prioritas Perbaikan

1. Ubah input text dengan unit menjadi numeric field terstruktur.
2. Program/activity/preference harus berupa state interaktif.
3. Progress bar jangan selalu 100%; hitung dari step yang terisi.
4. Summary target harus computed.
5. Tambahkan autosave onboarding ke localStorage.
6. Tambahkan validasi per step.
7. Tambahkan submit API ketika integrasi backend.
