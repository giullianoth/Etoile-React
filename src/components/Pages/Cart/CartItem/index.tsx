import { useEffect, useState } from "react"
import styles from "./CartItem.module.css"
import { PiBeerBottle, PiMinus, PiMinusCircle, PiPlus } from "react-icons/pi"
import ConfirmRemove from "../ConfirmRemove"
import Modal from "../../../Modal"
import type { ICartItem } from "../../../../types/cart"
import { uploadsURL } from "../../../../services/api"
import { useAppContext } from "../../../../context/app-context"

type Props = {
    cartItem: ICartItem
}

const CartItem = ({ cartItem }: Props) => {
    const [quantity, setQuantity] = useState<number>(1)
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
    const { updateQuantity, removeFromCart } = useAppContext().cart

    useEffect(() => {
        if (cartItem.quantity) {
            setQuantity(cartItem.quantity)
        }
    }, [cartItem.quantity])

    const handleChangeQuantity = (mode: "minus" | "plus") => {
        const newQuantity = mode === "plus" ? quantity + 1 : quantity - 1

        if (newQuantity >= 1) {
            setQuantity(newQuantity)
            updateQuantity(cartItem.plate._id, newQuantity)
        }
    }

    const handleRemoveItem = () => {
        removeFromCart(cartItem.plate)
        setModalIsOpen(false)
    }

    return (
        <>
            <article className={styles.item}>
                <div className={styles.item__image}>
                    <img
                        src={
                            cartItem.plate.image
                                ? `${uploadsURL}/plates/${cartItem.plate.image}`
                                : "/images/no-image.jpg"
                        }
                        alt={cartItem.plate.name} />
                </div>

                <div className={styles.item__info}>
                    <div className={styles.item__text}>
                        <header className={styles.item__name}>
                            <h3>{cartItem.plate.name}</h3>
                        </header>

                        <p className={styles.item__category}>{cartItem.plate.category}</p>

                        <p className={styles.item__ingredients}>
                            {cartItem.plate.ingredients.join(", ")}
                        </p>

                        <p className={styles.item__description}>
                            {cartItem.plate.description}
                        </p>

                        <p className={styles.item__pairing}>
                            <PiBeerBottle />{" "}
                            <span>
                                Acompanha bem um <strong>{cartItem.plate.pairing}</strong>
                            </span>
                        </p>
                    </div>

                    <div className={styles.item__actions}>
                        <div className={styles.item__quantity}>
                            <button
                                className="button primary"
                                onClick={() => handleChangeQuantity("minus")}>
                                <PiMinus />
                            </button>

                            <p className={styles.item__quantityValue}>{quantity}</p>

                            <button
                                className="button primary"
                                onClick={() => handleChangeQuantity("plus")}>
                                <PiPlus />
                            </button>
                        </div>

                        <button
                            className={`button primary outline ${styles.item__remove}`}
                            onClick={() => setModalIsOpen(true)}>
                            <PiMinusCircle />
                            Remover item
                        </button>
                    </div>
                </div>
            </article>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}>
                <ConfirmRemove
                    onCancelRemove={() => setModalIsOpen(false)}
                    onRemoveItem={handleRemoveItem} />
            </Modal>
        </>
    )
}

export default CartItem