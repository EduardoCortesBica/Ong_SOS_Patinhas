document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            // Adiciona ou remove a classe 'active' da navegação
            navLinks.classList.toggle('active');
        });
    }
});