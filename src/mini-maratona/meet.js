//  Estratégia:
// Separar os horários de início e término.
// Ordenar ambos.
// Percorrer os dois vetores para descobrir quantas reuniões
// estão acontecendo simultaneamente.
//
// Como intervalos são [a, b), se uma reunião termina em t
// e outra começa em t, a sala pode ser reutilizada.
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

const n = dados[pos++];

const inicios = [];
const fins = [];

for (let i = 0; i < n; i++) {
    const inicio = dados[pos++];
    const fim = dados[pos++];

    inicios.push(inicio);
    fins.push(fim);
}

// Ordenamos os horários de início.
inicios.sort((a, b) => a - b);

// Ordenamos os horários de término.
fins.sort((a, b) => a - b);

let i = 0;
let j = 0;

// Quantidade de salas atualmente ocupadas.
let salasEmUso = 0;

// Maior quantidade de salas usadas simultaneamente.
let resposta = 0;

while (i < n) {

    // Se a próxima reunião começa antes da próxima reunião terminar,
    // precisamos de uma nova sala.
    //
    // Usamos "<" porque se inicio === fim,
    // a sala pode ser reutilizada.
    if (inicios[i] < fins[j]) {

        salasEmUso++;

        if (salasEmUso > resposta) {
            resposta = salasEmUso;
        }

        i++;

    } else {

        // Uma reunião terminou antes ou exatamente quando
        // a próxima começa.
        // Portanto, liberamos uma sala.
        salasEmUso--;

        j++;
    }
}

console.log(resposta);