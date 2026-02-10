import { useState, type Dispatch, type FormEvent, type SetStateAction } from "react"
import styles from "../../../../Popup/Popup.module.css"
import Popup from "../../../../Popup"
import { PiCamera } from "react-icons/pi"
import AnimateHeight from "react-animate-height"
import Checkbox from "../../../../Form/Checkbox"
import Password from "../../../../Form/Password"

type Props = {
    setModalIsOpen: Dispatch<SetStateAction<boolean>>
    title: string
}

const UserForm = ({ title, setModalIsOpen }: Props) => {
    const [collapsed] = useState<boolean>(true)

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault()
    }

    return (
        <Popup>
            <div className={styles.popup__heading}>
                <h2>{title}</h2>
            </div>

            <form className={styles.popup__form} onSubmit={handleSubmit}>
                <div className={styles.popup__file}>
                    <img src="/images/users/avatar.jpg" alt="Foto" />

                    <label title="Adicionar foto">
                        <PiCamera />
                        <input type="file" />
                    </label>
                </div>

                <input type="text" placeholder="Nome completo *" />
                <input type="email" placeholder="E-mail *" />

                <select>
                    <option value="Administrador">Administrador</option>
                    <option value="Cliente">Cliente</option>
                </select>

                <input type="text" placeholder="Telefone *" />

                <label className={styles.popup__checkField}>
                    <Checkbox />

                    <span>Redefinir a senha</span>
                </label>

                <AnimateHeight
                    duration={300}
                    height={collapsed ? "auto" : 0}
                    contentClassName={styles.popup__form}>
                    <Password placeholder="Senha *" />
                    <Password placeholder="Confirmar senha *" />
                </AnimateHeight>

                <div className={`${styles.popup__action} ${styles.popup__stretched} ${styles.popup__ended}`}>
                    <span
                        className="button primary outline"
                        onClick={() => setModalIsOpen(false)}>
                        Voltar
                    </span>

                    <button
                        type="submit"
                        className="button primary">
                        Criar
                    </button>
                </div>
            </form>
        </Popup>
    )
}

export default UserForm