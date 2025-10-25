// ==========================================================
//  LÓGICA DO MENU HAMBÚRGUER
// ==========================================================
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }

    // ==========================================================
    // LÓGICA DE VALIDAÇÃO DE FORMULÁRIO
    // ==========================================================
    const form = document.getElementById('form-cadastro');

    if (form) {
        // Encontra os campos que queremos validar
        const nome = document.getElementById('nome');
        const email = document.getElementById('email');
        const cpf = document.getElementById('cpf');
        const telefone = document.getElementById('telefone');
        const formStatus = document.getElementById('form-status');

        // --- Funções de Validação ---
        const validateEmail = (email) => {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        };

        const validateCPF = (cpf) => {
            // Este regex valida o formato 000.000.000-00
            const re = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
            return re.test(String(cpf));
        };

        const validateTelefone = (tel) => {
            // Este regex valida (00) 00000-0000 ou (00) 0000-0000
            const re = /^\(\d{2}\)\s?\d{4,5}-\d{4}$/;
            return re.test(String(tel));
        };
        
        const validateNome = (nome) => {
            // Verifica se o nome não está vazio e tem pelo menos 2 palavras
            return nome.trim().length > 0 && nome.trim().split(' ').length >= 2;
        };

        // --- Funções de Feedback ---
        const showError = (input, message) => {
            input.classList.add('invalid');
            const errorSpan = input.nextElementSibling;
            errorSpan.textContent = message;
        };

        const clearError = (input) => {
            input.classList.remove('invalid');
            const errorSpan = input.nextElementSibling;
            errorSpan.textContent = '';
        };

        // --- Adiciona Eventos (validar ao sair do campo) ---
        nome.addEventListener('blur', () => {
            if (!validateNome(nome.value)) {
                showError(nome, 'Por favor, insira seu nome completo.');
            } else {
                clearError(nome);
            }
        });
        
        email.addEventListener('blur', () => {
            if (!validateEmail(email.value)) {
                showError(email, 'Por favor, insira um e-mail válido.');
            } else {
                clearError(email);
            }
        });

        cpf.addEventListener('blur', () => {
            if (!validateCPF(cpf.value)) {
                showError(cpf, 'Formato inválido. Use: 000.000.000-00');
            } else {
                clearError(cpf);
            }
        });
        
        telefone.addEventListener('blur', () => {
            if (!validateTelefone(telefone.value)) {
                showError(telefone, 'Formato inválido. Use: (00) 00000-0000');
            } else {
                clearError(telefone);
            }
        });

        // --- Validação Final no Envio ---
        form.addEventListener('submit', function(event) {
            // Previne o envio padrão
            event.preventDefault(); 
            
            // Re-valida todos os campos
            const isNomeValid = validateNome(nome.value);
            const isEmailValid = validateEmail(email.value);
            const isCpfValid = validateCPF(cpf.value);
            const isTelefoneValid = validateTelefone(telefone.value);

            if (isNomeValid && isEmailValid && isCpfValid && isTelefoneValid) {
                // Se tudo estiver OK, simula o envio
                formStatus.textContent = 'Cadastro enviado com sucesso! Obrigado por se juntar a nós.';
                formStatus.className = 'success';
                form.reset(); // Limpa o formulário
                // Em um app real, aqui você enviaria os dados para um servidor (fetch, POST)
            } else {
                // Se algo estiver errado, mostra mensagem de erro geral
                formStatus.textContent = 'Por favor, corrija os campos destacados em vermelho.';
                formStatus.className = 'error';
                
                // Mostra erros nos campos que ainda não foram corrigidos
                if (!isNomeValid) showError(nome, 'Por favor, insira seu nome completo.');
                if (!isEmailValid) showError(email, 'Por favor, insira um e-mail válido.');
                if (!isCpfValid) showError(cpf, 'Formato inválido. Use: 000.000.000-00');
                if (!isTelefoneValid) showError(telefone, 'Formato inválido. Use: (00) 00000-0000');
            }
        });
    }
});

// ==========================================================
// PARTE 3: LÓGICA DE SPA
// ==========================================================

// Função principal para carregar o conteúdo da página
const loadPage = async (href) => {
    // 1. Busca o conteúdo da página
    const response = await fetch(href);
    const text = await response.text();

    // 2. Converte o texto HTML em um documento DOM
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'text/html');

    // 3. Extrai o conteúdo da tag <main id="main-content">
    const newMainContent = doc.querySelector('#main-content').innerHTML;
    
    // 4. Substitui o conteúdo da <main> atual
    document.querySelector('#main-content').innerHTML = newMainContent;

    // 5. Atualiza o título da página
    document.title = doc.title;
};

// Intercepta todos os cliques nos links de navegação
document.addEventListener('click', (event) => {
    const target = event.target;
    
    // Verifica se é um link dentro da navegação principal
    if (target.matches('nav#nav-links a')) {
        event.preventDefault(); // Cancela o recarregamento da página
        const href = target.getAttribute('href');

        // Atualiza a URL na barra do navegador
        history.pushState(null, '', href);
        
        // Carrega o novo conteúdo
        loadPage(href);
        
        // Se for mobile, fecha o menu hambúrguer
        const navLinks = document.getElementById('nav-links');
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    }
});

// Lida com os botões "Voltar" e "Avançar" do navegador
window.addEventListener('popstate', () => {
    loadPage(location.pathname);
});

// (Observação: A validação de formulário precisa ser re-anexada
// toda vez que o 'cadastros.html' é carregado.