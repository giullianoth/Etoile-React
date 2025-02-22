import SectionTitle from "../../../SectionTitle"
import { SignIn } from "../../../../assets/svg/sign-in"
import Container from "../../../Container"

const Login = ({ className }) => {
  return (
    <section className={className}>
      <Container spaced={true}>
        <SectionTitle>Acesse a sua conta</SectionTitle>

        <p>Não tem uma conta? <button className="simple-link">Faça login</button>.</p>

        <form>
          <input type="email" placeholder="E-mail *" required />
          <input type="password" placeholder="Senha *" required />
          <button className="button primary">
            <SignIn />
            Entrar
          </button>
        </form>
      </Container>
    </section>
  )
}

export default Login