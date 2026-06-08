import { HashRouter, Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { HalfAMinutePage } from './pages/HalfAMinutePage'
import { NotTheSamePage } from './pages/NotTheSamePage'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ham" element={<HalfAMinutePage />} />
        <Route path="/nts" element={<NotTheSamePage />} />
      </Routes>
    </HashRouter>
  )
}

export default App
