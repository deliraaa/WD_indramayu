// Modal functionality untuk semua tombol "Lihat"
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById('detailModal');
  const closeModalBtn = document.getElementById('closeModal');
  const openModalBtns = document.querySelectorAll('.openModal'); // Gunakan class selector // Ambil semua tombol dengan id openModal

  // Fungsi untuk membuka modal
  function openModal() {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  }

  // Fungsi untuk menutup modal
  function closeModal() {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = 'auto'; // Enable scrolling
  }

  // Tambahkan event listener ke setiap tombol "Lihat"
  openModalBtns.forEach(btn => {
    btn.addEventListener('click', openModal);
  });

  // Event listener untuk tombol close
  closeModalBtn.addEventListener('click', closeModal);

  // Close modal ketika klik di luar konten modal
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close modal dengan tombol ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });
});