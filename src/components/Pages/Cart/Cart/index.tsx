import { PiCheck } from "react-icons/pi"
import Container from "../../../Container"
import SectionHeading from "../../../SectionHeading"
import styles from "./Cart.module.css"
// import Trigger from "../../../Trigger"
// import { Link } from "react-router-dom"
import CartItem from "../CartItem"
import { useState } from "react"
import ConfirmOrder from "../ConfirmOrder"
import Modal from "../../../Modal"

const Cart = () => {
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)

    return (
        <>
            <section className={styles.cart}>
                <Container>
                    <SectionHeading title={`Meus itens (0)`} />

                    <div className={styles.cart__list}>
                        <CartItem />
                    </div>

                    <div className={styles.cart__action}>
                        <button
                            className="button primary"
                            onClick={() => setModalIsOpen(true)}>
                            <PiCheck />
                            Confirmar pedido
                        </button>
                    </div>

                    {/* <Trigger type="warning" icon={<PiEmpty />}>
                        <span>
                            Você ainda não adicionou itens ao carrinho.{" "}
                            <Link to="/pratos">Clique aqui e veja nossas espeialidades</Link>!
                        </span>
                    </Trigger> */}
                </Container>
            </section>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}>
                <ConfirmOrder onCancelConfirmOrder={() => setModalIsOpen(false)} />
            </Modal>
        </>
    )
}

export default Cart