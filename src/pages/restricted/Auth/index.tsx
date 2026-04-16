import { Link, useNavigate } from "react-router-dom"
import styles from "./Auth.module.css"
import logo from "/images/logo-alt.svg"
import { useState, type ChangeEvent, type FormEvent } from "react"
import Password from "../../../components/Form/Password"
import type { IUser } from "../../../types/user"
import Trigger from "../../../components/Trigger"

const Auth = () => {
    const [formData, setFormData] = useState<Partial<IUser>>({})
    const [isCommonUser, setIsCommonUser] = useState<boolean>(true)
    const navigate = useNavigate()

    const handleChangeAccount = () => {
        setIsCommonUser(false)
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
            <div className={styles.auth__logo}>
                <Link to="/">
                    <img src={logo} alt="Étoile Bistrò" />
                </Link>
            </div>

            <div className={styles.auth__container}>
                {isCommonUser
                    ? <div className={styles.auth__denied}>
                        <Trigger type="warning">
                            Atenção: Você não tem permissão para acessar esta área.
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
                            className="button primary">
                            Entrar
                        </button>
                    </form>}
            </div>
        </section>
    )
}

export default Auth