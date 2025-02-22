import { Link } from 'react-router-dom'
import Container from '../../../Container'
import styles from './Hero.module.css'

const Hero = () => {
  return (
    <section className={styles.hero}>
      <Container className={styles.hero__container}>
        <p className={styles.hero__subtitle}>Paixão da nossa cozinha à sua mesa.</p>

        <header className={styles.hero__title}>
          <h1>Bem-vindo ao Étoile</h1>
        </header>

        <p className={styles.hero__headline}>Aqui, tradição dança com a criatividade moderna para lhe dar uma experiência culinária única. Cada prato é um abraço de sabor, concebido com amor e dedicação para tornar seu dia inesquecível.</p>

        <div className={styles.hero__cta}>
          <a href="#" className={`${styles.hero__ctaButton} button primary`}>Faça seu pedido</a>
          <Link to="/pratos" className={`${styles.hero__ctaButton} button secondary`}>Nossos pratos</Link>
        </div>
      </Container>
    </section>
  )
}

export default Hero