import Divider from "../../components/Divider"
import Contact from "../../components/PerPage/Home/Contact"
import Hero from "../../components/PerPage/Home/Hero"
import Presentation from "../../components/PerPage/Home/Presentation"
import Presentation2 from "../../components/PerPage/Home/Presentation2"

const Home = () => {
    return (
        <>
            <Hero />
            <Presentation />
            <Presentation2 />
            <Divider />
            <Contact />
        </>
    )
}

export default Home