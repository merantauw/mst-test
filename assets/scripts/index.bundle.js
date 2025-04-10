/*начало кода header*/
document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header');
    const burger = document.querySelector('.header__burger');
    const menu = document.querySelector('.header__menu');

    function getScrollbarWidth() {
        const outer = document.createElement('div');
        outer.style.visibility = 'hidden';
        outer.style.overflow = 'scroll';
        document.body.appendChild(outer);

        const inner = document.createElement('div');
        outer.appendChild(inner);

        const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
        outer.parentNode.removeChild(outer);

        return scrollbarWidth;
    }

    /*Логика для затемнения фона шапки при скролле*/
    window.addEventListener('scroll', () => {
        if (window.scrollY > 75) {
            header.classList.add('scroll');
        } else {
            header.classList.remove('scroll');
        }

        setActiveSection();
    });

    // Логика для бургер-меню
    burger.addEventListener('click', () => {
        menu.classList.toggle('active');
        burger.classList.toggle('active');
        header.classList.add('scroll');

        // Блокируем/разблокируем прокрутку
        if (menu.classList.contains('active')) {
            const scrollbarWidth = getScrollbarWidth();
            document.body.classList.add('no-scroll');
            document.body.style.paddingRight = `${scrollbarWidth}px`;
        } else {
            document.body.classList.remove('no-scroll');
            document.body.style.paddingRight = '';
        }
    });

    /*Логика сворачивания меню при клике по пункту*/
    const menuItems = document.querySelectorAll('.header__menu-item a'); // Выбираем все ссылки в меню
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            menu.classList.remove('active');
            burger.classList.remove('active');
            document.body.classList.remove('no-scroll');
            document.body.style.paddingRight = '';
        });
    });

    /*Подсветка активного пункта меню*/
    const sections = document.querySelectorAll('.section');
    const menuLinks = document.querySelectorAll('.header__menu-item a');

    function setActiveSection() {
        let currentSection = null;

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();

            if (rect.top <= 50 && rect.bottom >= 50) {
                currentSection = section.getAttribute('id');
            }
        });

        menuLinks.forEach(link => {
            link.classList.remove('active');
        });

        if (currentSection) {
            const activeLink = document.querySelector(`.header__menu-item a[href="#${currentSection}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    }

    setActiveSection();

    /*Слушаем прокрутку*/
    window.addEventListener('scroll', setActiveSection);
});
/*конец кода header*/


/*начало кода клиентской валидации*/
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('send-form');
    const errorMessage = document.getElementById('error-message');

    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.classList.add('show');
    }

    function hideError() {
        errorMessage.classList.remove('show');
    }

    form.addEventListener('submit', (event) => {
        let isValid = true;

        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const privacyCheckbox = document.getElementById('privacy');

        if (!nameInput.value.trim()) {
            isValid = false;
        }

        if (!emailInput.validity.valid) {
            isValid = false;
        }

        if (!privacyCheckbox.checked) {
            isValid = false;
        }

        if (!isValid) {
            event.preventDefault();
            showError("Please check the correctness of all fields.");
        } else {
            hideError();
        }
    });

    form.addEventListener('input', () => {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const privacyCheckbox = document.getElementById('privacy');

        if (nameInput.value.trim() && emailInput.validity.valid && privacyCheckbox.checked) {
            hideError();
        }
    });
});
/*конец кода клиентской валидации*/
