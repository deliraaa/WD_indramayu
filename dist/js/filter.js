const searchInput = document.getElementById("searchInput");
const cards = document.querySelectorAll(".package-card");
const filterBtn = document.getElementById("filterBtn");
const filterPopup = document.getElementById("filterPopup");
const overlay = document.getElementById("filterOverlay");
const closeFilter = document.getElementById("closeFilter");
const applyFilterBtn = filterPopup.querySelector("button[class*='bg-primary']");

// Ambil semua checkbox kategori dan input harga
const categoryChecks = filterPopup.querySelectorAll("input[type='checkbox']");
const minPriceInput = filterPopup.querySelectorAll("input[type='number']")[0];
const maxPriceInput = filterPopup.querySelectorAll("input[type='number']")[1];

// POPUP CONTROL
filterBtn.onclick = () => {
  overlay.classList.remove("hidden");
  filterPopup.classList.remove("hidden");
};

closeFilter.onclick = () => {
  overlay.classList.add("hidden");
  filterPopup.classList.add("hidden");
};

overlay.onclick = () => {
  overlay.classList.add("hidden");
  filterPopup.classList.add("hidden");
};

// FILTER FUNCTION
function filterPackages() {
  const keyword = searchInput.value.toLowerCase();
  const minPrice = parseInt(minPriceInput.value) || 0;
  const maxPrice = parseInt(maxPriceInput.value) || Infinity;

  // Ambil kategori yang dicentang
  const selectedCategories = [...categoryChecks]
    .filter(c => c.checked)
    .map(c => c.nextSibling.textContent.trim().toLowerCase());

  cards.forEach(card => {
    const name = card.dataset.name.toLowerCase();
    const access = parseInt(card.dataset.access);
    const price = parseInt(card.dataset.price);

    // SEARCH - cari berdasarkan nama paket
    const matchSearch = name.includes(keyword);

    // CATEGORY - jika tidak ada yang dicentang, tampilkan semua
    let matchCategory = selectedCategories.length === 0;
    if (selectedCategories.length > 0) {
      // Cek apakah nama paket mengandung salah satu kategori yang dipilih
      matchCategory = selectedCategories.some(cat => {
        // Mapping kategori ke keyword paket
        if (cat.includes('cpns') || cat.includes('tni') || cat.includes('polri')) {
          return name.includes('cpns') || name.includes('tni') || name.includes('polri');
        }
        if (cat.includes('toefl')) {
          return name.includes('toefl');
        }
        if (cat.includes('utbk') || cat.includes('snbt')) {
          return name.includes('utbk') || name.includes('snbt');
        }
        if (cat.includes('tka')) {
          return name.includes('tka');
        }
        return false;
      });
    }

    // PRICE RANGE
    const matchPrice = price >= minPrice && price <= maxPrice;

    // TAMPILKAN/SEMBUNYIKAN CARD
    if (matchSearch && matchCategory && matchPrice) {
      card.closest('.card').style.display = "block";
      // Jika card ada dalam wrapper div (seperti card kedua dengan badge Trending)
      if (card.closest('.card').parentElement.matches('div:not([class])')) {
        card.closest('.card').parentElement.style.display = "block";
      }
    } else {
      card.closest('.card').style.display = "none";
      if (card.closest('.card').parentElement.matches('div:not([class])')) {
        card.closest('.card').parentElement.style.display = "none";
      }
    }
  });
}

// EVENT LISTENERS
searchInput.addEventListener("input", filterPackages);

// Apply filter saat klik tombol "Terapkan"
applyFilterBtn.addEventListener("click", () => {
  filterPackages();
  overlay.classList.add("hidden");
  filterPopup.classList.add("hidden");
});

// Real-time filter saat checkbox berubah
categoryChecks.forEach(c => c.addEventListener("change", filterPackages));

// Real-time filter saat input harga berubah
minPriceInput.addEventListener("input", filterPackages);
maxPriceInput.addEventListener("input", filterPackages);

// Reset filter
function resetFilters() {
  searchInput.value = "";
  minPriceInput.value = "";
  maxPriceInput.value = "";
  categoryChecks.forEach(c => c.checked = false);
  filterPackages();
}

// Optional: Tambahkan tombol reset jika perlu
// Anda bisa menambahkan tombol reset di HTML dan panggil fungsi resetFilters()