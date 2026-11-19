# Lista de Revisão: Programação Dinâmica e Algoritmos Gulosos


## 1 (Mochila Fracionária vs. Mochila Inteira 0/1)

**Por que a estratégia gulosa de ordenar os itens pela razão valor/peso ($v_i/w_i$) garante uma solução ótima para o problema da Mochila Fracionária, mas falha no problema da Mochila Inteira (0/1)?**

**Resposta:**
* **Na Mochila Fracionária:** Como é permitido fracionar (cortar) os itens, nunca sobra espaço residual ocioso na mochila. A estratégia gulosa de priorizar os itens de maior densidade de valor ($v_i/w_i$) preenche 100% da capacidade $W$ com o maior retorno possível por unidade de peso, garantindo a otimalidade global.
* **Na Mochila Inteira (0/1):** Os itens são indivisíveis (ou se leva o item inteiro, ou não se leva). A escolha gulosa e irreversível de um item com alta razão $v_i/w_i$ pode ocupar quase toda a capacidade da mochila, deixando um espaço residual insuficiente para acomodar outros itens, desperdiçando capacidade que poderia gerar um valor total maior se outra combinação fosse escolhida.

**Exemplo Prático (Contraexemplo para a Mochila 0/1):**
Considere uma mochila de capacidade **$W = 50$** e os seguintes 3 itens $(w_i, v_i)$:
* **Item 1:** peso $w_1 = 10$, valor $v_1 = 60$ $\rightarrow$ razão $= 60/10 = \mathbf{6}$
* **Item 2:** peso $w_2 = 20$, valor $v_2 = 100$ $\rightarrow$ razão $= 100/20 = \mathbf{5}$
* **Item 3:** peso $w_3 = 30$, valor $v_3 = 120$ $\rightarrow$ razão $= 120/30 = \mathbf{4}$

1. **Abordagem Gulosa (falha):** Escolhe primeiro o Item 1 (peso 10, valor 60) e depois o Item 2 (peso 20, valor 100). O peso acumulado é $30$, restando $20$ de capacidade. Como o Item 3 pesa $30$, ele não cabe. **Valor total guloso = $160$** (com 20 unidades de espaço desperdiçado).
2. **Programação Dinâmica (ótima):** Avalia todas as combinações viáveis e descarta o Item 1 para combinar os Itens 2 e 3 (pesos $20 + 30 = 50$). **Valor total ótimo = $100 + 120 = 220$**.

---

## 2 (Dualidade e Paradigmas no Algoritmo de Dijkstra)

**Explique essa dualidade explicitando quais passos do algoritmo pertencem ao paradigma guloso e quais utilizam os princípios de PD.**

**Resposta:**
O algoritmo de Dijkstra combina a eficiência da tomada de decisão local com a estrutura de armazenamento de subproblemas da Programação Dinâmica:

* **Aspecto Guloso (Escolha Míope e Irreversível):** A cada iteração, o algoritmo consulta a fila de prioridades (ou conjunto de vértices não visitados) e seleciona o vértice $u$ que possui a **menor estimativa de distância acumulada** (`dist[u]`). Essa escolha é míope (olha apenas para o menor custo imediato disponível naquele instante) e definitiva: uma vez extraído e marcado como visitado, assume-se que `dist[u]` já é o caminho mínimo final e o vértice não será mais reavaliado.
* **Aspecto de Programação Dinâmica (Subestrutura Ótima e Tabulação):** O algoritmo apoia-se na propriedade de **subestrutura ótima** dos caminhos mínimos (todo subcaminho de um caminho mínimo também é um caminho mínimo). Ele mantém uma tabela (o vetor `dist[]`) para memoizar os melhores resultados parciais encontrados até o momento e atualiza esses estados iterativamente por meio da **operação de relaxação de arestas**, que representa diretamente uma relação de recorrência de PD:
  $$\text{dist}[v] = \min(\text{dist}[v], \text{dist}[u] + w(u, v))$$

---

## 3 (Caminhos Mínimos com Pesos Negativos e Bellman-Ford em PD)

**Explique como o algoritmo de Bellman-Ford realiza a relaxação das arestas em $V-1$ iterações e como ele é capaz de detectar a presença de ciclos de peso negativo.**

**Resposta:**
* **Por que $V-1$ iterações?** Em um grafo com $\vert{}V\vert{}$ vértices, qualquer caminho simples (sem ciclos) entre a origem e qualquer outro vértice possui no máximo $\vert{}V\vert{} - 1$ arestas. Pelo *Lema das Relaxações Ordenadas*, a $i$-ésima passagem completa por todas as arestas do grafo garante que todos os caminhos mínimos compostos por até $i$ arestas sejam corretamente calculados e propagados na tabela de distâncias. Portanto, após $\vert{}V\vert{} - 1$ iterações, todas as distâncias mínimas possíveis para caminhos simples convergem para seus valores ótimos.
* **Detecção de Ciclos Negativos:** Após as $\vert{}V\vert{} - 1$ iterações principais, o algoritmo executa uma **$\vert{}V\vert{}$-ésima iteração extra** percorrendo novamente todas as arestas $(u, v)$. Se ainda for possível relaxar alguma aresta — ou seja, se a condição $\text{dist}[u] + w(u, v) < \text{dist}[v]$ for verdadeira — significa que existe um caminho com $\vert{}V\vert{}$ arestas menor que o caminho simples de $\vert{}V\vert{}-1$ arestas. Pelo Princípio da Casa dos Pombos, esse caminho obrigatoriamente repete um vértice, comprovando a existência de um **ciclo de peso negativo** alcançável a partir da origem.

---

## 4 (Caminhos Mínimos Entre Todos os Pares e o Algoritmo de Floyd-Warshall)

**Explique o significado do parâmetro $k$ na relação $W[i][j][k] = \min(W[i][j][k-1], W[i][k][k-1] + W[k][j][k-1])$ e como o algoritmo determina se existe um ciclo de peso negativo no grafo.**

**Resposta:**
* **Significado do parâmetro $k$:** O índice $k$ delimita o conjunto de **vértices intermediários permitidos** na formação de um caminho entre o vértice de origem $i$ e o destino $j$, restringindo-os ao subconjunto $\{1, 2, \dots, k\}$. Na transição do passo $k-1$ para o passo $k$, o algoritmo decide entre duas opções de subestrutura ótima:
  1. Não utilizar o vértice $k$ no caminho, mantendo o melhor custo já calculado usando apenas $\{1, \dots, k-1\}$, dado por $W[i][j][k-1]$.
  2. Utilizar o vértice $k$ como ponte intermediária, somando os custos dos subcaminhos $i \leadsto k$ e $k \leadsto j$ que também só usam intermediários em $\{1, \dots, k-1\}$, dado por $W[i][k][k-1] + W[k][j][k-1]$.
* **Detecção de Ciclos Negativos:** A diagonal principal da matriz final representa a distância mínima de um vértice para ele mesmo ($W[i][i]$), inicializada com $0$. Se, ao final da execução (ou durante o processo), algum elemento da diagonal principal apresentar valor estritamente menor que zero (**$W[i][i] < 0$**), isso indica que existe um caminho fechado partindo de $i$ e retornando a $i$ com custo total negativo — ou seja, um **ciclo de peso negativo** contendo o vértice $i$.

---

## 5 (Comparação de Abordagens: Top-Down vs. Bottom-Up)

**Em quais cenários a abordagem Top-Down pode apresentar um desempenho assintótico em tempo superior (mais rápido) à Bottom-Up?**

**Resposta:**
A abordagem **Top-Down (Memoização)** apresenta um desempenho assintótico em tempo superior (menor tempo de execução) à **Bottom-Up (Tabulação)** nos cenários em que **o espaço de estados é esparso**, ou seja, quando **nem todos os subproblemas possíveis precisam ser resolvidos** para encontrar a resposta do problema original.

* Enquanto a abordagem **Bottom-Up** preenche sistematicamente toda a tabela em ordem topológica (visitando todos os estados possíveis de forma obrigatória, por exemplo, em tempo $\Theta(n \cdot W)$ na Mochila Inteira), a abordagem **Top-Down** parte do estado inicial e visita apenas os subproblemas estritamente alcançáveis pelas chamadas recursivas necessárias.
* **Exemplo:** Em uma instância da Mochila Inteira onde os pesos dos itens são todos múltiplos de $100$ e a capacidade é $W = 10.000$, a abordagem Bottom-Up preencherá todas as $10.000$ colunas da matriz, enquanto a Top-Down saltará de $100$ em $100$, visitando apenas uma fração mínima dos estados (desde que a economia de estados não visitados compense a sobrecarga da pilha de recursão).

---

## 6 (Projeto de Algoritmo Guloso: Problema do Troco e Contraexemplo)

### a) Descrição e Pseudocódigo do Algoritmo Guloso
O algoritmo guloso ordena as denominações de moedas disponíveis em ordem decrescente ($d_1 > d_2 > \dots > d_k$) e, a cada passo, escolhe iterativamente a **maior moeda $d_i$ cujo valor não ultrapasse o montante restante $V$**, subtraindo $d_i$ de $V$ até que o troco seja zerado.

```text
Algoritmo TrocoGuloso(D, V):
    // D: vetor com k denominações de moedas ordenadas de forma decrescente (d_1 > d_2 > ... > d_k)
    // V: valor total do troco desejado
    
    solucao <- lista vazia
    restante <- V
    
    para i <- 1 até k faça:
        enquanto restante >= D[i] faça:
            adicionar D[i] na solucao
            restante <- restante - D[i]
            
    se restante == 0 então:
        retornar solucao
    senão:
        retornar "Não é possível formar o troco exato"
```

### b) Contraexemplo onde a solução gulosa falha
Considere o sistema monetário **$D = \{4, 3, 1\}$** e o valor de troco **$V = 6$**:

* **Solução Gulosa (3 moedas):** Escolhe a maior moeda possível ($4$), restando $6 - 4 = 2$. Como a moeda $3$ não cabe, completa com duas moedas de $1$.  
  $\rightarrow$ Resultado: $\{4, 1, 1\}$ (**3 moedas**).
* **Solução Ótima via PD (2 moedas):** Ignora a moeda de $4$ e utiliza duas moedas de $3$.  
  $\rightarrow$ Resultado: $\{3, 3\}$ (**2 moedas**).

---

## 7 (Escalonamento de Tarefas e Critério de Ordenação Gulosa)

**Por que ordenar as tarefas pelo menor tempo de término ($f_i$) garante o número máximo de tarefas compatíveis, enquanto ordenar pela menor duração ($f_i - s_i$) ou pelo menor tempo de início ($s_i$) falha?**

**Resposta:**
* **Por que ordenar pelo menor tempo de término ($f_i$) funciona?**  
  Escolher a tarefa compatível que termina mais cedo (**menor $f_i$**) é a decisão gulosa localmente ótima porque **libera o recurso compartilhado o mais rápido possível**. Isso maximiza o intervalo de tempo livre restante para acomodar o maior número possível de tarefas subsequentes. (Por argumento de troca, qualquer solução ótima pode ter sua primeira tarefa substituída pela tarefa de menor $f_i$ sem gerar conflitos e sem reduzir a quantidade total de tarefas).

* **Contraexemplo para Menor Duração ($f_i - s_i$):**  
  Considere 3 tarefas no formato $(s_i, f_i)$:
  * **Tarefa A:** $(1, 5)$ $\rightarrow$ duração $= 4$
  * **Tarefa B:** $(4, 6)$ $\rightarrow$ duração $= 2$ *(menor duração)*
  * **Tarefa C:** $(5, 9)$ $\rightarrow$ duração $= 4$
  
  * **Falha da menor duração:** Escolhe primeiro a **Tarefa B $(4, 6)$** por durar apenas 2 unidades. Porém, ela está posicionada exatamente na interseção entre A e C, bloqueando ambas. Resultado: **1 tarefa**.
  * **Solução ótima (menor $f_i$):** Escolhe **A $(1, 5)$** e depois **C $(5, 9)$**. Resultado: **2 tarefas**.

* **Contraexemplo para Menor Tempo de Início ($s_i$):**  
  Considere 3 tarefas no formato $(s_i, f_i)$:
  * **Tarefa A:** $(1, 10)$ $\rightarrow$ inicia em $1$ *(menor início)*
  * **Tarefa B:** $(2, 4)$ $\rightarrow$ inicia em $2$
  * **Tarefa C:** $(5, 7)$ $\rightarrow$ inicia em $5$
  
  * **Falha do menor início:** Escolhe a **Tarefa A $(1, 10)$** por começar mais cedo, mas ela é muito longa e ocupa todo o intervalo, inviabilizando B e C. Resultado: **1 tarefa**.
  * **Solução ótima (menor $f_i$):** Escolhe **B $(2, 4)$** e **C $(5, 7)$**. Resultado: **2 tarefas**.