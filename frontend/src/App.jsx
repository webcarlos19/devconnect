import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Index from './pages/Index'
import NotFound from './pages/NotFound'
import AppSocial from './pages/app/Index'
import Feed from './pages/app/Feed'
import Settings from './pages/app/Settings'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <main>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/app" element={<AppSocial />}>
              {/* <Route index element={<AppHome />} /> */}
              <Route index element={<Feed />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
