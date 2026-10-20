/**
 * Desenvolvido por Dionatan Rodrigues e Mateus Fernandes de Quadros
 * 
 * Estratégia Gulosa (Greedy):
 * 1. Calcula a razão (valor / peso) de cada item.
 * 2. Ordena os itens em ordem decrescente com base nessa razão.
 * 3. Adiciona os itens inteiros à mochila enquanto couberem.
 * 4. Se sobra espaço, pega uma fração do próximo item que maximiza o valor restante.
 */

function mochilaFracionaria(capacidadeMochila, itens) {
    // 1. Calcular a razão valor/peso para cada item
    const itensComRazao = itens.map(item => ({
        ...item,
        razao: item.valor / item.peso
    }));

    // 2. Ordenar os itens em ordem decrescente de razão (melhor custo-benefício primeiro)
    itensComRazao.sort((a, b) => b.razao - a.razao);

    let pesoAtual = 0;
    let valorTotal = 0;
    const itensNaMochila = [];

    // 3. Iterar sobre os itens ordenados
    for (let i = 0; i < itensComRazao.length; i++) {
        const item = itensComRazao[i];

        // Se o item cabe inteiro na mochila
        if (pesoAtual + item.peso <= capacidadeMochila) {
            pesoAtual += item.peso;
            valorTotal += item.valor;
            itensNaMochila.push({
                nome: item.nome,
                pesoUtilizado: item.peso,
                valorObtido: item.valor,
                fracao: 1.0 // 100% do item
            });
        } else {
            // Se o item não cabe inteiro, pegamos apenas a fração que falta para encher a mochila
            const espacoRestante = capacidadeMochila - pesoAtual;
            const fracao = espacoRestante / item.peso;
            
            pesoAtual += espacoRestante;
            valorTotal += item.valor * fracao;
            
            itensNaMochila.push({
                nome: item.nome,
                pesoUtilizado: espacoRestante,
                valorObtido: item.valor * fracao,
                fracao: fracao
            });
            
            // A mochila está cheia, podemos encerrar o loop
            break;
        }
    }

    return {
        valorTotal: valorTotal.toFixed(2),
        pesoTotalUtilizado: pesoAtual,
        detalhes: itensNaMochila
    };
}

// ==========================================
// Exemplo de Uso
// ==========================================

// Capacidade máxima suportada pela mochila
const capacidadeMaxima = 50;

// Lista de itens disponíveis (cada item possui nome, peso e valor)
const listaDeItens = [
    { nome: 'Item A', peso: 10, valor: 60 },
    { nome: 'Item B', peso: 20, valor: 100 },
    { nome: 'Item C', peso: 30, valor: 120 }
];

console.log("=== EXECUTANDO ALGORITMO DA MOCHILA FRACIONÁRIA ===");
console.log(`Capacidade Máxima da Mochila: ${capacidadeMaxima} kg\n`);

const resultado = mochilaFracionaria(capacidadeMaxima, listaDeItens);

console.log(`Valor Total Máximo Obtido: ${resultado.valorTotal}`);
console.log(`Peso Total Utilizado na Mochila: ${resultado.pesoTotalUtilizado} kg\n`);
console.log("Itens colocados na mochila:");

resultado.detalhes.forEach((res, index) => {
    const porcentagem = (res.fracao * 100).toFixed(0);
    console.log(`${index + 1}. ${res.nome} -> Peso usado: ${res.pesoUtilizado} kg (${porcentagem}% do item) | Valor gerado: ${res.valorObtido.toFixed(2)}`);
});