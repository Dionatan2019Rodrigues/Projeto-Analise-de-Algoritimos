// Os intervalos são FECHADOS [a, b].
//
// Estratégia gulosa:
// 1. Ordenar os intervalos pelo ponto final.
// 2. Pegar o final do primeiro intervalo ainda não coberto.
// 3. Colocar uma câmera nessa posição.
// 4. Essa câmera cobre todos os próximos intervalos que
//    também contenham essa posição.
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

const intervalos = [];

for (let i = 0; i < n; i++) {
    const inicio = dados[pos++];
    const fim = dados[pos++];

    intervalos.push([inicio, fim]);
}

// Ordenamos pelo ponto final.
intervalos.sort((a, b) => {
    if (a[1] !== b[1]) {
        return a[1] - b[1];
    }

    return a[0] - b[0];
});

// Guarda a última posição onde colocamos uma câmera.
let ultimaCamera = -1;

// Número de câmeras utilizadas.
let resposta = 0;

for (const [inicio, fim] of intervalos) {

    // Se a câmera anterior não está dentro do intervalo,
    // precisamos colocar uma nova câmera.
    //
    // Como os intervalos são fechados,
    // se ultimaCamera === inicio, o intervalo está coberto.
    if (ultimaCamera < inicio) {

        // A melhor posição é o final do intervalo.
        ultimaCamera = fim;

        resposta++;
    }
}

console.log(resposta);