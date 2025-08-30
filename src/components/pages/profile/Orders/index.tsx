import { Link } from "react-router-dom"
import Container from "../../../Container"
import styles from "./Orders.module.css"
import Grid from "../../../Grid"
import Order from "../Order"
import { useState } from "react"
import Modal from "react-modal"
import EditOrder from "../Edit/Order"
import DeleteOrder from "../Edit/DeleteOrder"
import CancelItem from "../Edit/CancelItem"
import CancelOrder from "../Edit/CancelOrder"
import type { IOrder } from "../../../../interfaces/order"

type Props = {
    orders: IOrder[]
}

const Orders = ({ orders }: Props) => {
    const [editIsOpen, setEditIsOpen] = useState<boolean>(false)
    const [cancelOrderIsOpen, setCancelOrderIsOpen] = useState<boolean>(false)
    const [cancelItemIsOpen, setCancelItemIsOpen] = useState<boolean>(false)
    const [deleteOrderIsOpen, setDeleteOrderIsOpen] = useState<boolean>(false)
    const [orderToEdit, setOrderToEdit] = useState<IOrder | null>(null)

    const handleOpenEditOrder = (order: IOrder) => {
        setEditIsOpen(true)
        setOrderToEdit(order)
    }

    return (
        <>
            <section className={styles.orders}>
                <Container className={styles.orders__container}>
                    <header className="section-heading">
                        <h2>Meus pedidos</h2>
                    </header>

                    {orders && orders.length
                        ? <Grid columns={3}>
                            {orders.map(order => (
                                <Order
                                    key={`order-${order.id}`}
                                    className={styles.orders__order}
                                    onEdit={() => handleOpenEditOrder(order)}
                                    onCancel={() => setCancelOrderIsOpen(true)}
                                    onDelete={() => setDeleteOrderIsOpen(true)}
                                    order={order} />
                            ))}
                        </Grid>

                        : <p className={styles.order__empty}>
                            Você ainda não tem pedidos. <Link to="/pratos">Clique aqui e veja nossas especialidades!</Link>
                        </p>}
                </Container>
            </section>

            <Modal
                isOpen={editIsOpen}
                onRequestClose={() => setEditIsOpen(false)}
                closeTimeoutMS={300}
                className="modal"
                overlayClassName="modal-overlay">
                <EditOrder
                    onCancelOrder={() => setCancelOrderIsOpen(true)}
                    onCancelItem={() => setCancelItemIsOpen(true)}
                    onClose={() => setEditIsOpen(false)}
                    order={orderToEdit as IOrder} />
            </Modal>

            <Modal
                isOpen={deleteOrderIsOpen}
                onRequestClose={() => setDeleteOrderIsOpen(false)}
                closeTimeoutMS={300}
                className="modal"
                overlayClassName="modal-overlay">
                <DeleteOrder onCancel={() => setDeleteOrderIsOpen(false)} />
            </Modal>

            <Modal
                isOpen={cancelItemIsOpen}
                onRequestClose={() => setCancelItemIsOpen(false)}
                closeTimeoutMS={300}
                className="modal"
                overlayClassName="modal-overlay">
                <CancelItem onCancel={() => setCancelItemIsOpen(false)} />
            </Modal>

            <Modal
                isOpen={cancelOrderIsOpen}
                onRequestClose={() => setCancelOrderIsOpen(false)}
                closeTimeoutMS={300}
                className="modal"
                overlayClassName="modal-overlay">
                <CancelOrder onCancel={() => setCancelOrderIsOpen(false)} />
            </Modal>
        </>
    )
}

export default Orders