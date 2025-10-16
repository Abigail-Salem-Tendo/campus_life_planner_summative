document.addEventListener('DOMContentLoaded', (event) => {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    hamburger.addEventListener('click', (e) => {
        navLinks.classList.toggle('show');
        hamburger.classList.toggle('active');
    });
});
