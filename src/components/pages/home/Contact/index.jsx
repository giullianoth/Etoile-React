import Container from '../../../Container'
import SocialMenu from '../../../SocialMenu'
import styles from './Contact.module.css'

const Contact = () => {
  return (
    <section className={styles.contact}>
      <Container spaced={true} className={styles.contact__container}>
        <div className={styles.contact__info}>
          <header className={styles.contact__title}>
            <h1>Fique atualizado!</h1>
          </header>

          <p className={styles.contact__text}>Entre no mundo da Étoile nos seguindo nas redes sociais. Você sempre estará atualizado sobre nossas criações culinárias, eventos especiais e surpresas gourmet. Não perca uma única mordida!</p>
        </div>

        <div className={styles.contact__links}>
          <SocialMenu menuClassName={styles.contact__menu} menuItemClassName={styles.contact__menuItem} />
        </div>
      </Container>
    </section>
  )
}

export default Contact