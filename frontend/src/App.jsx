import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/home"
import "./App.css"
import RecentlyDeleted from "./pages/recentlyDeleted"
import Chats from "./pages/chats"
import Nav from "./components/NavBar"
import "react-image-crop/dist/ReactCrop.css";

function App() {
  
  return (
    <Nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/deleted" element={<RecentlyDeleted />} />
        <Route path="/chats" element={<Chats />} />
      </Routes>
    </ Nav>
  )
}

export default App
