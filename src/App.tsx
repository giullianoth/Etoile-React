import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import { useAppContext } from './context/app-context'
import { useEffect } from 'react'
import Trigger from './components/Trigger'

function App() {
  const {
    message,
    messageType,
    showMessage,
    messageIsVisible,
    fading
  } = useAppContext().message

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
