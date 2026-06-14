# designprivacy.md — NutriTrack Privacy Page Design & React PWA Implementation

> Dokumen ini dibuat untuk mengonversi halaman HTML statis NutriTrack ke project lokal berbasis **React + Vite PWA + Tailwind CSS**.
> Fokus utama: mempertahankan visual asli, merapikan struktur komponen, mengganti CDN Tailwind menjadi konfigurasi lokal, dan menyiapkan state/validasi agar siap diintegrasikan dengan backend.

## 1. Ringkasan Tampilan

`privacy.html` adalah halaman legal statis untuk **Kebijakan Privasi**. Tampilan dibuat minimal, bersih, dan mudah dibaca:

- Sticky header putih dengan brand NutriTrack.
- Nav kanan: Login dan Terms.
- Main content max width `5xl`.
- Label kecil `Privacy`.
- Heading besar `Kebijakan Privasi`.
- Intro paragraph.
- Tiga section card:
  1. Data yang Dikumpulkan
  2. Penggunaan Data
  3. Kontrol Pengguna

## 2. Design Token Legal Pages

| Token | Nilai | Fungsi |
|---|---:|---|
| `green-700` | Tailwind default | Brand, label section, link aktif |
| `slate-50` | Tailwind default | Background page |
| `slate-900` | Tailwind default | Teks utama |
| `slate-600` | Tailwind default | Body paragraph |
| `white` | `#ffffff` | Legal section cards |
| `border` | Tailwind default | Divider/header/card border |

Typography utama memakai **Plus Jakarta Sans** dengan headline `text-4xl font-black`.

## 3. Shared Legal Header

```jsx
function LegalHeader({ active }) {
  return (
    <header className="h-16 bg-white border-b sticky top-0 z-40">
      <div className="max-w-5xl mx-auto h-full px-6 flex items-center justify-between">
        <Link className="font-black text-2xl text-green-700" to="/">
          NutriTrack
        </Link>
        <nav className="flex gap-5 text-sm font-bold" aria-label="Navigasi legal">
          <Link to="/login">Login</Link>
          {active === "terms" ? (
            <Link to="/privacy">Privacy</Link>
          ) : (
            <Link to="/terms">Terms</Link>
          )}
        </nav>
      </div>
    </header>
  );
}
```

## 4. Struktur React Page

```jsx
export default function PrivacyPage() {
  return (
    <div className="bg-slate-50 text-slate-900 font-sans min-h-screen">
      <LegalHeader active="privacy" />
      <main className="max-w-5xl mx-auto px-6 py-14">
        <p className="uppercase tracking-[0.28em] text-xs font-extrabold text-green-700 mb-4">
          Privacy
        </p>
        <h1 className="text-4xl font-black mb-6">Kebijakan Privasi</h1>
        <p className="text-slate-600 max-w-3xl mb-10">
          Halaman frontend statis ini merangkum bagaimana NutriTrack akan menangani data pengguna saat backend Supabase diintegrasikan.
        </p>
        <div className="grid gap-5">
          {privacySections.map((section) => (
            <LegalSectionCard key={section.title} {...section} />
          ))}
        </div>
      </main>
    </div>
  );
}
```

## 5. Legal Section Card

```jsx
function LegalSectionCard({ title, body }) {
  return (
    <section className="bg-white rounded-3xl p-7 border shadow-sm hover:-translate-y-1 transition">
      <h2 className="text-xl font-black mb-3">{title}</h2>
      <p className="text-slate-600">{body}</p>
    </section>
  );
}
```

## 6. Data Content

```js
export const privacySections = [
  {
    title: "Data yang Dikumpulkan",
    body: "Profil, target berat badan, log makanan, jadwal makan, notifikasi, dan preferensi makanan.",
  },
  {
    title: "Penggunaan Data",
    body: "Data digunakan untuk menghitung BMR, TDEE, target kalori, analisis nutrisi, dan rekomendasi meal plan.",
  },
  {
    title: "Kontrol Pengguna",
    body: "Pengguna dapat memperbarui profil, preferensi, notifikasi, dan menghapus data melalui pengaturan aplikasi.",
  },
];
```

## 7. PWA dan Offline Notes

- Halaman privacy harus bisa di-cache sebagai static route.
- Sertakan di footer/registration consent.
- Siapkan metadata: `effectiveDate`, `lastUpdated`, `version`.
- Untuk produksi, legal text sebaiknya mudah diperbarui dari CMS/Markdown.

## 8. Animasi

| Elemen | Animasi |
|---|---|
| Section card | hover `-translate-y-1` |
| Page content | fade-up |
| Header nav | hover text-primary |
| Focus link | ring green |

## 9. Accessibility Checklist

- Gunakan heading hierarchy: `h1` lalu `h2`.
- Link Terms/Login jelas.
- Kontras slate text di background slate-50 aman.
- Hindari paragraph terlalu panjang.
- Tambahkan skip link untuk legal content bila halaman berkembang.

## 10. Prioritas Perbaikan

1. Tambahkan tanggal efektif kebijakan.
2. Tambahkan daftar kontak privacy/support.
3. Tambahkan section penghapusan data.
4. Tambahkan section penyimpanan dan keamanan data.
5. Integrasikan link dari register checkbox.
