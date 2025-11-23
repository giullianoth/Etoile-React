import { Link, useLocation } from "react-router-dom"
import Container from "../Container"
import styles from "./Footer.module.css"
import logo from "/images/logo.svg"
import { useEffect, useState } from "react"
import { useAppContext } from "../../context/context"

const Footer = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
    const { success: authenticated, user } = useAppContext().auth
    const { pathname } = useLocation()

    useEffect(() => {
        setIsAuthenticated(
            authenticated && pathname.includes("perfil")
        )
    }, [authenticated, user, pathname])

    return (
        <footer className={styles.footer}>
            {!isAuthenticated &&
                <Container className={styles.footer__container}>
                    <div className={styles.footer__logo}>
                        <Link to="/" className={styles.footer__logoLink}>
                            <img src={logo} alt="Étoile Bistrò" />
                        </Link>

                        <p className={styles.footer__tagline}>
                            Paixão da nossa cozinha à sua mesa.
                        </p>
                    </div>

                    <div className={styles.footer__navigation}>
                        <nav>
                            <header className={styles.footer__navigationTitle}>
                                <h2>Links importantes</h2>
                            </header>

                            <ul className={styles.footer__menu}>
                                <li className={styles.footer__menuItem}>
                                    <Link to="/">Home</Link>
                                </li>

                                <li className={styles.footer__menuItem}>
                                    <Link to="/pratos">Pratos</Link>
                                </li>

                                <li className={styles.footer__menuItem}>
                                    <Link to="/perfil">Meu perfil</Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </Container>}

            <p className={styles.footer__attribution}>
                &copy; {new Date().getFullYear()} -{" "}

                Desenvolvido por{" "}
                <a href="https://github.com/giullianoth" target="_blank" rel="noopener noreferrer">
                    Giulliano Guimarães
                </a>.{" "}

                Baseado no projeto de{" "}
                <a
                    href="https://www.youtube.com/playlist?list=PL45Hr6NzteIJQyvk6v0T78Ye8IsGm0mYS"
                    target="_blank"
                    rel="noopener noreferrer">
                    Eduardo Pazitto
                </a>.
            </p>
        </footer>
    )
}

export default Footer