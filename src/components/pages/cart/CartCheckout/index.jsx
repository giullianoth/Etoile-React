import styles from './CartCheckout.module.css'

const CartCheckout = () => {
    return (
        <section className='modal'>
            <div className="modal__wrapper">
                <article className={styles.cartCheckout}>
                    <header className={styles.cartCheckout__title}>
                        <h1>Quase lá</h1>
                    </header>

                    <p className={styles.cartCheckout__text}>
                        Confirme seu pedido para a seguinte data: <strong>18/02/2025</strong>. Qual horário você virá buscar seu pedido?
                    </p>

                    <div className={styles.cartCheckout__time}>
                        <input type="time" className={styles.cartCheckout__timeInput} />

                        <div className={styles.cartCheckout__actions}>
                            <button className={`button primary outline`}>Cancelar</button>
                            <button className={`button primary`}>Confirmar</button>
                        </div>
                    </div>
                </article>
            </div>
        </section>
    )
}

export default CartCheckout