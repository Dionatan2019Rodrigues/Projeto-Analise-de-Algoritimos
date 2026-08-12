/*
Por que ele só precisa ser executado para os primeiros n-1 elementos?
    Porque ao posicionar o penúltimo elemento do vetor na prdem correta
    obrigatóriamente o último também estará ordenada, e se iterassemos 
    mais uma vez, o último elemento seria comparado com ele mesmo.

Tempo de execução no 
    Melhor caso: O(n²) Mesmo com o vetor já ordenado, o algoritmo ainda precisa percorrer 
        todos os elementos no laço interno para verificar se estão na ordem correta.

    Pior caso: O(n²) Com o vetor em ordem inversa, o número de verificações no laço 
        interno ainda permanece igual. Mesmo com a variável referente ao índice min 
        sendo atualizada efetivamente a ordem de grandexa continua O(n²)
*/

function selectionSort(vector) {
    for (let i = 0; i < vector.length - 1; i++) {                           // n-1 vezes
        let minIndex = i;                                                   // n-1 vezes
        for (let j = i + 1; j < vector.length; j++) {                       // n(n-1)/2 vezes = (n²-n)/2
            if (vector[j] < vector[minIndex]) {                             // n(n-1)/2 vezes
                minIndex = j;                                               // n(n-1)/2 vezes : Pior caso
            }   
        }
        if (minIndex !== i) {                                               // n-1 vezes
            [vector[i], vector[minIndex]] = [vector[minIndex], vector[i]];  // n-1 vezes : Pior caso
        }
    }
    return vector;
}

// Exemplo de uso:
const numeros =[5,7,6,3,1,8,2,4];
console.log(selectionSort(numeros));

