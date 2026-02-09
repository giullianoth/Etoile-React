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
import ConfirmCancelOrder from "../ConfirmCancelOrder"
import Reorder from "../Reorder"
import DeleteOrder from "../DeleteOrder"

type Props = {
    orders: IOrder[]
    loading: boolean
    errorMessage: string | null
}

const Orders = ({ orders, errorMessage, loading }: Props) => {
    const [updateIsOpen, setUpdateIsOpen] = useState<boolean>(false)
    const [cancelIsOpen, setCancelIsOpen] = useState<boolean>(false)
    const [reorderIsOpen, setReorderIsOpen] = useState<boolean>(false)
    const [deleteOrderIsOpen, setDeleteOrderIsOpen] = useState<boolean>(false)
    const { handleSetOrderToEdit, currentOrder, handleClearOrderFormFields } = useAppContext().orders

    const handleOpenUpdate = (order: IOrder) => {
        handleClearOrderFormFields()
        handleSetOrderToEdit(order)
        setUpdateIsOpen(true)
    }

    const handleOpenCancel = (order: IOrder) => {
        handleClearOrderFormFields()
        handleSetOrderToEdit(order)
        setCancelIsOpen(true)
    }

    const handleOpenReorder = (order: IOrder) => {
        handleClearOrderFormFields()
        handleSetOrderToEdit(order)
        setReorderIsOpen(true)
    }

    const handleOpenDeleteOrder = (order: IOrder) => {
        handleClearOrderFormFields()
        handleSetOrderToEdit(order)
        setDeleteOrderIsOpen(true)
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
                                            onOpenUpdate={() => handleOpenUpdate(order)}
                                            onOpenCancel={() => handleOpenCancel(order)}
                                            onOpenReorder={() => handleOpenReorder(order)}
                                            onOpenDeleteOrder={() => handleOpenDeleteOrder(order)} />
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
                {currentOrder && currentOrder.status === "Pendente" &&
                    <UpdateOrder setUpdateIsOpen={setUpdateIsOpen} />}
            </Modal>

            <Modal
                isOpen={cancelIsOpen}
                onRequestClose={() => setCancelIsOpen(false)}
                onAfterClose={() => handleSetOrderToEdit(null)}
                closeTimeoutMS={300}
                className="modal"
                overlayClassName="modal-overlay">
                {currentOrder && currentOrder.status === "Pendente" &&
                    <ConfirmCancelOrder setCancelIsOpen={setCancelIsOpen} />}
            </Modal>

            <Modal
                isOpen={reorderIsOpen}
                onRequestClose={() => setReorderIsOpen(false)}
                onAfterClose={() => handleSetOrderToEdit(null)}
                closeTimeoutMS={300}
                className="modal"
                overlayClassName="modal-overlay">
                {currentOrder && currentOrder.status !== "Pendente" &&
                    <Reorder setReorderIsOpen={setReorderIsOpen} />}
            </Modal>

            <Modal
                isOpen={deleteOrderIsOpen}
                onRequestClose={() => setDeleteOrderIsOpen(false)}
                onAfterClose={() => handleSetOrderToEdit(null)}
                closeTimeoutMS={300}
                className="modal"
                overlayClassName="modal-overlay">
                {currentOrder && currentOrder.status !== "Pendente" &&
                    <DeleteOrder setDeleteOrderIsOpen={setDeleteOrderIsOpen} />}
            </Modal>
        </>
    )
}

export default Orders