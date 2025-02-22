import styles from './CartItem.module.css'
import { Minus } from "../../../../assets/svg/minus"
import { Plus } from "../../../../assets/svg/plus"
import { MinusCircle } from "../../../../assets/svg/minus-circle"

const CartItem = ({ image, name, ingredients, description, quantity }) => {
    return (
        <article className={styles.cartItem}>
            <div className={styles.cartItem__image}>
                <img src={image} alt={name} />
            </div>

            <div className={styles.cartItem__info}>
                <div className={styles.cartItem__text}>
                    <header className={styles.cartItem__name}>
                        <h2>{name}</h2>
                    </header>
                    <p className={styles.cartItem__ingredients}>{ingredients}</p>
                    <p className={styles.cartItem__description}>{description}</p>
                </div>

                <div className={styles.cartItem__actions}>
                    <div className={styles.cartItem__quantity}>
                        <button className={`button primary ${styles.cartItem__quantityButton}`}>
                            <Minus />
                        </button>

                        <p className={styles.cartItem__quantityQt}>{quantity}</p>

                        <button className={`button primary ${styles.cartItem__quantityButton}`}>
                            <Plus />
                        </button>
                    </div>

                    <button className={`button primary outline ${styles.cartItem__button}`}>
                        <MinusCircle />
                        Remover item
                    </button>
                </div>
            </div>
        </article>
    )
}

export default CartItem