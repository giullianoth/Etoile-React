import { useState } from "react"
import styles from "./CartItem.module.css"
import { PiBeerBottle, PiMinus, PiMinusCircle, PiPlus } from "react-icons/pi"
import Modal from "react-modal"
import ConfirmRemove from "../ConfirmRemove"

const CartItem = () => {
    const [quantity, setQuantity] = useState<number>(1)
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)

    const handleChangeQuantity = (mode: "minus" | "plus") => {
        const newQuantity = mode === "plus" ? quantity + 1 : quantity - 1

        if (newQuantity >= 1) {
            setQuantity(newQuantity)
        }
    }

    const handleRemoveItem = () => {
        setModalIsOpen(false)
    }

    return (
        <>
            <article className={styles.item}>
                <div className={styles.item__image}>
                    <img src={"/images/no-image.jpg"} alt={"Nome do prato"} />
                </div>

                <div className={styles.item__info}>
                    <div className={styles.item__text}>
                        <header className={styles.item__name}>
                            <h3>Nome do prato</h3>
                        </header>

                        <p className={styles.item__category}>Categoria</p>

                        <p className={styles.item__ingredients}>
                            Ingredientes
                        </p>

                        <p className={styles.item__description}>Descrição - Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum nihil officia quis rem perferendis corrupti?</p>
                        <p className={styles.item__pairing}>
                            <PiBeerBottle />{" "}
                            <span>
                                Acompanha bem um <strong>acompanhamento</strong>
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
                    onCancelRemove={() => setModalIsOpen(false)}
                    onRemoveItem={handleRemoveItem} />
            </Modal>
        </>
    )
}

export default CartItem