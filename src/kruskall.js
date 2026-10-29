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
    let rI = this.find(i);
    let rJ = this.find(j);
    if (rI !== rJ) {
      if (this.rank[rI] < this.rank[rJ]) {
        this.parent[rI] = rJ;
      } else if (this.rank[rI] > this.rank[rJ]) {
        this.parent[rJ] = rI;
      } else {
        this.parent[rJ] = rI;
        this.rank[rI]++;
      }
      return true;
    }
    return false;
  }
}

function kruskal(vertices, edges) {
  edges.sort((a, b) => a[2] - b[2]);
  const uf = new UnionFind(vertices);
  const mst = [];
  let totalCost = 0;

  for (const edge of edges) {
    const [u, v, weight] = edge;
    if (uf.union(u, v)) {
      mst.push(edge);
      totalCost += weight;
      if (mst.length === vertices - 1) {
        break;
      }
    }
  }

  console.log("Arestas selecionadas:", mst);
  console.log("Custo total da árvore geradora mínima:", totalCost);
  
  return { mst, totalCost };
}

// Teste 
const V = 4;
const arestas = [
  [0, 1, 10],
  [0, 2, 6],
  [0, 3, 5],
  [1, 3, 15],
  [2, 3, 4]
];

kruskal(V, arestas);