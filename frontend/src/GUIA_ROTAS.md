# Guia de Rotas com React Router DOM

## 1. Instalação
```bash
npm install react-router-dom
```

## 2. Conceitos Principais

### BrowserRouter (Router)
O componente principal que habilita o roteamento na aplicação.

### Routes e Route
- `Routes`: Container para todas as rotas
- `Route`: Define uma rota específica

### Componentes de Navegação
- `Link`: Navegação básica (substitui tags `<a>`)
- `NavLink`: Link com estilo ativo
- `Navigate`: Redirecionamento programático

## 3. Exemplos de Uso

### Rotas Básicas
```jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}
```

### Rotas com Parâmetros
```jsx
// Definição
<Route path="/user/:id" element={<UserProfile />} />

// Uso no componente
import { useParams } from 'react-router-dom'

function UserProfile() {
  const { id } = useParams()
  return <div>Usuário ID: {id}</div>
}
```

### Rotas Aninhadas
```jsx
<Routes>
  <Route path="/dashboard" element={<Dashboard />}>
    <Route path="profile" element={<Profile />} />
    <Route path="settings" element={<Settings />} />
  </Route>
</Routes>

// No componente Dashboard
import { Outlet } from 'react-router-dom'

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Outlet /> {/* Renderiza os componentes filhos */}
    </div>
  )
}
```

### Navegação Programática
```jsx
import { useNavigate } from 'react-router-dom'

function MyComponent() {
  const navigate = useNavigate()
  
  const handleClick = () => {
    navigate('/about')
    // ou
    navigate(-1) // voltar
    // ou
    navigate('/login', { replace: true }) // substituir na história
  }
  
  return <button onClick={handleClick}>Ir para About</button>
}
```

### Rotas Protegidas
```jsx
import { Navigate } from 'react-router-dom'

function ProtectedRoute({ children, isAuthenticated }) {
  return isAuthenticated ? children : <Navigate to="/login" />
}

// Uso
<Route 
  path="/dashboard" 
  element={
    <ProtectedRoute isAuthenticated={user.isLoggedIn}>
      <Dashboard />
    </ProtectedRoute>
  } 
/>
```

### Query Parameters
```jsx
import { useSearchParams } from 'react-router-dom'

function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q')
  
  return (
    <div>
      <p>Busca por: {query}</p>
      <button onClick={() => setSearchParams({ q: 'react' })}>
        Buscar React
      </button>
    </div>
  )
}
```

## 4. Hooks Importantes

- `useNavigate()`: Navegação programática
- `useParams()`: Acessa parâmetros da URL
- `useSearchParams()`: Gerencia query parameters
- `useLocation()`: Informações sobre a localização atual
- `useMatch()`: Verifica se a rota atual combina com um padrão

## 5. Estrutura de Projeto Recomendada

```
src/
  components/
    Navbar.jsx
    ProtectedRoute.jsx
  pages/
    Home.jsx
    About.jsx
    Contact.jsx
    NotFound.jsx
    Dashboard/
      index.jsx
      Profile.jsx
      Settings.jsx
  App.jsx
  main.jsx
```

## 6. Exemplo Completo - Layout com Rotas Aninhadas

```jsx
// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Dashboard/Profile'
import Settings from './pages/Dashboard/Settings'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />}>
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  )
}
```

```jsx
// components/Layout.jsx
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

function Layout() {
  return (
    <div>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  )
}
```