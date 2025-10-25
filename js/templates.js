// Arquivo: js/templates.js

document.addEventListener('DOMContentLoaded', function() {

    // 1. NOSSOS DADOS (Fonte para o template)
    const projectImages = {
        resgate: [
            { src: 'images/resgatebob.png', alt: 'Foto do cachorro Bob sendo resgatado' },
            { src: 'images/resgatepitoco.png', alt: 'Foto do pitoco sendo resgatado' },
            { src: 'images/resgatesirius.png', alt: 'Foto do gato Sirius sendo resgatado' }
        ],
        saude: [
            { src: 'images/examebob.png', alt: 'Cachorro sendo examinado' },
            { src: 'images/examesirius.png', alt: 'Gato sendo examinado' },
            { src: 'images/examepitoco.png', alt: 'Cão de porte pequeno sendo examinado' }
        ],
        adocao: [
            { src: 'images/adocao2.png', alt: 'Pessoa interagindo com animal' },
            { src: 'images/adocao3.png', alt: 'Pessoa interagindo com animal' },
            { src: 'images/Adocao1.png', alt: 'Pessoa interagindo com animal' }
        ]
    };

    // 2. ENCONTRAR TODOS OS CARROSSÉIS NA PÁGINA
    const carousels = document.querySelectorAll('.carousel');
    
    // Se não houver carrosséis nesta página, não faz nada
    if (carousels.length === 0) {
        return;
    }

    // 3. CONSTRUIR CADA CARROSSEL
    carousels.forEach(carousel => {
        // Pega o ID do projeto (ex: "resgate") do data-attribute
        const projectId = carousel.dataset.projectId;
        const images = projectImages[projectId];
        
        // Se não encontrar dados para esse ID, pula este carrossel
        if (!images) {
            return;
        }

        // --- Início do Template JavaScript ---
        // Aqui criamos o HTML dinamicamente
        let slidesHTML = '';
        let dotsHTML = '';

        images.forEach((image, index) => {
            // Cria os slides
            slidesHTML += `
                <div class="carousel-item">
                    <img src="${image.src}" alt="${image.alt}">
                </div>`;
            
            // Cria os "pontinhos"
            dotsHTML += `
                <span class="carousel-dot ${index === 0 ? 'active' : ''}" data-slide-to="${index}"></span>`;
        });

        // Monta a estrutura final do carrossel
        const carouselStructure = `
            <div class="carousel-inner">
                ${slidesHTML}
            </div>
            <button class="carousel-control prev">&lt;</button>
            <button class="carousel-control next">&gt;</button>
            <div class="carousel-dots">
                ${dotsHTML}
            </div>
        `;
        // --- Fim do Template ---

        // 4. INSERIR O HTML GERADO NO DOM
        carousel.innerHTML = carouselStructure;

        // 5. ADICIONAR FUNCIONALIDADE (Manipulação do DOM)
        // Precisamos encontrar os elementos que acabamos de criar
        const inner = carousel.querySelector('.carousel-inner');
        const dots = carousel.querySelectorAll('.carousel-dot');
        const prevBtn = carousel.querySelector('.prev');
        const nextBtn = carousel.querySelector('.next');
        let currentIndex = 0;
        const totalSlides = images.length;

        // Função para trocar de slide
        function goToSlide(index) {
            // Lógica para loop (se passar do último, volta ao primeiro)
            if (index < 0) {
                index = totalSlides - 1;
            } else if (index >= totalSlides) {
                index = 0;
            }
            
            // Move o container dos slides
            inner.style.transform = `translateX(-${index * 100}%)`;
            
            // Atualiza qual "pontinho" está ativo
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
            
            currentIndex = index;
        }

        // Adiciona os eventos de clique nos botões
        prevBtn.addEventListener('click', () => {
            goToSlide(currentIndex - 1);
        });

        nextBtn.addEventListener('click', () => {
            goToSlide(currentIndex + 1);
        });

        // Adiciona os eventos de clique nos "pontinhos"
        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                // Pega o número do slide do data-attribute
                const slideIndex = parseInt(dot.dataset.slideTo);
                goToSlide(slideIndex);
            });
        });
    });
});