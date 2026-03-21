const swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: 16,
  scrollbar: {
    el: ".swiper-scrollbar",
    draggable: true,
  },
  breakpoints: {
    640: {
      slidesPerView: 1.2,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
    1280: {
      slidesPerView: 4,
    },
  },
});


document.addEventListener('DOMContentLoaded', function() {
  const buttons = document.querySelectorAll('button[data-collapse-target]');

  buttons.forEach(button => {
    button.addEventListener('click', function() {
      const targetId = button.getAttribute('data-collapse-target');
      const target = document.querySelector(`[data-collapse="${targetId}"]`);
      const icon = button.querySelector('i');

     
      document.querySelectorAll('[data-collapse]').forEach(other => {
        if (other !== target) {
          other.style.height = '0px';
          const otherBtn = document.querySelector(
            `button[data-collapse-target="${other.getAttribute('data-collapse')}"] i`
          );
          if (otherBtn) otherBtn.classList.remove('rotate-180');
        }
      });

  
      if (target.style.height === '0px' || target.style.height === '') {
        target.style.height = target.scrollHeight + 'px';
      } else {
        target.style.height = '0px';
      }
      icon.classList.toggle('rotate-180');
    });
  });


  const defaultTarget = document.querySelector('[data-collapse="animated-collapse-1"]');
  const defaultButton = document.querySelector('button[data-collapse-target="animated-collapse-1"]');
  if (defaultTarget && defaultButton) {
    defaultTarget.style.height = defaultTarget.scrollHeight + 'px';
    const icon = defaultButton.querySelector('i');
    if (icon) icon.classList.add('rotate-180');
  }
});







// Navbar Fixed
window.onscroll = function () {
  const header = document.querySelector('header');
  const fixedNav = header.offsetTop;

  if (window.pageYOffset > fixedNav) {
    header.classList.add('');
  } else {
    header.classList.remove('');
  }
}

//dropdown 
document.querySelectorAll('.dropdown-button').forEach(button =>{
  const dropdownMenu = button.nextElementSibling;
  const dropdownIcon = button.querySelector('.dropdown-icon');

  button.addEventListener("click", () => {
    dropdownMenu.classList.toggle("hidden");
    dropdownIcon.classList.toggle("ri-arrow-up-s-line");
    dropdownIcon.classList.toggle("ri-arrow-down-s-line");
  });
});

// Sidebar
 document.addEventListener("DOMContentLoaded", () => {

  const hamburger = document.getElementById('hamburger');
  const hamburgers = document.getElementById('hamburgers');
  const navMenu = document.getElementById('nav-menu');
  const closeBtn = document.getElementById('close-menu');
  const sidebarOverlay = document.getElementById('sidebar-overlay'); // tambahkan ini di HTML kamu

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navMenu?.classList.remove('-translate-y-full');
    });
  }

  if (hamburgers) {
    hamburgers.addEventListener('click', () => {
      navMenu?.classList.toggle('-translate-y-full');
      navMenu?.classList.remove('-translate-y-0');

      if (sidebarOverlay) {
        sidebarOverlay.classList.toggle('hidden');
        sidebarOverlay.classList.toggle('bg-black-50');
      }
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      navMenu?.classList.add('-translate-y-full');
    });
  }

});

// end: Sidebar


//trasaction detail
 function previewImage(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function (e) {
            const img = document.getElementById('preview-image');
            const icon = document.getElementById('upload-icon');

            img.src = e.target.result;
            img.classList.remove('hidden');
            icon.classList.add('hidden');
        };
        reader.readAsDataURL(file);
    }


// button hover 
        document.addEventListener('DOMContentLoaded', function() {
            const buttonGroups = document.querySelectorAll('.btn-group');

            buttonGroups.forEach(group => {
                const primary = group.querySelector('.btn-primary');
                const secondary = group.querySelector('.btn-secondary');

                if (primary && secondary) {
                    secondary.addEventListener('mouseenter', () => {
                        primary.classList.add('secondary-style');
                    });

                    secondary.addEventListener('mouseleave', () => {
                        primary.classList.remove('secondary-style');
                    });
                }
            });
        });
