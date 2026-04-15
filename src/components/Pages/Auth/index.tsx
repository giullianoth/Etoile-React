import styles from "./Auth.module.css"
import Container from "../../Container"
import SectionHeading from "../../SectionHeading"
import Password from "../../Form/Password"
import { PiSignIn } from "react-icons/pi"
import type { IUserRegister } from "../../../types/user"
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react"

type Props = {
    onChangeTitle: (titleValue: string) => void
}

const Auth = ({ onChangeTitle }: Props) => {
    const [formType, setFormType] = useState<"login" | "register">("login")
    const [formData, setFormData] = useState<Partial<IUserRegister>>({})

    useEffect(() => {
        onChangeTitle(formType === "login" ? "Login" : "Cadastro")
        setFormData({})
    }, [formType, onChangeTitle])

    const handleChangeFormType = () => {
        setFormType(formType === "login" ? "register" : "login")
    }

    const handleChangeFormData = (event: ChangeEvent<HTMLInputElement>) => {
        setFormData(prevData => ({
            ...prevData,
            [event.target.name]: event.target.value
        }))
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()
        console.log(formData)
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
                        type="button"
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
                                value={formData.email || ""}
                                onChange={handleChangeFormData} />

                            <Password
                                required
                                name="password"
                                placeholder="Senha *"
                                value={formData.password || ""}
                                onChange={handleChangeFormData} />
                        </>}

                    {formType === "register" &&
                        <>
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

                    <button type="submit" className="button primary">
                        {formType === "login" &&
                            <>
                                <PiSignIn />
                                Entrar
                            </>}

                        {formType === "register" && "Cadastrar"}
                    </button>
                </form>
            </Container>
        </section>
    )
}

export default Auth