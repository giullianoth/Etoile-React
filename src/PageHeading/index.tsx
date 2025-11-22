import Container from "../components/Container"
import styles from "./PageHeading.module.css"

type Props = {
    title: string
}

const PageHeading = ({ title }: Props) => {
    return (
        <section className={styles.heading}>
            <Container className={styles.heading__container}>
                <header className={styles.heading__title}>
                    <h2>{title}</h2>
                </header>
            </Container>
        </section>
    )
}

export default PageHeading