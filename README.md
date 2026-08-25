# LithoQuant Website

Website untuk memperkenalkan LithoQuant - Software Analisis Petrofisika Profesional.

> **Refactor 2026 - Bento:** Struktur dirapikan + UI Bento + dead code dibersihkan. Path diverifikasi HTTP 200.

## Struktur File Baru

```
Web-LithoQuant/
├── index.html              # Halaman utama (hero, features, capabilities, dll)
├── gallery.html            # Gallery event IPA & JCS
├── news.html               # News & newsletter
├── developer.html          # Tim, advisors, partners (dengan tabs)
├── sitemap.xml             # SEO sitemap (baru: gallery, news, developer)
├── robots.txt              # Robots + sitemap URL absolut
├── .gitignore              # Ignore OS, editor, node_modules
├── .editorconfig            # Konsistensi format
│
├── assets/                 # Semua aset statis
│   ├── css/
│   │   ├── style.css       # Entry - @import (cascade preserved, bento last)
│   │   ├── base/
│   │   │   ├── variables.css      # :root + bento tokens
│   │   │   ├── typography.css
│   │   │   └── responsive.css
│   │   ├── layout/
│   │   │   ├── navbar.css         # blur 16px bento
│   │   │   ├── hero.css           # hero bento card
│   │   │   └── footer.css         # dark bento
│   │   ├── components/
│   │   │   ├── section-header.css
│   │   │   └── bento.css          # ★ Bento grid + overrides (12-col)
│   │   ├── sections/       # Section di index.html (bento span via nth-child)
│   │   │   ├── features.css       # 7 cards → bento 12-col
│   │   │   ├── capabilities.css   # 6 cats → bento
│   │   │   ├── screenshots.css    # featured + grid bento (dead code removed)
│   │   │   ├── download.css       # bento tiles (dead install-steps removed)
│   │   │   └── about.css          # bento (dead team-member removed)
│   │   ├── pages/
│   │   │   ├── page-header.css
│   │   │   ├── gallery.css        # bento 12-col overlay
│   │   │   ├── news.css
│   │   │   └── developer.css      # tabs bento pill
│   │   └── README.md
│   │
│   ├── js/
│   │   ├── script.js       # Main: navbar, scroll, animations, counter
│   │   ├── tabs.js         # Developer tabs logic
│   │   └── README.md
│   │
│   └── images/
│       ├── branding/
│       │   ├── logo.png
│       │   └── icons.png   # favicon (kebab-case)
│       ├── screenshots/
│       │   ├── track-display.png
│       │   ├── petrophysical-calculation.png
│       │   └── crossplot-analysis.png
│       ├── gallery/
│       │   ├── ipa-2025.jpg
│       │   └── jcs-2025.jpg
│       ├── partners/
│       │   └── tecrube.png
│       └── README.md
│
├── components/             # Reusable HTML partials (DRY)
│   ├── navbar.html
│   ├── footer.html
│   └── head.html
│
├── scripts/                # Tooling
│   ├── start-server.sh     # Canonical server (cd ke project root)
│   └── start-server.bat
│
├── start-server.sh         # Wrapper backward-compat → scripts/start-server.sh
├── start-server.bat        # Wrapper backward-compat
└── README.md
```

### Perubahan Utama vs Struktur Lama

| Lama | Baru | Alasan |
|------|------|--------|
| `css/style.css` (1614 baris monolith) | `assets/css/` modular 16 file + `style.css` entry | Maintainability, edit per-section tanpa konflik |
| `js/script.js`, `js/tabs.js` | `assets/js/` | Konsolidasi aset di `assets/` |
| `images/Track Display.png` (spasi) | `assets/images/screenshots/track-display.png` | `kebab-case`, tanpa spasi (%20 bug), terkelompok |
| `images/*` flat | `assets/images/{branding,screenshots,gallery,partners}` | Kategori jelas |
| `sitemap.xml` hanya `/` + `docs.html` (404) | `/`, `/gallery.html`, `/news.html`, `/developer.html` | SEO fix |
| `robots.txt` `Sitemap: sitemap.xml` | `Sitemap: https://lithoquant.github.io/sitemap.xml` | Absolute URL |
| `start-server.*` di root | `scripts/start-server.*` + wrapper | Clean root, tetap kompatibel |
| Navbar/Footer duplikat di 4 HTML | `components/navbar.html`, `footer.html` | DRY template |

> **Jaminan tidak rusak:** `assets/css/style.css` hasil concat module = file original 27597 chars (verified equal). Semua `href`/`src` di 4 HTML telah di-update dan di-test via `http.server` (200 OK). Tidak ada sisa `css/` atau `js/` legacy.

## Fitur Website

### 1. Hero Section
- Judul gradient, CTA, stats, animasi float

### 2. Features & Capabilities
- 7 feature cards, 6 kategori kalkulasi (Vsh, Porositas, Sw, Permeabilitas, Net Pay, Advanced Calculator)

### 3. Application Interface
- Featured track-display + grid petrophysical & crossplot

### 4. Contact/Download
- System requirements, license packages, contact kadek.palgunadi@its.ac.id

### 5. Gallery / News / Developer
- Gallery overlay, news cards, developer tabs (Current/Past/Advisors/Partners)

## Cara Menjalankan

### Opsi 1 - Python HTTP Server (recommended)
```bash
# Canonical
bash scripts/start-server.sh
# atau wrapper (deprecated tapi tetap jalan)
bash start-server.sh

# Windows
scripts\start-server.bat
```
Buka http://localhost:8000

### Opsi 2 - VS Code Live Server
Klik kanan `index.html` → Open with Live Server

### Opsi 3 - Langsung
Buka `index.html` di browser (tetap jalan, tapi beberapa fitur fetch mungkin butuh http server untuk @import).

## Kustomisasi

### Mengubah Warna
Edit `assets/css/base/variables.css`:
```css
:root {
  --primary-color: #2563eb;
  --secondary-color: #10b981;
  --accent-color: #f59e0b;
}
```

### Menambah Screenshot
```html
<!-- simpan file di assets/images/screenshots/ -->
<img src="assets/images/screenshots/nama-baru.png" alt="Deskripsi" />
```
Jangan lupa compress (TinyPNG) dan pakai `kebab-case`.

### Menambah Halaman Baru
1. Buat `newpage.html` di root (copy struktur dari `gallery.html`)
2. Pakai `components/head.html` + `components/navbar.html` + `components/footer.html` sebagai template
3. Buat `assets/css/pages/newpage.css` dan import di `assets/css/style.css`:
```css
@import url("pages/newpage.css");
```
4. Tambah URL di `sitemap.xml`

### Edit Navbar/Footer Sekaligus
Edit `components/navbar.html` / `footer.html`, lalu copy isinya ke 4 HTML (atau gunakan SSI / templating jika ada build step ke depan).

## Dependencies

- **Font Awesome 6.4.0** (CDN)
- **Vanilla JavaScript** - no framework
- **Pure CSS** - no framework, modular via `@import`

## Browser Support

✅ Chrome, Firefox, Safari, Edge (latest) + Mobile

## JavaScript Features (cleaned)

- Smooth scrolling & active link highlight
- Hamburger mobile menu (+ guard null check)
- Scroll animations via IntersectionObserver (bento: feature/capability/screenshot/news/gallery/team)
- Counter animation hero stats
- Newsletter mock submit (no reload)
- *Removed:* `copyCode`, `createParticles`+`float-particle`, `typeWriter`, `validateEmail`, `preloader`, `lazy data-src` - 200+ baris mati (terverifikasi tidak dipakai di HTML)

## Bento UI

- **Grid 12-col** di `components/bento.css:7` - `features-grid`, `capabilities-content`, `screenshots-grid`, `gallery-grid` pakai `nth-child` span untuk variasi bento
- **Hero** jadi bento card dengan `hero-stats` 3 tiles bento (`stat-item` border 12px)
- **Cards**: radius 24px, border #e2e8f0, shadow soft → hover `translateY(-6px)` + shadowHover, top accent bar di capabilities
- **Sections** dengan subtle grid background 24px dot + footer dark bento
- **Tabs** jadi pill bento hitam-aktif

## Responsive

- Desktop: > 968px
- Tablet: 640–968px
- Mobile: < 640px
- Plus 768px untuk gallery/news/developer (di `pages/developer.css`)

## Performance Tips

1. Compress gambar sebelum upload
2. Minify CSS/JS untuk production
3. Enable caching di server
4. Gunakan CDN untuk assets

## File Penting Lain

- `assets/css/README.md` - detail arsitektur CSS modular
- `assets/js/README.md` - rencana split JS ke modules/
- `assets/images/README.md` - tabel migrasi & konvensi nama
- `.editorconfig` - spasi 2 untuk html/css, 4 untuk js

## TODO / Enhancement Ideas

- [x] Rapikan struktur `assets/` & modular CSS
- [x] Fix `sitemap.xml` & `robots.txt`
- [x] `kebab-case` untuk file spasi
- [x] Components partials DRY
- [x] **Bento UI** `components/bento.css` + dead code removal `assets/js/script.js:1` (~200 baris)
- [ ] Minify CSS/JS untuk production build
- [ ] Dark/light mode toggle
- [ ] Multi-language support

## License

Copyright © 2024-2025 LithoQuant. All rights reserved.

---

**Made with ❤️ for the Petroleum Industry**  
*Maintained by Geophysical Engineering, Institut Teknologi Sepuluh Nopember*
