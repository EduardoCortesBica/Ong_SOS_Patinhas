// ==========================================================
// DADOS GLOBAIS (do templates.js e charts.js)
// ==========================================================
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

const chartData = {
    labels: [
        'Resgates & Castrações', 
        'Adoções Concluídas'
    ],
    datasets: [{
        label: 'Total de Vidas Impactadas',
        data: [100, 90],
        backgroundColor: [
            'rgba(255, 102, 0, 0.7)',
            'rgba(0, 102, 204, 0.7)'
        ],
        borderColor: [
            'rgb(255, 102, 0)',
            'rgb(0, 102, 204)'
        ],
        borderWidth: 1
    }]
};

// ==========================================================
// FUNÇÕES DE INICIALIZAÇÃO DE COMPONENTES
// ==========================================================

// 1. Inicializa o Menu Hambúrguer
function initMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (menuToggle && navLinks && !navLinks.dataset.initialized) {
        navLinks.dataset.initialized = 'true'; // Previne múltiplos eventos
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
}

// 2. Inicializa a Validação de Formulário
function initFormValidation() {
    const form = document.getElementById('form-cadastro');
    if (!form) return;

    const nome = document.getElementById('nome');
    const email = document.getElementById('email');
    const cpf = document.getElementById('cpf');
    const telefone = document.getElementById('telefone');
    const formStatus = document.getElementById('form-status');

    const validateEmail = (email) => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(email).toLowerCase());
    const validateCPF = (cpf) => /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(String(cpf));
    const validateTelefone = (tel) => /^\(\d{2}\)\s?\d{4,5}-\d{4}$/.test(String(tel));
    const validateNome = (nome) => nome.trim().length > 0 && nome.trim().split(' ').length >= 2;

    const showError = (input, message) => {
        input.classList.add('invalid');
        const errorSpan = input.nextElementSibling;
        if(errorSpan && errorSpan.classList.contains('error-message')) {
            errorSpan.textContent = message;
        }
    };

    const clearError = (input) => {
        input.classList.remove('invalid');
        const errorSpan = input.nextElementSibling;
        if(errorSpan && errorSpan.classList.contains('error-message')) {
            errorSpan.textContent = '';
        }
    };

    // Previne múltiplos eventos de blur
    if (!form.dataset.initialized) {
        form.dataset.initialized = 'true';

        nome.addEventListener('blur', () => {!validateNome(nome.value) ? showError(nome, 'Por favor, insira seu nome completo.') : clearError(nome);});
        email.addEventListener('blur', () => {!validateEmail(email.value) ? showError(email, 'Por favor, insira um e-mail válido.') : clearError(email);});
        cpf.addEventListener('blur', () => {!validateCPF(cpf.value) ? showError(cpf, 'Formato: 000.000.000-00') : clearError(cpf);});
        telefone.addEventListener('blur', () => {!validateTelefone(telefone.value) ? showError(telefone, 'Formato: (00) 00000-0000') : clearError(telefone);});

        form.addEventListener('submit', function(event) {
            event.preventDefault(); 
            
            const isNomeValid = validateNome(nome.value);
            const isEmailValid = validateEmail(email.value);
            const isCpfValid = validateCPF(cpf.value);
            const isTelefoneValid = validateTelefone(telefone.value);
            
            if (!isNomeValid) showError(nome, 'Por favor, insira seu nome completo.');
            if (!isEmailValid) showError(email, 'Por favor, insira um e-mail válido.');
            if (!isCpfValid) showError(cpf, 'Formato: 000.000.000-00');
            if (!isTelefoneValid) showError(telefone, 'Formato: (00) 00000-0000');
            
            if (isNomeValid && isEmailValid && isCpfValid && isTelefoneValid) {
                formStatus.textContent = 'Cadastro enviado com sucesso!';
                formStatus.className = 'success';
                form.reset();
                [nome, email, cpf, telefone].forEach(clearError);
            } else {
                formStatus.textContent = 'Por favor, corrija os campos em vermelho.';
                formStatus.className = 'error';
            }
        });
    }
}

// 3. Inicializa os Carrosséis (lógica do templates.js)
function initCarousels() {
    const carousels = document.querySelectorAll('.carousel');
    if (carousels.length === 0) return;

    carousels.forEach(carousel => {
        // Se o carrossel já foi inicializado, não faz nada
        if (carousel.dataset.initialized) return;
        carousel.dataset.initialized = 'true';

        const projectId = carousel.dataset.projectId;
        const images = projectImages[projectId];
        if (!images) return;

        let slidesHTML = '';
        let dotsHTML = '';
        images.forEach((image, index) => {
            slidesHTML += `<div class="carousel-item"><img src="${image.src}" alt="${image.alt}"></div>`;
            dotsHTML += `<span class="carousel-dot ${index === 0 ? 'active' : ''}" data-slide-to="${index}"></span>`;
        });

        carousel.innerHTML = `
            <div class="carousel-inner">${slidesHTML}</div>
            <button class="carousel-control prev">&lt;</button>
            <button class="carousel-control next">&gt;</button>
            <div class="carousel-dots">${dotsHTML}</div>
        `;

        const inner = carousel.querySelector('.carousel-inner');
        const dots = carousel.querySelectorAll('.carousel-dot');
        const prevBtn = carousel.querySelector('.prev');
        const nextBtn = carousel.querySelector('.next');
        let currentIndex = 0;
        const totalSlides = images.length;

        function goToSlide(index) {
            if (index < 0) index = totalSlides - 1;
            if (index >= totalSlides) index = 0;
            
            inner.style.transform = `translateX(-${index * 100}%)`;
            dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
            currentIndex = index;
        }

        prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
        nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));
        dots.forEach(dot => {
            dot.addEventListener('click', () => goToSlide(parseInt(dot.dataset.slideTo)));
        });
        
        // Corrige o bug da imagem empilhada (definindo o primeiro slide)
        goToSlide(0);
    });
}

// 4. Inicializa os Gráficos (lógica do charts.js)
function initCharts() {
    const ctx = document.getElementById('impactoChart');
    if (!ctx) return;

    // Destrói gráfico anterior, se existir (essencial para SPA)
    const existingChart = Chart.getChart(ctx);
    if (existingChart) {
        existingChart.destroy();
    }
    
    const config = {
        type: 'bar',
        data: chartData, // Usa os dados do topo do arquivo
        options: {
            responsive: true,
            scales: { y: { beginAtZero: true, ticks: { callback: (value) => value + ' vidas' } } },
            plugins: {
                legend: { display: false },
                tooltip: { callbacks: { label: (context) => ` ${context.parsed.y} vidas impactadas` } }
            }
        }
    };

    new Chart(ctx, config);
}

// ==========================================================
// FUNÇÃO MESTRA DE INICIALIZAÇÃO
// ==========================================================

// Esta função será chamada no carregamento inicial E em cada navegação da SPA
function runAllInitializers() {
    initMenu();
    initFormValidation();
    initCarousels();
    initCharts();
}

// ==========================================================
// LÓGICA DA SPA (SINGLE PAGE APPLICATION)
// ==========================================================

// Função principal para carregar o conteúdo da página
const loadPage = async (href) => {
    try {
        const response = await fetch(href);
        if (!response.ok) throw new Error('Página não encontrada');
        
        const text = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');

        const newMainContent = doc.querySelector('#main-content').innerHTML;
        document.querySelector('#main-content').innerHTML = newMainContent;
        document.title = doc.title;

        // *** ESTA É A CORREÇÃO ***
        // Re-executa todos os inicializadores no novo conteúdo
        runAllInitializers();

    } catch (error) {
        console.error("Erro ao carregar a página: ", error);
        // Opcional: redirecionar para uma página de erro
    }
};

// ==========================================================
// EVENT LISTENERS (Gatilhos)
// ==========================================================

// 1. Gatilho de Carregamento Inicial
document.addEventListener('DOMContentLoaded', function() {
    runAllInitializers(); // Roda tudo na primeira vez

    // 2. Gatilho de Clique nos Links da SPA
    document.body.addEventListener('click', (event) => {
        // Encontra o link pai mais próximo
        const link = event.target.closest('nav#nav-links a');
        
        if (link) {
            event.preventDefault(); 
            const href = link.getAttribute('href');
            
            // Não recarrega se já estiver na página
            if (href === location.pathname) return; 

            history.pushState(null, '', href);
            loadPage(href);
            
            const navLinks = document.getElementById('nav-links');
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        }
    });

    // 3. Gatilho do Botão "Voltar" do Navegador
    window.addEventListener('popstate', () => {
        loadPage(location.pathname);
    });
});