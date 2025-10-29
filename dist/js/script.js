var swiper2 = new Swiper(".testiSwiper", {
  slidesPerView: "auto",
  spaceBetween: 30,
  grabCursor: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    bulletActiveClass: "custom-bullet-active",
    bulletClass: "custom-bullet",
  },
   breakpoints:{
    1:{
      slidesPerView: 1.5,
      spaceBetween: 20,
      centeredSlides:false,
    },

    640:{
      slidesPerView: 2.4,
      spaceBetween: 30,
      centeredSlides:false,
    },
    
    1024:{
      slidesPerView: 3,
      spaceBetween: 30,
      centeredSlides:false,
    },
    
    1280:{
      slidesPerView: 4,
      spaceBetween: 20,
      centeredSlides:false,
    },
    1900:{
      slidesPerView: 4.8,
      spaceBetween: 20,
      centeredSlides:false,
    },
   }
});

const swiper = new Swiper(".mySwiper", {
  loop: true, // autoplay + loop harus di luar
  autoplay: {
    delay: 2000, // 2 detik
    disableOnInteraction: false,
  },
  spaceBetween: 20,
  breakpoints: {
    320: {       // smartphone
      slidesPerView: 1.2,
      centeredSlides: true,
    },
    768: {       // tablet
      slidesPerView: 2,
      centeredSlides: false,
    },
    1024: {      // desktop
      slidesPerView: 2,
      centeredSlides: false,
    },
  },
});


//button faq
document.querySelectorAll('.buttonImg').forEach(function (buttonImg) {
  buttonImg.addEventListener('click', function () {
    var question = this.closest('.cursor-pointers');
    var answer = question.nextElementSibling;
    var toggleButton = this.querySelector('.toggleButton');
    var groupContainer = question.closest('.group');


    if (answer.classList.contains('hidden')) {
      answer.classList.remove('hidden');
      toggleButton.classList.add('rotate-90', 'color-button-faq');
     
    } else {
      answer.classList.add('hidden');
      toggleButton.classList.remove('rotate-90', 'color-button-faq');
    
    }
  });
});



document.addEventListener('DOMContentLoaded', function() {
  const buttons = document.querySelectorAll('button[data-collapse-target]');
  buttons.forEach(button => {
      button.addEventListener('click', function() {
          const targetId = button.getAttribute('data-collapse-target');
          const target = document.querySelector(`[data-collapse="${targetId}"]`);
          const icon = button.querySelector('i');
          if (target.style.height === '0px' || target.style.height === '') {
              target.style.height = target.scrollHeight + 'px';
          } else {
              target.style.height = '0px';
          }
           icon.classList.toggle('rotate-180');
      });
  });
});



// navbar 
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');

menuToggle.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});

// scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});