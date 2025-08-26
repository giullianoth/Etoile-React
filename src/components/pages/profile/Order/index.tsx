import { PiClock, PiNotePencil, PiTrash } from "react-icons/pi"
import Bullet from "../../../Bullet"
import styles from "./Order.module.css"

type Props = {
    className?: string
}

const Order = ({ className }: Props) => {
    return (
        <article className={styles.order + (className ? ` ${className}` : "")}>
            <div className={styles.order__status}>
                <Bullet type="warning">
                    <PiClock />
                    Pendente
                </Bullet>
            </div>

            <div className={styles.order__pickupDate}>
                <p>
                    <strong>26/08/2025</strong>
                </p>

                <p>
                    Para retirar às <strong>12:30</strong>
                </p>
            </div>

            <article className={styles.order__item}>
                <div className={styles.order__itemImage}>
                    <img src="/images/presentation-image-1.jpg" alt="Shrimp and Vegetable Salad" />
                </div>

                <div className={styles.order__itemInfo}>
                    <header className={styles.order__itemName}>
                        <h3>Shrimp and Vegetable Salad</h3>
                    </header>

                    <p className={styles.order__itemPortions}>
                        <strong>Porções:</strong> 1
                    </p>
                </div>
            </article>

            <article className={styles.order__item}>
                <div className={styles.order__itemImage}>
                    <img src="/images/presentation-image-1.jpg" alt="Shrimp and Vegetable Salad" />
                </div>

                <div className={styles.order__itemInfo}>
                    <header className={styles.order__itemName}>
                        <h3>Shrimp and Vegetable Salad</h3>
                    </header>

                    <p className={styles.order__itemPortions}>
                        <strong>Porções:</strong> 2
                    </p>
                </div>
            </article>

            <div className={styles.order__actions}>
                <Bullet type="info">
                    <PiNotePencil />
                    Editar
                </Bullet>

                <Bullet type="error">
                    <PiTrash />
                    Excluir
                </Bullet>
            </div>
        </article>
    )
}

export default Order