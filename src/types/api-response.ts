import type { IOrder, IOrderItem } from "./order"
import type { ICategory, IPlate } from "./plate"
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

// AUTH
export interface IAuthSuccessResponse extends ISuccessResponse {
    body: {
        text: string
        user: IUser
        token: string
    }
}

export type IAuthResponse = IAuthSuccessResponse | IErrorResponse

// PLATES & CATEGORIES
export interface ICategoriesFetchSuccessResponse extends ISuccessResponse {
    body: ICategory[]
}

export type ICategoriesFetchResponse = ICategoriesFetchSuccessResponse | IErrorResponse

export interface IPlatesFetchSuccessResponse extends ISuccessResponse {
    body: IPlate[]
}

export type IPlatesFetchResponse = IPlatesFetchSuccessResponse | IErrorResponse

export interface IPlateMutateSuccessResponse extends ISuccessResponse {
    body: IPlate | ICategory
}

export type IPlateMutateResponse = IPlateMutateSuccessResponse | IErrorResponse

export interface IPlateDeleteSuccessResponse extends ISuccessResponse {
    body: IPlate | ICategory
}

export type IPlateDeleteResponse = IPlateDeleteSuccessResponse | IErrorResponse

// ORDERS
export interface IOrdersFetchSuccessResponse extends ISuccessResponse {
    body: IOrder[]
}

export type IOrdersFetchResponse = IOrdersFetchSuccessResponse | IErrorResponse

export interface IOrderMutateSuccessResponse extends ISuccessResponse {
    body: IOrder | IOrderItem
}

export type IOrderMutateResponse = IOrderMutateSuccessResponse | IErrorResponse

export interface IOrderDeleteSuccessResponse extends ISuccessResponse {
    body: {
        itemsToDelete: {
            acknowledged: boolean,
            deletedCount: number
        },
        orderToDelete: IOrder
    }
}

export type IOrderDeleteResponse = IOrderDeleteSuccessResponse | IErrorResponse

// USERS
export interface IUsersFetchSuccessResponse extends ISuccessResponse {
    body: IUser[]
}

export type IUsersFetchResponse = IUsersFetchSuccessResponse | IErrorResponse

export interface IUserFindSuccessResponse extends ISuccessResponse {
    body: IUser
}

export type IUserFindResponse = IUserFindSuccessResponse | IErrorResponse

export interface IUserMutateSuccessResponse extends ISuccessResponse {
    body: IUser
}

export type IUserMutateResponse = IUserMutateSuccessResponse | IErrorResponse

export interface IUserDeleteSuccessResponse extends ISuccessResponse {
    body: IUser
}

export type IUserDeleteResponse = IUserDeleteSuccessResponse | IErrorResponse