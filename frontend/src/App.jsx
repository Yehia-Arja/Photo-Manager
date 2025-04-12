import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/home"
import "./App.css"
import RecentlyDeleted from "./pages/RecentlyDeleted"
import Nav from "./components/NavBar"

function App() {
  
  return (
    <Nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/deleted" element={<RecentlyDeleted />} />
      </Routes>
    </ Nav>
  )
}

export default App
