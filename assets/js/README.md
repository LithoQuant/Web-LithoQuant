# JavaScript Assets

## Struktur
```
assets/js/
├── script.js   # Main: navbar, scroll, animations, counter, particles
└── tabs.js     # Developer page: tab switching logic
```

## Penggunaan di HTML
```html
<script src="assets/js/script.js"></script>
<!-- hanya di developer.html -->
<script src="assets/js/tabs.js"></script>
```

## Rencana Modularisasi (Future)
`assets/js/script.js` saat ini masih monolith 327 baris. Rencana split tanpa breaking:
```
assets/js/
├── script.js         # entry (akan di-refactor jadi import)
├── tabs.js
└── modules/
    ├── navbar.js     # hamburger + active link
    ├── scroll.js     # smooth scroll + highlight
    ├── animations.js # IntersectionObserver + fade-in
    └── counter.js    # stats counter
```
Saat refactor, `script.js` akan menggunakan ES modules (`type="module"`) atau keep vanilla dengan multiple script tags.

## Tidak ada framework
- Vanilla JS only, no build step required
- CDN hanya Font Awesome CSS
