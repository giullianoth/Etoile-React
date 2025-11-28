import styles from "./Plate.module.css"
import type { IPlate } from '../../../../types/plate'
import { useCurrency } from "../../../../hooks/currency"

type Props = {
    plate: IPlate
}

const Plate = ({ plate }: Props) => {
    const currency = useCurrency()

    return (
        <article className={styles.plate}>
            <img src={`/images/plates/${plate.image}`} alt={plate.name} />

            <div className={styles.plate__info}>
                <header className={styles.plate__name}>
                    <h4>{plate.name}</h4>
                </header>

                <p className={styles.plate__description}>{plate.description}</p>

                <p className={styles.plate__price}>{currency(plate.price)}</p>
            </div>
        </article>
    )
}

export default Plate