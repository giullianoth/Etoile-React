import Footer from "../../components/Footer"
import Header from "../../components/Header"
import Orders from "../../components/pages/profile/Orders"
import User from "../../components/pages/profile/User"
import ScrollUp from "../../components/ScrollUp"

const Profile = () => {
    return (
        <>
            <Header authenticated={true} />
            <main>
                <User />
                <Orders />
            </main>
            <Footer authenticated={true} />
            <ScrollUp />
        </>
    )
}

export default Profile