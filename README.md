# NPS Tool

Ferramenta de **NPS (Net Promoter Score)** construída com **React + Vite** e estilizada com **Tailwind CSS**.

## Funcionalidades

- **Pesquisa de NPS** (`/`): formulário com seleção de nota de **0 a 10** e campo de comentário opcional.
- **Dashboard** (`/dashboard`): exibe o NPS calculado, total de respostas, distribuição entre promotores/neutros/detratores e a lista de respostas recentes.

As respostas são persistidas no **Supabase** (Postgres). A camada de dados fica em `src/lib/storage.js` e o client em `src/lib/supabaseClient.js`.

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

## Configuração do Supabase

As credenciais ficam em variáveis de ambiente. Copie o exemplo e preencha:

```bash
cp .env.example .env
```

```
VITE_SUPABASE_URL=https://SEU-PROJETO.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_xxxxxxxxxxxx
```

> A *publishable key* é segura para uso no client — o acesso aos dados é
> controlado pelas políticas de **Row Level Security (RLS)** no Supabase.

### Esquema do banco

A tabela `nps_responses` (criada via migration) tem RLS habilitada com as políticas:

- **INSERT** liberado para `anon`/`authenticated` (qualquer visitante pode enviar feedback).
- **SELECT** liberado para `anon`/`authenticated` (dashboard lê os resultados).

```sql
create table public.nps_responses (
  id uuid primary key default gen_random_uuid(),
  score smallint not null check (score >= 0 and score <= 10),
  comment text,
  created_at timestamptz not null default now()
);
```

> Em produção, considere restringir a leitura (SELECT) apenas a usuários
> autenticados/admins, já que o dashboard expõe todos os comentários.

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
│   ├── supabaseClient.js # client do Supabase
│   └── storage.js        # acesso aos dados + cálculo de métricas
└── pages/
    ├── SurveyPage.jsx # formulário de NPS
    └── Dashboard.jsx  # resultados
```

## Tecnologias

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)
- [Supabase](https://supabase.com/)
