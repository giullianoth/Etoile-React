import { plates } from "../../../../data/plates"
import type { IOrderItem } from "../../../../interfaces/order"
import styles from "./OrderItem.module.css"

type Props = {
    orderItem: IOrderItem
}

const OrderItem = ({ orderItem }: Props) => {
    const plate = plates.find(plate => orderItem.plateId === plate.id)

    return (
        <article className={styles.orderItem}>
            <div className={styles.orderItem__image}>
                <img src={plate?.image ? `/images/plates/${plate.image}` : "/images/no-image.jpg"} alt={plate?.name} />
            </div>

            <div className={styles.orderItem__info}>
                <header className={styles.orderItem__name}>
                    <h3>{plate?.name}</h3>
                </header>

                <p className={styles.orderItem__portions}>
                    <strong>Porções:</strong> {orderItem.quantity}
                </p>
            </div>
        </article>
    )
}

export default OrderItem