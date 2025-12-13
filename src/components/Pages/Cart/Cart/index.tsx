import { PiCheck, PiEmpty } from "react-icons/pi"
import { useAppContext } from "../../../../context/context"
import Container from "../../../Container"
import SectionHeading from "../../../SectionHeading"
import Trigger from "../../../Trigger"
import styles from "./Cart.module.css"
import { Link } from "react-router-dom"
import CartItem from "../CartItem"
import { useState } from "react"
import Modal from "react-modal"
import ConfirmOrder from "../ConfirmOrder"

const Cart = () => {
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
    const { cart } = useAppContext().cart

    return (
        <>
            <section className={styles.cart}>
                <Container>
                    <SectionHeading
                        title={`Meus itens${cart && cart.length ? ` (${cart.length})` : ""}`} />

                    {cart && cart.length
                        ? <>
                            <div className={styles.cart__list}>
                                {cart.map(cartItem => (
                                    <CartItem
                                        key={cartItem.plate._id}
                                        cartItem={cartItem} />
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

                        : <Trigger type="warning" icon={<PiEmpty />}>
                            <span>
                                Você ainda não adicionou itens ao carrinho.{" "}
                                <Link to="/pratos">Clique aqui e veja nossas espeialidades</Link>!
                            </span>
                        </Trigger>}
                </Container>
            </section>

            <Modal
                className="modal"
                overlayClassName="modal-overlay"
                closeTimeoutMS={300}
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}>
                <ConfirmOrder
                    setModalIsOpen={setModalIsOpen} />
            </Modal>
        </>
    )
}

export default Cart