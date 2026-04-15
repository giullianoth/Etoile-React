import { useState } from "react"
import AuthComponent from "../../components/Pages/Auth"
import PageHeading from "../../components/PageHeading"

const Auth = () => {
    const [title, setTitle] = useState<string>("")

    const handleChangeTitle = (titleValue: string) => {
        setTitle(titleValue)
    }

    return (
        <>
            <PageHeading title={title} />
            <AuthComponent onChangeTitle={handleChangeTitle} />
        </>
    )
}

export default Auth