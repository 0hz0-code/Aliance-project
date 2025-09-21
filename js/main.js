const navbar = document.querySelector(".navbar");
const logo = document.querySelector(".logo-svg use");
const mMenuToggle = document.querySelector(".mobile-menu-toggle");
const menu = document.querySelector(".mobile-menu");
const isFront = document.body.classList.contains("front-page");

const lightModeOn = (event) => {
    navbar.classList.add("navbar-light");
}

const lightModeOff = (event) => {
    navbar.classList.remove("navbar-light");
}

const changeNavHeight = (height) => {
    navbar.style.height = height;
}

const openMenu = (event) => {  // функция открывания меню
    menu.classList.add("is-open"); // вешает класс is-open 
    mMenuToggle.classList.add("close-menu");
    document.body.style.overflow = "hidden"; // запрешаем прокрутку сайта под меню
    lightModeOn();
}

const closeMenu = (event) => {  // функция закрывания меню
    menu.classList.remove("is-open"); // убирает класс is-open
    mMenuToggle.classList.remove("close-menu");
    document.body.style.overflow = ""; // возвращает прокрутку сайта под меню
    lightModeOff();
}

window.addEventListener("scroll", () => {
    this.scrollY > 1 ? changeNavHeight("4.5rem") : changeNavHeight("5.875rem");
    if (isFront) {
        this.scrollY > 1 ? lightModeOn() : lightModeOff();
    }
});
mMenuToggle.addEventListener("click", (event) => {
    event.preventDefault(); menu.classList.contains("is-open") ? closeMenu() : openMenu();
});

const swiperSteps = new Swiper(".steps-slider", {
    speed: 400,
    slidesPerView: 1,
    navigation: {
        nextEl: '.steps-button-next',
        prevEl: '.steps-button-prev',
    },
    breakpoints: {
        // when window width is >= 576px
        576: {
            slidesPerView: 2,
        },
        // when window width is >= 768px
        768: {
            slidesPerView: 3,
        },
        // when window width is >= 1024px
        1024: {
            slidesPerView: 4,
        },
    }

});

const swiper = new Swiper(".features-slider", {
    speed: 400,
    autoHeight: true,
    slidesPerView: 1,
    navigation: {
        nextEl: '.slider-button-next',
        prevEl: '.slider-button-prev',
    },

    breakpoints: {
        // when window width is >= 576px
        576: {
            slidesPerView: 2,
        },
        // when window width is >= 768px
        768: {
            slidesPerView: 3,
        },
        // when window width is >= 1024px
        1024: {
            slidesPerView: 4,
        },
        // when window width is >= 1200px
        1200: {
            slidesPerView: 5,
        },
    },
});

const swiperBlog = new Swiper(".blog-slider", {
    speed: 400,
    slidesPerView: 2,
    spaceBetween: 30,
    navigation: {
        nextEl: '.blog-button-next',
        prevEl: '.blog-button-prev',
    },
});

document.addEventListener("DOMContentLoaded", () => {
    let currentModal = null;

    const modalButtons = document.querySelectorAll("[data-toggle=modal]")

    modalButtons.forEach((button) => {
        /*клик по переключателю*/
        button.addEventListener("click", (event) => {
            event.preventDefault();
            /*определяем текущее открытое окно*/
            currentModal = document.querySelector(button.dataset.target);
            /* открываем текущее окно */
            currentModal.classList.toggle("is-open");
            /* открываем диалоговое окно*/
            const modalDialog = currentModal.querySelector(".modal-dialog");
            /* отслеживаем клик по окну и пустым областям */
            currentModal.addEventListener("click", (event) => {
                /* если клик в пустую область (не диалог) */
                if (!event.composedPath().includes(modalDialog)) {
                    /* закрываем окно */
                    currentModal.classList.remove("is-open");
                }
            });
        });
    });
    
    /* ловим событие  нажатия на кнопку */
    document.addEventListener("keyup", (event) => {
        /* проверяем, что за Escape и текущее окно открыто */
        if(event.key == "Escape" && currentModal && currentModal.classList.contains("is-open")) {
            /*закрываем текущее окно*/
            currentModal.classList.remove("is-open");
        }
    });
});

const forms = document.querySelectorAll("form");
forms.forEach((form) => {
    const validation = new JustValidate(form, {
        errorFieldCssClass: 'is-invalid',
    });
    validation
    .addField("[name=username]", [
        {
            rule: 'required',
            errorMessage: "Укажите имя"
        },
        {
            rule: 'maxLength',
            value: 50,
            errorMessage: "Максимально 50 символов"
        },
    ])
    .addField("[name=userphone]", [
        {
            rule: 'required',
            errorMessage: 'Укажите телефон',
        },
        {
            rule: 'minLength',
            value: 11,
            errorMessage: 'Номер должен содержать 11 цифр'
        }
    ])

.onSuccess((event) => {
    event.preventDefault();
    
    const thisForm = event.target;
    const formData = new FormData(thisForm);
    
    const currentModal = thisForm.closest('.modal');
    
    fetch(thisForm.getAttribute("action"), {
        method: "POST",
        body: formData,
    })
    .then((response) => {
        if (response.ok) {
            thisForm.reset();
            
            if (currentModal) {
                currentModal.style.display = 'none';
                currentModal.classList.remove("is-open");
            }
            
            const alertModal = document.getElementById("alert-modal");
            if (alertModal) {
                alertModal.style.display = 'flex';
                alertModal.classList.add("is-open");
                
                const modalDialog = alertModal.querySelector(".modal-dialog");
                alertModal.addEventListener("click", function modalClickHandler(e) {
                    if (!e.composedPath().includes(modalDialog)) {
                        alertModal.style.display = 'none';
                        alertModal.classList.remove("is-open");
                        alertModal.removeEventListener("click", modalClickHandler);
                    }
                });
                
                document.addEventListener("keyup", function escapeHandler(e) {
                    if(e.key == "Escape" && alertModal.classList.contains("is-open")) {
                        alertModal.style.display = 'none';
                        alertModal.classList.remove("is-open");
                        document.removeEventListener("keyup", escapeHandler);
                    }
                });
            }
        } else {
            alert("Ошибка отправки: " + response.statusText);
        }
    })
    .catch((error) => {
        alert("Ошибка сети: " + error.message);
    });
});

});

/* Улучшенная маска для телефона (+7) */
const formatPhoneNumber = (input) => {
  const value = input.value.replace(/\D+/g, "");
  const numberLength = 11;
  let result = input.value.includes("+8") || input.value[0] === "8" ? "" : "+";

  for (let i = 0; i < value.length && i < numberLength; i++) {
    switch (i) {
      case 0: 
        result += value[i] === "8" ? "+7 (" : value[i] === "9" ? "7 (9" : "7 (";
        continue;
      case 4: result += ") "; break;
      case 7: result += "-"; break;
      case 9: result += "-"; break;
    }
    result += value[i];
  }
  input.value = result;
};

document.addEventListener('input', (e) => {
  if (e.target.getAttribute('name') === 'userphone') {
    formatPhoneNumber(e.target);
    
    const phoneDigits = e.target.value.replace(/\D+/g, '');
    if (phoneDigits.length !== 11) {
      e.target.setCustomValidity('Номер должен содержать 11 цифр');
    } else {
      e.target.setCustomValidity('');
    }
  }
});

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('input[name="userphone"]').forEach(input => {
    input.addEventListener('input', (e) => {
      formatPhoneNumber(e.target);
    });
  });
});
