import { Outlet } from "react-router-dom"
import Dashboard from "../../../components/Dashboard"
import { useEffect, useState } from "react"
import Auth from "../Auth"
import { useAppContext } from "../../../context/context"
import Trigger from "../../../components/Trigger"

const Admin = () => {
    const [isAdmin] = useState<boolean>(false)
    const { message, messageType, showMessage, messageIsVisible, fading } = useAppContext().message

    useEffect(() => {
        if (message) {
            showMessage()
        }
    }, [message, showMessage])

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