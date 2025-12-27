import type { IPlate } from "./plate"
import type { IUser } from "./user"

export type IOrderStatus = "Pendente" | "Cancelado" | "Concluído"

export interface IOrder {
    _id: string
    userDetails: IUser[]
    orderItems: IOrderItem[]
    status: IOrderStatus
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