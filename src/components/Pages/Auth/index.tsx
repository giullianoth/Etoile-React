import { useEffect, useState, type ChangeEvent, type Dispatch, type FormEvent, type SetStateAction } from "react"
import styles from "./Auth.module.css"
import Container from "../../Container"
import SectionHeading from "../../SectionHeading"
import Password from "../../Form/Password"
import { PiSignIn } from "react-icons/pi"
import { useAppContext } from "../../../context/context"
import type { IUserRegister } from "../../../types/user"
import Loading from "../../Loading"
import Trigger from "../../Trigger"
import { useNavigate } from "react-router-dom"
import { usePendingOrder } from "../../../hooks/pending-order"

type Props = {
    setTitle: Dispatch<SetStateAction<string>>
}

const Auth = ({ setTitle }: Props) => {
    const [formType, setFormType] = useState<"login" | "register">("login")
    const navigate = useNavigate()
    const { addMessage } = useAppContext().message
    const { pendingOrder, removePendingOrder } = usePendingOrder()
    const {
        handleCreateOrder,
        loading: loadingOrders,
        successMessage: ordersSuccessMessage
    } = useAppContext().orders

    const { clearCart } = useAppContext().cart

    const {
        handleClearAuthForm,
        handleChangeAuthForm,
        authFormFields,
        handleLogin,
        handleRegister,
        errorMessage,
        loading,
        success,
        successMessage,
        user
    } = useAppContext().auth

    useEffect(() => {
        handleClearAuthForm()
    }, [handleClearAuthForm])

    useEffect(() => {
        if (formType === "login") {
            setTitle("Login")
        }

        if (formType === "register") {
            setTitle("Cadastro")
        }
    }, [formType, setTitle])

    useEffect(() => {
        const authenticate = async () => {
            if (success) {
                if (pendingOrder) {
                    await handleCreateOrder(
                        pendingOrder.items!,
                        new Date(pendingOrder.time!),
                        user?._id
                    )

                    removePendingOrder()
                    clearCart()
                }

                if (successMessage) {
                    addMessage(ordersSuccessMessage ?? successMessage)
                }

                navigate("/perfil")
            }
        }

        authenticate()
    }, [
        success,
        handleLogin,
        handleRegister,
        addMessage,
        clearCart,
        handleCreateOrder,
        navigate,
        ordersSuccessMessage,
        pendingOrder,
        removePendingOrder,
        successMessage,
        user?._id
    ])

    const handleChangeFormType = () => {
        setFormType(formType === "login" ? "register" : "login")
        handleClearAuthForm()
    }

    const handleChangeFormData = (event: ChangeEvent<HTMLInputElement>) => {
        handleChangeAuthForm(
            event.target.name as keyof IUserRegister,
            event.target.value
        )
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()

        if (formType === "login") {
            await handleLogin()
        }

        if (formType === "register") {
            await handleRegister()
        }
    }

    return (
        <section className={styles.auth}>
            <Container>
                <SectionHeading
                    title={formType === "login" ? "Acesse a sua conta" : "Cadastre-se"} />

                <p className={styles.auth__redirect}>
                    {formType === "login" && "Não tem uma conta? "}
                    {formType === "register" && "Já possui uma conta? "}

                    <button
                        className="button clear"
                        onClick={handleChangeFormType}>
                        {formType === "login" && "Cadastre-se"}
                        {formType === "register" && "Faça login"}
                    </button>.
                </p>

                <form className={styles.auth__form} onSubmit={handleSubmit}>
                    {formType === "login" &&
                        <>
                            <input
                                required
                                type="text"
                                name="email"
                                placeholder="E-mail *"
                                value={authFormFields.email}
                                onChange={handleChangeFormData} />

                            <Password
                                required
                                name="password"
                                placeholder="Senha *"
                                value={authFormFields.password}
                                onChange={handleChangeFormData} />
                        </>}

                    {formType === "register" &&
                        <>
                            <input
                                required
                                type="text"
                                name="fullname"
                                placeholder="Nome completo *"
                                value={authFormFields.fullname}
                                onChange={handleChangeFormData} />

                            <input
                                required
                                type="email"
                                name="email"
                                placeholder="E-mail *"
                                value={authFormFields.email}
                                onChange={handleChangeFormData} />

                            <Password
                                required
                                name="password"
                                placeholder="Senha *"
                                value={authFormFields.password}
                                onChange={handleChangeFormData} />

                            <Password
                                required
                                name="confirmPassword"
                                placeholder="Confirmar senha *"
                                value={authFormFields.confirmPassword}
                                onChange={handleChangeFormData} />
                        </>}

                    <button type="submit" className="button primary" disabled={loading || loadingOrders}>
                        {formType === "login" &&
                            <>
                                <PiSignIn />
                                Entrar
                            </>}

                        {formType === "register" && "Cadastrar"}
                        {loading || loadingOrders && <Loading inButton />}
                    </button>

                    {errorMessage &&
                        <Trigger type="error">{errorMessage}</Trigger>}
                </form>
            </Container>
        </section>
    )
}

export default Auth