//automatic text write
function typeWriter(text, elementId, speed) {
    let index = 0;
    const targetElement = document.getElementById(elementId);
  
    function type() {
      if (index < text.length) {
        targetElement.innerHTML += text.charAt(index);
        index++;
        setTimeout(type, speed);
      }
    }
  
    type();
  }
  
  // Uso de la función
  const textToType = "Thank you for contacting us.";
  const typingSpeed = 80; // Milisegundos entre cada letra
  const targetElementId = "typewriter"; // ID del elemento donde se escribirá el texto
  
  typeWriter(textToType, targetElementId, typingSpeed);


  //redirect seconds

  function iniciarContador() {
    let contador = 10; // Segundos
  
    const intervalo = setInterval(function() {
      contador--;
  
      if (contador < 0) {
        clearInterval(intervalo); // Detener el contador cuando llegue a cero
        redireccionar(); // Redirigir después del contador
      }
    }, 1000); // Actualizar cada segundo
  }
  
  function redireccionar() {
    const urlDestino = "index.html"; // URL de destino
    window.location.href = urlDestino; // Redireccionar a la URL
  }
  
  // Iniciar el contador al cargar la página
  window.onload = function() {
    iniciarContador();
  };

  