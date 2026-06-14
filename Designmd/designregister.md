# designregister.md — NutriTrack Register Page Implementation Guide

Dokumen ini menjelaskan hasil analisis tampilan `register.html` dan cara mengonversinya ke project lokal berbasis **React PWA + Tailwind CSS**. Fokus utama dokumen ini adalah mempertahankan karakter visual halaman register: **split auth layout**, **hero image kiri**, **form card kanan**, **step indicator**, **input form dua kolom**, **password strength meter**, **terms checkbox**, dan **micro-interaction auth flow**.

---

## 1. Ringkasan Tampilan

Halaman register menggunakan pendekatan **authentication split-screen**:

- **Desktop / laptop**: layar dibagi menjadi dua kolom.
  - Kolom kiri menampilkan visual hero makanan sehat dengan overlay gelap.
  - Kolom kanan menampilkan form pendaftaran di dalam card putih.
- **Mobile / tablet kecil**: kolom hero disembunyikan, brand ditampilkan di atas form.
- Visual utama bersih, modern, friendly, dan fokus pada onboarding pengguna baru.
- Warna utama adalah hijau tua `#007a35`, background soft blue-gray `#f4f7fb`, dan warna teks gelap `#071727`.
- Font menggunakan **Plus Jakarta Sans**, berbeda dari beberapa halaman dashboard NutriTrack lain yang memakai Poppins/Nunito/Inter. Untuk konsistensi aplikasi, font ini bisa tetap dipakai khusus auth pages atau disatukan ke design system utama.

---

## 2. Tujuan Implementasi React PWA

Halaman ini harus diubah dari HTML statis menjadi halaman React yang:

1. Memiliki route `/register`.
2. Menggunakan Tailwind lokal, bukan CDN.
3. Menyimpan state form dengan `useState` atau `react-hook-form`.
4. Memvalidasi nama, email, password, konfirmasi password, dan checkbox persetujuan.
5. Menampilkan password strength secara dinamis.
6. Menampilkan state loading saat submit.
7. Setelah register sukses, redirect ke `/verify-email`.
8. Tetap responsif dan nyaman digunakan di mode PWA mobile.

---

## 3. Struktur Visual Halaman

```txt
RegisterPage
├── AuthSplitLayout
│   ├── AuthHeroPanel      desktop only
│   │   ├── BrandLogo
│   │   ├── EyebrowText
│   │   ├── HeroHeadline
│   │   └── HeroDescription
│   └── RegisterFormPanel
│       ├── MobileBrandLogo
│       ├── RegisterCard
│       │   ├── StepIndicator
│       │   ├── Title + Subtitle
│       │   ├── RegisterForm
│       │   │   ├── FullNameInput
│       │   │   ├── EmailInput
│       │   │   ├── PasswordInput
│       │   │   ├── ConfirmPasswordInput
│       │   │   ├── PasswordStrengthMeter
│       │   │   ├── TermsCheckbox
│       │   │   └── SubmitButton
│       │   └── LoginLink
```

---

## 4. Design Token

### 4.1 Token Warna Utama

| Token | Nilai | Fungsi |
|---|---:|---|
| `primary` | `#007a35` | Brand, CTA, icon logo, focus border, text link |
| `mint` | `#e9f8ef` | Soft surface pendukung, success/brand pale background |
| `ink` | `#071727` | Teks utama |
| `auth-bg` | `#f4f7fb` | Background global halaman auth |
| `white` | `#ffffff` | Card, form container |
| `slate-200` | Tailwind default | Border input/card |
| `slate-50` | Tailwind default | Input background |
| `slate-500/600/700` | Tailwind default | Teks sekunder dan label |

### 4.2 Rekomendasi Tailwind Theme

Gunakan Tailwind lokal:

```js
// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Plus Jakarta Sans", "system-ui", "sans-serif"],
      },
      colors: {
        primary: "#007a35",
        mint: "#e9f8ef",
        ink: "#071727",
        "auth-bg": "#f4f7fb",
      },
      borderRadius: {
        "auth-card": "28px",
        "auth-xl": "32px",
      },
      boxShadow: {
        "auth-card": "0 24px 60px rgba(15, 23, 42, 0.08)",
        "auth-button": "0 16px 32px rgba(0, 122, 53, 0.20)",
      },
    },
  },
  plugins: [],
};
```

---

## 5. Typography

### 5.1 Font

HTML asli memakai:

```html
Plus Jakarta Sans
```

Ini cocok untuk auth page karena:

- bentuknya modern dan profesional;
- berat font `700–800` tampak kuat untuk CTA;
- tetap readable di input dan mobile.

### 5.2 Hierarki Teks

| Elemen | Class HTML Asli | Rekomendasi React/Tailwind |
|---|---|---|
| Brand | `font-black text-2xl` | `font-black text-2xl leading-none` |
| Hero eyebrow | `uppercase tracking-[0.32em] text-sm font-bold` | `text-xs md:text-sm uppercase tracking-[0.32em] font-extrabold` |
| Hero heading | `text-5xl font-black leading-tight` | `text-4xl xl:text-5xl font-black leading-tight` |
| Card heading | `text-3xl font-black` | `text-3xl md:text-4xl font-black tracking-tight` |
| Body copy | `text-slate-500` | `text-sm md:text-base text-slate-500 leading-relaxed` |
| Label | `text-sm font-bold text-slate-700` | `text-sm font-bold text-slate-700` |
| CTA | `font-extrabold` | `font-extrabold tracking-tight` |

---

## 6. Layout Global

### 6.1 Body

HTML asli:

```html
<body class="min-h-screen font-sans text-ink bg-[#f4f7fb]">
```

Rekomendasi React:

```jsx
<div className="min-h-screen bg-auth-bg text-ink font-sans">
  <main className="min-h-screen grid lg:grid-cols-[0.95fr_1.05fr]">
    ...
  </main>
</div>
```

### 6.2 Split Grid

```html
<main class="min-h-screen grid lg:grid-cols-[0.95fr_1.05fr]">
```

Interpretasi:

- kiri 47.5%;
- kanan 52.5%;
- desain sengaja memberi ruang lebih untuk form.

Rekomendasi:

```jsx
<main className="min-h-screen grid lg:grid-cols-[0.95fr_1.05fr]">
  <AuthHeroPanel />
  <RegisterFormPanel />
</main>
```

---

## 7. Elemen 1 — Auth Hero Panel

### 7.1 Fungsi

Hero panel berfungsi sebagai visual branding dan emotional hook. Panel ini hanya muncul di desktop:

```html
<section class="relative hidden lg:flex items-end overflow-hidden bg-cover bg-center">
```

### 7.2 Background

HTML memakai inline style:

```css
background-image:
  linear-gradient(180deg, rgba(7,23,39,.06), rgba(7,23,39,.82)),
  url('https://images.unsplash.com/photo-1547592180-85f173990554?...');
```

Untuk React lokal, hindari inline style jika bisa. Gunakan salah satu:

#### Opsi A — CSS variable

```jsx
<section
  className="relative hidden overflow-hidden bg-cover bg-center lg:flex lg:items-end"
  style={{ "--auth-bg-url": `url(${heroImage})` }}
>
```

CSS:

```css
.auth-register-hero {
  background-image:
    linear-gradient(180deg, rgba(7, 23, 39, 0.06), rgba(7, 23, 39, 0.82)),
    var(--auth-bg-url);
}
```

#### Opsi B — Tailwind arbitrary value

Bisa, tetapi kurang maintainable untuk URL panjang.

### 7.3 React Component

```jsx
export function AuthHeroPanel() {
  return (
    <section className="auth-register-hero relative hidden overflow-hidden bg-cover bg-center lg:flex lg:items-end">
      <a className="absolute left-8 top-8 flex items-center gap-3 text-white" href="/">
        <span className="material-symbols-outlined flex h-11 w-11 items-center justify-center rounded-xl bg-primary">
          nutrition
        </span>
        <div>
          <p className="text-2xl font-black leading-none">NutriTrack</p>
          <p className="text-[10px] uppercase tracking-[0.28em] text-white/70">
            Pro Companion
          </p>
        </div>
      </a>

      <div className="max-w-xl p-12 text-white">
        <p className="mb-5 text-sm font-bold uppercase tracking-[0.32em] text-green-200">
          Create account
        </p>
        <h1 className="mb-5 text-5xl font-black leading-tight">
          Bangun rencana sehat yang personal.
        </h1>
        <p className="text-lg leading-relaxed text-white/80">
          Daftar, verifikasi email, lalu lanjut ke onboarding untuk menghitung
          target kalori dan makro.
        </p>
      </div>
    </section>
  );
}
```

### 7.4 Review UI

**Kuat:**

- Visual brand premium.
- Overlay membuat teks terbaca.
- Copywriting jelas mengarahkan ke onboarding.

**Perlu ditingkatkan:**

- Asset eksternal Unsplash sebaiknya diganti local asset atau CDN milik project.
- Tambahkan `alt` jika menggunakan elemen `<img>`, atau gunakan decorative background dengan `aria-hidden`.
- Tambahkan subtle motion pada headline/brand saat page load.

---

## 8. Elemen 2 — Mobile Brand Logo

Pada mobile, hero panel tidak muncul, sehingga brand logo dimunculkan di atas card:

```html
<a class="lg:hidden inline-flex items-center gap-3 mb-8" href="index.html">
```

React:

```jsx
function MobileAuthBrand() {
  return (
    <a className="mb-8 inline-flex items-center gap-3 lg:hidden" href="/">
      <span className="material-symbols-outlined flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-white">
        nutrition
      </span>
      <div>
        <p className="text-2xl font-black leading-none text-primary">NutriTrack</p>
        <p className="text-[10px] uppercase tracking-[0.28em] text-slate-500">
          Pro Companion
        </p>
      </div>
    </a>
  );
}
```

---

## 9. Elemen 3 — Register Card

HTML asli:

```html
<div class="bg-white rounded-[28px] shadow-xl shadow-slate-900/8 border border-slate-200 p-8">
```

Catatan: `shadow-slate-900/8` bukan opacity standar Tailwind default. Jika Tailwind tidak mengenali `/8`, gunakan arbitrary value atau extend shadow.

Rekomendasi:

```jsx
<div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-auth-card sm:p-8">
```

Mobile padding bisa dibuat lebih compact:

```txt
p-6 sm:p-8
```

---

## 10. Elemen 4 — Step Indicator

HTML asli:

```html
<div class="flex items-center gap-2 text-xs font-extrabold text-slate-500 mb-8">
  <span class="text-primary">1. Buat Akun</span>
  <span>-></span>
  <span>2. Verifikasi</span>
  <span>-></span>
  <span>3. Setup Profil</span>
</div>
```

### 10.1 Perbaikan

Gunakan semantic steps:

```jsx
const steps = [
  { label: "Buat Akun", active: true },
  { label: "Verifikasi", active: false },
  { label: "Setup Profil", active: false },
];
```

Component:

```jsx
function AuthStepIndicator({ currentStep = 1 }) {
  const steps = ["Buat Akun", "Verifikasi", "Setup Profil"];

  return (
    <ol className="mb-8 flex flex-wrap items-center gap-2 text-xs font-extrabold text-slate-500">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const active = stepNumber === currentStep;

        return (
          <li key={step} className="flex items-center gap-2">
            <span className={active ? "text-primary" : ""}>
              {stepNumber}. {step}
            </span>
            {index < steps.length - 1 && <span aria-hidden="true">→</span>}
          </li>
        );
      })}
    </ol>
  );
}
```

### 10.2 UX Note

Untuk production, tambahkan:

- `aria-current="step"` pada step aktif.
- Gunakan arrow `→`, bukan string `->`, agar lebih rapi.

---

## 11. Elemen 5 — Form Register

### 11.1 Field

Field yang ada:

| Field | Type | Required | Catatan |
|---|---|---:|---|
| Nama Lengkap | text | Ya | default `Alex Carter` untuk demo |
| Email | email | Ya | default `alex@nutritrack.app` |
| Password | password | Ya | default demo `nutritrack` |
| Konfirmasi | password | Ya | harus sama dengan password |
| Terms checkbox | checkbox | Ya | wajib disetujui |

### 11.2 React State

```jsx
const [form, setForm] = useState({
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
  acceptedTerms: false,
});
```

### 11.3 Reusable Input Component

```jsx
function AuthInput({
  label,
  type = "text",
  value,
  onChange,
  error,
  autoComplete,
  placeholder,
}) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-slate-700">{label}</span>
      <input
        className={[
          "mt-2 h-12 w-full rounded-2xl border bg-slate-50 px-4 outline-none transition-all",
          "focus:border-primary focus:ring-4 focus:ring-green-900/10",
          error ? "border-red-300 bg-red-50" : "border-slate-200",
        ].join(" ")}
        type={type}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
      />
      {error && <p className="mt-2 text-xs font-bold text-red-600">{error}</p>}
    </label>
  );
}
```

---

## 12. Validasi Form

### 12.1 Rules

```txt
Nama lengkap:
- wajib diisi
- minimal 2 karakter

Email:
- wajib
- format email valid

Password:
- wajib
- minimal 8 karakter direkomendasikan
- ideal: huruf besar, huruf kecil, angka, simbol

Konfirmasi password:
- wajib
- harus sama dengan password

Terms:
- wajib dicentang
```

### 12.2 Validator

```js
export function validateRegister(values) {
  const errors = {};

  if (!values.fullName.trim()) {
    errors.fullName = "Nama lengkap wajib diisi.";
  } else if (values.fullName.trim().length < 2) {
    errors.fullName = "Nama minimal 2 karakter.";
  }

  if (!values.email.trim()) {
    errors.email = "Email wajib diisi.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Format email tidak valid.";
  }

  if (!values.password) {
    errors.password = "Password wajib diisi.";
  } else if (values.password.length < 8) {
    errors.password = "Password minimal 8 karakter.";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Konfirmasi password wajib diisi.";
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Konfirmasi password tidak sama.";
  }

  if (!values.acceptedTerms) {
    errors.acceptedTerms = "Anda wajib menyetujui syarat dan kebijakan privasi.";
  }

  return errors;
}
```

---

## 13. Elemen 6 — Password Strength Meter

HTML asli:

```html
<div class="grid grid-cols-5 gap-2">
  <span class="h-2 rounded-full bg-primary"></span>
  ...
  <span class="h-2 rounded-full bg-slate-200"></span>
</div>
```

### 13.1 Behavior

Di React, meter harus dinamis:

| Score | Label | Warna |
|---:|---|---|
| 0 | Sangat lemah | `bg-slate-200` |
| 1 | Lemah | `bg-red-500` |
| 2 | Cukup | `bg-orange-500` |
| 3 | Baik | `bg-yellow-500` |
| 4 | Kuat | `bg-primary` |
| 5 | Sangat kuat | `bg-primary` |

### 13.2 Helper

```js
export function getPasswordStrength(password) {
  let score = 0;

  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  const labels = ["Kosong", "Lemah", "Cukup", "Baik", "Kuat", "Sangat kuat"];

  return {
    score,
    label: labels[score],
  };
}
```

### 13.3 Component

```jsx
function PasswordStrengthMeter({ password }) {
  const { score, label } = getPasswordStrength(password);

  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-xs font-bold">
        <span>Kekuatan password</span>
        <span className={score >= 4 ? "text-primary" : "text-slate-500"}>
          {label}
        </span>
      </div>

      <div className="grid grid-cols-5 gap-2" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, index) => (
          <span
            key={index}
            className={[
              "h-2 rounded-full transition-colors",
              index < score ? "bg-primary" : "bg-slate-200",
            ].join(" ")}
          />
        ))}
      </div>
    </div>
  );
}
```

---

## 14. Elemen 7 — Terms Checkbox

HTML asli:

```html
<label class="flex items-start gap-3 text-sm text-slate-600">
  <input class="mt-1 rounded border-slate-300 text-primary focus:ring-primary" required type="checkbox" checked/>
  <span>Saya setuju...</span>
</label>
```

### 14.1 Improvement

- Jangan default `checked` di production.
- Gunakan controlled checkbox.
- Tambahkan error text jika belum dicentang.

React:

```jsx
<label className="flex items-start gap-3 text-sm text-slate-600">
  <input
    className="mt-1 rounded border-slate-300 text-primary focus:ring-primary"
    type="checkbox"
    checked={form.acceptedTerms}
    onChange={(e) => setForm({ ...form, acceptedTerms: e.target.checked })}
  />
  <span>
    Saya setuju dengan{" "}
    <a className="font-bold text-primary hover:underline" href="/terms">
      Syarat
    </a>{" "}
    dan{" "}
    <a className="font-bold text-primary hover:underline" href="/privacy">
      Kebijakan Privasi
    </a>
    .
  </span>
</label>
```

---

## 15. Elemen 8 — Submit Button

HTML asli:

```html
<button class="w-full h-12 rounded-2xl bg-primary text-white font-extrabold shadow-lg shadow-green-900/20 flex items-center justify-center gap-2">
  <span class="material-symbols-outlined">person_add</span>
  Daftar Sekarang
</button>
```

### 15.1 State

Button perlu beberapa state:

| State | UI |
|---|---|
| Idle | icon `person_add`, text `Daftar Sekarang` |
| Loading | spinner, text `Mendaftarkan...` |
| Success | icon `check`, text `Berhasil` |
| Disabled | opacity 60%, cursor not-allowed |

Component:

```jsx
function SubmitButton({ loading }) {
  return (
    <button
      className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-primary font-extrabold text-white shadow-lg shadow-green-900/20 transition-all hover:-translate-y-0.5 hover:shadow-xl active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
      type="submit"
      disabled={loading}
    >
      <span className={loading ? "animate-spin material-symbols-outlined" : "material-symbols-outlined"}>
        {loading ? "progress_activity" : "person_add"}
      </span>
      {loading ? "Mendaftarkan..." : "Daftar Sekarang"}
    </button>
  );
}
```

---

## 16. Page Flow

HTML asli:

```js
document.getElementById('registerForm').addEventListener('submit', e => {
  e.preventDefault();
  location.href = 'verify-email.html'
});
```

React Router replacement:

```jsx
const navigate = useNavigate();

async function handleSubmit(event) {
  event.preventDefault();

  const errors = validateRegister(form);
  setErrors(errors);
  if (Object.keys(errors).length > 0) return;

  setLoading(true);

  try {
    // await authApi.register(form)
    navigate("/verify-email", {
      state: { email: form.email },
    });
  } finally {
    setLoading(false);
  }
}
```

---

## 17. Rekomendasi Struktur File

```txt
src/
├── pages/
│   └── auth/
│       ├── RegisterPage.jsx
│       └── VerifyEmailPage.jsx
├── components/
│   └── auth/
│       ├── AuthBrand.jsx
│       ├── AuthHeroPanel.jsx
│       ├── AuthInput.jsx
│       ├── AuthStepIndicator.jsx
│       ├── PasswordField.jsx
│       ├── PasswordStrengthMeter.jsx
│       └── AuthSubmitButton.jsx
├── utils/
│   └── authValidation.js
└── styles/
    └── auth.css
```

---

## 18. RegisterPage.jsx — Sample Implementasi

```jsx
import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validateRegister } from "../../utils/authValidation";
import { PasswordStrengthMeter } from "../../components/auth/PasswordStrengthMeter";

const initialForm = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
  acceptedTerms: false,
};

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const canSubmit = useMemo(() => {
    return (
      form.fullName &&
      form.email &&
      form.password &&
      form.confirmPassword &&
      form.acceptedTerms &&
      !loading
    );
  }, [form, loading]);

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const nextErrors = validateRegister(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      navigate("/verify-email", { state: { email: form.email } });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen grid bg-auth-bg text-ink font-sans lg:grid-cols-[0.95fr_1.05fr]">
      <section className="auth-register-hero relative hidden overflow-hidden bg-cover bg-center lg:flex lg:items-end">
        <Link className="absolute left-8 top-8 flex items-center gap-3 text-white" to="/">
          <span className="material-symbols-outlined flex h-11 w-11 items-center justify-center rounded-xl bg-primary">
            nutrition
          </span>
          <div>
            <p className="text-2xl font-black leading-none">NutriTrack</p>
            <p className="text-[10px] uppercase tracking-[0.28em] text-white/70">
              Pro Companion
            </p>
          </div>
        </Link>

        <div className="max-w-xl p-12 text-white">
          <p className="mb-5 text-sm font-bold uppercase tracking-[0.32em] text-green-200">
            Create account
          </p>
          <h1 className="mb-5 text-5xl font-black leading-tight">
            Bangun rencana sehat yang personal.
          </h1>
          <p className="text-lg text-white/80">
            Daftar, verifikasi email, lalu lanjut ke onboarding untuk menghitung
            target kalori dan makro.
          </p>
        </div>
      </section>

      <section className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-xl">
          <Link className="mb-8 inline-flex items-center gap-3 lg:hidden" to="/">
            <span className="material-symbols-outlined flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-white">
              nutrition
            </span>
            <div>
              <p className="text-2xl font-black leading-none text-primary">NutriTrack</p>
              <p className="text-[10px] uppercase tracking-[0.28em] text-slate-500">
                Pro Companion
              </p>
            </div>
          </Link>

          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-auth-card sm:p-8">
            <ol className="mb-8 flex flex-wrap items-center gap-2 text-xs font-extrabold text-slate-500">
              <li className="text-primary" aria-current="step">1. Buat Akun</li>
              <li aria-hidden="true">→</li>
              <li>2. Verifikasi</li>
              <li aria-hidden="true">→</li>
              <li>3. Setup Profil</li>
            </ol>

            <h2 className="mb-2 text-3xl font-black">Daftar Gratis</h2>
            <p className="mb-8 text-slate-500">
              Mulai perjalanan sehatmu tanpa kartu kredit.
            </p>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="grid gap-4 sm:grid-cols-2">
                <AuthInput
                  label="Nama Lengkap"
                  value={form.fullName}
                  onChange={(e) => updateField("fullName", e.target.value)}
                  error={errors.fullName}
                  autoComplete="name"
                />
                <AuthInput
                  label="Email"
                  type="email"
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  error={errors.email}
                  autoComplete="email"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <AuthInput
                  label="Password"
                  type="password"
                  value={form.password}
                  onChange={(e) => updateField("password", e.target.value)}
                  error={errors.password}
                  autoComplete="new-password"
                />
                <AuthInput
                  label="Konfirmasi"
                  type="password"
                  value={form.confirmPassword}
                  onChange={(e) => updateField("confirmPassword", e.target.value)}
                  error={errors.confirmPassword}
                  autoComplete="new-password"
                />
              </div>

              <PasswordStrengthMeter password={form.password} />

              <label className="flex items-start gap-3 text-sm text-slate-600">
                <input
                  className="mt-1 rounded border-slate-300 text-primary focus:ring-primary"
                  type="checkbox"
                  checked={form.acceptedTerms}
                  onChange={(e) => updateField("acceptedTerms", e.target.checked)}
                />
                <span>
                  Saya setuju dengan{" "}
                  <Link className="font-bold text-primary hover:underline" to="/terms">
                    Syarat
                  </Link>{" "}
                  dan{" "}
                  <Link className="font-bold text-primary hover:underline" to="/privacy">
                    Kebijakan Privasi
                  </Link>
                  .
                </span>
              </label>
              {errors.acceptedTerms && (
                <p className="text-xs font-bold text-red-600">{errors.acceptedTerms}</p>
              )}

              <button
                className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-primary font-extrabold text-white shadow-lg shadow-green-900/20 transition-all hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-60"
                type="submit"
                disabled={!canSubmit}
              >
                <span className="material-symbols-outlined">
                  {loading ? "progress_activity" : "person_add"}
                </span>
                {loading ? "Mendaftarkan..." : "Daftar Sekarang"}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-slate-600">
              Sudah punya akun?{" "}
              <Link className="font-extrabold text-primary hover:underline" to="/login">
                Masuk
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
```

---

## 19. CSS Tambahan

```css
.auth-register-hero {
  background-image:
    linear-gradient(180deg, rgba(7, 23, 39, 0.06), rgba(7, 23, 39, 0.82)),
    url("/images/auth/register-healthy-food.webp");
}

@media (prefers-reduced-motion: reduce) {
  .auth-animate {
    animation: none !important;
    transition: none !important;
  }
}
```

---

## 20. Animasi dan Micro-Interaction

| Elemen | Animasi | Tailwind |
|---|---|---|
| Auth card | Fade + slide up saat load | `animate-[fadeUp_.45s_ease-out]` |
| Button | Hover lift, active scale | `hover:-translate-y-0.5 active:scale-[0.98]` |
| Input focus | Ring hijau soft | `focus:ring-4 focus:ring-green-900/10` |
| Hero background | Slow zoom opsional | custom CSS |
| Step active | Warna primary | `text-primary` |
| Password meter | transition warna | `transition-colors duration-300` |

Custom keyframes:

```js
// tailwind.config.js
theme: {
  extend: {
    keyframes: {
      fadeUp: {
        "0%": { opacity: "0", transform: "translateY(12px)" },
        "100%": { opacity: "1", transform: "translateY(0)" },
      },
    },
    animation: {
      fadeUp: "fadeUp 0.45s ease-out both",
    },
  },
}
```

---

## 21. Accessibility Checklist

- Logo link harus memiliki teks visible atau `aria-label`.
- Step indicator gunakan `<ol>` dan `aria-current="step"`.
- Input harus memiliki label visible.
- Error validasi harus dikaitkan dengan field memakai `aria-describedby`.
- Checkbox terms harus clickable di seluruh label.
- Button loading harus tetap memberi feedback teks.
- Link terms/privacy harus dapat diakses keyboard.
- Kontras primary `#007a35` pada putih sudah baik.
- Jangan gunakan value demo pada production.
- Jangan simpan password di localStorage.

---

## 22. Security / Auth Notes

Untuk production:

- Jangan redirect langsung tanpa validasi backend.
- Gunakan HTTPS.
- Password minimal 8–12 karakter.
- Validasi password juga harus dilakukan di backend.
- Jangan mengirim password ke analytics.
- Setelah register, backend harus mengirim email verification token.
- Token verifikasi harus single-use dan expired.
- Jika email sudah digunakan, tampilkan pesan aman: “Email sudah terdaftar atau tidak valid.”

---

## 23. Data Contract

Payload register:

```json
{
  "fullName": "Alex Carter",
  "email": "alex@nutritrack.app",
  "password": "********",
  "acceptedTerms": true
}
```

Response sukses:

```json
{
  "success": true,
  "message": "Verification email sent.",
  "email": "alex@nutritrack.app"
}
```

Response error:

```json
{
  "success": false,
  "errors": {
    "email": "Email sudah digunakan."
  }
}
```

---

## 24. Prioritas Implementasi

### High Priority

1. Ubah Tailwind CDN ke Tailwind lokal.
2. Buat reusable auth components.
3. Implementasi validasi form.
4. Implementasi password strength dinamis.
5. Implementasi redirect ke `/verify-email`.
6. Hapus default value demo.

### Medium Priority

1. Tambahkan show/hide password.
2. Tambahkan loading dan error alert.
3. Optimasi gambar hero ke WebP/AVIF lokal.
4. Tambahkan page transition.

### Low Priority

1. Social login.
2. Trust badges.
3. Microcopy tambahan untuk privacy/security.
4. A/B copywriting hero.

---

## 25. Kesimpulan

`register.html` sudah memiliki foundation UI yang kuat untuk auth flow NutriTrack. Elemen terpenting yang wajib dipertahankan saat konversi ke React PWA adalah:

- split-screen hero desktop;
- mobile brand fallback;
- card putih rounded besar;
- step indicator register → verify → setup;
- form grid dua kolom;
- CTA hijau solid;
- password strength meter;
- terms consent;
- redirect flow menuju email verification.

Untuk production, perbaikan utama adalah menjadikan semua field controlled, menghapus default value demo, menambahkan validasi real-time, dan mengganti redirect statis dengan flow backend authentication.
