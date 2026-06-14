# designlogin.md — NutriTrack Login Page Design & React PWA Implementation

> Dokumen ini dibuat untuk mengonversi halaman HTML statis NutriTrack ke project lokal berbasis **React + Vite PWA + Tailwind CSS**.
> Fokus utama: mempertahankan visual asli, merapikan struktur komponen, mengganti CDN Tailwind menjadi konfigurasi lokal, dan menyiapkan state/validasi agar siap diintegrasikan dengan backend.

## 1. Ringkasan Tampilan

Halaman `login.html` adalah halaman autentikasi dengan **split layout desktop**:

- Kolom kiri desktop: hero image makanan sehat, overlay gelap, brand NutriTrack, headline marketing.
- Kolom kanan: centered login form card.
- Mobile: hero image disembunyikan, brand ditampilkan di atas card.
- Flow demo: submit login diarahkan ke `onboarding.html`.
- Visual utama: putih bersih, hijau brand, mint soft, rounded card, input ber-icon, dan CTA solid.

Tujuan implementasi lokal adalah menjadikannya halaman React yang reusable, validasi real-time, dan siap integrasi auth backend.

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

## 3. Utility CSS yang Direkomendasikan

```css
@layer components {
  .auth-page {
    @apply min-h-screen bg-page font-sans text-ink;
  }

  .auth-card {
    @apply bg-white border border-slate-200 rounded-auth-card p-8 shadow-auth;
  }

  .auth-input {
    @apply w-full h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 outline-none
      focus:ring-4 focus:ring-green-900/10 focus:border-primary transition;
  }

  .auth-primary-button {
    @apply w-full h-12 rounded-2xl bg-primary text-white font-extrabold
      shadow-lg shadow-green-900/20 hover:scale-[1.01] active:scale-[0.99]
      transition flex items-center justify-center gap-2;
  }

  .auth-secondary-button {
    @apply h-11 rounded-xl bg-mint text-primary font-bold flex items-center justify-center gap-2;
  }
}
```

## 4. Komponen Icon

```jsx
export function MaterialIcon({ children, className = "" }) {
  return (
    <span className={`material-symbols-outlined ${className}`} aria-hidden="true">
      {children}
    </span>
  );
}
```

## 5. Struktur Elemen Tampilan

### 5.1 Root Layout

```jsx
export default function LoginPage() {
  return (
    <main className="min-h-screen grid lg:grid-cols-[1.05fr_0.95fr] bg-page text-ink font-sans">
      <LoginHero />
      <LoginPanel />
    </main>
  );
}
```

### 5.2 Hero Image Desktop

```jsx
function LoginHero() {
  return (
    <section
      className="relative hidden lg:flex items-end overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage:
          "linear-gradient(180deg, rgba(7,23,39,0.08), rgba(7,23,39,0.78)), url('/assets/auth/login-hero.webp')",
      }}
    >
      <BrandLogo variant="light" className="absolute top-8 left-8" />
      <div className="p-12 max-w-2xl text-white">
        <p className="uppercase tracking-[0.32em] text-sm font-bold text-green-200 mb-5">
          Welcome back
        </p>
        <h1 className="text-5xl font-black leading-tight mb-5">
          Lanjutkan tracking nutrisi hari ini.
        </h1>
        <p className="text-lg text-white/80">
          Masuk untuk membuka dashboard, meal planner, log food, progress, dan komunitas dalam satu pengalaman yang sama.
        </p>
      </div>
    </section>
  );
}
```

**Catatan:** pindahkan gambar remote ke `/src/assets/auth/login-hero.webp` agar lebih stabil untuk PWA dan offline cache.

### 5.3 Login Panel dan Mobile Brand

```jsx
function LoginPanel() {
  return (
    <section className="flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <MobileBrand />
        <div className="auth-card rounded-[28px]">
          <div className="mb-8">
            <h2 className="text-3xl font-black text-ink mb-2">Masuk</h2>
            <p className="text-slate-500">
              Gunakan akun demo untuk masuk ke dashboard NutriTrack.
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
    </section>
  );
}
```

### 5.4 Email Field

```jsx
function EmailField({ value, onChange, error }) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-slate-700">Email</span>
      <div className="mt-2 relative">
        <MaterialIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
          mail
        </MaterialIcon>
        <input
          className="auth-input pl-12 pr-4"
          type="email"
          value={value}
          onChange={onChange}
          autoComplete="email"
          aria-invalid={Boolean(error)}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </label>
  );
}
```

### 5.5 Password Field

Tambahkan show/hide password agar UX lebih baik dari HTML statis.

```jsx
function PasswordField({ value, onChange, error }) {
  const [visible, setVisible] = useState(false);

  return (
    <label className="block">
      <span className="text-sm font-bold text-slate-700">Password</span>
      <div className="mt-2 relative">
        <MaterialIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
          lock
        </MaterialIcon>
        <input
          className="auth-input pl-12 pr-12"
          type={visible ? "text" : "password"}
          value={value}
          onChange={onChange}
          autoComplete="current-password"
        />
        <button
          type="button"
          onClick={() => setVisible(!visible)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary"
          aria-label={visible ? "Sembunyikan password" : "Tampilkan password"}
        >
          <MaterialIcon>{visible ? "visibility_off" : "visibility"}</MaterialIcon>
        </button>
      </div>
    </label>
  );
}
```

### 5.6 Remember Me, Forgot Password, dan CTA

```jsx
function LoginForm() {
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    navigate("/onboarding");
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <EmailField />
      <PasswordField />

      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 text-slate-600">
          <input className="rounded border-slate-300 text-primary focus:ring-primary" type="checkbox" />
          Ingat saya
        </label>
        <Link className="font-bold text-primary hover:underline" to="/forgot-password">
          Lupa sandi?
        </Link>
      </div>

      <button className="auth-primary-button" type="submit">
        <MaterialIcon>login</MaterialIcon>
        Masuk ke Onboarding
      </button>
    </form>
  );
}
```

## 6. Validasi

```js
export function validateLogin(values) {
  const errors = {};

  if (!values.email.trim()) errors.email = "Email wajib diisi.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Format email tidak valid.";
  }

  if (!values.password) errors.password = "Password wajib diisi.";
  else if (values.password.length < 8) errors.password = "Password minimal 8 karakter.";

  return errors;
}
```

## 7. Animasi dan Micro Interaction

| Elemen | Animasi |
|---|---|
| Auth card | `animate-fade-up` saat page load |
| CTA login | `hover:scale-[1.01] active:scale-[0.99]` |
| Input focus | `focus:ring-4 focus:ring-green-900/10` |
| Hero panel | optional slow zoom background |
| Error message | slide down/fade in |

```js
animation: {
  "fade-up": "fadeUp 0.45s ease-out both",
},
keyframes: {
  fadeUp: {
    "0%": { opacity: "0", transform: "translateY(12px)" },
    "100%": { opacity: "1", transform: "translateY(0)" },
  },
},
```

## 8. Catatan Konversi ke React PWA

- Jangan gunakan `location.href` langsung sebagai logic utama. Pakai `useNavigate()` dari React Router.
- Jangan simpan password demo sebagai `value` tetap di production. Untuk demo boleh gunakan `defaultValue`.
- Gunakan controlled input untuk validasi real-time.
- Pisahkan page auth dari app shell dashboard. Halaman auth tidak perlu sidebar.
- Untuk PWA, semua halaman auth/legal wajib bisa dirender offline sebagai fallback shell.

## 9. Struktur File React

```txt
src/
  pages/auth/LoginPage.jsx
  components/auth/AuthHero.jsx
  components/auth/AuthCard.jsx
  components/auth/AuthField.jsx
  components/auth/PasswordField.jsx
  components/brand/BrandLogo.jsx
  components/icons/MaterialIcon.jsx
  utils/validators/authValidators.js
```

## 10. Accessibility Checklist

- Semua input wajib punya `<label>` eksplisit.
- Tombol submit harus punya teks jelas dan state loading.
- Link legal seperti Terms/Privacy harus fokus keyboard-friendly.
- Tambahkan `aria-live="polite"` untuk error/success message.
- Jangan mengandalkan warna saja untuk menandakan error.
- Gunakan `autocomplete` untuk email/password.
- Untuk icon dekoratif, gunakan `aria-hidden="true"`.

## 11. Prioritas Perbaikan

1. Ganti `window.location.href` menjadi `useNavigate`.
2. Tambahkan show/hide password.
3. Tambahkan validasi real-time.
4. Tambahkan loading state dan error alert.
5. Optimasi hero image menjadi WebP lokal.
6. Gunakan route `/login`, bukan file `.html`.
7. Simpan opsi “Ingat saya” ke localStorage hanya jika aman.
