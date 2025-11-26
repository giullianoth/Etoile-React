import { useEffect } from "react"
import { useAppContext } from "../../../../context/context"
import Container from "../../../Container"
import Divider from "../../../Divider"
import styles from "./Plates.module.css"
import Loading from "../../../Loading"
import Trigger from "../../../Trigger"
import { PiEmpty } from "react-icons/pi"

const Plates = () => {
    const {
        categories,
        handleFetchCategories,
        loading,
        errorMessage,
        handleClearPlatesData
    } = useAppContext().plates

    useEffect(() => {
        handleClearPlatesData()

        const fetchData = async () => {
            await handleFetchCategories()
        }

        fetchData()
    }, [])

    return (
        <section className={styles.plates}>
            <Container className={styles.plates__container}>
                <header className={`section-heading ${styles.plates__title}`}>
                    <h2>Confira nossos pratos</h2>
                </header>

                <p className={styles.plates__tagline}>
                    Uma cozinha saudável e genuína, onde ingredientes excepcionais se unem à paixão pelo sabor. Com propostas frescas e originais, satisfazemos os desejos de toda a família, dos aperitivos às sobremesas. Descubra a nossa excelência culinária todos os dias.
                </p>

                <Divider />

                <div className={styles.plates__byCategory}>
                    {loading
                        ? <Loading />

                        : (errorMessage
                            ? <Trigger type="error">{errorMessage}</Trigger>

                            : (categories && categories.length
                                ? categories.map(category => (
                                    <article key={category._id} className={styles.plates__list}>
                                        <header className={styles.plates__listCategory}>
                                            <h3>{category.name}</h3>
                                        </header>

                                        <p className={styles.plates__listDescription}>
                                            {category.description}
                                        </p>
                                    </article>
                                ))

                                : <Trigger type="warning" icon={<PiEmpty />}>
                                    <span>Ainda não há pratos.</span>
                                </Trigger>))}
                </div>
            </Container>
        </section>
    )
}

export default Plates