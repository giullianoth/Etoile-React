import Carousel, { type ResponsiveType } from "react-multi-carousel"
import Container from "../../../Container"
import Divider from "../../../Divider"
import styles from "./PlatesList.module.css"
import 'react-multi-carousel/lib/styles.css'
import ListButton from "../ListButton"
import Plate from "../Plate"
import { useEffect, useState } from "react"
import Modal from "react-modal"
import PlateModal from "../PlateModal"
import type { IPlate } from "../../../../interfaces/plate"
import { useAppContext } from "../../../../context/context"
import type { ICartItem } from "../../../../interfaces/cart-item"
import Trigger from "../../../Trigger"
import { useTrigger } from "../../../../hooks/useTrigger"
import Loading from "../../../Loading"

const PlatesList = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
  const [plateToShow, setPlateToShow] = useState<IPlate | null>(null)
  const { addToCart } = useAppContext().cart
  const { showTrigger, triggerIsVisible } = useTrigger()
  const { categoriesState, getAvailableCategories } = useAppContext().categories
  const { platesState, getAvailablePlates } = useAppContext().plates
  const { categories } = categoriesState
  const { plates, loading } = platesState

  const responsiveCarousel: ResponsiveType = {
    desktop: {
      breakpoint: { max: 8000, min: 992 },
      items: 3,
      partialVisibilityGutter: 40
    },
    tablet: {
      breakpoint: { max: 992, min: 576 },
      items: 2,
      partialVisibilityGutter: 40
    },
    mobile: {
      breakpoint: { max: 576, min: 0 },
      items: 1,
      partialVisibilityGutter: 40
    },
  }

  useEffect(() => {
    getAvailableCategories()
  }, [categoriesState])

  useEffect(() => {
    getAvailablePlates()
  }, [platesState])

  const handleSelectPlate = (plate: IPlate) => {
    setPlateToShow(plate)
    setModalIsOpen(true)
  }

  const handleAddPlate = (plate: IPlate) => {
    const cartItem: ICartItem = {
      plate: plate,
      quantity: 1
    }

    addToCart(cartItem)
    setModalIsOpen(false)
    showTrigger()
  }

  return (
    <>
      <section className={styles.plates}>
        <Container className={styles.plates__container}>
          <header className={`section-heading ${styles.plates__title}`}>
            <h2>Confira nossos pratos</h2>
          </header>

          <p className={styles.plates__description}>Uma cozinha saudável e genuína, onde ingredientes excepcionais
            se unem à paixão pelo sabor. Com propostas frescas e originais, satisfazemos os desejos de toda a
            família, dos aperitivos às sobremesas. Descubra a nossa excelência culinária todos os dias.</p>

          <Divider />

          {loading
            ? <div className={styles.plates__loading}>
              <Loading />
            </div>

            : categories && categories.length > 0 &&
            categories.map(category => (
              <article key={`category-${category._id}`} className={styles.plates__list}>
                <header className={styles.plates__listTitle}>
                  <h3>{category.name}</h3>
                </header>

                <p className={styles.plates__listDescription}>{category.description}</p>

                <div className={styles.plates__byCategory}>
                  <Carousel
                    arrows
                    swipeable
                    draggable
                    partialVisible
                    customLeftArrow={<ListButton direction="prev" />}
                    customRightArrow={<ListButton direction="next" />}
                    responsive={responsiveCarousel}
                    className={styles.plates__carousel}
                    itemClass={styles.plates__carouselItem}>
                    {plates.filter(plate => plate.categoryId === category._id).map(plate => (
                      <Plate
                        key={`plate-${plate._id}`}
                        plate={plate}
                        onClick={() => handleSelectPlate(plate)} />
                    ))}
                  </Carousel>
                </div>
              </article>
            ))}
        </Container>
      </section>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        closeTimeoutMS={300}
        overlayClassName="modal-overlay"
        className="modal">
        <PlateModal
          plate={plateToShow!}
          onAddPlate={handleAddPlate} />
      </Modal>

      {triggerIsVisible &&
        <Trigger type="success" floating>
          Prato adicionado ao carrinho.
        </Trigger>}
    </>
  )
}

export default PlatesList