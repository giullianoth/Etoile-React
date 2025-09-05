import { Link, useNavigate } from "react-router-dom"
import Container from "../../components/Container"
import PageTitle from "../../components/PageTitle"
import styles from "./Auth.module.css"
import { useEffect, useState, type FormEvent } from "react"
import { useAppContext } from "../../context/context"
import Trigger from "../../components/Trigger"
import type { IUserRegister } from "../../interfaces/user"
import { useTrigger } from "../../hooks/useTrigger"
import Loading from "../../components/Loading"
import Password from "../../components/form/Password"

const Register = () => {
  const [fullname, setFullname] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [confirmPassword, setConfirmPassword] = useState<string>("")
  const { authState, register, resetState } = useAppContext().auth
  const { success, errorMessage, loading, successMessage } = authState
  const { showTrigger, triggerIsVisible } = useTrigger()
  const navigate = useNavigate()

  useEffect(() => {
    resetState()
  }, [])

  useEffect(() => {
    if (success) {
      showTrigger()
      navigate("/perfil")
    }
  }, [authState])

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()

    const userData: Partial<IUserRegister> = {
      fullname,
      email,
      password,
      confirmPassword
    }

    await register(userData)
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

            <Password
              name="password"
              placeholder="Senha *"
              required
              value={password ?? ""}
              onChange={event => setPassword(event.target.value)} />

            <Password
              name="confirmPassword"
              placeholder="Confirmar senha *"
              required
              value={confirmPassword ?? ""}
              onChange={event => setConfirmPassword(event.target.value)} />

            <button type="submit" className="button primary" disabled={loading}>
              Cadastrar
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

export default Register