import Carousel, { type ResponsiveType } from "react-multi-carousel"
import Container from "../../../Container"
import Divider from "../../../Divider"
import styles from "./PlatesList.module.css"
import 'react-multi-carousel/lib/styles.css'
import ListButton from "../ListButton"
import Plate from "../Plate"
import { useState } from "react"
import Modal from "react-modal"
import PlateModal from "../PlateModal"
import { availableCategories } from "../../../../data/categories"
import { plates } from "../../../../data/plates"
import type { IPlate } from "../../../../interfaces/plate"

const PlatesList = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
  const [plateToShow, setPlateToShow] = useState<IPlate | null>(null)

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

  const handleSelectPlate = (plate: IPlate) => {
    setPlateToShow(plate)
    setModalIsOpen(true)
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

          {availableCategories.map(category => (
            <article key={`category-${category.id}`} className={styles.plates__list}>
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
                  {plates.filter(plate => plate.categoryId === category.id).map(plate => (
                    plate.available &&
                    <Plate
                      key={`plate-${plate.id}`}
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
        <PlateModal plate={plateToShow!} />
      </Modal>
    </>
  )
}

export default PlatesList