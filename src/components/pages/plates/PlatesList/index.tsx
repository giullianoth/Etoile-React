import Carousel, { type ResponsiveType } from "react-multi-carousel"
import Container from "../../../Container"
import Divider from "../../../Divider"
import styles from "./PlatesList.module.css"
import 'react-multi-carousel/lib/styles.css'
import ListButton from "./ListButton"

const PlatesList = () => {
  const responsiveCarousel: ResponsiveType = {
    desktop: {
      breakpoint: { max: 8000, min: 992 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 992, min: 576 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 576, min: 0 },
      items: 1
    },
  }

  return (
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
              responsive={responsiveCarousel}>
              <article style={{ border: "1px solid red", height: "200px" }}>Prato</article>
              <article style={{ border: "1px solid red", height: "200px" }}>Prato</article>
              <article style={{ border: "1px solid red", height: "200px" }}>Prato</article>
              <article style={{ border: "1px solid red", height: "200px" }}>Prato</article>
              <article style={{ border: "1px solid red", height: "200px" }}>Prato</article>
            </Carousel>
          </div>
        </article>
      </Container>
    </section>
  )
}

export default PlatesList