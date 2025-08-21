import { Link } from "react-router-dom"
import Container from "../../../Container"
import styles from "./Presentation2.module.css"
import banner from "/images/presentation2-image.jpg"

const Presentation2 = () => {
    return (
        <section className={styles.presentation}>
            <Container className={styles.presentation__container}>
                <div className={styles.presentation__image}>
                    <img src={banner} alt="Imagem Apresentação" />
                </div>

                <div className={styles.presentation__info}>
                    <header className={styles.presentation__title}>
                        <h2>Amor pelos detalhes, qualidade nos sabores.</h2>
                    </header>

                    <p className={styles.presentation__text}>Nós queremos trazer nossa paixão pela culinária diretamente à sua mesa. Cada prato é uma obra-prima, preparado com amor e cuidado, pronto para transformar sua refeição em um momento extraordinário.</p>

                    <div className={styles.presentation__cta}>
                        <Link to="/pratos" className="button primary">Veja nossas especialidades</Link>
                    </div>
                </div>
            </Container>
        </section>
    )
}

export default Presentation2