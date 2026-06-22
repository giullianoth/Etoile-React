import { useCurrency } from "../../../../hooks/currency"
import { uploadsURL } from "../../../../services/api"
import type { IPlate } from "../../../../types/plate"
import styles from "./Plate.module.css"

type Props = {
    plate: IPlate
    onSelectPlate: (plate: IPlate) => void
}

const Plate = ({ plate, onSelectPlate }: Props) => {
    const currency = useCurrency()

    return (
        <article
            role="button"
            className={styles.plate}
            onClick={() => onSelectPlate(plate)}>
            <img
                src={
                    plate.image
                        ? `${uploadsURL}/plates/${plate.image}`
                        : "/images/no-image.jpg"
                }
                alt={plate.name} />

            <div className={styles.plate__info}>
                <header className={styles.plate__name}>
                    <h4>{plate.name}</h4>
                </header>

                <p className={styles.plate__description}>
                    {plate.description}
                </p>

                <p className={styles.plate__price}>
                    {currency(plate.price)}
                </p>
            </div>
        </article>
    )
}

export default Plate