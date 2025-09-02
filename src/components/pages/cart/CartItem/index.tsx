import { useEffect, useState } from "react"
import styles from "./CartItem.module.css"
import { PiMinus, PiMinusCircle, PiPlus } from "react-icons/pi"
import type { ICartItem } from "../../../../interfaces/cart-item"
import { useAppContext } from "../../../../context/context"
import Modal from "react-modal"
import RemoveCartItem from "../Confirm/RemoveCartItem"

type Props = {
    className?: string
    cartItem: ICartItem
}

const CartItem = ({ className, cartItem }: Props) => {
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
    const [quantity, setQuantity] = useState<number>(1)
    const { updateQuantity, removeFromCart } = useAppContext().cart

    useEffect(() => {
        if (cartItem) {
            setQuantity(cartItem.quantity)
        }
    }, [cartItem])

    const handleUpdateQuantity = (mode: "minus" | "plus") => {
        if (mode === "minus") {
            const newQuantity = quantity > 1 ? quantity - 1 : quantity
            updateQuantity(cartItem, newQuantity)
            setQuantity(newQuantity)
        }

        if (mode === "plus") {
            const newQuantity = quantity + 1
            updateQuantity(cartItem, newQuantity)
            setQuantity(newQuantity)
        }
    }

    const handleRemoveItem = () => {
        removeFromCart(cartItem)
        setModalIsOpen(false)
    }

    return (
        <>
            <article className={styles.cartItem + (className ? ` ${className}` : "")}>
                <div className={styles.cartItem__image}>
                    <img src={cartItem.plate?.image ? `/images/cartItem.plates/${cartItem.plate.image}` : "/images/no-image.jpg"} alt={cartItem.plate?.name} />
                </div>

                <div className={styles.cartItem__info}>
                    <div className={styles.cartItem__text}>
                        <header className={styles.cartItem__name}>
                            <h3>{cartItem.plate?.name}</h3>
                        </header>

                        <p className={styles.cartItem__ingredients}>
                            {cartItem.plate?.ingredients.join(", ")}
                        </p>

                        <p>{cartItem.plate?.description}</p>
                    </div>

                    <div className={styles.cartItem__actions}>
                        <div className={styles.cartItem__quantity}>
                            <button
                                className="button primary"
                                onClick={() => handleUpdateQuantity("minus")}>
                                <PiMinus />
                            </button>

                            <p className={styles.cartItem__quantityField}>{quantity}</p>

                            <button
                                className="button primary"
                                onClick={() => handleUpdateQuantity("plus")}>
                                <PiPlus />
                            </button>
                        </div>

                        <button
                            className={`button primary outline ${styles.cartItem__remove}`}
                            onClick={() => setModalIsOpen(true)}>
                            <PiMinusCircle />
                            Remover item
                        </button>
                    </div>
                </div>
            </article>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                closeTimeoutMS={300}
                className="modal"
                overlayClassName="modal-overlay">
                <RemoveCartItem
                    onCancel={() => setModalIsOpen(false)}
                    onConfirm={handleRemoveItem} />
            </Modal>
        </>
    )
}

export default CartItem