import type { IAuthState } from "./reducer-states";
import type { IUser, IUserRegister } from "./user";

interface ITriggerMessage {
    triggerIsVisible: boolean
    triggerIsFading: boolean
    triggerMessage: string | null
    addTriggerMessage: (message: string | null) => void
    showTrigger: () => void
}

interface IAuthContext extends IAuthState {
    changeLoginFormFields: (name: keyof IUser, value: string) => void
    changeRegisterFormFields: (name: keyof IUserRegister, value: string) => void
    clearForm: () => void
    register: () => Promise<void>
    login: () => Promise<void>
    logout: () => void
}

export interface IContext {
    message: ITriggerMessage
    auth: IAuthContext
}