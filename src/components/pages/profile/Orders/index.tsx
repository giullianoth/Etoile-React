// import { Link } from "react-router-dom"
import Container from "../../../Container"
import styles from "./Orders.module.css"
import Grid from "../../../Grid"
import Order from "../Order"

const Orders = () => {
    return (
        <section className={styles.orders}>
            <Container className={styles.orders__container}>
                <header className="section-heading">
                    <h2>Meus pedidos</h2>
                </header>

                {/* <p className={styles.order__empty}>
                    Você ainda não tem pedidos. <Link to="/pratos">Clique aqui e veja nossas especialidades!</Link>
                </p> */}

                <Grid columns={3}>
                    <Order className={styles.orders__order} />
                    <Order className={styles.orders__order} />
                    <Order className={styles.orders__order} />
                </Grid>
            </Container>
        </section>
    )
}

export default Orders