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