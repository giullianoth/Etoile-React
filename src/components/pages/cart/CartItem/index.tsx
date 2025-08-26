import { useState } from "react"
import styles from "./CartItem.module.css"
import { PiMinus, PiMinusCircle, PiPlus } from "react-icons/pi"

type Props = {
    className?: string
}

const CartItem = ({ className }: Props) => {
    const [quantity, setQuantity] = useState<number>(1)

    return (
        <article className={styles.cartItem + (className ? ` ${className}` : "")}>
            <div className={styles.cartItem__image}>
                <img src="/images/presentation-image-1.jpg" alt="Shrimp and Vegetable Salad" />
            </div>

            <div className={styles.cartItem__info}>
                <div className={styles.cartItem__text}>
                    <header className={styles.cartItem__name}>
                        <h3>Shrimp and Vegetable Salad</h3>
                    </header>

                    <p className={styles.cartItem__ingredients}>Cooked shrimp, Seasonal vegetables, Salad dressing</p>
                    <p>A fresh mixed salad with cooked shrimp, seasonal vegetables, and a secret dressing that will make your lunch or dinner shine!</p>
                </div>

                <div className={styles.cartItem__actions}>
                    <div className={styles.cartItem__quantity}>
                        <button
                            className="button primary"
                            onClick={() => setQuantity(quantity === 1 ? quantity : quantity - 1)}>
                            <PiMinus />
                        </button>

                        <p className={styles.cartItem__quantityField}>{quantity}</p>

                        <button
                            className="button primary"
                            onClick={() => setQuantity(quantity + 1)}>
                            <PiPlus />
                        </button>
                    </div>

                    <button className={`button primary outline ${styles.cartItem__remove}`}>
                        <PiMinusCircle />
                        Remover item
                    </button>
                </div>
            </div>
        </article>
    )
}

export default CartItem