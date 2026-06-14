import { memo, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Apple, ArrowRight, ChevronRight, CreditCard, Mail, MessageCircle, Play, Search, Send, Settings, Shield, Utensils, User } from 'lucide-react'
import { apiRequest } from '../../api'
import { useBackendData } from '../../hooks/useBackendData'

const popularLinks = ['Tingkatan langganan', 'Dasar pelacakan makro', 'Menghubungkan perangkat']
const categories = [
  {
    title: 'Akun',
    description: 'Pengaturan profil, pemulihan kata sandi, dan keamanan.',
    Icon: User,
    toneClass: 'help-category-account'
  },
  {
    title: 'Nutrisi',
    description: 'Perencanaan makan, pelacakan kalori, dan target harian.',
    Icon: Utensils,
    toneClass: 'help-category-nutrition'
  },
  {
    title: 'Teknis',
    description: 'Sinkronisasi perangkat, bug aplikasi, dan tips performa.',
    Icon: Settings,
    toneClass: 'help-category-technical'
  },
  {
    title: 'Langganan',
    description: 'Riwayat tagihan, fitur Premium, dan perpanjangan.',
    Icon: CreditCard,
    toneClass: 'help-category-subscription'
  }
]

const tutorials = [
  {
    title: 'Mencatat makanan pertama Anda',
    description: 'Pelajari cara menggunakan alat pengenalan foto AI kami.',
    duration: '2:45',
    image: '/assets/remote/remote-029-69c4ae2e87.jpg'
  },
  {
    title: 'Menghubungkan Google Fit',
    description: 'Sinkronkan langkah dan menit aktif Anda dengan mulus.',
    duration: '3:12',
    image: '/assets/remote/remote-030-d0fc0b3c3b.jpg'
  },
  {
    title: 'Menyesuaikan Dashboard Anda',
    description: 'Buat NutriTrack bekerja sesuai dengan tujuan spesifik Anda.',
    duration: '1:50',
    image: '/assets/remote/remote-031-8ae40fa277.jpg'
  }
]

const faqs = [
  ['Bagaimana cara membatalkan langganan Premium saya?', 'Anda dapat membatalkan langganan kapan saja melalui menu Pengaturan > Langganan di aplikasi. Jika Anda berlangganan melalui App Store atau Google Play, Anda harus mengelola pembatalan melalui alat manajemen langganan mereka masing-masing.'],
  ['Apakah NutriTrack sinkron dengan MyFitnessPal?', 'Saat ini NutriTrack berjalan sebagai ekosistem independen. Ekspor data akan disiapkan untuk integrasi lanjutan.'],
  ['Bisakah saya melacak puasa intermiten?', 'Fitur protokol puasa disiapkan untuk paket Premium dengan timer 16:8, 20:4, dan jendela khusus.'],
  ['Apa yang terjadi jika saya menghapus aplikasi?', 'Menghapus PWA dari perangkat tidak menghapus akun. Data tetap tersimpan selama akun belum dihapus dari pengaturan.']
]

const iconMap = { User, Utensils, Settings, CreditCard, Shield }
const categoryToneClass = {
  Akun: 'help-category-account',
  Nutrisi: 'help-category-nutrition',
  Teknis: 'help-category-technical',
  Perangkat: 'help-category-technical',
  Langganan: 'help-category-subscription',
  Pembayaran: 'help-category-subscription'
}
const categoryLabel = {
  Perangkat: 'Teknis',
  Pembayaran: 'Langganan'
}
const categoryDescription = {
  Akun: 'Pengaturan profil, pemulihan kata sandi, dan keamanan.',
  Nutrisi: 'Perencanaan makan, pelacakan kalori, dan target harian.',
  Perangkat: 'Sinkronisasi perangkat, bug aplikasi, dan tips performa.',
  Teknis: 'Sinkronisasi perangkat, bug aplikasi, dan tips performa.',
  Pembayaran: 'Riwayat tagihan, fitur Premium, dan perpanjangan.',
  Langganan: 'Riwayat tagihan, fitur Premium, dan perpanjangan.'
}

function mapHelpData(payload) {
  const sourceTutorials = payload.tutorials?.length >= tutorials.length ? payload.tutorials : tutorials
  const sourceFaqs = payload.faqs?.length >= faqs.length ? payload.faqs : faqs.map(([question, answer]) => ({ question, answer }))

  return {
    categories: (payload.categories || []).map((item) => ({
      title: categoryLabel[item.title] || item.title,
      description: categoryDescription[item.title] || item.description,
      Icon: iconMap[item.icon] || User,
      toneClass: categoryToneClass[item.title] || 'help-category-account'
    })),
    tutorials: sourceTutorials.map((item) => ({
      title: item.title,
      description: item.description,
      duration: item.duration || '3 min',
      image: item.image_url || item.image
    })),
    faqs: sourceFaqs.map((item) => [item.question, item.answer])
  }
}

function ProHelpPage() {
  const [query, setQuery] = useState('')
  const { data } = useBackendData(
    () => apiRequest(`/api/help?search=${encodeURIComponent(query.trim())}`).then(mapHelpData),
    { categories, tutorials, faqs },
    [query]
  )
  const filteredFaqs = useMemo(() => {
    const trimmed = query.trim().toLowerCase()
    if (!trimmed) return data.faqs
    return data.faqs.filter(([question, answer]) => `${question} ${answer}`.toLowerCase().includes(trimmed))
  }, [data.faqs, query])

  return (
    <motion.main className="help-center-page mx-auto grid max-w-[1400px] gap-0 px-5 py-0 pb-24 lg:px-8" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}>
      <section className="help-hero relative -mx-5 flex flex-col items-center justify-center overflow-hidden px-4 py-20 text-center md:py-24 lg:-mx-8">
          <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-secondary/5 blur-3xl" />
          <div className="relative z-10 w-full max-w-3xl">
            <h1 className="mb-8 font-headline-xl text-headline-xl font-bold text-on-background">Apa yang bisa kami bantu?</h1>
            <label className="help-search group mx-auto flex min-h-16 w-full items-center gap-4 rounded-3xl px-6 text-left shadow-xl transition-all focus-within:ring-4 focus-within:ring-primary/10">
              <Search className="h-8 w-8 flex-shrink-0 text-primary" />
              <input className="min-w-0 flex-1 border-0 bg-transparent p-0 text-body-lg text-on-surface outline-none ring-0 placeholder:text-on-surface-variant/70 focus:ring-0" placeholder="Cari artikel, tutorial, dan lainnya..." value={query} onChange={(event) => setQuery(event.target.value)} />
            </label>
            <div className="mt-6 flex flex-wrap justify-center gap-4 text-label-md">
              <span className="font-bold text-on-surface-variant">Populer:</span>
              {popularLinks.map((link, index) => (
                <span className="flex items-center gap-4" key={link}>
                  <a className="font-bold text-primary transition hover:underline" href="#faq">{link}</a>
                  {index < popularLinks.length - 1 && <span className="text-outline-variant/40">•</span>}
                </span>
              ))}
            </div>
          </div>
      </section>

      <section className="mx-auto grid w-full max-w-[1200px] grid-cols-1 gap-6 py-16 sm:grid-cols-2 lg:grid-cols-4">
        {data.categories.map(({ title, description, Icon, toneClass }, index) => (
          <motion.button className={`help-category-card ${toneClass} group flex min-h-[220px] flex-col justify-between rounded-[1.5rem] p-6 text-left transition-transform hover:-translate-y-1`} key={title} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.06, duration: 0.32 }} whileHover={{ y: -4 }} type="button">
            <div className="mb-10 flex items-start justify-between">
              <div className="help-category-icon flex h-12 w-12 items-center justify-center rounded-xl transition-colors">
                <Icon size={28} />
              </div>
              <ArrowRight className="text-on-surface-variant/40 transition group-hover:translate-x-1 group-hover:text-primary" size={22} />
            </div>
            <div>
              <h3 className="mb-2 font-headline-md text-lg font-bold text-on-surface">{title}</h3>
              <p className="text-sm leading-relaxed text-on-surface-variant">{description}</p>
            </div>
          </motion.button>
        ))}
      </section>

      <section className="-mx-5 bg-surface-container-low px-5 py-20 lg:-mx-8 lg:px-8">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="font-headline-lg text-headline-lg font-bold text-on-background">Tutorial Singkat</h2>
              <p className="mt-2 text-on-surface-variant">Kuasai NutriTrack dalam hitungan menit dengan panduan video kami.</p>
            </div>
            <button className="flex items-center gap-2 font-bold text-primary transition-all hover:gap-3" type="button">
              Lihat semua video <ArrowRight size={18} />
            </button>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {data.tutorials.map((item, index) => (
              <motion.article className="help-glass-card group overflow-hidden rounded-3xl" key={item.title} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.07, duration: 0.32 }} whileHover={{ y: -4 }}>
                <div className="relative h-48 overflow-hidden bg-surface-dim">
                  <img className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" src={item.image} alt={item.title} loading="lazy" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/10">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg transition-transform group-hover:scale-110">
                      <Play size={30} fill="currentColor" />
                    </div>
                  </div>
                  <span className="absolute bottom-4 right-4 rounded-lg bg-black/60 px-2 py-1 font-metrics-mono text-xs text-white backdrop-blur-md">{item.duration}</span>
                </div>
                <div className="p-6">
                  <h4 className="mb-2 font-headline-md text-lg font-bold text-on-surface">{item.title}</h4>
                  <p className="text-sm leading-6 text-on-surface-variant">{item.description}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1200px] py-6" id="faq">
        <h2 className="mb-12 text-center font-headline-lg text-headline-lg font-bold text-on-background">Pertanyaan yang Sering Diajukan</h2>
        <div className="mx-auto max-w-3xl space-y-6">
          {filteredFaqs.length ? filteredFaqs.map(([question, answer]) => (
            <details className="help-glass-card group overflow-hidden rounded-2xl transition-all duration-300 open:ring-2 open:ring-primary/20" key={question}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6">
                <span className="font-headline-md text-lg font-bold text-on-surface">{question}</span>
                <ChevronRight className="flex-shrink-0 text-primary transition-transform duration-300 group-open:rotate-90" size={22} />
              </summary>
              <div className="border-t border-outline-variant/10 px-6 pb-6 pt-6 font-body-md leading-7 text-on-surface-variant">{answer}</div>
            </details>
          )) : (
            <div className="rounded-2xl border border-outline-variant/30 bg-white/85 p-6 text-center text-on-surface-variant">Tidak ada FAQ yang cocok dengan pencarian Anda.</div>
          )}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1200px] pb-20">
        <motion.div className="achievement-gradient relative overflow-hidden rounded-[2.5rem] p-10 text-center text-white shadow-2xl md:p-20" whileHover={{ y: -3 }}>
          <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-primary-container/20 blur-3xl" />
          <div className="relative z-10 mx-auto max-w-2xl">
            <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md">
              <span className="material-symbols-outlined text-5xl">support_agent</span>
            </div>
            <h2 className="mb-6 font-headline-lg text-4xl font-bold">Masih butuh bantuan?</h2>
            <p className="mb-12 font-body-lg text-white/90">Tim dukungan kami tersedia 24/7 untuk memastikan perjalanan kesehatan Anda tetap di jalurnya. Pilih cara yang Anda sukai untuk terhubung.</p>
            <div className="flex flex-col justify-center gap-6 sm:flex-row">
              <button className="flex items-center justify-center gap-3 rounded-2xl bg-white px-8 py-4 font-bold text-primary shadow-xl transition-transform hover:scale-105" type="button">
                <MessageCircle size={20} fill="currentColor" />
                Mulai Obrolan Langsung
              </button>
              <button className="flex items-center justify-center gap-3 rounded-2xl border border-white/30 bg-white/20 px-8 py-4 font-bold text-white backdrop-blur-md transition-colors hover:bg-white/30" type="button">
                <Mail size={20} />
                Kirim Email Dukungan
              </button>
            </div>
            <p className="mt-10 font-label-sm text-xs uppercase tracking-widest text-white/60">Waktu respon rata-rata: 2 jam</p>
          </div>
        </motion.div>
      </section>

      <HelpFooter />
    </motion.main>
  )
}

function HelpFooter() {
  return (
    <footer className="-mx-5 -mb-24 border-t border-outline-variant/20 bg-surface-container px-5 py-16 lg:-mx-8 lg:px-8">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-12 md:grid-cols-4">
        <div>
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
              <Apple size={22} />
            </div>
            <span className="font-headline-md text-2xl font-black text-primary">NutriTrack</span>
          </div>
          <p className="text-sm leading-relaxed text-on-surface-variant">Memberdayakan perjalanan kesehatan Anda melalui data dan pengalaman yang menyenangkan.</p>
        </div>
        {[
          ['Produk', ['Fitur', 'Premium', 'Komunitas']],
          ['Perusahaan', ['Tentang Kami', 'Kebijakan Privasi', 'Syarat Layanan']]
        ].map(([title, links]) => (
          <div key={title}>
            <h5 className="mb-6 text-xs font-bold uppercase tracking-wider text-on-surface">{title}</h5>
            <ul className="space-y-4 text-sm text-on-surface-variant">
              {links.map((link) => <li key={link}><a className="transition-colors hover:text-primary" href="#faq">{link}</a></li>)}
            </ul>
          </div>
        ))}
        <div>
          <h5 className="mb-6 text-xs font-bold uppercase tracking-wider text-on-surface">Newsletter</h5>
          <label className="flex gap-2 rounded-xl border border-outline-variant/30 bg-white p-1">
            <input className="w-full rounded-lg border-0 bg-transparent px-4 py-2 text-sm outline-none focus:ring-0" placeholder="Email Anda" type="email" />
            <button className="rounded-lg bg-primary p-3 text-white transition-transform hover:scale-105" type="button" aria-label="Send newsletter email">
              <Send size={18} />
            </button>
          </label>
        </div>
      </div>
      <div className="mx-auto mt-16 flex max-w-[1200px] flex-col items-center justify-between gap-6 border-t border-outline-variant/10 pt-10 text-xs font-medium text-on-surface-variant md:flex-row">
        <span>© 2024 NutriTrack. Seluruh hak cipta dilindungi.</span>
        <div className="flex gap-8 uppercase tracking-widest">
          {['Twitter', 'Instagram', 'LinkedIn'].map((item) => <a className="transition-colors hover:text-primary" href="#faq" key={item}>{item}</a>)}
        </div>
      </div>
    </footer>
  )
}

export default memo(ProHelpPage)
