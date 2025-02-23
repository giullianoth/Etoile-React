import { Link } from 'react-router-dom'
import Container from '../../../Container'
import SectionTitle from '../../../SectionTitle'
import styles from './Orders.module.css'
import Grid from "../../../Grid"
import plateImage from "../../../../assets/images/presentation-image-1.jpg"
import Order from '../Order'

const orders = [
    {
        status: "pending",
        items: [
            {
                image: plateImage,
                name: "Shrimp and Vegetable Salad",
                portions: 1
            },
            {
                image: plateImage,
                name: "Shrimp and Vegetable Salad",
                portions: 2
            },
        ]
    },
    {
        status: "cancelled",
        items: [
            {
                image: plateImage,
                name: "Shrimp and Vegetable Salad",
                portions: 1
            },
        ]
    },
    {
        status: "completed",
        items: [
            {
                image: plateImage,
                name: "Shrimp and Vegetable Salad",
                portions: 1
            },
        ]
    },
]

const Orders = () => {
    return (
        <section className={styles.orders}>
            <Container spaced={true} className={styles.orders__container}>
                <SectionTitle>Meus pedidos</SectionTitle>

                {/* <p className={styles.orders__empty}>
                    Você ainda não tem pedidos. <Link to="/pratos">Clique aqui e veja nossas espeialidades</Link>!
                </p> */}

                <Grid columns={3} gap={20}>
                    {orders.map((order, index) => (
                        <Order
                            key={`order-${index + 1}`}
                            status={order.status}
                            orderItems={order.items} />
                    ))}
                </Grid>
            </Container>
        </section>
    )
}

export default Orders