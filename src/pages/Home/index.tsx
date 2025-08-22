import Divider from "../../components/Divider"
import Contact from "../../components/pages/home/Contact"
import Hero from "../../components/pages/home/Hero"
import Presentation1 from "../../components/pages/home/Presentation1"
import Presentation2 from "../../components/pages/home/Presentation2"

const Home = () => {
    return (
        <>
            <Hero />
            <Presentation1 />
            <Presentation2 />
            <Divider />
            <Contact />
        </>
    )
}

export default Home