# 🚀 Guia Completo: Como Criar Pull Requests no GitHub

Este guia te ensina passo a passo como criar Pull Requests (PRs) de forma segura e profissional, incluindo o uso do `git stash` para evitar conflitos.

## 📋 Índice
1. [Conceitos Básicos](#conceitos-básicos)
2. [Preparando o Ambiente](#preparando-o-ambiente)
3. [Criando uma Nova Branch](#criando-uma-nova-branch)
4. [Fazendo Alterações](#fazendo-alterações)
5. [Usando Git Stash (IMPORTANTE!)](#usando-git-stash-importante)
6. [Criando o Pull Request](#criando-o-pull-request)
7. [Boas Práticas](#boas-práticas)
8. [Comandos de Referência Rápida](#comandos-de-referência-rápida)
9. [Problemas Comuns e Soluções](#problemas-comuns-e-soluções)

---

## 🎯 Conceitos Básicos

### O que é um Pull Request?
Um **Pull Request (PR)** é uma solicitação para mesclar (merge) suas alterações de uma branch para outra (geralmente `developing` ou `main`).

### Estrutura de Branches
```
main (produção)
├── developing (desenvolvimento)
    ├── feature/sua-funcionalidade
    ├── bugfix/correção-bug
    └── hotfix/correção-urgente
```

---

## 🛠️ Preparando o Ambiente

### 1. Clone o repositório (se ainda não tiver)
```bash
git clone https://github.com/webcarlos19/devconnect.git
cd devconnect
```

### 2. Verifique a branch atual
```bash
git branch
git status
```

### 3. Configure o repositório remoto (se necessário)
```bash
git remote -v
# Deve mostrar:
# origin  https://github.com/webcarlos19/devconnect.git (fetch)
# origin  https://github.com/webcarlos19/devconnect.git (push)
```

---

## 🌳 Criando uma Nova Branch

### 1. Vá para a branch `development`
```bash
git checkout development
```

### 2. Atualize a branch `development`
```bash
git pull origin development
```

### 3. Crie uma nova branch a partir de `development`
```bash
# Para nova funcionalidade
git checkout -b feature/nome-da-funcionalidade

# Para correção de bug
git checkout -b bugfix/nome-do-bug

# Para correção urgente
git checkout -b hotfix/nome-da-correcao

# Exemplo prático:
git checkout -b feature/adicionar-sistema-login
```

### 4. Confirme que está na branch correta
```bash
git branch
# A branch atual aparece com um asterisco (*)
```

---

## 💻 Fazendo Alterações

### 1. Trabalhe normalmente no seu código
```bash
# Faça suas alterações nos arquivos
# Exemplo: edite App.jsx, crie componentes, etc.
```

### 2. Visualize as alterações
```bash
git status
git diff
```

### 3. Adicione as alterações
```bash
# Adicionar arquivo específico
git add src/App.jsx

# Adicionar todos os arquivos modificados (GERALMENTE USAR APENAS ESTE)
git add .

# Adicionar arquivos por padrão
git add *.jsx
```

### 4. Faça o commit
```bash
git commit -m "feat: adiciona sistema de login

- Cria componente LoginForm
- Implementa validação de dados
- Adiciona rota protegida para dashboard
- Configura autenticação com JWT"
```

---

## 🏠 Usando Git Stash (IMPORTANTE!)

### ⚠️ Situação: Preciso fazer `git pull` mas tenho alterações não commitadas

**NUNCA faça `git pull` com alterações não salvas! Use o `git stash` primeiro.**

### 1. Salve suas alterações temporariamente
```bash
# Verifica se há alterações não commitadas
git status

# Se houver alterações, salve-as no stash
git stash save "WIP: trabalhando no sistema de login"

# Ou simplesmente
git stash
```

### 2. Agora pode fazer o pull com segurança
```bash
git pull origin developing
```

### 3. Recupere suas alterações
```bash
# Lista os stashes disponíveis
git stash list

# Recupera o último stash
git stash pop

# Ou recupera um stash específico
git stash pop stash@{0}
```

### 4. Resolva conflitos se houver
```bash
# Se houver conflitos, resolva-os manualmente nos arquivos
# Depois adicione os arquivos resolvidos
git add .
git commit -m "resolve: conflitos após merge com developing"
```

### Exemplo Prático Completo com Stash:
```bash
# 1. Você está trabalhando e tem alterações não commitadas
git status
# modified:   src/App.jsx
# modified:   src/components/Login.jsx

# 2. Precisa atualizar a branch developing
git stash save "WIP: implementando validação de login"

# 3. Atualiza com segurança
git checkout developing
git pull origin developing

# 4. Volta para sua branch
git checkout feature/adicionar-sistema-login

# 5. Faz merge das atualizações
git merge developing

# 6. Recupera suas alterações
git stash pop

# 7. Resolve conflitos se houver e continua trabalhando
```

---

## 📤 Criando o Pull Request

### 1. Envie sua branch para o GitHub
```bash
git push origin feature/adicionar-sistema-login
```

### 2. No GitHub (interface web):

#### a) Acesse o repositório
- Vá para `https://github.com/webcarlos19/devconnect`

#### b) Crie o Pull Request
1. Clique em **"Compare & pull request"** (aparece automaticamente)
2. Ou vá em **"Pull requests"** → **"New pull request"**

#### c) Configure o Pull Request
- **Base branch**: `developing` (para onde vai)
- **Compare branch**: `feature/adicionar-sistema-login` (de onde vem)

#### d) Preencha as informações
```markdown
## 🚀 Descrição
Implementa sistema completo de login com autenticação JWT

## 📋 O que foi feito?
- ✅ Criado componente LoginForm
- ✅ Implementada validação de email e senha
- ✅ Configurada autenticação com JWT
- ✅ Adicionadas rotas protegidas
- ✅ Criados testes unitários

## 🧪 Como testar?
1. Faça login com: email@teste.com / senha123
2. Verifique se o dashboard é carregado
3. Teste logout e redirecionamento

## 📸 Screenshots
(Adicione prints se necessário)

## 🔗 Issues relacionadas
Closes #123
```

#### e) Adicione Reviewers
- Selecione pessoas para revisar o código
- Adicione labels (feature, bugfix, etc.)

#### f) Crie o Pull Request
- Clique em **"Create pull request"**

---

## ✅ Boas Práticas

### Nomenclatura de Branches
```bash
# ✅ Bom
feature/adicionar-sistema-login
bugfix/corrigir-validacao-email
hotfix/corrigir-crash-producao

# ❌ Ruim
nova-funcionalidade
minha-branch
test
```

### Mensagens de Commit
```bash
# ✅ Bom
git commit -m "feat: adiciona validação de CPF no formulário

- Implementa máscara de CPF
- Adiciona validação de dígitos verificadores
- Inclui testes unitários
- Atualiza documentação"

# ❌ Ruim
git commit -m "mudanças"
git commit -m "fix"
git commit -m "atualizações várias"
```

### Tipos de Commit (Conventional Commits)
- `feat:` Nova funcionalidade
- `fix:` Correção de bug
- `docs:` Alterações na documentação
- `style:` Formatação, espaços, etc.
- `refactor:` Refatoração de código
- `test:` Adição ou correção de testes
- `chore:` Tarefas de manutenção

---

## 🎯 Comandos de Referência Rápida

### Workflow Básico
```bash
# 1. Preparar
git checkout developing
git pull origin developing
git checkout -b feature/nova-funcionalidade

# 2. Desenvolver
# ... fazer alterações ...
git add .
git commit -m "feat: implementa nova funcionalidade"

# 3. Antes de push (se necessário atualizar)
git stash save "WIP: trabalho em progresso"
git checkout developing
git pull origin developing
git checkout feature/nova-funcionalidade
git merge developing
git stash pop

# 4. Enviar
git push origin feature/nova-funcionalidade
```

### Comandos do Stash
```bash
git stash                           # Salva alterações
git stash save "mensagem"           # Salva com mensagem
git stash list                      # Lista stashes
git stash pop                       # Recupera último stash
git stash pop stash@{0}            # Recupera stash específico
git stash drop                      # Remove último stash
git stash clear                     # Remove todos os stashes
```

### Comandos de Branch
```bash
git branch                          # Lista branches locais
git branch -r                       # Lista branches remotas
git branch -a                       # Lista todas as branches
git checkout nome-branch            # Muda para branch
git checkout -b nova-branch         # Cria e muda para nova branch
git branch -d nome-branch           # Deleta branch local
```

---

## 🚨 Problemas Comuns e Soluções

### 1. Erro: "Your local changes would be overwritten"
```bash
# Problema: Tentou fazer pull com alterações não commitadas
# Solução: Use git stash
git stash
git pull origin developing
git stash pop
```

### 2. Conflitos de Merge
```bash
# Quando há conflitos, resolva manualmente nos arquivos
# Procure por marcadores como:
<<<<<<< HEAD
seu código
=======
código do outro
>>>>>>> branch-name

# Após resolver:
git add .
git commit -m "resolve: conflitos de merge"
```

### 3. Esqueceu de criar branch
```bash
# Se já fez alterações na developing:
git stash
git checkout -b feature/nova-funcionalidade
git stash pop
git add .
git commit -m "feat: sua mensagem"
```

### 4. Push rejeitado
```bash
# Erro: Updates were rejected
# Solução: Atualize primeiro
git pull origin developing
# Resolva conflitos se houver
git push origin feature/sua-branch
```

### 5. Quero cancelar todas as alterações
```bash
# Para arquivos não commitados
git checkout -- .

# Para remover arquivos não rastreados
git clean -fd

# Para resetar completamente (CUIDADO!)
git reset --hard HEAD
```

---

## 🎓 Exemplo Prático Completo

Vamos criar uma nova funcionalidade do zero:

```bash
# 1. Preparar ambiente
cd devconnect
git checkout developing
git pull origin developing

# 2. Criar nova branch
git checkout -b feature/adicionar-dark-mode

# 3. Fazer alterações
# ... edite os arquivos ...

# 4. Verificar alterações
git status
git diff

# 5. Se precisar atualizar durante o desenvolvimento
git stash save "WIP: implementando dark mode"
git checkout developing
git pull origin developing
git checkout feature/adicionar-dark-mode
git merge developing
git stash pop 

# 6. Resolver conflitos se houver
# ... edite os arquivos conflitantes ...
git add .
git commit -m "resolve: conflitos após merge"

# 7. Commitar suas alterações
git add .
git commit -m "feat: implementa modo escuro

- Adiciona toggle de dark mode no header
- Implementa tema escuro com CSS variables
- Salva preferência no localStorage
- Adiciona animação de transição suave"

# 8. Enviar para GitHub
git push origin feature/adicionar-dark-mode

# 9. Criar PR no GitHub (interface web)
# Base: developing <- Compare: feature/adicionar-dark-mode
```

---

## 🎉 Conclusão

Seguindo este guia, você será capaz de:
- ✅ Criar branches organizadas
- ✅ Usar git stash para evitar conflitos
- ✅ Fazer commits semânticos
- ✅ Criar Pull Requests profissionais
- ✅ Resolver problemas comuns

**Lembre-se**: Sempre use `git stash` antes de fazer `git pull` se tiver alterações não commitadas!

---

## 📚 Links Úteis

- [Git Documentation](https://git-scm.com/doc)
- [GitHub Docs - Pull Requests](https://docs.github.com/en/pull-requests)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Git Stash Documentation](https://git-scm.com/docs/git-stash)

---

*Criado por: Curso Imersivo de Programação - Aula 6*