# designsplash.md — NutriTrack Splash Screen Design & React PWA Implementation

> Dokumen ini dibuat untuk mengonversi halaman HTML statis NutriTrack ke project lokal berbasis **React + Vite PWA + Tailwind CSS**.
> Fokus utama: mempertahankan visual asli, merapikan struktur komponen, mengganti CDN Tailwind menjadi konfigurasi lokal, dan menyiapkan state/validasi agar siap diintegrasikan dengan backend.

## 1. Ringkasan Tampilan

`splash.html` adalah splash/entry screen sederhana untuk NutriTrack:

- Background gradient hijau muda → putih → biru muda.
- Logo mark besar dengan icon `nutrition`.
- Animasi `pulse3d` pada logo.
- Brand headline `NutriTrack`.
- Greeting message untuk user.
- CTA `Lanjut Onboarding`.
- Setelah 1.2 detik, tombol diberi ring highlight untuk menarik perhatian.

Halaman ini cocok menjadi PWA first-run screen atau route `/splash`.

## 2. Design Token

| Token | Nilai | Fungsi |
|---|---:|---|
| `primary` | `#007a35` | Logo, CTA, headline |
| `green-50` | Tailwind default | Gradient awal |
| `blue-100` | Tailwind default | Gradient akhir |
| `slate-600` | Tailwind default | Subtitle |
| `green-900/20` | Tailwind alpha | Shadow logo |

```js
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Plus Jakarta Sans", "sans-serif"],
      },
      colors: {
        primary: "#007a35",
      },
      animation: {
        "pulse-3d": "pulse3d 2.4s ease-in-out infinite",
        "fade-up": "fadeUp 0.45s ease-out both",
      },
      keyframes: {
        pulse3d: {
          "0%, 100%": { transform: "scale(1) rotate(0deg)" },
          "50%": { transform: "scale(1.08) rotate(8deg)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
};
```

## 3. Struktur Elemen Tampilan

```jsx
export default function SplashPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-100 font-sans flex items-center justify-center px-6">
      <section className="text-center animate-fade-up">
        <SplashLogo />
        <h1 className="text-4xl font-black text-primary mb-3">NutriTrack</h1>
        <p className="text-slate-600 mb-8">Halo, Alex. Mari mulai perjalanan sehatmu.</p>
        <SplashCta />
      </section>
    </main>
  );
}
```

## 4. Logo 3D Pulse

```jsx
function SplashLogo() {
  return (
    <div className="animate-pulse-3d mx-auto w-28 h-28 rounded-[32px] bg-primary text-white shadow-2xl shadow-green-900/20 flex items-center justify-center mb-8">
      <span className="material-symbols-outlined text-7xl" aria-hidden="true">
        nutrition
      </span>
    </div>
  );
}
```

## 5. CTA Delay Ring

```jsx
function SplashCta() {
  const [highlighted, setHighlighted] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setHighlighted(true), 1200);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <Link
      to="/onboarding"
      className={`inline-flex px-7 py-3 rounded-2xl bg-primary text-white font-extrabold transition hover:scale-105 active:scale-95 ${
        highlighted ? "ring-4 ring-green-200" : ""
      }`}
    >
      Lanjut Onboarding
    </Link>
  );
}
```

## 6. PWA Consideration

- Route ini bisa menjadi first-run UI.
- PWA manifest tetap harus punya native splash config:
  - `theme_color`
  - `background_color`
  - icon sizes
  - `display: standalone`
- Simpan `hasSeenSplash` di localStorage agar user tidak selalu melihat splash.
- Jangan auto-redirect terlalu cepat karena dapat mengganggu accessibility.

## 7. Accessibility Checklist

- CTA harus berupa link dengan teks jelas.
- Animasi logo harus menghormati `prefers-reduced-motion`.
- Icon dekoratif diberi `aria-hidden`.
- Kontras CTA putih/hijau sudah kuat.
- Tambahkan loading state jika splash menunggu session restore.

```css
@media (prefers-reduced-motion: reduce) {
  .animate-pulse-3d {
    animation: none;
  }
}
```

## 8. Prioritas Perbaikan

1. Tambahkan route guard setelah splash.
2. Gunakan localStorage untuk first-run state.
3. Tambahkan `prefers-reduced-motion`.
4. Gunakan icon PWA lokal.
5. Tambahkan loading indicator bila memulihkan session.
