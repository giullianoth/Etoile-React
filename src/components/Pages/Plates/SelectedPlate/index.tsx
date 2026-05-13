import { PiBeerBottle, PiShoppingCartSimple } from "react-icons/pi"
import { useCurrency } from "../../../../hooks/currency"
import Popup from "../../../Popup"
import styles from "../../../Popup/Popup.module.css"

type Props = {
    onAddPlate: () => void
}

const SelectedPlate = ({ onAddPlate }: Props) => {
    const currency = useCurrency()

    return (
        <Popup>
            <div className={styles.popup__image}>
                <img src={`/images/no-image.jpg`} alt="" />
            </div>

            <header className={styles.popup__heading}>
                <h2>Nome do prato</h2>
            </header>

            <p className={styles.popup__subtitle}>Categoria</p>

            <p className={styles.popup__supportText}>
                Ingrediente, Ingrediente, Ingrediente
            </p>

            <p className={styles.popup__regularText}>Descrição do prato</p>

            <p className={styles.popup__regularText}>
                <PiBeerBottle className={styles.popup__iconClaret} />
                Acompanha muito bem um <strong>acompanhamento</strong>
            </p>

            <div className={`${styles.popup__action} ${styles.popup__spaced}`}>
                <p className={styles.popup__detachedText}>
                    {currency(0)}
                </p>

                <button
                    className="button primary"
                    onClick={onAddPlate}>
                    <PiShoppingCartSimple />
                    Adicionar
                </button>
            </div>
        </Popup>
    )
}

export default SelectedPlate