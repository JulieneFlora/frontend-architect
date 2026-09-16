# Frontend Architect

Projeto de estudos sobre padrões de arquitetura frontend. A ideia é explorar, na prática, como diferentes formas de organizar uma aplicação React se comportam: o que cada padrão resolve, o que ele assume que você não vai fazer, e os trade offs de cada escolha.

Não é uma ferramenta pronta para produção nem um produto acabado. É um espaço pessoal para estudar o assunto construindo interfaces, comparando padrões e testando ideias.

## O que tem aqui

- **Biblioteca de padrões**: três arquiteturas explicadas lado a lado (Feature Based, Atomic Design e Clean Architecture em camadas). Cada uma mostra quando usar, quando evitar, a árvore de pastas correspondente e os trade offs envolvidos.
- **Explorador de árvore interativo**: clique em uma pasta da estrutura para ver a responsabilidade dela dentro da arquitetura escolhida.
- **Recomendador**: um fluxo guiado por perguntas sobre o projeto para sugerir uma estrutura. Ainda em construção, as regras por trás das sugestões seguem sendo ajustadas.

## Stack

React, TypeScript, Vite, Tailwind CSS e React Router.

## Estrutura do código

```text
src/
├── app/            # router e providers
├── components/     # UI compartilhada e o explorador de árvore
├── features/
│   ├── architecture/  # fluxo do recomendador
│   ├── home/
│   └── library/       # catálogo de padrões arquiteturais
└── test/
```

## Licença

MIT. Veja [LICENSE](LICENSE).

## Como rodar

Requer Node.js 22 (veja `.nvmrc`).

```bash
npm install
npm run dev
```

Outros comandos úteis:

```bash
npm run test    # roda os testes
npm run lint    # checa o código
npm run build   # build de produção
```
