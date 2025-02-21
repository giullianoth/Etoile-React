import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./pages/Home"
import Cart from "./pages/Cart"
import Profile from "./pages/Profile"
import Plates from "./pages/Plates"
import Auth from "./pages/Auth"

const pages = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/carrinho",
    element: <Cart />
  },
  {
    path: "/perfil",
    element: <Profile />
  },
  {
    path: "/pratos",
    element: <Plates />
  },
  {
    path: "/autenticar",
    element: <Auth />
  },
])

function App() {
  return (
    <RouterProvider router={pages}></RouterProvider>
  )
}

export default App
