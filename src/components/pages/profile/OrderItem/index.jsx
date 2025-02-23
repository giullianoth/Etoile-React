import styles from './OrderItem.module.css'

const OrderItem = ({ image, name, portions }) => {
    return (
        <article className={styles.orderItem}>
            <div className={styles.orderItem__image}>
                <img src={image} alt={name} />
            </div>

            <div className={styles.orderItem__info}>
                <header className={styles.orderItem__name}>
                    <h2>{name}</h2>
                </header>

                <p className={styles.orderItem__portions}>
                    <strong>Porções:</strong> {portions}
                </p>
            </div>
        </article>
    )
}

export default OrderItem