import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AppProvider } from './context/context.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home/index.tsx'
import Plates from './pages/Plates/index.tsx'
import Cart from './pages/Cart/index.tsx'
import Auth from './pages/Auth/index.tsx'
import Profile from './pages/Profile/index.tsx'
import NotFound from './pages/NotFound/index.tsx'
import Admin from './pages/restricted/Admin/index.tsx'
import RestrictedHome from "./pages/restricted/Home"
import RestrictedOrders from "./pages/restricted/Orders/index.tsx"
import RestrictedPlates from "./pages/restricted/Plates"
import RestrictedUsers from "./pages/restricted/Users"
import RestrictedProfile from "./pages/restricted/Profile"

const pages = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/pratos", element: <Plates /> },
      { path: "/carrinho", element: <Cart /> },
      { path: "/autenticacao", element: <Auth /> },
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
