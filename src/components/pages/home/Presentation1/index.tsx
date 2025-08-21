import { presentation } from "../../../../data/presentation"
import Container from "../../../Container"
import Grid from "../../../Grid"
import styles from "./Presentation1.module.css"

const Presentation1 = () => {
    return (
        <section className={styles.presentation}>
            <Container>
                <Grid columns={3} narrow>
                    {presentation.map((item, index) => (
                        <article key={`presentation-${index + 1}`} className={styles.presentation__item}>
                            <img src={item.image} alt={item.title} className={styles.presentation__itemImage} />

                            <header className={styles.presentation__itemTitle}>
                                <h2>{item.title}</h2>
                            </header>

                            <p>{item.text}</p>
                        </article>
                    ))}
                </Grid>
            </Container>
        </section>
    )
}

export default Presentation1