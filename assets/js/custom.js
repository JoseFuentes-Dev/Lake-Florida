(function ($) {
	
	"use strict";

	// Page loading animation
	$(window).on('load', function() {

        $('#js-preloader').addClass('loaded');

    });


	$(window).scroll(function() {
	  let scroll = $(window).scrollTop();
	  let box = $('.home').height();
	  let header = $('header').height();

	  if (scroll >= box - header) {
	    $("header").addClass("background-header");
	  } else {
	    $("header").removeClass("background-header");
	  }
	})

	

	let width = $(window).width();
		$(window).resize(function() {
		if (width > 767 && $(window).width() < 767) {
			location.reload();
		}
		else if (width < 767 && $(window).width() > 767) {
			location.reload();
		}
	})

	


	// Menu Dropdown Toggle
	if($('.menu-trigger').length){
		$(".menu-trigger").on('click', function() {	
			$(this).toggleClass('active');
			$('.header-area .nav').slideToggle(200);
		});
	}


	// Menu elevator animation
	$('.scroll-to-section a[href*=\\#]:not([href=\\#])').on('click', function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			let target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
				let width = $(window).width();
				if(width < 991) {
					$('.menu-trigger').removeClass('active');
					$('.header-area .nav').slideUp(200);	
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




window.addEventListener('scroll', function() {
    var scrollPosition = window.scrollY;

    // Obtener todos los divs con un id
    var divs = document.querySelectorAll('[id]');

    var activeLink = document.querySelector('a.active');
    
    // Iterar sobre cada div para verificar si está en la pantalla
    divs.forEach(function(div) {
        var divTop = div.offsetTop;
        var divHeight = div.clientHeight;
        var id = div.getAttribute('id');

        if (scrollPosition >= divTop && scrollPosition < divTop + divHeight) {
            // Si el div está en la pantalla, agregar la clase "active" al enlace correspondiente
            var navLink = document.querySelector('a[href="#' + id + '"]');
            if (navLink && !navLink.classList.contains('active')) {
                // Eliminar la clase active del enlace anterior si existe
                if (activeLink) {
                    activeLink.classList.remove('active');
                }
                navLink.classList.add('active');
                activeLink = navLink;
            }
        }
    });
});


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
    });

    // Habilitar el botón de preview cuando la animación ha finalizado
    $('#carouselExampleIndicators').on('slid.bs.carousel', function (e) {
        $('.carousel-control-preview').prop('disabled', false);
    });

    // Realizar el cambio manual al hacer clic en cualquier control del carrusel
    $('.carousel-control-nextt, .carousel-control-preview, .indicators li').click(function() {
        // Realizar el cambio manual al elemento anterior o siguiente
        $('#carouselExampleIndicators').carousel(($(this).hasClass('carousel-control-nextt') ? 'next' : 'prev'));
        resetTimer();
    });

    // Función para reiniciar el temporizador
    function resetTimer() {
        clearInterval(autoChangeInterval);
        autoChangeInterval = autoChange();
    }
});


















