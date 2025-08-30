import { Link } from "react-router-dom"
import Container from "../../../Container"
import styles from "./CartList.module.css"
import CartItem from "../CartItem"
import { PiCheck } from "react-icons/pi"
import { useState } from "react"
import Modal from "react-modal"
import Confirm from "../Confirm/Confirm"
import { useAppContext } from "../../../../context/context"

const CartList = () => {
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
    const { cart } = useAppContext().cart

    return (
        <>
            <section className={styles.cart}>
                <Container>
                    <header className="section-heading">
                        <h2>
                            Meus itens&nbsp;
                            {cart && cart.length && `(${cart.length})`}
                        </h2>
                    </header>

                    <div>
                        {cart && cart.length
                            ? <>
                                <div className={styles.cart__list}>
                                    {cart.map((item, index) => (
                                        <CartItem
                                            key={`cart-item-${index + 1}`}
                                            className={styles.cart__item}
                                            cartItem={item} />
                                    ))}
                                </div>

                                <div className={styles.cart__action}>
                                    <button
                                        className="button primary"
                                        onClick={() => setModalIsOpen(true)}>
                                        <PiCheck />
                                        Confirmar pedido
                                    </button>
                                </div>
                            </>

                            : <p className={styles.cart__empty}>
                                Você ainda não adicionou itens no carrinho.&nbsp;
                                <Link to="/pratos">Clique aqui e veja nossas espeialidades!</Link>
                            </p>}
                    </div>
                </Container>
            </section>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                closeTimeoutMS={300}
                className="modal"
                overlayClassName="modal-overlay">
                <Confirm onCancel={() => setModalIsOpen(false)} />
            </Modal>


        </>
    )
}

export default CartList