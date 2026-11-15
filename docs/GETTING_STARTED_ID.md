# Cara memakai Lazarus Design OS di GitHub

Repository: https://github.com/AzrielChoerulHakim/lazarus-design-os

## A. Pakai sebagai perpustakaan
Buka `index.html` (katalog HTML statis), lalu pilih studi berdasarkan **masalah desain**, bukan gaya yang terlihat keren. Baca analisisnya di `docs/studies/`. Source mentah ketujuh proyek tidak disertakan karena repository sekarang Public dan izin distribusi aset belum diverifikasi.

## B. Pakai untuk proyek klien baru
1. Pastikan coding agent punya akses aktual ke repository ini.
2. Salin `templates/CLIENT_AGENT.md` ke root repository proyek klien dengan nama `AGENTS.md`.
3. Isi `templates/PROJECT_BRIEF.md` berdasarkan CV, foto, karya dan kebutuhan audiens.
4. Beri instruksi: "Baca Lazarus Design OS, gunakan `lazarus-anti-generic`, `lazarus-apple-craft`, dan `lazarus-reference-atlas` jika tersedia. Eksplorasi tujuh konsep yang benar-benar berbeda secara struktur (bukan tujuh warna dan bukan menyalin tujuh referensi), pilih satu berdasarkan bukti, kemudian bangun, inspeksi, dan audit."
5. Simpan `DESIGN_DECISIONS.md` serta laporan QA final; jangan menyerahkan hanya screenshot atau build sukses.

## C. Skills
File skill internal ada di `.github/skills/<nama>/SKILL.md`. Beberapa coding agent mampu mendeteksi skills dari folder tersebut; agent lain perlu diberi path atau isi instruksinya secara eksplisit. Tautan skill komunitas Apple dan Anthropic ada di `docs/SKILL_REGISTRY.md`, **tidak otomatis terinstal**.

## D. Menjalankan katalog lokal
Jalankan `python3 -m http.server 8000` di folder repository, kemudian buka http://localhost:8000. Katalog juga memakai JS lokal dan tidak perlu `npm install`.

## E. Mengaktifkan GitHub Pages (opsional)
Di GitHub buka Settings → Pages → Build and deployment → Deploy from branch → pilih `main` dan `/ (root)` → Save. Karena repository saat ini Public, halaman akan bisa diakses umum. Jangan aktifkan untuk menyajikan source/asset pihak ketiga sebelum hak publikasinya jelas.

## F. Menguji
Di komputer dengan Node.js jalankan `node scripts/check-atlas.mjs`. GitHub Actions juga menjalankan pemeriksaan ini ketika ada push atau pull request. Pemeriksaan otomatis **tidak menggantikan** inspeksi visual situs klien.

## G. Prinsip utama
Jangan menjadikan Apple sebagai skin universal. Terapkan standar keputusan, kualitas motion, usability, dan detail yang teliti; biarkan identitas visual ditemukan dari tiap klien.
