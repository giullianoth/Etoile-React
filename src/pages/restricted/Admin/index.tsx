import { Outlet } from "react-router-dom"
import Dashboard from "../../../components/Dashboard"
import { useState } from "react"
import Auth from "../Auth"

const Admin = () => {
    const [authenticated] = useState<boolean>(false)

    if (!authenticated) {
        return <Auth />
    }

    return (
        <Dashboard>
            <Outlet />
        </Dashboard>
    )
}

export default Admin