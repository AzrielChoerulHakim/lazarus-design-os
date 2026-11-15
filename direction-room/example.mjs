import { createContract } from '../lib/design-contract.mjs';
export function exampleContract() {
  const data = createContract();
  data.project = { name: 'Direction Room — contoh repository', audience: 'Desainer dan agen coding yang mengerjakan website untuk klien berbeda.', primaryTask: 'Membandingkan struktur sebelum membangun dan membawa alasan desain ke repo klien.', thesis: 'Ruang kerja berbentuk lembar keputusan karena hubungan bukti, struktur dan manfaat harus terlihat ketika keputusan dibuat.' };
  data.facts = [{ id: 'F1', claim: 'Repo memiliki tujuh studi konsep dan sebuah lab tipografi.', source: 'concepts/README.md; type-lab/README.md', status: 'verified' }, { id: 'F2', claim: 'Audit yang ada meminta identity swap, skeleton, rationale dan bukti viewport.', source: 'docs/ANTI_GENERIC_AUDIT.md', status: 'verified' }];
  const rows = [
    ['Lembar keputusan', ['Tugas pembaca', 'Bukti', 'Konsep', 'Alasan pilihan'], 'Label dan jawaban berdampingan; catatan panjang mengikuti alur vertikal.', 'Edit bidang, bandingkan arah, ekspor catatan.', 'Formulir panjang perlu dibagi menjadi tahap.'],
    ['Antrean audit', ['Masalah', 'Bukti masalah', 'Perbaikan'], 'Baca berdasarkan tingkat masalah, lalu telusuri sumbernya.', 'Buka temuan dan lompat ke bidang yang terkait.', 'Mengarahkan eksplorasi terlalu cepat ke kepatuhan.'],
    ['Graf bukti', ['Peta sumber', 'Hubungan keputusan', 'Detail'], 'Jejak spasial dari satu bukti menuju beberapa keputusan.', 'Pilih simpul untuk menyoroti relasinya.', 'Sulit untuk penyuntingan teks dan layar kecil.'],
    ['Matriks konsep', ['Dimensi pembanding', 'Tujuh alternatif', 'Pilihan'], 'Baca horizontal untuk membandingkan dimensi yang sama.', 'Pilih dua arah untuk perbandingan berdampingan.', 'Kepadatan horizontal membatasi penggunaan di ponsel.'],
    ['Buku kerja naratif', ['Brief', 'Penalaran', 'Arah terpilih', 'Lampiran'], 'Baca berkelanjutan, dengan catatan sumber di dekat teks.', 'Anotasi paragraf dan buka bukti terkait.', 'Alternatif sulit dibandingkan tanpa banyak scroll.'],
    ['Wawancara bertahap', ['Pertanyaan', 'Jawaban', 'Ringkasan'], 'Satu pertanyaan per layar dan rangkuman di akhir.', 'Jawab, lanjut, kembali, lalu revisi ringkasan.', 'Hubungan antar-keputusan tidak langsung terlihat.'],
    ['Terminal produksi', ['Perintah', 'Hasil pemeriksaan', 'Lokasi bukti'], 'Baca keluaran secara prosedural dan telusuri file.', 'Jalankan pemeriksaan dan buka artefak.', 'Akses untuk desainer tanpa terminal lebih terbatas.']
  ];
  data.concepts = rows.map((r, i) => ({ id: 'ABCDEFG'[i], name: r[0], contentOrder: r[1], readingGrammar: r[2], interaction: r[3], tradeoff: r[4], media: 'Teks asli brief dan bukti; tanpa gambar dekoratif.', evidenceIds: ['F1', 'F2'] }));
  data.selection = { conceptId: 'A', reason: 'Hubungan fakta, bentuk dan alasan tetap terbaca saat penyuntingan. Matriks menjadi tampilan tambahan; terminal tetap tersedia bagi agen. Enam alternatif memiliki batas yang dicatat pada masing-masing arah.' };
  data.signature = { description: 'Catatan kelengkapan mengikuti keputusan yang sedang disusun, dengan ID bukti sebagai penghubung.', evidenceIds: ['F2'], benefit: 'Alasan yang hilang terlihat sebelum pengerjaan komponen.', fallback: 'Formulir linear di ponsel; JSON dan CLI untuk alur tanpa antarmuka.' };
  data.decisions = [{ choice: 'Satu model data untuk editor, perbandingan dan ekspor.', evidenceIds: ['F1', 'F2'], benefit: 'Keputusan yang dibandingkan sama dengan yang dibawa ke implementasi.', tradeoff: 'Isi perlu mengikuti struktur catatan agar dapat diperiksa.' }];
  data.avoid = [{ pattern: 'Persentase orisinalitas', reason: 'Jumlah bidang terisi tidak mengukur kualitas atau orisinalitas hasil.' }];
  data.comparison.note = 'Contoh ini membandingkan struktur alat di dalam repo, bukan portofolio klien. Perbandingan lintas klien belum dilakukan.';
  return data;
}
