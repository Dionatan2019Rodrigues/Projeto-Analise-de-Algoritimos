/*
INICIALIZAÇÃO: Inicialmente, o subarray A[p..k−1] está vazio, pois k = p. Assim, ele
contém corretamente os k−p = 0 menores elementos de L e R. Portanto, o invariante é
verdadeiro antes da primeira iteração.

MANUTENÇÃO: suponha que no início de uma iteração A[p..k−1] contenha, em ordem
crescente, os k−p menores elementos de L e R que já foram processados. O algoritmo
compara L[i] e R[j]. Se L[i] ≤ R[j], então L[i] é o menor elemento ainda não
processado e é colocado em A[k]. Caso contrário, R[j] é o menor elemento ainda não
processado e é colocado em A[k]. Em ambos os casos, após a iteração A[p..k] contém
os k−p+1 menores elementos em ordem crescente. Portanto, o invariante é mantido.

TÉRMINO: o loop termina quando k = r+1. Nesse momento, A[p..k−1] = A[p..r]
contém r−p+1 elementos, que corresponde a todos os elementos dos subarrays L e R.
Como esses elementos foram inseridos em ordem crescente, A[p..r] está ordenado.
Portanto, o algoritmo Merge funciona corretamente para qualquer subarray válido A[p..r].
*/

function merge(A, p, q, r) {
    // Tamanho dos subarrays
    const n1 = q - p + 1;
    const n2 = r - q;

    // Criando os arrays L e R
    const L = new Array(n1 + 1);
    const R = new Array(n2 + 1);

    // Copiando os elementos de A para L
    for (let i = 1; i <= n1; i++) {
        L[i] = A[p + i - 1];
    }

    // Copiando os elementos de A para R
    for (let j = 1; j <= n2; j++) {
        R[j] = A[q + j];
    }

    // Sentinelas
    L[n1 + 1] = Infinity;
    R[n2 + 1] = Infinity;

    let i = 1;
    let j = 1;

    // Intercala L e R dentro de A
    for (let k = p; k <= r; k++) {
        if (L[i] <= R[j]) {
            A[k] = L[i];
            i++;
        } else {
            A[k] = R[j];
            j++;
        }
    }
}

function mergeSort(A, p, r) {
    if (p < r) {
        const q = Math.floor((p + r) / 2);

        // Ordena a metade esquerda
        mergeSort(A, p, q);

        // Ordena a metade direita
        mergeSort(A, q + 1, r);

        // Junta as duas metades ordenadas
        merge(A, p, q, r);
    }
}

// Exemplo
const A = [4, 7, 2, 6, 1, 4, 7, 3, 5, 2, 6];

mergeSort(A, 0, A.length - 1);
console.log(A);