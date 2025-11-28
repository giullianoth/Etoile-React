import { useState } from "react"
import AuthComponent from "../../components/Pages/Auth"
import PageHeading from "../../components/PageHeading"

const Auth = () => {
    const [title, setTitle] = useState<string>("")

    return (
        <>
            <PageHeading title={title} />
            <AuthComponent setTitle={setTitle} />
        </>
    )
}

export default Auth