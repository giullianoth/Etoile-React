import { useEffect, useState } from "react"
import type { ICartItem } from "../../../../types/cart"
import styles from "./CartItem.module.css"
import { PiBeerBottle, PiMinus, PiMinusCircle, PiPlus } from "react-icons/pi"
import { useAppContext } from "../../../../context/context"
import Modal from "react-modal"
import ConfirmRemove from "../ConfirmRemove"

type Props = {
    cartItem: ICartItem
}

const CartItem = ({ cartItem }: Props) => {
    const [quantity, setQuantity] = useState<number>(0)
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
    const { updateQuantity, removeFromCart } = useAppContext().cart
    const { addMessage } = useAppContext().message

    useEffect(() => {
        if (cartItem) {
            setQuantity(cartItem.quantity)
        }
    }, [cartItem])

    const handleChangeQuantity = (mode: "minus" | "plus") => {
        if (mode === "minus" && quantity > 1) {
            updateQuantity(cartItem.plate, quantity - 1)
            setQuantity(quantity - 1)
        }

        if (mode === "plus") {
            updateQuantity(cartItem.plate, quantity + 1)
            setQuantity(quantity + 1)
        }
    }

    const handleRemoveItem = () => {
        removeFromCart(cartItem.plate)
        setModalIsOpen(false)
        addMessage("Prato removido do carrinho.")
    }

    return (
        <>
            <article className={styles.item}>
                <div className={styles.item__image}>
                    <img src={`/images/plates/${cartItem.plate.image}`} alt={cartItem.plate.name} />
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

                        <p className={styles.item__description}>{cartItem.plate.description}</p>
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
                className="modal"
                overlayClassName="modal-overlay"
                isOpen={modalIsOpen}
                closeTimeoutMS={300}
                onRequestClose={() => setModalIsOpen(false)}>
                <ConfirmRemove
                    setModalIsOpen={setModalIsOpen}
                    onConfirmRemove={handleRemoveItem} />
            </Modal>
        </>
    )
}

export default CartItem