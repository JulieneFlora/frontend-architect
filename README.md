# Frontend Architect

Uma plataforma interativa para transformar escolhas técnicas em recomendações de arquitetura frontend explicáveis, versionadas e preparadas para evolução.

## O que a V1 entrega

- fluxo guiado para tipo de produto e tecnologias;
- motor de recomendação isolado e testável;
- diagrama interativo de responsabilidades;
- árvore de diretórios copiável;
- recomendações, alternativas e trade-offs;
- manual dentro da aplicação e documentação em `docs/`;
- testes de regras e de fluxo de interface.

## Stack

React, TypeScript strict, Vite, Tailwind CSS, React Router, TanStack Query, React Hook Form, Zod, Vitest e React Testing Library. Consulte as [versões validadas](docs/versions.md).

## Arquitetura

O código é organizado para preservar fronteiras claras:

```text
src/
├── app/                 # router e providers
├── components/layout/   # composição visual global
├── features/
│   ├── architecture/    # fluxo, domínio e motor puro
│   ├── home/
│   └── manual/
└── test/
```

O motor de recomendações é independente de React e fica em `features/architecture/recommendationEngine.ts`. Isso permite evoluir catálogo, versões e regras sem espalhar condicionais por componentes. Veja [architecture.md](docs/architecture.md) e [decisions.md](docs/decisions.md).

## Executar

Requer Node.js 22.x (veja `.nvmrc`).

```bash
npm install
npm run dev
npm run test
npm run build
```

## Limitações conhecidas

Esta é intencionalmente uma V1 sem persistência, autenticação, backend ou geração de projetos. A interface mostra uma recomendação inicial baseada em regras determinísticas; ela não substitui a análise do contexto do time.

## Roadmap e contribuição

As funcionalidades futuras estão em [roadmap.md](docs/roadmap.md). Para adicionar uma tecnologia: registre versão e compatibilidade, amplie o catálogo e o motor, escreva testes de regra e atualize a documentação. O [manual](docs/manual.md) detalha o processo.
