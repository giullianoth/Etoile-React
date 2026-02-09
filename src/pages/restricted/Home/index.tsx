import { Link } from "react-router-dom"
import styles from "./Home.module.css"
import { PiBowlSteam, PiListChecks, PiUser, PiUserList } from "react-icons/pi"
import Grid from "../../../components/Grid"

const Home = () => {
    return (
        <section className={styles.dashboard__links}>
            <Grid columns={2} gap={20}>
                <Link to="/admin/pedidos" className={styles.dashboard__link}>
                    <PiListChecks />
                    Pedidos
                </Link>

                <Link to="/admin/pedidos" className={styles.dashboard__link}>
                    <PiBowlSteam />
                    Pratos
                </Link>

                <Link to="/admin/pedidos" className={styles.dashboard__link}>
                    <PiUserList />
                    Usuários
                </Link>

                <Link to="/admin/pedidos" className={styles.dashboard__link}>
                    <PiUser />
                    Perfil
                </Link>
            </Grid>
        </section>
    )
}

export default Home