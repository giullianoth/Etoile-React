import { Link } from "react-router-dom"
import Container from "../../../Container"
import styles from "./Orders.module.css"
import Trigger from "../../../Trigger"
import { PiEmpty } from "react-icons/pi"
import type { IOrder } from "../../../../types/order"
import Loading from "../../../Loading"
import Order from "../Order"
import Grid from "../../../Grid"
import Modal from "react-modal"
import { useState } from "react"
import { useAppContext } from "../../../../context/context"
import UpdateOrder from "../UpdateOrder"

type Props = {
    orders: IOrder[]
    loading: boolean
    errorMessage: string | null
}

const Orders = ({ orders, errorMessage, loading }: Props) => {
    const [updateIsOpen, setUpdateIsOpen] = useState<boolean>(false)
    const { handleSetOrderToEdit, currentOrder } = useAppContext().orders

    const handleOpenUpdate = (order: IOrder) => {
        handleSetOrderToEdit(order)
        setUpdateIsOpen(true)
    }

    return (
        <>
            <section className={styles.orders}>
                <Container className={styles.orders__container}>
                    <header className="section-heading">
                        <h2>Meus pedidos</h2>
                    </header>

                    {loading
                        ? <Loading />
                        : (errorMessage
                            ? <Trigger type="error">{errorMessage}</Trigger>

                            : (orders && orders.length
                                ? <Grid columns={3} gap={20}>
                                    {orders.map(order => (
                                        <Order
                                            key={order._id}
                                            order={order}
                                            onOpenUpdate={() => handleOpenUpdate(order)} />
                                    ))}
                                </Grid>

                                : <Trigger type="warning" icon={<PiEmpty />}>
                                    <span>
                                        Você ainda não tem pedidos.{" "}
                                        <Link to="/pratos">Clique aqui e veja nossas espeialidades</Link>!
                                    </span>
                                </Trigger>))}
                </Container>
            </section>

            <Modal
                isOpen={updateIsOpen}
                onRequestClose={() => setUpdateIsOpen(false)}
                onAfterClose={() => handleSetOrderToEdit(null)}
                closeTimeoutMS={300}
                className="modal"
                overlayClassName="modal-overlay">
                {currentOrder && <UpdateOrder setUpdateIsOpen={setUpdateIsOpen} />}
            </Modal>
        </>
    )
}

export default Orders