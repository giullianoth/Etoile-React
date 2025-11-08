import { Link, useNavigate } from "react-router-dom"
import Container from "../../components/Container"
import PageTitle from "../../components/PageTitle"
import styles from "./Auth.module.css"
import Password from "../../components/form/Password"
import Trigger from "../../components/Trigger"
import { useEffect, type ChangeEvent, type FormEvent } from "react"
import { useAppContext } from "../../context/context"
import type { IUserRegister } from "../../types/user"
import Loading from "../../components/Loading"

const Register = () => {
  const { registerFormFields, changeRegisterFormFields, clearForm, loading, errorMessage, register, authenticated, successMessage } = useAppContext().auth
  const navigate = useNavigate()

  useEffect(() => {
    clearForm()
  }, [])

  useEffect(() => {
    if (authenticated) {
      console.log(successMessage)
      // navigate("/perfil")
    }
  }, [register, authenticated, successMessage])

  const handleChangeData = (event: ChangeEvent<HTMLInputElement>) => {
    changeRegisterFormFields(
      event.target.name as keyof IUserRegister,
      event.target.value
    )
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    await register()
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
              required
              type="text"
              name="fullname"
              placeholder="Nome completo *"
              value={registerFormFields.fullname}
              onChange={handleChangeData} />

            <input
              required
              type="email"
              name="email"
              placeholder="E-mail *"
              value={registerFormFields.email}
              onChange={handleChangeData} />

            <Password
              required
              name="password"
              placeholder="Senha *"
              value={registerFormFields.password}
              onChange={handleChangeData} />

            <Password
              required
              name="confirmPassword"
              placeholder="Confirmar senha *"
              value={registerFormFields.confirmPassword}
              onChange={handleChangeData} />

            <button type="submit" className="button primary" disabled={loading}>
              Cadastrar
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

export default Register