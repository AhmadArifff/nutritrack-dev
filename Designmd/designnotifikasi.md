# designnotifikasi.md — Spesifikasi Implementasi Halaman Notifications / Activity Hub NutriTrack

## 1. Ringkasan Tampilan

File `notifikasi.html` merepresentasikan halaman **Notifications** dengan pola utama berupa:

1. **Shared App Shell**
   - Sidebar kiri fixed desktop.
   - Top App Bar sticky.
   - Main content sebagai canvas latar dashboard ringan.
2. **Activity Hub Overlay**
   - Drawer notifikasi muncul dari sisi kanan.
   - Backdrop blur transparan menutup halaman.
   - Panel drawer berisi tab filter, daftar notifikasi per kategori, dan footer action.
3. **Notification System**
   - Kategori: Meal Reminders, Achievements, Weekly Reports, Community.
   - Tiap kategori memakai warna semantik berbeda.
   - Card memakai icon, waktu, pesan, dan CTA.
4. **Micro-interaction**
   - Drawer slide-in / slide-out.
   - Backdrop fade.
   - Button active scale.
   - Hover shadow pada card.
   - Hide scrollbar untuk area horizontal dan panel.

Target implementasi lokal: **React PWA + Tailwind CSS**, dengan komponen reusable agar dapat dipakai di seluruh halaman NutriTrack.

---

## 2. Identitas Visual Halaman

### Karakter UI

Halaman ini memakai gaya **wellness notification command center**:

- Bersih, ringan, dan data-oriented.
- Latar utama soft blue-white.
- Drawer putih solid agar konten notifikasi terbaca jelas.
- Warna hijau digunakan sebagai primary action.
- Warna ungu, biru, dan oranye dipakai sebagai semantic notification category.

### Fungsi UX

Halaman ini tidak hanya menampilkan notifikasi statis. Secara UX, desainnya berperan sebagai:

- **Activity Hub** untuk mengelola alert kesehatan.
- **Reminder Center** untuk meal log dan hidrasi.
- **Achievement Center** untuk badge dan milestone.
- **Report Center** untuk weekly analytics.
- **Community Alert Center** untuk aktivitas sosial.

---

## 3. Design Token

### 3.1 Warna Utama

Gunakan token warna yang konsisten dengan halaman lain.

```js
colors: {
  background: "#f8f9ff",
  surface: "#f8f9ff",
  "surface-container": "#e5eeff",
  "surface-container-low": "#eff4ff",
  "surface-container-high": "#dce9ff",
  "surface-container-lowest": "#ffffff",
  "surface-variant": "#d3e4fe",

  primary: "#006e2f",
  "primary-container": "#22c55e",
  "on-primary": "#ffffff",
  "on-primary-container": "#004b1e",

  secondary: "#0058be",
  "secondary-container": "#2170e4",
  "secondary-fixed": "#d8e2ff",

  "achievement-purple": "#a855f7",
  "energy-orange": "#f97316",
  "warning-yellow": "#eab308",
  "error-red": "#ef4444",

  "mint-surface": "#f0fdf4",

  "on-background": "#0b1c30",
  "on-surface": "#0b1c30",
  "on-surface-variant": "#3d4a3d",
  outline: "#6d7b6c",
  "outline-variant": "#bccbb9",

  "card-light": "#ffffff",
  "inverse-surface": "#213145",
  "inverse-on-surface": "#eaf1ff"
}
```

### 3.2 Warna Semantik Notifikasi

| Kategori | Warna Utama | Background | Fungsi |
|---|---:|---:|---|
| Meal Reminder | `primary #006e2f` | `mint-surface #f0fdf4` | pengingat makan / action log |
| Achievement | `achievement-purple #a855f7` | `surface-container-low #eff4ff` + glow ungu | badge dan pencapaian |
| Weekly Report | `secondary #0058be` | `secondary-fixed #d8e2ff` | laporan analitik |
| Community | `energy-orange #f97316` | white card | aktivitas sosial |
| Warning / Hot | `warning-yellow #eab308` | soft yellow/orange | prioritas tinggi |
| Error | `error-red #ef4444` | soft red | gagal / urgent |

### 3.3 Typography

```js
fontFamily: {
  "headline-xl": ["Poppins"],
  "headline-lg": ["Poppins"],
  "headline-md": ["Poppins"],
  "body-md": ["Nunito"],
  "body-lg": ["Nunito"],
  "label-sm": ["Inter"],
  "label-md": ["Inter"],
  "metrics-mono": ["JetBrains Mono"]
}
```

```js
fontSize: {
  "headline-xl": ["48px", { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "700" }],
  "headline-lg": ["32px", { lineHeight: "1.25", fontWeight: "600" }],
  "headline-md": ["24px", { lineHeight: "1.3", fontWeight: "600" }],
  "body-lg": ["18px", { lineHeight: "1.6", fontWeight: "400" }],
  "body-md": ["16px", { lineHeight: "1.5", fontWeight: "400" }],
  "label-md": ["14px", { lineHeight: "1.4", letterSpacing: "0.01em", fontWeight: "500" }],
  "label-sm": ["12px", { lineHeight: "1.4", letterSpacing: "0.05em", fontWeight: "600" }],
  "metrics-mono": ["16px", { lineHeight: "1", fontWeight: "500" }]
}
```

### 3.4 Spacing

```js
spacing: {
  "gutter-mobile": "16px",
  "gutter-desktop": "24px",
  "card-padding": "20px",
  "section-gap": "32px",
  "margin-page": "24px",
  "unit": "4px"
}
```

### 3.5 Radius

| Element | Radius |
|---|---:|
| Sidebar item | `rounded-xl` |
| Main card | `rounded-3xl` |
| Drawer panel | tanpa radius sisi kanan, full-height |
| Notification card | `rounded-2xl` |
| Icon tile | `rounded-xl` |
| Filter tab | `rounded-full` |
| FAB | `rounded-full` |

---

## 4. Struktur Layout

### 4.1 Layout Global

```txt
AppShell
├── Sidebar
├── MainContent
│   ├── TopAppBar
│   ├── NotificationsPagePreview
│   │   ├── GreetingHeader
│   │   └── DashboardMockCards
│   └── MobileFAB
├── ActivityHubBackdrop
└── ActivityHubDrawer
    ├── DrawerHeader
    ├── FilterTabs
    ├── NotificationList
    │   ├── MealReminderSection
    │   ├── AchievementSection
    │   ├── WeeklyReportSection
    │   └── CommunitySection
    └── DrawerFooter
```

### 4.2 Catatan Penting Struktur

`notifikasi.html` memperlihatkan konten utama hanya sebagai background preview dengan opacity `40%`, sedangkan fokus utama UX adalah drawer **Activity Hub**.

Untuk implementasi React, jangan jadikan drawer sebagai halaman terpisah saja. Jadikan drawer sebagai komponen global:

```txt
src/components/notifications/ActivityHubDrawer.jsx
```

Dengan begitu drawer bisa dibuka dari:

- halaman Notifications,
- icon notification di Top App Bar,
- service worker push notification click,
- route `/notifikasi`.

---

## 5. Review Per Elemen Tampilan

## 5.1 Sidebar Shell

### Deskripsi

Sidebar sama seperti halaman dashboard lain:

- Fixed left.
- Width normal `w-64`.
- Collapse menjadi `72px`.
- Hidden-full dapat menggeser sidebar keluar layar.
- Mobile behavior menggunakan transform `translateX(-110%)`.

### Elemen

- Logo NutriTrack.
- Navigation item.
- Upgrade card.
- Help Center.
- Logout.

### Active State

Tidak ada item "Notifications" di sidebar. Halaman notifikasi dibuka dari top app bar. Karena itu active sidebar tetap tidak spesifik.

Saran implementasi:

- Jangan tambahkan sidebar item khusus notifikasi jika struktur aplikasi memang menjadikan notifikasi sebagai utility page.
- Highlight icon notification pada Top App Bar ketika route `/notifikasi`.

### Tailwind Pattern

```jsx
<aside className={cn(
  "fixed left-0 top-0 z-50 hidden h-screen w-64 flex-col border-r border-outline-variant/20 bg-surface-container-low px-4 py-margin-page shadow-md xl:flex",
  collapsed && "w-[72px]",
  hidden && "-translate-x-[110%] !w-0"
)} />
```

---

## 5.2 Top App Bar

### Deskripsi

Top bar menampilkan:

- Judul: `Notifications`
- Subtitle: `Your wellness journey is 85% on track this week.`
- Search input.
- Button notification.
- Link settings.
- Profile shortcut.

### Elemen UI

| Elemen | Class penting |
|---|---|
| Header | `sticky top-0 z-40 bg-surface/80 backdrop-blur-xl border-b` |
| Search | `bg-surface-container rounded-full pl-12` |
| Notification button | `w-10 h-10 rounded-full hover:bg-surface-variant` |
| Profile avatar | `w-10 h-10 rounded-full border-2 border-primary-container` |

### Behavior

- Notification icon memanggil `toggleOverlay()`.
- Di React, gunakan state `isActivityHubOpen`.

```jsx
const [isActivityHubOpen, setActivityHubOpen] = useState(false);
```

### Rekomendasi

Tambahkan badge unread count di notification icon:

```jsx
<button className="relative ...">
  <span className="material-symbols-outlined">notifications</span>
  {unreadCount > 0 && (
    <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-error-red ring-2 ring-surface" />
  )}
</button>
```

---

## 5.3 Main Preview Content

### Deskripsi

Main content halaman menampilkan:

- Greeting: `Good Morning, Alex`
- Subtitle progress mingguan.
- 3 mock dashboard cards dengan opacity rendah.

Secara visual ini berfungsi sebagai background context saat drawer auto-open.

### Komponen

```txt
NotificationPage
├── GreetingHeader
└── MutedDashboardPreview
```

### Card Preview

Tiap preview card:

- `bg-white`
- `rounded-3xl`
- `shadow-sm`
- `border border-outline-variant`
- `opacity-40`
- `select-none pointer-events-none`

### Fungsi

- Memberi konteks bahwa notification drawer berada di atas dashboard.
- Tidak interaktif.
- Bisa diganti dengan actual dashboard summary jika ingin lebih fungsional.

### Rekomendasi Implementasi

Untuk PWA, preview ini dapat diganti menjadi:

- daily calorie summary,
- hydration progress,
- activity streak,
- latest unlocked badge.

---

## 5.4 Overlay Backdrop

### Deskripsi

Backdrop adalah layer full-screen:

```html
fixed inset-0 bg-on-background/20 backdrop-blur-sm z-50
```

Awalnya:

```html
opacity-0 pointer-events-none
```

Saat drawer terbuka:

```html
opacity-100
```

### Behavior

- Klik backdrop menutup drawer.
- Transisi opacity 300ms.

### React Implementation

```jsx
function ActivityHubBackdrop({ open, onClose }) {
  return (
    <div
      onClick={onClose}
      className={cn(
        "fixed inset-0 z-50 bg-on-background/20 backdrop-blur-sm transition-opacity duration-300",
        open ? "opacity-100" : "pointer-events-none opacity-0"
      )}
    />
  );
}
```

### Accessibility

Saat drawer terbuka:

- Body scroll sebaiknya dikunci.
- Fokus keyboard dipindahkan ke drawer.
- `aria-hidden` untuk konten belakang.
- Escape key menutup drawer.

---

## 5.5 Activity Hub Drawer

### Deskripsi

Drawer berada di kanan layar:

```html
fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[60]
```

State awal:

```html
translate-x-full
```

State terbuka:

```html
translate-x-0
```

### Spesifikasi

| Properti | Nilai |
|---|---|
| Position | `fixed top-0 right-0` |
| Width | `w-full max-w-md` |
| Height | `h-full` |
| Background | white |
| Shadow | `shadow-2xl` |
| z-index | `z-[60]` |
| Transition | `duration-500 ease-out` |

### React Implementation

```jsx
function ActivityHubDrawer({ open, onClose }) {
  return (
    <aside
      role="dialog"
      aria-modal="true"
      aria-labelledby="activity-hub-title"
      className={cn(
        "fixed right-0 top-0 z-[60] flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-500 ease-out",
        open ? "translate-x-0" : "translate-x-full"
      )}
    >
      {/* drawer content */}
    </aside>
  );
}
```

### UX Rekomendasi

- `max-w-md` cocok untuk desktop.
- Untuk tablet bisa `max-w-lg`.
- Untuk mobile full width sudah tepat.
- Tambahkan `safe-area-inset-bottom` untuk PWA mobile.

---

## 5.6 Drawer Header

### Deskripsi

Header drawer berisi:

- Title: `Activity Hub`
- Subtitle: `Manage your health alerts & stats`
- Close button.

### Styling

```txt
p-gutter-desktop
border-b border-outline-variant
bg-surface-container-lowest
```

### Close Button

```txt
p-2
hover:bg-surface-container
rounded-full
active:scale-90
```

### React Component

```jsx
function DrawerHeader({ onClose }) {
  return (
    <div className="flex items-center justify-between border-b border-outline-variant bg-surface-container-lowest p-gutter-desktop">
      <div>
        <h3 id="activity-hub-title" className="font-headline-md text-headline-md text-on-surface">
          Activity Hub
        </h3>
        <p className="font-label-sm text-label-sm text-outline">
          Manage your health alerts & stats
        </p>
      </div>

      <button
        type="button"
        onClick={onClose}
        className="rounded-full p-2 transition-colors hover:bg-surface-container active:scale-90"
        aria-label="Close notifications"
      >
        <span className="material-symbols-outlined text-on-surface">close</span>
      </button>
    </div>
  );
}
```

---

## 5.7 Filter Tabs

### Deskripsi

Filter tab horizontal:

- All
- Reminders
- Achievements
- Reports

Active tab:

```txt
bg-primary text-on-primary shadow-md
```

Inactive tab:

```txt
bg-surface-container text-on-surface-variant hover:bg-surface-container-high
```

### Container

```txt
flex gap-2 p-4 overflow-x-auto scroll-hide bg-surface-container-lowest
```

### React State

```jsx
const [activeFilter, setActiveFilter] = useState("all");
```

### Data

```js
const notificationFilters = [
  { id: "all", label: "All" },
  { id: "reminders", label: "Reminders" },
  { id: "achievements", label: "Achievements" },
  { id: "reports", label: "Reports" }
];
```

### Component

```jsx
function NotificationTabs({ active, onChange }) {
  return (
    <div className="scroll-hide flex gap-2 overflow-x-auto bg-surface-container-lowest p-4">
      {notificationFilters.map((item) => (
        <button
          key={item.id}
          onClick={() => onChange(item.id)}
          className={cn(
            "rounded-full px-4 py-2 font-label-md text-label-md transition-all active:scale-95",
            active === item.id
              ? "bg-primary text-on-primary shadow-md"
              : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
          )}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
```

---

## 5.8 Notification Content Area

### Deskripsi

Area scroll utama drawer:

```txt
flex-1 overflow-y-auto p-4 space-y-6 scroll-hide
```

`scroll-hide` menyembunyikan scrollbar, memberi nuansa mobile app native.

### CSS Scroll Hide

```css
.scroll-hide::-webkit-scrollbar {
  display: none;
}

.scroll-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
```

### Saran

Walau scrollbar disembunyikan, pastikan konten masih jelas bisa discroll. Di mobile, ini baik. Di desktop, bisa dipertimbangkan scrollbar tipis custom agar lebih discoverable.

---

## 5.9 Meal Reminders Section

### Deskripsi

Kategori pertama: `Meal Reminders`.

Header:

- Label hijau uppercase.
- Counter `2 NEW`.

Notification card:

- White card.
- Border outline.
- Icon tile mint.
- Title: `Lunch Time!`
- Time: `12:30 PM`
- Body copy.
- CTA primary: `Log Now`.

### Visual Token

| Elemen | Token |
|---|---|
| Category label | `text-primary` |
| Icon tile | `bg-mint-surface border-primary/10` |
| Icon | `text-primary` |
| CTA | `bg-primary text-on-primary` |
| Hover CTA | `hover:bg-on-primary-fixed-variant` |

### Component

```jsx
function MealReminderCard() {
  return (
    <article className="group rounded-2xl border border-outline-variant bg-card-light p-4 shadow-sm transition-all hover:shadow-md">
      <div className="flex gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-primary/10 bg-mint-surface">
          <span className="material-symbols-outlined text-primary [font-variation-settings:'FILL'_1]">
            restaurant
          </span>
        </div>

        <div className="flex-1">
          <div className="mb-1 flex items-start justify-between">
            <h5 className="font-label-md text-label-md font-bold text-on-surface">Lunch Time!</h5>
            <span className="font-label-sm text-label-sm text-outline">12:30 PM</span>
          </div>

          <p className="mb-3 font-label-md text-label-md text-on-surface-variant">
            You haven't logged your Mediterranean salad yet. Stay consistent!
          </p>

          <button className="w-full rounded-lg bg-primary py-2 font-label-md text-label-md text-on-primary transition-colors hover:bg-on-primary-fixed-variant active:scale-95">
            Log Now
          </button>
        </div>
      </div>
    </article>
  );
}
```

---

## 5.10 Achievement Section

### Deskripsi

Kategori pencapaian memakai aksen ungu:

- Label `Achievements`.
- Badge `JUST NOW`.
- Card background `surface-container-low`.
- Border `achievement-purple/20`.
- Background glow ungu.
- Icon badge bulat.
- CTA utama `View Badge`.
- Secondary action `Share`.

### Elemen Khusus

```html
<div class="absolute -top-10 -right-10 w-24 h-24 bg-achievement-purple/10 rounded-full blur-2xl"></div>
```

Glow ini memberi efek celebration tanpa terlalu ramai.

### Component

```jsx
function AchievementNotificationCard() {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-achievement-purple/20 bg-surface-container-low p-4 shadow-sm">
      <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-achievement-purple/10 blur-2xl" />

      <div className="relative z-10 flex gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-achievement-purple/30 bg-white shadow-inner">
          <span className="material-symbols-outlined text-achievement-purple [font-variation-settings:'FILL'_1]">
            workspace_premium
          </span>
        </div>

        <div className="flex-1">
          <div className="mb-1 flex items-start justify-between">
            <h5 className="font-label-md text-label-md font-bold text-on-surface">Hydration Hero</h5>
            <span className="font-label-sm text-label-sm text-outline">5m ago</span>
          </div>

          <p className="mb-3 font-label-md text-label-md text-on-surface-variant">
            You've hit your water goal 7 days in a row! New badge unlocked.
          </p>

          <div className="flex gap-2">
            <button className="flex-1 rounded-lg bg-achievement-purple py-2 font-label-md text-label-md text-on-primary transition-all hover:opacity-90 active:scale-95">
              View Badge
            </button>

            <button className="rounded-lg border border-achievement-purple/30 p-2 text-achievement-purple hover:bg-achievement-purple/5">
              <span className="material-symbols-outlined">share</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
```

---

## 5.11 Weekly Reports Section

### Deskripsi

Kategori report memakai aksen biru:

- Label `Weekly Reports`.
- Card white.
- Icon tile `secondary-fixed`.
- CTA outline: `Open Report`.

### Visual

```txt
icon tile: bg-secondary-fixed
icon: text-secondary
button: border-outline-variant text-on-surface-variant hover:bg-surface-container
```

### Saran Implementasi

Report card bisa dihubungkan ke route:

```txt
/progress?tab=weekly-report
```

Atau modal detail:

```txt
WeeklyReportModal
```

### Data Fields

```ts
type WeeklyReportNotification = {
  id: string;
  title: string;
  message: string;
  timeLabel: string;
  reportId: string;
  read: boolean;
};
```

---

## 5.12 Community Section

### Deskripsi

Card community berisi:

- Avatar overlap.
- Text: `3 friends joined the Keto Challenge`.
- Chevron right.
- White card.

### Elemen

```txt
flex -space-x-2
avatar: w-8 h-8 rounded-full border-2 border-white
chevron: text-outline
```

### UX Behavior

Klik card sebaiknya mengarah ke:

```txt
/community/challenges/keto
```

Atau membuka detail drawer kecil.

### Component

```jsx
function CommunityNotificationCard({ avatars }) {
  return (
    <article className="flex items-center gap-4 rounded-2xl border border-outline-variant bg-white p-4">
      <div className="flex -space-x-2">
        {avatars.map((avatar) => (
          <img
            key={avatar.id}
            src={avatar.src}
            alt={avatar.alt}
            className="h-8 w-8 rounded-full border-2 border-white"
          />
        ))}
      </div>

      <div className="flex-1">
        <p className="font-label-md text-label-md text-on-surface">
          3 friends joined the <span className="font-bold">Keto Challenge</span>
        </p>
      </div>

      <span className="material-symbols-outlined text-outline">chevron_right</span>
    </article>
  );
}
```

---

## 5.13 Drawer Footer

### Deskripsi

Footer drawer:

```txt
p-6
border-t border-outline-variant
bg-surface-container-low
text-center
```

Action:

```txt
Mark all as read
```

### Behavior

Klik harus:

1. mengubah semua notification `read: true`,
2. menghapus badge unread,
3. optionally show toast.

### React Handler

```jsx
function markAllAsRead() {
  setNotifications((items) => items.map((item) => ({ ...item, read: true })));
}
```

---

## 5.14 Floating Action Button

### Deskripsi

FAB mobile-only:

```txt
fixed bottom-8 right-8
w-14 h-14
bg-primary text-on-primary
rounded-full shadow-2xl
hover:scale-110 active:scale-95
z-20 md:hidden
```

### Fungsi

Dalam HTML, FAB hanya muncul di mobile dan menggunakan icon `add`.

Saran fungsi:

- membuka quick action:
  - add meal log,
  - add water,
  - create reminder,
  - create story.

Untuk halaman notifikasi, CTA yang lebih relevan:

```txt
Create Reminder
```

Atau:

```txt
Quick Log
```

---

## 6. Animasi dan Interaksi

## 6.1 Drawer Slide

```txt
Closed: translate-x-full
Open: translate-x-0
Transition: duration-500 ease-out
```

### React + Tailwind

```jsx
className={cn(
  "transition-transform duration-500 ease-out",
  open ? "translate-x-0" : "translate-x-full"
)}
```

## 6.2 Backdrop Fade

```txt
Closed: opacity-0 pointer-events-none
Open: opacity-100
Transition: duration-300
```

## 6.3 Button Active Scale

Digunakan pada:

- close button,
- filter tab,
- CTA cards,
- FAB.

```txt
active:scale-95
```

## 6.4 Hover Shadow Card

```txt
hover:shadow-md transition-all
```

## 6.5 Hide Scrollbar

```css
.scroll-hide::-webkit-scrollbar {
  display: none;
}
.scroll-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
```

## 6.6 Auto Open Demo

HTML memiliki:

```js
window.onload = () => {
  setTimeout(toggleOverlay, 800);
};
```

Untuk implementasi production, **jangan auto-open** setiap halaman load.

Ganti dengan:

- buka jika user klik icon notification,
- buka jika route `/notifikasi`,
- buka jika ada query `?open=activity`,
- buka jika push notification diklik.

---

## 7. Rekomendasi Struktur Komponen React

```txt
src/
├── components/
│   ├── app-shell/
│   │   ├── AppShell.jsx
│   │   ├── Sidebar.jsx
│   │   ├── TopAppBar.jsx
│   │   └── MobileDrawer.jsx
│   ├── notifications/
│   │   ├── ActivityHubDrawer.jsx
│   │   ├── ActivityHubBackdrop.jsx
│   │   ├── DrawerHeader.jsx
│   │   ├── NotificationTabs.jsx
│   │   ├── NotificationSection.jsx
│   │   ├── NotificationCard.jsx
│   │   ├── MealReminderCard.jsx
│   │   ├── AchievementNotificationCard.jsx
│   │   ├── WeeklyReportCard.jsx
│   │   ├── CommunityNotificationCard.jsx
│   │   └── MarkAllReadFooter.jsx
│   └── ui/
│       ├── IconButton.jsx
│       ├── GlassPanel.jsx
│       ├── Badge.jsx
│       └── FloatingActionButton.jsx
├── pages/
│   └── NotificationsPage.jsx
├── hooks/
│   ├── useActivityHub.js
│   ├── useLockBodyScroll.js
│   └── useEscapeKey.js
├── data/
│   └── notifications.mock.js
└── services/
    └── notificationService.js
```

---

## 8. Data Model

### 8.1 Notification Entity

```ts
type NotificationType =
  | "meal_reminder"
  | "achievement"
  | "weekly_report"
  | "community";

type NotificationAction = {
  label: string;
  variant: "primary" | "outline" | "secondary" | "ghost";
  href?: string;
  onClickKey?: string;
};

type NotificationItem = {
  id: string;
  type: NotificationType;
  categoryLabel: string;
  title: string;
  message: string;
  timeLabel: string;
  icon: string;
  read: boolean;
  createdAt: string;
  accentColor: "primary" | "achievement" | "secondary" | "orange";
  imageUrls?: string[];
  actions?: NotificationAction[];
};
```

### 8.2 Mock Data

```js
export const notifications = [
  {
    id: "notif-001",
    type: "meal_reminder",
    categoryLabel: "Meal Reminders",
    title: "Lunch Time!",
    message: "You haven't logged your Mediterranean salad yet. Stay consistent!",
    timeLabel: "12:30 PM",
    icon: "restaurant",
    read: false,
    createdAt: "2026-06-13T12:30:00+07:00",
    accentColor: "primary",
    actions: [
      { label: "Log Now", variant: "primary", href: "/logfood" }
    ]
  },
  {
    id: "notif-002",
    type: "achievement",
    categoryLabel: "Achievements",
    title: "Hydration Hero",
    message: "You've hit your water goal 7 days in a row! New badge unlocked.",
    timeLabel: "5m ago",
    icon: "workspace_premium",
    read: false,
    createdAt: "2026-06-13T08:20:00+07:00",
    accentColor: "achievement",
    actions: [
      { label: "View Badge", variant: "secondary", href: "/profiledetail#badges" },
      { label: "Share", variant: "ghost", onClickKey: "shareAchievement" }
    ]
  },
  {
    id: "notif-003",
    type: "weekly_report",
    categoryLabel: "Weekly Reports",
    title: "Week 4 Analysis",
    message: "Your protein intake is up by 12% compared to last week. See full breakdown.",
    timeLabel: "Yesterday",
    icon: "insights",
    read: true,
    createdAt: "2026-06-12T07:00:00+07:00",
    accentColor: "secondary",
    actions: [
      { label: "Open Report", variant: "outline", href: "/progress?report=week-4" }
    ]
  }
];
```

---

## 9. State Management

### 9.1 Local State Minimal

```jsx
const [open, setOpen] = useState(false);
const [activeFilter, setActiveFilter] = useState("all");
const [notifications, setNotifications] = useState(initialNotifications);
```

### 9.2 Derived State

```jsx
const unreadCount = notifications.filter((item) => !item.read).length;

const filteredNotifications =
  activeFilter === "all"
    ? notifications
    : notifications.filter((item) => filterMap[activeFilter].includes(item.type));
```

### 9.3 Grouping per Category

```jsx
const groupedNotifications = Object.groupBy(filteredNotifications, (item) => item.type);
```

Jika environment belum mendukung `Object.groupBy`, gunakan reduce:

```js
const groupedNotifications = filteredNotifications.reduce((acc, item) => {
  if (!acc[item.type]) acc[item.type] = [];
  acc[item.type].push(item);
  return acc;
}, {});
```

---

## 10. Hook Rekomendasi

### 10.1 useActivityHub

```jsx
import { useState, useCallback } from "react";

export function useActivityHub() {
  const [open, setOpen] = useState(false);

  const openHub = useCallback(() => setOpen(true), []);
  const closeHub = useCallback(() => setOpen(false), []);
  const toggleHub = useCallback(() => setOpen((value) => !value), []);

  return { open, openHub, closeHub, toggleHub };
}
```

### 10.2 useLockBodyScroll

```jsx
import { useEffect } from "react";

export function useLockBodyScroll(active) {
  useEffect(() => {
    if (!active) return;

    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = original;
    };
  }, [active]);
}
```

### 10.3 useEscapeKey

```jsx
import { useEffect } from "react";

export function useEscapeKey(callback, enabled = true) {
  useEffect(() => {
    if (!enabled) return;

    function handleKeyDown(event) {
      if (event.key === "Escape") callback();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [callback, enabled]);
}
```

---

## 11. Tailwind Config Final

Gabungkan token ini ke `tailwind.config.js`.

```js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#f8f9ff",
        surface: "#f8f9ff",
        "surface-container": "#e5eeff",
        "surface-container-low": "#eff4ff",
        "surface-container-high": "#dce9ff",
        "surface-container-lowest": "#ffffff",
        "surface-variant": "#d3e4fe",
        primary: "#006e2f",
        "primary-container": "#22c55e",
        "on-primary": "#ffffff",
        "on-primary-container": "#004b1e",
        secondary: "#0058be",
        "secondary-container": "#2170e4",
        "secondary-fixed": "#d8e2ff",
        "achievement-purple": "#a855f7",
        "energy-orange": "#f97316",
        "warning-yellow": "#eab308",
        "error-red": "#ef4444",
        "mint-surface": "#f0fdf4",
        "card-light": "#ffffff",
        "on-background": "#0b1c30",
        "on-surface": "#0b1c30",
        "on-surface-variant": "#3d4a3d",
        outline: "#6d7b6c",
        "outline-variant": "#bccbb9",
        "inverse-surface": "#213145",
        "inverse-on-surface": "#eaf1ff"
      },
      spacing: {
        "gutter-mobile": "16px",
        "gutter-desktop": "24px",
        "card-padding": "20px",
        "section-gap": "32px",
        "margin-page": "24px",
        unit: "4px"
      },
      fontFamily: {
        "headline-xl": ["Poppins", "sans-serif"],
        "headline-lg": ["Poppins", "sans-serif"],
        "headline-md": ["Poppins", "sans-serif"],
        "body-md": ["Nunito", "sans-serif"],
        "body-lg": ["Nunito", "sans-serif"],
        "label-sm": ["Inter", "sans-serif"],
        "label-md": ["Inter", "sans-serif"],
        "metrics-mono": ["JetBrains Mono", "monospace"]
      },
      fontSize: {
        "headline-xl": ["48px", { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "700" }],
        "headline-lg": ["32px", { lineHeight: "1.25", fontWeight: "600" }],
        "headline-md": ["24px", { lineHeight: "1.3", fontWeight: "600" }],
        "body-lg": ["18px", { lineHeight: "1.6", fontWeight: "400" }],
        "body-md": ["16px", { lineHeight: "1.5", fontWeight: "400" }],
        "label-md": ["14px", { lineHeight: "1.4", letterSpacing: "0.01em", fontWeight: "500" }],
        "label-sm": ["12px", { lineHeight: "1.4", letterSpacing: "0.05em", fontWeight: "600" }],
        "metrics-mono": ["16px", { lineHeight: "1", fontWeight: "500" }]
      }
    }
  },
  plugins: []
};
```

---

## 12. CSS Utilities Tambahan

Simpan di `src/styles/app-shell.css` atau `src/index.css`.

```css
.material-symbols-outlined {
  font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24;
}

.glass-panel {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

.scroll-hide::-webkit-scrollbar {
  display: none;
}

.scroll-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.active-ring {
  box-shadow: 0 0 0 2px #22c55e;
}
```

Untuk class Material Symbols fill:

```css
.icon-fill {
  font-variation-settings: "FILL" 1, "wght" 400, "GRAD" 0, "opsz" 24;
}
```

---

## 13. PWA Integration

### 13.1 Push Notification Flow

Karena halaman ini berkaitan dengan notifikasi, integrasikan dengan PWA:

```txt
Service Worker Push Event
→ tampilkan system notification
→ user klik notification
→ buka app route /notifikasi?open=activity
→ Activity Hub drawer terbuka
```

### 13.2 Route Handling

```jsx
import { useSearchParams } from "react-router-dom";

function NotificationsPage() {
  const [params] = useSearchParams();
  const shouldOpen = params.get("open") === "activity";

  useEffect(() => {
    if (shouldOpen) setActivityHubOpen(true);
  }, [shouldOpen]);
}
```

### 13.3 Offline Behavior

Saat offline:

- Tampilkan notifikasi cached terakhir.
- Tombol `Log Now` bisa menyimpan pending action ke IndexedDB.
- Saat online kembali, sync ke backend.

### 13.4 IndexedDB Queue

```ts
type PendingNotificationAction = {
  id: string;
  notificationId: string;
  actionType: "mark_read" | "log_meal" | "share_badge";
  payload: unknown;
  createdAt: string;
  synced: boolean;
};
```

---

## 14. Accessibility Checklist

| Area | Rekomendasi |
|---|---|
| Drawer | `role="dialog"`, `aria-modal="true"` |
| Header title | hubungkan dengan `aria-labelledby` |
| Backdrop | klik backdrop close, Escape close |
| Focus | trap focus saat drawer terbuka |
| Buttons | semua icon-only button wajib `aria-label` |
| Tabs | gunakan `role="tablist"` dan `aria-selected` |
| Notification cards | gunakan `article` |
| Mark all read | beri feedback setelah sukses |
| Motion | hormati `prefers-reduced-motion` |
| Scroll | jangan mengunci scroll drawer saat konten panjang |

### Prefers Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.001ms !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 15. Performance Notes

### Masalah dari HTML Asli

1. Material Symbols diload dua kali.
2. Drawer auto-open setiap load, kurang cocok untuk production.
3. Fungsi inline `onclick` sebaiknya diganti state React.
4. Tidak ada focus trap untuk drawer.
5. Notifikasi masih hard-coded.

### Perbaikan React

- Gunakan satu import font.
- Buat global `ActivityHubProvider`.
- Gunakan data-driven notification rendering.
- Lazy load gambar avatar community.
- Hindari `backdrop-filter` berlebihan pada low-end mobile.
- Gunakan memo untuk grouping notifications.

---

## 16. Prioritas Implementasi

### Prioritas 1 — Wajib

- App shell + Top App Bar.
- ActivityHub drawer open/close.
- Backdrop blur.
- Filter tab.
- Notification cards data-driven.
- Mark all as read.
- Responsive drawer mobile.

### Prioritas 2 — Penting

- Unread badge di notification icon.
- Focus trap + Escape key.
- IndexedDB cache untuk notification list.
- Offline pending action.
- Toast feedback.

### Prioritas 3 — Enhancement

- Push notification service worker.
- Group by date.
- Swipe-to-dismiss di mobile.
- Search inside notification drawer.
- Notification preferences deep link ke settings.
- Animation using Framer Motion.

---

## 17. Contoh Halaman React

```jsx
import { useEffect, useMemo, useState } from "react";
import { AppShell } from "../components/app-shell/AppShell";
import { ActivityHubDrawer } from "../components/notifications/ActivityHubDrawer";
import { ActivityHubBackdrop } from "../components/notifications/ActivityHubBackdrop";
import { notifications as initialNotifications } from "../data/notifications.mock";
import { useLockBodyScroll } from "../hooks/useLockBodyScroll";
import { useEscapeKey } from "../hooks/useEscapeKey";

export default function NotificationsPage() {
  const [open, setOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [notifications, setNotifications] = useState(initialNotifications);

  useLockBodyScroll(open);
  useEscapeKey(() => setOpen(false), open);

  const unreadCount = useMemo(
    () => notifications.filter((item) => !item.read).length,
    [notifications]
  );

  function markAllAsRead() {
    setNotifications((items) => items.map((item) => ({ ...item, read: true })));
  }

  return (
    <AppShell
      title="Notifications"
      subtitle="Your wellness journey is 85% on track this week."
      searchPlaceholder="Search analytics..."
      unreadCount={unreadCount}
      onOpenNotifications={() => setOpen(true)}
    >
      <section className="mx-auto max-w-5xl">
        <header className="mb-8">
          <h2 className="font-headline-lg text-headline-lg text-on-surface">
            Good Morning, Alex
          </h2>
          <p className="text-body-lg text-on-surface-variant">
            Your wellness journey is 85% on track this week.
          </p>
        </header>

        <div className="grid select-none grid-cols-1 gap-6 opacity-40 pointer-events-none md:grid-cols-3">
          {/* dashboard mock cards */}
        </div>
      </section>

      <ActivityHubBackdrop open={open} onClose={() => setOpen(false)} />

      <ActivityHubDrawer
        open={open}
        onClose={() => setOpen(false)}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        notifications={notifications}
        onMarkAllRead={markAllAsRead}
      />
    </AppShell>
  );
}
```

---

## 18. Final Implementation Notes

Halaman `notifikasi.html` sudah memiliki konsep UI yang kuat untuk PWA karena drawer notification terasa seperti mobile-native activity center. Fokus implementasi di React sebaiknya bukan hanya memindahkan HTML ke JSX, tetapi menjadikannya sistem notifikasi reusable.

Yang paling penting:

1. Drawer harus menjadi **global component**.
2. Data notifikasi harus **data-driven**.
3. Action seperti `Log Now`, `View Badge`, dan `Open Report` harus diarahkan ke route aplikasi.
4. Push notification PWA sebaiknya membuka halaman ini dengan drawer aktif.
5. Perhatikan accessibility karena drawer overlay adalah dialog interaktif.

Dengan struktur ini, halaman notifikasi akan lebih optimal, scalable, dan siap dihubungkan ke backend atau service worker PWA.
