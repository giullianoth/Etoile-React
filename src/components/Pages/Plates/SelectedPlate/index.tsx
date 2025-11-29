import { PiBeerBottle, PiShoppingCartSimple } from "react-icons/pi"
import { useCurrency } from "../../../../hooks/currency"
import type { IPlate } from "../../../../types/plate"
import Popup from "../../../Popup"
import styles from "../../../Popup/Popup.module.css"

type Props = {
    plate: IPlate
}

const SelectedPlate = ({ plate }: Props) => {
    const currency = useCurrency()

    return (
        <Popup>
            <div className={styles.popup__image}>
                <img src={`/images/plates/${plate.image}`} alt="" />
            </div>

            <header className={styles.popup__heading}>
                <h2>{plate.name}</h2>
            </header>

            <p className={styles.popup__subtitle}>{plate.category}</p>

            <p className={styles.popup__supportText}>
                {plate.ingredients.join(", ")}
            </p>

            <p className={styles.popup__regularText}>{plate.description}</p>

            <p className={styles.popup__regularText}>
                <PiBeerBottle className={styles.popup__iconClaret} />
                Acompanha muito bem um <strong>{plate.pairing}</strong>
            </p>

            <div className={`${styles.popup__action} ${styles.popup__actionSpaced}`}>
                <p className={styles.popup__detachedText}>
                    {currency(plate.price)}
                </p>

                <button className="button primary">
                    <PiShoppingCartSimple />
                    Adicionar
                </button>
            </div>
        </Popup>
    )
}

export default SelectedPlate