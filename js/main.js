document.addEventListener('DOMContentLoaded', function () {
    window.addEventListener('scroll', function () {
        var header = document.querySelector('.header');
        if (window.scrollY > 50) {  // If scroll is greater than 50px
            header.classList.add('scrolled');
            // Change logo to a different one
            document.querySelector('.logo img').src = './img/logo.png';
        } else {
            header.classList.remove('scrolled');
            // Change logo back to original one
            document.querySelector('.logo img').src = './img/log0.png';
        }
    });
});