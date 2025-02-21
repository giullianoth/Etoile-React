import Footer from "../../components/Footer"
import Header from "../../components/Header"
import ScrollUp from "../../components/ScrollUp"

const Profile = () => {
    return (
        <>
            <Header authenticated={true} />
            <main>
                <div>Profile</div>
            </main>
            <Footer authenticated={true} />
            <ScrollUp />
        </>
    )
}

export default Profile