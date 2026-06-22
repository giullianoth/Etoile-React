import { PiBeerBottle, PiShoppingCartSimple } from 'react-icons/pi'
import { useCurrency } from '../../../../hooks/currency'
import { uploadsURL } from '../../../../services/api'
import type { IPlate } from '../../../../types/plate'
import Popup from '../../../Popup'
import styles from "../../../Popup/Popup.module.css"
import { useAppContext } from '../../../../context/app-context'

type Props = {
    plate: IPlate
    onClosePopup: () => void
}

const SelectedPlate = ({ plate, onClosePopup }: Props) => {
    const currency = useCurrency()
    const { addToCart } = useAppContext().cart
    const { addMessage } = useAppContext().message

    const handleAddPlateToCart = () => {
        addToCart(plate)
        addMessage("Prato adicionado ao carrinho.")
        onClosePopup()
    }

    return (
        <Popup>
            <div className={styles.popup__image}>
                <img
                    src={plate.image
                        ? `${uploadsURL}/plates/${plate.image}`
                        : "/images/no-image.jpg"
                    }
                    alt={plate.name} />
            </div>

            <header className={styles.popup__heading}>
                <h2>{plate.name}</h2>
            </header>

            <p className={styles.popup__subtitle}>{plate.category}</p>

            <p className={styles.popup__supportText}>
                {plate.ingredients.join(", ")}
            </p>

            <p className={styles.popup__regularText}>{plate.description}</p>

            {plate.pairing &&
                <p className={styles.popup__regularText}>
                    <PiBeerBottle className={styles.popup__iconClaret} />
                    Acompanha muito bem um <strong>{plate.pairing}</strong>
                </p>}

            <div className={`${styles.popup__action} ${styles.popup__spaced}`}>
                <p className={styles.popup__detachedText}>
                    {currency(plate.price)}
                </p>

                <button
                    className="button primary"
                    onClick={handleAddPlateToCart}>
                    <PiShoppingCartSimple />
                    Adicionar
                </button>
            </div>
        </Popup>
    )
}

export default SelectedPlate