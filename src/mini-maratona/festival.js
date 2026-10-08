// Estratégia:
// Escolher sempre o filme que termina mais cedo.
// Isso maximiza o espaço disponível para os próximos filmes.
//
// Complexidade:
// Ordenação: O(n log n)
// Percorrer os filmes: O(n)
// Complexidade total: O(n log n)

const fs = require("fs");

// Lê toda a entrada padrão.
const input = fs.readFileSync(0, "utf8").trim();

// Caso a entrada esteja vazia, não há nada para processar.
if (input.length === 0) {
    process.exit(0);
}

// Divide a entrada em números.
const dados = input.split(/\s+/).map(Number);

let pos = 0;

// Quantidade de filmes.
const n = dados[pos++];

// Guarda todos os filmes.
const filmes = [];

for (let i = 0; i < n; i++) {
    const inicio = dados[pos++];
    const fim = dados[pos++];

    filmes.push([inicio, fim]);
}

// Ordenamos os filmes pelo horário de término.
// Em caso de empate, o início não influencia a solução,
// mas usamos como segundo critério para manter uma ordem determinística.
filmes.sort((a, b) => {
    if (a[1] !== b[1]) {
        return a[1] - b[1];
    }

    return a[0] - b[0];
});

// instante em que estamos livres para assistir outro filme.
let ultimoFim = -1;

// Quantidade máxima de filmes assistidos.
let resposta = 0;

// Percorre os filmes na ordem crescente de término.
for (const [inicio, fim] of filmes) {

    // Como os intervalos são [a, b),
    // podemos assistir um filme que começa exatamente
    // quando o filme anterior termina.
    if (inicio >= ultimoFim) {

        // Escolhemos este filme.
        resposta++;

        // Agora só podemos escolher filmes que comecem
        // a partir deste instante.
        ultimoFim = fim;
    }
}

// A saída deve conter somente a resposta.
console.log(resposta);