import { useState, type ReactNode } from "react"
import styles from "./Dashboard.module.css"
import { Link, NavLink } from "react-router-dom"
import logo from "/images/logo-alt.svg"
import { PiBowlSteam, PiList, PiListChecks, PiUser, PiUserList, PiX } from "react-icons/pi"

type Props = {
    children: ReactNode
}

const Dashboard = ({ children }: Props) => {
    const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false)

    return (
        <div className={styles.dashboard}>
            <aside className={styles.dashboard__sidebar + (menuIsOpen ? ` ${styles.open}` : "")}>
                <div className={styles.dashboard__heading}>
                    <button
                        className={`button clear ${styles.dashboard__menuIcon}`}
                        onClick={() => setMenuIsOpen(!menuIsOpen)}>
                        {menuIsOpen ? <PiX /> : <PiList />}
                    </button>

                    <Link to="/admin">
                        <img src={logo} alt="Étoile Bistrò" />
                    </Link>
                </div>

                <nav className={styles.dashboard__navigation}>
                    <ul className={styles.dashboard__menu}>
                        <li className={styles.dashboard__menuItem}>
                            <NavLink to="/admin/pedidos" onClick={() => setMenuIsOpen(false)}>
                                <PiListChecks />
                                Pedidos
                            </NavLink>
                        </li>

                        <li className={styles.dashboard__menuItem}>
                            <NavLink to="/admin/pratos" onClick={() => setMenuIsOpen(false)}>
                                <PiBowlSteam />
                                Pratos
                            </NavLink>
                        </li>

                        <li className={styles.dashboard__menuItem}>
                            <NavLink to="/admin/usuarios" onClick={() => setMenuIsOpen(false)}>
                                <PiUserList />
                                Usuários
                            </NavLink>
                        </li>

                        <li className={styles.dashboard__menuItem}>
                            <NavLink to="/admin/perfil" onClick={() => setMenuIsOpen(false)}>
                                <PiUser />
                                Perfil
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </aside>

            <div className={styles.dashboard__container}>
                {children}
            </div>
        </div>
    )
}

export default Dashboard