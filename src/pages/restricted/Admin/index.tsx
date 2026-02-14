import { Outlet } from "react-router-dom"
import Dashboard from "../../../components/Dashboard"
import { useEffect, useState } from "react"
import Auth from "../Auth"
import { useAppContext } from "../../../context/context"

const Admin = () => {
    const [isAdmin, setIsAdmin] = useState<boolean>(false)
    const { user, success: authenticated } = useAppContext().auth

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
        <Dashboard>
            <Outlet />
        </Dashboard>
    )
}

export default Admin