# Images Assets

Terorganisir berdasarkan kategori untuk maintainability.

```
assets/images/
├── branding/          # Logo & icons
│   ├── logo.png       # Logo utama LithoQuant (75-90px height di navbar/footer)
│   └── icons.png      # Favicon / Icons
├── screenshots/       # Screenshot aplikasi
│   ├── track-display.png
│   ├── petrophysical-calculation.png
│   └── crossplot-analysis.png
├── gallery/           # Foto event/gallery
│   ├── ipa-2025.jpg       # IPA Convex 2025
│   └── jcs-2025.jpg       # Joint Convention Semarang 2025
└── partners/          # Logo partner
    └── tecrube.png    # Tecrube Foundation
```

## Penamaan
- Gunakan `kebab-case` lowercase: `track-display.png` bukan `Track Display.png`
- Gallery: `event-tahun.jpg` → `ipa-2025.jpg`
- Logo partner: `nama-partner.png` → `tecrube.png`

## Menambahkan Gambar Baru
1. Simpan di subfolder yang sesuai
2. Update referensi di HTML: `src="assets/images/screenshots/nama-file.png"`
3. Compress gambar sebelum commit (gunakan TinyPNG atau `optipng`)

## Migrasi Lama -> Baru
| Lama | Baru |
|------|------|
| `images/Track Display.png` | `assets/images/screenshots/track-display.png` |
| `images/Petrophysical Calculation.png` | `assets/images/screenshots/petrophysical-calculation.png` |
| `images/Crossplot Analysis.png` | `assets/images/screenshots/crossplot-analysis.png` |
| `images/logo.png` | `assets/images/branding/logo.png` |
| `images/Icons.png` | `assets/images/branding/icons.png` |
| `images/IPA.jpg` | `assets/images/gallery/ipa-2025.jpg` |
| `images/JCS.jpg` | `assets/images/gallery/jcs-2025.jpg` |
| `images/Tecrube.png` | `assets/images/partners/tecrube.png` |
