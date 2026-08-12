function selectionSort(vector) {
    for (let i = 0; i < vector.length - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < vector.length; j++) {
            if (vector[j] < vector[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            [vector[i], vector[minIndex]] = [vector[minIndex], vector[i]];
        }
    }
    return vector;
}

// Exemplo de uso:
const numeros =[5,7,6,3,1,8,2,4];
console.log(selectionSort(numeros));
