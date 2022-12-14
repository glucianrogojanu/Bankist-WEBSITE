"use strict";


const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const nav = document.querySelector("nav.nav");



/*
TABBED COMPONENT:
In sectiunea cu id-ul "section--2"("Operations" section), cand dam click pe unul dintre butoanele "01 Instant Transfers", "02 Instant Loans" sau "03 Instant Closing":
   - Butonul apasat se va ridica putin in sus, in timp ce restul vor sta mai jos.
   - Sub butoane va aparea fereastra corespunzatoare butonului apasat.
*/
document.querySelector("div.operations__tab-container").addEventListener("click", function(e) {
    if (e.target.closest("button")) {
        document.querySelectorAll("button.btn.operations__tab").forEach(function(elem) { elem.classList.remove("operations__tab--active"); });
        e.target.closest("button").classList.add("operations__tab--active");
        document.querySelectorAll("div.operations__content").forEach(function(elem) { elem.classList.remove("operations__content--active"); });
        document.querySelector(`div.operations__content--${e.target.closest("button").dataset.tab}`).classList.add("operations__content--active");
    }
});



/* 
SLIDER COMPONENT:
    - Butoanele(Cele 3 puncte de sub slider): Te duce pe slide-ul corespunzator butonului apasat.
    - Sageata spre dreapta si sageata spre stanga(Butoanele de la tastatura, NU cele de pe site): Apesi pe sageata din dreapta, te duce la slide-ul urmator. Apesi pe sageata din stanga, te duce la slide-ul precedent.
    - Butoanele(Cele de pe site, cu sageata la dreapta si sageata la stanga): Apesi pe butonul cu sageata la dreapta, te duce la slide-ul urmator. Apesi pe butonul cu sageata la stanga, te duce la slide-ul precedent.
 */
    const slider = document.querySelector(".slider");
    const slides = document.querySelectorAll(".slide");
    const btnLeft = document.querySelector("button.slider__btn--left");
    const btnRight = document.querySelector("button.slider__btn--right");
    const dotsContainer = document.querySelector("div.dots");
    let curSlide = 0;
    
    const goToSlide = function(slide) {  //Mergi la slide-ul ce il scriem noi aici.
        slides.forEach(function(elem, index) { elem.style.transform = `translateX(${100 * (index - slide)}%)`; });
        document.querySelectorAll("button.dots__dot").forEach(function(elem) { elem.classList.remove("dots__dot--active"); });
        document.querySelector(`button.dots__dot[data-slide="${slide}"]`).classList.add("dots__dot--active");
    };
    const nextSlide = function() {  //Mergi la urmatorul slide.
        curSlide = (curSlide === (slides.length - 1)) ? 0 : curSlide + 1;
        goToSlide(curSlide);
    };
    const prevSlide = function() {  //Mergi la precedentul slide.
        curSlide = (curSlide === 0) ? slides.length - 1 : curSlide - 1;
        goToSlide(curSlide);
    };
    
    slides.forEach(function(elem, index) {
        dotsContainer.insertAdjacentHTML("beforeend", `<button class="dots__dot" data-slide="${index}"></button>`);
    });
    goToSlide(0);
    
    btnRight.addEventListener("click", nextSlide);  //Cand dam click pe butonul din dreapta sa ne duca slider-ul in dreapta.
    btnLeft.addEventListener("click", prevSlide);  //Cand dam click pe butonul din stanga sa ne duca slider-ul in stanga.
    document.addEventListener("keydown", function(e) {  //Cand dam click la tastatura pe sageata din stanga sau din dreapta sa ne duca slider-ul in acea parte.
        if (e.key === "ArrowLeft") prevSlide();
        if (e.key === "ArrowRight") nextSlide();
    });
    dotsContainer.addEventListener("click", function(e) {  //Cand dam click pe unul din butoane(Partea de jos), sa ne mute automat slider-ul acolo.
        if (e.target.closest("button.dots__dot")) {
            goToSlide(e.target.closest("button.dots__dot").dataset.slide);
        }
    });



/*
Cand punem mouse-ul peste unul din elementele de sus: Logo-ul "BANKIST" sau unul dintre cele 4 butoane: "Features", ..., "Open account", butonul peste care suntem cu mouse-ul va ramane la o opacitate de 1, in timp ce restul vor scadea la o opacitate de 0,5.
*/
nav.addEventListener("mouseover", function(e) {
    let allElements = [document.querySelector("img.nav__logo") ,...document.querySelectorAll("a.nav__link")];
    if (allElements.includes(e.target)) {
        allElements.forEach(function(elem) { elem.style.opacity = "0.5"; });
        e.target.style.opacity = "1";
    }
});
nav.addEventListener("mouseout", function(e) {
    let allElements = [document.querySelector("img.nav__logo") ,...document.querySelectorAll("a.nav__link")];
    if (allElements.includes(e.target)) allElements.forEach(function(elem) { elem.style.opacity = "1"; });
});



// INTERSECTION OBSERVER:
/* Elementul <nav> din partea de sus a paginii va deveni "sticky" atat timp cat timp elementul <header> nu va mai fi vizibil deloc. (Atentie: Am scazut 90px din <header>). */
let fn1 = function(arr) {
    arr.forEach(function(elem) {
        elem.isIntersecting ? nav.classList.remove("sticky") : nav.classList.add("sticky");
    });
};
let opt1 = {
    root: null,
    threshold: 0,
    rootMargin: `-${getComputedStyle(nav).height}`
};
let io1 = new IntersectionObserver(fn1, opt1);
io1.observe(document.querySelector("header"));
// INTERSECTION OBSERVER:
/* In momentul in care scrolam in jos fiecare sectiune apare odata ce o parte din ea devine vizibila(threshold: 0.1) alaturi de un efect de derulare in sus. */
let fn2 = function(arr) {
    arr.forEach(function(elem) {
        if (elem.isIntersecting) elem.target.classList.remove("section--hidden");
    });
}
let opt2 = {
    root: null,
    threshold: 0.1
};
let io2 = new IntersectionObserver(fn2, opt2);
document.querySelectorAll("section.section").forEach(function(elem) { elem.classList.add("section--hidden"); });
document.querySelectorAll("section.section").forEach(function(elem) { io2.observe(elem); });
// INTERSECTION OBSERVER:
/* In momentul in care imaginile din Sectiunea Fetatures(Sectiunea cu id-ul "section--1") devin vizibile(threshold: 1), stergem efectul de blur al acestora + ca inlocuim imaginea mai putin clara cu una mai clara. */
let fn3 = function(arr) {
    arr.forEach(function(elem) {
        if (elem.isIntersecting) {
            elem.target.classList.remove("lazy-img");
            elem.target.src = elem.target.dataset.src;
        }
    });
};
let opt3 = {
    root: null,
    threshold: 1
};
let io3 = new IntersectionObserver(fn3, opt3);
document.querySelectorAll("img.features__img").forEach(function(elem) { io3.observe(elem); });



/*
Fereastra cu "Open your bank account in just 5 minutes":
   - Se deschide cand apasam unul dintre butoanele "Open account"(Sus in pagina) sau "Open your free account today!"(Jos in pagina).
   - Se inchide cand apasam una din variantele: Esc la tastatura. / Butonul X pe fereastra. / Oridune in afara ferestrei.
*/
let openModal = function(e) {
    e.preventDefault();
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
};
let closeModal = function() {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
};
btnsOpenModal.forEach(function(elem) { elem.addEventListener("click", openModal); });
btnCloseModal.addEventListener("click", closeModal);
document.addEventListener("keydown", function(e) {
    if (e.key === "Escape") closeModal();
});
overlay.addEventListener("click", closeModal);



/*
Daca apasam pe unul din cele 3 butoane de sus: "Features", "Operations" sau "Testimonials", ne va scrola automat la sectiunea corespunzatoare. ("Features"--->Scrol la sectiunea cu id-ul "section--1" / "Operations"---> "section--2" / "Testimonials"---> "section--3")
 */
document.querySelector("ul.nav__links").addEventListener("click", function(e) {
    e.preventDefault();
    if (e.target.closest("li.nav__item")) {
        if (!e.target.classList.contains("nav__link--btn")) {
            let id = e.target.getAttribute("href");
            document.querySelector(`section${id}`).scrollIntoView({behavior: "smooth"});
        }
    }
});
/* Cand apasam pe butonul "Learn more"(Sus in pagina) ne scroleaza automat la sectiunea cu id-ul "section--1". */
document.querySelector("button.btn--text").addEventListener("click", function() {
    document.getElementById("section--1").scrollIntoView({behavior: "smooth"});
});
