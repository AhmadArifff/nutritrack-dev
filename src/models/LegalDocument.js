export class LegalDocument {
  constructor({ type, title, label, intro, documentTitle, sections, disclaimer = null }) {
    this.type = type
    this.title = title
    this.label = label
    this.intro = intro
    this.documentTitle = documentTitle
    this.sections = sections
    this.disclaimer = disclaimer
    Object.freeze(this.sections)
    Object.freeze(this)
  }

  copyWith(patch = {}) {
    return new LegalDocument({
      type: patch.type ?? this.type,
      title: patch.title ?? this.title,
      label: patch.label ?? this.label,
      intro: patch.intro ?? this.intro,
      documentTitle: patch.documentTitle ?? this.documentTitle,
      sections: patch.sections ?? this.sections,
      disclaimer: patch.disclaimer ?? this.disclaimer
    })
  }

  get secondaryLink() {
    return this.type === 'terms'
      ? { label: 'Privacy', to: '/privacy' }
      : { label: 'Terms', to: '/terms' }
  }
}

export const legalDocuments = Object.freeze({
  privacy: new LegalDocument({
    type: 'privacy',
    title: 'Kebijakan Privasi',
    label: 'Privacy',
    intro: 'Halaman frontend statis ini merangkum bagaimana NutriTrack akan menangani data pengguna saat backend Supabase diintegrasikan.',
    documentTitle: 'Kebijakan Privasi - NutriTrack',
    sections: [
      ['Data yang Dikumpulkan', 'Profil, target berat badan, log makanan, jadwal makan, notifikasi, dan preferensi makanan.'],
      ['Penggunaan Data', 'Data digunakan untuk menghitung BMR, TDEE, target kalori, analisis nutrisi, dan rekomendasi meal plan.'],
      ['Kontrol Pengguna', 'Pengguna dapat memperbarui profil, preferensi, notifikasi, dan menghapus data melalui pengaturan aplikasi.']
    ]
  }),
  terms: new LegalDocument({
    type: 'terms',
    title: 'Syarat & Ketentuan',
    label: 'Terms',
    intro: 'NutriTrack adalah alat bantu manajemen nutrisi. Konten di aplikasi bukan pengganti konsultasi medis profesional.',
    documentTitle: 'Syarat & Ketentuan - NutriTrack',
    disclaimer: {
      title: 'Catatan penting',
      body: 'NutriTrack bukan pengganti dokter, ahli gizi, atau layanan medis profesional.'
    },
    sections: [
      ['Penggunaan Aplikasi', 'Pengguna bertanggung jawab memastikan data yang dimasukkan akurat agar perhitungan target lebih relevan.'],
      ['Batasan Layanan', 'Rekomendasi makanan dan target kalori bersifat informatif dan perlu disesuaikan dengan kondisi pribadi.'],
      ['Akun dan Keamanan', 'Jaga kredensial akun dan segera ubah kata sandi bila ada aktivitas yang mencurigakan.']
    ]
  })
})
