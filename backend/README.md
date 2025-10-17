# API Node.js + Express + MySQL

Esta é uma API RESTful completa para gerenciamento de usuários usando Node.js, Express e MySQL.

## 🚀 Funcionalidades

- ✅ Conexão com MySQL usando variáveis de ambiente
- ✅ CRUD completo para usuários (Create, Read, Update, Delete)
- ✅ Validação de dados
- ✅ Tratamento de erros
- ✅ Estrutura de resposta padronizada

## 📋 Pré-requisitos

- Node.js instalado
- MySQL instalado e rodando
- Banco de dados "devconnect" (será criado automaticamente)

## ⚙️ Configuração

1. **Instalar dependências:**
```bash
npm install
```

2. **Configurar variáveis de ambiente:**
Edite o arquivo `.env` com suas credenciais do MySQL:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=devconnect
DB_PORT=3306
```

3. **Iniciar o servidor:**
```bash
npm start
# ou para desenvolvimento com auto-reload:
npm run dev
```

## 📡 Endpoints da API

### Base URL: `http://localhost:3000`

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/` | Informações da API |
| GET | `/users` | Listar todos os usuários |
| GET | `/users/:id` | Buscar usuário por ID |
| POST | `/users` | Criar novo usuário |
| PUT | `/users/:id` | Atualizar usuário |
| DELETE | `/users/:id` | Deletar usuário |

## 📝 Exemplos de Uso

### 1. Listar todos os usuários
```bash
GET /users
```

### 2. Buscar usuário por ID
```bash
GET /users/1
```

### 3. Criar novo usuário
```bash
POST /users
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao@email.com",
  "status": "active"
}
```

### 4. Atualizar usuário
```bash
PUT /users/1
Content-Type: application/json

{
  "name": "João Santos",
  "email": "joao.santos@email.com",
  "status": "inactive"
}
```

### 5. Deletar usuário
```bash
DELETE /users/1
```

## 🗄️ Estrutura do Banco de Dados

### Tabela: `users`

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | INT (PK, AUTO_INCREMENT) | ID único do usuário |
| name | VARCHAR(100) | Nome do usuário |
| email | VARCHAR(100) UNIQUE | Email do usuário |
| status | ENUM('active', 'inactive') | Status do usuário |
| created_at | TIMESTAMP | Data de criação |
| updated_at | TIMESTAMP | Data da última atualização |

## 🔧 Estrutura de Arquivos

```
Aula 6/
├── app.js          # Arquivo principal da API
├── database.js     # Configuração do banco de dados
├── package.json    # Dependências do projeto
├── .env           # Variáveis de ambiente
├── setup.sql      # Scripts SQL para setup manual
└── README.md      # Este arquivo
```

## 📄 Formato de Resposta

Todas as respostas seguem o padrão:

```json
{
  "success": true|false,
  "message": "Mensagem descritiva",
  "data": {} // Dados retornados (quando aplicável)
}
```

## 🛠️ Para Desenvolvimento

- Use `npm run dev` para iniciar com nodemon (auto-reload)
- O banco de dados e tabelas serão criados automaticamente
- Verifique os logs no console para debug
