# CSS Architecture

Modular CSS dengan `@import` - original `style.css` di-split tanpa mengubah output.

## Struktur
```
assets/css/
├── style.css              # Entry: hanya @import (urut preserved)
├── base/
│   ├── variables.css      # :root vars, reset, body, container
│   ├── typography.css     # h1..h6, a
│   └── responsive.css     # @media 968px, 640px
├── layout/
│   ├── navbar.css         # .navbar, .nav-wrapper, .hamburger
│   ├── hero.css           # .hero, .hero-bg, @keyframes float/bounce
│   └── footer.css         # .footer, .footer-content
├── components/
│   └── section-header.css # .section-header
├── sections/              # Bagian di index.html
│   ├── features.css
│   ├── capabilities.css
│   ├── screenshots.css
│   ├── download.css
│   └── about.css
└── pages/                 # Halaman terpisah
    ├── page-header.css    # .page-header (gallery/news/developer)
    ├── gallery.css
    ├── news.css
    └── developer.css      # tabs + partners + responsive 768px
```

## Penggunaan
```html
<link rel="stylesheet" href="assets/css/style.css" />
```
`style.css` me-import semua module sesuai urutan cascade original. **Edit module, bukan style.css**.

## Verifikasi
Concatenated modules == original file (27597 chars) - proven equal.

## Menambah Halaman Baru
1. Buat `assets/css/pages/namapage.css`
2. Tambah `@import url("pages/namapage.css");` di `style.css` setelah import terakhir pages
