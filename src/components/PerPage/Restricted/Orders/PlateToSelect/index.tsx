import { PiMinus, PiPlus } from "react-icons/pi"
import { uploadsURL } from "../../../../../services/api"
import type { IPlate } from "../../../../../types/plate"
import Checkbox from "../../../../Form/Checkbox"
import styles from "../../../../Popup/Popup.module.css"
import type { ChangeEvent } from "react"

type Props = {
    plate: IPlate
    quantity: number
    selected: boolean
    loading: boolean
    onSelect: (plateId: string, selected: boolean) => void
    onChangeQuantity: (plateId: string, mode: "minus" | "plus") => void
}

const PlateToSelect = ({ plate, quantity, selected, onSelect, onChangeQuantity, loading }: Props) => {
    const handleSelect = (event: ChangeEvent<HTMLInputElement>) => {
        onSelect(plate._id, event.target.checked)
    }

    return (
        <div
            key={plate._id}
            className={styles.popup__listItem}>
            <div className={styles.popup__listAction}>
                <Checkbox
                    checked={selected}
                    onChange={handleSelect}
                    disabled={loading} />
            </div>

            <div className={styles.popup__listImage}>
                <img
                    src={
                        plate.image
                            ? `${uploadsURL}/plates/${plate.image}`
                            : "/images/no-image.jpg"
                    }
                    alt={plate.name} />
            </div>

            <div className={`${styles.popup__listInfo} ${styles.popup__listInfoCentered}`}>
                <p className={`${styles.popup__listName} ${styles.popup__listSmall}`}>
                    <strong>{plate.name}</strong>
                </p>

                <div className={`${styles.popup__listDetails} ${styles.popup__listQuantity}`}>
                    <button
                        className="button primary small"
                        onClick={() => onChangeQuantity(plate._id, "minus")}
                        disabled={!selected || loading}>
                        <PiMinus />
                    </button>

                    <div className={styles.popup__quantity}>{quantity}</div>

                    <button
                        className="button primary small"
                        onClick={() => onChangeQuantity(plate._id, "plus")}
                        disabled={!selected || loading}>
                        <PiPlus />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PlateToSelect