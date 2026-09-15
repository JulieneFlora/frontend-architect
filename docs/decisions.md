# Decisões arquiteturais

- **Feature-first:** reduz acoplamento entre capacidades que evoluem separadamente.
- **Motor puro:** regras determinísticas podem ser testadas sem renderização ou router.
- **TanStack Query separado de estado de cliente:** cache HTTP não é um store global visual.
- **Diagrama sem biblioteca de grafo na V1:** o fluxo linear é pequeno; CSS oferece interação acessível sem custo de dependência. React Flow pode ser adotado quando forem necessários arraste, arestas livres ou grafos grandes.
