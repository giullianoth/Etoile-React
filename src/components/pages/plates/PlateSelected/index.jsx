import styles from './PlateSelected.module.css'
import plateImage from "../../../../assets/images/plate.jpg"
import { ShoppingCartSimple } from '../../../../assets/svg/shopping-cart-simple'

const PlateSelected = () => {
  return (
    <section className={styles.modal}>
        <div className={styles.modal__wrapper}>
            <article className={styles.plateSelected}>
                <div className={styles.plateSelected__image}>
                    <img src={plateImage} alt="Shrimp and Vegetable Salad" />
                </div>

                <header className={styles.plateSelected__name}>
                    <h1>Shrimp and Vegetable Salad</h1>
                </header>

                <p className={styles.plateSelected__description}>A fresh mixed salad with cooked shrimp, seasonal vegetables, and a secret dressing that will make your lunch or dinner shine!</p>

                <div className={styles.plateSelected__cta}>
                    <p className={styles.plateSelected__price}>$ 10,99</p>

                    <a href="#" className={`button primary ${styles.plateSelected__button}`}>
                        <ShoppingCartSimple />
                        Adicionar
                    </a>
                </div>
            </article>
        </div>
    </section>
  )
}

export default PlateSelected