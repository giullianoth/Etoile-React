import styles from "./Plate.module.css"
import { useCurrency } from "../../../../hooks/currency"

type Props = {
    onOpen: () => void
}

const Plate = ({ onOpen }: Props) => {
    const currency = useCurrency()

    return (
        <article
            className={styles.plate}
            onClick={onOpen}>
            <img
                src={"/images/no-image.jpg"}
                alt={"Nome do prato"} />

            <div className={styles.plate__info}>
                <header className={styles.plate__name}>
                    <h4>Nome do prato</h4>
                </header>

                <p className={styles.plate__description}>Descrição do prato</p>

                <p className={styles.plate__price}>{currency(0)}</p>
            </div>
        </article>
    )
}

export default Plate