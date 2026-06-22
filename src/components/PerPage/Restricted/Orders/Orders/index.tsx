import { PiPlusCircle } from "react-icons/pi"
import styles from "./Orders.module.css"
import { useEffect, useState, type ChangeEvent } from "react"
import type { IOrder } from "../../../../../types/order"
import Checkbox from "../../../../Form/Checkbox"
import OrderRow from "../OrderRow"
import { useAppContext } from "../../../../../context/app-context"
import Loading from "../../../../Loading"
import Trigger from "../../../../Trigger"
import Modal from "../../../../Modal"
import OrderForm from "../OrderForm"
import DeleteOrders from "../DeleteOrders"
import ConcludeOrder from "../ConcludeOrders"
import CancelOrders from "../CancelOrders"

const Orders = () => {
    const [selectedOrdersInfo, setSelectedOrdersInfo] = useState<{ order: IOrder, selected: boolean }[]>([])
    const [allOrdersSelected, setAllOrdersSelected] = useState<boolean>(false)
    const [createIsOpen, setCreateIsOpen] = useState<boolean>(false)
    const [editIsOpen, setEditIsOpen] = useState<boolean>(false)
    const [deleteIsOpen, setDeleteIsOpen] = useState<boolean>(false)
    const [cancelIsOpen, setCancelIsOpen] = useState<boolean>(false)
    const [concludeIsOpen, setConcludeIsOpen] = useState<boolean>(false)
    const [ordersToModify, setOrdersToModify] = useState<IOrder[]>([])

    const {
        fetching,
        fetchErrorMessage,
        orders,
        handleFetchOrders,
        handleSetOrderToEdit,
        currentOrder,
        handleVerifyPastOrder,
        verifyingPastOrder,
    } = useAppContext().orders

    const selectedOrders = selectedOrdersInfo.filter(info => info.selected).map(info => info.order)

    useEffect(() => {
        const fetchOrdersData = async () => {
            handleFetchOrders()
        }

        fetchOrdersData()
    }, [handleFetchOrders])

    useEffect(() => {
        const arrangeOrders = async () => {
            if (orders.length) {
                setSelectedOrdersInfo(orders.map(order => ({
                    order,
                    selected: false
                })))

                const pastOrdersPromise = orders.map(order => handleVerifyPastOrder(order))
                await Promise.all(pastOrdersPromise)
            }
        }

        arrangeOrders()
    }, [orders, handleVerifyPastOrder])

    const handleSelectOrder = (orderId: string, selected: boolean) => {
        setSelectedOrdersInfo(prevOrders => prevOrders.map(prevOrder => {
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

        setSelectedOrdersInfo(prevOrders => prevOrders.map(info => ({
            ...info,
            selected: checked
        })))
    }

    const handleOpenDelete = (ordersToDelete: IOrder[]) => {
        setOrdersToModify(ordersToDelete)
        setDeleteIsOpen(true)
    }

    const handleOpenConclude = (ordersToConclude: IOrder[]) => {
        setOrdersToModify(ordersToConclude)
        setConcludeIsOpen(true)
    }

    const handleOpenCancel = (ordersToCancel: IOrder[]) => {
        setOrdersToModify(ordersToCancel)
        setCancelIsOpen(true)
    }

    return (
        <>
            <section>
                <header className={styles.orders__title}>
                    <h2>Lista de pedidos</h2>

                    <button
                        className="button primary small"
                        onClick={() => setCreateIsOpen(true)}>
                        <PiPlusCircle />
                        Novo pedido
                    </button>
                </header>

                {fetching || verifyingPastOrder
                    ? <Loading />

                    : fetchErrorMessage
                        ? <Trigger type="error">{fetchErrorMessage}</Trigger>

                        : selectedOrdersInfo.length
                            ? <>
                                <table className={styles.orders__list}>
                                    <thead>
                                        {selectedOrders.length
                                            ? <tr>
                                                <th>
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
                                                <th className="centered">Ação</th>
                                            </tr>
                                        }
                                    </thead>

                                    <tbody>
                                        {selectedOrdersInfo.map(info => (
                                            <OrderRow
                                                key={info.order._id}
                                                order={info.order}
                                                selected={info.selected}
                                                selecting={selectedOrders.length > 0}
                                                onOpenEdit={() => setEditIsOpen(true)}
                                                onOpenDelete={() => handleOpenDelete([info.order])}
                                                onSelect={handleSelectOrder} />
                                        ))}
                                    </tbody>
                                </table>

                                {selectedOrders.length > 0 &&
                                    <p className={styles.orders__actions}>
                                        <strong>Ações em massa:</strong>

                                        <button
                                            className="button clear small"
                                            onClick={() => handleOpenCancel(selectedOrders)}>
                                            Marcar como Cancelado
                                        </button>

                                        <button
                                            className="button clear small"
                                            onClick={() => handleOpenConclude(selectedOrders)}>
                                            Marcar como Concluído
                                        </button>

                                        <button
                                            className="button clear small"
                                            onClick={() => handleOpenDelete(selectedOrders)}>
                                            Excluir
                                        </button>
                                    </p>}
                            </>

                            : <Trigger type="warning">Ainda não há pedidos cadastrados.</Trigger>}
            </section>

            <Modal
                isOpen={createIsOpen}
                onRequestClose={() => setCreateIsOpen(false)}>
                <OrderForm
                    action="create"
                    onClosePopup={() => setCreateIsOpen(false)} />
            </Modal>

            <Modal
                isOpen={editIsOpen}
                onRequestClose={() => setEditIsOpen(false)}
                onAfterClose={() => handleSetOrderToEdit(null)}>
                {currentOrder &&
                    <OrderForm
                        action="update"
                        onClosePopup={() => setEditIsOpen(false)} />}
            </Modal>

            <Modal
                isOpen={deleteIsOpen}
                onRequestClose={() => setDeleteIsOpen(false)}
                onAfterClose={() => setOrdersToModify([])}>
                {ordersToModify.length > 0 &&
                    <DeleteOrders
                        willDeleteMany={selectedOrders.length > 0}
                        ordersToDelete={ordersToModify}
                        onClosePopup={() => setDeleteIsOpen(false)} />}
            </Modal>

            <Modal
                isOpen={concludeIsOpen}
                onRequestClose={() => setConcludeIsOpen(false)}
                onAfterClose={() => setOrdersToModify([])}>
                {ordersToModify.length > 0 &&
                    <ConcludeOrder
                        ordersToConclude={ordersToModify}
                        onClosePopup={() => setConcludeIsOpen(false)} />}
            </Modal>

            <Modal
                isOpen={cancelIsOpen}
                onRequestClose={() => setCancelIsOpen(false)}
                onAfterClose={() => setOrdersToModify([])}>
                {ordersToModify.length > 0 &&
                    <CancelOrders
                        ordersToCancel={ordersToModify}
                        onClosePopup={() => setCancelIsOpen(false)} />}
            </Modal>
        </>
    )
}

export default Orders