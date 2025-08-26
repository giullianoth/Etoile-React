import { PiShoppingCartSimple } from "react-icons/pi"
import styles from "./PlateModal.module.css"

const PlateModal = () => {
    return (
        <section className={styles.plate}>
            <div className={styles.plate__image}>
                <img src="/images/plate.jpg" alt="Shrimp and Vegetable Salad" />
            </div>

            <header className={styles.plate__name}>
                <h2>Shrimp and Vegetable Salad</h2>
            </header>

            <p className={styles.plate__description}>A fresh mixed salad with cooked shrimp, seasonal vegetables, and a secret dressing that will
                make your lunch or dinner shine!</p>

            <div className={styles.plate__action}>
                <p className={styles.plate__price}>$ 10,99</p>

                <button className="button primary">
                    <PiShoppingCartSimple />
                    Adicionar
                </button>
            </div>
        </section>
    )
}

export default PlateModal