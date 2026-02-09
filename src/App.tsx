import { Outlet } from "react-router-dom"
import "./App.css"
import Modal from "react-modal"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Trigger from "./components/Trigger"
import { useAppContext } from "./context/context"
import { useEffect } from "react"

Modal.setAppElement("#root")

function App() {
  const { message, messageType, showMessage, messageIsVisible, fading } = useAppContext().message

  useEffect(() => {
    if (message) {
      showMessage()
    }
  }, [message, showMessage])

  return (
    <>
      <Header />

      <main>
        <Outlet />
      </main>

      <Footer />

      {messageIsVisible && message &&
        <Trigger
          type={messageType}
          fading={fading}
          floating>{message}</Trigger>}
    </>
  )
}

export default App
