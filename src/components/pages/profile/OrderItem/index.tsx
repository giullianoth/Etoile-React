import type { IOrderItem } from "../../../../interfaces/order"
import styles from "./OrderItem.module.css"

type Props = {
    orderItem: IOrderItem
}

const OrderItem = ({ orderItem }: Props) => {
    return (
        <article className={styles.orderItem}>
            <div className={styles.orderItem__image}>
                <img
                    src={orderItem.itemDetails[0].image ? `/images/plates/${orderItem.itemDetails[0].image}` : "/images/no-image.jpg"}
                    alt={orderItem.itemDetails[0].name} />
            </div>

            <div className={styles.orderItem__info}>
                <header className={styles.orderItem__name}>
                    <h3>{orderItem.itemDetails[0].name}</h3>
                </header>

                <p className={styles.orderItem__portions}>
                    <strong>Porções:</strong> {orderItem.quantity}
                </p>
            </div>
        </article>
    )
}

export default OrderItem