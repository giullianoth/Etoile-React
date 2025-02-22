import Container from "../../../Container"
import SectionTitle from "../../../SectionTitle"

const Register = ({ className }) => {
  return (
    <section className={className}>
      <Container spaced={true}>
        <SectionTitle>Cadastre-se</SectionTitle>

        <p>Não tem uma conta? <button className="simple-link">Faça login</button>.</p>

        <form>
          <input type="text" placeholder="Nome completo *" required />
          <input type="email" placeholder="E-mail *" required />
          <input type="password" placeholder="Senha *" required />
          <input type="password" placeholder="ConfirmarSenha *" required />
          <button className="button primary">Entrar</button>
        </form>
      </Container>
    </section>
  )
}

export default Register