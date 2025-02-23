import Trigger from '../../../Trigger'
import styles from './Order.module.css'
import { Clock } from "../../../../assets/svg/clock"
import { WarningCircle } from "../../../../assets/svg/warning-circle"
import { CheckCircle } from "../../../../assets/svg/check-circle"
import { Edit } from "../../../../assets/svg/edit"
import { Trash } from "../../../../assets/svg/trash"
import OrderItem from '../OrderItem'

const Order = ({ status, orderItems }) => {
    let getStatus = ""
    let triggerType = ""
    let getIcon = null

    switch (status) {
        case "pending":
            getStatus = "Pendente"
            triggerType = "warning"
            getIcon = <Clock />
            break;

        case "completed":
            getStatus = "Concluído"
            triggerType = "success"
            getIcon = <CheckCircle />
            break;

        case "cancelled":
            getStatus = "Cancelado"
            triggerType = "error"
            getIcon = <WarningCircle />
            break;
    }

    return (
        <section className={styles.order}>
            <div className={styles.order__status}>
                <Trigger icon={getIcon} type={triggerType}>{getStatus}</Trigger>
            </div>

            {orderItems.map((item, index) => (
                <OrderItem
                    key={`order-item-${index + 1}`}
                    image={item.image}
                    name={item.name}
                    portions={item.portions} />
            ))}

            <div className={styles.order__actions}>
                <Trigger type="info" clickable={true} icon={<Edit />}>Editar</Trigger>
                <Trigger type="error" clickable={true} icon={<Trash />}>Excluir</Trigger>
            </div>
        </section>
    )
}

export default Order