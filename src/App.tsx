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

function App() {
  return (
    <BrowserRouter>
      <Header />

      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/pratos' element={<Plates />} />
          <Route path='/carrinho' element={<Cart />} />
          <Route path='/login' element={<Login />} />
          <Route path='/cadastrar' element={<Register />} />
          <Route path='/perfil' element={<Profile />} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  )
}

export default App
