import type { ReactNode } from "react"
import styles from "./PageTitle.module.css"
import Container from "../Container"

type Props = {
    children?: ReactNode
}

const PageTitle = ({ children }: Props) => {
    return (
        <section className={styles.pageHeading}>
            <Container className={styles.pageHeading__container}>
                <header className={styles.pageHeading__title}>
                    <h1>{children}</h1>
                </header>
            </Container>
        </section>
    )
}

export default PageTitle