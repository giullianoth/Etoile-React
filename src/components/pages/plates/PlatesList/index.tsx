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

const PlatesList = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)

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

          <article className={styles.plates__list}>
            <header className={styles.plates__listTitle}>
              <h3>Entradas</h3>
            </header>

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
                <Plate onClick={() => setModalIsOpen(true)} />
                <Plate onClick={() => setModalIsOpen(true)} />
                <Plate onClick={() => setModalIsOpen(true)} />
                <Plate onClick={() => setModalIsOpen(true)} />
                <Plate onClick={() => setModalIsOpen(true)} />
              </Carousel>
            </div>
          </article>

          <article className={styles.plates__list}>
            <header className={styles.plates__listTitle}>
              <h3>Prato Principal</h3>
            </header>

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
                <Plate onClick={() => setModalIsOpen(true)} />
                <Plate onClick={() => setModalIsOpen(true)} />
                <Plate onClick={() => setModalIsOpen(true)} />
                <Plate onClick={() => setModalIsOpen(true)} />
                <Plate onClick={() => setModalIsOpen(true)} />
              </Carousel>
            </div>
          </article>

          <article className={styles.plates__list}>
            <header className={styles.plates__listTitle}>
              <h3>Acompanhamentos</h3>
            </header>

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
                <Plate onClick={() => setModalIsOpen(true)} />
                <Plate onClick={() => setModalIsOpen(true)} />
                <Plate onClick={() => setModalIsOpen(true)} />
                <Plate onClick={() => setModalIsOpen(true)} />
                <Plate onClick={() => setModalIsOpen(true)} />
              </Carousel>
            </div>
          </article>

          <article className={styles.plates__list}>
            <header className={styles.plates__listTitle}>
              <h3>Outros</h3>
            </header>

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
                <Plate onClick={() => setModalIsOpen(true)} />
                <Plate onClick={() => setModalIsOpen(true)} />
                <Plate onClick={() => setModalIsOpen(true)} />
                <Plate onClick={() => setModalIsOpen(true)} />
                <Plate onClick={() => setModalIsOpen(true)} />
              </Carousel>
            </div>
          </article>
        </Container>
      </section>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        closeTimeoutMS={300}
        overlayClassName="modal-overlay"
        className="modal">
        <PlateModal />
      </Modal>
    </>
  )
}

export default PlatesList