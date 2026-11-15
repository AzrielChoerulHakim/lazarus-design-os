# Alur kerja v4 yang bisa dijalankan

Buka [Direction Room](../direction-room/) untuk menyusun bukti, tujuh struktur dan alasan pilihan. Simpan JSON ke repo klien; lanjutkan dengan [panduan kontrak desain](DESIGN_CONTRACT.md). Pemeriksaan `brief` dilakukan sebelum UI, `design` setelah spesimen tipografi, dan `release` setelah QA. Status lengkap berarti catatannya lengkap; hasil desain tetap harus dilihat dan dinilai. Baca [protokol orisinalitas](ORIGINALITY_PROTOCOL.md) untuk standar copy, aset, interaksi, perbandingan dan koreksi.

# Cara memakai Lazarus Design OS di GitHub

Repository: https://github.com/AzrielChoerulHakim/lazarus-design-os

## A. Pakai sebagai perpustakaan
Buka `index.html` (katalog HTML statis), lalu pilih studi berdasarkan **masalah desain**, bukan gaya yang terlihat keren. Baca analisisnya di `docs/studies/`. Source mentah ketujuh proyek tidak disertakan karena repository sekarang Public dan izin distribusi aset belum diverifikasi.

## B. Pakai untuk proyek klien baru
1. Pastikan coding agent punya akses aktual ke repository ini.
2. Salin `templates/CLIENT_AGENT.md` ke root repository proyek klien dengan nama `AGENTS.md`.
3. Isi `templates/PROJECT_BRIEF.md` berdasarkan CV, foto, karya dan kebutuhan audiens.
4. Sebelum membuat UI, baca `docs/TYPOGRAPHY_SYSTEM.md` dan skill `lazarus-type-director`. Tentukan **tujuh grammar tipografi** sesuai tujuh struktur konsep; setelah memilih satu, buat **tiga specimen tipografi grayscale memakai teks asli yang sama**, bandingkan lalu isi `templates/TYPE_SPEC.md`. Pastikan font legal, fallback, teks penting terbaca di HP, zoom 200%, reflow 320px, override spacing dan kontras.
5. Beri instruksi: "Baca Lazarus Design OS, gunakan  `lazarus-anti-generic`, `lazarus-apple-craft`, `lazarus-type-director`, dan `lazarus-reference-atlas` jika tersedia. Eksplorasi tujuh konsep yang benar-benar berbeda secara struktur (bukan tujuh warna dan bukan menyalin tujuh referensi), pilih satu berdasarkan bukti, kemudian bangun, inspeksi, dan audit."
6. Simpan `DESIGN_DECISIONS.md`, `TYPE_SPEC.md` serta laporan QA final; jangan menyerahkan hanya screenshot atau build sukses.

## C. Skills
File skill internal ada di `.github/skills/<nama>/SKILL.md`. Beberapa coding agent mampu mendeteksi skills dari folder tersebut; agent lain perlu diberi path atau isi instruksinya secara eksplisit. Tautan skill komunitas Apple dan Anthropic ada di `docs/SKILL_REGISTRY.md`, **tidak otomatis terinstal**.

## D. Typography Proofing Lab
Buka `type-lab/` melalui GitHub Pages atau local HTTP server. Tempel teks klien asli untuk membandingkan tiga tata baca dengan kata-kata yang identik. Konten diketik hanya di browser dan tidak disimpan/dikirim oleh lab. Kontrol ukuran/lebar hanyalah **pratinjau**; audit rilis tetap dilakukan dengan browser viewport nyata, zoom, kontras dan override spacing sesuai `docs/TYPOGRAPHY_QA.md`.

## D. Menjalankan katalog lokal
Jalankan `python3 -m http.server 8000` di folder repository, kemudian buka http://localhost:8000. Katalog juga memakai JS lokal dan tidak perlu `npm install`.

## E. Mengaktifkan GitHub Pages (opsional)
Di GitHub buka Settings → Pages → Build and deployment → Deploy from branch → pilih `main` dan `/ (root)` → Save. Karena repository saat ini Public, halaman akan bisa diakses umum. Jangan aktifkan untuk menyajikan source/asset pihak ketiga sebelum hak publikasinya jelas.

## F. Menguji
Di komputer dengan Node.js jalankan `node scripts/check-atlas.mjs`. GitHub Actions juga menjalankan pemeriksaan ini ketika ada push atau pull request. Pemeriksaan otomatis **tidak menggantikan** inspeksi visual situs klien.

## G. Prinsip utama
Jangan menjadikan Apple sebagai skin universal. Terapkan standar keputusan, kualitas motion, usability, dan detail yang teliti; biarkan identitas visual ditemukan dari tiap klien.
