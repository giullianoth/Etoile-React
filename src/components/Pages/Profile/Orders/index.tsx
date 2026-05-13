import Container from "../../../Container"
import styles from "./Orders.module.css"
// import { Link } from "react-router-dom"
// import Trigger from "../../../Trigger"
// import { PiEmpty } from "react-icons/pi"
import Order from "../Order"
import Grid from "../../../Grid"
import { useState } from "react"
import UpdateOrder from "../UpdateOrder"
import ConfirmCancelOrder from "../ConfirmCancelOrder"
import Reorder from "../Reorder"
import DeleteOrder from "../DeleteOrder"
import Modal from "../../../Modal"

const Orders = () => {
    const [updateIsOpen, setUpdateIsOpen] = useState<boolean>(false)
    const [cancelIsOpen, setCancelIsOpen] = useState<boolean>(false)
    const [reorderIsOpen, setReorderIsOpen] = useState<boolean>(false)
    const [deleteOrderIsOpen, setDeleteOrderIsOpen] = useState<boolean>(false)

    const handleOpenUpdate = () => {
        setUpdateIsOpen(true)
    }

    const handleOpenCancel = () => {
        setCancelIsOpen(true)
    }

    const handleOpenReorder = () => {
        setReorderIsOpen(true)
    }

    const handleOpenDeleteOrder = () => {
        setDeleteOrderIsOpen(true)
    }

    return (
        <>
            <section className={styles.orders}>
                <Container className={styles.orders__container}>
                    <header className="section-heading">
                        <h2>Meus pedidos</h2>
                    </header>

                    <Grid columns={3} gap={20}>
                        <Order
                            onOpenUpdate={handleOpenUpdate}
                            onOpenCancel={handleOpenCancel}
                            onOpenReorder={handleOpenReorder}
                            onOpenDeleteOrder={handleOpenDeleteOrder} />
                    </Grid>

                    {/* <Trigger type="warning" icon={<PiEmpty />}>
                        <span>
                            Você ainda não tem pedidos.{" "}
                            <Link to="/pratos">Clique aqui e veja nossas espeialidades</Link>!
                        </span>
                    </Trigger> */}
                </Container>
            </section>

            <Modal
                isOpen={updateIsOpen}
                onRequestClose={() => setUpdateIsOpen(false)}>
                <UpdateOrder onCloseUpdate={() => setUpdateIsOpen(false)} />
            </Modal>

            <Modal
                isOpen={cancelIsOpen}
                onRequestClose={() => setCancelIsOpen(false)}>
                <ConfirmCancelOrder onCloseCancel={() => setCancelIsOpen(false)} />
            </Modal>

            <Modal
                isOpen={reorderIsOpen}
                onRequestClose={() => setReorderIsOpen(false)}>
                <Reorder onCloseReorder={() => setReorderIsOpen(false)} />
            </Modal>

            <Modal
                isOpen={deleteOrderIsOpen}
                onRequestClose={() => setDeleteOrderIsOpen(false)}>
                <DeleteOrder onCloseDelete={() => setDeleteOrderIsOpen(false)} />
            </Modal>
        </>
    )
}

export default Orders