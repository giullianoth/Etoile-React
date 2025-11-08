import Carousel, { type ResponsiveType } from "react-multi-carousel"
import Container from "../../../Container"
import Divider from "../../../Divider"
import styles from "./PlatesList.module.css"
import 'react-multi-carousel/lib/styles.css'
import ListButton from "../ListButton"
import Plate from "../Plate"
import type { IPlate } from "../../../../types/plate"
import Trigger from "../../../Trigger"
import Loading from "../../../Loading"
import type { ICategory } from "../../../../types/category"

type Props = {
  categories: ICategory[]
  plates: IPlate[]
  loading: boolean
  categoriesErrorMessage: string | null
  platesErrorMessage: string | null
  onSelectPlate: (plate: IPlate) => void
}

const PlatesList = ({ categories, plates, loading, categoriesErrorMessage, platesErrorMessage, onSelectPlate }: Props) => {

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
    <section className={styles.plates}>
      <Container className={styles.plates__container}>
        <header className={`section-heading ${styles.plates__title}`}>
          <h2>Confira nossos pratos</h2>
        </header>

        <p className={styles.plates__description}>Uma cozinha saudável e genuína, onde ingredientes excepcionais se unem à paixão pelo sabor. Com propostas frescas e originais, satisfazemos os desejos de toda a família, dos aperitivos às sobremesas. Descubra a nossa excelência culinária todos os dias.</p>

        <Divider />

        {loading
          ? <div className={styles.plates__loading}>
            <Loading />
          </div>

          : (categoriesErrorMessage || platesErrorMessage
            ? <div className={styles.plates__error}>
              {categoriesErrorMessage && <Trigger type="error">{categoriesErrorMessage}</Trigger>}
              {platesErrorMessage && <Trigger type="error">{platesErrorMessage}</Trigger>}
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
                        onClick={() => onSelectPlate(plate)} />
                    ))}
                  </Carousel>
                </div>
              </article>
            ))
          )}
      </Container>
    </section>
  )
}

export default PlatesList