import { Outlet } from "react-router-dom"
import { useEffect, useState } from "react"
import Auth from "../Auth"
import { useAppContext } from "../../../context/app-context"
import Trigger from "../../../components/Trigger"
import Dashboard from "../../../components/Dashboard"

const Admin = () => {
    const [isAdmin, setIsAdmin] = useState<boolean>(false)
    const { authenticated, user, token } = useAppContext().auth

    const {
        message,
        messageType,
        showMessage,
        messageIsVisible,
        fading,
    } = useAppContext().message

    useEffect(() => {
        if (message) {
            showMessage()
        }
    }, [message, showMessage])

    useEffect(() => {
        const verifyUserRole = () => {
            if (authenticated && user && token) {
                setIsAdmin(user.role === "admin")
            } else {
                setIsAdmin(false)
            }
        }
        verifyUserRole()
    }, [authenticated, token, user])

    return (
        isAdmin
            ? <>
                <Dashboard>
                    <Outlet />
                </Dashboard>

                {messageIsVisible && message &&
                    <Trigger
                        type={messageType}
                        fading={fading}
                        floating>{message}</Trigger>}
            </>

            : <Auth />
    )
}

export default Admin