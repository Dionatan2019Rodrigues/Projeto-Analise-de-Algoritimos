// O muro vai de 0 até L.
// Cada faixa cobre [a, b).
//
// Estratégia gulosa:
// Enquanto ainda não cobrimos todo o muro:
//   - considerar todas as faixas que começam até o ponto
//     atualmente coberto;
//   - escolher aquela que alcança o ponto mais distante.
//
// Se em algum momento não conseguirmos avançar,
// então é impossível cobrir o muro.
//
// Complexidade:
// Ordenação: O(n log n)
// Percorrimento: O(n)
// Total: O(n log n)

const fs = require("fs");

const input = fs.readFileSync(0, "utf8").trim();

if (input.length === 0) {
    process.exit(0);
}

const dados = input.split(/\s+/).map(Number);

let pos = 0;

const L = dados[pos++];
const n = dados[pos++];

const faixas = [];

for (let i = 0; i < n; i++) {
    const inicio = dados[pos++];
    const fim = dados[pos++];

    faixas.push([inicio, fim]);
}

// Ordenamos as faixas pelo início.
// Em caso de empate, a maior cobertura vem primeiro.
faixas.sort((a, b) => {
    if (a[0] !== b[0]) {
        return a[0] - b[0];
    }

    return b[1] - a[1];
});

// Ponto do muro que já conseguimos cobrir.
let coberto = 0;

// Índice da próxima faixa ainda não analisada.
let i = 0;

// Quantidade de faixas utilizadas.
let resposta = 0;

while (coberto < L) {

    // Guarda até onde conseguiremos chegar
    // escolhendo a próxima faixa.
    let maiorAlcance = coberto;

    // Analisa todas as faixas que começam
    // antes ou exatamente no ponto já coberto.
    while (i < n && faixas[i][0] <= coberto) {

        if (faixas[i][1] > maiorAlcance) {
            maiorAlcance = faixas[i][1];
        }

        i++;
    }

    // Se não conseguimos avançar,
    // existe uma lacuna impossível de cobrir.
    if (maiorAlcance === coberto) {
        console.log(-1);
        process.exit(0);
    }

    // Escolhemos a faixa que conseguiu chegar mais longe.
    coberto = maiorAlcance;

    resposta++;
}

// Imprime a quantidade mínima de faixas.
console.log(resposta);