import { PiShoppingCartSimple } from "react-icons/pi"
import styles from "./PlateModal.module.css"
import type { IPlate } from "../../../../interfaces/plate"
import { useCurrency } from "../../../../hooks/useCurrency"

type Props = {
    plate: IPlate
    onAddPlate: (plate: IPlate) => void
}

const PlateModal = ({ plate, onAddPlate }: Props) => {
    const currency = useCurrency()

    return (
        <section className={styles.plate}>
            <div className={styles.plate__image}>
                <img src={plate.image ? `/images/plates/${plate.image}` : "/images/no-image.jpg"} alt={plate.name} />
            </div>

            <header className={styles.plate__name}>
                <h2>{plate.name}</h2>
            </header>

            <p className={styles.plate__ingredients}>
                {plate.ingredients.map((ingredient, index) => (
                    <span key={`ingredient-${index + 1}`}>
                        {ingredient}
                        {index + 1 < plate.ingredients.length && <>, </>}
                    </span>
                ))}
            </p>

            <p className={styles.plate__description}>{plate.description}</p>

            <div className={styles.plate__action}>
                <p className={styles.plate__price}>{currency(plate.price)}</p>

                <button className="button primary" onClick={() => onAddPlate(plate)}>
                    <PiShoppingCartSimple />
                    Adicionar
                </button>
            </div>
        </section>
    )
}

export default PlateModal