function insertionSort(vector) {
  for (let i = 1; i < vector.length; i++) {
    let atual = vector[i];
    let j = i - 1;

    // Move os elementos maiores que o atual para a frente
    while (j >= 0 && vector[j] > atual) {
      vector[j + 1] = vector[j];
      j--;
    }
    vector[j + 1] = atual; // Insere o elemento na posição correta
  }
  return vector;
}

// Exemplo de uso:
const numeros =[5,7,6,3,1,8,2,4];
console.log(insertionSort(numeros));
