import Container from '../Container'
import styles from './Header.module.css'
import logo from "../../assets/images/logo.svg"
import userIcon from "../../assets/images/user-circle.svg"
import cartIcon from "../../assets/images/shopping-cart-simple.svg"
import hamburgerIcon from "../../assets/images/hamburger.svg"
import closeIcon from "../../assets/images/close.svg"
import MainMenu from '../MainMenu'

const Header = () => {
    return (
        <header className={styles.header}>
            <Container className={styles.header__container}>
                <div className={styles.header__logo}>
                    <h1 className={styles.header__title}>Étoile Bistrò</h1>

                    <a href="#">
                        <img src={logo} alt="Étoile Bistrò" />
                    </a>
                </div>

                <nav className={styles.navigation}>
                    <div className={styles.navigation__profile}>
                        <a href="#">
                            <img src={userIcon} alt="Perfil" />
                        </a>
                    </div>

                    <div className={styles.navigation__cart}>
                        <a href="#">
                            <img src={cartIcon} alt="Carrinho" />
                        </a>
                    </div>

                    <div className={styles.navigation__menuIcon}>
                        <img src={hamburgerIcon} alt="Open Menu" />
                    </div>

                    <div className={styles.navigation__overlay}>
                        <div className={styles.navigation__menuWrapper}>
                            <MainMenu
                                menuClassName={styles.menu}
                                menuItemClassName={styles.menuItem} />
                        </div>
                    </div>
                </nav>
            </Container>
        </header>
    )
}

export default Header