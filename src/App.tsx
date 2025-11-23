import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./App.css"
import Modal from "react-modal"
import Home from "./pages/Home"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Auth from "./pages/Auth"
import Profile from "./pages/Profile"

Modal.setAppElement("#root")

function App() {
  return (
    <BrowserRouter>
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/autenticacao" element={<Auth />} />
          <Route path="/perfil" element={<Profile />} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  )
}

export default App
