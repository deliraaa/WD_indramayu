//login register
const authModal = document.getElementById('authModal');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    document.querySelectorAll('#openLogin').forEach(btn => {
        btn.addEventListener('click', () => {
            authModal.classList.remove('hidden');
            authModal.classList.add('flex');
            loginForm.classList.remove('hidden');
            registerForm.classList.add('hidden');
        });
    });
    document.querySelectorAll('#openRegister').forEach(btn => {
        btn.addEventListener('click', () => {
            authModal.classList.remove('hidden');
            authModal.classList.add('flex');
            registerForm.classList.remove('hidden');
            loginForm.classList.add('hidden');
        });
    });
    document.getElementById('closeModal').addEventListener('click', () => {
        authModal.classList.add('hidden');
        authModal.classList.remove('flex');
    });
    authModal.addEventListener('click', (e) => {
        if (e.target === authModal) {
            authModal.classList.add('hidden');
            authModal.classList.remove('flex');
        }
    });

    document.getElementById('toRegister').addEventListener('click', () => {
        loginForm.classList.add('hidden');
        registerForm.classList.remove('hidden');
    });

    document.getElementById('toLogin').addEventListener('click', () => {
        registerForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
    });
    document.getElementById('hamburger').addEventListener('click', () => {
        document.getElementById('nav-menu').classList.remove('-translate-y-full');
        document.getElementById('nav-menu').classList.add('translate-y-0');
    });

    document.getElementById('hamburgers').addEventListener('click', () => {
        document.getElementById('nav-menu').classList.add('-translate-y-full');
        document.getElementById('nav-menu').classList.remove('translate-y-0');
    });


//filter paket
document.addEventListener("DOMContentLoaded", function () {

  const filterBtn = document.getElementById("filterBtn");
  const filterPopup = document.getElementById("filterPopup");
  const filterOverlay = document.getElementById("filterOverlay");
  const closeFilter = document.getElementById("closeFilter");

  function openFilter() {
    filterPopup.classList.remove("hidden");
    filterOverlay.classList.remove("hidden");
  }

  function closeFilterPopup() {
    filterPopup.classList.add("hidden");
    filterOverlay.classList.add("hidden");
  }

  filterBtn.addEventListener("click", openFilter);
  closeFilter.addEventListener("click", closeFilterPopup);
  filterOverlay.addEventListener("click", closeFilterPopup);

});




