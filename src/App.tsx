import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import Home from './pages/Home'
import Plates from './pages/Plates'
import Cart from './pages/Cart'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Profile from './pages/Profile'
import Modal from "react-modal"
import { ContextProvider, useAppContext } from './context/context'

Modal.setAppElement("#root")

function App() {
  const { authenticated } = useAppContext().useAuth

  return (
    <ContextProvider>
      <BrowserRouter>
        <Header />

        <main>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/pratos' element={<Plates />} />
            <Route path='/carrinho' element={<Cart />} />
            <Route path='/login' element={authenticated ? <Profile /> : <Login />} />
            <Route path='/cadastrar' element={authenticated ? <Profile /> : <Register />} />
            <Route path='/perfil' element={authenticated ? <Profile /> : <Login />} />
          </Routes>
        </main>

        <Footer />
      </BrowserRouter>
    </ContextProvider>
  )
}

export default App
