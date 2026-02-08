import type { Dispatch, SetStateAction } from "react"
import Popup from "../../../Popup"
import styles from "../../../Popup/Popup.module.css"
import { useAppContext } from "../../../../context/context"
import { useNavigate } from "react-router-dom"

type Props = {
    setReorderIsOpen: Dispatch<SetStateAction<boolean>>
}

const Reorder = ({ setReorderIsOpen }: Props) => {
    const { currentOrder } = useAppContext().orders
    const { addToCart } = useAppContext().cart
    const navigate = useNavigate()

    const handleConfirmReorder = () => {
        if (!currentOrder) {
            return
        }

        currentOrder.orderItems.forEach(item => {
            addToCart(item.itemDetails, item.quantity)
        })

        navigate("/carrinho")
        setReorderIsOpen(false)
    }

    return (
        <Popup>
            <div className={styles.popup__heading}>
                <h2>Deseja pedir de novo?</h2>
            </div>

            <div className={`${styles.popup__action} ${styles.popup__centered} ${styles.popup__stretched}`}>
                <button
                    className="button primary outline"
                    onClick={() => setReorderIsOpen(false)}>Não</button>

                <button
                    className="button primary"
                    onClick={handleConfirmReorder}>Sim</button>
            </div>
        </Popup>
    )
}

export default Reorder