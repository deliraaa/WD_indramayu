# Skill Exchange

Skill Exchange adalah platform pembelajaran berbasis video dan blog yang berfokus pada komunitas. Platform ini memungkinkan siapa saja untuk belajar secara gratis, membagikan roadmap terstruktur, serta membuka kelas private untuk berbagi keahlian.

![Skill Exchange Hero Section](dist/img/lomba-(hero).svg)

## Fitur Utama

- **Upload Roadmap Belajar:** Bagikan alur belajar yang jelas dan sistematis.
- **Room Diskusi Interaktif:** Bergabung dan berdiskusi secara aktif bersama komunitas.
- **Materi Blog & Video:** Akses beragam artikel dan video untuk pemahaman yang komprehensif.
- **Jasa Private Class:** Fasilitas bagi kreator roadmap untuk membuka kelas bimbingan khusus.
- **Beragam Kategori Pembelajaran:** Tersedia roadmap untuk Teknologi, Desain, Bisnis, Digital Marketing, Data & AI, Bahasa, Pengembangan Diri, dan Kreativitas.

## Tech Stack

Proyek ini dibangun menggunakan teknologi-teknologi berikut:

- **HTML5 & CSS3:** Struktur dan gaya dasar halaman.
- **Tailwind CSS v4:** Framework utility-first CSS untuk styling yang cepat dan responsif (menggunakan `@tailwindcss/cli`).
- **JavaScript (ES6):** Fungsionalitas interaktif pada frontend (komponen UI, modal, dll).
- **GSAP & ScrollTrigger:** Membuat animasi modern dan reveal statis saat di-scroll.
- **Swiper.js:** Library slider untuk komponen seperti testimoni.
- **Font Awesome & Remix Icon:** Kumpulan ikon vektor.
- **Google Fonts:** Menggunakan font Bebas Neue, Cormorant Garamond, Indie Flower, Inter, Manrope, Poppins, Raleway, dan Urbanist.

## Struktur Direktori

```
.
├── dist/                # Berisi file yang sudah dicompile (HTML, CSS output, Assets)
│   ├── css/             # File CSS yang lain jika ada
│   ├── img/             # Berisi seluruh gambar, logo, dan ikon SVG
│   ├── js/              # File custom JavaScript (contoh: gsap-animations.js)
│   ├── index.html       # Halaman utama landing page
│   ├── all-category.html# Daftar halaman kategori pembelajaran
│   ├── all-roadmap.html # Daftar halaman roadmap
│   └── output.css       # File CSS yang dihasilkan oleh Tailwind CSS
├── src/                 # Berisi source file
│   └── input.css        # File CSS utama Tailwind tempat custom base styles dideklarasikan
├── package.json         # Daftar dependencies dan scripts proyek
└── README.md            # Dokumentasi proyek (file ini)
```

## Persyaratan (Prerequisites)

Untuk menjalankan proyek ini dan memanipulasi styling, Anda perlu menginstal Node.js di komputer Anda.

## Cara Menjalankan Secara Lokal

1. **Clone repository ini** (jika menggunakan Git)
   ```bash
   git clone <url-repo-anda>
   cd WD_hima_indarmayu
   ```

2. **Instal Dependencies**
   Untuk menginstal *Tailwind CSS CLI* dan *Swiper*, jalankan:
   ```bash
   npm install
   ```
   Atau
   ```bash
   npm i
   ```

3. **Menjalankan Script Tailwind CSS (Watch Mode)**
   Untuk mengkompilasi file CSS saat Anda sedang mengubah source HTML atau `src/input.css`, jalankan perintah:
   ```bash
   npm run dev
   ```
   Ini akan menjalankan proses tailwind CLI untuk memonitor perubahan dan menuliskannya di `./dist/output.css`.

4. **Membuka Proyek di Browser**
   Anda bisa membuka file `dist/index.html` langsung di browser atau menggunakan alat seperti ekstensi VSCode **Live Server** agar browser otomatis merefresh ketika ada perubahan pada file HTML atau CSS.

## Lisensi

Proyek ini menggunakan lisensi ISC.

***
*ⓒ Copyright by EcoRasa / Skill Exchange. All rights reserved.*
