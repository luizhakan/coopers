let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides((slideIndex += n));
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

document.addEventListener('DOMContentLoaded', () => {
  // Função para limpar todas as checkboxes de um container específico
  function clearCheckboxes(containerSelector) {
    const checkboxes = document.querySelectorAll(`${containerSelector} .checkbox input[type="checkbox"]`);
    checkboxes.forEach(checkbox => {
      checkbox.checked = false;
    });
  }

  // Adicionar event listeners para os botões "Erase All"
  const eraseAllTodoButton = document.getElementById('eraseAllTodo');
  const eraseAllDoneButton = document.getElementById('eraseAllDone');

  eraseAllTodoButton.addEventListener('click', () => {
    clearCheckboxes('.container-card:nth-of-type(1)');
  });

  eraseAllDoneButton.addEventListener('click', () => {
    clearCheckboxes('.container-card:nth-of-type(2)');
  });
});


document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("contactForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      const formData = {
        message: `${
          document.getElementById("exampleFormControlTextarea1").value
        } 
      ${document.getElementById("exampleInputName").value}
      ${document.getElementById("exampleInputPhone").value} - ${
          document.getElementById("exampleInputEmail1").value
        }
      `,
      };

      emailjs.init("CFOPep89HsrhAlmcL");

      emailjs
        .send("service_14bem8d", "template_g69l4qb", formData)
        .then(
          function (response) {
            console.log("SUCCESS!", response.status, response.text);
            alert("E-mail enviado com sucesso!");
            // limpar os campos
            document.getElementById("contactForm").reset();
          },
          function (error) {
            console.log("FAILED...", error);
            alert("O envio do e-mail falhou. Tente novamente mais tarde.");
          }
        )
        .catch(function (error) {
          console.log("Error", error);
          alert(
            "Ocorreu um erro. Por favor, verifique o console para mais detalhes."
          );
        });
    });
});
