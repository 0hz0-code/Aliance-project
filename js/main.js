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
    const modal = document.querySelector(".modal");
    const modalContent = document.querySelector(".modal-content");
    const modalToggle = document.querySelectorAll("[data-toggle=modal]");
    const modalClose = document.querySelector(".modal-close");

    const closeModal = () => {
        modal.classList.remove("is-open");
    };

    modalToggle.forEach((element) => {
        element.addEventListener("click", (event) => {
            event.preventDefault();
            modal.classList.add("is-open");
        });
    });

    modalClose.addEventListener("click", (event) => {
        event.preventDefault();
        closeModal();
    });

    // Закрытие при клике вне окна
    modal.addEventListener("click", (event) => {
        console.log("Clicked element:", event.target);
        if (event.target === modal) {
            closeModal();
        }
    });

    // Закрытие по Escape
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && modal.classList.contains("is-open")) {
            closeModal();
        }
    });
});
