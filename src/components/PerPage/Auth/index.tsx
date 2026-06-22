import { useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import styles from "./Auth.module.css"
import Container from "../../Container"
import SectionHeading from "../../SectionHeading"
import type { IUserCreate } from "../../../types/user"
import Password from "../../Form/Password"
import { PiSignIn } from "react-icons/pi"
import { useAppContext } from "../../../context/app-context"
import Loading from "../../Loading"
import Trigger from "../../Trigger"

type Props = {
    onChangeTitle: (titleValue: string) => void
    creatingPendingOrder: boolean
}

const Auth = ({ onChangeTitle, creatingPendingOrder }: Props) => {
    const [formType, setFormType] = useState<"login" | "signup">("login")
    const [formData, setFormData] = useState<Partial<IUserCreate>>({})
    const { addMessage } = useAppContext().message

    const {
        handleLogin,
        handleSignup,
        loading,
        successMessage,
        errorMessage,
        authenticated,
        handleResetAuthMessages,
    } = useAppContext().auth

    useEffect(() => {
        if (authenticated && successMessage) {
            addMessage(successMessage)
        }

        return () => handleResetAuthMessages()
    }, [addMessage, authenticated, successMessage, handleResetAuthMessages])

    const handleChangeFormType = () => {
        onChangeTitle(formType === "login" ? "Cadastro" : "Login")
        setFormData({})
        setFormType(formType === "login" ? "signup" : "login")
        handleResetAuthMessages()
    }

    const handleChangeFormData = (event: ChangeEvent<HTMLInputElement>) => {
        setFormData(prevData => ({
            ...prevData,
            [event.target.name]: event.target.value
        }))
    }

    const handleAuthenticate = async (event: FormEvent) => {
        event.preventDefault()

        switch (formType) {
            case "login":
                await handleLogin(formData)
                break

            case "signup":
                await handleSignup(formData)
                break
        }
    }

    return (
        <section className={styles.auth}>
            <Container>
                <SectionHeading title={formType === "login" ? "Acesse sua conta" : "Cadastre-se"} />

                <p className={styles.auth__redirect}>
                    {formType === "login" ? "Não tem uma conta? " : "Já possui uma conta? "}

                    <button
                        type="button"
                        className="button clear"
                        onClick={handleChangeFormType}>
                        {formType === "login" ? "Cadastre-se" : "Faça login"}
                    </button>.
                </p>

                <form className={styles.auth__form} onSubmit={handleAuthenticate}>
                    {formType === "login"
                        ? <>
                            <input
                                required
                                type="email"
                                name="email"
                                placeholder="E-mail *"
                                value={formData.email || ""}
                                onChange={handleChangeFormData} />

                            <Password
                                required
                                name="password"
                                placeholder="Senha *"
                                value={formData.password || ""}
                                onChange={handleChangeFormData} />
                        </>

                        : <>
                            <input
                                required
                                type="text"
                                name="fullname"
                                placeholder="Nome completo *"
                                value={formData.fullname || ""}
                                onChange={handleChangeFormData} />

                            <input
                                required
                                type="email"
                                name="email"
                                placeholder="E-mail *"
                                value={formData.email || ""}
                                onChange={handleChangeFormData} />

                            <Password
                                required
                                name="password"
                                placeholder="Senha *"
                                value={formData.password || ""}
                                onChange={handleChangeFormData} />

                            <Password
                                required
                                name="confirmPassword"
                                placeholder="Confirmar senha *"
                                value={formData.confirmPassword || ""}
                                onChange={handleChangeFormData} />
                        </>}

                    <button
                        type="submit"
                        className="button primary"
                        disabled={loading || creatingPendingOrder}>
                        {formType === "login"
                            ? <>
                                <PiSignIn />
                                Entrar
                            </>

                            : "Cadastrar"}

                        {(loading || creatingPendingOrder) && <Loading inButton />}
                    </button>

                    {errorMessage && <Trigger type="error">{errorMessage}</Trigger>}
                </form>
            </Container>
        </section>
    )
}

export default Auth