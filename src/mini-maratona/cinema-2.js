// Estratégia:
// 1. Ordenar os filmes pelo horário de término.
// 2. Para cada filme, procurar a pessoa cujo último término
//    seja o maior possível sem ultrapassar o início do filme.
// 3. Essa pessoa recebe o filme.
//
// Como precisamos manter os últimos términos ordenados,
// usamos uma Árvore AVL.
//
// Complexidade:
// Ordenação: O(n log n)
// Cada filme realiza operações O(log k)
// Total: O(n log n)

const fs = require("fs");

const input = fs.readFileSync(0, "utf8").trim();

if (input.length === 0) {
    process.exit(0);
}

const dados = input.split(/\s+/).map(Number);

let pos = 0;

const n = dados[pos++];
const k = dados[pos++];

const filmes = [];

for (let i = 0; i < n; i++) {
    const inicio = dados[pos++];
    const fim = dados[pos++];

    filmes.push([inicio, fim]);
}

// Ordena pelo término.
// Em caso de empate, usamos o início.
filmes.sort((a, b) => {
    if (a[1] !== b[1]) {
        return a[1] - b[1];
    }

    return a[0] - b[0];
});

// ---------------------------------------------------------
// Árvore AVL
// ---------------------------------------------------------

class No {
    constructor(chave) {
        this.chave = chave;

        // Quantas pessoas possuem exatamente esse último término.
        this.quantidade = 1;

        this.altura = 1;

        this.esquerda = null;
        this.direita = null;
    }
}

function altura(no) {
    return no ? no.altura : 0;
}

function atualizarAltura(no) {
    no.altura = 1 + Math.max(
        altura(no.esquerda),
        altura(no.direita)
    );
}

function fatorBalanceamento(no) {
    return no ? altura(no.esquerda) - altura(no.direita) : 0;
}

// Rotação para a direita.
function rotacaoDireita(y) {
    const x = y.esquerda;
    const temporario = x.direita;

    x.direita = y;
    y.esquerda = temporario;

    atualizarAltura(y);
    atualizarAltura(x);

    return x;
}

// Rotação para a esquerda.
function rotacaoEsquerda(x) {
    const y = x.direita;
    const temporario = y.esquerda;

    y.esquerda = x;
    x.direita = temporario;

    atualizarAltura(x);
    atualizarAltura(y);

    return y;
}

// Insere uma chave na AVL.
function inserir(no, chave) {

    if (!no) {
        return new No(chave);
    }

    if (chave < no.chave) {
        no.esquerda = inserir(no.esquerda, chave);
    } else if (chave > no.chave) {
        no.direita = inserir(no.direita, chave);
    } else {
        // Já existe uma pessoa com esse último término.
        no.quantidade++;
        return no;
    }

    atualizarAltura(no);

    const balanceamento = fatorBalanceamento(no);

    // Caso esquerda-esquerda.
    if (balanceamento > 1 && chave < no.esquerda.chave) {
        return rotacaoDireita(no);
    }

    // Caso direita-direita.
    if (balanceamento < -1 && chave > no.direita.chave) {
        return rotacaoEsquerda(no);
    }

    // Caso esquerda-direita.
    if (balanceamento > 1 && chave > no.esquerda.chave) {
        no.esquerda = rotacaoEsquerda(no.esquerda);
        return rotacaoDireita(no);
    }

    // Caso direita-esquerda.
    if (balanceamento < -1 && chave < no.direita.chave) {
        no.direita = rotacaoDireita(no.direita);
        return rotacaoEsquerda(no);
    }

    return no;
}

// Encontra o maior valor <= limite.
function encontrarMaiorMenorOuIgual(no, limite) {

    let atual = no;
    let resposta = null;

    while (atual) {

        if (atual.chave <= limite) {
            resposta = atual;
            atual = atual.direita;
        } else {
            atual = atual.esquerda;
        }
    }

    return resposta;
}

// Remove uma ocorrência de uma chave.
function remover(no, chave) {

    if (!no) {
        return null;
    }

    if (chave < no.chave) {
        no.esquerda = remover(no.esquerda, chave);

    } else if (chave > no.chave) {
        no.direita = remover(no.direita, chave);

    } else {

        // Se existem várias pessoas com esse término,
        // basta diminuir a quantidade.
        if (no.quantidade > 1) {
            no.quantidade--;
            return no;
        }

        // Caso tenha somente um nó.
        if (!no.esquerda || !no.direita) {

            const filho = no.esquerda || no.direita;

            if (!filho) {
                return null;
            }

            no = filho;

        } else {

            // Possui dois filhos.
            // Procuramos o menor da subárvore direita.
            let sucessor = no.direita;

            while (sucessor.esquerda) {
                sucessor = sucessor.esquerda;
            }

            no.chave = sucessor.chave;
            no.quantidade = sucessor.quantidade;

            // Removemos completamente o sucessor.
            sucessor.quantidade = 1;
            no.direita = remover(no.direita, sucessor.chave);
        }
    }

    atualizarAltura(no);

    const balanceamento = fatorBalanceamento(no);

    // Esquerda-esquerda.
    if (balanceamento > 1 && fatorBalanceamento(no.esquerda) >= 0) {
        return rotacaoDireita(no);
    }

    // Esquerda-direita.
    if (balanceamento > 1 && fatorBalanceamento(no.esquerda) < 0) {
        no.esquerda = rotacaoEsquerda(no.esquerda);
        return rotacaoDireita(no);
    }

    // Direita-direita.
    if (balanceamento < -1 && fatorBalanceamento(no.direita) <= 0) {
        return rotacaoEsquerda(no);
    }

    // Direita-esquerda.
    if (balanceamento < -1 && fatorBalanceamento(no.direita) > 0) {
        no.direita = rotacaoDireita(no.direita);
        return rotacaoEsquerda(no);
    }

    return no;
}

// ---------------------------------------------------------
// Algoritmo principal
// ---------------------------------------------------------

let raiz = null;

// Inicialmente todas as k pessoas estão disponíveis no tempo 0.
// Como todos os inícios são >= 0, cada pessoa pode ser considerada
// livre desde o instante 0.
for (let i = 0; i < k; i++) {
    raiz = inserir(raiz, 0);
}

let resposta = 0;

for (const [inicio, fim] of filmes) {

    // Encontramos a pessoa que terminou mais tarde,
    // mas ainda está livre no início do filme.
    const pessoa = encontrarMaiorMenorOuIgual(raiz, inicio);

    if (pessoa !== null) {

        // Essa pessoa assistirá ao filme.
        resposta++;

        const ultimoFim = pessoa.chave;

        // Retira essa pessoa da estrutura.
        raiz = remover(raiz, ultimoFim);

        // Agora ela ficará ocupada até "fim".
        raiz = inserir(raiz, fim);
    }
}

console.log(resposta);