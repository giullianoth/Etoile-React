import Divider from "../../components/Divider"
import Contact from "../../components/Pages/Home/Contact"
import Hero from "../../components/Pages/Home/Hero"
import Presentation from "../../components/Pages/Home/Presentation"
import Presentation2 from "../../components/Pages/Home/Presentation2"

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