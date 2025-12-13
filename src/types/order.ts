import type { IPlate } from "./plate"
import type { IUser } from "./user"

export interface IOrder {
    _id: string
    userDetails: IUser[]
    orderItems: IOrderItem[]
    status: "Pendente" | "Cancelado" | "Concluído"
    time: string | Date
}

export interface IOrderItem {
    _id: string
    plateId: string
    quantity: number
    orderId: string
    itemDetails: IPlate
}

export interface IOrderCreate extends IOrder {
    userId: string
    items: {
        plateId: string
        quantity: number
    }[]
}