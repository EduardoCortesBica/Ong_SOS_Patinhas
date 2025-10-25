// Espera o conteúdo da página carregar antes de rodar o script
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Encontra o elemento <canvas>
    const ctx = document.getElementById('impactoChart');

    if (!ctx) {
        return;
    }

    // 2. Define os Dados para o Gráfico
    const data = {
        labels: [
            'Resgates & Castrações', 
            'Adoções Concluídas'
        ],
        datasets: [{
            label: 'Total de Vidas Impactadas',
            data: [100, 90], // Dados: +100 e +90
            backgroundColor: [
                'rgba(255, 102, 0, 0.7)',  // Cor Primária (laranja) com 70% de opacidade
                'rgba(0, 102, 204, 0.7)'   // Cor Secundária (azul) com 70% de opacidade
            ],
            borderColor: [
                'rgb(255, 102, 0)',       // Cor Primária sólida
                'rgb(0, 102, 204)'        // Cor Secundária sólida
            ],
            borderWidth: 1
        }]
    };

    // 3. Define as Configurações e Opções do Gráfico
    const config = {
        type: 'bar', // Você pode trocar para 'pie' ou 'doughnut' se preferir
        data: data,
        options: {
            responsive: true, // Faz o gráfico ser responsivo
            scales: {
                y: {
                    beginAtZero: true, // Começa o eixo Y no zero
                    ticks: {
                        // Formata os números do eixo Y
                        callback: function(value) {
                            return value + ' vidas';
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false // Esconde a legenda no topo
                },
                tooltip: {
                    // Configura a caixinha que aparece ao passar o mouse
                    callbacks: {
                        label: function(context) {
                            // context.parsed.y pega o valor numérico (ex: 100)
                            return ` ${context.parsed.y} vidas impactadas`;
                        }
                    }
                }
            }
        }
    };

    // 4. Cria o gráfico na tela
    new Chart(ctx, config);

});