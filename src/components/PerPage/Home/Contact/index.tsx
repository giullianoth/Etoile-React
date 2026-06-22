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

                    <p className={styles.contact__text}>
                        Entre no mundo da Étoile nos seguindo nas redes sociais. Você sempre estará atualizado sobre nossas criações culinárias, eventos especiais e surpresas gourmet. Não perca uma única mordida!
                    </p>
                </div>

                <div className={styles.contact__links}>
                    <ul className={styles.contact__linksList}>
                        <li className={styles.contact__linksItem}>
                            <a
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="button primary"
                                title="Instagram">
                                <PiInstagramLogo />
                            </a>
                        </li>

                        <li className={styles.contact__linksItem}>
                            <a
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="button primary"
                                title="Facebook">
                                <PiFacebookLogo />
                            </a>
                        </li>

                        <li className={styles.contact__linksItem}>
                            <a
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="button primary"
                                title="WhatsApp">
                                <PiWhatsappLogo />
                            </a>
                        </li>

                        <li className={styles.contact__linksItem}>
                            <a
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="button primary"
                                title="Localização">
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