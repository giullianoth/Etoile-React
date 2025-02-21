import Container from '../Container'
import styles from './PageTitle.module.css'

const PageTitle = ({ children }) => {
    return (
        <section className={styles.heading}>
            <Container className={styles.heading__container}>
                <header className={styles.heading__title}>
                    <h1>{children}</h1>
                </header>
            </Container>
        </section>
    )
}

export default PageTitle