import { Link, useNavigate } from "react-router-dom"
import Container from "../../components/Container"
import PageTitle from "../../components/PageTitle"
import styles from "./Auth.module.css"
import { useEffect, type ChangeEvent, type FormEvent } from "react"
import { PiSignIn } from "react-icons/pi"
import type { IUser } from "../../types/user"
import Password from "../../components/form/Password"
import Loading from "../../components/Loading"
import Trigger from "../../components/Trigger"
import { useAppContext } from "../../context/context"

const Login = () => {
  const { loginFormFields, changeLoginFormFields, clearForm, loading, errorMessage, register, authenticated, successMessage, login } = useAppContext().auth
  const navigate = useNavigate()
  const { addTriggerMessage } = useAppContext().message

  useEffect(() => {
    clearForm()
  }, [])

  useEffect(() => {
    if (authenticated) {
      addTriggerMessage(successMessage)
      navigate("/perfil")
    }
  }, [register, authenticated, successMessage])

  const handleChangeData = (event: ChangeEvent<HTMLInputElement>) => {
    changeLoginFormFields(
      event.target.name as keyof IUser,
      event.target.value
    )
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    await login()
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
              type="text"
              name="email"
              placeholder="E-mail *"
              // required
              value={loginFormFields.email}
              onChange={handleChangeData} />

            <Password
              name="password"
              placeholder="Senha *"
              // required
              value={loginFormFields.password}
              onChange={handleChangeData} />

            <button type="submit" className="button primary" disabled={loading}>
              <PiSignIn />
              Entrar

              {loading && <Loading inButton />}
            </button>

            {errorMessage &&
              <Trigger type="error">{errorMessage}</Trigger>}
          </form>
        </Container>
      </section>
    </>
  )
}

export default Login