import { Link, NavLink } from "react-router-dom"
import Container from "../Container"
import styles from "./Header.module.css"
import logo from "/images/logo.svg"
import { PiList, PiShoppingCartSimple, PiUserCircle } from "react-icons/pi"

const Header = () => {
    return (
        <header className={styles.header}>
            <Container className={styles.header__container}>
                <div className={styles.header__logo}>
                    <h1>Étoile Bistrò</h1>

                    <Link to="/">
                        <img src={logo} alt="Étoile Bistrò" />
                    </Link>
                </div>

                <div className={styles.header__navigation}>
                    <nav>
                        <div className={styles.header__navigationProfile}>
                            <Link to="/perfil">
                                <PiUserCircle />
                            </Link>
                        </div>

                        <div className={styles.header__navigationCart}>
                            <Link to="/carrinho">
                                <PiShoppingCartSimple />
                            </Link>
                        </div>

                        <div className={styles.header__navigationMenuIcon}>
                            <PiList />
                        </div>

                        <div className={styles.header__overlay}>
                            <div className={styles.header__menuWrapper}>
                                <ul className={styles.header__menu}>
                                    <li className={styles.header__menuItem}>
                                        <NavLink to="/">Home</NavLink>
                                    </li>

                                    <li className={styles.header__menuItem}>
                                        <NavLink to="/pratos">Pratos</NavLink>
                                    </li>

                                    <li className={styles.header__menuItem}>
                                        <NavLink to="/perfil">Meu perfil</NavLink>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            </Container>
        </header>
    )
}

export default Header