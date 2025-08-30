import { Link, NavLink, useLocation } from "react-router-dom"
import Container from "../Container"
import styles from "./Header.module.css"
import logo from "/images/logo.svg"
import logoAlt from "/images/logo-alt.svg"
import { PiList, PiShoppingCartSimple, PiSignOut, PiUserCircle, PiX } from "react-icons/pi"
import { useRef, useState } from "react"
import { useWindowBehavior } from "../../hooks/useWindowBehavior"
import { users } from "../../data/users"
import { useFirstName } from "../../hooks/useFirstName"
import { useAppContext } from "../../context/context"

const Header = () => {
    const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false)
    const overlayRef = useRef<HTMLDivElement | null>(null)
    const user = users[0]
    const { scrolling } = useWindowBehavior()
    const firstName = useFirstName()
    const { pathname } = useLocation()
    const auth: boolean = pathname === "/perfil"
    const { cart } = useAppContext().cart

    return (
        <header
            className={styles.header
                + (scrolling ? ` ${styles.scrolling}` : "")
                + (auth ? ` ${styles.authenticated}` : "")}>
            <Container className={styles.header__container}>
                <div className={styles.header__logo}>
                    <h1>Étoile Bistrò</h1>

                    <Link to="/">
                        <img src={auth ? logoAlt : logo} alt="Étoile Bistrò" />
                    </Link>
                </div>

                <div
                    className={styles.header__navigation + (menuIsOpen ? ` ${styles.menuOpen}` : "")}>
                    <nav>
                        {auth &&
                            <div className={styles.header__navigationLogout}>
                                <button className="button clear" title="Sair">
                                    <PiSignOut />
                                </button>
                            </div>}

                        <div className={styles.header__navigationProfile}>
                            <Link to="/perfil" title="Meu perfil">
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

                        {auth &&
                            <p className={styles.header__navigationWelcome}>
                                Bem-vindo, <strong>{firstName(user.fullname)}</strong>!
                            </p>}

                        {!auth &&
                            <>
                                <div
                                    className={styles.header__navigationMenuIcon}
                                    onClick={() => setMenuIsOpen(!menuIsOpen)}>
                                    {menuIsOpen ? <PiX /> : <PiList />}
                                </div>

                                <div
                                    ref={overlayRef}
                                    className={styles.header__overlay}
                                    onClick={event => event.target === overlayRef.current && setMenuIsOpen(false)}>
                                    <div className={styles.header__menuWrapper}>
                                        <ul className={styles.header__menu}>
                                            <li className={styles.header__menuItem}>
                                                <NavLink to="/" onClick={() => setMenuIsOpen(false)}>Home</NavLink>
                                            </li>

                                            <li className={styles.header__menuItem}>
                                                <NavLink to="/pratos" onClick={() => setMenuIsOpen(false)}>Pratos</NavLink>
                                            </li>

                                            <li className={styles.header__menuItem}>
                                                <NavLink to="/perfil" onClick={() => setMenuIsOpen(false)}>Meu perfil</NavLink>
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