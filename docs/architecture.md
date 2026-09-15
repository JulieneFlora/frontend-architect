# Arquitetura do projeto

O projeto separa composição global (`app`), UI reutilizável (`components/ui`) e capacidade de produto (`features`). Cada feature pode conter componentes, hooks, contratos HTTP e regras próprias. O motor em `features/architecture/recommendationEngine.ts` é TypeScript puro: a UI só coleta escolhas e apresenta o resultado.

Para uma API futura, `services` será a fronteira REST (cliente, DTOs e mapeadores); TanStack Query permanece dentro das features, próximo às queries e mutations que consomem esses contratos. PostgreSQL e Node/Fastify pertencem ao backend e não são simulados nesta versão.
