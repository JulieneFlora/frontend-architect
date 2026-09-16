import type { ArchitecturePattern } from './types'

export const layeredClean: ArchitecturePattern = {
  id: 'layered-clean',
  name: 'Arquitetura em Camadas (Clean Architecture)',
  shortName: 'Clean Architecture',
  tagline: 'Camadas concêntricas onde as dependências sempre apontam para dentro, em direção ao domínio.',
  origin:
    'Inspirada na Clean Architecture de Robert C. Martin (2012) e em arquiteturas hexagonais, adaptada para frontends com lógica de negócio relevante: casos como apps financeiros, de saúde ou com regras complexas de cálculo.',
  summary:
    'A aplicação é dividida em camadas concêntricas: domínio no centro (entidades e regras de negócio puras), aplicação ao redor (casos de uso que orquestram o domínio), e apresentação e infraestrutura nas bordas (UI e detalhes técnicos como HTTP e storage). A regra central é que camadas internas nunca conhecem as externas.',
  whenToUse: [
    'Aplicações com regras de negócio complexas e valiosas o suficiente para merecer testes isolados de UI e de rede.',
    'Produtos onde a lógica de domínio pode ser reaproveitada em mais de uma interface (web e mobile, por exemplo).',
    'Times que precisam trocar peças de infraestrutura (ex: outro provedor de API) sem tocar nas regras de negócio.',
  ],
  avoidWhen: [
    'CRUDs simples sem lógica de negócio real: a separação em camadas vira burocracia sem ganho.',
    'Times pequenos ou protótipos, onde o custo de indireção supera o benefício de isolamento.',
  ],
  tradeoffs: [
    {
      title: 'Domínio testável sem UI nem rede',
      body: 'Regras de negócio em entidades e casos de uso puros podem ser testadas com testes unitários rápidos, sem mocks de fetch ou renderização de componentes.',
    },
    {
      title: 'Trocar infraestrutura fica barato',
      body: 'Migrar de REST para GraphQL, ou trocar o provedor de autenticação, afeta só a camada de infraestrutura: domínio e aplicação não mudam.',
    },
    {
      title: 'Mais indireção e boilerplate',
      body: 'Um fluxo simples de "salvar formulário" passa por várias camadas (hook → caso de uso → repositório → cliente HTTP), o que pode ser excessivo fora dos casos que realmente precisam.',
    },
  ],
  tree: {
    id: 'src',
    name: 'src/',
    description: 'Código-fonte da aplicação.',
    children: [
      {
        id: 'presentation',
        name: 'presentation/',
        moduleId: 'cl-presentation',
        description: 'Camada mais externa: componentes e páginas.',
        children: [
          { id: 'components', name: 'components/', description: 'Componentes de UI, sem regra de negócio.' },
          { id: 'pages', name: 'pages/', description: 'Páginas que conectam hooks de aplicação à UI.' },
        ],
      },
      {
        id: 'application',
        name: 'application/',
        moduleId: 'cl-application',
        description: 'Casos de uso que orquestram o domínio para atender uma ação do usuário.',
        children: [
          {
            id: 'use-cases',
            name: 'use-cases/',
            description: 'Um caso de uso por ação relevante do negócio.',
            children: [
              {
                id: 'create-order',
                name: 'createOrder.ts',
                description: 'Orquestra validação, cálculo de total e persistência de um pedido.',
              },
            ],
          },
          {
            id: 'app-hooks',
            name: 'hooks/',
            description: 'Hooks React que expõem casos de uso para a camada de apresentação.',
          },
        ],
      },
      {
        id: 'domain',
        name: 'domain/',
        moduleId: 'cl-domain',
        description:
          'Núcleo da aplicação: entidades e regras de negócio puras, sem dependência de React ou HTTP.',
        children: [
          {
            id: 'entities',
            name: 'entities/',
            description: 'Modelos de negócio com invariantes (ex: Order, Money).',
          },
          {
            id: 'domain-services',
            name: 'services/',
            description: 'Regras de negócio que não pertencem a uma única entidade.',
          },
          {
            id: 'repository-interfaces',
            name: 'repositories.ts',
            description: 'Contratos (interfaces) que a infraestrutura deve implementar.',
          },
        ],
      },
      {
        id: 'infrastructure',
        name: 'infrastructure/',
        moduleId: 'cl-infrastructure',
        description: 'Camada mais externa do lado dos dados: implementações concretas de I/O.',
        children: [
          {
            id: 'http-order-repo',
            name: 'HttpOrderRepository.ts',
            description: 'Implementa a interface de repositório usando a API REST.',
          },
          { id: 'http-client', name: 'httpClient.ts', description: 'Cliente HTTP de baixo nível.' },
        ],
      },
    ],
  },
  modules: [
    {
      id: 'cl-presentation',
      responsibility:
        'Renderiza a interface e captura interações, delegando toda decisão de negócio para a aplicação.',
      keep: 'Componentes visuais, formulários, chamadas aos hooks de aplicação.',
      avoid: 'Cálculos de negócio ou chamadas diretas a repositórios/HTTP.',
      alternative: 'Fundir com a camada de aplicação em projetos pequenos, aceitando o acoplamento.',
      contents: ['components/', 'pages/'],
      examples: ['Formulário de criação de pedido', 'Exibir erros de validação'],
    },
    {
      id: 'cl-application',
      responsibility:
        'Orquestra entidades e repositórios do domínio para realizar uma ação completa (um caso de uso).',
      keep: 'Uma função por ação de negócio relevante, coordenando validação, cálculo e persistência.',
      avoid: 'Detalhes de UI (JSX) ou detalhes de infraestrutura (URLs, headers HTTP).',
      alternative: 'Custom hooks que já embutem a orquestração, quando o caso de uso é trivial.',
      contents: ['use-cases/createOrder.ts', 'hooks/useCreateOrder.ts'],
      examples: ['Validar e salvar um pedido', 'Cancelar um pedido e notificar o usuário'],
    },
    {
      id: 'cl-domain',
      responsibility:
        'Núcleo da aplicação: entidades, invariantes e regras de negócio, sem depender de nada externo.',
      keep: 'Classes/funções puras de negócio e as interfaces que a infraestrutura precisa implementar.',
      avoid:
        'Qualquer import de React, HTTP client ou biblioteca de UI: o domínio não pode depender de detalhes.',
      alternative:
        'Modelagem mais simples com tipos e funções, sem entidades ricas, se as regras forem poucas.',
      contents: ['entities/Order.ts', 'services/pricing.ts', 'repositories.ts'],
      examples: ['Calcular total de um pedido com desconto', 'Validar que um pedido tem ao menos um item'],
    },
    {
      id: 'cl-infrastructure',
      responsibility:
        'Implementações concretas dos contratos definidos pelo domínio: HTTP, storage, terceiros.',
      keep: 'Implementações de repositório, clientes HTTP, adaptadores de serviços externos.',
      avoid: 'Regra de negócio: a infraestrutura só traduz dados entre o mundo externo e o domínio.',
      alternative: 'SDK gerado a partir de um contrato OpenAPI para reduzir boilerplate de cliente HTTP.',
      contents: ['HttpOrderRepository.ts', 'httpClient.ts'],
      examples: ['Implementar OrderRepository usando fetch', 'Mapear DTO da API para a entidade Order'],
    },
  ],
}
