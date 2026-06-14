# designhelpcenter.md — Spesifikasi Implementasi Help Center NutriTrack ke React PWA + Tailwind CSS

Dokumen ini adalah hasil analisis tampilan dari `helpcenter.html` untuk dikonversi menjadi project lokal berbasis **React PWA + Tailwind CSS**. Fokus dokumen ini adalah membedah semua elemen UI, warna, layout, animasi, state interaksi, dan struktur komponen supaya halaman **Help Center** dapat diimplementasikan ulang secara konsisten dengan design system NutriTrack.

---

## 1. Ringkasan Tampilan

Halaman `helpcenter.html` adalah halaman pusat bantuan untuk aplikasi NutriTrack. Karakter UI-nya mengikuti gaya dashboard NutriTrack yang sudah konsisten pada halaman lain:

- **Sidebar kiri fixed** dengan navigation shell.
- **Top app bar sticky** dengan judul halaman, search mini, icon notification/settings, dan user profile.
- **Hero help search** dengan background mint dan spotlight blur.
- **Category grid** berisi empat kartu bantuan utama.
- **Tutorial cards** dengan thumbnail, overlay play button, dan durasi video.
- **FAQ accordion** menggunakan elemen `<details>`.
- **Contact support CTA** dengan gradient ungu–orange.
- **Footer lengkap** berisi brand, link produk, link perusahaan, newsletter, dan social links.
- **Micro-interaction** berupa hover lift, scale image, focus ring search, FAQ open ring, dan sidebar collapse.

Secara visual, halaman ini menggunakan konsep **clean health-tech support center**: permukaan putih semi-transparan, warna hijau primer, background biru sangat muda, aksen orange/ungu, typography Poppins + Nunito + Inter, dan glassmorphism ringan.

---

## 2. Tujuan Implementasi React PWA

Target implementasi lokal:

1. Mengubah HTML statis menjadi komponen React modular.
2. Memindahkan konfigurasi Tailwind CDN menjadi `tailwind.config.js`.
3. Mengubah DOM manipulation manual menjadi state React.
4. Membuat komponen reusable untuk app shell, top bar, search input, cards, FAQ, CTA, dan footer.
5. Menyiapkan struktur PWA agar halaman dapat cache/offline.
6. Menjaga identitas visual NutriTrack agar konsisten dengan halaman dashboard, log food, meal planner, progress, nutrition, foods, community, profile, settings, dan notifications.

---

## 3. Audit Struktur Halaman

Struktur utama halaman:

```txt
<body>
  <aside id="sidebar">
    Brand
    Navigation links
    Upgrade card
    Help Center active link
    Logout
  </aside>

  <main id="mainContent">
    <TopAppBar />

    <HeroSearchSection />
    <HelpCategoryGrid />
    <QuickTutorialsSection />
    <FAQSection />
    <ContactSupportSection />
  </main>

  <Footer />
</body>
```

Catatan penting:

- `Help Center` aktif berada di area bawah sidebar, bukan di navigation utama.
- Footer berada di luar `<main>`, sehingga pada implementasi React sebaiknya tetap berada dalam layout yang menghormati sidebar offset agar tidak tertutup sidebar pada desktop.
- Halaman memakai banyak section full-width, tidak hanya dashboard card layout.
- Hero dan tutorial section punya background berbeda untuk memberi ritme visual.

---

## 4. Design Token Warna

### 4.1 Palette Utama

| Token | Hex | Fungsi |
|---|---:|---|
| `primary` | `#006e2f` | Brand utama, CTA, icon aktif, link |
| `primary-container` | `#22c55e` | Active state sidebar, badge, highlight |
| `on-primary` | `#ffffff` | Teks di atas primary |
| `on-primary-container` | `#004b1e` | Teks di atas primary-container |
| `background` | `#f8f9ff` | Background global |
| `surface` | `#f8f9ff` | Permukaan base |
| `surface-container-lowest` | `#ffffff` | Card/inner panel putih |
| `surface-container-low` | `#eff4ff` | Sidebar, section background, footer-ish surface |
| `surface-container` | `#e5eeff` | Input background, secondary surface |
| `surface-container-high` | `#dce9ff` | Higher emphasis surface |
| `surface-container-highest` | `#d3e4fe` | Maximum container surface |
| `surface-variant` | `#d3e4fe` | Hover surface |
| `surface-dim` | `#cbdbf5` | Thumbnail placeholder |
| `mint-surface` | `#f0fdf4` | Hero background dan health-focused section |
| `on-surface` | `#0b1c30` | Teks utama |
| `on-surface-variant` | `#3d4a3d` | Teks sekunder |
| `outline` | `#6d7b6c` | Outline kuat |
| `outline-variant` | `#bccbb9` | Border halus |
| `secondary` | `#0058be` | Technical category, link/secondary accent |
| `secondary-container` | `#2170e4` | Upgrade card gradient |
| `tertiary` | `#9e4036` | Nutrition category |
| `tertiary-container` | `#ff8b7c` | Nutrition soft accent |
| `energy-orange` | `#f97316` | Subscription/payment/support accent |
| `achievement-purple` | `#a855f7` | Achievement/support gradient |
| `warning-yellow` | `#eab308` | Badge/warning |
| `error-red` | `#ef4444` | Logout/danger |
| `inverse-surface` | `#213145` | Tooltip/dark surface |
| `inverse-on-surface` | `#eaf1ff` | Teks di dark surface |

### 4.2 Warna Khusus Halaman Help Center

| Elemen | Warna |
|---|---|
| Hero background | `bg-mint-surface` |
| Hero blur kanan | `bg-primary/5` |
| Hero blur kiri | `bg-secondary/5` |
| Search icon hero | `text-primary` |
| Category Account | `bg-primary/10`, hover `bg-primary text-white` |
| Category Nutrition | `bg-tertiary-container/20`, hover `bg-tertiary text-white` |
| Category Technical | `bg-secondary-container/10`, hover `bg-secondary text-white` |
| Category Subscription | `bg-energy-orange/10`, hover `bg-energy-orange text-white` |
| Tutorial section background | `bg-surface-container-low` |
| CTA support gradient | `linear-gradient(135deg, #a855f7 0%, #f97316 100%)` |
| Footer background | `bg-surface-container` |

### 4.3 Catatan Kontras

- `primary #006e2f` dengan `white` aman untuk CTA.
- `on-surface #0b1c30` di atas `background #f8f9ff` sangat aman untuk body text.
- `on-surface-variant #3d4a3d` cocok untuk secondary text.
- `achievement-purple #a855f7` di atas putih kurang ideal untuk teks kecil. Gunakan untuk background gradient, icon besar, atau teks bold/large.
- Untuk CTA gradient, gunakan `text-white` dan tambahkan overlay/glow secukupnya.

---

## 5. Typography System

HTML memakai empat keluarga font:

| Token | Font | Fungsi |
|---|---|---|
| `headline-xl` | Poppins | Hero title besar |
| `headline-lg` | Poppins | Judul section besar |
| `headline-md` | Poppins | Card title, section title |
| `body-md` | Nunito | Body text utama |
| `body-lg` | Nunito | Lead paragraph |
| `label-md` | Inter | Button, label, nav |
| `label-sm` | Inter | Badge, uppercase metadata |
| `metrics-mono` | JetBrains Mono | Durasi video, angka teknis |

### Implementasi Tailwind

```js
fontFamily: {
  "headline-md": ["Poppins", "sans-serif"],
  "body-md": ["Nunito", "sans-serif"],
  "label-md": ["Inter", "sans-serif"],
  "headline-xl": ["Poppins", "sans-serif"],
  "headline-lg": ["Poppins", "sans-serif"],
  "label-sm": ["Inter", "sans-serif"],
  "headline-lg-mobile": ["Poppins", "sans-serif"],
  "body-lg": ["Nunito", "sans-serif"],
  "metrics-mono": ["JetBrains Mono", "monospace"],
}
```

Rekomendasi: hindari import Google Fonts berulang di setiap halaman. Letakkan sekali di `index.html` atau gunakan self-hosted font untuk performa PWA.

---

## 6. Spacing, Radius, Shadow, dan Layout

### 6.1 Spacing Token

| Token | Value | Fungsi |
|---|---:|---|
| `gutter-mobile` | `16px` | Padding mobile |
| `gutter-desktop` | `24px` | Padding desktop |
| `margin-page` | `24px` | Padding sidebar/main shell |
| `section-gap` | `32px` | Gap antar section |
| `card-padding` | `24px` | Padding card Help Center |
| `unit` | `4px` | Base unit |

### 6.2 Radius

| Class | Value | Penggunaan |
|---|---:|---|
| `rounded-xl` | `0.75rem` | Nav/link/input kecil |
| `rounded-2xl` | `1rem` | Button/card kecil |
| `rounded-3xl` | `1.5rem` | Search/tutor cards |
| `rounded-4xl` | `2rem` | Large panel |
| `rounded-[2.5rem]` | custom | CTA support |
| `rounded-full` | full | Icon/avatar/badge |

### 6.3 Glass Card

Gunakan class utilitas custom:

```css
.glass-card {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(226, 232, 240, 0.5);
  box-shadow: 0 10px 25px -5px rgba(0, 110, 47, 0.05);
}
```

Versi Tailwind component layer:

```css
@layer components {
  .glass-card {
    @apply bg-white/80 backdrop-blur-xl border border-slate-200/50 shadow-[0_10px_25px_-5px_rgba(0,110,47,0.05)];
  }

  .achievement-gradient {
    background: linear-gradient(135deg, #a855f7 0%, #f97316 100%);
  }
}
```

---

## 7. Komponen Utama yang Harus Dibuat

### 7.1 `AppShell`

Fungsi:

- Menampung sidebar fixed.
- Menampung main content dengan `xl:ml-64`.
- Menyediakan state:
  - `isCollapsed`
  - `isSidebarHidden`
  - `isMobileOpen`
- Mengatur class layout:
  - sidebar normal: `w-64`
  - collapsed: `w-[72px]`
  - hidden: `-translate-x-[110%] w-0`
  - main collapsed: `xl:ml-[72px]`
  - main hidden: `xl:ml-0`

Struktur:

```jsx
<AppShell activeRoute="helpcenter">
  <HelpCenterPage />
</AppShell>
```

Catatan: Footer halaman Help Center harus ikut masuk ke dalam `main` atau diberi wrapper yang sama offset-nya, agar tidak ketimpa sidebar fixed.

---

### 7.2 `Sidebar`

Elemen sidebar:

- Brand icon `nutrition`.
- Brand text `NutriTrack`.
- Subtitle `Pro Companion`.
- Collapse button `chevron_left/right`.
- Navigation:
  - Dashboard
  - Log Food
  - Meal Planner
  - Progress
  - Nutrition
  - Foods
  - Community
  - Profile
- Bottom:
  - Upgrade card
  - Help Center active state
  - Logout

Active state untuk Help Center:

```txt
bg-primary-container text-on-primary-container rounded-xl font-bold shadow-sm
```

Rekomendasi komponen:

```jsx
const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: "dashboard" },
  { label: "Log Food", href: "/log-food", icon: "add_box" },
  { label: "Meal Planner", href: "/meal-planner", icon: "restaurant_menu" },
  { label: "Progress", href: "/progress", icon: "insights" },
  { label: "Nutrition", href: "/nutrition", icon: "bar_chart" },
  { label: "Foods", href: "/foods", icon: "nutrition" },
  { label: "Community", href: "/community", icon: "group" },
  { label: "Profile", href: "/profile", icon: "person" },
];

const utilityItems = [
  { label: "Help Center", href: "/help-center", icon: "help" },
  { label: "Logout", href: "/login", icon: "logout", danger: true },
];
```

---

### 7.3 `TopAppBar`

Konten halaman:

- Title: `Help Center`
- Subtitle: `Apa yang bisa kami bantu?`
- Search mini placeholder: `Cari di pusat bantuan...`
- Notification icon
- Settings icon
- Profile shortcut

Class inti:

```txt
sticky top-0 z-40 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/30
h-16 flex items-center justify-between
```

Catatan implementasi:

- Pada mobile, search mini dapat disembunyikan dan diganti dengan button search.
- Gunakan `aria-label` pada notification/settings/profile.
- Search input perlu state React: `topSearchQuery`.

---

## 8. Section: Hero Search

### 8.1 Fungsi

Hero search adalah pusat interaksi utama. User diarahkan untuk mencari artikel, tutorial, atau masalah teknis.

Konten:

- Headline: `Apa yang bisa kami bantu?`
- Search besar: `Cari artikel, tutorial, dan lainnya...`
- Popular links:
  - `Tingkatan langganan`
  - `Dasar pelacakan makro`
  - `Menghubungkan perangkat`

### 8.2 Layout

```txt
section
  py-24
  bg-mint-surface
  relative overflow-hidden

  background blur:
    primary circle top-right
    secondary circle bottom-left

  centered content max-w-3xl
```

### 8.3 Class Utama

```txt
relative py-24 flex flex-col items-center justify-center bg-mint-surface overflow-hidden
```

Search input:

```txt
w-full h-16 pl-16 pr-6 rounded-3xl glass-card border-none
focus:ring-4 focus:ring-primary/10 transition-all
text-body-lg font-body-lg shadow-xl outline-none
```

### 8.4 React Component

```jsx
function HeroHelpSearch({ popularLinks, value, onChange }) {
  return (
    <section className="relative py-24 flex flex-col items-center justify-center bg-mint-surface overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl -ml-32 -mb-32" />

      <div className="relative z-10 text-center px-gutter-mobile w-full max-w-3xl">
        <h1 className="font-headline-xl text-headline-xl text-on-background mb-8">
          Apa yang bisa kami bantu?
        </h1>

        <div className="relative group">
          <input
            value={value}
            onChange={(event) => onChange(event.target.value)}
            className="w-full h-16 pl-16 pr-6 rounded-3xl glass-card border-none focus:ring-4 focus:ring-primary/10 transition-all text-body-lg font-body-lg shadow-xl outline-none"
            placeholder="Cari artikel, tutorial, dan lainnya..."
            type="text"
          />
          <span className="material-symbols-outlined absolute left-6 top-1/2 -translate-y-1/2 text-primary text-3xl">
            search
          </span>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-4 text-label-md">
          <span className="text-on-surface-variant font-bold">Populer:</span>
          {popularLinks.map((link, index) => (
            <React.Fragment key={link.label}>
              <a className="text-primary hover:underline transition-all" href={link.href}>
                {link.label}
              </a>
              {index < popularLinks.length - 1 && (
                <span className="text-outline-variant/40">•</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

## 9. Section: Help Category Grid

### 9.1 Fungsi

Grid kategori membantu user memilih topik bantuan dengan cepat.

Kategori:

1. **Akun**
   - Icon: `person`
   - Deskripsi: Pengaturan profil, pemulihan kata sandi, keamanan.
   - Accent: primary green.

2. **Nutrisi**
   - Icon: `restaurant`
   - Deskripsi: Perencanaan makan, pelacakan kalori, target harian.
   - Accent: tertiary red/brown.

3. **Teknis**
   - Icon: `settings_suggest`
   - Deskripsi: Sinkronisasi perangkat, bug aplikasi, tips performa.
   - Accent: secondary blue.

4. **Langganan**
   - Icon: `payments`
   - Deskripsi: Riwayat tagihan, fitur Premium, perpanjangan.
   - Accent: energy orange.

### 9.2 Layout

```txt
max-w-[1200px] mx-auto px-gutter-desktop py-16
grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6
```

### 9.3 Card Pattern

```txt
glass-card rounded-[1.5rem] p-6
flex flex-col justify-between
hover:translate-y-[-4px] transition-transform cursor-pointer group
```

### 9.4 Component

```jsx
function HelpCategoryCard({ title, description, icon, iconClass, hoverClass }) {
  return (
    <button className="text-left glass-card rounded-[1.5rem] p-6 flex flex-col justify-between hover:-translate-y-1 transition-transform cursor-pointer group">
      <div className="flex justify-between items-start mb-10">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${iconClass} ${hoverClass}`}>
          <span className="material-symbols-outlined text-3xl">{icon}</span>
        </div>
        <span className="material-symbols-outlined text-on-surface-variant/40">
          arrow_forward
        </span>
      </div>
      <div>
        <h3 className="font-headline-md text-lg text-on-surface mb-2">{title}</h3>
        <p className="text-on-surface-variant text-sm leading-relaxed">{description}</p>
      </div>
    </button>
  );
}
```

---

## 10. Section: Quick Tutorials

### 10.1 Fungsi

Tutorial singkat menampilkan konten video untuk onboarding pengguna.

Konten:

1. **Mencatat makanan pertama Anda**
   - Durasi: `2:45`
   - Deskripsi: Pelajari cara menggunakan alat pengenalan foto AI kami.

2. **Menghubungkan Google Fit**
   - Durasi: `3:12`
   - Deskripsi: Sinkronkan langkah dan menit aktif Anda.

3. **Menyesuaikan Dashboard Anda**
   - Durasi: `1:50`
   - Deskripsi: Buat NutriTrack bekerja sesuai tujuan spesifik user.

### 10.2 Layout

Section:

```txt
bg-surface-container-low py-20
```

Wrapper:

```txt
max-w-[1200px] mx-auto px-gutter-desktop
```

Header:

```txt
flex justify-between items-end mb-10
```

Grid:

```txt
grid grid-cols-1 md:grid-cols-3 gap-8
```

### 10.3 Tutorial Card Pattern

```txt
glass-card rounded-3xl overflow-hidden group
```

Thumbnail:

```txt
relative h-48 bg-surface-dim overflow-hidden
img: transition-transform duration-500 group-hover:scale-110
overlay: bg-black/20 group-hover:bg-black/10
play button: bg-primary rounded-full group-hover:scale-110
duration badge: bg-black/60 backdrop-blur-md text-white
```

### 10.4 Component

```jsx
function TutorialCard({ title, description, duration, thumbnail }) {
  return (
    <article className="glass-card rounded-3xl overflow-hidden group">
      <div className="relative h-48 bg-surface-dim overflow-hidden">
        <img
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          src={thumbnail}
          alt={title}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
          <div className="w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              play_arrow
            </span>
          </div>
        </div>
        <span className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white px-2 py-1 rounded-lg text-xs font-metrics-mono">
          {duration}
        </span>
      </div>

      <div className="p-6">
        <h4 className="font-headline-md text-lg text-on-surface mb-2">{title}</h4>
        <p className="text-on-surface-variant text-sm">{description}</p>
      </div>
    </article>
  );
}
```

---

## 11. Section: FAQ Accordion

### 11.1 Fungsi

FAQ menampilkan pertanyaan umum dengan interaksi expand/collapse.

Pertanyaan di HTML:

1. Bagaimana cara membatalkan langganan Premium saya?
2. Apakah NutriTrack sinkron dengan MyFitnessPal?
3. Bisakah saya melacak puasa intermiten?
4. Apa yang terjadi jika saya menghapus aplikasi?

### 11.2 Implementasi Native

HTML menggunakan `<details>` dan `<summary>`, ini bagus untuk accessibility dasar.

Class pattern:

```txt
details:
group glass-card rounded-2xl overflow-hidden transition-all duration-300 open:ring-2 open:ring-primary/20

summary:
flex justify-between items-center p-6 cursor-pointer list-none

icon:
transition-transform duration-300 group-open:rotate-180 text-primary
```

### 11.3 React Component dengan Native Details

```jsx
function FAQItem({ question, answer }) {
  return (
    <details className="group glass-card rounded-2xl overflow-hidden transition-all duration-300 open:ring-2 open:ring-primary/20">
      <summary className="flex justify-between items-center p-6 cursor-pointer list-none">
        <span className="font-headline-md text-lg text-on-surface">{question}</span>
        <span className="material-symbols-outlined transition-transform duration-300 group-open:rotate-180 text-primary">
          expand_more
        </span>
      </summary>
      <div className="px-6 pb-6 text-on-surface-variant font-body-md border-t border-outline-variant/10 pt-6">
        {answer}
      </div>
    </details>
  );
}
```

### 11.4 Rekomendasi UX

- Untuk FAQ yang banyak, tambahkan filter berdasarkan `searchQuery`.
- Untuk mode satu FAQ terbuka saja, gunakan controlled accordion dengan state React.
- Tambahkan `id`/anchor agar FAQ dapat dibuka dari hasil pencarian.

---

## 12. Section: Contact Support CTA

### 12.1 Fungsi

CTA besar untuk user yang masih membutuhkan bantuan.

Konten:

- Icon: `support_agent`
- Title: `Masih butuh bantuan?`
- Deskripsi support 24/7.
- CTA 1: `Mulai Obrolan Langsung`
- CTA 2: `Kirim Email Dukungan`
- Metadata: `Waktu respon rata-rata: 2 jam`

### 12.2 Visual

Gradient:

```css
background: linear-gradient(135deg, #a855f7 0%, #f97316 100%);
```

Decorative blur:

```txt
absolute -top-24 -left-24 w-80 h-80 bg-white/10 rounded-full blur-3xl
absolute -bottom-24 -right-24 w-80 h-80 bg-primary-fixed/20 rounded-full blur-3xl
```

Wrapper:

```txt
achievement-gradient rounded-[2.5rem] p-10 md:p-20 relative overflow-hidden text-center text-white shadow-2xl
```

### 12.3 Component

```jsx
function ContactSupportCTA() {
  return (
    <section className="max-w-[1200px] mx-auto px-gutter-desktop py-20 mb-20">
      <div className="achievement-gradient rounded-[2.5rem] p-10 md:p-20 relative overflow-hidden text-center text-white shadow-2xl">
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-primary-fixed/20 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-8">
            <span className="material-symbols-outlined text-5xl">support_agent</span>
          </div>

          <h2 className="font-headline-lg text-4xl mb-6">Masih butuh bantuan?</h2>

          <p className="text-white/90 font-body-lg mb-12">
            Tim dukungan kami tersedia 24/7 untuk memastikan perjalanan kesehatan Anda tetap di jalurnya.
            Pilih cara yang Anda sukai untuk terhubung.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-white text-primary px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:scale-105 transition-transform shadow-xl">
              <span className="material-symbols-outlined">chat_bubble</span>
              Mulai Obrolan Langsung
            </button>
            <button className="bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-white/30 transition-colors">
              <span className="material-symbols-outlined">mail</span>
              Kirim Email Dukungan
            </button>
          </div>

          <p className="mt-10 text-white/60 font-label-sm uppercase tracking-widest">
            Waktu respon rata-rata: 2 jam
          </p>
        </div>
      </div>
    </section>
  );
}
```

---

## 13. Footer

### 13.1 Struktur Footer

Footer berisi:

- Brand NutriTrack.
- Deskripsi pendek.
- Link Produk:
  - Fitur
  - Premium
  - Komunitas
- Link Perusahaan:
  - Tentang Kami
  - Kebijakan Privasi
  - Syarat Layanan
- Newsletter input.
- Copyright.
- Social links:
  - Twitter
  - Instagram
  - LinkedIn

### 13.2 Catatan Layout

Pada HTML, footer berada di luar `<main>`, sementara sidebar fixed berada di kiri. Di React lokal, pilih salah satu:

**Opsi A — footer di dalam MainContent**

```jsx
<AppShell>
  <HelpCenterPage />
  <HelpFooter />
</AppShell>
```

**Opsi B — footer tetap luar tapi diberi offset**

```jsx
<footer className="xl:ml-64 ...">
```

Rekomendasi: Opsi A lebih mudah menjaga konsistensi layout.

### 13.3 Newsletter Form

Validasi minimal:

- Input type `email`.
- State `newsletterEmail`.
- Disable button saat kosong.
- Tampilkan toast/success message setelah submit.

---

## 14. Animasi dan Micro-Interaction

### 14.1 Hover Lift Card

HTML memakai JS:

```js
card.style.transform = 'translateY(-4px)';
```

Di React, gunakan Tailwind:

```txt
hover:-translate-y-1 transition-transform duration-300
```

Untuk shadow lebih hidup:

```txt
hover:shadow-xl hover:border-primary/20 transition-all duration-300
```

### 14.2 Search Focus Ring

HTML menambahkan class `ring-4 ring-primary/10` via JS.

Di React/Tailwind cukup gunakan:

```txt
focus:ring-4 focus:ring-primary/10
```

Atau untuk parent group:

```txt
focus-within:ring-4 focus-within:ring-primary/10
```

### 14.3 Image Scale Tutorial

```txt
group-hover:scale-110 transition-transform duration-500
```

### 14.4 Play Button Scale

```txt
group-hover:scale-110 transition-transform
```

### 14.5 FAQ Icon Rotate

```txt
group-open:rotate-180 transition-transform duration-300
```

### 14.6 CTA Button Scale

```txt
hover:scale-105 active:scale-95 transition-transform
```

### 14.7 Reduced Motion

Tambahkan CSS:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.001ms !important;
  }
}
```

---

## 15. Tailwind Config Lokal

Buat `tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "surface": "#f8f9ff",
        "on-primary": "#ffffff",
        "warning-yellow": "#eab308",
        "surface-bright": "#f8f9ff",
        "energy-orange": "#f97316",
        "on-tertiary-container": "#76231b",
        "achievement-purple": "#a855f7",
        "primary-fixed-dim": "#4ae176",
        "on-tertiary": "#ffffff",
        "outline": "#6d7b6c",
        "surface-container-highest": "#d3e4fe",
        "bg-dark": "#0f172a",
        "card-dark": "#1e293b",
        "inverse-primary": "#4ae176",
        "secondary": "#0058be",
        "secondary-container": "#2170e4",
        "error": "#ba1a1a",
        "primary-fixed": "#6bff8f",
        "outline-variant": "#bccbb9",
        "on-background": "#0b1c30",
        "mint-surface": "#f0fdf4",
        "surface-container-high": "#dce9ff",
        "on-primary-fixed-variant": "#005321",
        "surface-container-low": "#eff4ff",
        "on-secondary-fixed": "#001a42",
        "error-container": "#ffdad6",
        "error-red": "#ef4444",
        "secondary-fixed-dim": "#adc6ff",
        "inverse-on-surface": "#eaf1ff",
        "tertiary": "#9e4036",
        "on-secondary": "#ffffff",
        "on-secondary-container": "#fefcff",
        "on-surface-variant": "#3d4a3d",
        "tertiary-container": "#ff8b7c",
        "surface-variant": "#d3e4fe",
        "surface-tint": "#006e2f",
        "on-tertiary-fixed": "#410001",
        "on-secondary-fixed-variant": "#004395",
        "surface-dim": "#cbdbf5",
        "on-tertiary-fixed-variant": "#7f2a21",
        "surface-container-lowest": "#ffffff",
        "on-primary-container": "#004b1e",
        "tertiary-fixed": "#ffdad5",
        "tertiary-fixed-dim": "#ffb4a9",
        "on-surface": "#0b1c30",
        "background": "#f8f9ff",
        "on-error-container": "#93000a",
        "primary-container": "#22c55e",
        "on-primary-fixed": "#002109",
        "on-error": "#ffffff",
        "bg-light": "#f8fafc",
        "card-light": "#ffffff",
        "primary": "#006e2f",
        "surface-container": "#e5eeff",
        "inverse-surface": "#213145",
        "secondary-fixed": "#d8e2ff",
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
        full: "9999px",
      },
      spacing: {
        "section-gap": "32px",
        "gutter-mobile": "16px",
        "unit": "4px",
        "gutter-desktop": "24px",
        "margin-page": "24px",
        "card-padding": "24px",
      },
      fontFamily: {
        "headline-md": ["Poppins", "sans-serif"],
        "body-md": ["Nunito", "sans-serif"],
        "label-md": ["Inter", "sans-serif"],
        "headline-xl": ["Poppins", "sans-serif"],
        "headline-lg": ["Poppins", "sans-serif"],
        "label-sm": ["Inter", "sans-serif"],
        "headline-lg-mobile": ["Poppins", "sans-serif"],
        "body-lg": ["Nunito", "sans-serif"],
        "metrics-mono": ["JetBrains Mono", "monospace"],
      },
      fontSize: {
        "headline-md": ["24px", { lineHeight: "1.3", fontWeight: "600" }],
        "body-md": ["16px", { lineHeight: "1.5", fontWeight: "400" }],
        "label-md": ["14px", { lineHeight: "1.4", letterSpacing: "0.01em", fontWeight: "500" }],
        "headline-xl": ["48px", { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "700" }],
        "headline-lg": ["32px", { lineHeight: "1.25", fontWeight: "600" }],
        "label-sm": ["12px", { lineHeight: "1.4", letterSpacing: "0.05em", fontWeight: "600" }],
        "headline-lg-mobile": ["28px", { lineHeight: "1.25", fontWeight: "600" }],
        "body-lg": ["18px", { lineHeight: "1.6", fontWeight: "400" }],
        "metrics-mono": ["16px", { lineHeight: "1", fontWeight: "500" }],
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
  ],
};
```

---

## 16. `src/index.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }

  body {
    @apply bg-background text-on-surface font-body-md overflow-x-hidden;
  }

  .material-symbols-outlined {
    font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24;
  }
}

@layer components {
  .glass-card {
    @apply bg-white/80 backdrop-blur-xl border border-slate-200/50 shadow-[0_10px_25px_-5px_rgba(0,110,47,0.05)];
  }

  .achievement-gradient {
    background: linear-gradient(135deg, #a855f7 0%, #f97316 100%);
  }

  .app-icon-button {
    @apply w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface-variant transition-colors text-on-surface-variant;
  }

  .primary-button {
    @apply bg-primary text-on-primary px-8 py-4 rounded-2xl font-bold hover:scale-105 active:scale-95 transition-transform shadow-xl;
  }

  .secondary-glass-button {
    @apply bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-2xl font-bold hover:bg-white/30 transition-colors;
  }
}

@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.001ms !important;
  }
}
```

---

## 17. Struktur Folder React

```txt
src/
  app/
    App.jsx
    routes.jsx

  components/
    layout/
      AppShell.jsx
      Sidebar.jsx
      TopAppBar.jsx
      HelpFooter.jsx

    ui/
      MaterialIcon.jsx
      GlassCard.jsx
      SearchInput.jsx
      SectionHeader.jsx

  features/
    help-center/
      HelpCenterPage.jsx
      HeroHelpSearch.jsx
      HelpCategoryGrid.jsx
      HelpCategoryCard.jsx
      QuickTutorialsSection.jsx
      TutorialCard.jsx
      FAQSection.jsx
      FAQItem.jsx
      ContactSupportCTA.jsx
      helpCenter.data.js

  styles/
    index.css

  pwa/
    registerSW.js
```

---

## 18. Data Model

### 18.1 Popular Links

```js
export const popularHelpLinks = [
  { label: "Tingkatan langganan", href: "#subscription" },
  { label: "Dasar pelacakan makro", href: "#macro-tracking" },
  { label: "Menghubungkan perangkat", href: "#device-sync" },
];
```

### 18.2 Help Categories

```js
export const helpCategories = [
  {
    id: "account",
    title: "Akun",
    description: "Pengaturan profil, pemulihan kata sandi, dan keamanan.",
    icon: "person",
    iconClass: "bg-primary/10 text-primary",
    hoverClass: "group-hover:bg-primary group-hover:text-white",
  },
  {
    id: "nutrition",
    title: "Nutrisi",
    description: "Perencanaan makan, pelacakan kalori, dan target harian.",
    icon: "restaurant",
    iconClass: "bg-tertiary-container/20 text-tertiary",
    hoverClass: "group-hover:bg-tertiary group-hover:text-white",
  },
  {
    id: "technical",
    title: "Teknis",
    description: "Sinkronisasi perangkat, bug aplikasi, dan tips performa.",
    icon: "settings_suggest",
    iconClass: "bg-secondary-container/10 text-secondary",
    hoverClass: "group-hover:bg-secondary group-hover:text-white",
  },
  {
    id: "subscriptions",
    title: "Langganan",
    description: "Riwayat tagihan, fitur Premium, dan perpanjangan.",
    icon: "payments",
    iconClass: "bg-energy-orange/10 text-energy-orange",
    hoverClass: "group-hover:bg-energy-orange group-hover:text-white",
  },
];
```

### 18.3 Tutorials

```js
export const tutorials = [
  {
    id: "first-food-log",
    title: "Mencatat makanan pertama Anda",
    description: "Pelajari cara menggunakan alat pengenalan foto AI kami.",
    duration: "2:45",
    thumbnail: "/assets/help/tutorial-food-log.webp",
  },
  {
    id: "google-fit",
    title: "Menghubungkan Google Fit",
    description: "Sinkronkan langkah dan menit aktif Anda dengan mulus.",
    duration: "3:12",
    thumbnail: "/assets/help/tutorial-google-fit.webp",
  },
  {
    id: "custom-dashboard",
    title: "Menyesuaikan Dashboard Anda",
    description: "Buat NutriTrack bekerja sesuai dengan tujuan spesifik Anda.",
    duration: "1:50",
    thumbnail: "/assets/help/tutorial-dashboard.webp",
  },
];
```

### 18.4 FAQ

```js
export const faqs = [
  {
    id: "cancel-premium",
    question: "Bagaimana cara membatalkan langganan Premium saya?",
    answer:
      "Anda dapat membatalkan langganan kapan saja melalui menu Pengaturan > Langganan di aplikasi. Jika Anda berlangganan melalui App Store atau Google Play, Anda harus mengelola pembatalan melalui alat manajemen langganan mereka masing-masing.",
  },
  {
    id: "myfitnesspal-sync",
    question: "Apakah NutriTrack sinkron dengan MyFitnessPal?",
    answer:
      "Saat ini, NutriTrack beroperasi sebagai ekosistem independen untuk memberikan akurasi data yang lebih tinggi melalui NutriEngine milik kami. Namun, Anda dapat mengekspor data dalam format CSV untuk diunggah ke layanan lain.",
  },
  {
    id: "intermittent-fasting",
    question: "Bisakah saya melacak puasa intermiten?",
    answer:
      "Ya! Anggota Premium memiliki akses ke alat Protokol Puasa yang mencakup pengatur waktu untuk 16:8, 20:4, dan jendela puasa khusus langsung di dashboard.",
  },
  {
    id: "delete-app",
    question: "Apa yang terjadi jika saya menghapus aplikasi?",
    answer:
      "Menghapus aplikasi tidak menghapus akun Anda. Data Anda tetap tersimpan dengan aman di cloud kami. Untuk menghapus akun dan semua data terkait, silakan gunakan tombol Permintaan Penghapusan Data di pengaturan Profil Anda.",
  },
];
```

### 18.5 Footer Links

```js
export const footerLinks = {
  product: [
    { label: "Fitur", href: "#" },
    { label: "Premium", href: "#" },
    { label: "Komunitas", href: "#" },
  ],
  company: [
    { label: "Tentang Kami", href: "#" },
    { label: "Kebijakan Privasi", href: "#" },
    { label: "Syarat Layanan", href: "#" },
  ],
  social: [
    { label: "Twitter", href: "#" },
    { label: "Instagram", href: "#" },
    { label: "LinkedIn", href: "#" },
  ],
};
```

---

## 19. Contoh `HelpCenterPage.jsx`

```jsx
import { useMemo, useState } from "react";
import {
  faqs,
  helpCategories,
  popularHelpLinks,
  tutorials,
} from "./helpCenter.data";
import HeroHelpSearch from "./HeroHelpSearch";
import HelpCategoryGrid from "./HelpCategoryGrid";
import QuickTutorialsSection from "./QuickTutorialsSection";
import FAQSection from "./FAQSection";
import ContactSupportCTA from "./ContactSupportCTA";
import HelpFooter from "../../components/layout/HelpFooter";

export default function HelpCenterPage() {
  const [query, setQuery] = useState("");

  const filteredFaqs = useMemo(() => {
    if (!query.trim()) return faqs;

    const normalized = query.toLowerCase();

    return faqs.filter((faq) => {
      return (
        faq.question.toLowerCase().includes(normalized) ||
        faq.answer.toLowerCase().includes(normalized)
      );
    });
  }, [query]);

  return (
    <>
      <HeroHelpSearch
        value={query}
        onChange={setQuery}
        popularLinks={popularHelpLinks}
      />

      <HelpCategoryGrid categories={helpCategories} />

      <QuickTutorialsSection tutorials={tutorials} />

      <FAQSection faqs={filteredFaqs} />

      <ContactSupportCTA />

      <HelpFooter />
    </>
  );
}
```

---

## 20. PWA Setup

### 20.1 Install

```bash
npm install @vitejs/plugin-react vite-plugin-pwa @tailwindcss/forms
```

### 20.2 `vite.config.js`

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        "favicon.svg",
        "robots.txt",
        "apple-touch-icon.png",
      ],
      manifest: {
        name: "NutriTrack",
        short_name: "NutriTrack",
        description: "Nutrition tracking and wellness companion.",
        theme_color: "#006e2f",
        background_color: "#f8f9ff",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "/icons/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icons/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,webp,woff2}"],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-stylesheets",
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-webfonts",
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
            },
          },
          {
            urlPattern: /^https:\/\/lh3\.googleusercontent\.com\/.*/i,
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "remote-help-images",
              expiration: {
                maxEntries: 60,
                maxAgeSeconds: 60 * 60 * 24 * 30,
              },
            },
          },
        ],
      },
    }),
  ],
});
```

### 20.3 Catatan PWA

Untuk production:

- Simpan thumbnail tutorial ke `/public/assets/help/*.webp`.
- Hindari bergantung penuh pada `lh3.googleusercontent.com`.
- Gunakan lazy loading pada image.
- Cache FAQ dan data help center di IndexedDB/localStorage jika ingin searchable offline.

---

## 21. Accessibility Checklist

### Wajib

- Search input punya `aria-label`.
- Category card sebagai `<button>` atau `<a>` dengan label jelas.
- Tutorial card play button punya `aria-label="Putar tutorial ..."` jika dapat diklik.
- FAQ native `<details>` sudah baik, tetapi pastikan summary jelas.
- CTA live chat/email harus berupa button/link semantik.
- Footer newsletter form punya label tersembunyi untuk email.
- Sidebar collapse button harus update `aria-expanded`.
- Jangan hanya mengandalkan warna untuk state hover/active.
- Gunakan focus visible:
  - `focus-visible:ring-2`
  - `focus-visible:ring-primary`
  - `focus-visible:outline-none`

### Contoh Focus Style

```txt
focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
```

---

## 22. Responsiveness

### Desktop

- Sidebar fixed 256px.
- Main content `xl:ml-64`.
- Category grid 4 kolom.
- Tutorial grid 3 kolom.
- Footer 4 kolom.

### Tablet

- Sidebar hidden / drawer.
- Category grid 2 kolom.
- Tutorial grid 3 atau 2 kolom sesuai width.
- CTA support button horizontal jika cukup.

### Mobile

- Hero headline harus turun ke `text-headline-lg-mobile` atau `text-3xl`.
- Search hero tetap full width, tinggi bisa `h-14`.
- Popular links wrap.
- Category grid 1 kolom.
- Tutorial grid 1 kolom.
- FAQ summary jangan terlalu besar.
- CTA buttons stack vertical.
- Footer 1 kolom.

Contoh responsive title:

```txt
font-headline-xl text-headline-lg-mobile md:text-headline-xl
```

---

## 23. Prioritas Perbaikan dari HTML Asli

### Prioritas Tinggi

1. **Tailwind CDN harus dipindah ke konfigurasi lokal.**  
   CDN tidak ideal untuk project React PWA production.

2. **DOM manipulation manual diganti state React.**  
   Hover/focus/sidebars sebaiknya tidak memakai `querySelectorAll`.

3. **Footer perlu masuk ke AppShell.**  
   Agar tidak tertutup sidebar fixed dan konsisten dengan layout desktop.

4. **Gambar remote perlu dilokalkan.**  
   Simpan sebagai WebP/AVIF di `/public/assets/help/`.

5. **Search hero perlu fungsi nyata.**  
   Minimal filter FAQ/artikel berdasarkan query.

6. **FAQ perlu data-driven.**  
   Jangan hardcode 4 item langsung di JSX.

### Prioritas Menengah

1. Tambahkan skeleton untuk artikel/tutorial.
2. Tambahkan empty state untuk hasil pencarian kosong.
3. Tambahkan breadcrumb: `Help Center > Category > Article`.
4. Tambahkan shortcut ke contact support ketika search tidak menemukan hasil.
5. Tambahkan status `popular`, `new`, atau `premium` pada tutorial/artikel.

### Prioritas Rendah

1. Tambahkan animation reveal on scroll.
2. Tambahkan command palette bantuan.
3. Tambahkan dark mode penuh.
4. Tambahkan rating artikel: “Apakah artikel ini membantu?”

---

## 24. Acceptance Criteria

Implementasi dianggap sesuai jika:

- Sidebar, top app bar, dan footer tampil konsisten.
- Help Center active state berada pada sidebar bagian bawah.
- Hero search tampil dengan background mint dan spotlight blur.
- Search input besar memiliki focus ring hijau.
- Popular links tampil wrap di mobile.
- Category grid punya 4 kartu dengan accent sesuai.
- Tutorial section memiliki 3 video cards dengan thumbnail, overlay, play button, dan duration badge.
- FAQ bisa expand/collapse dan icon berotasi.
- Contact support CTA memakai gradient `achievement-purple -> energy-orange`.
- Footer newsletter tampil dan responsive.
- Semua hover effect bekerja tanpa manipulasi DOM langsung.
- Layout mobile tidak overflow horizontal.
- PWA dapat di-install dan asset penting ter-cache.

---

## 25. Rekomendasi Final UI/UX

Halaman Help Center ini sudah kuat secara visual karena punya hierarki yang jelas:

1. User mencari solusi lewat search hero.
2. User memilih kategori bantuan jika belum tahu kata kunci.
3. User belajar cepat lewat tutorial singkat.
4. User membaca FAQ untuk masalah umum.
5. User diarahkan ke live chat/email jika masih butuh bantuan.

Untuk project lokal React PWA, kualitas akan naik signifikan jika:

- Search benar-benar memfilter artikel/FAQ.
- Tutorial card diarahkan ke modal video atau route detail tutorial.
- FAQ dibuat data-driven.
- Footer masuk ke layout shell.
- Asset gambar dioptimasi lokal.
- Motion dipindah ke class Tailwind/state React, bukan script DOM global.

---

## 26. Mapping Komponen ke Route

```txt
/help-center
  AppShell
    Sidebar active utility item: Help Center
    TopAppBar title: Help Center
    HeroHelpSearch
    HelpCategoryGrid
    QuickTutorialsSection
    FAQSection
    ContactSupportCTA
    HelpFooter
```

Potential child routes:

```txt
/help-center/category/account
/help-center/category/nutrition
/help-center/category/technical
/help-center/category/subscription
/help-center/article/:slug
/help-center/tutorial/:slug
/help-center/contact
```

---

## 27. Catatan Konsistensi dengan Halaman Lain

Gunakan token dan komponen yang sama dengan halaman dashboard, log food, meal planner, progress, nutrition, foods, community, profile, settings, dan notifications:

- `glass-card`
- `achievement-gradient`
- `primary`
- `surface-container-low`
- `on-surface`
- `on-surface-variant`
- `AppShell`
- `TopAppBar`
- `Sidebar`
- `MaterialIcon`

Dengan begitu, Help Center tidak terasa seperti halaman terpisah, tetapi bagian natural dari ekosistem NutriTrack.
