# designsetting.md — NutriTrack Settings Page Design Specification

Dokumen ini berisi hasil analisis tampilan `pengaturan.html` untuk dikonversi ke project lokal berbasis **React PWA + Tailwind CSS**. Fokus dokumen ini adalah menjabarkan semua elemen visual, warna, layout, animasi, behavior interaktif, dan struktur komponen agar halaman Settings dapat diimplementasikan ulang secara konsisten dengan design system NutriTrack.

---

## 1. Ringkasan Visual Halaman

Halaman **Settings** menggunakan gaya visual yang konsisten dengan halaman dashboard NutriTrack lainnya:

- **Visual style:** light mode, soft medical-health dashboard, glassmorphism card, rounded large card, dan spacing lega.
- **Primary identity:** hijau tua `#006e2f` sebagai warna utama untuk CTA, active focus, toggle ON, dan ikon section.
- **Surface system:** background biru-putih sangat muda `#f8f9ff`, card putih transparan, dan container biru muda.
- **Layout utama:** fixed left sidebar + sticky top app bar + centered settings content.
- **UX pattern:** setting dikelompokkan berdasarkan domain: General, Notifications, Privacy & Security, Subscription, dan Logout.
- **Interaksi utama:** toggle switch, segmented theme mode, select language, privacy/security card navigation, subscription CTA, logout, dan toast sukses.

Halaman ini lebih bersifat **preference management** daripada analytics dashboard. Maka komponen perlu mudah dipindai, fokus pada readability, dan memberi feedback cepat saat pengguna mengubah pengaturan.

---

## 2. Struktur Layout Utama

```txt
SettingsPage
├── AppShell
│   ├── Sidebar
│   └── MainContent
│       ├── TopAppBar
│       └── SettingsContent
│           ├── PageHeader
│           ├── GeneralSettingsCard
│           ├── NotificationsCard
│           ├── PrivacySecurityCard
│           ├── SubscriptionBanner
│           ├── LogoutAction
│           └── SuccessToast
```

### Layout canvas

| Elemen | Spesifikasi |
|---|---|
| Body background | `bg-background` / `#f8f9ff` |
| Main content offset desktop | `xl:ml-64` karena sidebar fixed `w-64` |
| Main content width | `max-w-[1200px] mx-auto w-full` |
| Inner settings content | `max-w-[1000px] mx-auto` |
| Content padding | `p-gutter-desktop` lalu section `p-8` |
| Vertical rhythm | `space-y-8`, section gap 32px |
| Top app bar | sticky, height 64px, blur surface |

---

## 3. Design Tokens

### 3.1 Color tokens utama

Gunakan color token berikut di `tailwind.config.js` agar semua halaman NutriTrack konsisten.

```js
colors: {
  surface: '#f8f9ff',
  background: '#f8f9ff',
  'surface-container': '#e5eeff',
  'surface-container-low': '#eff4ff',
  'surface-container-high': '#dce9ff',
  'surface-container-highest': '#d3e4fe',
  'surface-variant': '#d3e4fe',

  primary: '#006e2f',
  'primary-container': '#22c55e',
  'primary-fixed-dim': '#4ae176',
  'on-primary': '#ffffff',
  'on-primary-container': '#004b1e',

  secondary: '#0058be',
  'secondary-container': '#2170e4',
  'on-secondary-container': '#fefcff',

  'on-surface': '#0b1c30',
  'on-surface-variant': '#3d4a3d',
  'outline-variant': '#bccbb9',
  outline: '#6d7b6c',

  'energy-orange': '#f97316',
  'achievement-purple': '#a855f7',
  'warning-yellow': '#eab308',
  'error-red': '#ef4444',
  error: '#ba1a1a',

  'inverse-surface': '#213145',
  'inverse-on-surface': '#eaf1ff',
  'bg-dark': '#0f172a',
  'card-dark': '#1e293b',
}
```

### 3.2 Fungsi warna pada halaman Settings

| Warna | Fungsi UI |
|---|---|
| `primary` | CTA, toggle ON, section icon, active/focus state |
| `primary-container` | active nav, badge, soft green background |
| `surface` | page background dan top app bar |
| `surface-container` | input, select, theme switch wrapper |
| `surface-container-low` | privacy/security card background |
| `outline-variant` | border halus antar section/card |
| `secondary` | icon privacy/security card |
| `error-red` | logout action |
| white / translucent white | glass-card dan subscription CTA |

### 3.3 Typography tokens

```js
fontFamily: {
  'headline-md': ['Poppins'],
  'headline-lg': ['Poppins'],
  'headline-xl': ['Poppins'],
  'body-md': ['Nunito'],
  'body-lg': ['Nunito'],
  'label-md': ['Inter'],
  'label-sm': ['Inter'],
  'metrics-mono': ['JetBrains Mono'],
}
```

| Token | Ukuran | Fungsi |
|---|---:|---|
| `headline-lg` | 32px / 1.25 | Page title Settings |
| `headline-md` | 24px / 1.3 | Section title dan brand |
| `body-md` | 16px / 1.5 | Deskripsi umum |
| `label-md` | 14px / 1.4 | App bar subtitle, button, select |
| `label-sm` | 12px / 1.4 | Helper text, metadata, small labels |

### 3.4 Spacing tokens

```js
spacing: {
  'gutter-mobile': '16px',
  'gutter-desktop': '24px',
  'margin-page': '24px',
  'card-padding': '20px',
  'section-gap': '32px',
  unit: '4px',
}
```

### 3.5 Radius tokens

Walaupun config hanya mendefinisikan radius kecil, halaman memakai arbitrary radius besar. Standarkan seperti berikut:

| Pattern | Class | Fungsi |
|---|---|---|
| Control kecil | `rounded-xl` | input, select, small button |
| Card item | `rounded-2xl` | notification row hover, privacy card |
| Main card | `rounded-[2rem]` | General, Notifications, Privacy |
| Premium banner | `rounded-[2.5rem]` | Subscription card |
| Toast | `rounded-[1.5rem]` | feedback toast |
| Pill/full | `rounded-full` | toggle switch, notification icons |

---

## 4. Utility CSS yang Perlu Dipindahkan ke React Project

### 4.1 Glass card

```css
.glass-card {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(226, 232, 240, 0.5);
  box-shadow: 0 10px 25px -5px rgba(0, 110, 47, 0.05);
}
```

**Manfaat:** memberi kesan clean, premium, dan ringan. Cocok untuk halaman settings karena tidak terlalu ramai namun tetap modern.

### 4.2 Toggle switch

```css
.toggle-switch {
  width: 44px;
  height: 24px;
  background-color: #cbd5e1;
  border-radius: 999px;
  position: relative;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.toggle-switch::after {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: 20px;
  height: 20px;
  background-color: white;
  border-radius: 50%;
  transition: transform 0.2s ease;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

input:checked + .toggle-switch {
  background-color: #006e2f;
}

input:checked + .toggle-switch::after {
  transform: translateX(20px);
}
```

**Manfaat:** toggle terasa native, ringan, dan jelas secara state ON/OFF. Untuk React, lebih baik dibuat sebagai komponen `Switch` agar reusable.

### 4.3 Sidebar collapse/hide

```css
aside#sidebar {
  transition: width 0.22s ease, transform 0.22s ease;
}

aside#sidebar.collapsed {
  width: 72px;
}

aside#sidebar .nav-label {
  display: inline;
  transition: opacity 0.15s ease;
  white-space: nowrap;
}

aside#sidebar.collapsed .nav-label {
  opacity: 0;
  width: 0;
  display: none;
}

aside#sidebar .logo-text {
  transition: opacity 0.15s ease;
}

aside#sidebar.collapsed .logo-text {
  opacity: 0;
  display: none;
}

main#mainContent {
  transition: margin-left 0.22s ease, width 0.22s ease;
}

main#mainContent.main-collapsed {
  margin-left: 72px;
}

aside#sidebar.hidden-full {
  transform: translateX(-110%);
  width: 0 !important;
}

main#mainContent.hidden-sidebar {
  margin-left: 0 !important;
}

@media (min-width: 1280px) {
  main#mainContent {
    width: calc(100% - 16rem);
  }

  main#mainContent.main-collapsed {
    width: calc(100% - 72px);
  }

  main#mainContent.hidden-sidebar {
    width: 100%;
  }
}

@media (max-width: 1024px) {
  aside#sidebar {
    transform: translateX(-110%);
    position: fixed;
    z-index: 50;
  }

  aside#sidebar.mobile-open {
    transform: translateX(0%);
  }

  main#mainContent {
    margin-left: 0 !important;
  }
}
```

**Catatan implementasi:** untuk React, jangan manipulasi class DOM langsung. Gunakan state `sidebarMode = 'expanded' | 'collapsed' | 'hidden' | 'mobile-open'`.

---

## 5. App Shell

### 5.1 Sidebar

Sidebar pada `pengaturan.html` masih memakai shell yang sama dengan halaman lain, namun tidak ada active state khusus untuk Settings karena Settings dibuka dari top app bar, bukan nav utama.

**Elemen sidebar:**

| Elemen | Detail |
|---|---|
| Brand | icon `nutrition`, title `NutriTrack`, subtitle `Pro Companion` |
| Nav utama | Dashboard, Log Food, Meal Planner, Progress, Nutrition, Foods, Community, Profile |
| Upgrade card | gradient secondary, CTA `Get Started` |
| Help Center | link bawah |
| Logout | link merah saat hover |
| Collapse button | `chevron_left/right` |
| Hide button | close di upgrade card |

### 5.2 Top App Bar

**Class utama:**

```html
<header class="sticky top-0 z-40 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/30 px-gutter-desktop h-16 flex items-center justify-between">
```

**Isi app bar:**

- Title: `Settings`
- Subtitle: `Atur preferensi akun dan pengalaman NutriTrack Anda.`
- Search input: `Search settings...`
- Icon action: notifications dan settings
- Profile shortcut: avatar + name + member status

**Rekomendasi React:**

```jsx
<TopAppBar
  title="Settings"
  subtitle="Atur preferensi akun dan pengalaman NutriTrack Anda."
  searchPlaceholder="Search settings..."
/>
```

---

## 6. Review Per Elemen Tampilan

## 6.1 Page Header

```txt
Settings
Atur preferensi akun dan pengalaman NutriTrack Anda.
```

**Visual:**

- Title memakai `font-headline-lg text-headline-lg font-bold`.
- Subtitle memakai `text-on-surface-variant font-body-md`.
- Diberi margin bawah `mb-10` untuk memisahkan konteks halaman dari card pertama.

**Implementasi React:**

```jsx
function SettingsPageHeader() {
  return (
    <div className="mb-10">
      <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface mb-2">
        Settings
      </h2>
      <p className="text-on-surface-variant font-body-md">
        Atur preferensi akun dan pengalaman NutriTrack Anda.
      </p>
    </div>
  );
}
```

---

## 6.2 General Settings Card

General card berisi dua setting utama:

1. **Language selector**
2. **Theme Mode segmented control**

### Visual card

```html
<section class="glass-card rounded-[2rem] p-8 space-y-6">
```

**Header card:**

- Icon container: `w-10 h-10 bg-primary/10 rounded-xl`
- Icon: `settings_suggest`
- Title: `General`

### Language selector

**Elemen:**

- Label: `Language`
- Helper: `Pilih bahasa aplikasi yang Anda inginkan`
- Select options: English, Indonesian, Spanish
- Selected: Indonesian

**Rekomendasi UX:**

- Simpan bahasa ke `localStorage` atau backend user preference.
- Gunakan i18n library seperti `react-i18next` bila aplikasi akan multilingual serius.
- Setelah select berubah, tampilkan toast sukses.

### Theme Mode segmented control

**Visual:**

- Wrapper: `flex p-1.5 bg-surface-container-low rounded-2xl border shadow-inner`
- Active light: `bg-white shadow-sm text-primary`
- Inactive dark: `text-on-surface-variant hover:bg-surface-variant/40`

**Rekomendasi React state:**

```jsx
const [theme, setTheme] = useState('light');
```

**Efek:**

- `theme = 'light'` menambahkan class `light` atau menghapus `dark` dari root.
- `theme = 'dark'` menambahkan class `dark` ke root.
- Simpan ke `localStorage.theme`.

---

## 6.3 Notifications Card

Notification card berisi tiga baris toggle:

1. Push Notifications — aktif
2. Email Updates — tidak aktif
3. SMS Alerts — tidak aktif

### Visual card

```html
<section class="glass-card rounded-[2rem] p-8">
```

### Notification row anatomy

```txt
NotificationRow
├── IconCircle
├── TextGroup
│   ├── Title
│   └── Description
└── ToggleSwitch
```

### Row behavior

| State | Visual |
|---|---|
| Default | transparent row |
| Hover | `hover:bg-surface-container/30 rounded-2xl` |
| Icon hover | icon circle berubah `group-hover:bg-primary/10 group-hover:text-primary` |
| Toggle ON | background `primary`, knob ke kanan |
| Toggle OFF | background slate `#cbd5e1`, knob kiri |
| Toggle change | munculkan success toast |

### Komponen React: `NotificationSettingRow`

```jsx
function NotificationSettingRow({ icon, title, description, checked, onChange }) {
  return (
    <div className="flex items-center justify-between group p-3 -mx-3 hover:bg-surface-container/30 rounded-2xl transition-all">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant group-hover:bg-primary/10 group-hover:text-primary transition-all">
          <span className="material-symbols-outlined">{icon}</span>
        </div>
        <div>
          <p className="font-bold text-on-surface">{title}</p>
          <p className="text-label-sm text-on-surface-variant">{description}</p>
        </div>
      </div>
      <Switch checked={checked} onChange={onChange} />
    </div>
  );
}
```

### Komponen React: `Switch`

```jsx
function Switch({ checked, onChange, label }) {
  return (
    <label className="relative inline-flex items-center cursor-pointer" aria-label={label}>
      <input
        checked={checked}
        onChange={onChange}
        className="sr-only"
        type="checkbox"
      />
      <div className="toggle-switch" />
    </label>
  );
}
```

---

## 6.4 Privacy & Security Card

Privacy card memakai grid 2 kolom di desktop dan 1 kolom di mobile.

### Elemen

1. **Account Visibility**
   - Icon: `visibility`
   - Deskripsi: kelola siapa yang dapat melihat progres dan lencana.
   - Chevron right sebagai affordance navigasi.

2. **Export Data**
   - Icon: `download`
   - Deskripsi: unduh riwayat nutrisi dalam CSV.
   - Chevron right sebagai affordance navigasi.

### Visual

```html
<div class="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/30 hover:border-primary/50 transition-all cursor-pointer group shadow-sm">
```

### Behavior

- Hover border berubah ke `primary/50`.
- Chevron berubah warna ke primary.
- Card bisa diarahkan ke halaman/sub-modal.

### Rekomendasi UX

- `Account Visibility` sebaiknya membuka modal atau route `/settings/privacy`.
- `Export Data` memicu proses async lalu menampilkan state `Preparing CSV...`.
- Untuk PWA, export data bisa dibuat client-side dari IndexedDB/local storage bila mode offline.

---

## 6.5 Subscription Banner

Subscription section adalah visual paling kuat di halaman Settings.

### Visual

```html
<section class="relative overflow-hidden rounded-[2.5rem] p-10 bg-gradient-to-br from-primary to-primary-container text-white shadow-2xl transition-transform hover:scale-[1.01]">
```

### Elemen

- Background gradient: `from-primary to-primary-container`.
- Decorative blobs: white transparent blur circles.
- Icon premium: `workspace_premium` dalam card putih transparan.
- Title: `NutriTrack Pro`.
- Status badge: `Aktif`.
- Description: tanggal renewal dan harga.
- CTA 1: `Kelola Paket`.
- CTA 2: `Riwayat Tagihan`.

### UX note

Data subscription masih dummy:

```txt
Paket Anda diperbarui pada 12 Okt 2024 seharga $12.99/bln
```

Untuk project lokal, buat dinamis dari API:

```ts
type Subscription = {
  planName: 'Free' | 'Pro' | 'Premium';
  status: 'active' | 'trialing' | 'expired' | 'cancelled';
  renewalDate: string;
  price: number;
  currency: 'IDR' | 'USD';
  billingCycle: 'monthly' | 'yearly';
};
```

---

## 6.6 Logout Action

Logout ditempatkan di bawah semua pengaturan dan dibuat sebagai action berwarna merah.

**Visual:**

```html
<button class="flex items-center gap-3 text-error-red font-black hover:bg-error-red/10 px-10 py-4 rounded-2xl transition-all group">
```

**Behavior:**

- Hover background soft red.
- Icon rotate 12 derajat saat hover.
- Sebaiknya membuka confirmation modal sebelum logout.

### Rekomendasi aman

Jangan langsung logout tanpa konfirmasi bila user memiliki perubahan setting belum tersimpan.

```jsx
function LogoutButton({ onLogout }) {
  return (
    <button
      onClick={() => setConfirmLogoutOpen(true)}
      className="flex items-center gap-3 text-error-red font-black hover:bg-error-red/10 px-10 py-4 rounded-2xl transition-all group"
    >
      <span className="material-symbols-outlined group-hover:rotate-12 transition-transform">
        logout
      </span>
      Logout dari NutriTrack
    </button>
  );
}
```

---

## 6.7 Success Toast

Toast muncul saat toggle berubah.

### Visual

```html
<div class="fixed bottom-10 left-1/2 -translate-x-1/2 bg-on-background text-white px-10 py-5 rounded-[1.5rem] shadow-2xl flex items-center gap-4 transition-all translate-y-32 opacity-0 z-50 border border-white/10">
```

### Isi

- Icon check dalam circle primary.
- Text: `Pengaturan berhasil diperbarui!`

### Behavior asli

```js
const toggles = document.querySelectorAll('input[type="checkbox"]');
const toast = document.getElementById('save-toast');

toggles.forEach(toggle => {
  toggle.addEventListener('change', () => {
    toast.classList.remove('translate-y-32', 'opacity-0');
    setTimeout(() => {
      toast.classList.add('translate-y-32', 'opacity-0');
    }, 3000);
  });
});
```

### React pattern

Gunakan `useToast` custom hook.

```jsx
function useToast(timeout = 3000) {
  const [toast, setToast] = useState(null);

  const showToast = (message) => {
    setToast(message);
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => setToast(null), timeout);
  };

  return { toast, showToast };
}
```

---

## 7. Struktur Komponen React yang Disarankan

```txt
src/
├── components/
│   ├── app-shell/
│   │   ├── AppShell.jsx
│   │   ├── Sidebar.jsx
│   │   └── TopAppBar.jsx
│   ├── settings/
│   │   ├── SettingsPageHeader.jsx
│   │   ├── SettingsSection.jsx
│   │   ├── GeneralSettingsCard.jsx
│   │   ├── ThemeSegmentedControl.jsx
│   │   ├── NotificationsCard.jsx
│   │   ├── NotificationSettingRow.jsx
│   │   ├── Switch.jsx
│   │   ├── PrivacySecurityCard.jsx
│   │   ├── PrivacyActionCard.jsx
│   │   ├── SubscriptionBanner.jsx
│   │   ├── LogoutButton.jsx
│   │   └── SuccessToast.jsx
│   └── ui/
│       ├── GlassCard.jsx
│       ├── IconCircle.jsx
│       └── Button.jsx
├── pages/
│   └── SettingsPage.jsx
├── hooks/
│   ├── useToast.js
│   ├── useThemeMode.js
│   └── useSettingsPreferences.js
└── data/
    └── settingsDefaults.js
```

---

## 8. Data Model Settings

Gunakan satu object agar semua preference mudah di-load dan di-save.

```ts
type SettingsPreferences = {
  language: 'en' | 'id' | 'es';
  theme: 'light' | 'dark';
  notifications: {
    push: boolean;
    email: boolean;
    sms: boolean;
  };
  privacy: {
    accountVisibility: 'public' | 'friends' | 'private';
    showProgress: boolean;
    showBadges: boolean;
  };
  subscription: {
    planName: string;
    status: 'active' | 'inactive' | 'expired' | 'trialing';
    renewalDate: string;
    priceLabel: string;
  };
};
```

### Default value

```js
export const defaultSettings = {
  language: 'id',
  theme: 'light',
  notifications: {
    push: true,
    email: false,
    sms: false,
  },
  privacy: {
    accountVisibility: 'friends',
    showProgress: true,
    showBadges: true,
  },
  subscription: {
    planName: 'NutriTrack Pro',
    status: 'active',
    renewalDate: '2024-10-12',
    priceLabel: '$12.99/bln',
  },
};
```

---

## 9. Page Implementation Skeleton

```jsx
import { useState } from 'react';
import AppShell from '../components/app-shell/AppShell';
import TopAppBar from '../components/app-shell/TopAppBar';
import SettingsPageHeader from '../components/settings/SettingsPageHeader';
import GeneralSettingsCard from '../components/settings/GeneralSettingsCard';
import NotificationsCard from '../components/settings/NotificationsCard';
import PrivacySecurityCard from '../components/settings/PrivacySecurityCard';
import SubscriptionBanner from '../components/settings/SubscriptionBanner';
import LogoutButton from '../components/settings/LogoutButton';
import SuccessToast from '../components/settings/SuccessToast';
import { defaultSettings } from '../data/settingsDefaults';

export default function SettingsPage() {
  const [settings, setSettings] = useState(defaultSettings);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message = 'Pengaturan berhasil diperbarui!') => {
    setToastMessage(message);
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => setToastMessage(null), 3000);
  };

  const updateSettings = (updater) => {
    setSettings((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      localStorage.setItem('nutritrack-settings', JSON.stringify(next));
      return next;
    });
    showToast();
  };

  return (
    <AppShell active="settings">
      <TopAppBar
        title="Settings"
        subtitle="Atur preferensi akun dan pengalaman NutriTrack Anda."
        searchPlaceholder="Search settings..."
      />

      <div className="p-8 max-w-[1000px] mx-auto space-y-8">
        <SettingsPageHeader />
        <GeneralSettingsCard settings={settings} onUpdate={updateSettings} />
        <NotificationsCard settings={settings} onUpdate={updateSettings} />
        <PrivacySecurityCard />
        <SubscriptionBanner subscription={settings.subscription} />
        <div className="flex justify-center pt-8">
          <LogoutButton />
        </div>
      </div>

      <SuccessToast message={toastMessage} />
    </AppShell>
  );
}
```

---

## 10. Animasi dan Micro-interactions

### 10.1 Toggle animation

| Trigger | Animasi |
|---|---|
| Toggle ON | background berubah ke primary, knob `translateX(20px)` |
| Toggle OFF | background ke slate, knob kembali kiri |
| On change | toast slide-up + fade-in |

### 10.2 Theme segmented control

| Trigger | Animasi |
|---|---|
| Hover inactive button | `hover:bg-surface-variant/40` |
| Active state | white background + shadow-sm + primary text |
| Switch mode | transition `all 200ms ease` |

### 10.3 Privacy card

| Trigger | Animasi |
|---|---|
| Hover | border ke `primary/50` |
| Chevron hover | text berubah ke primary |
| Click | bisa tambah `active:scale-[0.98]` |

### 10.4 Subscription banner

| Trigger | Animasi |
|---|---|
| Hover | `hover:scale-[1.01]` |
| CTA primary | `hover:scale-105 active:scale-95` |
| Decorative blobs | tetap statis agar tidak mengganggu |

### 10.5 Toast

| State | Class |
|---|---|
| Hidden | `translate-y-32 opacity-0` |
| Visible | remove `translate-y-32 opacity-0` |
| Transition | `transition-all` |

Rekomendasi lebih halus:

```jsx
className={cn(
  'fixed bottom-10 left-1/2 -translate-x-1/2 bg-on-background text-white px-10 py-5 rounded-[1.5rem] shadow-2xl flex items-center gap-4 transition-all duration-300 z-50 border border-white/10',
  message ? 'translate-y-0 opacity-100' : 'translate-y-32 opacity-0 pointer-events-none'
)}
```

---

## 11. Accessibility Checklist

### Wajib diperbaiki saat konversi ke React

- Tambahkan `aria-label` pada toggle switch.
- Pastikan toggle memiliki label semantik, bukan hanya visual.
- Gunakan `button` untuk Theme Mode, bukan link.
- Tambahkan `aria-pressed` pada button Light/Dark.
- Privacy card jika clickable harus berupa `button` atau `Link`, bukan `div` biasa.
- Toast perlu `role="status"` atau `aria-live="polite"`.
- Logout perlu modal konfirmasi untuk mencegah accidental click.
- Search input perlu `aria-label="Search settings"`.
- Top icon notification/settings sudah memakai anchor; tambahkan `aria-label` konsisten.

### Contoh toast accessible

```jsx
<div role="status" aria-live="polite">
  Pengaturan berhasil diperbarui!
</div>
```

---

## 12. PWA Considerations

Karena project target adalah React PWA:

1. **Persist settings locally**
   - Simpan theme, language, dan notification preference di `localStorage`.
   - Untuk data lebih kompleks, gunakan IndexedDB.

2. **Offline settings**
   - User tetap bisa mengganti setting di offline mode.
   - Tandai `needsSync: true` untuk disinkronkan saat online kembali.

3. **Push notification permission**
   - Toggle Push Notifications harus memanggil permission API:

```js
async function requestPushPermission() {
  if (!('Notification' in window)) return false;
  const permission = await Notification.requestPermission();
  return permission === 'granted';
}
```

4. **Theme sync**
   - Saat app dibuka, load theme sebelum render utama agar tidak flicker.

```js
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.classList.toggle('dark', savedTheme === 'dark');
```

5. **Export data offline**
   - Tombol Export Data bisa membuat CSV dari local cache.

---

## 13. Tailwind Implementation Notes

### 13.1 Button variants

```jsx
const buttonVariants = {
  primary: 'bg-primary text-on-primary shadow-lg shadow-primary/20 hover:scale-105 active:scale-95',
  ghost: 'bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30',
  danger: 'text-error-red hover:bg-error-red/10',
};
```

### 13.2 Card variants

```jsx
const cardVariants = {
  glass: 'glass-card rounded-[2rem] p-8',
  action: 'p-6 rounded-2xl bg-surface-container-low border border-outline-variant/30 hover:border-primary/50 transition-all cursor-pointer group shadow-sm',
  premium: 'relative overflow-hidden rounded-[2.5rem] p-10 bg-gradient-to-br from-primary to-primary-container text-white shadow-2xl transition-transform hover:scale-[1.01]',
};
```

---

## 14. Hal yang Perlu Dioptimalkan dari HTML Asli

### 14.1 Active state Settings belum ada di sidebar

Karena Settings ada di top icon, tidak ada sidebar nav active. Di React bisa gunakan `active="settings"` untuk menandai icon settings di app bar.

### 14.2 Manipulasi DOM langsung perlu dihapus

HTML memakai:

```js
document.querySelectorAll('input[type="checkbox"]')
document.getElementById('save-toast')
```

Di React, ganti dengan state dan props.

### 14.3 Data subscription masih hardcoded

Tanggal dan harga perlu berasal dari backend/user profile.

### 14.4 Push notification toggle perlu validasi permission

Jangan hanya mengaktifkan toggle visual. Pastikan browser permission `granted`.

### 14.5 Language selector belum memberi feedback

Saat bahasa diganti, tampilkan toast dan update i18n context.

### 14.6 Export data perlu loading/error state

Tambahkan state:

- `idle`
- `exporting`
- `success`
- `error`

---

## 15. Prioritas Implementasi

### Prioritas 1 — Core UI

- AppShell, Sidebar, TopAppBar
- SettingsPageHeader
- GeneralSettingsCard
- NotificationsCard
- Switch component
- Toast component

### Prioritas 2 — Interaksi dan state

- Local storage untuk language/theme/notifications
- Theme toggle actual dark/light
- Toast feedback untuk semua update
- Push notification permission check

### Prioritas 3 — Data dan integrasi

- Backend user settings API
- Subscription data API
- Export CSV logic
- Privacy visibility modal/page

### Prioritas 4 — Polish

- Skeleton state
- Confirmation modal logout
- Keyboard navigation
- Animation reduced-motion support
- Responsive mobile drawer

---

## 16. Checklist Final Konversi ke React PWA

- [ ] Buat `SettingsPage.jsx`.
- [ ] Pisahkan shared `AppShell`, `Sidebar`, dan `TopAppBar`.
- [ ] Buat reusable `GlassCard`.
- [ ] Buat reusable `Switch` dengan accessibility.
- [ ] Simpan settings ke `localStorage`.
- [ ] Tambahkan dark mode class di root HTML.
- [ ] Implementasikan permission flow untuk Push Notification.
- [ ] Buat `SuccessToast` dengan `aria-live`.
- [ ] Tambahkan confirmation modal untuk logout.
- [ ] Buat export CSV dummy terlebih dahulu.
- [ ] Pastikan responsive: mobile 1 kolom, desktop card tetap max `1000px`.
- [ ] Pastikan focus ring terlihat pada select, button, dan toggle.

---

## 17. Kesimpulan Desain

Halaman **Settings** sudah memiliki fondasi UI yang kuat: clean, konsisten, dan cocok untuk aplikasi health/nutrition berbasis dashboard. Komponen paling penting untuk dikonversi dengan benar adalah **toggle switch**, **segmented theme control**, **privacy action card**, **subscription banner**, dan **toast feedback**. Untuk project React PWA, HTML ini sebaiknya tidak dipindahkan secara literal, tetapi dipecah menjadi komponen kecil dengan state yang jelas agar mudah dipelihara, diintegrasikan ke backend, dan tetap berjalan baik dalam mode offline.
