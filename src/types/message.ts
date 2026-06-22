export type IMessageType = "success" | "info" | "warning" | "error"

export interface IMessageContext {
    message: string | null
    messageType: IMessageType
    messageIsVisible: boolean
    fading: boolean
    addMessage: (text: string, type?: IMessageType) => void
    showMessage: (timeout?: number) => void
}