import { Link, useLocation, useNavigate } from "react-router-dom"
import Container from "../Container"
import styles from "./Header.module.css"
import logo from "/images/logo.svg"
import logoAlt from "/images/logo-alt.svg"
import { PiList, PiShoppingCartSimple, PiSignOut, PiUserCircle, PiX } from "react-icons/pi"
import { useEffect, useRef, useState } from "react"
import { useWindowBehavior } from "../../hooks/window-behavior"
import { useAppContext } from "../../context/context"
import { useFirstName } from "../../hooks/first-name"

const Header = () => {
    const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false)
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
    const overlayRef = useRef<HTMLDivElement | null>(null)
    const { scrolling } = useWindowBehavior()
    const { success: authenticated, user, handleLogout } = useAppContext().auth
    const { cart } = useAppContext().cart
    const { pathname } = useLocation()
    const firstName = useFirstName()
    const navigate = useNavigate()

    useEffect(() => {
        setIsAuthenticated(
            authenticated && pathname.includes("perfil")
        )
    }, [authenticated, user, pathname])

    const handleLogoutAccount = () => {
        handleLogout()
        navigate("/autenticacao")
    }

    return (
        <header
            className={styles.header +
                (isAuthenticated ? ` ${styles.authenticated}` : "") +
                (scrolling ? ` ${styles.scrolling}` : "")}>
            <Container className={styles.header__container}>
                <div className={styles.header__logo}>
                    <h1>Étoile Bistrò</h1>

                    <Link to="/">
                        <img src={isAuthenticated ? logoAlt : logo} alt="Étoile Bistrò" />
                    </Link>
                </div>

                <div
                    className={styles.header__navigation + (menuIsOpen ? ` ${styles.openMenu}` : "")}>
                    <nav>
                        {isAuthenticated &&
                            <div className={styles.header__logout}>
                                <button
                                    className="button clear"
                                    title="Sair da minha conta"
                                    onClick={handleLogoutAccount}>
                                    <PiSignOut />
                                </button>
                            </div>}

                        <div className={styles.header__navigationProfile}>
                            <Link
                                to="/perfil"
                                title={user
                                    ? `Perfil de ${firstName(user.fullname)}`
                                    : "Meu Perfil"}>
                                <PiUserCircle />
                            </Link>
                        </div>

                        <div className={styles.header__navigationCart}>
                            <Link to="/carrinho" title="Carrinho">
                                <PiShoppingCartSimple />

                                {cart && cart.length > 0 &&
                                    <span className={styles.header__navigationCartQt}>
                                        {cart.length}
                                    </span>}
                            </Link>
                        </div>

                        {isAuthenticated && user &&
                            <p className={styles.header__welcome}>
                                Bem-vindo, <strong>{firstName(user?.fullname!)}</strong>!
                            </p>}

                        {!isAuthenticated &&
                            <>
                                <div
                                    className={styles.header__menuIcon}
                                    onClick={() => setMenuIsOpen(!menuIsOpen)}>
                                    {menuIsOpen ? <PiX /> : <PiList />}
                                </div>

                                <div
                                    ref={overlayRef}
                                    className={styles.header__overlay}
                                    onClick={event => event.target === overlayRef?.current && setMenuIsOpen(false)}>
                                    <div className={styles.header__menuWrapper}>
                                        <ul className={styles.header__menu}>
                                            <li className={styles.header__menuItem}>
                                                <Link
                                                    to="/"
                                                    onClick={() => setMenuIsOpen(false)}>Home</Link>
                                            </li>

                                            <li className={styles.header__menuItem}>
                                                <Link
                                                    to="/pratos"
                                                    onClick={() => setMenuIsOpen(false)}>Pratos</Link>
                                            </li>

                                            <li className={styles.header__menuItem}>
                                                <Link
                                                    to="/perfil"
                                                    onClick={() => setMenuIsOpen(false)}>Meu Perfil</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </>}
                    </nav>
                </div>
            </Container>
        </header>
    )
}

export default Header