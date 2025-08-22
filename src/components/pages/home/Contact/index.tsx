import { PiFacebookLogo, PiInstagramLogo, PiMapPin, PiWhatsappLogo } from "react-icons/pi"
import Container from "../../../Container"
import styles from "./Contact.module.css"

const Contact = () => {
    return (
        <section className={styles.contact}>
            <Container className={styles.contact__container}>
                <div className={styles.contact__info}>
                    <header className={styles.contact__title}>
                        <h2>Fique atualizado!</h2>
                    </header>

                    <p className={styles.contact__text}>Entre no mundo da Étoile nos seguindo nas redes sociais. Você sempre estará atualizado sobre nossas criações culinárias, eventos especiais e surpresas gourmet. Não perca uma única mordida!</p>
                </div>

                <div className={styles.contact__links}>
                    <ul className={styles.contact__linksList}>
                        <li className={styles.contact__link}>
                            <a
                                href="https://www.instagram.com/tharsoweb"
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Instagram"
                                className="button primary">
                                    <PiInstagramLogo />
                                </a>
                        </li>

                        <li className={styles.contact__link}>
                            <a
                                href="https://www.instagram.com/tharsoweb"
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Facebook"
                                className="button primary">
                                    <PiFacebookLogo />
                                </a>
                        </li>

                        <li className={styles.contact__link}>
                            <a
                                href="https://www.instagram.com/tharsoweb"
                                target="_blank"
                                rel="noopener noreferrer"
                                title="WhatsApp"
                                className="button primary">
                                    <PiWhatsappLogo />
                                </a>
                        </li>

                        <li className={styles.contact__link}>
                            <a
                                href="https://www.instagram.com/tharsoweb"
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Localização"
                                className="button primary">
                                    <PiMapPin />
                                </a>
                        </li>
                    </ul>
                </div>
            </Container>
        </section>
    )
}

export default Contact