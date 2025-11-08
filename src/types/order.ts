import type { IPlate } from "./plate"
import type { IUser } from "./user"

export interface IOrder {
    _id: string
    userDetails: Partial<IUser>
    orderItems: IOrderItem[]
    time: string
    status: string
}

export interface IOrderItem {
    _id: string
    plateId: string
    orderId: string
    quantity: number
    itemDetails: IPlate[]
}

export interface IOrderRegister extends IOrder {
    userId: string
    items: {
        plateId: string
        quantity: number
    }[]
}