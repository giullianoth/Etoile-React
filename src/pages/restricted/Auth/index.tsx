import { Link } from "react-router-dom"
import styles from "./Auth.module.css"
import logo from "/images/logo-alt.svg"
import type { FormEvent } from "react"
import Password from "../../../components/Form/Password"

const Auth = () => {
    const handleSubmit = (event: FormEvent) => {
        event.preventDefault()
    }

    return (
        <section className={styles.auth}>
            <div className={styles.auth__logo}>
                <Link to="/">
                    <img src={logo} alt="Étoile Bistrò" />
                </Link>
            </div>

            <div className={styles.auth__container}>
                <form onSubmit={handleSubmit}>
                    <input type="email" placeholder="Digite o e-mail" />
                    <Password placeholder="Digite a senha" />
                    
                    <button type="submit" className="button primary">
                        Entrar
                    </button>
                </form>
            </div>
        </section>
    )
}

export default Auth