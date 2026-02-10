import { type Dispatch, type SetStateAction } from 'react'
import Popup from '../../../../Popup'
import styles from "../../../../Popup/Popup.module.css"

type Props = {
    setModalIsOpen: Dispatch<SetStateAction<boolean>>
}

const DeleteUser = ({ setModalIsOpen }: Props) => {
    return (
        <Popup>
            <div className={styles.popup__heading}>
                <h2>Excluir usuário?</h2>
            </div>

            <div className={`${styles.popup__action} ${styles.popup__centered} ${styles.popup__stretched}`}>
                <button
                    className="button primary outline"
                    onClick={() => setModalIsOpen(false)}>Não</button>

                <button
                    className="button primary">
                    Sim
                </button>
            </div>
        </Popup>
    )
}

export default DeleteUser