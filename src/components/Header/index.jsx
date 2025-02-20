import Container from '../Container'
import styles from './Header.module.css'
import MainMenu from '../MainMenu'
import { Logo } from '../../assets/svg/logo'
import { UserCircle } from '../../assets/svg/user-circle'
import { ShoppingCartSimple } from '../../assets/svg/shopping-cart-simple'
import { Hamburger } from '../../assets/svg/hamburger'
import { Close } from '../../assets/svg/close'
import { useState } from 'react'

const Header = () => {

    const [openMenu, setOpenMenu] = useState(false)
    const [scrolling, setScrolling] = useState(window.scrollY > 0)
    
    const handleOpenMenu = () => setOpenMenu(!openMenu)

    window.addEventListener("scroll", () => setScrolling(window.scrollY > 0))

    return (
        <header className={styles.header + (scrolling ? ` ${styles.headerScrolling}` : "")}>
            <Container className={styles.header__container}>
                <div className={styles.header__logo}>
                    <h1 className={styles.header__title}>Étoile Bistrò</h1>

                    <a href="#">
                        <Logo />
                    </a>
                </div>

                <nav className={styles.navigation + (openMenu ? ` ${styles.navigationOpenMenu}` : "")}>
                    <div className={styles.navigation__profile}>
                        <a href="#">
                            <UserCircle />
                        </a>
                    </div>

                    <div className={styles.navigation__cart}>
                        <a href="#">
                            <ShoppingCartSimple />
                        </a>
                    </div>

                    <div className={styles.navigation__menuIcon} onClick={handleOpenMenu}>
                        {openMenu ? <Close /> : <Hamburger />}
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