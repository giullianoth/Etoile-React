import { PiCheck, PiEmpty } from "react-icons/pi"
import { useAppContext } from "../../../../context/context"
import Container from "../../../Container"
import SectionHeading from "../../../SectionHeading"
import Trigger from "../../../Trigger"
import styles from "./Cart.module.css"
import { Link } from "react-router-dom"
import CartItem from "../CartItem"

const Cart = () => {
    const { cart } = useAppContext().cart

    return (
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
                            <button className="button primary">
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
    )
}

export default Cart