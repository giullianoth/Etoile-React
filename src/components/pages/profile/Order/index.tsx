import { PiArrowClockwise, PiCheck, PiClock, PiNotePencil, PiTrash, PiWarningCircle } from "react-icons/pi"
import Bullet, { type BulletType } from "../../../Bullet"
import styles from "./Order.module.css"
import { useEffect, useState, type MouseEventHandler, type ReactNode } from "react"
import type { IOrder } from "../../../../interfaces/order"
import { orderItems } from "../../../../data/order-items"
import OrderItem from "../OrderItem"
import { useNavigate } from "react-router-dom"

type Props = {
    className?: string
    onEdit?: MouseEventHandler
    onDelete?: MouseEventHandler
    onCancel?: MouseEventHandler
    order: IOrder
}

const Order = ({ className, onEdit, onDelete, onCancel, order }: Props) => {
    const [bulletType, setBulletType] = useState<BulletType | null>(null)
    const [orderStatusIcon, setOrderStatusIcon] = useState<ReactNode | null>(null)
    const navigate = useNavigate()

    useEffect(() => {
        if (order) {
            switch (order.status) {
                case "Pendente":
                    setBulletType("warning")
                    setOrderStatusIcon(<PiClock />)
                    break

                case "Cancelado":
                    setBulletType("error")
                    setOrderStatusIcon(<PiWarningCircle />)
                    break

                case "Concluído":
                    setBulletType("success")
                    setOrderStatusIcon(<PiCheck />)
                    break
            }
        }
    }, [order])

    return (
        <article className={styles.order + (className ? ` ${className}` : "")}>
            <div className={styles.order__status}>
                <Bullet
                    type={bulletType as BulletType}
                    iconComponent={orderStatusIcon}
                    small>
                    {order.status}
                </Bullet>
            </div>

            <div className={styles.order__pickupDate}>
                <p>
                    <strong>26/08/2025</strong>
                </p>

                <p>
                    Presença confirmada às <strong>{order.time}</strong>
                </p>
            </div>

            {orderItems.filter(item => item.orderId === order.id).map(item => (
                <OrderItem
                    key={`order-item-${item.id}`}
                    orderItem={item} />
            ))}

            <div className={styles.order__actions}>
                {order.status === "Pendente"
                    ? <>
                        <Bullet
                            type="info"
                            onClick={onEdit}
                            iconComponent={<PiNotePencil />}
                            small>
                            Editar
                        </Bullet>

                        <Bullet
                            type="error"
                            onClick={onCancel}
                            iconComponent={<PiTrash />}
                            small>
                            Cancelar pedido
                        </Bullet>
                    </>

                    : <>
                        <Bullet
                            type="info"
                            onClick={() => navigate("/pratos")}
                            iconComponent={<PiArrowClockwise />}
                            small>
                            Pedir novamente
                        </Bullet>

                        <Bullet
                            type="error"
                            onClick={onDelete}
                            iconComponent={<PiTrash />}
                            small>
                            Excluir
                        </Bullet>
                    </>}


            </div>
        </article>
    )
}

export default Order