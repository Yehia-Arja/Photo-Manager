import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/home"
import "./App.css"
import RecentlyDeleted from "./pages/RecentlyDeleted"

function App() {
  
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/deleted" element={<RecentlyDeleted />} />
      </Routes>
  )
}

export default App
