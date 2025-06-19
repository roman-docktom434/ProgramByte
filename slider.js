// Функциональность бокового меню
document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.querySelector('.menu-icon');
    const sidebarMenu = document.querySelector('.sidebar-menu');
    const sidebarOverlay = document.querySelector('.sidebar-overlay');
    const closeMenu = document.querySelector('.close-menu');
    
    // Открытие меню при клике на иконку
    menuIcon.addEventListener('click', function(e) {
        e.stopPropagation();
        sidebarMenu.classList.add('active');
        sidebarOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Блокируем прокрутку страницы
    });
    
    // Закрытие меню при клике на крестик
    closeMenu.addEventListener('click', function() {
        sidebarMenu.classList.remove('active');
        sidebarOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Возвращаем прокрутку
    });
    
    // Закрытие меню при клике на затемнение
    sidebarOverlay.addEventListener('click', function() {
        sidebarMenu.classList.remove('active');
        sidebarOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Закрытие меню при клике на пункт меню
    const menuLinks = document.querySelectorAll('.sidebar-menu-list a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            sidebarMenu.classList.remove('active');
            sidebarOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Закрытие меню при нажатии Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && sidebarMenu.classList.contains('active')) {
            sidebarMenu.classList.remove('active');
            sidebarOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.courses-slider');
    if (!slider) return; // <--- добавь эту строку!
    const sections = slider.querySelectorAll('.course-section');
    const arrows = slider.querySelectorAll('.arrow-box');
    let current = 0;

    arrows.forEach(arrow => {
        arrow.addEventListener('click', () => {
            const prev = current;
            const next = (current + 1) % sections.length;
            sections[prev].classList.remove('active');
            setTimeout(() => {
                sections[next].classList.add('active');
                current = next;
            }, 500); // Время совпадает с transition
        });
    });
});

// Бесшовная бесконечная анимация для карточек (новая карточка появляется заранее справа)
(function() {
    const track = document.getElementById('carousel-track');
    if (!track) return;
    let cards = Array.from(track.querySelectorAll('.testimonial-card'));
    if (cards.length < 1) return;
    let cardWidth = cards[0].offsetWidth;
    let gap = 24;
    let container = track.parentElement;
    let containerWidth = container.offsetWidth;

    // Дублируем карточки, пока их суммарная ширина не больше ширины контейнера + одной карточки
    let minCards = Math.ceil((containerWidth + cardWidth + gap) / (cardWidth + gap));
    while (track.children.length < minCards) {
        cards.forEach(card => {
            track.appendChild(card.cloneNode(true));
        });
    }

    let pos = 0;
    let speed = 1.2; // px per frame

    function updateCardWidth() {
        cards = track.querySelectorAll('.testimonial-card');
        cardWidth = cards[0].offsetWidth;
        containerWidth = container.offsetWidth;
    }

    function animate() {
        pos -= speed;
        track.style.transition = 'none';
        track.style.transform = `translateX(${pos}px)`;
        while (-pos >= cardWidth + gap) {
            track.appendChild(track.children[0]);
            pos += cardWidth + gap;
            track.style.transform = `translateX(${pos}px)`;
            updateCardWidth();
        }
        requestAnimationFrame(animate);
    }
    window.addEventListener('resize', updateCardWidth);
    updateCardWidth();
    pos = 0;
    track.style.transform = `translateX(0px)`;
    animate();
})();