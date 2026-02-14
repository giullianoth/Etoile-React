import { Link, useNavigate } from "react-router-dom"
import styles from "./Auth.module.css"
import logo from "/images/logo-alt.svg"
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import Password from "../../../components/Form/Password"
import { useAppContext } from "../../../context/context"
import type { IUserRegister } from "../../../types/user"
import Loading from "../../../components/Loading"
import Trigger from "../../../components/Trigger"

const Auth = () => {
    const [isCommonUser, setIsCommonUser] = useState<boolean>(false)
    const navigate = useNavigate()

    const {
        authFormFields,
        handleChangeAuthForm,
        loading,
        errorMessage,
        handleLogin,
        success,
        user,
        handleLogout,
        handleClearAuthForm
    } = useAppContext().auth

    useEffect(() => {
        handleClearAuthForm()
    }, [handleClearAuthForm])

    useEffect(() => {
        if (success && user && user.role !== "admin") {
            setIsCommonUser(true)
        }
    }, [success, user])

    const handleChangeAccount = () => {
        handleLogout()
        setIsCommonUser(false)
    }

    const handleChangeAuthData = (event: ChangeEvent<HTMLInputElement>) => {
        handleChangeAuthForm(
            event.target.name as keyof IUserRegister,
            event.target.value
        )
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()
        await handleLogin(true)
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
                            Atenção:  perfil não tem permissão para acessar esta área.
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

                    : <form onSubmit={handleSubmit}>
                        <input
                            type="email"
                            name="email"
                            placeholder="Digite o e-mail"
                            value={authFormFields.email}
                            onChange={handleChangeAuthData} />

                        <Password
                            name="password"
                            placeholder="Digite a senha"
                            value={authFormFields.password}
                            onChange={handleChangeAuthData} />

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