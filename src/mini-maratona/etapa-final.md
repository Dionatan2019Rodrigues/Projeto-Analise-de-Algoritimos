# Etapa Final — Problema A

**Dupla:** Dionatan E.C. Rodrigues e Mateus Fernandes de  Quadros 

**Problema escolhido:** A — Festival de Cinema

## Heurística errada

Escolher sempre o filme que começa mais cedo entre os filmes disponíveis.

## Contraexemplo encontrado

### Entrada

```text
3
1 10
2 3
3 4
```

**Saída da heurística:** `1`

**Saída correta:** `2`

A heurística escolhe o filme `[1,10)`, mas a solução correta escolhe `[2,3)` e `[3,4)`, conseguindo assistir a dois filmes.

## Argumento de troca

A estratégia correta escolhe o filme que termina mais cedo.

Se uma solução ótima escolher outro filme primeiro, podemos substituí-lo pelo filme que termina mais cedo sem prejudicar os próximos filmes.

Assim, sempre podemos começar a partir de uma solução ótima que faz a escolha gulosa, mantendo a solução ótima.
