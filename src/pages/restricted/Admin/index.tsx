import { Outlet } from "react-router-dom"
import Dashboard from "../../../components/Dashboard"
import { useEffect, useState } from "react"
import Auth from "../Auth"
import { useAppContext } from "../../../context/context"
import Trigger from "../../../components/Trigger"

const Admin = () => {
    const [isAdmin, setIsAdmin] = useState<boolean>(false)
    const { user, success: authenticated } = useAppContext().auth
    const { message, messageType, showMessage, messageIsVisible, fading } = useAppContext().message

    useEffect(() => {
        if (message) {
            showMessage()
        }
    }, [message, showMessage])

    useEffect(() => {
        if (user && authenticated) {
            setIsAdmin(
                authenticated && user.role === "admin"
            )
        } else {
            setIsAdmin(false)
        }
    }, [authenticated, user])

    if (!isAdmin) {
        return <Auth />
    }

    return (
        <>
            <Dashboard>
                <Outlet />
            </Dashboard>

            {messageIsVisible && message &&
                <Trigger
                    type={messageType}
                    fading={fading}
                    floating>{message}</Trigger>}
        </>
    )
}

export default Admin