import { Link } from "react-router-dom"
import Container from "../../components/Container"
import PageTitle from "../../components/PageTitle"
import styles from "./Auth.module.css"
import { useState, type FormEvent } from "react"
import { PiSignIn } from "react-icons/pi"
import type { IUser } from "../../interfaces/user"
import Password from "../../components/form/Password"
import { useAuthReducer } from "../../reducers/authReducer"
import Loading from "../../components/Loading"
import Trigger from "../../components/Trigger"

const Login = () => {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const { authState, login } = useAuthReducer()

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    const userData: Partial<IUser> = {
      email,
      password
    }

    await login(userData)
  }

  console.log(authState);

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

            <Password
              name="password"
              placeholder="Senha *"
              required
              value={password ?? ""}
              onChange={event => setPassword(event.target.value)} />

            <button type="submit" className="button primary" disabled={authState.loading}>
              <PiSignIn />
              Entrar

              {authState.loading && <Loading inButton />}
            </button>

            {authState.errorMessage &&
              <Trigger type="error">{authState.errorMessage}</Trigger>}
          </form>
        </Container>
      </section>
    </>
  )
}

export default Login