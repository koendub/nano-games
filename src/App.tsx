import { HashRouter, Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { HalfAMinutePage } from './pages/HalfAMinutePage'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ham" element={<HalfAMinutePage />} />
      </Routes>
    </HashRouter>
  )
}

export default App
