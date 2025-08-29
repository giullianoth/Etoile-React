import { Link } from "react-router-dom"
import Container from "../../components/Container"
import PageTitle from "../../components/PageTitle"
import styles from "./Auth.module.css"
import { useState, type FormEvent } from "react"

const Register = () => {
  const [fullname, setFullname] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [confirmPassword, setConfirmPassword] = useState<string>("")

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    console.log({ fullname, email, password, confirmPassword })
  }

  return (
    <>
      <PageTitle>Cadastro</PageTitle>

      <section className={styles.auth}>
        <Container>
          <header className="section-heading">
            <h2>Cadastre-se</h2>
          </header>

          <p className={styles.auth__redirect}>
            Já possui uma conta?&nbsp;
            <Link to="/login">Faça login</Link>.
          </p>

          <form className={styles.auth__form} onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Nome completo *"
              required
              value={fullname ?? ""}
              onChange={event => setFullname(event.target.value)} />

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

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirmar senha *"
              required
              value={confirmPassword ?? ""}
              onChange={event => setConfirmPassword(event.target.value)} />

            <button className="button primary">Cadastrar</button>
          </form>
        </Container>
      </section>
    </>
  )
}

export default Register