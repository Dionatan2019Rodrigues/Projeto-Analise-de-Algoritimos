// Dionatan Eduardo Correa Rodrigues e Mateus Fernandes de Quadros

/**
 * @param {number[]} p - Vetor de pesos dos objetos
 * @param {number[]} v - Vetor de valores dos objetos
 * @param {number} c - Capacidade máxima da mochila
 * @returns {number} O valor máximo que pode ser colocado na mochila
 */
function mochilaBooleana(p, v, c) {
    const n = p.length;
    const t = Array.from({ length: n + 1 }, () => Array(c + 1).fill(0));

    for (let i = 1; i <= n; i++) {
        const pesoItem = p[i - 1];
        const valorItem = v[i - 1];

        for (let j = 0; j <= c; j++) {
            if (pesoItem > j) {
                t[i][j] = t[i - 1][j];
            } else {
                t[i][j] = Math.max(
                    t[i - 1][j],
                    valorItem + t[i - 1][j - pesoItem]
                );
            }
        }
    }

    return t[n][c];
}

// Teste
const pesos = [20, 20, 30, 30];
const valores = [20, 30, 20, 40];
const capacidade = 60;

const valorMaximo = mochilaBooleana(pesos, valores, capacidade);
console.log("Valor máximo obtido na mochila:", valorMaximo);