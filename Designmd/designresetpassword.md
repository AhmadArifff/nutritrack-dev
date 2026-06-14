# designresetpassword.md — NutriTrack Reset Password Design System & React PWA Implementation Guide

> Dokumen ini dibuat untuk mengonversi tampilan `reset-password.html` ke project lokal berbasis **React + Vite + PWA + Tailwind CSS**. Fokus halaman ini adalah flow **pembuatan password baru** setelah user membuka link/token reset.

---

## 1. Ringkasan Tampilan

Halaman `reset-password.html` adalah halaman auth card satu layar dengan elemen:

- Background full-screen `#f4f7fb`.
- Card putih rounded besar di tengah.
- Logo NutriTrack dengan ikon `nutrition`.
- Heading `Reset Kata Sandi`.
- Deskripsi singkat.
- Input `Password baru`.
- Input `Konfirmasi password`.
- Password strength bar 5 segmen.
- Button `Simpan Password`.
- Demo behavior: submit form redirect ke `login.html`.

Tampilan ini sederhana dan efektif, tetapi perlu peningkatan untuk production: validasi password, token handling, show/hide password, error state, loading state, dan feedback sukses.

---

## 2. Tujuan Halaman

### Fungsi utama

1. User membuka link reset dari email.
2. App membaca token reset dari URL.
3. User membuat password baru.
4. User mengonfirmasi password.
5. Sistem memvalidasi kekuatan password dan kesamaan confirm password.
6. Sistem mengirim password baru ke API.
7. User diarahkan ke login setelah sukses.

### Production flow yang disarankan

1. Route:
   - `/reset-password?token=...`
2. Validasi token:
   - token ada
   - token belum expired
3. Submit:
   - `POST /api/auth/reset-password`
4. Payload:
   - `{ token, password, confirmPassword }`
5. Sukses:
   - tampilkan status “Password berhasil diubah”
   - redirect ke `/login`
6. Error:
   - token tidak valid / expired
   - password lemah
   - password tidak sama

---

## 3. Struktur Visual dari HTML Asli

```html
<body class="min-h-screen bg-[#f4f7fb] font-sans text-ink flex items-center justify-center px-6">
  <main class="max-w-md w-full bg-white border border-slate-200 rounded-[32px] p-8 shadow-xl">
    <a href="index.html">Logo NutriTrack</a>
    <h1>Reset Kata Sandi</h1>
    <p>Buat password baru untuk akun NutriTrack.</p>
    <form id="resetForm">
      <input type="password" placeholder="Password baru" value="nutritrack" />
      <input type="password" placeholder="Konfirmasi password" value="nutritrack" />
      <div class="grid grid-cols-5 gap-2">Strength meter</div>
      <button>Simpan Password</button>
    </form>
  </main>
</body>
```

---

## 4. Design Tokens

### 4.1 Token warna dari HTML

| Token | Hex | Fungsi |
|---|---:|---|
| `primary` | `#007a35` | CTA utama, logo, strength active |
| `mint` | `#e9f8ef` | Accent surface opsional |
| `ink` | `#071727` | Teks utama |
| `page-bg` | `#f4f7fb` | Background body |
| `card` | `#ffffff` | Background auth card |
| `border-soft` | `#e2e8f0` | Border input dan card |
| `input-bg` | `#f8fafc` | Background input |
| `strength-empty` | `#e2e8f0` | Bar strength kosong |
| `danger` | `#dc2626` | Error password |
| `warning` | `#f97316` | Password medium |
| `success` | `#007a35` | Password kuat |

### 4.2 Tailwind config lokal

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
          danger: "#dc2626",
          warning: "#f97316",
          success: "#007a35",
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        auth: "0 24px 60px rgba(15, 23, 42, 0.12)",
      },
      animation: {
        "auth-enter": "authEnter 420ms cubic-bezier(0.16, 1, 0.3, 1) both",
      },
      keyframes: {
        authEnter: {
          "0%": { opacity: "0", transform: "translateY(16px) scale(0.98)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
```

---

## 5. Typography

Halaman reset memakai **Plus Jakarta Sans** sama seperti forgot password.

| Elemen | HTML asli | Rekomendasi |
|---|---|---|
| Body | `font-sans` | Plus Jakarta Sans |
| Logo | `font-black text-2xl` | `text-2xl font-extrabold` |
| Heading | `text-3xl font-black` | `text-3xl sm:text-4xl font-extrabold` |
| Description | `text-slate-600` | `leading-relaxed text-slate-600` |
| Input | default | `text-sm sm:text-base` |
| Button | `font-extrabold` | `font-extrabold tracking-tight` |

---

## 6. Review Per Elemen Tampilan

### 6.1 Page canvas

**HTML asli:**

```html
<body class="min-h-screen bg-[#f4f7fb] font-sans text-ink flex items-center justify-center px-6">
```

**Review:**

- Clean untuk auth flow.
- Tidak perlu sidebar/topbar.
- Cocok sebagai route publik.

**React:**

```jsx
<div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-auth-page px-6 py-10 font-sans text-auth-ink">
  <ResetPasswordCard />
</div>
```

---

### 6.2 Auth card

**HTML asli:**

```html
<main class="max-w-md w-full bg-white border border-slate-200 rounded-[32px] p-8 shadow-xl">
```

**Review:**

- Card compact dan jelas.
- Radius 32px memberi kesan premium.
- Perlu layout aman untuk mobile height kecil: tambahkan `py-10` di body.

**React:**

```jsx
<main className="relative z-10 w-full max-w-md rounded-[32px] border border-auth-border bg-white p-8 shadow-auth animate-auth-enter">
  ...
</main>
```

---

### 6.3 Logo

Sama dengan halaman forgot password.

```jsx
<Link to="/" aria-label="Go to NutriTrack home" className="mb-8 inline-flex items-center gap-3">
  <span className="material-symbols-outlined flex h-11 w-11 items-center justify-center rounded-xl bg-auth-primary text-white">
    nutrition
  </span>
  <span className="text-2xl font-extrabold text-auth-primary">NutriTrack</span>
</Link>
```

---

### 6.4 Heading dan deskripsi

**HTML asli:**

```html
<h1 class="text-3xl font-black mb-3">Reset Kata Sandi</h1>
<p class="text-slate-600 mb-7">Buat password baru untuk akun NutriTrack.</p>
```

**Review:**

- Sudah direct.
- Bisa ditambah instruksi syarat password.

**Copy rekomendasi:**

```text
Buat password baru yang kuat. Gunakan minimal 8 karakter dengan kombinasi huruf, angka, dan simbol.
```

---

### 6.5 Password input

**HTML asli:**

```html
<input
  class="w-full h-12 rounded-2xl border border-slate-200 bg-slate-50 px-4 outline-none focus:ring-4 focus:ring-green-900/10 focus:border-primary"
  required
  type="password"
  placeholder="Password baru"
  value="nutritrack"
/>
```

**Review:**

- Problem: default value `nutritrack` harus dihapus.
- Perlu label eksplisit, bukan hanya placeholder.
- Perlu show/hide password.
- Perlu `autoComplete="new-password"`.

**React component:**

```jsx
function PasswordField({
  id,
  label,
  value,
  onChange,
  error,
  autoComplete = "new-password",
}) {
  const [visible, setVisible] = useState(false);

  return (
    <label className="block" htmlFor={id}>
      <span className="text-sm font-bold text-slate-700">{label}</span>
      <div className="relative mt-2">
        <input
          id={id}
          className={[
            "h-12 w-full rounded-2xl border bg-slate-50 px-4 pr-12 outline-none transition",
            "focus:border-auth-primary focus:ring-4 focus:ring-green-900/10",
            error ? "border-red-400" : "border-slate-200",
          ].join(" ")}
          required
          type={visible ? "text" : "password"}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        <button
          type="button"
          onClick={() => setVisible((current) => !current)}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1 text-slate-500 hover:bg-slate-100"
          aria-label={visible ? "Sembunyikan password" : "Tampilkan password"}
        >
          <span className="material-symbols-outlined text-[20px]">
            {visible ? "visibility_off" : "visibility"}
          </span>
        </button>
      </div>
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm font-semibold text-red-600">
          {error}
        </p>
      )}
    </label>
  );
}
```

---

### 6.6 Confirm password input

**HTML asli:**

```html
<input
  required
  type="password"
  placeholder="Konfirmasi password"
  value="nutritrack"
/>
```

**Review:**

- Hapus value default.
- Tambahkan matching validation.
- Tambahkan label eksplisit.

**Validasi:**

```js
if (password !== confirmPassword) {
  errors.confirmPassword = "Konfirmasi password tidak sama.";
}
```

---

### 6.7 Password strength meter

**HTML asli:**

```html
<div class="grid grid-cols-5 gap-2">
  <span class="h-2 rounded-full bg-primary"></span>
  <span class="h-2 rounded-full bg-primary"></span>
  <span class="h-2 rounded-full bg-primary"></span>
  <span class="h-2 rounded-full bg-primary"></span>
  <span class="h-2 rounded-full bg-slate-200"></span>
</div>
```

**Review:**

- Visual sederhana dan efektif.
- Masih hardcoded 4/5.
- Perlu dihitung dinamis berdasarkan input password.
- Perlu label teks seperti `Lemah`, `Sedang`, `Kuat`.

**Strength algorithm sederhana:**

```js
export function getPasswordStrength(password) {
  let score = 0;

  if (password.length >= 8) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  return score;
}
```

**Strength component:**

```jsx
function PasswordStrengthMeter({ password }) {
  const score = getPasswordStrength(password);

  const label =
    score <= 1 ? "Sangat lemah" :
    score === 2 ? "Lemah" :
    score === 3 ? "Sedang" :
    score === 4 ? "Kuat" :
    "Sangat kuat";

  const activeColor =
    score <= 2 ? "bg-red-500" :
    score === 3 ? "bg-orange-500" :
    "bg-auth-primary";

  return (
    <div aria-live="polite">
      <div className="grid grid-cols-5 gap-2" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, index) => (
          <span
            key={index}
            className={[
              "h-2 rounded-full transition-colors",
              index < score ? activeColor : "bg-slate-200",
            ].join(" ")}
          />
        ))}
      </div>
      <p className="mt-2 text-sm font-bold text-slate-600">
        Kekuatan password: <span>{label}</span>
      </p>
    </div>
  );
}
```

---

### 6.8 Submit button

**HTML asli:**

```html
<button class="w-full h-12 rounded-2xl bg-primary text-white font-extrabold" type="submit">
  Simpan Password
</button>
```

**Review:**

- Visual sudah kuat.
- Perlu disabled state kalau password invalid.
- Perlu loading state.
- Perlu success redirect.

**React:**

```jsx
<button
  className="flex h-12 w-full items-center justify-center rounded-2xl bg-auth-primary font-extrabold text-white shadow-lg shadow-green-900/10 transition hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
  type="submit"
  disabled={isSubmitting}
>
  {isSubmitting ? "Menyimpan..." : "Simpan Password"}
</button>
```

---

## 7. Behavior & Validation

### 7.1 Validator

```js
export function validateResetPassword({ password, confirmPassword, token }) {
  const errors = {};

  if (!token) {
    errors.token = "Token reset tidak ditemukan.";
  }

  if (!password) {
    errors.password = "Password baru wajib diisi.";
  } else if (password.length < 8) {
    errors.password = "Password minimal 8 karakter.";
  }

  if (!confirmPassword) {
    errors.confirmPassword = "Konfirmasi password wajib diisi.";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Konfirmasi password tidak sama.";
  }

  return errors;
}
```

### 7.2 Submit flow

```jsx
async function handleSubmit(event) {
  event.preventDefault();

  const nextErrors = validateResetPassword({
    password,
    confirmPassword,
    token,
  });

  setErrors(nextErrors);
  setStatus(null);

  if (Object.keys(nextErrors).length > 0) return;

  try {
    setIsSubmitting(true);

    await resetPasswordApi({
      token,
      password,
      confirmPassword,
    });

    setStatus({
      type: "success",
      message: "Password berhasil diubah. Anda akan diarahkan ke login.",
    });

    setTimeout(() => navigate("/login"), 1200);
  } catch {
    setStatus({
      type: "error",
      message: "Token tidak valid atau sudah kedaluwarsa.",
    });
  } finally {
    setIsSubmitting(false);
  }
}
```

### 7.3 API service

```js
export async function resetPasswordApi(payload) {
  const response = await fetch("/api/auth/reset-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to reset password");
  }

  return response.json();
}
```

---

## 8. Implementasi Page React

```jsx
import { useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { AuthLayout } from "../../components/auth/AuthLayout";
import { AuthLogo } from "../../components/auth/AuthLogo";
import { PasswordField } from "../../components/auth/PasswordField";
import { PasswordStrengthMeter } from "../../components/auth/PasswordStrengthMeter";
import { validateResetPassword } from "../../utils/validators";
import { resetPasswordApi } from "../../services/auth.service";

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = useMemo(() => searchParams.get("token") ?? "", [searchParams]);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    const nextErrors = validateResetPassword({
      password,
      confirmPassword,
      token,
    });

    setErrors(nextErrors);
    setStatus(null);

    if (Object.keys(nextErrors).length > 0) return;

    try {
      setIsSubmitting(true);

      await resetPasswordApi({
        token,
        password,
        confirmPassword,
      });

      setStatus({
        type: "success",
        message: "Password berhasil diubah. Anda akan diarahkan ke login.",
      });

      setTimeout(() => navigate("/login"), 1200);
    } catch {
      setStatus({
        type: "error",
        message: "Token tidak valid atau sudah kedaluwarsa.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthLayout>
      <AuthLogo />

      <h1 className="mb-3 text-3xl font-extrabold tracking-tight">
        Reset Kata Sandi
      </h1>

      <p className="mb-7 leading-relaxed text-slate-600">
        Buat password baru yang kuat. Gunakan minimal 8 karakter dengan kombinasi
        huruf, angka, dan simbol.
      </p>

      {!token && (
        <div role="alert" className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">
          Token reset tidak ditemukan. Silakan minta link reset baru.
        </div>
      )}

      {status && (
        <div
          role={status.type === "error" ? "alert" : "status"}
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
        <PasswordField
          id="password"
          label="Password baru"
          value={password}
          onChange={setPassword}
          error={errors.password}
        />

        <PasswordField
          id="confirmPassword"
          label="Konfirmasi password"
          value={confirmPassword}
          onChange={setConfirmPassword}
          error={errors.confirmPassword}
        />

        <PasswordStrengthMeter password={password} />

        <button
          className="flex h-12 w-full items-center justify-center rounded-2xl bg-auth-primary font-extrabold text-white shadow-lg shadow-green-900/10 transition hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
          type="submit"
          disabled={isSubmitting || !token}
        >
          {isSubmitting ? "Menyimpan..." : "Simpan Password"}
        </button>
      </form>

      <Link
        to="/forgot-password"
        className="mt-5 inline-flex items-center gap-2 rounded-lg font-bold text-auth-primary hover:underline focus:outline-none focus:ring-4 focus:ring-green-900/10"
      >
        Minta link reset baru
      </Link>
    </AuthLayout>
  );
}
```

---

## 9. Animasi & Micro Interaction

### 9.1 Card entrance

```jsx
<main className="animate-auth-enter ...">
```

### 9.2 Strength meter transition

```jsx
<span className="h-2 rounded-full transition-colors duration-300" />
```

### 9.3 Show/hide password icon

```jsx
<span className="material-symbols-outlined transition-transform group-active:scale-90">
  visibility
</span>
```

### 9.4 Button submit feedback

Saat submit:

- Button text: `Menyimpan...`
- Button disabled.
- Setelah sukses: tampilkan success panel.
- Redirect dengan delay singkat.

### 9.5 Reduced motion

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.001ms !important;
    transition-duration: 0.001ms !important;
  }
}
```

---

## 10. Security Notes

Halaman reset password menyentuh credential, sehingga:

1. Jangan simpan password di localStorage/sessionStorage.
2. Jangan log password ke console.
3. Jangan cache request reset password di service worker.
4. Pakai HTTPS.
5. Token reset harus single-use.
6. Token harus expired otomatis.
7. Password lama harus tidak bisa digunakan ulang jika kebijakan keamanan mengharuskan.
8. Jangan tampilkan detail internal error dari server.
9. Setelah sukses, invalidasi semua session lama jika diperlukan.

---

## 11. PWA Considerations

Route auth harus tetap ringan dan offline-safe, tetapi endpoint auth harus network-only.

```js
runtimeCaching: [
  {
    urlPattern: ({ url }) => url.pathname.startsWith("/api/auth/"),
    handler: "NetworkOnly",
  },
]
```

Untuk offline state:

```jsx
if (!navigator.onLine) {
  setStatus({
    type: "error",
    message: "Anda sedang offline. Sambungkan internet untuk mengubah password.",
  });
}
```

---

## 12. Accessibility Checklist

| Area | Checklist |
|---|---|
| Heading | Gunakan satu `h1` |
| Password fields | Gunakan label eksplisit |
| Show/hide button | Beri `aria-label` |
| Error | Gunakan `aria-invalid` dan `aria-describedby` |
| Strength meter | Tambahkan label teks, jangan hanya warna |
| Success/error | Gunakan `role=status` / `role=alert` |
| Submit button | Loading state terbaca |
| Focus | Ring focus terlihat |
| Token missing | Pesan error jelas |
| Keyboard | Semua kontrol dapat diakses keyboard |

---

## 13. Prioritas Perbaikan dari HTML Asli

### High priority

1. Hapus default value `nutritrack`.
2. Tambahkan token reset dari URL.
3. Tambahkan validasi password dan confirm password.
4. Strength meter dinamis.
5. Tambahkan show/hide password.
6. Tambahkan loading/error/success state.
7. Endpoint reset password harus `NetworkOnly` di PWA.

### Medium priority

1. Tambahkan indikator syarat password.
2. Tambahkan route untuk token expired.
3. Tambahkan redirect delay setelah sukses.
4. Tambahkan toast atau alert panel.

### Low priority

1. Tambahkan decorative background.
2. Tambahkan dark mode.
3. Tambahkan ilustrasi keamanan kecil.

---

## 14. Acceptance Criteria

Halaman siap production ketika:

- User dapat membuat password baru dari token valid.
- Token kosong menampilkan error.
- Password kurang dari 8 karakter ditolak.
- Konfirmasi password tidak sama ditolak.
- Strength meter berubah sesuai input.
- Password bisa ditampilkan/disembunyikan.
- Submit menampilkan loading.
- Submit sukses mengarahkan ke login.
- Endpoint reset tidak di-cache PWA.
- Tidak ada default password di field.
- Semua kontrol accessible.

---

## 15. Kesimpulan

`reset-password.html` sudah memiliki basis visual auth yang bersih dan konsisten dengan halaman forgot password. Untuk React PWA, perlu menambahkan logic credential yang aman: validasi dinamis, token handling, password strength meter, show/hide password, network-only API, dan state feedback yang jelas. Visual tetap mempertahankan primary green `#007a35`, rounded auth card `32px`, serta typography Plus Jakarta Sans.
