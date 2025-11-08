import type { IUser } from "./user"

interface ISuccessResponse {
    success: true
    statusCode: 200
}

export interface IErrorResponse {
    success: false
    statusCode: number
    body: {
        text: string
    }
}

export interface IAuthSuccessResponse extends ISuccessResponse {
    body: {
        text: string,
        token: string,
        user: IUser
    }
}

export type IAuthResponse = IAuthSuccessResponse | IErrorResponse