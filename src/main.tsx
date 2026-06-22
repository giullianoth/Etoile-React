import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home/index.tsx'
import NotFound from './pages/NotFound/index.tsx'
import Plates from './pages/Plates/index.tsx'
import Cart from './pages/Cart/index.tsx'
import Auth from './pages/Auth/index.tsx'
import Profile from './pages/Profile/index.tsx'
import AppProvider from './components/Context/AppProvider.tsx'
import Admin from './pages/Restricted/Admin/index.tsx'
import RestrictedHome from './pages/Restricted/Home'
import RestrictedOrders from './pages/Restricted/Orders'
import RestrictedPlates from './pages/Restricted/Plates'
import RestrictedUsers from './pages/Restricted/Users'
import RestrictedProfile from './pages/Restricted/Profile'

const pages = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/pratos", element: <Plates /> },
      { path: "/carrinho", element: <Cart /> },
      { path: "/autenticar", element: <Auth /> },
      { path: "/perfil", element: <Profile /> },
      { path: "*", element: <NotFound /> },
    ]
  },
  {
    path: "/admin",
    element: <Admin />,
    children: [
      { path: "/admin", element: <RestrictedHome /> },
      { path: "/admin/pedidos", element: <RestrictedOrders /> },
      { path: "/admin/pratos", element: <RestrictedPlates /> },
      { path: "/admin/usuarios", element: <RestrictedUsers /> },
      { path: "/admin/perfil", element: <RestrictedProfile /> },
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider>
      <RouterProvider router={pages} />
    </AppProvider>
  </StrictMode>,
)
