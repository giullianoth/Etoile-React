import { useEffect, useState } from "react"
import { useAppContext } from "../../../../context/app-context"
import Carousel from "../../../Carousel"
import Container from "../../../Container"
import Divider from "../../../Divider"
import SectionHeading from "../../../SectionHeading"
import Plate from "../Plate"
import styles from "./Plates.module.css"
import Loading from "../../../Loading"
import Trigger from "../../../Trigger"
import type { IPlate } from "../../../../types/plate"
import Modal from "../../../Modal"
import SelectedPlate from "../SelectedPlate"

const Plates = () => {
    const [selectedPlate, setSelectedPlate] = useState<IPlate | null>(null)
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)

    const {
        plates,
        categories,
        fetching,
        fetchErrorMessage,
        handleFetchAvailableCategories,
        handleFetchAvailablePlates,
        handleResetPlatesMessages,
    } = useAppContext().plates

    const platesByCategory = (categoryId: string) => plates.filter(plate => plate.categoryId === categoryId)

    useEffect(() => {
        const fetchData = async () => {
            await handleFetchAvailableCategories()
            await handleFetchAvailablePlates()
        }

        fetchData()
        return () => handleResetPlatesMessages()
    }, [handleFetchAvailableCategories, handleFetchAvailablePlates, handleResetPlatesMessages])

    const handleSelectPlate = (plate: IPlate) => {
        setSelectedPlate(plate)
        setModalIsOpen(true)
    }

    return (
        <>
            <section className={styles.plates}>
                <Container className={styles.plates__container}>
                    <SectionHeading title="Confira nossos pratos" />

                    <p className={styles.plates__tagline}>
                        Uma cozinha saudável e genuína, onde ingredientes excepcionais se unem à paixão pelo sabor. Com propostas frescas e originais, satisfazemos os desejos de toda a família, dos aperitivos às sobremesas. Descubra a nossa excelência culinária todos os dias.
                    </p>

                    <Divider />

                    <div className={styles.plates__byCategory}>
                        {fetching
                            ? <Loading />

                            : fetchErrorMessage
                                ? <Trigger type="error">{fetchErrorMessage}</Trigger>

                                : categories.length
                                    ? categories.map(category => (
                                        <article
                                            key={category._id}
                                            className={styles.plates__list}>
                                            <header className={styles.plates__listCategory}>
                                                <h3>{category.name}</h3>
                                            </header>

                                            <p className={styles.plates__listDescription}>
                                                {category.description}
                                            </p>

                                            <Carousel spacing={20} itemsToShow={3}>
                                                {platesByCategory(category._id).map(plate => (
                                                    <Plate
                                                        key={plate._id}
                                                        plate={plate}
                                                        onSelectPlate={handleSelectPlate} />
                                                ))}
                                            </Carousel>
                                        </article>
                                    ))

                                    : <Trigger type="warning">Ainda não há pratos.</Trigger>}
                    </div>
                </Container>
            </section>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                onAfterClose={() => setSelectedPlate(null)}>
                {selectedPlate &&
                    <SelectedPlate
                        plate={selectedPlate}
                        onClosePopup={() => setModalIsOpen(false)} />}
            </Modal>
        </>
    )
}

export default Plates