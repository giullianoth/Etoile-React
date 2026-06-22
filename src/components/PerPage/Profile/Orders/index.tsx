import { useEffect, useState } from "react"
import { useAppContext } from "../../../../context/app-context"
import Container from "../../../Container"
import SectionHeading from "../../../SectionHeading"
import styles from "./Orders.module.css"
import Loading from "../../../Loading"
import Trigger from "../../../Trigger"
import { PiEmpty } from "react-icons/pi"
import { Link } from "react-router-dom"
import Grid from "../../../Grid"
import Order from "../Order"
import type { IOrder } from "../../../../types/order"
import Modal from "../../../Modal"
import UpdateOrder from "../UpdateOrder"
import ConfirmCancelOrder from "../ConfirmCancelOrder"
import DeleteOrder from "../DeleteOrder"
import Reorder from "../Reorder"

const Orders = () => {
    const { user } = useAppContext().auth
    const [updateIsOpen, setUpdateIsOpen] = useState<boolean>(false)
    const [cancelOrderIsOpen, setCancelOrderIsOpen] = useState<boolean>(false)
    const [deleteOrderIsOpen, setDeleteOrderIsOpen] = useState<boolean>(false)
    const [reorderIsOpen, setReorderIsOpen] = useState<boolean>(false)

    const {
        fetching,
        fetchErrorMessage,
        orders,
        handleResetOrdersMessage,
        handleFetchOrdersByUser,
        handleSetOrderToEdit,
        currentOrder,
        verifyingPastOrder,
        handleVerifyPastOrder,
    } = useAppContext().orders

    useEffect(() => {
        const fetchOrders = async () => {
            if (user) {
                await handleFetchOrdersByUser(user._id)
            }
        }

        fetchOrders()
        return () => handleResetOrdersMessage()
    }, [handleFetchOrdersByUser, handleResetOrdersMessage, user])

    useEffect(() => {
        const verifyPastOrders = async () => {
            if (orders.length) {
                const pastOrdersPromise = orders.map(order => handleVerifyPastOrder(order))
                await Promise.all(pastOrdersPromise)
            }
        }

        verifyPastOrders()
    }, [handleVerifyPastOrder, orders])

    const handleOpenUpdateOrder = (order: IOrder) => {
        handleSetOrderToEdit(order)
        setUpdateIsOpen(true)
    }

    const handleOpenCancel = (order: IOrder) => {
        handleSetOrderToEdit(order)
        setCancelOrderIsOpen(true)
    }

    const handleOpenDelete = (order: IOrder) => {
        handleSetOrderToEdit(order)
        setDeleteOrderIsOpen(true)
    }

    const handleOpenReorder = (order: IOrder) => {
        handleSetOrderToEdit(order)
        setReorderIsOpen(true)
    }

    return (
        <>
            <section className={styles.orders}>
                <Container className={styles.orders__container}>
                    <SectionHeading title="Meus pedidos" />

                    {fetching || verifyingPastOrder
                        ? <Loading />

                        : fetchErrorMessage
                            ? <Trigger type="error">{fetchErrorMessage}</Trigger>

                            : orders.length
                                ? <Grid columns={3} gap={20}>
                                    {orders.map(order => (
                                        <Order
                                            key={order._id}
                                            order={order}
                                            onOpenUpdate={handleOpenUpdateOrder}
                                            onOpenCancel={handleOpenCancel}
                                            onOpenDelete={handleOpenDelete}
                                            onOpenReorder={handleOpenReorder} />
                                    ))}
                                </Grid>

                                : <Trigger type="warning" icon={<PiEmpty />}>
                                    <span>
                                        Você ainda não tem pedidos.{" "}
                                        <Link to="/pratos">Clique aqui e veja nossas espeialidades</Link>!
                                    </span>
                                </Trigger>}
                </Container>
            </section>

            <Modal
                isOpen={updateIsOpen}
                onRequestClose={() => setUpdateIsOpen(false)}
                onAfterClose={() => handleSetOrderToEdit(null)}>
                {currentOrder &&
                    <UpdateOrder onClosePopup={() => setUpdateIsOpen(false)} />}
            </Modal>

            <Modal
                isOpen={cancelOrderIsOpen}
                onRequestClose={() => setCancelOrderIsOpen(false)}
                onAfterClose={() => handleSetOrderToEdit(null)}>
                {currentOrder &&
                    <ConfirmCancelOrder onClosePopup={() => setCancelOrderIsOpen(false)} />}
            </Modal>

            <Modal
                isOpen={deleteOrderIsOpen}
                onRequestClose={() => setDeleteOrderIsOpen(false)}
                onAfterClose={() => handleSetOrderToEdit(null)}>
                {currentOrder &&
                    <DeleteOrder onClosePopup={() => setDeleteOrderIsOpen(false)} />}
            </Modal>

            <Modal
                isOpen={reorderIsOpen}
                onRequestClose={() => setReorderIsOpen(false)}
                onAfterClose={() => handleSetOrderToEdit(null)}>
                {currentOrder &&
                    <Reorder onClosePopup={() => setReorderIsOpen(false)} />}
            </Modal>
        </>
    )
}

export default Orders