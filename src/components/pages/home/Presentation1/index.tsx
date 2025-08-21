import Container from "../../../Container"
import Grid from "../../../Grid"
import styles from "./Presentation1.module.css"
import presentationImage1 from "/images/presentation-image-1.jpg"
import presentationImage2 from "/images/presentation-image-2.jpg"
import presentationImage3 from "/images/presentation-image-3.jpg"

const Presentation1 = () => {
    return (
        <section className={styles.presentation}>
            <Container>
                <Grid columns={3} narrow>
                    <article className={styles.presentation__item}>
                        <img src={presentationImage1} alt="Excelência na Vida Cotidiana" className={styles.presentation__itemImage} />

                        <header className={styles.presentation__itemTitle}>
                            <h2>Excelência na Vida Cotidiana</h2>
                        </header>

                        <p>Descubra nossa seleção diária de pratos exclusivos para adicionar um toque fresco e refinado à sua mesa.</p>
                    </article>

                    <article className={styles.presentation__item}>
                        <img src={presentationImage2} alt="Ingredientes de primeira escolha" className={styles.presentation__itemImage} />

                        <header className={styles.presentation__itemTitle}>
                            <h2>Ingredientes de primeira escolha</h2>
                        </header>

                        <p>Selecionamos cuidadosamente ingredientes excepcionais para garantir a mais alta qualidade em seus pratos favoritos.</p>
                    </article>

                    <article className={styles.presentation__item}>
                        <img src={presentationImage3} alt="Para todos os gostos" className={styles.presentation__itemImage} />

                        <header className={styles.presentation__itemTitle}>
                            <h2>Para todos os gostos</h2>
                        </header>

                        <p>Explore um mundo de sabores com nossa oferta abrangente, projetada para satisfazer o paladar de toda a família, de aperitivos a sobremesas.</p>
                    </article>
                </Grid>
            </Container>
        </section>
    )
}

export default Presentation1