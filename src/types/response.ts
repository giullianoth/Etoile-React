import type { IOrder } from "./order"
import type { IUser } from "./user"

interface ISuccessResponse {
    success: true
    statusCode: 200 | 201
}

export interface IErrorResponse {
    success: false
    statusCode: number
    body: {
        text: string
    }
}

// Auth
export interface IAuthSuccessResponse extends ISuccessResponse {
    body: {
        text: string
        user: IUser
        token: string
    }
}

export type IAuthResponse = IAuthSuccessResponse | IErrorResponse

// Orders
export interface IOrderFetchSuccessResponse extends ISuccessResponse {
    body: IOrder[]
}

export type IOrderFetchResponse = IOrderFetchSuccessResponse | IErrorResponse