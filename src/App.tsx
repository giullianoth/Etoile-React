import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./App.css"
import Modal from "react-modal"
import Home from "./pages/home"
import Header from "./components/Header"
import Footer from "./components/Footer"

Modal.setAppElement("#root")

function App() {
  return (
    <BrowserRouter>
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  )
}

export default App
