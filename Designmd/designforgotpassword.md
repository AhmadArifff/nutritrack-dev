# designforgotpassword.md — NutriTrack Forgot Password Design System & React PWA Implementation Guide

> Dokumen ini dibuat untuk mengonversi tampilan `forgot-password.html` ke project lokal berbasis **React + Vite + PWA + Tailwind CSS**. Fokus halaman ini adalah flow **permintaan reset password melalui email** dengan tampilan auth card yang clean, ringan, dan konsisten dengan branding NutriTrack.

---

## 1. Ringkasan Tampilan

Halaman `forgot-password.html` adalah halaman auth satu layar dengan komposisi:

- **Background full-screen** berwarna biru-abu muda.
- **Card utama** di tengah layar.
- **Logo NutriTrack** di bagian atas card.
- **Heading**: `Lupa Kata Sandi`.
- **Deskripsi instruksional** untuk memasukkan email.
- **Form email** dengan input rounded.
- **Primary CTA**: `Kirim Link Reset`.
- **Secondary link**: `Kembali ke login`.
- **Demo behavior**: submit form mengarahkan langsung ke `reset-password.html`.

Karakter visual halaman ini lebih sederhana dibanding dashboard internal NutriTrack. Halaman ini cocok dijadikan bagian dari **public/auth flow** yang tidak memakai sidebar.

---

## 2. Tujuan Halaman

### Fungsi utama

1. User memasukkan email akun.
2. Sistem memvalidasi format email.
3. Sistem mengirim link reset password.
4. User mendapat feedback visual.
5. Pada demo HTML saat ini, submit langsung redirect ke reset page.

### Versi React yang disarankan

Untuk project lokal React PWA, flow ideal:

1. User mengisi email.
2. Validasi client-side.
3. Submit ke API endpoint:
   - `POST /api/auth/forgot-password`
4. Tampilkan toast/success state:
   - “Jika email terdaftar, link reset telah dikirim.”
5. Jangan selalu mengungkapkan apakah email terdaftar atau tidak demi keamanan.
6. Redirect opsional ke halaman “check email” atau tetap di halaman yang sama.

---

## 3. Struktur Visual dari HTML Asli

```html
<body class="min-h-screen bg-[#f4f7fb] font-sans text-ink flex items-center justify-center px-6">
  <main class="max-w-md w-full bg-white border border-slate-200 rounded-[32px] p-8 shadow-xl">
    <a href="index.html">Logo NutriTrack</a>
    <h1>Lupa Kata Sandi</h1>
    <p>Masukkan email...</p>
    <form id="forgotForm">
      <label>Email</label>
      <input type="email" value="alex@nutritrack.app" required />
      <button>Kirim Link Reset</button>
    </form>
    <a href="login.html">Kembali ke login</a>
  </main>
</body>
```

---

## 4. Design Tokens

### 4.1 Token warna dari file HTML

| Token | Hex | Fungsi |
|---|---:|---|
| `primary` | `#007a35` | Logo, CTA utama, focus border, link |
| `mint` | `#e9f8ef` | Accent background opsional |
| `ink` | `#071727` | Teks utama |
| `page-bg` | `#f4f7fb` | Background body |
| `card` | `#ffffff` | Background card |
| `border-soft` | `#e2e8f0` / Tailwind `slate-200` | Border card dan input |
| `input-bg` | `#f8fafc` / Tailwind `slate-50` | Background input |
| `text-muted` | `#475569` / Tailwind `slate-600` | Deskripsi |
| `text-label` | `#334155` / Tailwind `slate-700` | Label field |
| `focus-ring` | `rgba(20, 83, 45, 0.10)` / `green-900/10` | Ring saat field focus |

### 4.2 Rekomendasi Tailwind config lokal

Gunakan Tailwind lokal, bukan CDN.

```js
// tailwind.config.js
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        auth: {
          primary: "#007a35",
          mint: "#e9f8ef",
          ink: "#071727",
          page: "#f4f7fb",
          card: "#ffffff",
          border: "#e2e8f0",
          input: "#f8fafc",
          muted: "#475569",
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "ui-sans-serif", "system-ui", "sans-serif"],
      },
      borderRadius: {
        auth: "32px",
      },
      boxShadow: {
        auth: "0 24px 60px rgba(15, 23, 42, 0.12)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
```

---

## 5. Typography

HTML asli memakai **Plus Jakarta Sans**. Ini memberi karakter modern, premium, dan cocok untuk auth screen.

| Elemen | Class HTML | Rekomendasi React/Tailwind |
|---|---|---|
| Body | `font-sans` | `font-sans text-auth-ink` |
| Logo text | `font-black text-2xl` | `text-2xl font-extrabold tracking-tight` |
| Page heading | `text-3xl font-black` | `text-3xl sm:text-4xl font-extrabold` |
| Description | `text-slate-600` | `text-sm sm:text-base text-auth-muted leading-relaxed` |
| Label | `text-sm font-bold` | `text-sm font-bold text-slate-700` |
| Button | `font-extrabold` | `font-extrabold tracking-tight` |

---

## 6. Layout System

### 6.1 Page canvas

```jsx
<div className="min-h-screen bg-auth-page font-sans text-auth-ink flex items-center justify-center px-6 py-10">
  <ForgotPasswordCard />
</div>
```

### 6.2 Auth card

Karakter card:

- Lebar maksimum: `max-w-md`.
- Full width pada mobile: `w-full`.
- Background putih.
- Border lembut.
- Radius besar: `rounded-[32px]`.
- Padding: `p-8`.
- Shadow besar: `shadow-xl`.

Rekomendasi:

```jsx
<main className="w-full max-w-md rounded-[32px] border border-auth-border bg-white p-8 shadow-auth">
  ...
</main>
```

### 6.3 Responsiveness

| Breakpoint | Behavior |
|---|---|
| Mobile | Card full width, padding body `px-6`, heading tetap terbaca |
| Tablet | Card tetap `max-w-md`, berada di tengah |
| Desktop | Card tetap compact agar fokus user tidak pecah |
| Small height | Tambahkan `py-10` agar card tidak menempel viewport |

---

## 7. Review Per Elemen Tampilan

### 7.1 Body background

**HTML asli:**

```html
<body class="min-h-screen bg-[#f4f7fb] font-sans text-ink flex items-center justify-center px-6">
```

**Review:**

- Sudah tepat untuk auth screen.
- Background clean, tidak mengganggu form.
- Tidak ada layout sidebar karena ini halaman public/auth.

**Upgrade React:**

Tambahkan subtle decorative blobs agar visual lebih premium tetapi tetap ringan.

```jsx
<div className="pointer-events-none absolute inset-0 overflow-hidden">
  <div className="absolute -top-32 -right-24 h-80 w-80 rounded-full bg-auth-primary/5 blur-3xl" />
  <div className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-auth-mint blur-3xl" />
</div>
```

---

### 7.2 Logo / brand link

**HTML asli:**

```html
<a class="inline-flex items-center gap-3 mb-8" href="index.html">
  <span class="w-11 h-11 rounded-xl bg-primary text-white flex items-center justify-center material-symbols-outlined">nutrition</span>
  <span class="font-black text-2xl text-primary">NutriTrack</span>
</a>
```

**Review:**

- Ikon nutrition + teks brand sudah jelas.
- `href="index.html"` mengarah ke landing page.
- Logo area berfungsi sebagai back-to-home.

**Implementasi React:**

```jsx
import { Link } from "react-router-dom";

export function AuthLogo() {
  return (
    <Link to="/" className="mb-8 inline-flex items-center gap-3">
      <span className="material-symbols-outlined flex h-11 w-11 items-center justify-center rounded-xl bg-auth-primary text-white">
        nutrition
      </span>
      <span className="text-2xl font-extrabold text-auth-primary">
        NutriTrack
      </span>
    </Link>
  );
}
```

**Accessibility:**

Tambahkan `aria-label`.

```jsx
<Link to="/" aria-label="Go to NutriTrack home" ...>
```

---

### 7.3 Heading

**HTML asli:**

```html
<h1 class="text-3xl font-black mb-3">Lupa Kata Sandi</h1>
```

**Review:**

- Heading singkat dan jelas.
- Bahasa sudah Indonesia.
- Cocok sebagai `h1`.

**Rekomendasi:**

```jsx
<h1 className="mb-3 text-3xl font-extrabold tracking-tight text-auth-ink">
  Lupa Kata Sandi
</h1>
```

---

### 7.4 Description copy

**HTML asli:**

```html
<p class="text-slate-600 mb-7">
  Masukkan email untuk menerima link reset. Demo frontend akan membuka halaman reset langsung.
</p>
```

**Review:**

- Untuk production, frasa “Demo frontend...” harus dihapus.
- Copy sebaiknya lebih aman: jangan ungkap status email terdaftar.

**Copy production yang disarankan:**

```text
Masukkan email yang terhubung dengan akun NutriTrack. Jika email tersebut terdaftar, kami akan mengirimkan tautan reset password.
```

**React:**

```jsx
<p className="mb-7 text-auth-muted leading-relaxed">
  Masukkan email yang terhubung dengan akun NutriTrack. Jika email tersebut terdaftar,
  kami akan mengirimkan tautan reset password.
</p>
```

---

### 7.5 Email field

**HTML asli:**

```html
<label class="block">
  <span class="text-sm font-bold text-slate-700">Email</span>
  <input
    class="mt-2 w-full h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 outline-none focus:ring-4 focus:ring-green-900/10 focus:border-primary"
    required
    type="email"
    value="alex@nutritrack.app"
  />
</label>
```

**Review:**

- Good: label membungkus input.
- Good: `type="email"` dan `required`.
- Problem: value default demo `alex@nutritrack.app` harus dihapus di production.
- Perlu error state.

**React field component:**

```jsx
function EmailField({ value, onChange, error }) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-slate-700">Email</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={[
          "mt-2 h-12 w-full rounded-2xl border bg-slate-50 px-4 outline-none transition",
          "focus:border-auth-primary focus:ring-4 focus:ring-green-900/10",
          error ? "border-red-400 ring-4 ring-red-100" : "border-slate-200",
        ].join(" ")}
        required
        type="email"
        inputMode="email"
        autoComplete="email"
        placeholder="nama@email.com"
        aria-invalid={Boolean(error)}
        aria-describedby={error ? "email-error" : undefined}
      />
      {error && (
        <p id="email-error" className="mt-2 text-sm font-semibold text-red-600">
          {error}
        </p>
      )}
    </label>
  );
}
```

---

### 7.6 Submit button

**HTML asli:**

```html
<button class="w-full h-12 rounded-2xl bg-primary text-white font-extrabold" type="submit">
  Kirim Link Reset
</button>
```

**Review:**

- Ukuran dan radius sudah baik.
- Perlu loading state.
- Perlu disabled state saat submit.
- Perlu hover/active transition.

**React:**

```jsx
<button
  type="submit"
  disabled={isSubmitting}
  className="flex h-12 w-full items-center justify-center rounded-2xl bg-auth-primary font-extrabold text-white shadow-lg shadow-green-900/10 transition hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
>
  {isSubmitting ? "Mengirim..." : "Kirim Link Reset"}
</button>
```

---

### 7.7 Back to login link

**HTML asli:**

```html
<a class="mt-5 inline-flex font-bold text-primary" href="login.html">
  Kembali ke login
</a>
```

**Review:**

- Link sudah jelas.
- Akan lebih baik diberi ikon panah kiri.
- Fokus keyboard perlu terlihat.

**React:**

```jsx
<Link
  to="/login"
  className="mt-5 inline-flex items-center gap-2 font-bold text-auth-primary transition hover:underline focus:outline-none focus:ring-4 focus:ring-green-900/10 rounded-lg"
>
  <span className="material-symbols-outlined text-[18px]">arrow_back</span>
  Kembali ke login
</Link>
```

---

## 8. Behavior & Validation

### 8.1 Validasi email

```js
export function validateForgotPassword(email) {
  const errors = {};

  if (!email.trim()) {
    errors.email = "Email wajib diisi.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Format email tidak valid.";
  }

  return errors;
}
```

### 8.2 Submit flow React

```jsx
async function handleSubmit(event) {
  event.preventDefault();

  const nextErrors = validateForgotPassword(email);
  setErrors(nextErrors);

  if (Object.keys(nextErrors).length > 0) return;

  try {
    setIsSubmitting(true);

    await forgotPasswordApi(email);

    setStatus({
      type: "success",
      message: "Jika email terdaftar, link reset telah dikirim.",
    });
  } catch (error) {
    setStatus({
      type: "error",
      message: "Gagal mengirim link reset. Coba lagi.",
    });
  } finally {
    setIsSubmitting(false);
  }
}
```

### 8.3 API placeholder

```js
export async function forgotPasswordApi(email) {
  const response = await fetch("/api/auth/forgot-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    throw new Error("Failed to send reset link");
  }

  return response.json();
}
```

---

## 9. Animasi & Micro Interaction

### 9.1 Card entrance

Gunakan Tailwind animation custom.

```js
// tailwind.config.js
animation: {
  "auth-enter": "authEnter 420ms cubic-bezier(0.16, 1, 0.3, 1) both",
},
keyframes: {
  authEnter: {
    "0%": { opacity: "0", transform: "translateY(16px) scale(0.98)" },
    "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
  },
},
```

```jsx
<main className="animate-auth-enter ...">
```

### 9.2 Input focus

Sudah ada di HTML:

```html
focus:ring-4 focus:ring-green-900/10 focus:border-primary
```

Pertahankan behavior ini.

### 9.3 Button active

```html
active:scale-[0.98]
```

### 9.4 Reduced motion

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.001ms !important;
    transition-duration: 0.001ms !important;
  }
}
```

---

## 10. Struktur Folder React

```txt
src/
  app/
    router.jsx
  pages/
    auth/
      ForgotPasswordPage.jsx
  components/
    auth/
      AuthLayout.jsx
      AuthLogo.jsx
      AuthCard.jsx
      EmailField.jsx
      AuthSubmitButton.jsx
      AuthStatusMessage.jsx
  services/
    auth.service.js
  utils/
    validators.js
  styles/
    globals.css
```

---

## 11. Implementasi Komponen

### 11.1 AuthLayout.jsx

```jsx
export function AuthLayout({ children }) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-auth-page px-6 py-10 font-sans text-auth-ink">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-auth-primary/5 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-auth-mint blur-3xl" />
      </div>

      <main className="relative z-10 w-full max-w-md rounded-[32px] border border-auth-border bg-white p-8 shadow-auth animate-auth-enter">
        {children}
      </main>
    </div>
  );
}
```

### 11.2 ForgotPasswordPage.jsx

```jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { AuthLayout } from "../../components/auth/AuthLayout";
import { AuthLogo } from "../../components/auth/AuthLogo";
import { validateForgotPassword } from "../../utils/validators";
import { forgotPasswordApi } from "../../services/auth.service";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    const nextErrors = validateForgotPassword(email);
    setErrors(nextErrors);
    setStatus(null);

    if (Object.keys(nextErrors).length > 0) return;

    try {
      setIsSubmitting(true);
      await forgotPasswordApi(email);
      setStatus({
        type: "success",
        message: "Jika email terdaftar, link reset telah dikirim.",
      });
    } catch {
      setStatus({
        type: "error",
        message: "Gagal mengirim link reset. Coba lagi.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthLayout>
      <AuthLogo />

      <h1 className="mb-3 text-3xl font-extrabold tracking-tight">
        Lupa Kata Sandi
      </h1>

      <p className="mb-7 leading-relaxed text-auth-muted">
        Masukkan email yang terhubung dengan akun NutriTrack. Jika email tersebut
        terdaftar, kami akan mengirimkan tautan reset password.
      </p>

      {status && (
        <div
          role="status"
          className={[
            "mb-5 rounded-2xl border px-4 py-3 text-sm font-bold",
            status.type === "success"
              ? "border-green-200 bg-green-50 text-green-800"
              : "border-red-200 bg-red-50 text-red-700",
          ].join(" ")}
        >
          {status.message}
        </div>
      )}

      <form className="space-y-5" onSubmit={handleSubmit} noValidate>
        <label className="block">
          <span className="text-sm font-bold text-slate-700">Email</span>
          <input
            className={[
              "mt-2 h-12 w-full rounded-2xl border bg-slate-50 px-4 outline-none transition",
              "focus:border-auth-primary focus:ring-4 focus:ring-green-900/10",
              errors.email ? "border-red-400" : "border-slate-200",
            ].join(" ")}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="nama@email.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <p id="email-error" className="mt-2 text-sm font-semibold text-red-600">
              {errors.email}
            </p>
          )}
        </label>

        <button
          className="flex h-12 w-full items-center justify-center rounded-2xl bg-auth-primary font-extrabold text-white shadow-lg shadow-green-900/10 transition hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Mengirim..." : "Kirim Link Reset"}
        </button>
      </form>

      <Link
        className="mt-5 inline-flex items-center gap-2 rounded-lg font-bold text-auth-primary hover:underline focus:outline-none focus:ring-4 focus:ring-green-900/10"
        to="/login"
      >
        <span className="material-symbols-outlined text-[18px]">arrow_back</span>
        Kembali ke login
      </Link>
    </AuthLayout>
  );
}
```

---

## 12. PWA Notes

Halaman forgot password termasuk auth route, sehingga:

- Jangan cache response API reset password.
- Boleh cache static shell dan font.
- Hindari menyimpan email reset di localStorage.
- Gunakan secure HTTPS di production.
- Service worker tidak boleh meng-cache endpoint:
  - `/api/auth/forgot-password`
  - `/api/auth/reset-password`

Contoh Workbox denylist:

```js
runtimeCaching: [
  {
    urlPattern: ({ url }) => url.pathname.startsWith("/api/auth/"),
    handler: "NetworkOnly",
  },
]
```

---

## 13. Accessibility Checklist

| Area | Checklist |
|---|---|
| Heading | Gunakan satu `h1` |
| Logo | Tambahkan `aria-label` |
| Input | `label`, `type=email`, `autoComplete=email` |
| Error | Gunakan `aria-invalid` dan `aria-describedby` |
| Status | Gunakan `role=status` |
| Button | Loading text tetap terbaca |
| Keyboard | Semua link/button bisa difokus |
| Focus ring | Jangan hilangkan outline tanpa pengganti |
| Security copy | Jangan ungkap email terdaftar/tidak |

---

## 14. Prioritas Perbaikan dari HTML Asli

### High priority

1. Hapus default value `alex@nutritrack.app`.
2. Ganti demo redirect langsung dengan API submit + success state.
3. Tambahkan validasi email custom.
4. Tambahkan loading dan disabled state.
5. Tambahkan error message accessible.

### Medium priority

1. Tambahkan decorative background blob.
2. Tambahkan toast/success panel.
3. Tambahkan route `/check-email`.
4. Tambahkan analytics event `forgot_password_requested`.

### Low priority

1. Tambahkan entrance animation.
2. Tambahkan dark mode auth.
3. Tambahkan pilihan bahasa.

---

## 15. Acceptance Criteria

Halaman dianggap siap ketika:

- User dapat memasukkan email valid.
- Email invalid memunculkan pesan error.
- Submit valid memanggil API.
- Submit menampilkan loading state.
- Pesan sukses tidak membocorkan apakah email terdaftar.
- Tampilan mobile dan desktop tetap rapi.
- Form dapat digunakan dengan keyboard dan screen reader.
- Tailwind sudah lokal, bukan CDN.
- Route berjalan di React Router.
- Endpoint auth tidak di-cache oleh PWA service worker.

---

## 16. Kesimpulan

`forgot-password.html` sudah punya fondasi visual yang clean dan kuat untuk auth flow NutriTrack. Untuk implementasi React PWA, fokus utama adalah memindahkan behavior dari script inline ke state React, menghapus data demo, menambahkan validasi dan feedback yang aman, lalu menjaga tampilan sederhana dengan primary green `#007a35`, card putih rounded besar, dan focus state yang jelas.
