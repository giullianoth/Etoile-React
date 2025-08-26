import { Link } from "react-router-dom"
import Container from "../../components/Container"
import PageTitle from "../../components/PageTitle"
import styles from "./Auth.module.css"
import { useState, type FormEvent } from "react"
import { PiSignIn } from "react-icons/pi"

const Login = () => {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    console.log({ email, password })
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

            <button className="button primary">
              <PiSignIn />
              Entrar
            </button>
          </form>
        </Container>
      </section>
    </>
  )
}

export default Login