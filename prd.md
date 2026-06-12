# 📋 Product Requirements Document (PRD)
## NutriTrack — Aplikasi Kesehatan & Manajemen Pola Makan

---

> **Versi:** 1.1.0  
> **Tanggal:** Juni 2026  
> **Status:** Draft  
> **Platform:** React PWA (Cross-platform: Mobile & Desktop Browser)  
> **Changelog v1.1.0:** Tambah section Landing Page, Self-Service Onboarding, Detail Login, Dark/Light Mode

---

## 📑 Daftar Isi

1. [Executive Summary](#1-executive-summary)
2. [Tujuan & Visi Produk](#2-tujuan--visi-produk)
3. [Target Pengguna](#3-target-pengguna)
4. [Tech Stack](#4-tech-stack)
5. [Arsitektur Sistem](#5-arsitektur-sistem)
6. [Fitur & Requirements Frontend](#6-fitur--requirements-frontend)
7. [Requirements Backend (Supabase)](#7-requirements-backend-supabase)
8. [Database Schema & Migrasi](#8-database-schema--migrasi)
9. [Data Seed (Data Awal Testing)](#9-data-seed-data-awal-testing)
10. [Desain UI/UX & Animasi](#10-desain-uiux--animasi)
11. [PWA Configuration](#11-pwa-configuration)
12. [Notifikasi & Scheduling](#12-notifikasi--scheduling)
13. [Keamanan & Autentikasi](#13-keamanan--autentikasi)
14. [Storage (Supabase Bucket)](#14-storage-supabase-bucket)
15. [Deployment & Environment](#15-deployment--environment)
16. [Testing & QA](#16-testing--qa)
17. [Roadmap & Milestone](#17-roadmap--milestone)
18. [Landing Page](#18-landing-page) ✨ *Baru*
19. [Self-Service Onboarding](#19-self-service-onboarding) ✨ *Baru*
20. [Halaman Login & Register (Detail)](#20-halaman-login--register-detail) ✨ *Baru*
21. [Dark Mode & Light Mode](#21-dark-mode--light-mode) ✨ *Baru*

---

## 1. Executive Summary

**NutriTrack** adalah aplikasi kesehatan berbasis web PWA (Progressive Web App) yang membantu pengguna mengelola pola makan sehat, memantau berat badan, dan menerima notifikasi jadwal makan secara real-time. Aplikasi ini dapat diakses melalui browser mobile maupun desktop, dengan pengalaman yang menyerupai aplikasi native di Play Store.

Aplikasi ini menggabungkan teknologi React modern, animasi 3D interaktif, Framer Motion, serta backend Supabase untuk memberikan pengalaman pengguna yang premium dan responsif.

---

## 2. Tujuan & Visi Produk

### 2.1 Visi
Menjadi aplikasi kesehatan all-in-one yang mudah digunakan oleh siapa saja untuk membantu mencapai tujuan kesehatan melalui pola makan yang teratur dan terencana.

### 2.2 Tujuan Utama

| No | Tujuan | Indikator Keberhasilan |
|----|--------|------------------------|
| 1 | Membantu pengguna mengatur pola makan sehat | User mencatat minimal 3 makan/hari selama 7 hari berturut-turut |
| 2 | Program turun berat badan dengan nutrisi seimbang | User mencapai target berat badan dalam periode yang ditentukan |
| 3 | Program naik berat badan secara sehat | User mendapatkan berat badan ideal tanpa makanan tidak sehat |
| 4 | Memberikan notifikasi jadwal makan tepat waktu | Notifikasi terkirim dengan akurasi > 95% |
| 5 | Pengalaman UI sekelas aplikasi Play Store | Rating UX > 4.5/5 dalam user testing |

### 2.3 Problem Statement
- Banyak orang kesulitan menjaga konsistensi pola makan karena tidak ada pengingat
- Sulit menghitung kalori dan nutrisi secara manual
- Tidak tahu makanan apa yang cocok untuk tujuan kesehatan spesifik
- Aplikasi kesehatan yang ada sering terlalu kompleks dan tidak menarik

---

## 3. Target Pengguna

### 3.1 Persona Pengguna

**Persona 1: Andi — Ingin Turun Berat Badan**
- Usia: 25–35 tahun
- Profesi: Karyawan kantoran
- Kebutuhan: Diet kalori defisit, reminder makan siang, tracking progress
- Pain Point: Sering lupa makan tepat waktu karena sibuk kerja

**Persona 2: Siti — Ingin Naik Berat Badan**
- Usia: 18–25 tahun
- Profesi: Mahasiswa
- Kebutuhan: Program bulking sehat, menu makanan bergizi tinggi kalori
- Pain Point: Tidak tahu makanan sehat apa yang membantu naik berat badan

**Persona 3: Budi — Ingin Pola Makan Teratur**
- Usia: 30–45 tahun
- Profesi: Profesional sibuk
- Kebutuhan: Jadwal makan terstruktur, laporan nutrisi harian
- Pain Point: Pola makan tidak teratur karena jadwal kerja padat

---

## 4. Tech Stack

### 4.1 Frontend

| Kategori | Teknologi | Versi | Keterangan |
|----------|-----------|-------|------------|
| Framework | React | 18.x | Core framework |
| Build Tool | Vite | 5.x | Fast bundler |
| Language | TypeScript | 5.x | Type safety |
| Styling | Tailwind CSS | 3.x | Utility-first CSS |
| Animasi | Framer Motion | 11.x | Page & component animations |
| Animasi 3D | Three.js + React Three Fiber | r164 / 8.x | 3D graphics & scenes |
| Animasi 3D Helper | @react-three/drei | 9.x | Three.js helpers |
| UI Components | shadcn/ui | latest | Accessible base components |
| Icon | Lucide React | latest | Icon library |
| State Management | Zustand | 4.x | Lightweight state |
| Server State | TanStack Query | 5.x | Data fetching & caching |
| Routing | React Router DOM | 6.x | Client-side routing |
| Form | React Hook Form + Zod | latest | Form & validation |
| Charts | Recharts | 2.x | Data visualization |
| Notifications | react-hot-toast | latest | Toast notifications |
| Date/Time | date-fns | 3.x | Date utilities |
| PWA | vite-plugin-pwa | latest | PWA setup |
| HTTP Client | Supabase JS Client | 2.x | API calls |

### 4.2 Backend (Supabase)

| Kategori | Teknologi | Keterangan |
|----------|-----------|------------|
| Database | Supabase PostgreSQL | Primary database |
| Auth | Supabase Auth | Email, Google OAuth |
| Storage | Supabase Storage Bucket | Foto profil, foto makanan |
| Realtime | Supabase Realtime | Live updates |
| Edge Functions | Supabase Edge Functions (Deno) | Scheduled notifications, kalkulasi nutrisi |
| RLS | Row Level Security | Data security per user |

### 4.3 Deployment

| Layanan | Kegunaan |
|---------|----------|
| Vercel | Frontend hosting |
| Supabase Cloud | Backend, DB, Storage |
| Vercel Environment Variables | Secret management |

### 4.4 Development Tools

| Tool | Kegunaan |
|------|----------|
| ESLint + Prettier | Code quality |
| Husky + lint-staged | Pre-commit hooks |
| Storybook | Component development |
| Vitest | Unit testing |
| Playwright | E2E testing |
| GitHub Actions | CI/CD pipeline |

---

## 5. Arsitektur Sistem

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                          │
│  ┌──────────────────────────────────────────────────────┐   │
│  │          React PWA (Vite + TypeScript)               │   │
│  │  ┌─────────────┐  ┌────────────┐  ┌──────────────┐  │   │
│  │  │ Framer Motion│  │  Three.js  │  │   Recharts   │  │   │
│  │  │  Animations  │  │  3D Scene  │  │    Charts    │  │   │
│  │  └─────────────┘  └────────────┘  └──────────────┘  │   │
│  │  ┌─────────────────────────────────────────────────┐ │   │
│  │  │          Zustand + TanStack Query                │ │   │
│  │  └─────────────────────────────────────────────────┘ │   │
│  └──────────────────────────────────────────────────────┘   │
└───────────────────────────┬─────────────────────────────────┘
                            │ Supabase JS Client
                            │ (REST + Realtime WebSocket)
┌───────────────────────────▼─────────────────────────────────┐
│                      SUPABASE LAYER                          │
│  ┌────────────┐  ┌────────────┐  ┌────────────────────────┐ │
│  │ PostgreSQL │  │  Auth JWT  │  │  Storage Bucket         │ │
│  │  Database  │  │  (RLS)     │  │  (Photos/Avatars)      │ │
│  └────────────┘  └────────────┘  └────────────────────────┘ │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │              Edge Functions (Deno)                      │ │
│  │  - send-meal-reminder   - calculate-nutrition           │ │
│  │  - weekly-report        - weight-prediction             │ │
│  └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### 5.1 Struktur Folder Frontend

```
nutritrack/
├── public/
│   ├── icons/                    # PWA icons (192x192, 512x512)
│   ├── manifest.json             # PWA manifest
│   └── service-worker.js         # SW for offline
├── src/
│   ├── assets/                   # Static assets, 3D models
│   ├── components/
│   │   ├── ui/                   # shadcn/ui base components
│   │   ├── layout/               # Navbar, Sidebar, Footer
│   │   ├── 3d/                   # Three.js 3D components
│   │   ├── charts/               # Recharts wrappers
│   │   ├── forms/                # Form components
│   │   └── shared/               # Reusable components
│   ├── features/
│   │   ├── auth/                 # Login, Register, Profile
│   │   ├── dashboard/            # Home dashboard
│   │   ├── meal-plan/            # Meal planning & schedule
│   │   ├── food-log/             # Food logging
│   │   ├── weight-tracker/       # Weight tracking
│   │   ├── nutrition/            # Nutrition analysis
│   │   ├── progress/             # Progress & reports
│   │   └── settings/             # App settings
│   ├── hooks/                    # Custom React hooks
│   ├── lib/
│   │   ├── supabase.ts           # Supabase client
│   │   ├── utils.ts              # Utility functions
│   │   └── constants.ts          # App constants
│   ├── stores/                   # Zustand stores
│   ├── types/                    # TypeScript types/interfaces
│   ├── animations/               # Framer Motion variants
│   └── App.tsx
├── supabase/
│   ├── migrations/               # SQL migration files
│   ├── seed.sql                  # Seed data
│   └── functions/                # Edge functions
├── tailwind.config.ts
├── vite.config.ts
└── vercel.json
```

---

## 6. Fitur & Requirements Frontend

### 6.1 Menu Utama Aplikasi (Navigasi)

Aplikasi memiliki **Bottom Navigation (Mobile)** dan **Sidebar Navigation (Desktop)** dengan menu:

| No | Menu | Icon | Deskripsi |
|----|------|------|-----------|
| 1 | 🏠 Beranda | Home | Dashboard utama |
| 2 | 🍽️ Makan Hari Ini | Utensils | Log makanan harian |
| 3 | 📅 Jadwal Makan | Calendar | Meal plan & schedule |
| 4 | ⚖️ Berat Badan | Scale | Tracking berat badan |
| 5 | 📊 Nutrisi | BarChart | Analisis nutrisi |
| 6 | 📈 Progress | TrendingUp | Laporan & grafik kemajuan |
| 7 | 🍎 Makanan | Apple | Database makanan |
| 8 | 👤 Profil | User | Profil & pengaturan |

---

### 6.2 Halaman Onboarding & Auth

#### FR-AUTH-001: Halaman Splash Screen
- Animasi logo 3D menggunakan Three.js saat pertama kali membuka aplikasi
- Durasi splash: 2-3 detik dengan fade-out animation
- Check session: redirect ke dashboard jika sudah login

#### FR-AUTH-002: Halaman Onboarding
- 4 slide onboarding dengan animasi Framer Motion (slide + fade)
- Slide 1: Selamat datang + ilustrasi 3D makanan sehat
- Slide 2: Atur tujuan (turun/naik/maintain berat badan)
- Slide 3: Jadwal makan & notifikasi
- Slide 4: Mulai perjalanan sehatmu
- Progress dots dengan animasi smooth
- Skip button di setiap slide

#### FR-AUTH-003: Halaman Login
- Login dengan Email & Password
- Login dengan Google OAuth (Supabase)
- Validasi form real-time dengan Zod
- Loading state dengan skeleton animation
- Redirect ke halaman setup profil jika user baru
- Animasi card masuk dari bawah (Framer Motion spring)

#### FR-AUTH-004: Halaman Register
- Form: nama lengkap, email, password, konfirmasi password
- Validasi strength password indicator (animated)
- Agree to terms & privacy policy
- Email verification flow
- Animasi form field shake jika error

#### FR-AUTH-005: Setup Profil Awal (Onboarding Profile)
- Step 1: Data fisik (tinggi badan, berat badan saat ini, usia, jenis kelamin)
- Step 2: Pilih tujuan (Turun BB / Naik BB / Pola Makan Sehat)
- Step 3: Target berat badan & timeline
- Step 4: Level aktivitas fisik (sedentary/aktif ringan/aktif sedang/aktif berat)
- Step 5: Preferensi makanan (alergi, vegetarian, dll)
- Step 6: Atur jadwal makan (waktu sarapan, makan siang, makan malam, snack)
- Progress bar animasi antar step
- Kalkulasi otomatis BMR & TDEE setelah setup

---

### 6.3 Halaman Dashboard (Beranda)

#### FR-DASH-001: Header Dashboard
- Greeting dinamis (Selamat pagi/siang/malam) berdasarkan waktu
- Foto profil user dengan ring animasi
- Notifikasi bell dengan badge count (animated)
- Streak hari berturut-turut menjaga pola makan

#### FR-DASH-002: Kalori Ring (3D Donut Chart)
- Animasi ring kalori interaktif menggunakan Three.js atau SVG animated
- Tampil: Kalori target, kalori dikonsumsi, kalori tersisa
- Color coding: hijau (aman), kuning (hampir), merah (over)
- Counter animasi angka saat data berubah

#### FR-DASH-003: Kartu Makro Nutrisi
- 4 kartu: Karbohidrat, Protein, Lemak, Serat
- Progress bar animasi untuk setiap makro
- Icon 3D kecil untuk setiap makro (dengan Three.js sederhana)

#### FR-DASH-004: Jadwal Makan Hari Ini
- Timeline horizontal makan hari ini
- Status: ✅ Sudah makan, ⏰ Akan datang, ⚠️ Terlewat
- Countdown timer ke jadwal makan berikutnya (animated)
- Quick-add tombol untuk log makanan

#### FR-DASH-005: Kartu Berat Badan
- Berat saat ini vs target
- Mini chart progress 7 hari terakhir
- BMI indicator dengan color zone (animated gauge)
- Persentase pencapaian target

#### FR-DASH-006: Motivasi & Tips
- Quote motivasi harian berubah setiap hari
- Tips nutrisi random yang relevan dengan tujuan user
- Smooth fade in/out animation antar quote

#### FR-DASH-007: Activity Summary
- Langkah kaki (jika browser mendukung)
- Air minum tracker (animated water fill)
- Kalori terbakar estimasi

---

### 6.4 Halaman Log Makanan Harian

#### FR-FOOD-001: Log Makanan Per Waktu Makan
- Tampilan card per sesi: Sarapan, Makan Siang, Makan Malam, Snack Pagi, Snack Sore
- Setiap card menampilkan total kalori sesi tersebut
- Expand/collapse animasi untuk lihat detail makanan

#### FR-FOOD-002: Tambah Makanan
- Search makanan dengan autocomplete (database makanan Indonesia)
- Filter: semua, pagi, siang, malam, snack
- Scan barcode makanan (via kamera browser) — future feature flag
- Input manual: nama, kalori, protein, karbohidrat, lemak, porsi
- Photo makanan (upload ke Supabase Storage)
- Animasi card masuk saat makanan ditambahkan

#### FR-FOOD-003: Riwayat Makanan
- List makanan yang sudah ditambahkan hari ini
- Swipe-to-delete dengan animasi (mobile)
- Edit porsi langsung di list
- Total kalori real-time update

#### FR-FOOD-004: Saran Makanan AI
- Rekomendasi makanan berdasarkan sisa kalori hari ini
- Rekomendasi berdasarkan tujuan (deficit/surplus)
- Tag: "Rendah Kalori", "Tinggi Protein", "Cocok untuk Sarapan"

---

### 6.5 Halaman Jadwal Makan (Meal Plan)

#### FR-MEAL-001: Tampilan Kalender Mingguan
- Tampilan grid 7 hari dengan animasi scroll horizontal
- Setiap hari menampilkan status kelengkapan makan (progress ring mini)
- Tap hari untuk lihat detail meal plan hari tersebut
- Highlight hari ini dengan animasi pulse

#### FR-MEAL-002: Meal Plan Template
- 3 template default: Defisit Kalori, Surplus Kalori, Maintenance
- Template bisa dikustomisasi sepenuhnya
- Drag & drop makanan antar sesi makan (dengan animasi)
- Copy meal plan dari hari sebelumnya

#### FR-MEAL-003: Generator Meal Plan Otomatis
- Input: target kalori, preferensi makanan, alergi
- Output: meal plan mingguan lengkap dengan resep sederhana
- Kalkulasi otomatis makro per hari
- Tombol regenerate dengan animasi loading 3D

#### FR-MEAL-004: Reminder Schedule
- Set waktu notifikasi per sesi makan
- Toggle on/off per sesi
- Custom pesan notifikasi
- Preview notifikasi sebelum disimpan

#### FR-MEAL-005: Grocery List
- Generate daftar belanja otomatis dari meal plan mingguan
- Checklist interaktif dengan animasi tick
- Export ke clipboard/share

---

### 6.6 Halaman Tracking Berat Badan

#### FR-WEIGHT-001: Input Berat Badan
- Form input berat dengan unit toggle (kg/lbs)
- Input berat hari ini dengan picker
- Foto progress opsional (upload ke Supabase Storage)
- Catatan/notes opsional
- Animasi konfirmasi saat berhasil input

#### FR-WEIGHT-002: Grafik Progress Berat Badan
- Line chart interaktif (Recharts)
- Filter: 7 hari, 30 hari, 3 bulan, 6 bulan, 1 tahun
- Garis target sebagai referensi
- Tooltip detail saat hover/tap titik data
- Trend line (moving average) untuk prediksi
- Animasi chart draw-in saat pertama load

#### FR-WEIGHT-003: BMI Gauge
- Visualisasi 3D gauge meter BMI (Three.js)
- Zona warna: Kurus (biru), Normal (hijau), Gemuk (kuning), Obesitas (merah)
- Animasi jarum penunjuk smooth
- Label kategori BMI saat ini

#### FR-WEIGHT-004: Prediksi Pencapaian Target
- Estimasi tanggal tercapai target berat berdasarkan tren terkini
- Progress percentage animasi
- Milestones: setiap 5% dari total target

#### FR-WEIGHT-005: Body Measurement (Opsional)
- Input lingkar pinggang, dada, pinggul
- History per pengukuran
- Chart perubahan body measurement

---

### 6.7 Halaman Analisis Nutrisi

#### FR-NUT-001: Summary Nutrisi Hari Ini
- Breakdown makro harian dengan animated bar chart
- Perbandingan dengan rekomendasi harian (WHO/AKG Indonesia)
- Color coding sesuai kondisi (kurang/cukup/lebih)

#### FR-NUT-002: Pie Chart Distribusi Makro
- Donut chart interaktif (Recharts) untuk distribusi kalori dari karbohidrat/protein/lemak
- Animasi draw-in saat halaman dibuka
- Target ratio vs aktual

#### FR-NUT-003: Vitamin & Mineral Tracker
- Tracking vitamin utama: A, B1, B6, B12, C, D, E
- Tracking mineral: Zat besi, Kalsium, Seng, Magnesium
- Progress bar per nutrisi dengan warna kondisi
- Saran makanan untuk nutrisi yang kurang

#### FR-NUT-004: Hydration Tracker
- Animasi 3D water bottle fill (Three.js)
- Input gelas air minum
- Target: 8 gelas/hari
- Reminder minum air terintegrasi

#### FR-NUT-005: Laporan Nutrisi Mingguan
- Rata-rata nutrisi per minggu
- Grafik tren mingguan
- Highlight nutrisi yang sering kurang atau berlebih

---

### 6.8 Halaman Progress & Laporan

#### FR-PROG-001: Overview Progress
- Score kesehatan keseluruhan (0–100) dengan animated gauge
- Breakdown: Konsistensi makan, Target kalori, Progress berat badan
- Streak counter dengan animasi api 🔥

#### FR-PROG-002: Laporan Mingguan
- Summary mingguan otomatis
- Grafik multi-line: berat badan + kalori + target
- Achievement badges yang didapat minggu ini
- Teks analisis otomatis (kalkulasi dari data)

#### FR-PROG-003: Achievement System
- Badge-badge pencapaian dengan animasi unlock (confetti + glow)
- Kategori: Konsistensi, Target Berat, Nutrisi, Hidrasi
- Total points system
- Leaderboard (opsional: dengan teman)

#### FR-PROG-004: Before/After Gallery
- Grid foto progress yang diupload user
- Tampilan split view before/after
- Filter berdasarkan tanggal
- Private by default (hanya user sendiri)

#### FR-PROG-005: Export Laporan
- Export PDF laporan bulanan
- Export CSV data nutrisi
- Share progress sebagai gambar (canvas rendering)

---

### 6.9 Halaman Database Makanan

#### FR-DB-001: Browse Makanan
- Grid card makanan dengan foto (dari Supabase Storage atau default)
- Filter: kategori (sarapan/makan siang/cemilan/dll), kalori, makro
- Search dengan highlight hasil pencarian
- Infinite scroll dengan skeleton loading

#### FR-DB-002: Detail Makanan
- Halaman detail makanan dengan animasi slide-up
- Foto makanan full width
- Tabel nutrisi lengkap (animated table)
- Porsi kalkulator interaktif (geser slider, nilai nutrisi update real-time)
- Tombol: "Tambah ke Log" dan "Simpan ke Favorit"

#### FR-DB-003: Tambah Makanan Custom
- Form tambah makanan sendiri
- Upload foto ke Supabase Storage
- Tandai sebagai "Buatan Sendiri"
- Opsi share ke komunitas (publik)

#### FR-DB-004: Makanan Favorit
- List makanan yang di-bookmark
- Quick-add dari favorit langsung ke log hari ini
- Swipe-to-remove animasi

---

### 6.10 Halaman Profil & Pengaturan

#### FR-PROF-001: Profil User
- Foto profil (upload ke Supabase Storage)
- Data: nama, usia, tinggi, berat saat ini, target berat
- Edit profil inline dengan animasi
- Badge achievements tampil di profil

#### FR-PROF-002: Pengaturan Tujuan
- Ubah tujuan (turun/naik/maintain)
- Update target berat badan dan timeline
- Re-kalkulasi otomatis kebutuhan kalori harian

#### FR-PROF-003: Pengaturan Notifikasi
- Toggle master notifikasi
- Atur waktu tiap sesi makan
- Notifikasi minum air
- Notifikasi laporan mingguan
- Test notifikasi button

#### FR-PROF-004: Preferensi Makanan
- Update alergi & pantangan makanan
- Mode diet: omnivore, vegetarian, vegan, pescatarian
- Preferensi masakan: Indonesia, Asia, Barat, dll

#### FR-PROF-005: Pengaturan Tampilan
- Dark mode / Light mode toggle dengan smooth transition
- Pilih bahasa: Indonesia / English
- Ukuran teks

#### FR-PROF-006: Data & Privasi
- Hapus semua data log makanan
- Hapus akun
- Export semua data (JSON)
- Privacy settings

---

## 7. Requirements Backend (Supabase)

### 7.1 Supabase Authentication

#### BR-AUTH-001: Email Auth
```sql
-- Supabase Auth sudah built-in, hanya perlu konfigurasi:
-- Enable email confirmations: YES
-- Enable password recovery: YES
-- Minimum password length: 8
```

#### BR-AUTH-002: Google OAuth
- Setup di Supabase Dashboard > Authentication > Providers > Google
- Redirect URL: `https://domain.com/auth/callback`

#### BR-AUTH-003: Row Level Security (RLS)
- Semua tabel user data menggunakan RLS
- Policy: `auth.uid() = user_id`
- Admin bypass untuk Edge Functions

---

### 7.2 Edge Functions

#### EF-001: `send-meal-reminder`
```typescript
// Trigger: Cron job setiap 15 menit
// Logic: Cek meal_schedules yang waktunya dalam 5 menit ke depan
// Output: Push notification via Web Push API
// File: supabase/functions/send-meal-reminder/index.ts
```

#### EF-002: `calculate-daily-nutrition`
```typescript
// Trigger: HTTP POST dari client saat add food log
// Logic: Hitung total nutrisi hari ini, bandingkan dengan target
// Output: nutrition_summary JSON
// File: supabase/functions/calculate-daily-nutrition/index.ts
```

#### EF-003: `generate-weekly-report`
```typescript
// Trigger: Cron job setiap Minggu pukul 08.00 WIB
// Logic: Aggregate data 7 hari, hitung rata-rata, buat laporan
// Output: Insert ke tabel weekly_reports
// File: supabase/functions/generate-weekly-report/index.ts
```

#### EF-004: `calculate-tdee`
```typescript
// Trigger: HTTP POST saat setup profil atau update data fisik
// Logic: Hitung BMR (Mifflin-St Jeor) + TDEE (Harris-Benedict)
// Output: { bmr, tdee, calorie_target, macro_targets }
// File: supabase/functions/calculate-tdee/index.ts
```

#### EF-005: `recommend-foods`
```typescript
// Trigger: HTTP GET dari client
// Logic: Berdasarkan sisa kalori & tujuan, rekomendasikan makanan
// Output: Array of food recommendations
// File: supabase/functions/recommend-foods/index.ts
```

---

### 7.3 Supabase Realtime

```typescript
// Subscribe ke perubahan food_logs hari ini
supabase
  .channel('food_logs_today')
  .on('postgres_changes', {
    event: '*',
    schema: 'public',
    table: 'food_logs',
    filter: `user_id=eq.${userId}`
  }, handleFoodLogChange)
  .subscribe()
```

---

## 8. Database Schema & Migrasi

### 8.1 Tabel: `profiles`
```sql
-- Migration: 001_create_profiles.sql
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name VARCHAR(100) NOT NULL,
  avatar_url TEXT,
  date_of_birth DATE,
  gender VARCHAR(10) CHECK (gender IN ('male', 'female', 'other')),
  height_cm DECIMAL(5,2),
  current_weight_kg DECIMAL(5,2),
  target_weight_kg DECIMAL(5,2),
  activity_level VARCHAR(20) CHECK (activity_level IN (
    'sedentary', 'lightly_active', 'moderately_active', 'very_active', 'extremely_active'
  )) DEFAULT 'moderately_active',
  goal_type VARCHAR(20) CHECK (goal_type IN (
    'lose_weight', 'gain_weight', 'maintain_weight', 'eat_healthy'
  )) DEFAULT 'eat_healthy',
  target_calories INT,
  target_protein_g DECIMAL(6,2),
  target_carbs_g DECIMAL(6,2),
  target_fat_g DECIMAL(6,2),
  target_fiber_g DECIMAL(6,2),
  target_water_ml INT DEFAULT 2000,
  diet_type VARCHAR(20) DEFAULT 'omnivore',
  allergies TEXT[], -- array of allergy strings
  cuisine_preferences TEXT[],
  weekly_weight_goal_kg DECIMAL(4,2), -- e.g. -0.5 for lose, +0.5 for gain
  target_date DATE,
  bmr DECIMAL(8,2),
  tdee DECIMAL(8,2),
  onboarding_completed BOOLEAN DEFAULT FALSE,
  streak_days INT DEFAULT 0,
  last_log_date DATE,
  total_points INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Trigger: auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Trigger: auto-create profile saat user register
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', 'User Baru'));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
```

### 8.2 Tabel: `food_database`
```sql
-- Migration: 002_create_food_database.sql
CREATE TABLE public.food_database (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(200) NOT NULL,
  name_en VARCHAR(200),
  category VARCHAR(50) NOT NULL CHECK (category IN (
    'breakfast', 'lunch', 'dinner', 'snack', 'drink', 'supplement', 'other'
  )),
  sub_category VARCHAR(50), -- nasi, sayur, buah, lauk, dll
  serving_unit VARCHAR(50) DEFAULT 'gram',
  serving_size_g DECIMAL(8,2) DEFAULT 100,
  calories DECIMAL(8,2) NOT NULL,
  protein_g DECIMAL(8,2) DEFAULT 0,
  carbohydrates_g DECIMAL(8,2) DEFAULT 0,
  fat_g DECIMAL(8,2) DEFAULT 0,
  fiber_g DECIMAL(8,2) DEFAULT 0,
  sugar_g DECIMAL(8,2) DEFAULT 0,
  sodium_mg DECIMAL(8,2) DEFAULT 0,
  cholesterol_mg DECIMAL(8,2) DEFAULT 0,
  -- Vitamin
  vitamin_a_mcg DECIMAL(8,2) DEFAULT 0,
  vitamin_b1_mg DECIMAL(8,2) DEFAULT 0,
  vitamin_b6_mg DECIMAL(8,2) DEFAULT 0,
  vitamin_b12_mcg DECIMAL(8,2) DEFAULT 0,
  vitamin_c_mg DECIMAL(8,2) DEFAULT 0,
  vitamin_d_mcg DECIMAL(8,2) DEFAULT 0,
  vitamin_e_mg DECIMAL(8,2) DEFAULT 0,
  -- Mineral
  calcium_mg DECIMAL(8,2) DEFAULT 0,
  iron_mg DECIMAL(8,2) DEFAULT 0,
  zinc_mg DECIMAL(8,2) DEFAULT 0,
  magnesium_mg DECIMAL(8,2) DEFAULT 0,
  potassium_mg DECIMAL(8,2) DEFAULT 0,
  -- Meta
  image_url TEXT,
  is_indonesian BOOLEAN DEFAULT TRUE,
  is_custom BOOLEAN DEFAULT FALSE,
  is_public BOOLEAN DEFAULT TRUE,
  created_by UUID REFERENCES public.profiles(id),
  barcode VARCHAR(50),
  tags TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index untuk search performance
CREATE INDEX idx_food_database_name ON public.food_database USING gin(to_tsvector('indonesian', name));
CREATE INDEX idx_food_database_category ON public.food_database(category);
CREATE INDEX idx_food_database_is_public ON public.food_database(is_public);

-- RLS: Semua user bisa baca, hanya creator yang bisa edit custom food
ALTER TABLE public.food_database ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public food is viewable by all" ON public.food_database
  FOR SELECT USING (is_public = TRUE OR auth.uid() = created_by);
CREATE POLICY "Users can insert custom food" ON public.food_database
  FOR INSERT WITH CHECK (auth.uid() = created_by AND is_custom = TRUE);
CREATE POLICY "Users can update own custom food" ON public.food_database
  FOR UPDATE USING (auth.uid() = created_by AND is_custom = TRUE);
CREATE POLICY "Users can delete own custom food" ON public.food_database
  FOR DELETE USING (auth.uid() = created_by AND is_custom = TRUE);
```

### 8.3 Tabel: `food_logs`
```sql
-- Migration: 003_create_food_logs.sql
CREATE TABLE public.food_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  food_id UUID REFERENCES public.food_database(id),
  food_name VARCHAR(200) NOT NULL, -- denormalized untuk kasus custom/deleted food
  meal_type VARCHAR(20) NOT NULL CHECK (meal_type IN (
    'breakfast', 'morning_snack', 'lunch', 'afternoon_snack', 'dinner', 'late_snack'
  )),
  log_date DATE NOT NULL DEFAULT CURRENT_DATE,
  log_time TIMETZ DEFAULT NOW(),
  serving_amount DECIMAL(8,2) NOT NULL DEFAULT 1,
  serving_unit VARCHAR(50) DEFAULT 'porsi',
  serving_size_g DECIMAL(8,2),
  -- Nilai nutrisi yang sudah dikalkulasi berdasarkan porsi
  calories DECIMAL(8,2) NOT NULL,
  protein_g DECIMAL(8,2) DEFAULT 0,
  carbohydrates_g DECIMAL(8,2) DEFAULT 0,
  fat_g DECIMAL(8,2) DEFAULT 0,
  fiber_g DECIMAL(8,2) DEFAULT 0,
  sugar_g DECIMAL(8,2) DEFAULT 0,
  sodium_mg DECIMAL(8,2) DEFAULT 0,
  photo_url TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_food_logs_user_date ON public.food_logs(user_id, log_date);
CREATE INDEX idx_food_logs_meal_type ON public.food_logs(meal_type);

ALTER TABLE public.food_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own food logs" ON public.food_logs
  FOR ALL USING (auth.uid() = user_id);

CREATE TRIGGER food_logs_updated_at
  BEFORE UPDATE ON public.food_logs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
```

### 8.4 Tabel: `weight_logs`
```sql
-- Migration: 004_create_weight_logs.sql
CREATE TABLE public.weight_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  weight_kg DECIMAL(5,2) NOT NULL,
  body_fat_percentage DECIMAL(5,2),
  muscle_mass_kg DECIMAL(5,2),
  waist_cm DECIMAL(5,2),
  chest_cm DECIMAL(5,2),
  hip_cm DECIMAL(5,2),
  arm_cm DECIMAL(5,2),
  thigh_cm DECIMAL(5,2),
  bmi DECIMAL(5,2),
  bmi_category VARCHAR(20),
  photo_url TEXT,
  notes TEXT,
  log_date DATE NOT NULL DEFAULT CURRENT_DATE,
  log_time TIMETZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE UNIQUE INDEX idx_weight_logs_user_date ON public.weight_logs(user_id, log_date);
CREATE INDEX idx_weight_logs_user_id ON public.weight_logs(user_id);

ALTER TABLE public.weight_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own weight logs" ON public.weight_logs
  FOR ALL USING (auth.uid() = user_id);
```

### 8.5 Tabel: `meal_schedules`
```sql
-- Migration: 005_create_meal_schedules.sql
CREATE TABLE public.meal_schedules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  meal_type VARCHAR(20) NOT NULL CHECK (meal_type IN (
    'breakfast', 'morning_snack', 'lunch', 'afternoon_snack', 'dinner', 'late_snack'
  )),
  scheduled_time TIME NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  reminder_enabled BOOLEAN DEFAULT TRUE,
  reminder_minutes_before INT DEFAULT 15,
  custom_message TEXT,
  days_of_week INT[] DEFAULT '{1,2,3,4,5,6,7}', -- 1=Senin, 7=Minggu
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, meal_type)
);

ALTER TABLE public.meal_schedules ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own schedules" ON public.meal_schedules
  FOR ALL USING (auth.uid() = user_id);
```

### 8.6 Tabel: `meal_plans`
```sql
-- Migration: 006_create_meal_plans.sql
CREATE TABLE public.meal_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  plan_name VARCHAR(100),
  plan_date DATE NOT NULL,
  meal_type VARCHAR(20) NOT NULL CHECK (meal_type IN (
    'breakfast', 'morning_snack', 'lunch', 'afternoon_snack', 'dinner', 'late_snack'
  )),
  food_id UUID REFERENCES public.food_database(id),
  food_name VARCHAR(200) NOT NULL,
  serving_amount DECIMAL(8,2) DEFAULT 1,
  serving_unit VARCHAR(50) DEFAULT 'porsi',
  target_calories DECIMAL(8,2),
  target_protein_g DECIMAL(8,2),
  target_carbs_g DECIMAL(8,2),
  target_fat_g DECIMAL(8,2),
  is_completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_meal_plans_user_date ON public.meal_plans(user_id, plan_date);

ALTER TABLE public.meal_plans ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own meal plans" ON public.meal_plans
  FOR ALL USING (auth.uid() = user_id);
```

### 8.7 Tabel: `daily_nutrition_summaries`
```sql
-- Migration: 007_create_daily_nutrition_summaries.sql
-- Materialized view / denormalized table untuk performa
CREATE TABLE public.daily_nutrition_summaries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  summary_date DATE NOT NULL,
  total_calories DECIMAL(8,2) DEFAULT 0,
  total_protein_g DECIMAL(8,2) DEFAULT 0,
  total_carbohydrates_g DECIMAL(8,2) DEFAULT 0,
  total_fat_g DECIMAL(8,2) DEFAULT 0,
  total_fiber_g DECIMAL(8,2) DEFAULT 0,
  total_sugar_g DECIMAL(8,2) DEFAULT 0,
  total_sodium_mg DECIMAL(8,2) DEFAULT 0,
  water_intake_ml INT DEFAULT 0,
  meals_logged INT DEFAULT 0,
  target_calories DECIMAL(8,2),
  calorie_difference DECIMAL(8,2), -- negatif = defisit, positif = surplus
  nutrition_score INT, -- 0-100
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, summary_date)
);

CREATE INDEX idx_daily_summaries_user_date ON public.daily_nutrition_summaries(user_id, summary_date);

ALTER TABLE public.daily_nutrition_summaries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own daily summaries" ON public.daily_nutrition_summaries
  FOR ALL USING (auth.uid() = user_id);
```

### 8.8 Tabel: `water_logs`
```sql
-- Migration: 008_create_water_logs.sql
CREATE TABLE public.water_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  amount_ml INT NOT NULL DEFAULT 250,
  log_date DATE NOT NULL DEFAULT CURRENT_DATE,
  log_time TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_water_logs_user_date ON public.water_logs(user_id, log_date);

ALTER TABLE public.water_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own water logs" ON public.water_logs
  FOR ALL USING (auth.uid() = user_id);
```

### 8.9 Tabel: `achievements`
```sql
-- Migration: 009_create_achievements.sql
CREATE TABLE public.achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  icon VARCHAR(50),
  category VARCHAR(30) CHECK (category IN (
    'consistency', 'weight', 'nutrition', 'hydration', 'milestone'
  )),
  points INT DEFAULT 10,
  condition_type VARCHAR(50), -- e.g. 'streak_days', 'weight_lost_kg'
  condition_value DECIMAL(10,2),
  badge_image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.user_achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  achievement_id UUID NOT NULL REFERENCES public.achievements(id),
  earned_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, achievement_id)
);

ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Achievements viewable by all" ON public.achievements FOR SELECT USING (TRUE);

ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own achievements" ON public.user_achievements
  FOR ALL USING (auth.uid() = user_id);
```

### 8.10 Tabel: `push_subscriptions`
```sql
-- Migration: 010_create_push_subscriptions.sql
CREATE TABLE public.push_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  endpoint TEXT NOT NULL UNIQUE,
  p256dh TEXT NOT NULL,
  auth TEXT NOT NULL,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.push_subscriptions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own push subscriptions" ON public.push_subscriptions
  FOR ALL USING (auth.uid() = user_id);
```

### 8.11 Tabel: `weekly_reports`
```sql
-- Migration: 011_create_weekly_reports.sql
CREATE TABLE public.weekly_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  week_start_date DATE NOT NULL,
  week_end_date DATE NOT NULL,
  avg_calories DECIMAL(8,2),
  avg_protein_g DECIMAL(8,2),
  avg_carbs_g DECIMAL(8,2),
  avg_fat_g DECIMAL(8,2),
  avg_water_ml DECIMAL(8,2),
  weight_start_kg DECIMAL(5,2),
  weight_end_kg DECIMAL(5,2),
  weight_change_kg DECIMAL(5,2),
  total_days_logged INT DEFAULT 0,
  consistency_score INT, -- 0-100
  nutrition_score INT, -- 0-100
  overall_score INT, -- 0-100
  summary_text TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, week_start_date)
);

ALTER TABLE public.weekly_reports ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own weekly reports" ON public.weekly_reports
  FOR ALL USING (auth.uid() = user_id);
```

### 8.12 Tabel: `favorite_foods`
```sql
-- Migration: 012_create_favorite_foods.sql
CREATE TABLE public.favorite_foods (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  food_id UUID NOT NULL REFERENCES public.food_database(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, food_id)
);

ALTER TABLE public.favorite_foods ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage own favorites" ON public.favorite_foods
  FOR ALL USING (auth.uid() = user_id);
```

---

## 9. Data Seed (Data Awal Testing)

### 9.1 Seed: Achievements Data
```sql
-- File: supabase/seed.sql (bagian 1)
INSERT INTO public.achievements (code, name, description, icon, category, points, condition_type, condition_value) VALUES
('FIRST_LOG', 'Langkah Pertama', 'Log makanan pertama kali', '🎯', 'milestone', 10, 'total_food_logs', 1),
('STREAK_3', 'Konsisten 3 Hari', 'Log makanan 3 hari berturut-turut', '🔥', 'consistency', 20, 'streak_days', 3),
('STREAK_7', 'Seminggu Penuh', 'Log makanan 7 hari berturut-turut', '💪', 'consistency', 50, 'streak_days', 7),
('STREAK_30', 'Warrior Sehat', 'Log makanan 30 hari berturut-turut', '🏆', 'consistency', 200, 'streak_days', 30),
('WATER_WEEK', 'Terhidrasi', 'Minum 8 gelas per hari selama 7 hari', '💧', 'hydration', 30, 'water_streak_days', 7),
('WEIGHT_LOST_1', 'Turun 1 KG', 'Berhasil turun 1 kg dari berat awal', '⬇️', 'weight', 50, 'weight_lost_kg', 1),
('WEIGHT_LOST_5', 'Turun 5 KG', 'Berhasil turun 5 kg dari berat awal', '🎉', 'weight', 200, 'weight_lost_kg', 5),
('WEIGHT_GAIN_1', 'Naik 1 KG', 'Berhasil naik 1 kg dari berat awal', '📈', 'weight', 50, 'weight_gained_kg', 1),
('PROTEIN_WEEK', 'Protein Champion', 'Capai target protein 7 hari berturut', '🥩', 'nutrition', 40, 'protein_streak_days', 7),
('BALANCED_DAY', 'Nutrisi Seimbang', 'Semua makro dalam target dalam 1 hari', '⚖️', 'nutrition', 30, 'balanced_days', 1),
('FIRST_MEAL_PLAN', 'Perencana Handal', 'Buat meal plan pertama kali', '📅', 'milestone', 15, 'total_meal_plans', 1),
('TARGET_REACHED', 'Target Tercapai!', 'Mencapai berat badan target', '🏅', 'milestone', 500, 'target_reached', 1);
```

### 9.2 Seed: Database Makanan Indonesia
```sql
-- File: supabase/seed.sql (bagian 2)
INSERT INTO public.food_database (
  name, name_en, category, sub_category, serving_unit, serving_size_g,
  calories, protein_g, carbohydrates_g, fat_g, fiber_g, sugar_g, sodium_mg,
  is_indonesian, tags
) VALUES
-- === NASI & KARBOHIDRAT ===
('Nasi Putih', 'White Rice', 'lunch', 'nasi', 'centong', 100, 175, 3.3, 38.9, 0.3, 0.3, 0, 5, TRUE, ARRAY['nasi','karbohidrat','pokok']),
('Nasi Merah', 'Brown Rice', 'lunch', 'nasi', 'centong', 100, 165, 3.5, 34.0, 1.8, 1.8, 0.7, 5, TRUE, ARRAY['nasi','sehat','serat tinggi']),
('Nasi Goreng', 'Fried Rice', 'breakfast', 'nasi', 'porsi', 200, 340, 8.0, 56.0, 10.0, 1.5, 2.0, 650, TRUE, ARRAY['nasi','goreng','populer']),
('Bubur Ayam', 'Chicken Porridge', 'breakfast', 'bubur', 'mangkuk', 300, 250, 12.0, 35.0, 7.0, 0.5, 1.0, 580, TRUE, ARRAY['bubur','ayam','sarapan']),
('Roti Tawar', 'White Bread', 'breakfast', 'roti', 'lembar', 30, 77, 2.5, 14.8, 0.9, 0.4, 1.2, 135, FALSE, ARRAY['roti','sarapan']),
('Roti Gandum', 'Whole Wheat Bread', 'breakfast', 'roti', 'lembar', 30, 70, 3.0, 12.0, 1.0, 2.0, 0.8, 120, FALSE, ARRAY['roti','sehat','gandum']),
('Kentang Rebus', 'Boiled Potato', 'lunch', 'karbohidrat', 'buah', 150, 117, 2.5, 26.7, 0.1, 2.3, 1.2, 10, FALSE, ARRAY['kentang','rendah lemak']),
('Oatmeal', 'Oatmeal', 'breakfast', 'sereal', 'porsi', 80, 290, 10.7, 51.0, 5.0, 8.0, 0.5, 5, FALSE, ARRAY['oat','sarapan','sehat','serat']),
('Ubi Jalar', 'Sweet Potato', 'snack', 'karbohidrat', 'buah', 130, 112, 2.0, 26.2, 0.1, 5.4, 5.4, 41, TRUE, ARRAY['ubi','sehat','anti-inflamasi']),

-- === PROTEIN HEWANI ===
('Dada Ayam Panggang', 'Grilled Chicken Breast', 'lunch', 'lauk', 'potong', 100, 165, 31.0, 0, 3.6, 0, 0, 74, TRUE, ARRAY['ayam','protein tinggi','diet']),
('Telur Rebus', 'Boiled Egg', 'breakfast', 'lauk', 'butir', 60, 90, 7.9, 0.6, 6.3, 0, 0.6, 71, FALSE, ARRAY['telur','protein','mudah']),
('Telur Dadar', 'Omelette', 'breakfast', 'lauk', 'porsi', 120, 185, 12.0, 2.0, 14.0, 0, 1.0, 350, TRUE, ARRAY['telur','dadar','sarapan']),
('Ikan Salmon', 'Salmon', 'dinner', 'lauk', 'fillet', 120, 235, 25.0, 0, 15.0, 0, 0, 59, FALSE, ARRAY['ikan','omega3','sehat']),
('Ikan Tuna Kaleng', 'Canned Tuna', 'lunch', 'lauk', 'kaleng kecil', 80, 100, 22.0, 0, 1.0, 0, 0, 290, FALSE, ARRAY['tuna','protein tinggi','praktis']),
('Tempe Goreng', 'Fried Tempeh', 'lunch', 'lauk', 'potong', 50, 108, 7.5, 8.0, 5.5, 1.8, 0, 5, TRUE, ARRAY['tempe','protein nabati','fermentasi']),
('Tahu Goreng', 'Fried Tofu', 'lunch', 'lauk', 'potong', 80, 110, 7.2, 4.5, 7.0, 0.5, 0.5, 10, TRUE, ARRAY['tahu','protein nabati','vegan']),
('Daging Sapi Rendang', 'Beef Rendang', 'dinner', 'lauk', 'porsi', 100, 295, 25.0, 6.0, 18.0, 1.0, 2.0, 450, TRUE, ARRAY['rendang','sapi','tradisional']),
('Udang Rebus', 'Boiled Shrimp', 'dinner', 'lauk', 'porsi', 100, 99, 24.0, 0.2, 0.3, 0, 0, 111, FALSE, ARRAY['udang','protein rendah lemak']),

-- === SAYURAN ===
('Bayam Rebus', 'Boiled Spinach', 'lunch', 'sayur', 'porsi', 100, 23, 2.9, 3.6, 0.4, 2.2, 0.4, 70, TRUE, ARRAY['sayur','zat besi','hijau']),
('Brokoli Kukus', 'Steamed Broccoli', 'lunch', 'sayur', 'porsi', 100, 34, 2.8, 6.6, 0.4, 2.6, 1.7, 33, FALSE, ARRAY['brokoli','vitamin C','antioksidan']),
('Kangkung Tumis', 'Stir-fried Water Spinach', 'lunch', 'sayur', 'porsi', 100, 25, 3.0, 3.1, 0.3, 2.1, 0.9, 113, TRUE, ARRAY['kangkung','sayur','Indonesia']),
('Wortel Rebus', 'Boiled Carrot', 'lunch', 'sayur', 'porsi', 80, 35, 0.8, 8.2, 0.2, 2.3, 4.7, 58, FALSE, ARRAY['wortel','vitamin A','serat']),
('Timun', 'Cucumber', 'snack', 'sayur', 'buah', 100, 15, 0.7, 3.6, 0.1, 0.5, 1.7, 2, FALSE, ARRAY['timun','hidrasi','rendah kalori']),
('Tomat', 'Tomato', 'snack', 'sayur', 'buah', 100, 18, 0.9, 3.9, 0.2, 1.2, 2.6, 5, FALSE, ARRAY['tomat','lycopene','antioksidan']),

-- === BUAH-BUAHAN ===
('Pisang', 'Banana', 'snack', 'buah', 'buah', 120, 107, 1.3, 27.2, 0.4, 3.1, 14.4, 1, TRUE, ARRAY['pisang','energi','kalium']),
('Apel', 'Apple', 'snack', 'buah', 'buah', 182, 95, 0.5, 25.1, 0.3, 4.4, 18.9, 2, FALSE, ARRAY['apel','serat','vitamin C']),
('Jeruk', 'Orange', 'snack', 'buah', 'buah', 130, 62, 1.2, 15.4, 0.2, 3.1, 12.2, 0, TRUE, ARRAY['jeruk','vitamin C','imun']),
('Mangga', 'Mango', 'snack', 'buah', 'buah', 200, 135, 1.1, 35.2, 0.6, 3.7, 30.6, 3, TRUE, ARRAY['mangga','vitamin A','tropis']),
('Pepaya', 'Papaya', 'snack', 'buah', 'potong', 150, 59, 0.9, 14.9, 0.4, 2.3, 9.0, 11, TRUE, ARRAY['pepaya','pencernaan','vitamin C']),
('Alpukat', 'Avocado', 'snack', 'buah', 'buah', 200, 320, 4.0, 17.0, 29.5, 13.5, 1.3, 14, FALSE, ARRAY['alpukat','lemak sehat','omega9']),
('Stroberi', 'Strawberry', 'snack', 'buah', 'porsi', 100, 32, 0.7, 7.7, 0.3, 2.0, 4.9, 1, FALSE, ARRAY['stroberi','antioksidan','vitamin C']),

-- === MAKANAN POPULER INDONESIA ===
('Soto Ayam', 'Chicken Soto', 'lunch', 'sup', 'mangkuk', 350, 285, 18.0, 25.0, 12.0, 2.0, 3.0, 650, TRUE, ARRAY['soto','ayam','tradisional','sup']),
('Gado-Gado', 'Gado-gado', 'lunch', 'salad', 'porsi', 250, 320, 12.5, 30.0, 17.5, 5.5, 5.0, 480, TRUE, ARRAY['gado-gado','sehat','sayur','kacang']),
('Pecel', 'Pecel', 'lunch', 'salad', 'porsi', 250, 280, 10.0, 32.0, 13.0, 5.0, 4.0, 420, TRUE, ARRAY['pecel','sayur','kacang','jawa']),
('Bakso', 'Meatball Soup', 'lunch', 'sup', 'mangkuk', 300, 310, 18.0, 28.0, 14.0, 1.0, 2.0, 750, TRUE, ARRAY['bakso','sapi','populer']),
('Mie Goreng', 'Fried Noodles', 'lunch', 'mie', 'porsi', 200, 380, 10.0, 55.0, 14.0, 2.0, 5.0, 850, TRUE, ARRAY['mie','goreng','populer']),
('Ketoprak', 'Ketoprak', 'lunch', 'salad', 'porsi', 300, 330, 14.0, 42.0, 12.0, 4.5, 6.0, 510, TRUE, ARRAY['ketoprak','tahu','ketupat','jakarta']),
('Siomay', 'Siomay', 'snack', 'jajanan', 'porsi', 200, 280, 15.0, 30.0, 10.0, 2.0, 3.0, 520, TRUE, ARRAY['siomay','ikan','bandung']),
('Lontong Sayur', 'Vegetable Lontong', 'breakfast', 'nasi', 'porsi', 350, 320, 9.0, 52.0, 8.0, 4.0, 3.5, 580, TRUE, ARRAY['lontong','sayur','sarapan','padang']),

-- === MINUMAN SEHAT ===
('Air Putih', 'Water', 'drink', 'air', 'gelas', 250, 0, 0, 0, 0, 0, 0, 0, FALSE, ARRAY['air','hidrasi']),
('Susu Skim', 'Skim Milk', 'breakfast', 'minuman', 'gelas', 250, 83, 8.5, 12.0, 0.2, 0, 12.0, 130, FALSE, ARRAY['susu','protein','kalsium']),
('Susu Full Cream', 'Full Cream Milk', 'breakfast', 'minuman', 'gelas', 250, 150, 8.0, 11.7, 8.0, 0, 12.0, 107, FALSE, ARRAY['susu','kalsium','lemak']),
('Jus Jeruk Segar', 'Fresh Orange Juice', 'breakfast', 'minuman', 'gelas', 250, 112, 1.7, 26.0, 0.5, 0.5, 20.8, 2, FALSE, ARRAY['jus','vitamin C','segar']),
('Teh Tanpa Gula', 'Unsweetened Tea', 'drink', 'minuman', 'gelas', 250, 2, 0, 0.5, 0, 0, 0, 7, TRUE, ARRAY['teh','antioksidan','rendah kalori']),
('Kopi Hitam', 'Black Coffee', 'breakfast', 'minuman', 'cangkir', 200, 5, 0.3, 0.7, 0, 0, 0, 5, TRUE, ARRAY['kopi','kafein','energi']),
('Smoothie Pisang', 'Banana Smoothie', 'breakfast', 'minuman', 'gelas', 300, 195, 5.0, 42.0, 2.5, 3.5, 22.0, 55, FALSE, ARRAY['smoothie','pisang','energi']),
('Yakult', 'Yakult', 'snack', 'minuman', 'botol', 65, 50, 0.8, 11.6, 0, 0, 10.5, 16, FALSE, ARRAY['probiotik','pencernaan']),

-- === CEMILAN SEHAT ===
('Kacang Almond', 'Almond', 'snack', 'kacang', 'genggam', 30, 173, 6.0, 6.1, 14.9, 3.5, 1.4, 0, FALSE, ARRAY['kacang','lemak sehat','protein']),
('Kacang Edamame', 'Edamame', 'snack', 'kacang', 'porsi', 100, 121, 11.9, 8.9, 5.2, 5.2, 2.2, 6, FALSE, ARRAY['edamame','protein nabati','serat']),
('Granola Bar', 'Granola Bar', 'snack', 'sereal', 'buah', 40, 180, 3.5, 29.0, 7.0, 1.5, 12.0, 65, FALSE, ARRAY['granola','energi','serat']),
('Greek Yogurt', 'Greek Yogurt', 'snack', 'dairy', 'cup', 150, 100, 17.0, 6.0, 0.7, 0, 5.0, 65, FALSE, ARRAY['yogurt','protein','probiotik']),
('Biskuit Gandum', 'Whole Grain Crackers', 'snack', 'snack', 'bungkus', 30, 120, 3.0, 22.0, 2.5, 2.0, 2.0, 150, FALSE, ARRAY['biskuit','gandum','serat']);
```

### 9.3 Seed: Sample Meal Schedules
```sql
-- File: supabase/seed.sql (bagian 3)
-- NOTE: Ini untuk testing — user_id diisi manual atau via trigger

-- Default schedule template (inserted saat onboarding selesai via trigger/function)
CREATE OR REPLACE FUNCTION create_default_meal_schedule(p_user_id UUID)
RETURNS VOID AS $$
BEGIN
  INSERT INTO public.meal_schedules (user_id, meal_type, scheduled_time, reminder_enabled, reminder_minutes_before, custom_message)
  VALUES
    (p_user_id, 'breakfast',        '07:00:00', TRUE, 15, 'Waktunya sarapan! Mulai hari dengan baik 🌅'),
    (p_user_id, 'morning_snack',    '10:00:00', TRUE, 10, 'Snack pagi dulu yuk! 🍎'),
    (p_user_id, 'lunch',            '12:30:00', TRUE, 15, 'Makan siang! Jangan sampai terlambat 🍽️'),
    (p_user_id, 'afternoon_snack',  '15:30:00', TRUE, 10, 'Saatnya cemilan sore 🥜'),
    (p_user_id, 'dinner',           '19:00:00', TRUE, 15, 'Makan malam sehat nih! 🌙'),
    (p_user_id, 'late_snack',       '21:00:00', FALSE, 10, 'Snack malam (opsional)')
  ON CONFLICT (user_id, meal_type) DO NOTHING;
END;
$$ LANGUAGE plpgsql;
```

### 9.4 Seed: Test User Profiles
```sql
-- File: supabase/seed.sql (bagian 4 — hanya untuk environment dev/testing)
-- Jalankan SETELAH membuat user di auth.users atau gunakan Supabase Dashboard

-- Contoh update profile test user (ganti UUID dengan actual user id dari auth.users)
/*
UPDATE public.profiles SET
  full_name = 'Test User - Diet',
  date_of_birth = '1995-05-15',
  gender = 'male',
  height_cm = 170,
  current_weight_kg = 85,
  target_weight_kg = 75,
  activity_level = 'lightly_active',
  goal_type = 'lose_weight',
  target_calories = 1800,
  target_protein_g = 135,
  target_carbs_g = 180,
  target_fat_g = 60,
  target_fiber_g = 25,
  target_water_ml = 2500,
  diet_type = 'omnivore',
  weekly_weight_goal_kg = -0.5,
  bmr = 1890,
  tdee = 2268,
  onboarding_completed = TRUE
WHERE id = 'YOUR-TEST-USER-UUID';
*/
```

---

## 10. Desain UI/UX & Animasi

### 10.1 Design System

#### Palet Warna
```typescript
// tailwind.config.ts
const colors = {
  primary: {
    50: '#f0fdf4',   // Mint sangat terang
    100: '#dcfce7',
    500: '#22c55e',  // Hijau segar (utama)
    600: '#16a34a',
    700: '#15803d',
    900: '#14532d',
  },
  secondary: {
    500: '#3b82f6',  // Biru energi
    600: '#2563eb',
  },
  accent: {
    orange: '#f97316',   // Kalori/energi
    purple: '#a855f7',   // Progress/achievement
    yellow: '#eab308',   // Warning/snack
  },
  surface: {
    light: '#f8fafc',
    dark: '#0f172a',
    card: '#ffffff',
    'card-dark': '#1e293b',
  }
}
```

#### Typography
```typescript
fontFamily: {
  sans: ['Nunito', 'Inter', 'system-ui'],
  heading: ['Poppins', 'sans-serif'],
  mono: ['JetBrains Mono', 'monospace'],
}
```

### 10.2 Framer Motion Variants

```typescript
// src/animations/variants.ts

export const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
}

export const cardVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] } },
  hover: { scale: 1.02, transition: { duration: 0.2 } },
  tap: { scale: 0.98 }
}

export const staggerChildren = {
  animate: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
}

export const slideFromBottom = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
}

export const numberCounter = {
  initial: { opacity: 0 },
  animate: { opacity: 1 }
  // Paired dengan useSpring dari Framer Motion untuk counter animasi
}
```

### 10.3 Three.js 3D Components

#### Komponen yang Menggunakan 3D

| Komponen | Deskripsi |
|----------|-----------|
| `<SplashLogo3D />` | Logo animasi 3D pada splash screen |
| `<CalorieRing3D />` | Ring kalori 3D interaktif di dashboard |
| `<BMIGauge3D />` | Gauge meter BMI dengan jarum berputar |
| `<WaterBottle3D />` | Botol air animasi mengisi sesuai intake |
| `<TrophyScene3D />` | Trofi berputar saat achievement unlock |
| `<FoodParticle3D />` | Partikel makanan terbang saat add food log |
| `<ProgressOrb3D />` | Orb energi yang bergerak sesuai progress |

```typescript
// Contoh: src/components/3d/CalorieRing3D.tsx
import { Canvas, useFrame } from '@react-three/fiber'
import { Torus, MeshDistortMaterial, Float } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'

interface CalorieRingProps {
  percentage: number // 0-100
  color: string
}

function Ring({ percentage, color }: CalorieRingProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.getElapsedTime() * 0.3
    }
  })
  
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Torus ref={meshRef} args={[1, 0.15, 64, 200, (percentage / 100) * Math.PI * 2]}>
        <MeshDistortMaterial color={color} distort={0.1} speed={2} roughness={0} metalness={0.8} />
      </Torus>
    </Float>
  )
}

export function CalorieRing3D({ consumed, target }: { consumed: number; target: number }) {
  const percentage = Math.min((consumed / target) * 100, 100)
  const color = percentage < 80 ? '#22c55e' : percentage < 100 ? '#eab308' : '#ef4444'
  
  return (
    <Canvas camera={{ position: [0, 0, 3] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Ring percentage={percentage} color={color} />
    </Canvas>
  )
}
```

### 10.4 Animasi Khusus

- **Page Transition**: Setiap perpindahan halaman menggunakan `AnimatePresence` Framer Motion
- **Gesture Animations**: Swipe-to-delete dengan `drag="x"` dan `dragConstraints`
- **Scroll Animations**: Section muncul saat di-scroll dengan `useInView`
- **Number Counter**: Angka kalori/berat berubah dengan animasi `useSpring`
- **Ripple Effect**: Button tap effect seperti Material Design
- **Skeleton Loading**: Animated skeleton saat data loading (shimmer effect)
- **Pull-to-Refresh**: Animasi tarik ke bawah untuk refresh data (mobile)
- **Confetti**: Saat achievement unlock atau target tercapai

---

## 11. PWA Configuration

### 11.1 `manifest.json`
```json
{
  "name": "NutriTrack - Aplikasi Kesehatan",
  "short_name": "NutriTrack",
  "description": "Kelola pola makan sehat, turun/naik berat badan dengan cerdas",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0f172a",
  "theme_color": "#22c55e",
  "orientation": "portrait-primary",
  "lang": "id",
  "categories": ["health", "fitness", "food"],
  "icons": [
    { "src": "/icons/icon-72x72.png", "sizes": "72x72", "type": "image/png" },
    { "src": "/icons/icon-96x96.png", "sizes": "96x96", "type": "image/png" },
    { "src": "/icons/icon-128x128.png", "sizes": "128x128", "type": "image/png" },
    { "src": "/icons/icon-144x144.png", "sizes": "144x144", "type": "image/png" },
    { "src": "/icons/icon-152x152.png", "sizes": "152x152", "type": "image/png" },
    { "src": "/icons/icon-192x192.png", "sizes": "192x192", "type": "image/png", "purpose": "any maskable" },
    { "src": "/icons/icon-384x384.png", "sizes": "384x384", "type": "image/png" },
    { "src": "/icons/icon-512x512.png", "sizes": "512x512", "type": "image/png", "purpose": "any maskable" }
  ],
  "screenshots": [
    { "src": "/screenshots/dashboard-mobile.png", "sizes": "390x844", "type": "image/png", "form_factor": "narrow" },
    { "src": "/screenshots/dashboard-desktop.png", "sizes": "1280x720", "type": "image/png", "form_factor": "wide" }
  ],
  "shortcuts": [
    { "name": "Log Makan Sekarang", "short_name": "Log Makan", "description": "Catat makanan sekarang", "url": "/food-log?quick=true", "icons": [{ "src": "/icons/shortcut-food.png", "sizes": "96x96" }] },
    { "name": "Catat Berat Badan", "short_name": "Catat BB", "description": "Input berat badan hari ini", "url": "/weight?quick=true", "icons": [{ "src": "/icons/shortcut-weight.png", "sizes": "96x96" }] }
  ]
}
```

### 11.2 Vite PWA Config
```typescript
// vite.config.ts
import { VitePWA } from 'vite-plugin-pwa'

export default {
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/.*supabase\.co\/storage/,
            handler: 'CacheFirst',
            options: { cacheName: 'supabase-storage', expiration: { maxAgeSeconds: 7 * 24 * 60 * 60 } }
          },
          {
            urlPattern: /^https:\/\/.*supabase\.co\/rest/,
            handler: 'NetworkFirst',
            options: { cacheName: 'supabase-api', networkTimeoutSeconds: 5 }
          }
        ]
      },
      manifest: { /* dari manifest.json di atas */ }
    })
  ]
}
```

---

## 12. Notifikasi & Scheduling

### 12.1 Web Push Notification Flow

```
User → Enable Notifications → Browser Permission Dialog
       ↓
Browser API → Generate Push Subscription (endpoint, p256dh, auth)
       ↓
Frontend → POST ke Supabase Edge Function → Simpan ke push_subscriptions tabel
       ↓
Cron Job (setiap 15 menit) → Edge Function send-meal-reminder
       ↓
Query: meal_schedules WHERE scheduled_time BETWEEN NOW() AND NOW() + 15min
       ↓
Untuk setiap user yang match → Send Web Push Notification
       ↓
Browser SW → Show Notification dengan action button ["✅ Sudah Makan", "⏰ Ingatkan Lagi"]
```

### 12.2 Notification Types

| Type | Trigger | Isi Notifikasi |
|------|---------|----------------|
| Meal Reminder | 15 menit sebelum jadwal makan | "Waktunya [Sarapan]! 🌅 Klik untuk log makanan" |
| Water Reminder | Setiap 2 jam (jika aktif) | "Sudah minum air? Targetmu 8 gelas hari ini 💧" |
| Streak Alert | Pukul 20:00 jika belum log | "Jangan putus streak-mu! Log makan malam sekarang 🔥" |
| Achievement | Real-time saat unlock | "🏆 Achievement unlocked: [nama achievement]!" |
| Weekly Report | Setiap Minggu pukul 08:00 | "Laporan mingguanmu sudah siap! Lihat progress-mu 📊" |

### 12.3 In-App Notification Center

- Bell icon di header dengan badge count
- Drawer notifikasi dari kanan (mobile: full-width dari bawah)
- Kategori: semua, belum dibaca, makan, achievement
- Mark as read / delete per notifikasi
- Clear all button

---

## 13. Keamanan & Autentikasi

### 13.1 JWT & Session Management
- Supabase Auth mengelola JWT secara otomatis
- Access token refresh otomatis (expire: 1 jam)
- Refresh token: 7 hari
- Session tersimpan di localStorage (managed by Supabase JS client)

### 13.2 Row Level Security (RLS)
- **WAJIB** aktif di semua tabel user data
- Setiap tabel memiliki policy: `auth.uid() = user_id`
- Admin/Edge Functions menggunakan service role key (tidak di expose ke client)

### 13.3 Input Validation
- Frontend: Zod schema validation sebelum submit
- Backend: Supabase constraints (CHECK, NOT NULL, FOREIGN KEY)
- Sanitasi input teks: strip XSS di Edge Functions

### 13.4 Rate Limiting
- Supabase Auth sudah memiliki built-in rate limiting
- Edge Functions: tambahkan rate limiting header check
- Frontend: debounce pada search & form submit

### 13.5 HTTPS & CORS
- Vercel auto-HTTPS
- Supabase CORS: whitelist domain production saja
- Environment variables: NEVER hardcode credentials

---

## 14. Storage (Supabase Bucket)

### 14.1 Bucket Structure

```
supabase-storage/
├── avatars/                        # Bucket: "avatars" (public)
│   └── {user_id}/
│       └── avatar.{jpg|png|webp}
├── food-photos/                    # Bucket: "food-photos" (public)
│   ├── default/                    # Foto makanan default dari seed
│   │   └── {food-slug}.webp
│   └── user/
│       └── {user_id}/
│           └── {uuid}.{ext}
├── progress-photos/                # Bucket: "progress-photos" (private)
│   └── {user_id}/
│       └── {date}-{uuid}.{ext}
└── exports/                        # Bucket: "exports" (private, auto-delete 24h)
    └── {user_id}/
        └── report-{date}.pdf
```

### 14.2 Bucket Policies

```sql
-- Bucket: avatars (PUBLIC READ, user hanya bisa upload miliknya sendiri)
CREATE POLICY "Avatar public read" ON storage.objects
  FOR SELECT USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload own avatar" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'avatars' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can update own avatar" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'avatars' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Bucket: progress-photos (PRIVATE — hanya user sendiri)
CREATE POLICY "Users can manage own progress photos" ON storage.objects
  FOR ALL USING (
    bucket_id = 'progress-photos' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );
```

### 14.3 File Upload Constraints

| Bucket | Max Size | Format | Otomatis Resize |
|--------|----------|--------|----------------|
| avatars | 2 MB | jpg, png, webp | Ya, ke 200x200 |
| food-photos | 5 MB | jpg, png, webp | Ya, ke 800x600 |
| progress-photos | 10 MB | jpg, png, heic | Tidak |
| exports | 10 MB | pdf | Tidak |

---

## 15. Deployment & Environment

### 15.1 Environment Variables

```env
# .env.production (Vercel Environment Variables)

# Supabase
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here

# Web Push (VAPID keys)
VITE_VAPID_PUBLIC_KEY=your_vapid_public_key

# App Config
VITE_APP_NAME=NutriTrack
VITE_APP_URL=https://nutritrack.vercel.app
VITE_APP_ENV=production

# Supabase Edge Functions (simpan di Supabase Dashboard > Settings > Secrets)
# SUPABASE_SERVICE_ROLE_KEY=your_service_role_key (JANGAN di frontend!)
# VAPID_PRIVATE_KEY=your_vapid_private_key
```

### 15.2 `vercel.json`
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ],
  "headers": [
    {
      "source": "/service-worker.js",
      "headers": [
        { "key": "Cache-Control", "value": "no-cache" },
        { "key": "Service-Worker-Allowed", "value": "/" }
      ]
    },
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" }
      ]
    }
  ]
}
```

### 15.3 Panduan Deploy ke Vercel

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Login
vercel login

# 3. Link project
vercel link

# 4. Set environment variables
vercel env add VITE_SUPABASE_URL production
vercel env add VITE_SUPABASE_ANON_KEY production
vercel env add VITE_VAPID_PUBLIC_KEY production

# 5. Deploy
vercel --prod

# Atau push ke GitHub dan auto-deploy via Vercel GitHub Integration
```

### 15.4 Supabase Setup

```bash
# Install Supabase CLI
npm install -g supabase

# Login
supabase login

# Link ke project
supabase link --project-ref your-project-ref

# Jalankan migrasi
supabase db push

# Jalankan seed
supabase db seed --file supabase/seed.sql

# Deploy Edge Functions
supabase functions deploy send-meal-reminder
supabase functions deploy calculate-daily-nutrition
supabase functions deploy generate-weekly-report
supabase functions deploy calculate-tdee
supabase functions deploy recommend-foods
```

---

## 16. Testing & QA

### 16.1 Unit Testing (Vitest)

| Modul | Test Cases |
|-------|------------|
| `calculateBMR()` | Laki-laki/perempuan, edge case berat 0 |
| `calculateTDEE()` | 5 level aktivitas |
| `calculateCalorieTarget()` | 3 goal types |
| `calculateMacroSplit()` | Ratio validasi |
| `formatNutrition()` | Unit conversion |

### 16.2 Integration Testing

- Supabase auth flow (login, register, logout)
- Food log CRUD
- Meal schedule CRUD
- Weight log + BMI calculation
- Push subscription save & delete

### 16.3 E2E Testing (Playwright)

- Onboarding flow lengkap (guest → setup profil)
- Log makanan → lihat perubahan dashboard
- Set jadwal makan → receive notification
- Track berat badan → lihat grafik

### 16.4 Performance Budget

| Metric | Target |
|--------|--------|
| LCP (Largest Contentful Paint) | < 2.5s |
| FID (First Input Delay) | < 100ms |
| CLS (Cumulative Layout Shift) | < 0.1 |
| TTI (Time to Interactive) | < 4s |
| Bundle size (gzipped) | < 500KB initial |
| Lighthouse PWA Score | > 90 |
| Lighthouse Performance | > 85 |

---

## 17. Roadmap & Milestone

### Phase 1 — MVP (Bulan 1–2)
- [ ] Setup project, Supabase, autentikasi
- [ ] **Landing Page** lengkap dengan animasi 3D hero
- [ ] **Halaman Login & Register** dengan Google OAuth + validasi lengkap
- [ ] **Self-Service Onboarding Wizard** (6 step)
- [ ] **Dark Mode & Light Mode** dengan theme toggle
- [ ] Database makanan Indonesia (50+ item)
- [ ] Log makanan harian (CRUD)
- [ ] Dashboard kalori & makro dasar
- [ ] PWA install & service worker
- [ ] Notifikasi jadwal makan dasar

### Phase 2 — Core Features (Bulan 2–3)
- [ ] Tracking berat badan + grafik
- [ ] Meal plan mingguan
- [ ] Analisis nutrisi lengkap
- [ ] Hydration tracker
- [ ] 3D animasi (ring kalori, BMI gauge)
- [ ] Achievement system (12 badge)
- [ ] Upload foto makanan & progress

### Phase 3 — Advanced (Bulan 3–4)
- [ ] Generator meal plan otomatis
- [ ] Laporan mingguan otomatis
- [ ] Rekomendasi makanan cerdas
- [ ] Export PDF laporan
- [ ] Before/after gallery
- [ ] Landing page SEO & meta tag optimization
- [ ] First-time dashboard experience (tooltip coach)
- [ ] Grocery list generator

### Phase 4 — Polish & Launch (Bulan 4)
- [ ] Performance optimization
- [ ] Full E2E testing
- [ ] Onboarding UX polish
- [ ] 3D animasi semua komponen
- [ ] App Store screenshots
- [ ] Launch & monitoring

---

## 18. Landing Page

Landing page adalah halaman publik pertama yang dilihat oleh calon pengguna sebelum mendaftar. Halaman ini berfungsi sebagai marketing page sekaligus pintu masuk ke aplikasi, dirancang untuk membangun kepercayaan dan mendorong konversi (sign up).

### 18.1 Tujuan Landing Page

| Tujuan | Deskripsi |
|--------|-----------|
| Awareness | Memperkenalkan NutriTrack kepada calon pengguna baru |
| Conversion | Mendorong pengunjung untuk daftar / mulai gratis |
| Trust | Menampilkan fitur unggulan, testimoni, dan social proof |
| SEO | Halaman statis yang terindeks mesin pencari |

### 18.2 Struktur Halaman (Sections)

#### LP-001: Hero Section
- **Headline utama** — kalimat singkat, impactful: *"Makan Sehat. Tubuh Ideal. Hidup Lebih Baik."*
- **Sub-headline** — deskripsi singkat manfaat aplikasi (1–2 kalimat)
- **CTA Button utama** — "Mulai Gratis Sekarang" → arahkan ke `/register`
- **CTA Button sekunder** — "Lihat Demo" → scroll ke section fitur atau buka modal preview
- **Visual Hero** — animasi 3D interaktif (Three.js): ilustrasi makanan sehat melayang mengelilingi cincin kalori yang berputar; user bisa rotate dengan mouse/touch
- **Social Proof Cepat** — "Dipercaya oleh 10.000+ pengguna aktif" dengan counter animasi naik

#### LP-002: Features Highlight Section
- **Judul section**: "Semua yang Kamu Butuhkan untuk Hidup Sehat"
- Tampil 6 kartu fitur utama dalam grid 2×3 (mobile: 1 kolom, tablet: 2 kolom, desktop: 3 kolom)
- Setiap kartu memiliki: icon animasi (Lottie/SVG), judul fitur, deskripsi singkat
- Kartu muncul dengan animasi stagger saat masuk viewport (Framer Motion `useInView`)

| No | Icon | Fitur | Deskripsi Singkat |
|----|------|-------|-------------------|
| 1 | 🍽️ | Log Makan Mudah | Catat makanan dalam hitungan detik dari database 500+ menu Indonesia |
| 2 | ⚖️ | Tracking Berat Badan | Pantau perubahan berat dengan grafik interaktif dan prediksi cerdas |
| 3 | 🔔 | Reminder Jadwal Makan | Notifikasi tepat waktu agar tidak melewatkan satu sesi makan pun |
| 4 | 📊 | Analisis Nutrisi Lengkap | Breakdown kalori, protein, karbo, lemak, vitamin, dan mineral harian |
| 5 | 🎯 | Program Personal | Diet defisit, bulking sehat, atau sekadar makan teratur — semua ada |
| 6 | 🏆 | Achievement & Streak | Tetap termotivasi dengan sistem badge dan streak harian |

#### LP-003: How It Works Section
- **Judul**: "Cara Kerja NutriTrack"
- Tampil 4 langkah berurutan dengan animasi garis penghubung antar step (seperti timeline)
- Step 1 → Step 2 → … dihubungkan garis animasi draw-in (SVG stroke animation)

| Step | Icon | Judul | Deskripsi |
|------|------|-------|-----------|
| 1 | 📝 | Buat Akun | Daftar gratis dalam 30 detik, tidak perlu kartu kredit |
| 2 | 🎯 | Atur Tujuan | Pilih program: turun BB, naik BB, atau pola makan sehat |
| 3 | 🍱 | Catat Makanan | Log makanan harianmu dari database lengkap atau tambah manual |
| 4 | 📈 | Lihat Progress | Pantau perkembangan dengan grafik dan laporan mingguan otomatis |

#### LP-004: Goal Selector Section (Interaktif)
- **Judul**: "Pilih Tujuanmu"
- 3 tab/card interaktif yang bisa diklik: "Turun Berat Badan" / "Naik Berat Badan" / "Makan Lebih Teratur"
- Saat tab diklik, konten di bawahnya berubah dengan animasi `AnimatePresence` (Framer Motion)
- Setiap tab menampilkan: ilustrasi mini 3D, list benefit spesifik, dan CTA "Mulai Program Ini"

#### LP-005: App Preview / Screenshot Section
- **Judul**: "Tampilan Aplikasi"
- Mockup device (smartphone + laptop) menampilkan screenshot nyata aplikasi
- Pada mobile: carousel screenshot yang bisa di-swipe
- Pada desktop: tampilan split — kiri mockup HP, kanan mockup laptop
- Animasi: device mockup muncul dari bawah dengan spring animation
- Tombol CTA di bawah: "Coba Sekarang — Gratis"

#### LP-006: Testimonial Section
- **Judul**: "Apa Kata Mereka"
- Carousel auto-play testimoni dengan animasi slide halus
- Setiap testimoni: foto avatar (placeholder), nama, kota, rating bintang, teks kutipan
- Data testimoni: hardcoded 6 testimoni (seed data awal)
- Mobile: 1 testimoni per slide; Tablet: 2; Desktop: 3

#### LP-007: Pricing / Free Section
- **Judul**: "Gratis Selamanya — Untuk Semua Fitur Utama"
- Highlight bahwa aplikasi ini 100% gratis
- Checklist fitur yang tersedia tanpa biaya
- Satu CTA besar: "Mulai Gratis Sekarang"
- (Opsional untuk versi masa depan: card Premium dengan badge "Segera Hadir")

#### LP-008: FAQ Section
- Accordion expand/collapse dengan animasi smooth (Framer Motion `height` animation)
- Minimal 6 pertanyaan umum:
  1. Apakah NutriTrack gratis?
  2. Apakah data saya aman?
  3. Bisa digunakan di HP tanpa instal dari Play Store?
  4. Apakah ada menu makanan Indonesia?
  5. Bagaimana cara mengaktifkan notifikasi?
  6. Apakah bisa digunakan tanpa internet?

#### LP-009: Footer
- Logo + tagline singkat
- Link navigasi: Beranda, Fitur, Cara Kerja, FAQ, Kebijakan Privasi, Syarat & Ketentuan
- Social media links (Instagram, TikTok, YouTube — opsional)
- Copyright: © 2026 NutriTrack. All rights reserved.
- Tombol "Daftar Sekarang" di sudut kanan

### 18.3 Behaviour & Interaktivitas

- **Sticky Navbar**: Navbar transparan saat di-top, berubah solid + shadow saat di-scroll (dengan Framer Motion `useScroll`)
- **Scroll Progress Bar**: Garis hijau tipis di top halaman menunjukkan progress scroll
- **Smooth Scroll**: Navigasi antar section menggunakan smooth scroll behavior
- **Back-to-top Button**: Muncul dengan animasi saat scroll > 500px
- **Parallax Effect**: Hero background bergerak lebih lambat dari konten (subtle parallax)
- **Cursor Animation** (desktop): Custom cursor glow saat hover elemen interaktif

### 18.4 Routing Landing Page

```
/ (root)                → Landing Page (publik, tidak perlu auth)
/register               → Halaman Daftar
/login                  → Halaman Login
/privacy                → Kebijakan Privasi (halaman statis)
/terms                  → Syarat & Ketentuan (halaman statis)
/app/*                  → Protected routes (butuh auth)
```

Guard logic:
- Jika user sudah login dan buka `/`, redirect otomatis ke `/app/dashboard`
- Jika user belum login dan buka `/app/*`, redirect ke `/login`

### 18.5 SEO & Meta Tags Landing Page

```html
<title>NutriTrack — Aplikasi Kesehatan & Pola Makan Sehat Indonesia</title>
<meta name="description" content="Atur pola makan sehat, turun atau naik berat badan dengan NutriTrack. Tracking kalori, jadwal makan, dan notifikasi cerdas. Gratis selamanya!" />
<meta property="og:title" content="NutriTrack — Aplikasi Kesehatan Pola Makan" />
<meta property="og:description" content="Capai berat badan idealmu dengan program makan sehat yang personal dan terstruktur." />
<meta property="og:image" content="/og-image.png" />
<meta property="og:type" content="website" />
<meta name="twitter:card" content="summary_large_image" />
```

### 18.6 Responsive Breakpoints Landing Page

| Section | Mobile (<768px) | Tablet (768–1023px) | Desktop (≥1024px) |
|---------|-----------------|---------------------|-------------------|
| Hero | Stack vertikal, CTA full width | Split 60/40 | Split 50/50 dengan 3D lebih besar |
| Features | 1 kolom | 2 kolom | 3 kolom |
| How It Works | Vertikal timeline | Vertikal timeline | Horizontal timeline |
| Goal Selector | Tabs vertikal | Tabs horizontal | Tabs horizontal + preview |
| Testimonial | 1 slide | 2 slide | 3 slide |
| FAQ | Full width | Full width | 2/3 width centered |

---

## 19. Self-Service Onboarding

Self-Service Onboarding adalah alur lengkap yang dilalui pengguna baru mulai dari mendaftar hingga aplikasi siap digunakan sepenuhnya — tanpa bantuan support. Seluruh proses dirancang semudah dan sepersonal mungkin.

### 19.1 Alur Onboarding Lengkap

```
[Landing Page]
      ↓
[Klik "Mulai Gratis"]
      ↓
[Halaman Register] → [Verifikasi Email] → [Email Verified ✓]
      ↓
[Splash Welcome Screen — "Halo, [Nama]! Mari mulai perjalananmu 🌱"]
      ↓
┌─────────────────────────────────────────────────────┐
│              ONBOARDING WIZARD (6 Step)              │
│                                                       │
│  Step 1: Data Fisik Dasar                            │
│  Step 2: Pilih Program / Tujuan                      │
│  Step 3: Target & Timeline                           │
│  Step 4: Level Aktivitas                             │
│  Step 5: Preferensi Makanan                          │
│  Step 6: Jadwal Makan & Notifikasi                   │
└─────────────────────────────────────────────────────┘
      ↓
[Kalkulasi otomatis: BMR, TDEE, Target Kalori, Makro]
      ↓
[Hasil Setup — "Rencana Sehatmu Sudah Siap! 🎉"]
      ↓
[Dashboard — First-Time Experience]
```

### 19.2 Detail Setiap Step Onboarding Wizard

#### ONBOARD-STEP-01: Data Fisik Dasar
**Progress**: 1/6 — "Kenali Tubuhmu"

Input fields:
- Nama Lengkap (pre-filled dari register)
- Tanggal Lahir → kalkulasi usia otomatis
- Jenis Kelamin: Laki-laki / Perempuan (toggle pill button, animasi slide)
- Tinggi Badan (cm) — slider interaktif + input angka, animasi fill
- Berat Badan Saat Ini (kg) — roller picker animasi (seperti iOS picker)

Validasi:
- Tinggi: 100–250 cm
- Berat: 30–300 kg
- Usia: 10–100 tahun

UI Notes:
- Ilustrasi siluet tubuh animasi di samping form (Three.js sederhana / SVG)
- Siluet berubah proporsi sesuai input tinggi/berat secara real-time

---

#### ONBOARD-STEP-02: Pilih Program / Tujuan
**Progress**: 2/6 — "Apa Tujuanmu?"

Tampil 3 kartu besar yang bisa diklik, dengan animasi scale-up saat dipilih:

| Kartu | Icon 3D | Label | Sub-label | Highlight Color |
|-------|---------|-------|-----------|-----------------|
| A | 🔥 | Turun Berat Badan | "Defisit kalori sehat, tanpa kelaparan" | Merah-oranye |
| B | 💪 | Naik Berat Badan | "Bulking sehat dengan makanan bergizi" | Biru-ungu |
| C | 🥗 | Pola Makan Sehat | "Makan teratur dan seimbang setiap hari" | Hijau |

Setelah pilih, muncul konfirmasi singkat: badge tujuan muncul dengan animasi pop + bounce.

---

#### ONBOARD-STEP-03: Target & Timeline
**Progress**: 3/6 — "Berapa Target Beratmu?"

Input fields:
- Target Berat Badan (kg) — dengan visual range bar antara berat saat ini dan target
- Kecepatan program:
  - 🐢 Santai (±0.25 kg/minggu) — "Paling sustainable"
  - 🚶 Normal (±0.5 kg/minggu) — "Direkomendasikan" (default)
  - 🏃 Cepat (±0.75 kg/minggu) — "Butuh disiplin tinggi"
- Estimasi tanggal tercapai — kalkulasi otomatis, ditampilkan real-time saat slider berubah
- Progress menuju target — visual animated path dari berat awal ke target

Validasi:
- Untuk turun BB: target < berat saat ini; beda maks 50 kg
- Untuk naik BB: target > berat saat ini; beda maks 30 kg
- Untuk pola makan: target = berat saat ini (hidden/disabled)

---

#### ONBOARD-STEP-04: Level Aktivitas Fisik
**Progress**: 4/6 — "Seberapa Aktifkah Kamu?"

5 pilihan dengan deskripsi jelas, ditampilkan sebagai list card yang bisa diklik:

| Level | Label | Deskripsi | Contoh Aktivitas |
|-------|-------|-----------|-----------------|
| 1 | 🛋️ Sangat Jarang | Hampir tidak berolahraga | Kerja duduk, WFH seharian |
| 2 | 🚶 Ringan | Olahraga 1–2x seminggu | Jalan santai, yoga ringan |
| 3 | 🏃 Sedang | Olahraga 3–5x seminggu | Jogging, gym ringan |
| 4 | 💪 Aktif | Olahraga 6–7x seminggu | Gym intensif, olahraga tim |
| 5 | 🔥 Sangat Aktif | Latihan berat 2x/hari | Atlet, pekerja fisik |

Setelah pilih: muncul kalkulasi preview TDEE secara animated:
> "Kebutuhan kalori harianmu diperkirakan sekitar **2.150 kkal/hari**"

---

#### ONBOARD-STEP-05: Preferensi & Pantangan Makanan
**Progress**: 5/6 — "Ceritakan Preferensimu"

Sub-section A — Tipe Diet:
- Toggle pill multi-select: Omnivora / Vegetarian / Vegan / Pescatarian / Halal Only / Bebas

Sub-section B — Alergi & Pantangan Makanan:
- Multi-select chip: Kacang / Seafood / Gluten / Laktosa / Telur / Kedelai / Tidak Ada
- Input tambahan: field teks bebas "Lainnya..."

Sub-section C — Preferensi Masakan:
- Multi-select chip: Masakan Indonesia / Masakan Asia / Masakan Barat / Semua

UI Notes:
- Chips muncul dengan stagger animation saat section pertama kali tampil
- Chip yang dipilih berubah warna (primary) dengan scale animation

---

#### ONBOARD-STEP-06: Jadwal Makan & Notifikasi
**Progress**: 6/6 — "Atur Jadwal Makanmu"

Sub-section A — Waktu Makan:
Tampil 6 jadwal dengan time picker (scroll wheel / native time input):

| Sesi | Default | Toggle |
|------|---------|--------|
| 🌅 Sarapan | 07:00 | On |
| 🍏 Snack Pagi | 10:00 | On |
| ☀️ Makan Siang | 12:30 | On |
| 🫐 Snack Sore | 15:30 | On |
| 🌙 Makan Malam | 19:00 | On |
| 🌛 Snack Malam | 21:00 | Off |

Sub-section B — Aktifkan Notifikasi:
- Toggle utama "Aktifkan Pengingat Makan"
- Saat toggle ON → browser permission request muncul
- Jika diizinkan: konfirmasi ✅ "Notifikasi aktif!"
- Jika ditolak: banner info kuning "Bisa diaktifkan nanti di Pengaturan"

Sub-section C — Minum Air:
- Toggle "Ingatkan Minum Air Setiap 2 Jam"
- Target harian (default 8 gelas / 2000 ml)

---

### 19.3 Hasil Setup — Halaman Summary

Setelah step 6 selesai, tampil halaman penutup onboarding:

**Konten:**
- Animasi confetti + sound effect (opsional)
- Header: "Rencana Sehatmu Sudah Siap! 🎉"
- Card ringkasan hasil kalkulasi:
  ```
  ┌──────────────────────────────────────────┐
  │  Target Berat   : 70 kg (dari 85 kg)     │
  │  Target Kalori  : 1.800 kkal/hari        │
  │  Protein        : 135 g/hari             │
  │  Karbohidrat    : 180 g/hari             │
  │  Lemak          : 60 g/hari              │
  │  Estimasi Capai : ~30 minggu             │
  └──────────────────────────────────────────┘
  ```
- Badge "Program Aktif: Turun Berat Badan" (animated reveal)
- Tombol besar: "Mulai Perjalananku →" → redirect ke `/app/dashboard`

---

### 19.4 First-Time Dashboard Experience

Saat pertama kali masuk dashboard setelah onboarding:

- **Tooltip Coach** — muncul gelembung panduan interaktif step-by-step (highlight area + tooltip) menggunakan library Shepherd.js atau custom implementation:
  - Step 1: Tunjukkan kalori ring — "Ini target kalori harianmu"
  - Step 2: Tunjukkan tombol log makan — "Tap di sini untuk catat makanan"
  - Step 3: Tunjukkan bottom nav — "Navigasi semua fitur dari sini"
  - Step 4: Selesai — "Selamat! Kamu siap memulai. Semangat! 💪"
- Tooltip bisa di-skip dengan tombol "Lewati Panduan"
- State sudah-lihat-onboarding disimpan di `profiles.onboarding_completed = TRUE`

---

### 19.5 Re-Onboarding (Update Profil)

Pengguna bisa mengulang proses setup kapan saja melalui menu **Profil → Pengaturan Tujuan**:
- Wizard yang sama muncul kembali (pre-filled dengan data saat ini)
- Setelah selesai, target kalori dan makro dihitung ulang otomatis
- Riwayat data lama tidak terhapus

---

## 20. Halaman Login & Register (Detail)

### 20.1 Alur Navigasi Auth

```
Landing Page
    ├── [Tombol "Masuk"] → /login
    └── [Tombol "Daftar Gratis"] → /register

/login
    ├── Berhasil login → /app/dashboard
    ├── User baru (onboarding belum selesai) → /onboarding
    └── [Link "Belum punya akun?"] → /register

/register
    ├── Berhasil daftar → Kirim email verifikasi → /verify-email
    └── [Link "Sudah punya akun?"] → /login

/verify-email
    └── Klik link di email → /onboarding (jika baru) atau /app/dashboard

/forgot-password → /reset-password
```

---

### 20.2 Halaman Login — Detail Lengkap

#### FR-LOGIN-001: Layout & Visual

**Mobile:**
- Background: gradient hijau ke biru muda dengan subtle noise texture
- Floating animasi partikel kecil berbentuk daun/buah (Three.js partikel system)
- Card putih/dark (sesuai mode) di tengah dengan rounded-2xl + shadow-2xl
- Logo NutriTrack di atas card dengan animasi pulse

**Desktop:**
- Layout split 2 kolom: kiri ilustrasi 3D interaktif (scene makanan sehat), kanan form login
- Ilustrasi 3D: objek makanan melayang dan berputar perlahan
- Background kiri: gradient dengan pattern mesh noise

#### FR-LOGIN-002: Form Fields

```
┌─────────────────────────────────────┐
│         🌿 NutriTrack               │
│   Masuk ke akun sehatmu             │
│                                     │
│  [📧] Email                         │
│  ┌─────────────────────────────┐    │
│  │ email@contoh.com            │    │
│  └─────────────────────────────┘    │
│                                     │
│  [🔒] Kata Sandi                    │
│  ┌────────────────────────── [👁]┐  │
│  │ ••••••••                    │  │
│  └─────────────────────────────┘    │
│                                     │
│  [✓] Ingat Saya    [Lupa Sandi?]   │
│                                     │
│  ┌─────────────────────────────┐    │
│  │      Masuk Sekarang         │    │
│  └─────────────────────────────┘    │
│                                     │
│  ──────── atau masuk dengan ──────  │
│                                     │
│  ┌─────────────────────────────┐    │
│  │  [G]  Masuk dengan Google   │    │
│  └─────────────────────────────┘    │
│                                     │
│  Belum punya akun? [Daftar Gratis]  │
└─────────────────────────────────────┘
```

#### FR-LOGIN-003: Validasi & States

| State | UI Behaviour |
|-------|-------------|
| Default | Form kosong, tombol disabled |
| Typing | Label float ke atas (floating label animation) |
| Error field | Border merah, pesan error muncul dengan slide-down animation |
| Loading | Tombol berubah jadi spinner + "Sedang masuk..." |
| Sukses | Checkmark animation ✅ → redirect smooth |
| Gagal auth | Toast error merah: "Email atau kata sandi salah" + shake animation pada form |
| Rate limited | Toast warning: "Terlalu banyak percobaan. Coba lagi dalam 5 menit" |

#### FR-LOGIN-004: Fitur Tambahan Login
- **"Ingat Saya"** (Remember Me): persist session 30 hari via Supabase `persistSession`
- **Lupa Kata Sandi**: link ke `/forgot-password` — input email → kirim magic link reset
- **Show/Hide Password**: toggle icon mata pada field password dengan animasi
- **Auto-fill friendly**: form mendukung browser autofill dan password manager
- **Enter key submit**: tekan Enter di field password langsung submit form
- **Caps Lock warning**: deteksi Caps Lock aktif → tampilkan ikon peringatan ⚠️

#### FR-LOGIN-005: Halaman Lupa Kata Sandi (`/forgot-password`)
- Input email
- Tombol "Kirim Link Reset"
- Setelah submit: halaman konfirmasi "Cek email kamu! Link reset telah dikirim ke **email@contoh.com**"
- Countdown resend: "Kirim ulang dalam 60 detik" (animated countdown)
- Link reset berlaku 1 jam (konfigurasi Supabase)

#### FR-LOGIN-006: Halaman Reset Kata Sandi (`/reset-password`)
- Diakses via magic link dari email
- Form: Kata Sandi Baru + Konfirmasi Kata Sandi
- Password strength indicator (animated segmented bar)
- Setelah berhasil: redirect ke `/login` dengan toast sukses "Kata sandi berhasil diubah!"

---

### 20.3 Halaman Register — Detail Lengkap

#### FR-REGISTER-001: Layout & Visual
- Desain konsisten dengan halaman login (shared auth layout)
- Progress steps kecil di atas form: "1. Buat Akun → 2. Verifikasi → 3. Setup Profil"
- Mobile: single column; Desktop: split 2 kolom

#### FR-REGISTER-002: Form Fields

```
┌─────────────────────────────────────┐
│         🌿 NutriTrack               │
│   Mulai perjalanan sehatmu          │
│                                     │
│  [👤] Nama Lengkap                  │
│  ┌─────────────────────────────┐    │
│  │ John Doe                    │    │
│  └─────────────────────────────┘    │
│                                     │
│  [📧] Alamat Email                  │
│  ┌─────────────────────────────┐    │
│  │ email@contoh.com            │    │
│  └─────────────────────────────┘    │
│                                     │
│  [🔒] Kata Sandi                    │
│  ┌────────────────────────── [👁]┐  │
│  │ ••••••••                    │  │
│  └─────────────────────────────┘    │
│  Kekuatan: ████████░░ Kuat         │
│                                     │
│  [🔒] Konfirmasi Kata Sandi         │
│  ┌────────────────────────── [👁]┐  │
│  │ ••••••••                    │  │
│  └─────────────────────────────┘    │
│                                     │
│  [✓] Saya setuju dengan            │
│      Syarat & Kebijakan Privasi     │
│                                     │
│  ┌─────────────────────────────┐    │
│  │      Daftar Sekarang        │    │
│  └─────────────────────────────┘    │
│                                     │
│  ──────── atau daftar dengan ─────  │
│                                     │
│  ┌─────────────────────────────┐    │
│  │  [G]  Daftar dengan Google  │    │
│  └─────────────────────────────┘    │
│                                     │
│  Sudah punya akun? [Masuk]          │
└─────────────────────────────────────┘
```

#### FR-REGISTER-003: Password Strength Indicator

```typescript
// Level kekuatan password (animated segmented bar)
const getPasswordStrength = (password: string) => {
  let score = 0
  if (password.length >= 8) score++
  if (/[A-Z]/.test(password)) score++
  if (/[a-z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++

  return {
    0: { label: '', color: '' },
    1: { label: 'Sangat Lemah', color: 'bg-red-500' },
    2: { label: 'Lemah', color: 'bg-orange-500' },
    3: { label: 'Sedang', color: 'bg-yellow-500' },
    4: { label: 'Kuat', color: 'bg-blue-500' },
    5: { label: 'Sangat Kuat', color: 'bg-green-500' },
  }[score]
}
```

- Segmented bar 5 kotak kecil — terisi bertahap sesuai skor
- Label kekuatan muncul di kanan bar
- Animasi width transition smooth saat skor berubah

#### FR-REGISTER-004: Validasi Register

| Field | Aturan Validasi |
|-------|----------------|
| Nama Lengkap | Minimal 2 karakter, maksimal 100 karakter |
| Email | Format email valid, belum terdaftar di sistem |
| Kata Sandi | Minimal 8 karakter, kombinasi huruf + angka |
| Konfirmasi | Harus sama persis dengan kata sandi |
| Persetujuan | Wajib dicentang |

Error email sudah terdaftar → toast merah + link "Masuk saja" muncul di bawah field.

#### FR-REGISTER-005: Verifikasi Email (`/verify-email`)

Tampilan setelah register berhasil:
- Ilustrasi animasi: amplop terbang membawa surat (Lottie atau SVG animasi)
- Teks: "Cek email kamu! Kami sudah mengirim link verifikasi ke **{email}**"
- Tombol "Buka Aplikasi Email" — deep link ke mail client
- Tombol "Kirim Ulang Email" (aktif setelah 60 detik, animated countdown)
- Link kecil: "Salah email? Kembali ke daftar"
- Auto-polling: setiap 5 detik cek status verifikasi → jika verified, redirect otomatis ke onboarding

---

### 20.4 Google OAuth Flow

```
Tombol "Masuk/Daftar dengan Google"
      ↓
Supabase signInWithOAuth({ provider: 'google' })
      ↓
Redirect ke Google Consent Screen
      ↓
Google callback → /auth/callback
      ↓
Cek: apakah profiles.onboarding_completed?
      ├── FALSE → /onboarding (user baru dari Google)
      └── TRUE  → /app/dashboard
```

- Avatar Google otomatis tersimpan ke `profiles.avatar_url`
- Nama dari Google otomatis mengisi `profiles.full_name`
- Tidak perlu verifikasi email (sudah terverifikasi Google)

---

## 21. Dark Mode & Light Mode

### 21.1 Konsep Implementasi

NutriTrack menggunakan sistem **class-based dark mode** via Tailwind CSS dengan strategi `class` (bukan `media`), sehingga user bisa memilih mode secara manual terlepas dari preferensi sistem operasi mereka.

```typescript
// tailwind.config.ts
export default {
  darkMode: 'class', // Menggunakan class .dark pada <html>
  // ...
}
```

### 21.2 Theme Store (Zustand)

```typescript
// src/stores/themeStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Theme = 'light' | 'dark' | 'system'

interface ThemeStore {
  theme: Theme
  resolvedTheme: 'light' | 'dark'
  setTheme: (theme: Theme) => void
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme: 'system',
      resolvedTheme: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
      setTheme: (theme) => {
        const resolved = theme === 'system'
          ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
          : theme

        // Apply ke <html> element
        document.documentElement.classList.toggle('dark', resolved === 'dark')

        set({ theme, resolvedTheme: resolved })
      },
    }),
    { name: 'nutritrack-theme' } // persist ke localStorage
  )
)
```

### 21.3 Token Warna Per Mode

```typescript
// tailwind.config.ts — color tokens dark/light
const config = {
  theme: {
    extend: {
      colors: {
        // Background tokens
        'bg-primary':   { DEFAULT: '#f8fafc', dark: '#0f172a' },
        'bg-secondary': { DEFAULT: '#f1f5f9', dark: '#1e293b' },
        'bg-card':      { DEFAULT: '#ffffff', dark: '#1e293b' },
        'bg-muted':     { DEFAULT: '#e2e8f0', dark: '#334155' },

        // Text tokens
        'text-primary':   { DEFAULT: '#0f172a', dark: '#f8fafc' },
        'text-secondary': { DEFAULT: '#475569', dark: '#94a3b8' },
        'text-muted':     { DEFAULT: '#94a3b8', dark: '#64748b' },

        // Border tokens
        'border-default': { DEFAULT: '#e2e8f0', dark: '#334155' },

        // Brand (tetap sama di kedua mode)
        'brand-primary': '#22c55e',
        'brand-secondary': '#3b82f6',
      }
    }
  }
}
```

### 21.4 Palet Warna Visual Per Mode

| Elemen | Light Mode | Dark Mode |
|--------|-----------|-----------|
| Background App | `#f8fafc` (slate-50) | `#0f172a` (slate-900) |
| Background Card | `#ffffff` | `#1e293b` (slate-800) |
| Background Muted | `#f1f5f9` (slate-100) | `#334155` (slate-700) |
| Text Utama | `#0f172a` (slate-900) | `#f8fafc` (slate-50) |
| Text Sekunder | `#475569` (slate-600) | `#94a3b8` (slate-400) |
| Border | `#e2e8f0` (slate-200) | `#334155` (slate-700) |
| Primary Brand | `#22c55e` (green-500) | `#22c55e` (green-500) |
| Navbar | `#ffffff` + shadow | `#1e293b` + border |
| Bottom Nav (mobile) | `#ffffff` + shadow-top | `#1e293b` + border-top |
| Chart Lines | `#22c55e` | `#4ade80` (lebih terang) |
| Skeleton Loading | `#e2e8f0` | `#334155` |
| Modal Backdrop | `rgba(0,0,0,0.5)` | `rgba(0,0,0,0.7)` |

### 21.5 Animasi Transisi Perpindahan Mode

Perpindahan tema menggunakan CSS transition global agar semua elemen berubah secara smooth:

```css
/* src/index.css */
:root {
  color-scheme: light;
}

.dark {
  color-scheme: dark;
}

/* Smooth transition semua properti warna saat ganti tema */
*,
*::before,
*::after {
  transition:
    background-color 300ms ease,
    border-color 300ms ease,
    color 200ms ease,
    box-shadow 300ms ease;
}

/* Kecualikan elemen yang tidak perlu transition */
.no-transition,
.no-transition * {
  transition: none !important;
}
```

Tambahan — animasi khusus toggle button:
```typescript
// ThemeToggle component dengan Framer Motion
<motion.div
  animate={{ rotate: isDark ? 180 : 0 }}
  transition={{ duration: 0.4, ease: 'easeInOut' }}
>
  {isDark ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
</motion.div>
```

### 21.6 Komponen ThemeToggle

Tersedia dalam **2 varian** yang bisa digunakan di berbagai konteks:

**Varian A — Icon Button** (untuk Navbar / Header):
- Tombol bulat dengan icon Matahari ☀️ / Bulan 🌙
- Animasi rotate 180° saat berganti
- Tooltip "Ganti ke Mode Gelap / Terang"

**Varian B — Toggle Switch dengan Label** (untuk halaman Pengaturan):
```
☀️ Terang  ●────  Gelap 🌙
           [System]
```
- 3 pilihan: Light / Dark / System
- Pill button dengan sliding indicator
- Label "System" mengikuti preferensi OS secara otomatis

### 21.7 Penanganan Mode "System" (Ikuti OS)

```typescript
// Listener perubahan preferensi OS
useEffect(() => {
  if (theme !== 'system') return

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  const handleChange = (e: MediaQueryListEvent) => {
    const resolved = e.matches ? 'dark' : 'light'
    document.documentElement.classList.toggle('dark', resolved === 'dark')
    useThemeStore.setState({ resolvedTheme: resolved })
  }

  mediaQuery.addEventListener('change', handleChange)
  return () => mediaQuery.removeEventListener('change', handleChange)
}, [theme])
```

### 21.8 Lokasi Toggle Theme di UI

| Lokasi | Platform | Bentuk |
|--------|----------|--------|
| Navbar kanan atas | Desktop | Icon button (Sun/Moon) |
| Header app | Mobile | Icon button di pojok kanan |
| Halaman Pengaturan → Tampilan | Semua | Toggle switch 3 opsi (Light/Dark/System) |
| Landing Page Navbar | Semua | Icon button |

### 21.9 Dark Mode pada Komponen Spesifik

#### Charts (Recharts)
```typescript
// Warna chart menyesuaikan tema
const isDark = useThemeStore(s => s.resolvedTheme === 'dark')

<LineChart>
  <CartesianGrid stroke={isDark ? '#334155' : '#e2e8f0'} />
  <XAxis tick={{ fill: isDark ? '#94a3b8' : '#475569' }} />
  <Tooltip
    contentStyle={{
      backgroundColor: isDark ? '#1e293b' : '#ffffff',
      border: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`,
      color: isDark ? '#f8fafc' : '#0f172a'
    }}
  />
</LineChart>
```

#### Three.js Scene
```typescript
// Warna background canvas dan material menyesuaikan tema
const isDark = useThemeStore(s => s.resolvedTheme === 'dark')

<Canvas
  style={{ background: 'transparent' }}
  gl={{ alpha: true }}
>
  <ambientLight intensity={isDark ? 0.4 : 0.6} />
  <pointLight
    color={isDark ? '#22c55e' : '#16a34a'}
    intensity={isDark ? 1.5 : 1.0}
  />
</Canvas>
```

#### Skeleton Loading
```typescript
// Shimmer animasi berbeda per mode
const shimmerClass = isDark
  ? 'bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700'
  : 'bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200'
```

### 21.10 Persisted Theme & SSR Consideration

- Theme disimpan di `localStorage` key `nutritrack-theme` via Zustand persist
- Pada load pertama, script inline di `index.html` membaca localStorage sebelum React render untuk mencegah flash of unstyled content (FOUC):

```html
<!-- index.html — sebelum </head> -->
<script>
  (function() {
    const stored = localStorage.getItem('nutritrack-theme');
    const parsed = stored ? JSON.parse(stored) : null;
    const theme = parsed?.state?.theme ?? 'system';
    const resolved = theme === 'system'
      ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : theme;
    if (resolved === 'dark') {
      document.documentElement.classList.add('dark');
    }
  })();
</script>
```

### 21.11 Testing Dark Mode

| Test Case | Expected Result |
|-----------|----------------|
| Toggle dari Light ke Dark | Semua background/text berubah smooth dalam 300ms |
| Toggle dari Dark ke Light | Sama seperti di atas, arah sebaliknya |
| Pilih "System", ganti OS ke dark | Aplikasi ikut berganti ke dark otomatis |
| Refresh halaman saat dark mode | Tetap dark mode (tidak flash putih sebelum load) |
| Charts di dark mode | Grid dan tooltip berubah ke warna gelap |
| Three.js scene di dark mode | Pencahayaan ambient menyesuaikan |
| Screenshot PWA shortcut | Icon shortcut tidak terpengaruh tema (selalu menggunakan warna brand) |

---

*Dokumen ini adalah living document dan akan diupdate seiring perkembangan project.*

**NutriTrack PRD v1.1.0 — © 2026**

