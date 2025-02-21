import Footer from "../../components/Footer"
import Header from "../../components/Header"
import PlatesSection from "../../components/pages/plates/PlatesSection"
import PageTitle from "../../components/PageTitle"
import ScrollUp from "../../components/ScrollUp"

const Plates = () => {
    return (
        <>
            <Header />
            <main>
                <PageTitle>Pratos</PageTitle>
                <PlatesSection />
            </main>
            <Footer />
            <ScrollUp />
        </>
    )
}

export default Plates