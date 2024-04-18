(function ($) {
	
	"use strict";

	$(window).on('load', function() {
		// Page loading animation
		$('#js-preloader').addClass('loaded');
	
		// Función para pre-cargar todos los archivos de la página
		function preload() {
			// Array para almacenar los elementos a cargar
			var elementsToLoad = [];
	
			// Agregar elementos como imágenes, scripts, hojas de estilo, etc., a la matriz elementsToLoad
			// Ejemplo: imágenes
			$('img').each(function() {
				elementsToLoad.push($(this).attr('src'));
			});
	
			// Ejemplo: scripts
			$('script').each(function() {
				elementsToLoad.push($(this).attr('src'));
			});
	
			// Ejemplo: hojas de estilo
			$('link[rel="owl.css"]').each(function() {
				elementsToLoad.push($(this).attr('href'));
			});
	
			// Contador para realizar un seguimiento de los elementos cargados
			var loadedCount = 0;
	
			// Función para verificar si todos los elementos han sido cargados
			function checkLoaded() {
				loadedCount++;
				// Si todos los elementos han sido cargados, mostrar la página
				if (loadedCount === elementsToLoad.length) {
					$('#js-preloader').addClass('loaded');
				}
			}
	
			// Agregar evento 'load' a cada elemento a cargar
			elementsToLoad.forEach(function(src) {
				$('<img>').on('load', checkLoaded).attr('src', src);
			});
		}
	
		// Llamar a la función preload para iniciar la precarga de archivos
		preload();
	});
	


	$(document).ready(function() {
		$(window).scroll(function() {
			requestAnimationFrame(function() {
			  let scroll = $(window).scrollTop();
		  
			  if (scroll > 0) {
				$("header").addClass("background-header");
			  } else {
				$("header").removeClass("background-header");
			  }
			});
		  });
		  
	  
		// Función para recargar la página en caso de cambio de ancho de ventana
		function reloadPageOnResize() {
		  let width = $(window).width();
		  $(window).resize(function() {
			if ((width > 767 && $(window).width() < 767) || (width < 767 && $(window).width() > 767)) {
			  location.reload();
			}
		  });
		}
	  
		// Llamar a la función para recargar la página solo cuando sea necesario
		reloadPageOnResize();
	  });
	  

	


	// Menu Dropdown Toggle
	if($('.menu-trigger').length){
        $(".menu-trigger").on('click', function() {    
            $(this).toggleClass('active');
            $('.header-area .nav').slideToggle(200);
        });
    
        var mobileNav = window.matchMedia("(max-width: 767px)");
    
        if (mobileNav.matches) {
            $(".nav").on('click', function() {    
                $(this).toggleClass('active');
                $('.header-area .nav').slideToggle(200);
            });
        }
    }
    


	// Menu elevator animation
	$('.scroll-to-section a[href*=\\#]:not([href=\\#])').on('click', function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			let target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
				let width = $(window).width();
				if(width < 100) {
					$('.menu-trigger').removeClass('active');
					
				}				
				$('html,body').animate({
					scrollTop: (target.offset().top) - 80
				}, 700);
				return false;
			}
		}
	});


	// Page loading animation
	$(window).on('load', function() {
		if($('.cover').length){
			$('.cover').parallax({
				imageSrc: $('.cover').data('image'),
				zIndex: '1'
			});
		}

		$("#preloader").animate({
			'opacity': '0'
		}, 600, function(){
			setTimeout(function(){
				$("#preloader").css("visibility", "hidden").fadeOut();
			}, 300);
		});
	});
    


})(window.jQuery);


function updatePageSection() {
    var currentScroll = window.pageYOffset;

    var sections = document.querySelectorAll('.nav a[href^="#"]');
    sections.forEach(function(section) {
        var target = document.querySelector(section.getAttribute('href'));
        var top = target.offsetTop - 100; // Ajuste para tener en cuenta el espacio de la barra de navegación

        if (currentScroll >= top && currentScroll < top + target.offsetHeight) {
            // Agregar clase 'active' al enlace correspondiente
            section.classList.add('active');
        } else {
            // Eliminar clase 'active' del enlace si no está en la sección visible
            section.classList.remove('active');
        }
    });
}

// Llamar a la función cuando se desplaza la página
window.addEventListener('scroll', updatePageSection);

// Llamar a la función cuando se carga la página
window.addEventListener('load', updatePageSection);




//Testimonials section

$(document).ready(function() {
    // Función para activar automáticamente el siguiente indicador y cambiar el carrusel cada 8 segundos
    var autoChange = function() {
        return setInterval(function() {
            $('#carouselExampleIndicators').carousel('next');
            resetTimer();
        }, 8000);
    };

    // Inicializar el carrusel y el contador automático
    var autoChangeInterval = autoChange();

    // Actualizar los indicadores cuando cambia el carrusel
    $('#carouselExampleIndicators').on('slid.bs.carousel', function (e) {
        const $activeIndicator = $('.indicators li.active');
        $activeIndicator.removeClass('active');
        const index = $('#carouselExampleIndicators .carousel-item.active').index();
        $('.indicators li').eq(index).addClass('active');
        resetTimer();
    });

    // Deshabilitar el botón de preview mientras la animación está en curso
    $('#carouselExampleIndicators').on('slide.bs.carousel', function (e) {
        $('.carousel-control-preview').prop('disabled', true);
		$('.carousel-control-preview-mobile').prop('disabled', true);
    });

    // Habilitar el botón de preview cuando la animación ha finalizado
    $('#carouselExampleIndicators').on('slid.bs.carousel', function (e) {
        $('.carousel-control-preview').prop('disabled', false);
		$('.carousel-control-preview-mobile').prop('disabled', false);
    });

    // Realizar el cambio manual al hacer clic en cualquier control del carrusel
    $('.carousel-control-nextt, .carousel-control-preview, .indicators li').click(function() {
        // Realizar el cambio manual al elemento anterior o siguiente
        $('#carouselExampleIndicators').carousel(($(this).hasClass('carousel-control-nextt') ? 'next' : 'prev'));
        resetTimer();
    });
    
    // Evitar el desplazamiento hacia abajo al hacer clic en el botón de control-preview-mobile
    $('.carousel-control-preview-mobile').click(function(event) {
        event.preventDefault(); // Evitar el comportamiento predeterminado del enlace o botón
        resetTimer();
    });

    // Función para reiniciar el temporizador
    function resetTimer() {
        clearInterval(autoChangeInterval);
        autoChangeInterval = autoChange();
    }
	
});



//slider del spa

$(document).ready(function() {
    var slides = $(".slider-spa-img");
    var dotsContainer = $(".slider-dot-spa");
    var currentSlide = 0;
    var interval;

    // Agregar dots dinámicamente
    slides.each(function(index) {
        var dot = $("<div class='dot-spa'></div>");
        dot.click(function() {
            showSlide(index);
        });
        dotsContainer.append(dot);

        // Agregar la clase "active" al primer dot
        if (index === 0) {
            dot.addClass("active");
        }
    });

    function showSlide(index) {
        $(".slider-spa").css("transform", "translateX(-" + index * 100 + "%)");
        dotsContainer.find(".dot-spa").removeClass("active"); // Remover la clase "active" de todos los dots
        dotsContainer.find(".dot-spa").eq(index).addClass("active"); // Agregar la clase "active" al dot correspondiente
        currentSlide = index;
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function startSlider() {
        interval = setInterval(nextSlide, 5000); // Cambia de slide cada 5 segundos
    }

    function stopSlider() {
        clearInterval(interval);
    }

    startSlider();
});



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






