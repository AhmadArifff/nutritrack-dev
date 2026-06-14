# designcommunity.md — NutriTrack Community Hub UI Specification

> Dokumen ini adalah hasil analisis tampilan `community.html` untuk dikonversi ke project lokal berbasis **React PWA + Tailwind CSS**. Fokus utama halaman ini adalah membangun pengalaman komunitas yang terasa sosial, suportif, modern, dan tetap konsisten dengan design system NutriTrack.

---

## 1. Ringkasan Visual Halaman

Halaman **Community Hub** menggunakan konsep dashboard komunitas dengan struktur:

1. **Shared App Shell**
   - Sidebar kiri tetap.
   - Top app bar sticky.
   - Main content dengan max width dashboard.
2. **Hero Community**
   - Headline besar.
   - CTA `Find Buddies` dan `Global Feed`.
   - Visual glass icon komunitas.
3. **Active Health Challenges**
   - Kartu challenge berbasis image/illustration.
   - Badge status seperti `Hot` dan `High Impact`.
   - Avatar stack participant.
   - CTA join challenge.
4. **Community Success & Wins**
   - Feed post sosial.
   - Avatar user, timestamp, badge, image post.
   - Actions: cheers, comments, share.
5. **Right Sidebar Widgets**
   - Top Streaks leaderboard.
   - Suggested buddies.
   - Motivation quote card.
6. **Contextual FAB**
   - Floating action untuk membuat story/post baru.

Secara UI, halaman ini lebih “social app” dibanding halaman lain, tetapi masih mempertahankan karakter NutriTrack: clean, hijau sehat, glassmorphism, rounded card besar, dan micro-interaction halus.

---

## 2. Tujuan UX Halaman

Halaman ini harus membuat user merasa:

- Tidak sendirian menjalankan program nutrisi.
- Mudah menemukan partner akuntabilitas.
- Tertarik mengikuti tantangan kesehatan.
- Termotivasi dari progress orang lain.
- Terdorong membuat cerita/progress baru.

Secara funnel, halaman ini punya 3 aksi utama:

| Prioritas | Aksi | Elemen UI |
|---|---|---|
| P1 | Join challenge | Challenge Card CTA |
| P1 | Find buddies | Hero CTA + Suggested Buddies |
| P2 | Interaksi feed | Cheers, comments, share |
| P2 | Create story | Floating Action Button |
| P3 | Explore leaderboard | Top Streaks widget |

---

## 3. Struktur Layout

### 3.1 Global Shell

```txt
body
└── AppShell
    ├── Sidebar / left navigation
    └── MainContent
        ├── TopAppBar
        └── CommunityPageContent
            ├── CommunityHero
            ├── MainGrid
            │   ├── LeftColumn
            │   │   ├── ActiveChallenges
            │   │   └── CommunityFeed
            │   └── RightColumn
            │       ├── LeaderboardWidget
            │       ├── SuggestedBuddies
            │       └── CommunityWisdomCard
            └── FloatingActionButton
```

### 3.2 Main Content

HTML asli memakai:

```html
<main id="mainContent" class="flex-1 xl:ml-64 p-gutter-desktop max-w-[1200px] mx-auto w-full">
```

Rekomendasi React + Tailwind:

```tsx
<main
  id="mainContent"
  className={cn(
    "flex-1 w-full max-w-[1200px] mx-auto p-gutter-desktop transition-[margin,width] duration-200",
    "xl:ml-64",
    isSidebarCollapsed && "xl:ml-[72px]",
    isSidebarHidden && "xl:ml-0 max-w-full"
  )}
>
  <TopAppBar />
  <CommunityContent />
</main>
```

Catatan:
- `max-w-[1200px]` membuat halaman tidak terlalu melebar.
- Konten dalam `.p-8 max-w-[1400px] mx-auto` pada HTML memberi ruang ekstra. Untuk konsistensi React, pilih salah satu:
  - Main max width `1200px`, content full.
  - Atau main full width dan content max `1400px`.

Rekomendasi final:
```tsx
<main className="xl:ml-64 p-gutter-desktop w-full">
  <div className="max-w-[1400px] mx-auto space-y-section-gap">
    ...
  </div>
</main>
```

---

## 4. Design Tokens

### 4.1 Color Palette

Gunakan token warna yang sama dengan halaman dashboard agar semua page konsisten.

```js
colors: {
  "primary": "#006e2f",
  "primary-container": "#22c55e",
  "on-primary": "#ffffff",
  "on-primary-container": "#004b1e",

  "secondary": "#0058be",
  "secondary-container": "#2170e4",
  "on-secondary-container": "#fefcff",

  "tertiary": "#9e4036",
  "tertiary-container": "#ff8b7c",

  "achievement-purple": "#a855f7",
  "energy-orange": "#f97316",
  "warning-yellow": "#eab308",

  "background": "#f8f9ff",
  "surface": "#f8f9ff",
  "surface-container": "#e5eeff",
  "surface-container-low": "#eff4ff",
  "surface-container-high": "#dce9ff",
  "surface-container-highest": "#d3e4fe",
  "surface-variant": "#d3e4fe",

  "on-surface": "#0b1c30",
  "on-surface-variant": "#3d4a3d",

  "outline": "#6d7b6c",
  "outline-variant": "#bccbb9",

  "mint-surface": "#f0fdf4",
  "inverse-surface": "#213145",
  "inverse-on-surface": "#eaf1ff",
  "error-red": "#ef4444"
}
```

### 4.2 Semantic Usage

| Token | Dipakai Untuk |
|---|---|
| `primary` | CTA utama, brand, active nav, icon utama |
| `primary-container` | active menu, avatar/add button, soft CTA background |
| `achievement-purple` | badge achievement, challenge high impact, gradient quote |
| `energy-orange` | hot challenge, fire/streak, gradient quote |
| `warning-yellow` | trophy leaderboard |
| `mint-surface` | top rank leaderboard, health/positive area |
| `surface-container-low` | sidebar background |
| `surface-container` | search input, neutral hover |
| `outline-variant` | border halus card dan divider |

### 4.3 Gradient

#### Achievement Gradient

```css
.achievement-gradient {
  background: linear-gradient(135deg, #a855f7 0%, #f97316 100%);
}
```

Implementasi Tailwind langsung:

```tsx
className="bg-gradient-to-br from-achievement-purple to-energy-orange"
```

#### Hero Visual Gradient

```tsx
className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10"
```

#### Upgrade Card Gradient

```tsx
className="bg-gradient-to-br from-secondary-container/10 to-secondary/20"
```

---

## 5. Typography

### 5.1 Font Family

HTML memakai:

- `Poppins` untuk heading.
- `Nunito` untuk body.
- `Inter` untuk label.
- `JetBrains Mono` untuk angka/ranking.

Konfigurasi Tailwind:

```js
fontFamily: {
  "body-lg": ["Nunito"],
  "body-md": ["Nunito"],
  "label-sm": ["Inter"],
  "label-md": ["Inter"],
  "headline-xl": ["Poppins"],
  "headline-lg": ["Poppins"],
  "headline-md": ["Poppins"],
  "metrics-mono": ["JetBrains Mono"]
}
```

### 5.2 Font Size

```js
fontSize: {
  "body-lg": ["18px", { lineHeight: "1.6", fontWeight: "400" }],
  "body-md": ["16px", { lineHeight: "1.5", fontWeight: "400" }],
  "label-sm": ["12px", { lineHeight: "1.4", letterSpacing: "0.05em", fontWeight: "600" }],
  "label-md": ["14px", { lineHeight: "1.4", letterSpacing: "0.01em", fontWeight: "500" }],
  "headline-md": ["24px", { lineHeight: "1.3", fontWeight: "600" }],
  "headline-lg": ["32px", { lineHeight: "1.25", fontWeight: "600" }],
  "headline-xl": ["48px", { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "700" }],
  "metrics-mono": ["16px", { lineHeight: "1", fontWeight: "500" }]
}
```

### 5.3 Pemakaian Typography

| Elemen | Class |
|---|---|
| Hero title | `font-headline-xl text-headline-xl leading-tight` |
| Section title | `font-headline-md text-headline-md` |
| Card title | `font-headline-md text-headline-md` |
| Body text | `font-body-md text-on-surface` |
| Meta text | `text-[11px] font-bold uppercase tracking-wider` |
| Badge | `text-[10px] font-bold uppercase tracking-widest` |
| Ranking number | `font-metrics-mono text-xl font-bold` |

---

## 6. Spacing, Radius, Shadow

### 6.1 Spacing Tokens

```js
spacing: {
  "unit": "4px",
  "gutter-mobile": "16px",
  "gutter-desktop": "24px",
  "section-gap": "32px",
  "card-padding": "20px",
  "margin-page": "24px"
}
```

### 6.2 Radius

| Elemen | Radius |
|---|---|
| Sidebar nav item | `rounded-xl` |
| Hero card | `rounded-[2.5rem]` |
| Challenge card | `rounded-[2rem]` |
| Challenge image | `rounded-2xl` |
| Feed post | `rounded-[2rem]` |
| Avatar | `rounded-full` |
| FAB | `rounded-full` |

### 6.3 Shadow

#### Glass Card

```css
.glass-card {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(226, 232, 240, 0.5);
  box-shadow: 0 10px 25px -5px rgba(0, 110, 47, 0.05);
}
```

Tailwind utility recommended:

```tsx
className="bg-white/80 backdrop-blur-xl border border-slate-200/50 shadow-[0_10px_25px_-5px_rgba(0,110,47,0.05)]"
```

---

## 7. App Shell

### 7.1 Sidebar

Sidebar sama dengan halaman dashboard/logfood/mealplanner/progress.

#### Struktur

```tsx
<aside
  id="sidebar"
  role="navigation"
  aria-label="Primary navigation"
  className={cn(
    "h-screen w-64 fixed left-0 top-0 z-50",
    "bg-surface-container-low border-r border-outline-variant/20 shadow-md",
    "flex flex-col py-margin-page px-4",
    "hidden xl:flex",
    "transition-[width,transform] duration-200 ease-out",
    collapsed && "w-[72px]",
    hidden && "-translate-x-[110%] !w-0"
  )}
>
  <SidebarBrand />
  <SidebarNav active="community" />
  <SidebarFooter />
</aside>
```

#### Active Menu Community

```tsx
<a
  href="/community"
  aria-current="page"
  className="flex items-center gap-3 px-4 py-3 bg-primary-container text-on-primary-container rounded-xl font-bold shadow-sm"
>
  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
    group
  </span>
  <span className="font-label-md text-label-md nav-label">Community</span>
</a>
```

### 7.2 Sidebar Collapse Behavior

State:

```tsx
const [collapsed, setCollapsed] = useState(false);
const [hidden, setHidden] = useState(false);
```

Behavior:
- Collapse mengubah width `256px` menjadi `72px`.
- Label nav hilang.
- Logo text hilang.
- Main content margin berubah.
- Hidden menggeser sidebar ke kiri.

CSS helper:

```css
.sidebar-collapsed .nav-label,
.sidebar-collapsed .logo-text {
  opacity: 0;
  width: 0;
  display: none;
}
```

### 7.3 Top App Bar

Top bar:

```tsx
<header className="sticky top-0 z-40 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/30 px-gutter-desktop h-16 flex items-center justify-between">
  <div>
    <h2 className="font-headline-md text-headline-md font-bold text-primary">Community Hub</h2>
    <p className="text-label-md text-on-surface-variant/60">Tuesday, October 24</p>
  </div>

  <div className="flex items-center gap-6">
    <SearchInput placeholder="Search buddies or challenges..." />
    <IconButton icon="notifications" href="/notifikasi" />
    <IconButton icon="settings" href="/pengaturan" />
    <ProfileShortcut />
  </div>
</header>
```

Rekomendasi perbaikan:
- Untuk mobile, top app bar perlu tombol hamburger karena sidebar disembunyikan di bawah `xl`.
- Tambahkan `aria-label` untuk search.
- Gunakan tanggal dinamis dari app state.

---

## 8. Hero Section — CommunityHero

### 8.1 Visual

Hero memakai glass card besar dengan background hijau halus:

```tsx
<section className="glass-card rounded-[2.5rem] p-10 relative overflow-hidden bg-primary/5">
```

Struktur:
- Kiri: headline, body, CTA.
- Kanan: icon komunitas dalam glass visual card.

### 8.2 Headline

```tsx
<h2 className="font-headline-xl text-headline-xl text-on-surface leading-tight">
  Connect with the <span className="text-primary">NutriTrack</span> Tribe
</h2>
```

Dalam versi Bahasa Indonesia untuk project lokal:

```tsx
<h2 className="font-headline-xl text-headline-xl text-on-surface leading-tight">
  Terhubung dengan <span className="text-primary">Komunitas NutriTrack</span>
</h2>
```

### 8.3 CTA Buttons

#### Primary CTA

```tsx
<button className="bg-primary text-on-primary px-8 py-3 rounded-xl font-bold text-label-md flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20">
  <span className="material-symbols-outlined">person_add</span>
  Find Buddies
</button>
```

#### Secondary CTA

```tsx
<button className="bg-white border border-outline-variant/30 text-on-surface px-8 py-3 rounded-xl font-bold text-label-md flex items-center gap-2 hover:bg-surface-container transition-all">
  <span className="material-symbols-outlined">explore</span>
  Global Feed
</button>
```

### 8.4 Hero Visual Card

```tsx
<div className="w-full md:w-1/3 aspect-square glass-card rounded-[2rem] flex items-center justify-center p-8 overflow-hidden relative group">
  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10" />
  <span className="material-symbols-outlined text-[120px] text-primary opacity-20 group-hover:scale-110 transition-transform">
    diversity_3
  </span>
</div>
```

Fungsi UX:
- Memberi identitas sosial.
- Menjaga halaman tetap ringan tanpa memuat gambar hero besar.
- Hover scale memberi kesan interaktif.

---

## 9. Active Health Challenges

### 9.1 Section Header

```tsx
<div className="flex justify-between items-center mb-6">
  <h3 className="font-headline-md text-headline-md text-on-surface">
    Active Health Challenges
  </h3>
  <a className="text-primary font-bold text-label-md hover:underline" href="#">
    View All
  </a>
</div>
```

Rekomendasi Bahasa Indonesia:
- `Tantangan Kesehatan Aktif`
- `Lihat Semua`

### 9.2 Grid

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  <ChallengeCard />
  <ChallengeCard />
</div>
```

### 9.3 Challenge Card Component

```tsx
type ChallengeCardProps = {
  title: string;
  description: string;
  imageUrl?: string;
  icon?: string;
  badge: string;
  badgeColor: "orange" | "purple";
  participantsLabel: string;
};
```

#### Card with Image

```tsx
<article className="glass-card rounded-[2rem] p-6 group hover:-translate-y-1 transition-all cursor-pointer">
  <div className="h-44 rounded-2xl mb-6 overflow-hidden relative">
    <img
      alt={title}
      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
      src={imageUrl}
    />
    <div className="absolute top-4 left-4 bg-energy-orange text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
      Hot
    </div>
  </div>

  <h4 className="font-headline-md text-headline-md text-on-surface mb-2">
    {title}
  </h4>

  <p className="text-on-surface-variant font-body-md mb-6 line-clamp-2">
    {description}
  </p>

  <div className="flex justify-between items-center">
    <AvatarStack countLabel="+1.2k" />
    <button className="bg-primary-container/20 text-on-primary-container px-5 py-2 rounded-xl font-bold text-label-sm hover:bg-primary hover:text-white transition-all">
      Join Challenge
    </button>
  </div>
</article>
```

#### Card with Icon Illustration

```tsx
<div className="h-44 rounded-2xl mb-6 overflow-hidden relative bg-mint-surface flex flex-col items-center justify-center">
  <span className="material-symbols-outlined text-[64px] text-primary opacity-20 group-hover:scale-110 transition-transform">
    nutrition
  </span>
  <div className="absolute top-4 left-4 bg-achievement-purple text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
    High Impact
  </div>
</div>
```

### 9.4 Avatar Stack

```tsx
<div className="flex -space-x-3">
  <img className="w-8 h-8 rounded-full border-2 border-white" src={avatar} alt="participant" />
  <div className="w-8 h-8 rounded-full border-2 border-white bg-surface-container-high flex items-center justify-center text-[10px] font-bold">
    +1.2k
  </div>
</div>
```

---

## 10. Community Feed

### 10.1 Feed Post Structure

Feed post adalah elemen sosial utama.

```tsx
<article className="glass-card rounded-[2rem] p-8 hover:shadow-xl transition-all stagger-item">
  <PostHeader />
  <PostContent />
  <PostImage />
  <PostActions />
</article>
```

### 10.2 Post Header

```tsx
<div className="flex items-center justify-between mb-6">
  <div className="flex items-center gap-4">
    <img
      alt="Sarah Jenkins"
      className="w-12 h-12 rounded-full object-cover border-2 border-primary-container/30"
      src={avatarUrl}
    />
    <div>
      <h5 className="font-bold text-on-surface">Sarah Jenkins</h5>
      <p className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">
        2 hours ago • <span className="text-achievement-purple">Sugar-Free Finisher</span>
      </p>
    </div>
  </div>

  <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface-variant transition-colors">
    <span className="material-symbols-outlined">more_horiz</span>
  </button>
</div>
```

### 10.3 Post Body

```tsx
<p className="font-body-md text-on-surface mb-6 leading-relaxed">
  Just finished my 30-day streak! I've never felt more energetic...
</p>
```

Rekomendasi:
- Batasi konten panjang dengan `line-clamp` pada feed list.
- Buka modal/detail untuk komentar lengkap.
- Untuk PWA, simpan draft post di IndexedDB/localStorage.

### 10.4 Post Image

```tsx
<div className="rounded-2xl overflow-hidden mb-6 h-72 border border-outline-variant/10 shadow-sm">
  <img alt="Meal Prep" className="w-full h-full object-cover" src={imageUrl} />
</div>
```

Rekomendasi:
- Gunakan `loading="lazy"`.
- Gunakan skeleton loading.
- Compress image untuk PWA.

### 10.5 Post Actions

```tsx
<div className="flex items-center gap-8 pt-4 border-t border-outline-variant/20">
  <button className="flex items-center gap-2 font-bold text-label-sm text-primary transition-all hover:scale-105 active:scale-95">
    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
      favorite
    </span>
    124 Cheers
  </button>

  <button className="flex items-center gap-2 font-bold text-label-sm text-on-surface-variant transition-all hover:text-primary hover:scale-105 active:scale-95">
    <span className="material-symbols-outlined">mode_comment</span>
    18 Comments
  </button>

  <button className="flex items-center gap-2 font-bold text-label-sm text-on-surface-variant ml-auto hover:text-primary transition-colors">
    <span className="material-symbols-outlined">share</span>
  </button>
</div>
```

Interaction:
- Cheers: optimistic UI increment.
- Comment: buka drawer/modal.
- Share: gunakan Web Share API bila tersedia.

---

## 11. Right Column Widgets

### 11.1 Layout

```tsx
<aside className="lg:col-span-4 space-y-section-gap">
  <LeaderboardWidget />
  <SuggestedBuddies />
  <CommunityWisdomCard />
</aside>
```

---

## 12. Leaderboard Widget — Top Streaks

### 12.1 Container

```tsx
<section className="glass-card rounded-[2rem] p-8">
  ...
</section>
```

### 12.2 Header

```tsx
<div className="flex items-center justify-between mb-8">
  <h3 className="font-headline-md text-headline-md text-on-surface">Top Streaks</h3>
  <span
    className="material-symbols-outlined text-warning-yellow"
    style={{ fontVariationSettings: "'FILL' 1" }}
  >
    emoji_events
  </span>
</div>
```

### 12.3 Rank Item

```tsx
<div className="flex items-center gap-4 p-4 rounded-[1.25rem] bg-mint-surface border border-primary/20 shadow-sm transition-transform hover:scale-[1.02] cursor-default">
  <div className="font-metrics-mono text-primary font-bold text-xl w-6">01</div>
  <img className="w-12 h-12 rounded-full object-cover border-2 border-primary" src={avatarUrl} alt={name} />
  <div className="flex-1">
    <p className="font-bold text-on-surface">Elena Vance</p>
    <p className="text-[11px] font-bold text-on-surface-variant/60 uppercase tracking-wider">42 Days</p>
  </div>
  <div className="text-primary">
    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
      local_fire_department
    </span>
  </div>
</div>
```

### 12.4 Leaderboard Data Model

```ts
type LeaderboardUser = {
  id: string;
  rank: number;
  name: string;
  avatarUrl: string;
  streakDays: number;
  isTopRank?: boolean;
};
```

---

## 13. Suggested Buddies

### 13.1 Container

```tsx
<section className="glass-card rounded-[2rem] p-8">
  <h3 className="font-headline-md text-headline-md text-on-surface mb-8">
    Suggested Buddies
  </h3>
  <div className="space-y-8">
    <BuddySuggestion />
  </div>
</section>
```

### 13.2 Buddy Item

```tsx
<div className="flex items-center gap-4">
  <img
    alt={name}
    className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm"
    src={avatarUrl}
  />

  <div className="flex-1">
    <p className="font-bold text-on-surface">{name}</p>
    <p className="text-[11px] font-bold text-primary uppercase tracking-wider">
      {matchPercent}% Match • {focus}
    </p>
  </div>

  <button className="w-10 h-10 rounded-full bg-primary-container text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-transform shadow-md">
    <span className="material-symbols-outlined">add</span>
  </button>
</div>
```

### 13.3 Buddy Data Model

```ts
type BuddySuggestion = {
  id: string;
  name: string;
  avatarUrl: string;
  matchPercent: number;
  focus: string;
};
```

---

## 14. Motivation Quote Card

### 14.1 Visual

```tsx
<section className="bg-gradient-to-br from-achievement-purple to-energy-orange rounded-[2rem] p-8 text-white relative overflow-hidden shadow-xl transition-transform hover:scale-[1.01]">
  <div className="absolute -top-10 -right-10 opacity-20">
    <span className="material-symbols-outlined text-[160px]">format_quote</span>
  </div>

  <div className="relative z-10">
    <span className="material-symbols-outlined text-4xl mb-4">tips_and_updates</span>
    <p className="font-headline-md text-headline-md leading-snug mb-8 italic">
      "Alone we track, together we transform..."
    </p>
    <div className="flex items-center gap-3">
      <div className="w-10 h-1 rounded-full bg-white/40" />
      <p className="text-[10px] font-bold uppercase tracking-widest">Community Wisdom</p>
    </div>
  </div>
</section>
```

Fungsi:
- Mengakhiri right sidebar dengan elemen emosional.
- Menyamakan gaya dengan quote card di dashboard.

---

## 15. Contextual FAB

### 15.1 Visual

```tsx
<button className="fixed bottom-8 right-8 w-16 h-16 bg-primary text-on-primary rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 group">
  <span className="material-symbols-outlined text-4xl">add</span>
  <span className="absolute right-full mr-4 px-4 py-2 bg-inverse-surface text-white rounded-xl text-label-md font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg">
    New Story
  </span>
</button>
```

Rekomendasi behavior:
- Klik membuka `CreateStoryModal`.
- Tooltip muncul saat hover desktop.
- Pada mobile, tooltip bisa dihilangkan.

```tsx
const handleFabClick = () => setCreateStoryOpen(true);
```

---

## 16. Animasi & Micro Interaction

### 16.1 Fade In Stagger

HTML asli:

```css
.stagger-item {
  opacity: 0;
  transform: translateY(10px);
  animation: fadeIn 0.5s ease forwards;
}

@keyframes fadeIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

React recommended:

```tsx
className="opacity-0 translate-y-3 animate-[communityFadeIn_0.5s_ease_forwards]"
```

Tailwind config:

```js
keyframes: {
  communityFadeIn: {
    "0%": { opacity: "0", transform: "translateY(10px)" },
    "100%": { opacity: "1", transform: "translateY(0)" }
  }
},
animation: {
  "community-fade-in": "communityFadeIn 0.5s ease forwards"
}
```

### 16.2 Card Lift

HTML memakai JS yang mengubah `style.transform`. Untuk React/Tailwind, hindari direct DOM manipulation.

Gunakan:

```tsx
className="transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
```

### 16.3 Challenge Image Zoom

```tsx
className="group-hover:scale-110 transition-transform duration-700"
```

### 16.4 Button Interaction

```tsx
className="hover:scale-105 active:scale-95 transition-all"
```

### 16.5 Sidebar Animation

```tsx
className="transition-[width,transform] duration-[220ms] ease-out"
```

### 16.6 FAB Tooltip

```tsx
className="opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
```

---

## 17. React Component Architecture

### 17.1 Folder Structure

```txt
src/
├── app/
│   ├── App.tsx
│   └── routes.tsx
├── components/
│   ├── app-shell/
│   │   ├── AppShell.tsx
│   │   ├── Sidebar.tsx
│   │   ├── SidebarNavItem.tsx
│   │   ├── TopAppBar.tsx
│   │   └── ProfileShortcut.tsx
│   ├── community/
│   │   ├── CommunityHero.tsx
│   │   ├── ChallengeCard.tsx
│   │   ├── ChallengeGrid.tsx
│   │   ├── FeedPostCard.tsx
│   │   ├── FeedActions.tsx
│   │   ├── LeaderboardWidget.tsx
│   │   ├── SuggestedBuddies.tsx
│   │   ├── CommunityQuoteCard.tsx
│   │   ├── CreateStoryModal.tsx
│   │   └── CommunityFab.tsx
│   └── ui/
│       ├── GlassCard.tsx
│       ├── IconButton.tsx
│       ├── AvatarStack.tsx
│       └── Badge.tsx
├── data/
│   └── community.mock.ts
├── hooks/
│   └── useSidebar.ts
└── styles/
    └── globals.css
```

### 17.2 Page Component

```tsx
export default function CommunityPage() {
  return (
    <AppShell activePage="community">
      <div className="p-8 max-w-[1400px] mx-auto space-y-section-gap">
        <CommunityHero />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-section-gap">
            <ChallengeGrid />
            <CommunityFeed />
          </div>

          <div className="lg:col-span-4 space-y-section-gap">
            <LeaderboardWidget />
            <SuggestedBuddies />
            <CommunityQuoteCard />
          </div>
        </div>
      </div>

      <CommunityFab />
    </AppShell>
  );
}
```

---

## 18. Mock Data

### 18.1 Challenge Data

```ts
export const challenges = [
  {
    id: "keto-sprint",
    title: "7-Day Keto Sprint",
    description:
      "Reset your metabolism with our high-fat, low-carb foundation challenge. Expert curated meal plan included.",
    badge: "Hot",
    badgeTone: "orange",
    imageUrl: "/images/community/keto-sprint.webp",
    participantsLabel: "+1.2k",
    ctaLabel: "Join Challenge"
  },
  {
    id: "sugar-free-week",
    title: "Sugar-Free Week",
    description:
      "Break the cycle of sugar dependency. 7 days of natural energy and clear focus.",
    badge: "High Impact",
    badgeTone: "purple",
    icon: "nutrition",
    participantsLabel: "+3k",
    ctaLabel: "Join Challenge"
  }
];
```

### 18.2 Feed Data

```ts
export const feedPosts = [
  {
    id: "post-1",
    author: {
      name: "Sarah Jenkins",
      avatarUrl: "/images/community/sarah.webp",
      badge: "Sugar-Free Finisher"
    },
    createdAtLabel: "2 hours ago",
    content:
      "Just finished my 30-day streak! I've never felt more energetic. Dropped 5 lbs but the mental clarity is the real trophy.",
    imageUrl: "/images/community/meal-prep.webp",
    cheers: 124,
    comments: 18
  }
];
```

### 18.3 Leaderboard Data

```ts
export const leaderboard = [
  {
    id: "elena",
    rank: 1,
    name: "Elena Vance",
    streakDays: 42,
    avatarUrl: "/images/community/elena.webp",
    isTopRank: true
  },
  {
    id: "david",
    rank: 2,
    name: "David Chen",
    streakDays: 38,
    avatarUrl: "/images/community/david.webp"
  },
  {
    id: "maria",
    rank: 3,
    name: "Maria Rossi",
    streakDays: 35,
    avatarUrl: "/images/community/maria.webp"
  }
];
```

### 18.4 Suggested Buddies Data

```ts
export const suggestedBuddies = [
  {
    id: "sophie",
    name: "Sophie Morel",
    avatarUrl: "/images/community/sophie.webp",
    matchPercent: 92,
    focus: "Vegan Focus"
  },
  {
    id: "james",
    name: "James Wilson",
    avatarUrl: "/images/community/james.webp",
    matchPercent: 88,
    focus: "Keto Pro"
  }
];
```

---

## 19. Tailwind Config Recommended

```js
// tailwind.config.js
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#006e2f",
        "primary-container": "#22c55e",
        "on-primary": "#ffffff",
        "on-primary-container": "#004b1e",
        secondary: "#0058be",
        "secondary-container": "#2170e4",
        "on-secondary-container": "#fefcff",
        "achievement-purple": "#a855f7",
        "energy-orange": "#f97316",
        "warning-yellow": "#eab308",
        background: "#f8f9ff",
        surface: "#f8f9ff",
        "surface-container": "#e5eeff",
        "surface-container-low": "#eff4ff",
        "surface-container-high": "#dce9ff",
        "surface-container-highest": "#d3e4fe",
        "surface-variant": "#d3e4fe",
        "on-surface": "#0b1c30",
        "on-surface-variant": "#3d4a3d",
        "outline-variant": "#bccbb9",
        "mint-surface": "#f0fdf4",
        "inverse-surface": "#213145",
        "inverse-on-surface": "#eaf1ff",
        "error-red": "#ef4444"
      },
      spacing: {
        unit: "4px",
        "gutter-mobile": "16px",
        "gutter-desktop": "24px",
        "section-gap": "32px",
        "card-padding": "20px",
        "margin-page": "24px"
      },
      fontFamily: {
        "body-lg": ["Nunito", "sans-serif"],
        "body-md": ["Nunito", "sans-serif"],
        "label-sm": ["Inter", "sans-serif"],
        "label-md": ["Inter", "sans-serif"],
        "headline-xl": ["Poppins", "sans-serif"],
        "headline-lg": ["Poppins", "sans-serif"],
        "headline-md": ["Poppins", "sans-serif"],
        "metrics-mono": ["JetBrains Mono", "monospace"]
      },
      fontSize: {
        "body-lg": ["18px", { lineHeight: "1.6", fontWeight: "400" }],
        "body-md": ["16px", { lineHeight: "1.5", fontWeight: "400" }],
        "label-sm": ["12px", { lineHeight: "1.4", letterSpacing: "0.05em", fontWeight: "600" }],
        "label-md": ["14px", { lineHeight: "1.4", letterSpacing: "0.01em", fontWeight: "500" }],
        "headline-md": ["24px", { lineHeight: "1.3", fontWeight: "600" }],
        "headline-lg": ["32px", { lineHeight: "1.25", fontWeight: "600" }],
        "headline-xl": ["48px", { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "700" }],
        "metrics-mono": ["16px", { lineHeight: "1", fontWeight: "500" }]
      },
      keyframes: {
        communityFadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        }
      },
      animation: {
        "community-fade-in": "communityFadeIn 0.5s ease forwards"
      }
    }
  },
  plugins: []
};
```

---

## 20. Global CSS

```css
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Nunito:wght@400;600;700&family=Poppins:wght@600;700;800;900&family=JetBrains+Mono:wght@500&display=swap");

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .glass-card {
    @apply bg-white/80 backdrop-blur-xl border border-slate-200/50 shadow-[0_10px_25px_-5px_rgba(0,110,47,0.05)];
  }

  .achievement-gradient {
    @apply bg-gradient-to-br from-achievement-purple to-energy-orange;
  }

  .icon-filled {
    font-variation-settings: "FILL" 1, "wght" 400, "GRAD" 0, "opsz" 24;
  }

  .icon-outline {
    font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24;
  }
}
```

---

## 21. PWA Considerations

### 21.1 Offline Strategy

Untuk halaman community:
- Cache shell UI.
- Cache avatar dan challenge image secara runtime.
- Feed data bisa disimpan sementara di IndexedDB.
- Saat offline, tampilkan banner: `You are offline. Drafts will be posted when connection returns.`

### 21.2 Vite PWA Config

```ts
VitePWA({
  registerType: "autoUpdate",
  includeAssets: ["favicon.svg", "apple-touch-icon.png"],
  manifest: {
    name: "NutriTrack",
    short_name: "NutriTrack",
    description: "Nutrition tracking and community health companion",
    theme_color: "#006e2f",
    background_color: "#f8f9ff",
    display: "standalone",
    start_url: "/dashboard",
    icons: [
      {
        src: "/pwa-192x192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "/pwa-512x512.png",
        sizes: "512x512",
        type: "image/png"
      }
    ]
  },
  workbox: {
    runtimeCaching: [
      {
        urlPattern: ({ request }) => request.destination === "image",
        handler: "CacheFirst",
        options: {
          cacheName: "community-images",
          expiration: {
            maxEntries: 80,
            maxAgeSeconds: 60 * 60 * 24 * 14
          }
        }
      }
    ]
  }
});
```

---

## 22. Accessibility Checklist

| Elemen | Rekomendasi |
|---|---|
| Sidebar | `role="navigation"`, `aria-label="Primary navigation"` |
| Active page | `aria-current="page"` |
| Search | `aria-label="Search buddies or challenges"` |
| Challenge card | Gunakan `<article>` dan heading semantic |
| Feed post | Gunakan `<article>` |
| More button | `aria-label="Open post options"` |
| Cheers button | `aria-pressed` jika liked |
| FAB | `aria-label="Create new community story"` |
| Avatar | Alt jelas, contoh `Sarah Jenkins avatar` |
| Decorative icon | Tambahkan `aria-hidden="true"` bila hanya dekoratif |

---

## 23. Responsive Design

### 23.1 Breakpoint Behavior

| Breakpoint | Layout |
|---|---|
| `< 768px` | Single column, hero text center/left adaptive, challenge 1 kolom |
| `md >= 768px` | Hero split, challenge 2 kolom |
| `lg >= 1024px` | Main grid 8/4 |
| `xl >= 1280px` | Sidebar desktop muncul |

### 23.2 Mobile Improvements

HTML asli belum menyediakan tombol mobile menu pada top app bar. Untuk React PWA, tambahkan:

```tsx
<button
  className="xl:hidden w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface-variant"
  onClick={openMobileSidebar}
  aria-label="Open menu"
>
  <span className="material-symbols-outlined">menu</span>
</button>
```

Mobile drawer overlay:

```tsx
<div
  className={cn(
    "fixed inset-0 bg-slate-950/50 z-40 xl:hidden",
    mobileOpen ? "block" : "hidden"
  )}
  onClick={closeMobileSidebar}
/>
```

---

## 24. State & Interaction Design

### 24.1 Join Challenge

```tsx
const joinChallenge = async (challengeId: string) => {
  setJoinedChallenges((prev) => new Set(prev).add(challengeId));

  try {
    await api.joinChallenge(challengeId);
  } catch {
    rollback();
    toast.error("Gagal join challenge.");
  }
};
```

### 24.2 Cheer Post

```tsx
const toggleCheer = (postId: string) => {
  setPosts((posts) =>
    posts.map((post) =>
      post.id === postId
        ? {
            ...post,
            cheered: !post.cheered,
            cheers: post.cheered ? post.cheers - 1 : post.cheers + 1
          }
        : post
    )
  );
};
```

### 24.3 Add Buddy

```tsx
const addBuddy = async (buddyId: string) => {
  setPendingBuddyIds((ids) => [...ids, buddyId]);
  await api.sendBuddyRequest(buddyId);
};
```

### 24.4 Create Story Modal

Flow:
1. User klik FAB.
2. Modal muncul.
3. User input cerita, upload foto, pilih badge/progress.
4. Submit.
5. Optimistic post muncul di feed.
6. Jika offline, simpan sebagai draft.

---

## 25. Data Model Backend Ready

### 25.1 Challenge

```ts
type Challenge = {
  id: string;
  title: string;
  description: string;
  badge: string;
  badgeTone: "orange" | "purple" | "primary";
  imageUrl?: string;
  icon?: string;
  participantCount: number;
  joined: boolean;
};
```

### 25.2 CommunityPost

```ts
type CommunityPost = {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatarUrl: string;
  authorBadge?: string;
  content: string;
  imageUrl?: string;
  cheers: number;
  comments: number;
  cheeredByMe: boolean;
  createdAt: string;
};
```

### 25.3 Buddy

```ts
type Buddy = {
  id: string;
  name: string;
  avatarUrl: string;
  matchPercent: number;
  focus: string;
  requestStatus: "none" | "pending" | "accepted";
};
```

### 25.4 LeaderboardEntry

```ts
type LeaderboardEntry = {
  id: string;
  rank: number;
  userId: string;
  name: string;
  avatarUrl: string;
  streakDays: number;
};
```

---

## 26. Implementation Priority

### P1 — Wajib

- App shell konsisten.
- Sidebar active Community.
- Top app bar responsive.
- Hero section.
- Challenge cards.
- Feed post card.
- Leaderboard.
- Suggested buddies.
- FAB create story.
- Glass card style global.
- Hover/tap interaction.

### P2 — Penting

- Join challenge state.
- Cheer/comment/share interactivity.
- Create story modal.
- Mobile sidebar drawer.
- Skeleton loading feed.
- Toast notification.
- Optimistic UI.

### P3 — Enhancement

- Infinite scroll feed.
- Challenge detail page.
- Buddy matching algorithm.
- Web Share API.
- Offline draft sync.
- Image upload compression.
- Push notification untuk challenge/buddy.

---

## 27. Potensi Masalah dari HTML Asli

### 27.1 DOM Manipulation Manual

HTML memakai JavaScript:

```js
document.querySelectorAll('.glass-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-4px)';
  });
});
```

Di React, lebih baik gunakan class Tailwind:

```tsx
className="transition-all duration-300 hover:-translate-y-1"
```

Manfaat:
- Lebih declarative.
- Tidak perlu cleanup event listener.
- Tidak bentrok dengan React rendering.

### 27.2 Stagger Animation Kurang Efektif

HTML sudah memberi `.stagger-item` dengan `animation`, tetapi IntersectionObserver hanya menambahkan `opacity-100`, sedangkan class awal sudah menjalankan animasi otomatis. Di React, lebih konsisten:

```tsx
className="opacity-0 animate-community-fade-in"
style={{ animationDelay: `${index * 80}ms` }}
```

### 27.3 Mobile Sidebar Belum Lengkap

CSS menyediakan `.mobile-open`, tetapi tidak ada tombol `mobileMenuBtn` pada markup. Tambahkan hamburger di TopAppBar.

### 27.4 Semua Data Masih Static

Untuk produksi:
- Challenge data dari API.
- Feed dari backend realtime atau pagination.
- Avatar dan image dari storage/CDN.
- Leaderboard dihitung dari streak user.
- Suggested buddies dihitung dari interest/diet/goal similarity.

---

## 28. Visual Quality Recommendations

### 28.1 Card

Gunakan pola konsisten:

```tsx
className="glass-card rounded-[2rem] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
```

### 28.2 Image

Gunakan:

```tsx
className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
```

Tambahkan:
- `loading="lazy"`
- `decoding="async"`

### 28.3 Avatar

```tsx
className="rounded-full object-cover border-2 border-white shadow-sm"
```

### 28.4 Badge

```tsx
className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest"
```

---

## 29. Example Final Component Composition

```tsx
export function CommunityPage() {
  return (
    <AppShell activePage="community">
      <main className="p-8 max-w-[1400px] mx-auto space-y-section-gap">
        <CommunityHero />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <section className="lg:col-span-8 space-y-section-gap">
            <ChallengeGrid challenges={challenges} />
            <CommunityFeed posts={feedPosts} />
          </section>

          <aside className="lg:col-span-4 space-y-section-gap">
            <LeaderboardWidget entries={leaderboard} />
            <SuggestedBuddies buddies={suggestedBuddies} />
            <CommunityQuoteCard />
          </aside>
        </div>
      </main>

      <CommunityFab />
    </AppShell>
  );
}
```

---

## 30. Kesimpulan Implementasi

Halaman `community.html` sudah punya arah UI yang kuat untuk fitur sosial NutriTrack. Elemen terbaik yang harus dipertahankan:

- Hero komunitas dengan CTA kuat.
- Challenge card dengan badge dan avatar stack.
- Feed post bergaya social media.
- Right sidebar dengan leaderboard dan buddy suggestion.
- Gradient quote card sebagai emotional reinforcement.
- FAB `New Story`.

Untuk konversi ke React PWA, prioritas paling penting adalah:
1. Memecah HTML menjadi komponen reusable.
2. Menghapus DOM manipulation manual dan mengganti dengan Tailwind state/hover class.
3. Menambahkan mobile drawer nyata.
4. Menyiapkan data model untuk challenge, feed, buddy, dan leaderboard.
5. Menambahkan offline draft behavior agar cocok sebagai PWA.

Dengan struktur ini, halaman community bisa menjadi modul sosial yang scalable dan siap diintegrasikan dengan backend nanti.
