import { Link } from "react-router-dom"
import Container from "../../../Container"
import styles from "./CartList.module.css"
import { PiCheck } from "react-icons/pi"
import { type Dispatch, type SetStateAction } from "react"
import type { ICartItem } from "../../../../types/cart-item"
import CartItem from "../CartItem"

type Props = {
    cart: ICartItem[]
    onOpenConfirmModal: Dispatch<SetStateAction<boolean>>
}

const CartList = ({ cart, onOpenConfirmModal }: Props) => {

    return (
        <section className={styles.cart}>
            <Container>
                <header className="section-heading">
                    <h2>
                        Meus itens&nbsp;
                        {cart && cart.length > 0 && `(${cart.length})`}
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
                                    onClick={() => onOpenConfirmModal(true)}>
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
    )
}

export default CartList