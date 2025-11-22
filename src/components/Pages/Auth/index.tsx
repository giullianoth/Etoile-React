import { useEffect, useState, type Dispatch, type SetStateAction } from "react"
import styles from "./Auth.module.css"
import Container from "../../Container"
import SectionHeading from "../../SectionHeading"
import Password from "../../Form/Password"
import { PiSignIn } from "react-icons/pi"

type Props = {
    setTitle: Dispatch<SetStateAction<string>>
}

const Auth = ({ setTitle }: Props) => {
    const [formType, setFormType] = useState<"login" | "register">("login")

    useEffect(() => {
        if (formType === "login") {
            setTitle("Login")
        }

        if (formType === "register") {
            setTitle("Cadastro")
        }
    }, [formType])

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
                        onClick={() => setFormType(formType === "login" ? "register" : "login")}>
                        {formType === "login" && "Cadastre-se"}
                        {formType === "register" && "Faça login"}
                    </button>.
                </p>

                <form className={styles.auth__form}>
                    {formType === "login" &&
                        <>
                            <input
                                required
                                type="email"
                                name="email"
                                placeholder="E-mail *" />

                            <Password
                                required
                                name="password"
                                placeholder="Senha *" />
                        </>}

                    {formType === "register" &&
                        <>
                            <input
                                required
                                type="text"
                                name="fullname"
                                placeholder="Nome completo *" />

                            <input
                                required
                                type="email"
                                name="email"
                                placeholder="E-mail *" />

                            <Password
                                required
                                name="password"
                                placeholder="Senha *" />

                            <Password
                                required
                                name="confirmPassword"
                                placeholder="Confirmar senha *" />
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