

// home
// Función para precargar las imágenes de fondo del carrusel
function preloadImages() {
  const slides = document.querySelectorAll(".slide");
  slides.forEach(slide => {
      const backgroundImage = getComputedStyle(slide).backgroundImage;
      if (backgroundImage && backgroundImage !== "none") {
          const imageUrl = backgroundImage.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
          const img = new Image();
          img.src = imageUrl;
      }
  });
}

// Llamar a la función para precargar las imágenes al cargar la página
window.addEventListener("load", preloadImages);

// Llamar a la función para precargar las imágenes al cargar la página
window.addEventListener("load", preloadImages);

const slides = document.querySelector(".slider").children;
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const indicator = document.querySelector(".indicator");
let index = 0;

prev.addEventListener("click", function () {
  prevSlide();
  updateCircleIndicator();
  resetTimer();
});

next.addEventListener("click", function () {
  nextSlide();
  updateCircleIndicator();
  resetTimer();
});

// create circle indicators
function circleIndicator() {
  for (let i = 0; i < slides.length; i++) {
    const div = document.createElement("div");
    
    div.setAttribute("onclick", "indicateSlide(this)");
    div.id = i;
    if (i == 0) {
      div.className = "active";
    }
    indicator.appendChild(div);
  }
}
circleIndicator();

function indicateSlide(element) {
  index = element.id;
  changeSlide();
  updateCircleIndicator();
  resetTimer();
}

function updateCircleIndicator() {
  for (let i = 0; i < indicator.children.length; i++) {
    indicator.children[i].classList.remove("active");
  }
  indicator.children[index].classList.add("active");
}

function prevSlide() {
  if (index == 0) {
    index = slides.length - 1;
  } else {
    index--;
  }
  changeSlide();
}

function nextSlide() {
  if (index == slides.length - 1) {
    index = 0;
  } else {
    index++;
  }
  changeSlide();
}

function changeSlide() {
  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.remove("active");
  }

  slides[index].classList.add("active");
}

function resetTimer() {
  // when click to indicator or controls button
  // stop timer
  clearInterval(timer);
  // then started again timer
  timer = setInterval(autoPlay, 8000);
}

function autoPlay() {
  nextSlide();
  updateCircleIndicator();
}

let timer = setInterval(autoPlay, 8000);





// Función para añadir desplazamiento táctil al carrusel
function addTouchSwipe() {
  const carousel = document.querySelector(".slider");

  carousel.addEventListener("touchstart", handleTouchStart, false);
  carousel.addEventListener("touchmove", handleTouchMove, false);

  let xDown = null;

  function handleTouchStart(event) {
    const firstTouch = event.touches[0];
    xDown = firstTouch.clientX;
  }

  function handleTouchMove(event) {
    if (!xDown) {
      return;
    }

    let xUp = event.touches[0].clientX;
    let xDiff = xDown - xUp;

    if (xDiff > 0) {
      nextSlide();
    } else {
      prevSlide();
    }

    xDown = null;
    updateCircleIndicator();
    resetTimer();
  }
}

// Llamar a la función para añadir desplazamiento táctil al cargar la página
window.addEventListener("load", addTouchSwipe);




//<!--********************************************-->
//<!-- ***** Developers***** -->
//  <!--Jose Arabel Fuentes Perez
//  contact:
//     github> https://github.com/JoseFuentes-Dev
//  -->
//  <!--Claudio Benjamin Osorio
//  contact:
//     github> https://github.com/Claudio-Osorio/
//  -->
//  <!-- ***** Developers***** -->
//  <!--********************************************-->
