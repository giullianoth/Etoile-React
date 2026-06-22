import { Link, useNavigate } from "react-router-dom"
import styles from "./Auth.module.css"
import logo from "/images/logo-alt.svg"
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import type { IUserCreate } from "../../../../types/user"
import Trigger from "../../../Trigger"
import Password from "../../../Form/Password"
import { useAppContext } from "../../../../context/app-context"
import Loading from "../../../Loading"

const Auth = () => {
    const [formData, setFormData] = useState<Partial<IUserCreate>>({})
    const [isCommonUser, setIsCommonUser] = useState<boolean>(false)
    const navigate = useNavigate()
    const { addMessage } = useAppContext().message

    const {
        authenticated,
        user,
        token,
        handleLogout,
        handleLogin,
        loading,
        successMessage,
        errorMessage,
    } = useAppContext().auth

    useEffect(() => {
        const verifyUserRole = () => {
            if (authenticated && user && token) {
                const isAdmin = user.role === "admin"

                if (!isAdmin) {
                    setIsCommonUser(true)
                }
            }
        }
        verifyUserRole()
    }, [authenticated, token, user])

    useEffect(() => {
        if (authenticated && successMessage) {
            addMessage(successMessage)
        }
    }, [addMessage, authenticated, successMessage])

    const handleChangeAccount = () => {
        setIsCommonUser(false)
        handleLogout()
    }

    const handleChangeFormData = (event: ChangeEvent<HTMLInputElement>) => {
        setFormData(prevData => ({
            ...prevData,
            [event.target.name]: event.target.value
        }))
    }

    const handleSubmitAndAuthenticate = async (event: FormEvent) => {
        event.preventDefault()
        await handleLogin(formData, true)
    }

    return (
        <section className={styles.auth}>
            <div className={styles.auth__logo}>
                <Link to="/">
                    <img src={logo} alt="Étoile Bistrò" />
                </Link>
            </div>

            <div className={styles.auth__container}>
                {isCommonUser
                    ? <div className={styles.auth__denied}>
                        <Trigger type="warning">
                            <span>
                                <strong>Atenção:</strong> Você não tem permissão para acessar esta área.
                            </span>
                        </Trigger>

                        <button
                            className="button primary outline"
                            onClick={() => navigate(-1)}>
                            Voltar
                        </button>

                        <button
                            className="button primary"
                            onClick={handleChangeAccount}>
                            Fazer login com uma conta diferente
                        </button>
                    </div>

                    : <form onSubmit={handleSubmitAndAuthenticate}>
                        <input
                            required
                            type="email"
                            name="email"
                            placeholder="Digite o e-mail"
                            value={formData.email || ""}
                            onChange={handleChangeFormData} />

                        <Password
                            required
                            name="password"
                            placeholder="Digite a senha"
                            value={formData.password || ""}
                            onChange={handleChangeFormData} />

                        <button
                            type="submit"
                            className="button primary"
                            disabled={loading}>
                            Entrar
                            {loading && <Loading inButton />}
                        </button>

                        {errorMessage && <Trigger type="error">{errorMessage}</Trigger>}
                    </form>}
            </div>
        </section>
    )
}

export default Auth