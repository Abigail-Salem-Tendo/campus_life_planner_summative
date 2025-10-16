// this file contains the logic of the hamburger menu
document.addEventListener('DOMContentLoaded', (event) => {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    hamburger.addEventListener('click', (e) => {
        navLinks.classList.toggle('show');
        const expanded = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', !expanded);
        //hamburger.classList.toggle('active');
    });
});
