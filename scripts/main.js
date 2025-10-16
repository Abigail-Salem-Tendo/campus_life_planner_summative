// this file contains the logic of the hamburger menu
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    hamburger.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('show')
        hamburger.setAttribute('aria-expanded', isOpen)

        hamburger.style.display = isOpen ? 'none' : 'block';
    })

});
