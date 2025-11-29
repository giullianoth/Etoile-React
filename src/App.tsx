import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./App.css"
import Modal from "react-modal"
import Home from "./pages/Home"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Auth from "./pages/Auth"
import Profile from "./pages/Profile"
import Trigger from "./components/Trigger"
import { useAppContext } from "./context/context"
import { useEffect } from "react"
import Plates from "./pages/Plates"
import Cart from "./pages/Cart"

Modal.setAppElement("#root")

function App() {
  const { message, showMessage, messageIsVisible, fading } = useAppContext().message

  useEffect(() => {
    if (message) {
      showMessage()
    }
  }, [message])

  return (
    <BrowserRouter>
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pratos" element={<Plates />} />
          <Route path="/carrinho" element={<Cart />} />
          <Route path="/autenticacao" element={<Auth />} />
          <Route path="/perfil" element={<Profile />} />
        </Routes>
      </main>

      <Footer />

      {messageIsVisible && message &&
        <Trigger
          type="success"
          fading={fading}
          floating>{message}</Trigger>}
    </BrowserRouter>
  )
}

export default App
