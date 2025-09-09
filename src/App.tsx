import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import "./App.css"
import Footer from "./components/Footer"
import Header from "./components/Header"
import Home from "./pages/Home"
import Plates from "./pages/Plates"
import Cart from "./pages/Cart"
import Login from "./pages/Auth/Login"
import Register from "./pages/Auth/Register"
import Profile from "./pages/Profile"
import Modal from "react-modal"
import { useAuth } from "./hooks/useAuth"
import Loading from "./components/Loading"

Modal.setAppElement("#root")

function App() {
  const { authenticated, loading } = useAuth()

  if (loading) {
    return (
      <div className="app-loading">
        <Loading />
      </div>
    )
  }

  return (
    <BrowserRouter>
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pratos" element={<Plates />} />
          <Route path="/carrinho" element={<Cart />} />
          <Route path="/login" element={authenticated ? <Navigate to="/perfil" /> : <Login />} />
          <Route path="/cadastrar" element={authenticated ? <Navigate to="/perfil" /> : <Register />} />
          <Route path="/perfil" element={authenticated ? <Profile /> : <Navigate to="/login" />} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  )
}

export default App
