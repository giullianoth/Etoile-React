import Footer from "../../components/Footer"
import Header from "../../components/Header"
import Authentication from "../../components/pages/auth/Authentication"
import ScrollUp from "../../components/ScrollUp"

const Auth = () => {
    return (
        <>
            <Header />
            <main>
                <Authentication />
            </main>
            <Footer />
            <ScrollUp />
        </>
    )
}

export default Auth