/*
O algoritmo executa um laço (for) que itera exatamente (n) vezes
(que é o tamanho dos arrays de entrada A e B). Dentro do
laço, as operações realizadas
levam um tempo constante Theta(1). Fora do laço, a inicialização
do array e a atribuição final também são resolvidas em tempo
proporcional a (n) e em tempo constante, respectivamente.
Portanto, o tempo de execução cresce linearmente em relação
ao tamanho da entrada.
A complexidade de tempo deste algoritmo é Theta(n).
*/

function addBinaryIntegers(A, B) {
    const n = A.length;
    const C = new Array(n + 1).fill(0); //Cria o array C com n+1 elementos, inicializado com zeros
    let carry = 0; // Armazena o "vai um"

    // Itera do último elemento (bit menos significativo) até o primeiro
    for (let i = n - 1; i >= 0; i--) {
        const sum = A[i] + B[i] + carry;
        
        C[i + 1] = sum % 2;// O bit na posição i+1 de C será o resto da divisão da soma por 2
        carry = Math.floor(sum / 2);// O "vai um" será o quociente inteiro da divisão da soma por 2
    }
    C[0] = carry;// O primeiro bit do array C recebe o carry final
    return C;
}

// Teste
const A = [1, 0, 1, 1]; // 11 em decimal
const B = [0, 1, 0, 1]; // 5 em decimal

const C = addBinaryIntegers(A, B);

console.log("Array A:", A);
console.log("Array B:", B);
console.log("Soma C: ", C); // Esperado: [1, 0, 0, 0, 0] (16 em decimal)