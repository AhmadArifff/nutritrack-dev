# designverifyemail.md — NutriTrack Verify Email Page Implementation Guide

Dokumen ini menjelaskan hasil analisis tampilan `verify-email.html` dan cara mengimplementasikannya ke project lokal berbasis **React PWA + Tailwind CSS**. Fokus utama halaman ini adalah **email verification confirmation screen** setelah user melakukan register.

---

## 1. Ringkasan Tampilan

Halaman verify email menggunakan layout auth sederhana:

- Background global soft gray-blue `#f4f7fb`.
- Card putih centered dengan radius besar `32px`.
- Brand logo NutriTrack di bagian atas.
- Icon besar `outgoing_mail` di dalam container mint.
- Heading utama “Cek email kamu”.
- Deskripsi berisi email tujuan.
- CTA utama menuju onboarding.
- CTA sekunder kembali ke register jika email salah.
- Countdown resend link dalam 60 detik.

Secara UX, halaman ini berfungsi sebagai **bridge screen** antara proses register dan onboarding.

---

## 2. Tujuan Implementasi React PWA

Halaman verify email harus:

1. Memiliki route `/verify-email`.
2. Menerima email dari state register, query string, atau auth context.
3. Menampilkan email user secara dinamis.
4. Menampilkan countdown kirim ulang email.
5. Men-disable tombol resend sampai countdown selesai.
6. Menyediakan CTA “Saya Sudah Verifikasi” menuju `/onboarding`.
7. Menyediakan CTA “Salah email? Kembali” menuju `/register`.
8. Memiliki state loading ketika resend email.
9. Tetap responsive di mobile/PWA.
10. Tidak menampilkan email demo hardcoded di production.

---

## 3. Struktur Visual

```txt
VerifyEmailPage
├── AuthCenteredLayout
│   └── VerifyEmailCard
│       ├── BrandLogo
│       ├── MailIconBlock
│       ├── Heading
│       ├── DescriptionWithEmail
│       ├── CTAGroup
│       │   ├── ContinueButton
│       │   └── BackToRegisterButton
│       └── ResendCountdown
```

---

## 4. Design Token

### 4.1 Warna

| Token | Nilai | Fungsi |
|---|---:|---|
| `primary` | `#007a35` | Brand, CTA utama, icon logo |
| `mint` | `#e9f8ef` | Icon container |
| `ink` | `#071727` | Teks utama |
| `auth-bg` | `#f4f7fb` | Background halaman |
| `white` | `#ffffff` | Card |
| `slate-100` | Tailwind default | CTA sekunder |
| `slate-200` | Tailwind default | Border card |
| `slate-400` | Tailwind default | Countdown text |
| `slate-600` | Tailwind default | Deskripsi |
| `slate-700` | Tailwind default | CTA secondary text |

### 4.2 Tailwind Config

Gunakan config yang sama dengan auth pages:

```js
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
      boxShadow: {
        "auth-card": "0 24px 60px rgba(15, 23, 42, 0.08)",
      },
    },
  },
};
```

---

## 5. Layout Global

HTML asli:

```html
<body class="min-h-screen bg-[#f4f7fb] font-sans text-ink flex items-center justify-center px-6">
```

React:

```jsx
<main className="flex min-h-screen items-center justify-center bg-auth-bg px-6 py-10 font-sans text-ink">
  <VerifyEmailCard />
</main>
```

### 5.1 Spacing

| Elemen | Spacing |
|---|---|
| Body horizontal padding | `px-6` |
| Card max width | `max-w-lg` |
| Card padding | `p-8` |
| Brand margin bottom | `mb-8` |
| Icon margin bottom | `mb-7` |
| Heading margin bottom | `mb-3` |
| Description margin bottom | `mb-7` |
| CTA gap | `gap-3` |
| Countdown margin top | `mt-6` |

---

## 6. Elemen 1 — Verify Card

HTML asli:

```html
<main class="max-w-lg w-full bg-white border border-slate-200 rounded-[32px] p-8 text-center shadow-xl">
```

React:

```jsx
<section className="w-full max-w-lg rounded-[32px] border border-slate-200 bg-white p-8 text-center shadow-auth-card">
  ...
</section>
```

### Review

**Kuat:**

- Fokus tunggal.
- Card cukup compact.
- Centered layout cocok untuk auth flow.

**Perlu ditingkatkan:**

- Tambahkan status message untuk resend.
- Tambahkan loading state.
- Tambahkan aria-live untuk countdown dan status.
- Jangan hardcode email demo.

---

## 7. Elemen 2 — Brand Logo

HTML asli:

```html
<a class="inline-flex items-center gap-3 mb-8" href="index.html">
  <span class="w-11 h-11 rounded-xl bg-primary text-white flex items-center justify-center material-symbols-outlined">nutrition</span>
  <span class="font-black text-2xl text-primary">NutriTrack</span>
</a>
```

React:

```jsx
function AuthBrand() {
  return (
    <Link className="mb-8 inline-flex items-center gap-3" to="/">
      <span className="material-symbols-outlined flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-white">
        nutrition
      </span>
      <span className="text-2xl font-black text-primary">NutriTrack</span>
    </Link>
  );
}
```

Accessibility:

```jsx
<Link aria-label="Go to NutriTrack home" ...>
```

---

## 8. Elemen 3 — Mail Icon Block

HTML asli:

```html
<div class="mx-auto w-24 h-24 rounded-[28px] bg-mint text-primary flex items-center justify-center mb-7">
  <span class="material-symbols-outlined text-5xl">outgoing_mail</span>
</div>
```

React:

```jsx
<div className="mx-auto mb-7 flex h-24 w-24 items-center justify-center rounded-[28px] bg-mint text-primary">
  <span className="material-symbols-outlined text-5xl" aria-hidden="true">
    outgoing_mail
  </span>
</div>
```

### Rekomendasi Animasi

Tambahkan subtle bounce / float saat halaman load:

```jsx
<div className="animate-[floatMail_2.4s_ease-in-out_infinite] ...">
```

CSS:

```css
@keyframes floatMail {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}
```

Gunakan reduced motion:

```css
@media (prefers-reduced-motion: reduce) {
  .mail-float {
    animation: none;
  }
}
```

---

## 9. Elemen 4 — Heading dan Description

HTML asli:

```html
<h1 class="text-3xl font-black mb-3">Cek email kamu</h1>
<p class="text-slate-600 mb-7">
  Kami sudah mengirim link verifikasi ke <strong>alex@nutritrack.app</strong>.
  Untuk demo frontend, lanjutkan ke onboarding.
</p>
```

React dynamic email:

```jsx
<h1 className="mb-3 text-3xl font-black">Cek email kamu</h1>
<p className="mb-7 leading-relaxed text-slate-600">
  Kami sudah mengirim link verifikasi ke{" "}
  <strong className="font-extrabold text-ink">{email}</strong>.
  Silakan buka email tersebut untuk mengaktifkan akun NutriTrack.
</p>
```

### Production Copy

Hapus kalimat “Untuk demo frontend...” pada production.

Rekomendasi final copy:

```txt
Kami sudah mengirim link verifikasi ke email kamu. Buka email tersebut, lalu klik tombol verifikasi untuk mengaktifkan akun.
```

Jika ingin menampilkan email:

```txt
Kami sudah mengirim link verifikasi ke alex@nutritrack.app.
```

---

## 10. Elemen 5 — CTA Group

HTML asli:

```html
<div class="grid gap-3">
  <a class="h-12 rounded-2xl bg-primary text-white font-extrabold flex items-center justify-center" href="onboarding.html">Saya Sudah Verifikasi</a>
  <a class="h-12 rounded-2xl bg-slate-100 text-slate-700 font-bold flex items-center justify-center" href="register.html">Salah email? Kembali</a>
</div>
```

React:

```jsx
<div className="grid gap-3">
  <Link
    className="flex h-12 items-center justify-center rounded-2xl bg-primary font-extrabold text-white transition-all hover:-translate-y-0.5 active:scale-[0.98]"
    to="/onboarding"
  >
    Saya Sudah Verifikasi
  </Link>

  <Link
    className="flex h-12 items-center justify-center rounded-2xl bg-slate-100 font-bold text-slate-700 transition-all hover:bg-slate-200 active:scale-[0.98]"
    to="/register"
  >
    Salah email? Kembali
  </Link>
</div>
```

### UX Improvement

Pada production, tombol “Saya Sudah Verifikasi” sebaiknya melakukan check status ke backend:

```js
await authApi.checkEmailVerification()
```

Jika belum verified, tampilkan:

```txt
Email belum diverifikasi. Silakan klik link di email terlebih dahulu.
```

---

## 11. Elemen 6 — Countdown Resend

HTML asli:

```html
<p class="text-xs text-slate-400 mt-6">
  Kirim ulang tersedia dalam <span id="countdown">60</span> detik.
</p>
```

Script:

```js
let n=60;
setInterval(() => {
  n = Math.max(0, n - 1);
  document.getElementById('countdown').textContent = n
}, 1000);
```

### Masalah HTML Asli

- `setInterval` tidak di-clear.
- Tidak ada tombol resend ketika countdown selesai.
- Tidak ada state loading resend.
- Tidak ada feedback sukses/error.
- Manipulasi DOM langsung harus diganti `useEffect`.

### React Hook

```jsx
function useCountdown(initialSeconds = 60) {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (seconds <= 0) return;

    const timerId = window.setTimeout(() => {
      setSeconds((value) => Math.max(0, value - 1));
    }, 1000);

    return () => window.clearTimeout(timerId);
  }, [seconds]);

  function restart() {
    setSeconds(initialSeconds);
  }

  return { seconds, restart, isFinished: seconds === 0 };
}
```

### Resend UI

```jsx
function ResendVerification({ seconds, canResend, onResend, loading }) {
  if (!canResend) {
    return (
      <p className="mt-6 text-xs text-slate-400" aria-live="polite">
        Kirim ulang tersedia dalam{" "}
        <span className="font-bold text-slate-500">{seconds}</span> detik.
      </p>
    );
  }

  return (
    <button
      className="mt-6 text-xs font-extrabold text-primary hover:underline disabled:opacity-60"
      type="button"
      onClick={onResend}
      disabled={loading}
    >
      {loading ? "Mengirim ulang..." : "Kirim ulang email verifikasi"}
    </button>
  );
}
```

---

## 12. VerifyEmailPage.jsx — Sample Implementasi

```jsx
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function useCountdown(initialSeconds = 60) {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (seconds <= 0) return;

    const timerId = window.setTimeout(() => {
      setSeconds((value) => Math.max(0, value - 1));
    }, 1000);

    return () => window.clearTimeout(timerId);
  }, [seconds]);

  return {
    seconds,
    isFinished: seconds === 0,
    restart: () => setSeconds(initialSeconds),
  };
}

export default function VerifyEmailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "email kamu";
  const { seconds, isFinished, restart } = useCountdown(60);
  const [resending, setResending] = useState(false);
  const [status, setStatus] = useState("");

  async function handleResend() {
    setResending(true);
    setStatus("");

    try {
      // await authApi.resendVerificationEmail(email)
      await new Promise((resolve) => setTimeout(resolve, 600));
      setStatus("Email verifikasi berhasil dikirim ulang.");
      restart();
    } catch {
      setStatus("Gagal mengirim ulang email. Coba beberapa saat lagi.");
    } finally {
      setResending(false);
    }
  }

  async function handleContinue() {
    // production: await authApi.checkEmailVerification()
    navigate("/onboarding");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-auth-bg px-6 py-10 font-sans text-ink">
      <section className="w-full max-w-lg rounded-[32px] border border-slate-200 bg-white p-8 text-center shadow-auth-card">
        <Link
          className="mb-8 inline-flex items-center gap-3"
          to="/"
          aria-label="Go to NutriTrack home"
        >
          <span className="material-symbols-outlined flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-white">
            nutrition
          </span>
          <span className="text-2xl font-black text-primary">NutriTrack</span>
        </Link>

        <div className="mail-float mx-auto mb-7 flex h-24 w-24 items-center justify-center rounded-[28px] bg-mint text-primary">
          <span className="material-symbols-outlined text-5xl" aria-hidden="true">
            outgoing_mail
          </span>
        </div>

        <h1 className="mb-3 text-3xl font-black">Cek email kamu</h1>

        <p className="mb-7 leading-relaxed text-slate-600">
          Kami sudah mengirim link verifikasi ke{" "}
          <strong className="font-extrabold text-ink">{email}</strong>. Buka email
          tersebut untuk mengaktifkan akun NutriTrack.
        </p>

        <div className="grid gap-3">
          <button
            className="flex h-12 items-center justify-center rounded-2xl bg-primary font-extrabold text-white transition-all hover:-translate-y-0.5 active:scale-[0.98]"
            type="button"
            onClick={handleContinue}
          >
            Saya Sudah Verifikasi
          </button>

          <Link
            className="flex h-12 items-center justify-center rounded-2xl bg-slate-100 font-bold text-slate-700 transition-all hover:bg-slate-200 active:scale-[0.98]"
            to="/register"
          >
            Salah email? Kembali
          </Link>
        </div>

        {!isFinished ? (
          <p className="mt-6 text-xs text-slate-400" aria-live="polite">
            Kirim ulang tersedia dalam{" "}
            <span className="font-bold text-slate-500">{seconds}</span> detik.
          </p>
        ) : (
          <button
            className="mt-6 text-xs font-extrabold text-primary hover:underline disabled:opacity-60"
            type="button"
            onClick={handleResend}
            disabled={resending}
          >
            {resending ? "Mengirim ulang..." : "Kirim ulang email verifikasi"}
          </button>
        )}

        {status && (
          <p className="mt-4 text-xs font-bold text-primary" role="status">
            {status}
          </p>
        )}
      </section>
    </main>
  );
}
```

---

## 13. Animation System

### 13.1 Animasi yang Disarankan

| Elemen | Animasi | Durasi |
|---|---|---:|
| Card masuk | Fade up | 400ms |
| Mail icon | Float halus | 2400ms infinite |
| CTA hover | Lift kecil | 150ms |
| CTA active | Scale down | 100ms |
| Countdown update | No animation / opacity subtle | 100ms |
| Resend status | Fade in | 200ms |

### 13.2 CSS

```css
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.auth-card-enter {
  animation: fadeUp 0.4s ease-out both;
}

@keyframes floatMail {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-6px);
  }
}

.mail-float {
  animation: floatMail 2.4s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  .auth-card-enter,
  .mail-float {
    animation: none;
  }
}
```

---

## 14. Data Flow

### 14.1 Dari Register ke Verify

```jsx
navigate("/verify-email", {
  state: {
    email: form.email,
  },
});
```

### 14.2 Fallback dari Query String

Untuk user yang refresh halaman:

```jsx
const params = new URLSearchParams(location.search);
const emailFromQuery = params.get("email");
const email = location.state?.email || emailFromQuery || "email kamu";
```

### 14.3 Backend Flow

```txt
POST /auth/register
  -> create inactive user
  -> send verification email
  -> return success

GET /auth/verify-email?token=...
  -> validate token
  -> mark user as verified
  -> redirect to onboarding/login

POST /auth/resend-verification
  -> send new token if allowed
```

---

## 15. PWA Considerations

- Halaman verify harus tetap bisa dibuka di mode standalone.
- Jangan cache halaman verify token secara agresif.
- Untuk route token seperti `/verify-email?token=...`, pastikan service worker tidak mengembalikan stale page tanpa network check untuk API verification.
- Resend email membutuhkan network; tampilkan offline state jika tidak ada koneksi.
- Simpan email sementara di memory/state, bukan localStorage jika tidak perlu.

Offline state:

```jsx
const offline = !navigator.onLine;

{offline && (
  <p className="mt-4 rounded-2xl bg-orange-50 p-3 text-xs font-bold text-orange-700">
    Kamu sedang offline. Kirim ulang email membutuhkan koneksi internet.
  </p>
)}
```

---

## 16. Accessibility Checklist

- Card harus memiliki heading `<h1>`.
- Brand link harus punya `aria-label`.
- Icon decorative diberi `aria-hidden`.
- Countdown memakai `aria-live="polite"`.
- Status resend memakai `role="status"`.
- Tombol resend harus disabled saat loading.
- CTA utama harus keyboard accessible.
- Jangan mengandalkan warna saja untuk status.
- Fokus keyboard harus terlihat pada semua tombol/link.
- Text email harus dapat dibaca screen reader.

---

## 17. Security Notes

- Jangan hardcode email production.
- Jangan tampilkan token verifikasi di UI.
- Token email harus single-use.
- Token harus expired, misalnya 15–60 menit.
- Endpoint resend harus rate limited.
- Jangan beri informasi terlalu detail jika email tidak terdaftar.
- Setelah user verified, update auth session dengan aman.

---

## 18. Prioritas Implementasi

### High Priority

1. Convert ke route `/verify-email`.
2. Terima email dinamis dari register flow.
3. Implement countdown dengan cleanup.
4. Tambahkan resend button setelah countdown selesai.
5. Tambahkan loading dan status message.
6. Hilangkan copy “demo frontend” untuk production.

### Medium Priority

1. Tambahkan check verification status ke backend.
2. Tambahkan offline state.
3. Tambahkan animation reduced-motion friendly.
4. Tambahkan query string fallback.

### Low Priority

1. Tambahkan illustration SVG custom.
2. Tambahkan support untuk masked email.
3. Tambahkan “open mail app” link untuk mobile.
4. Tambahkan resend limit warning.

---

## 19. Kesimpulan

`verify-email.html` memiliki desain yang sederhana, jelas, dan tepat untuk auth transition screen. Saat dikonversi ke React PWA, elemen yang wajib dipertahankan adalah:

- centered auth card;
- brand logo;
- icon outgoing mail;
- heading “Cek email kamu”;
- email destination text;
- CTA onboarding;
- back-to-register CTA;
- resend countdown.

Peningkatan utama untuk production adalah membuat email dinamis, mengganti countdown DOM script menjadi hook React, menambahkan resend behavior, dan memastikan flow verifikasi email benar-benar terhubung dengan backend.
