import type { IPlate } from "./plate"
import type { IUser } from "./user"

export interface IOrder {
    _id: string
    userDetails: IUser
    orderItems: IOrderItem[]
    time: string
    status: string
}

export interface IOrderItem {
    _id: string
    plateId: number
    orderId: number
    quantity: number
    itemDetails: IPlate[]
}