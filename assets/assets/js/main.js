/**
* Template Name: Restaurantly - v3.1.0
* Template URL: https://bootstrapmade.com/restaurantly-restaurant-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  let selectTopbar = select('#topbar')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
        if (selectTopbar) {
          selectTopbar.classList.add('topbar-scrolled')
        }
      } else {
        selectHeader.classList.remove('header-scrolled')
        if (selectTopbar) {
          selectTopbar.classList.remove('topbar-scrolled')
        }
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
    const currentPage = window.location.pathname;

    if (currentPage === '/index_backup.html') {
      // For index1.html
      selectHeader.style.backgroundColor = 'rgb(255,241,1)';
    } else if (currentPage === '/index_backup1.html') {
      // For index2.html
      selectHeader.style.backgroundColor = 'rgb(238,29,35)';
    } else if (currentPage === '/index_backup2.html') {
      // For index3.html
      selectHeader.style.backgroundColor = 'rgb(255,255,255)';
    }

    else if (currentPage === '/index_backup3.html') {
      // For index3.html
      selectHeader.style.backgroundColor = 'rgb(247,147,29)';
    }
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Menu isotope and filter
   */
  window.addEventListener('load', () => {
    let menuContainer = select('.menu-container');
    if (menuContainer) {
      let menuIsotope = new Isotope(menuContainer, {
        itemSelector: '.menu-item',
        layoutMode: 'fitRows'
      });

      let menuFilters = select('#menu-flters li', true);

      on('click', '#menu-flters li', function(e) {
        e.preventDefault();
        menuFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        menuIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        menuIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
        const paginationDots = document.getElementById("paginationDots");
        const prev = document.getElementsByClassName("prev");
        const next = document.getElementsByClassName("next");
        const isFilterAll = this.getAttribute('data-filter') === "*";

         paginationDots.style.display = isFilterAll ? "block" : "none";

        // Loop through the prev and next elements and set display individually
        for (let i = 0; i < prev.length; i++) {
          prev[i].style.display = isFilterAll ? "block" : "none";
        }
        for (let i = 0; i < next.length; i++) {
          next[i].style.display = isFilterAll ? "block" : "none";
        }
      }, true);
    }

  });

  /**
   * Initiate glightbox 
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Events slider
   */
  new Swiper('.events-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Initiate gallery lightbox 
   */
  const galleryLightbox = GLightbox({
    selector: '.gallery-lightbox'
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

})()

// let slideIndex = 1;
// showSlides(slideIndex);

// // Next/previous controls
// function plusSlides(n) {
//   const minSlideIndex = 1;
//   const maxSlideIndex = 12;

//   slideIndex += n;
//   if (slideIndex < minSlideIndex) {
//     slideIndex = minSlideIndex; 
//   } else if (slideIndex > maxSlideIndex) {
//     slideIndex = maxSlideIndex;
//   }
//   showSlides(slideIndex);
// }

// Thumbnail image controls
// function currentSlide(n) {
//   showSlides(slideIndex = n);
// }
// function showSlides(n) {
//   let i;
//   let slides = document.getElementsByClassName("menu-item");
//   let startIndex = (n - 1) * 6; // Calculate the  start index of items for the current slide
//   let endIndex = startIndex + 6; // Calculate the end index of items for the current slide
//   // Hide all slides initially
//   for (i = 0; i < slides.length; i++) {
//     slides[i].style.display = "none";
//     slides[i].classList.remove("even", "odd"); 
//   }
//   // Show only the items for the current slide
//   for (i = startIndex; i < endIndex && i < slides.length; i++) {
//     slides[i].style.display = "block";
//     if (i < startIndex + 2) {
//       slides[i].style.top = "auto"; 
//     } else if (i >= startIndex + 2 && i < startIndex + 4) {
//       slides[i].style.top = "120px"; 
//     }else{
//       slides[i].style.top = "235px"; 
//     }
//     if(i%2 == 0){
//       slides[i].style.left = "auto";
//     }else{
//       slides[i].style.left = "60%";
//     }
//   }
// }

// Function to handle smooth scrolling to the items section
function scrollToItems(id) {
  var yOffset = -100; // Adjust this value as needed to scroll a bit down from the top
  if (id == "special-filters") {
    var itemsSection = document.getElementById('spec-items');
    var y = itemsSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });

  } else {
    var itemsSection = document.getElementById('items');
    var y = itemsSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
}
// Add click event listeners to each category item
document.querySelectorAll('#menu-flters li').forEach(function (item) {
  item.addEventListener('click', function () {
    scrollToItems();
  });
});

document.querySelectorAll('#special-filters li').forEach(function (item) {
  item.addEventListener('click', function () {
    scrollToItems("special-filters");
  });
});