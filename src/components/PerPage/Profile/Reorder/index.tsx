import { useNavigate } from "react-router-dom"
import { useAppContext } from "../../../../context/app-context"
import Popup from "../../../Popup"
import styles from "../../../Popup/Popup.module.css"
import Trigger from "../../../Trigger"

type Props = {
    onClosePopup: () => void
}

const Reorder = ({ onClosePopup }: Props) => {
    const { currentOrder } = useAppContext().orders
    const { addToCart } = useAppContext().cart
    const navigate = useNavigate()

    const handleConfirmReorder = () => {
        if (!currentOrder) {
            return
        }

        currentOrder.orderItems.forEach(orderItem => {
            addToCart(orderItem.itemDetails, orderItem.quantity)
        })

        onClosePopup()
        navigate("/carrinho")
    }

    return (
        <Popup>
            {currentOrder
                ? <>
                    <div className={styles.popup__heading}>
                        <h2>Deseja pedir de novo?</h2>
                    </div>

                    <div className={`${styles.popup__action} ${styles.popup__centered} ${styles.popup__stretched}`}>
                        <button
                            className="button primary outline"
                            onClick={onClosePopup}>Não</button>

                        <button
                            className="button primary"
                            onClick={handleConfirmReorder}>Sim</button>
                    </div>
                </>

                : <Trigger type="error">Erro ao carregar pedido. Tente de novo.</Trigger>}
        </Popup>
    )
}

export default Reorder