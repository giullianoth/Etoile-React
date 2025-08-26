import { Link } from "react-router-dom"
import Container from "../../../Container"
import styles from "./CartList.module.css"
import CartItem from "../CartItem"
import { PiCheck } from "react-icons/pi"

const CartList = () => {
    return (
        <>
            <section className={styles.cart}>
                <Container>
                    <header className="section-heading">
                        <h2>Meus itens</h2>
                    </header>

                    {/* <p className={styles.cart__empty}>
                        Você ainda não adicionou items no carrinho.&nbsp;
                        <Link to="/pratos">Clique aqui e veja nossas espeialidades!</Link>
                    </p> */}

                    <div>
                        <div className={styles.cart__list}>
                            <CartItem className={styles.cart__item} />
                            <CartItem className={styles.cart__item} />
                            <CartItem className={styles.cart__item} />
                        </div>

                        <div className={styles.cart__action}>
                            <button className="button primary">
                                <PiCheck />
                                Confirmar pedido
                            </button>
                        </div>
                    </div>
                </Container>
            </section>
        </>
    )
}

export default CartList