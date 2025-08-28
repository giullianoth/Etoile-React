// import { Link } from "react-router-dom"
import Container from "../../../Container"
import styles from "./CartList.module.css"
import CartItem from "../CartItem"
import { PiCheck } from "react-icons/pi"
import { useState } from "react"
import Modal from "react-modal"
import Confirm from "../Confirm"

const CartList = () => {
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)

    return (
        <>
            <section className={styles.cart}>
                <Container>
                    <header className="section-heading">
                        <h2>Meus itens</h2>
                    </header>

                    {/* <p className={styles.cart__empty}>
                        Você ainda não adicionou itens no carrinho.&nbsp;
                        <Link to="/pratos">Clique aqui e veja nossas espeialidades!</Link>
                    </p> */}

                    <div>
                        <div className={styles.cart__list}>
                            <CartItem className={styles.cart__item} />
                            <CartItem className={styles.cart__item} />
                            <CartItem className={styles.cart__item} />
                        </div>

                        <div className={styles.cart__action}>
                            <button
                                className="button primary"
                                onClick={() => setModalIsOpen(true)}>
                                <PiCheck />
                                Confirmar pedido
                            </button>
                        </div>
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