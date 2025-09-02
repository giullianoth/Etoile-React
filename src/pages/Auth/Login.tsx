import { Link, useNavigate } from "react-router-dom"
import Container from "../../components/Container"
import PageTitle from "../../components/PageTitle"
import styles from "./Auth.module.css"
import { useEffect, useState, type FormEvent } from "react"
import { PiSignIn } from "react-icons/pi"
import { useAppContext } from "../../context/context"
import { useTrigger } from "../../hooks/useTrigger"
import type { IUser } from "../../interfaces/user"
import Loading from "../../components/Loading"
import Trigger from "../../components/Trigger"

const Login = () => {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const { authState, login } = useAppContext().auth
  const { errorMessage, loading, success, successMessage } = authState
  const { showTrigger, triggerIsVisible } = useTrigger()
  const navigate = useNavigate()

  useEffect(() => {
    if (success) {
      showTrigger()
      navigate("/perfil")
    }
  }, [authState])

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()

    const userData: Partial<IUser> = {
      email,
      password
    }

    login(userData)
  }

  return (
    <>
      <PageTitle>Login</PageTitle>

      <section className={styles.auth}>
        <Container>
          <header className="section-heading">
            <h2>Acesse a sua conta</h2>
          </header>

          <p className={styles.auth__redirect}>
            Não tem uma conta?&nbsp;
            <Link to="/cadastrar">Cadastre-se</Link>.
          </p>

          <form className={styles.auth__form} onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="E-mail *"
              required
              value={email ?? ""}
              onChange={event => setEmail(event.target.value)} />

            <input
              type="password"
              name="password"
              placeholder="Senha *"
              required
              value={password ?? ""}
              onChange={event => setPassword(event.target.value)} />

            <button type="submit" className="button primary" disabled={loading}>
              <PiSignIn />
              Entrar

              {loading && <Loading inButton />}
            </button>

            {errorMessage && <Trigger type="error">{errorMessage}</Trigger>}
          </form>
        </Container>
      </section>

      {triggerIsVisible && <Trigger type="success" floating>{successMessage}</Trigger>}
    </>
  )
}

export default Login