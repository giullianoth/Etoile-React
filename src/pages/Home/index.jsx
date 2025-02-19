import Footer from '../../components/Footer'
import Header from '../../components/Header'
import Contact from '../../components/pages/home/Contact'
import Hero from '../../components/pages/home/Hero'
import Presentation from '../../components/pages/home/Presentation'
import styles from './Home.module.css'

const Home = () => {
    return (
        <>
            <Header />
            <main>
                <Hero />
                <Presentation />
                <Contact />
            </main>
            <Footer />
        </>
    )
}

export default Home