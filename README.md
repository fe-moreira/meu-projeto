# NPS Tool

Ferramenta de **NPS (Net Promoter Score)** construída com **React + Vite** e estilizada com **Tailwind CSS**.

## Funcionalidades

- **Pesquisa de NPS** (`/`): formulário com seleção de nota de **0 a 10** e campo de comentário opcional.
- **Dashboard** (`/dashboard`): exibe o NPS calculado, total de respostas, distribuição entre promotores/neutros/detratores e a lista de respostas recentes.

As respostas são persistidas no `localStorage` do navegador (camada em `src/lib/storage.js`), o que facilita a substituição futura por uma API/backend real.

## Como o NPS é calculado

Cada resposta é classificada pela nota:

| Grupo       | Nota  |
| ----------- | ----- |
| Detratores  | 0 – 6 |
| Neutros     | 7 – 8 |
| Promotores  | 9 – 10 |

```
NPS = % Promotores − % Detratores
```

## Rodando o projeto

Pré-requisitos: Node.js 18+.

```bash
# instalar dependências
npm install

# ambiente de desenvolvimento
npm run dev

# build de produção
npm run build

# pré-visualizar o build
npm run preview
```

## Estrutura

```
src/
├── App.jsx              # layout + rotas
├── main.jsx            # entrada da aplicação
├── index.css          # diretivas do Tailwind
├── lib/
│   └── storage.js     # persistência e cálculo de métricas
└── pages/
    ├── SurveyPage.jsx # formulário de NPS
    └── Dashboard.jsx  # resultados
```

## Tecnologias

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)
