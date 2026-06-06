import { Routes, Route, NavLink, Navigate } from 'react-router-dom'
import SurveyPage from './pages/SurveyPage.jsx'
import Dashboard from './pages/Dashboard.jsx'

function NavBar() {
  const linkClass = ({ isActive }) =>
    `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
      isActive
        ? 'bg-indigo-600 text-white'
        : 'text-slate-600 hover:bg-slate-100'
    }`

  return (
    <header className="bg-white border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white font-bold">
            N
          </span>
          <span className="font-semibold text-slate-800">NPS Tool</span>
        </div>
        <nav className="flex items-center gap-2">
          <NavLink to="/" end className={linkClass}>
            Pesquisa
          </NavLink>
          <NavLink to="/dashboard" className={linkClass}>
            Dashboard
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

export default function App() {
  return (
    <div className="min-h-full flex flex-col">
      <NavBar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<SurveyPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <footer className="py-6 text-center text-xs text-slate-400">
        Ferramenta de NPS · React + Vite + Tailwind
      </footer>
    </div>
  )
}
