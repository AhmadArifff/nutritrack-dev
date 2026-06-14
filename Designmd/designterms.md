# designterms.md — NutriTrack Terms Page Design & React PWA Implementation

> Dokumen ini dibuat untuk mengonversi halaman HTML statis NutriTrack ke project lokal berbasis **React + Vite PWA + Tailwind CSS**.
> Fokus utama: mempertahankan visual asli, merapikan struktur komponen, mengganti CDN Tailwind menjadi konfigurasi lokal, dan menyiapkan state/validasi agar siap diintegrasikan dengan backend.

## 1. Ringkasan Tampilan

`terms.html` adalah halaman legal statis untuk **Syarat & Ketentuan**. Strukturnya paralel dengan Privacy:

- Sticky header putih.
- Brand NutriTrack kiri.
- Nav kanan: Login dan Privacy.
- Main content max width `5xl`.
- Label kecil `Terms`.
- Heading besar `Syarat & Ketentuan`.
- Intro disclaimer: NutriTrack bukan pengganti konsultasi medis.
- Tiga section card:
  1. Penggunaan Aplikasi
  2. Batasan Layanan
  3. Akun dan Keamanan

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
export default function TermsPage() {
  return (
    <div className="bg-slate-50 text-slate-900 font-sans min-h-screen">
      <LegalHeader active="terms" />
      <main className="max-w-5xl mx-auto px-6 py-14">
        <p className="uppercase tracking-[0.28em] text-xs font-extrabold text-green-700 mb-4">
          Terms
        </p>
        <h1 className="text-4xl font-black mb-6">Syarat & Ketentuan</h1>
        <p className="text-slate-600 max-w-3xl mb-10">
          NutriTrack adalah alat bantu manajemen nutrisi. Konten di aplikasi bukan pengganti konsultasi medis profesional.
        </p>
        <div className="grid gap-5">
          {termsSections.map((section) => (
            <LegalSectionCard key={section.title} {...section} />
          ))}
        </div>
      </main>
    </div>
  );
}
```

## 5. Data Content

```js
export const termsSections = [
  {
    title: "Penggunaan Aplikasi",
    body: "Pengguna bertanggung jawab memastikan data yang dimasukkan akurat agar perhitungan target lebih relevan.",
  },
  {
    title: "Batasan Layanan",
    body: "Rekomendasi makanan dan target kalori bersifat informatif dan perlu disesuaikan dengan kondisi pribadi.",
  },
  {
    title: "Akun dan Keamanan",
    body: "Jaga kredensial akun dan segera ubah kata sandi bila ada aktivitas yang mencurigakan.",
  },
];
```

## 6. Medical Disclaimer Treatment

Karena aplikasi menyangkut nutrisi dan kesehatan, halaman Terms sebaiknya menonjolkan disclaimer:

```jsx
<div className="mb-8 rounded-3xl border border-amber-200 bg-amber-50 p-5 text-amber-900">
  <p className="font-bold">Catatan penting</p>
  <p className="text-sm mt-1">
    NutriTrack bukan pengganti dokter, ahli gizi, atau layanan medis profesional.
  </p>
</div>
```

## 7. PWA dan Route

```txt
/terms
/privacy
/login
/register
```

Pastikan Terms bisa diakses dari:

- Register checkbox.
- Footer landing page.
- Footer help center.
- Settings → Privacy & Security.

## 8. Animasi

| Elemen | Animasi |
|---|---|
| Section card | hover shadow + translate |
| Header nav | hover color |
| Legal content | fade-up once |
| Focus state | green ring |

## 9. Accessibility Checklist

- Gunakan semantic `<main>`, `<section>`.
- Heading hierarchy harus konsisten.
- Link Privacy/Login visible dan keyboard accessible.
- Jangan hanya menggunakan warna untuk disclaimer.
- Tambahkan `aria-label="Navigasi legal"` pada nav.

## 10. Prioritas Perbaikan

1. Tambahkan tanggal berlaku.
2. Tambahkan section perubahan layanan.
3. Tambahkan section pembatasan tanggung jawab.
4. Tambahkan section penghentian akun.
5. Tambahkan kontak support/legal.
