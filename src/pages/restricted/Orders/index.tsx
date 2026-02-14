import { useEffect, useState, type ChangeEvent, type MouseEvent } from "react"
import Checkbox from "../../../components/Form/Checkbox"
import styles from "./Orders.module.css"
import Modal from "react-modal"
import EditOrder from "../../../components/Pages/Restricted/Orders/EditOrder"
import { PiPlusCircle } from "react-icons/pi"
import DeleteOrder from "../../../components/Pages/Restricted/Orders/DeleteOrder"
import SetAsCancelled from "../../../components/Pages/Restricted/Orders/SetAsCancelled"
import CreateOrder from "../../../components/Pages/Restricted/Orders/CreateOrder"
import { useAppContext } from "../../../context/context"
import Loading from "../../../components/Loading"
import Trigger from "../../../components/Trigger"
import type { IOrder } from "../../../types/order"
import OrderRow from "../../../components/Pages/Restricted/Orders/OrderRow"

const Orders = () => {
    const [createIsOpen, setCreateIsOpen] = useState<boolean>(false)
    const [editIsOpen, setEditIsOpen] = useState<boolean>(false)
    const [deleteIsOpen, setDeleteIsOpen] = useState<boolean>(false)
    const [cancelIsOpen, setCancelIsOpen] = useState<boolean>(false)
    const [selectedOrders, setSelectedOrders] = useState<{ order: IOrder, selected: boolean }[]>([])
    const [allOrdersSelected, setAllOrdersSelected] = useState<boolean>(false)

    const {
        handleFetchOrders,
        fetching,
        fetchErrorMessage,
        orders,
        handleSetOrderToEdit,
        currentOrder
    } = useAppContext().orders

    useEffect(() => {
        const fetchOrders = async () => {
            await handleFetchOrders()
        }

        fetchOrders()
    }, [handleFetchOrders])

    useEffect(() => {
        if (orders.length) {
            setSelectedOrders(
                orders.map(order => ({
                    order,
                    selected: false
                }))
            )
        }
    }, [orders])

    useEffect(() => {
        if (selectedOrders.every(info => info.selected)) {
            setAllOrdersSelected(true)
        } else {
            setAllOrdersSelected(false)
        }
    }, [selectedOrders])

    const orderCheck = (orderId: string) => {
        const selected = selectedOrders.find(info => info.order._id === orderId)?.selected
        return selected ?? false
    }

    const handleSelectOrder = (orderId: string, selected: boolean) => {
        setSelectedOrders(prevOrders => prevOrders.map(prevOrder => {
            if (prevOrder.order._id === orderId) {
                return {
                    ...prevOrder,
                    selected
                }
            }
            return prevOrder
        }))
    }

    const handleSelectAll = (event: ChangeEvent<HTMLInputElement>) => {
        const { checked } = event.target
        setAllOrdersSelected(checked)

        setSelectedOrders(prevOrders => prevOrders.map(info => ({
            ...info,
            selected: checked
        })))
    }

    const handleOpenEdit = (orderToEdit: IOrder) => {
        handleSetOrderToEdit(orderToEdit)
        setEditIsOpen(true)
    }

    const handleOpenDelete = (event: MouseEvent) => {
        event.stopPropagation()
        setDeleteIsOpen(true)
    }

    return (
        <>
            <section>
                <header className={styles.orders__title}>
                    <h2>Lista de pedidos</h2>

                    {!fetching && !fetchErrorMessage &&
                        <button className="button primary small" onClick={() => setCreateIsOpen(true)}>
                            <PiPlusCircle />
                            Novo pedido
                        </button>}
                </header>

                {fetching
                    ? <Loading />

                    : fetchErrorMessage
                        ? <Trigger type="error">
                            {fetchErrorMessage}
                        </Trigger>

                        : orders.length
                            ? <>
                                <table className={styles.orders__list}>
                                    <thead>
                                        {selectedOrders.some(info => info.selected)
                                            ? <tr><th>
                                                <Checkbox
                                                    id="select-all-orders"
                                                    title="Selecionar todos"
                                                    className={styles.order__checkbox}
                                                    checked={allOrdersSelected}
                                                    onChange={handleSelectAll} />
                                            </th>

                                                <th colSpan={6}>
                                                    <label htmlFor="select-all-orders">
                                                        Selecionar todos
                                                    </label>
                                                </th>
                                            </tr>

                                            : <tr>

                                                <th></th>
                                                <th>Status</th>
                                                <th>Data de comparecimento</th>
                                                <th>Horário</th>
                                                <th>Cliente</th>
                                                <th>Itens</th>
                                                <th className="centered">Ações</th>
                                            </tr>
                                        }
                                    </thead>

                                    <tbody>
                                        {orders.map(order => (
                                            <OrderRow
                                                key={order._id}
                                                order={order}
                                                checked={orderCheck(order._id)}
                                                onOpenEdit={handleOpenEdit}
                                                onOpenDelete={handleOpenDelete}
                                                onSelectOrder={handleSelectOrder} />
                                        ))}
                                    </tbody>
                                </table>

                                {selectedOrders.some(info => info.selected) &&
                                    <p className={styles.orders__actions}>
                                        <strong>Ações em massa:</strong>

                                        <button
                                            className="button clear small"
                                            onClick={() => setCancelIsOpen(true)}>
                                            Marcar como Cancelado
                                        </button>

                                        <button
                                            className="button clear small"
                                            onClick={handleOpenDelete}>
                                            Excluir
                                        </button>
                                    </p>}
                            </>

                            : <Trigger type="warning">
                                Ainda não há pedidos cadastrados.
                            </Trigger>}
            </section>

            <Modal
                isOpen={createIsOpen}
                onRequestClose={() => setCreateIsOpen(false)}
                closeTimeoutMS={300}
                className="modal"
                overlayClassName="modal-overlay">
                <CreateOrder setModalIsOpen={setCreateIsOpen} />
            </Modal>

            <Modal
                isOpen={editIsOpen}
                onRequestClose={() => setEditIsOpen(false)}
                closeTimeoutMS={300}
                className="modal"
                overlayClassName="modal-overlay">
                {currentOrder && <EditOrder setModalIsOpen={setEditIsOpen} />}
            </Modal>

            <Modal
                isOpen={cancelIsOpen}
                onRequestClose={() => setCancelIsOpen(false)}
                closeTimeoutMS={300}
                className="modal"
                overlayClassName="modal-overlay">
                <SetAsCancelled setModalIsOpen={setCancelIsOpen} />
            </Modal>

            <Modal
                isOpen={deleteIsOpen}
                onRequestClose={() => setDeleteIsOpen(false)}
                closeTimeoutMS={300}
                className="modal"
                overlayClassName="modal-overlay">
                <DeleteOrder
                    title="Excluir pedido?"
                    setModalIsOpen={setDeleteIsOpen} />
            </Modal>
        </>
    )
}

export default Orders