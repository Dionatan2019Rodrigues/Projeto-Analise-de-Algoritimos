// Dionatan Eduardo Correa Rodrigues e Mateus Fernandes de Quadros

class UnionFind {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.rank = Array(n).fill(0);
  }
  find(i) {
    return this.parent[i] === i ? i : (this.parent[i] = this.find(this.parent[i]));
  }
  union(i, j) {
    let rI = this.find(i), rJ = this.find(j);
    if (rI !== rJ) {
      if (this.rank[rI] < this.rank[rJ]) this.parent[rI] = rJ;
      else if (this.rank[rI] > this.rank[rJ]) this.parent[rJ] = rI;
      else { this.parent[rJ] = rI; this.rank[rI]++; }
      return true;
    }
    return false;
  }
}

const kruskal = (n, edges) => {
  edges.sort((a, b) => a[2] - b[2]);
  const uf = new UnionFind(n), mst = [];
  let totalCost = 0;
  for (const edge of edges) {
    if (uf.union(edge[0], edge[1])) {
      mst.push(edge);
      totalCost += edge[2];
    }
  }
  return { mst, totalCost };
};

// --- DADOS DE TESTE ---
const vertices = 4;
const arestas = [
  [0, 1, 10], // Aresta entre o vértice 0 e 1 com peso 10
  [0, 2, 6],  // Aresta entre o vértice 0 e 2 com peso 6
  [0, 3, 5],  // Aresta entre o vértice 0 e 3 com peso 5
  [1, 3, 15], // Aresta entre o vértice 1 e 3 com peso 15
  [2, 3, 4]   // Aresta entre o vértice 2 e 3 com peso 4
];

const resultado = kruskal(vertices, arestas);
console.log("Arestas da AGM:", resultado.mst);
console.log("Custo Total:", resultado.totalCost);