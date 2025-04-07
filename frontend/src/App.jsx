import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import './App.css'
import Deleted from './pages/deleted'

function App() {
  
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/deleted" element={<Deleted />} />
      </Routes>
  )
}

export default App
