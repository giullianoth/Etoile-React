import { useEffect, useState } from "react"
import { useAppContext } from "../../../../context/context"
import Container from "../../../Container"
import Divider from "../../../Divider"
import styles from "./Plates.module.css"
import Loading from "../../../Loading"
import Trigger from "../../../Trigger"
import { PiEmpty } from "react-icons/pi"
import Plate from "../Plate"
import Carousel, { type ResponsiveType } from "react-multi-carousel"
import { useWindowBehavior } from "../../../../hooks/window-behavior"
import "react-multi-carousel/lib/styles.css"
import type { IPlate } from "../../../../types/plate"
import Modal from "react-modal"
import SelectedPlate from "../SelectedPlate"

const Plates = () => {
    const {
        categories,
        handleFetchAvailableCategories,
        loading,
        errorMessage,
        handleClearPlatesData,
        plates,
        handleFetchAvailablePlates
    } = useAppContext().plates

    const { breakpointLarge, breakpointSmall } = useWindowBehavior()
    const [selectedPlate, setSelectedPlate] = useState<IPlate | null>(null)
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)

    useEffect(() => {
        handleClearPlatesData()

        const fetchData = async () => {
            await handleFetchAvailableCategories()
            await handleFetchAvailablePlates()
        }

        fetchData()
    }, [])

    useEffect(() => {
        if (selectedPlate) {
            setModalIsOpen(true)
        }
    }, [selectedPlate])

    const carouselBreakpoints: ResponsiveType = {
        desktop: {
            breakpoint: {
                max: 10000,
                min: breakpointLarge
            },
            items: 3,
            partialVisibilityGutter: 40
        },
        tablet: {
            breakpoint: {
                max: breakpointLarge,
                min: breakpointSmall
            },
            items: 2,
            partialVisibilityGutter: 30
        },
        mobile: {
            breakpoint: {
                max: breakpointSmall,
                min: 0
            },
            items: 1,
            partialVisibilityGutter: 20
        }
    }

    return (
        <>
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
                                    && plates && plates.length
                                    ? categories.map(category => (
                                        <article key={category._id} className={styles.plates__list}>
                                            <header className={styles.plates__listCategory}>
                                                <h3>{category.name}</h3>
                                            </header>

                                            <p className={styles.plates__listDescription}>
                                                {category.description}
                                            </p>

                                            <Carousel
                                                draggable
                                                partialVisible
                                                responsive={carouselBreakpoints}
                                                itemClass={styles.plates__plate}
                                                className={styles.plates__carousel}>
                                                {plates.filter(plate => plate.categoryId === category._id)
                                                    .map(plate => (
                                                        <Plate
                                                            key={plate._id}
                                                            plate={plate}
                                                            onClick={() => setSelectedPlate(plate)} />
                                                    ))}
                                            </Carousel>
                                        </article>
                                    ))

                                    : <Trigger type="warning" icon={<PiEmpty />}>
                                        <span>Ainda não há pratos.</span>
                                    </Trigger>))}
                    </div>
                </Container>
            </section>

            <Modal
                isOpen={modalIsOpen}
                closeTimeoutMS={300}
                className="modal"
                overlayClassName="modal-overlay"
                onRequestClose={() => setModalIsOpen(false)}
                onAfterClose={() => setSelectedPlate(null)}>
                <SelectedPlate
                    plate={selectedPlate!}
                    setModalIsOpen={setModalIsOpen} />
            </Modal>
        </>
    )
}

export default Plates