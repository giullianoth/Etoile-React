import { PiLinkBreak } from 'react-icons/pi'
import Container from '../../Container'
import styles from "./NotFound.module.css"
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
    const navigate = useNavigate()

    return (
        <section className={styles.notFound}>
            <Container className={styles.notFound__container}>
                <PiLinkBreak className={styles.notFound__icon} />

                <header className={styles.notFound__title}>
                    <h2>A página requisitada não existe ou foi removida.</h2>
                </header>

                <p className={styles.notFound__text}>Desculpe, mas a página que você está tentando acessar não existe ou foi removida pela equipe de administração do site. Tente digitar a URL novamente na barra de endereços do navegador, ou volte para a página anterior.</p>

                <button
                    className="button primary"
                    onClick={() => navigate(-1)}>Voltar</button>
            </Container>
        </section>
    )
}

export default NotFound