"use strict";


const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');



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



/* Cand apasam pe butonul "Learn more"(Sus in pagina) ne scroleaza automat la sectiunea cu id-ul "section--1". */
document.querySelector("button.btn--text").addEventListener("click", function() {
    document.getElementById("section--1").scrollIntoView({behavior: "smooth"});
});



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