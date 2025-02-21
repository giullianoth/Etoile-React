import { Link } from 'react-router-dom'
import { Logo } from '../../assets/svg/logo'
import Container from '../Container'
import MainMenu from '../MainMenu'
import styles from './Footer.module.css'

const Footer = ({ authenticated }) => {
  return (
    <footer className={styles.footer}>
      {!authenticated &&
        <Container spaced={true} className={styles.footer__container}>
          <div className={styles.footer__logo}>
            <Link to="/">
              <Logo />
            </Link>

            <p className={styles.footer__logoSubtitle}>Paixão da nossa cozinha à sua mesa.</p>
          </div>

          <article className={styles.footer__menu}>
            <header className={styles.footer__menuTitle}>
              <h2>Links importantes</h2>
            </header>

            <MainMenu menuClassName={styles.footer__menuList} menuItemClassName={styles.footer__menuItem} />
          </article>
        </Container>}

      <p className={styles.footer__attribution}>
        &copy; {(new Date()).getFullYear()} - Desenvolvido por <a href="https://github.com/giullianoth" target="_blank" rel="noopener noreferrer">Giulliano Guimarães</a>. Baseado no projeto de <a href="https://www.youtube.com/playlist?list=PL45Hr6NzteIJQyvk6v0T78Ye8IsGm0mYS" target="_blank" rel="noopener noreferrer">Eduardo Pazitto</a>.
      </p>
    </footer>
  )
}

export default Footer