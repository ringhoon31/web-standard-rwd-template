// 별 보기 가이드 탭
const tabs = document.querySelectorAll(".guide-tabs li");
const cards = document.querySelectorAll(".guide-content li");
function showGuide(index) {
    // 1. 전부 on 빼기
    tabs.forEach((tab) => tab.classList.remove("on"));
    cards.forEach((card) => card.classList.remove("on"));
    // 2. 선택한 번호에만 on 붙이기
    tabs[index].classList.add("on");
    cards[index].classList.add("on");
}

tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => showGuide(index));
});
cards.forEach((card, index) => {
    card.addEventListener("click", () => showGuide(index));
});
showGuide(0);

const body = document.querySelector('body')
const topBtn = document.querySelector('.top')
const mNavBtn = document.querySelector('.mob-nav-btn')
const navBtns = document.querySelectorAll('nav ul li a')


navBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault()

        const id = btn.getAttribute('href')
        const target = document.querySelector(id)
        const headerH = document.querySelector('header').offsetHeight
        window.scrollTo({
            top: target.offsetTop - headerH,
            behavior: "smooth"
        })
        body.classList.remove('m-nav-open')
    })
})

body.classList.add('scroll')

window.addEventListener('scroll', () => {
    console.log(window.scrollY);
    if (window.scrollY > 100) {
        body.classList.add('scroll')
    } else {
        body.classList.remove('scroll')
    }
})

topBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
})

mNavBtn.addEventListener('click', (e) => {
    e.preventDefault()
    body.classList.toggle('m-nav-open')
})




var swiper = new Swiper('.gallery', {
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
    },
    loop: true
});




// 모달 열기
const moreBtns = document.querySelectorAll('.post .more, .post .bg');
const modals = document.querySelectorAll('.modal');

let lastFocused = null;

function closeModal() {
    modals.forEach(modal => {
        modal.classList.remove('on');
        modal.setAttribute('aria-hidden', 'true');
    });

    document.body.classList.remove('modal-open');
    lastFocused?.focus();
}

// 더 읽기 클릭
moreBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();

        const modalId = btn.dataset.modal;
        const modal = document.getElementById(modalId);

        if (!modal) return;

        lastFocused = btn;

        modals.forEach(item => {
            item.classList.remove('on');
            item.setAttribute('aria-hidden', 'true');
        });

        modal.classList.add('on');
        modal.setAttribute('aria-hidden', 'false');

        document.body.classList.add('modal-open');

        modal.querySelector('.modal-close').focus();
    });
});

// 닫기 버튼 및 배경 클릭
modals.forEach(modal => {
    const closeBtn = modal.querySelector('.modal-close');

    modal.setAttribute('aria-hidden', 'true');

    closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
});

// ESC 키
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});