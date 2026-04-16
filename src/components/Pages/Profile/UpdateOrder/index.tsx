import { PiCheckBold, PiTrash, PiX } from "react-icons/pi"
import Checkbox from "../../../Form/Checkbox"
import Popup from "../../../Popup"
import styles from "../../../Popup/Popup.module.css"
import { useState, type FormEvent } from "react"
import Trigger from "../../../Trigger"

type Props = {
  onCloseUpdate: () => void
}

const UpdateOrder = ({ onCloseUpdate }: Props) => {
  const [cancelItemIsOpen, setCancelItemIsOpen] = useState<boolean>(false)
  const [cancelOrderIsOpen, setCancelOrderIsOpen] = useState<boolean>(false)
  const [time, setTime] = useState<string>("")
  const [orderReceived, setOrderReceived] = useState<boolean>(false)

  const handleCloseCancel = () => {
    setCancelItemIsOpen(false)
  }

  const handleSetItemToCancel = () => {
    setCancelItemIsOpen(true)
  }

  const handleCancelItem = async () => {
    setCancelItemIsOpen(false)
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    console.log({ time, orderReceived })
  }

  const handleCancelCurrentOrder = async () => {
    onCloseUpdate()
  }

  return (
    <Popup>
      <div className={styles.popup__heading}>
        <h2>Editar pedido</h2>
      </div>

      <div className={styles.popup_list}>
        <div
          className={styles.popup__listItem}>
          <div className={styles.popup__listImage}>
            <img src={`/images/no-image.jpg`} alt={"Nome do prato"} />
          </div>

          <div className={styles.popup__listInfo}>
            <p className={styles.popup__listName}>
              <strong>{"Nome do prato"}</strong>
            </p>

            <p className={styles.popup__listDetails}>
              <strong>Porções:</strong>{" "}
              2
            </p>
          </div>

          <div className={styles.popup__listAction}>
            {cancelItemIsOpen
              ? <div className={styles.popup__action}>
                <button
                  type="button"
                  className="button clear"
                  title="Voltar"
                  onClick={handleCloseCancel}>
                  <PiX />
                </button>

                <button
                  type="button"
                  className="button clear"
                  title="Cancelar este item"
                  onClick={handleCancelItem}>
                  <PiCheckBold />
                </button>
              </div>

              : <button
                type="button"
                className="button primary clear"
                title="Cancelar este item"
                onClick={handleSetItemToCancel}>
                <PiTrash />
              </button>}
          </div>
        </div>
      </div>

      <form className={styles.popup__form} onSubmit={handleSubmit}>
        <div className={`${styles.popup__action} ${styles.popup__stretched}`}>
          <input
            type="time"
            name="time"
            value={time}
            onChange={event => setTime(event.target.value)}
            disabled={cancelOrderIsOpen} />

          <p>
            <strong className={styles.popup__strongDetached}>Atenção:</strong>{" "}
            Não é possível selecionar horário anterior ao já selecionado.
          </p>
        </div>

        <label className={styles.popup__checkField}>
          <Checkbox
            name="orderReceived"
            checked={orderReceived}
            onChange={event => setOrderReceived(event.target.checked)}
            disabled={cancelOrderIsOpen} />

          <span>Recebi meu pedido</span>
        </label>

        <div
          className={`${styles.popup__action} ${styles.popup__spaced} ${styles.popup__stretched} ${styles.popup__reverse}`}>
          <div className={`${styles.popup__action} ${styles.popup__stretched}`}>
            <span
              className="button primary outline"
              onClick={onCloseUpdate}>
              Voltar
            </span>

            <button
              type="submit"
              className="button primary"
              disabled={cancelOrderIsOpen}>
              Atualizar
            </button>
          </div>

          <div className={styles.popup__action}>
            {cancelOrderIsOpen
              ? <>
                <span className={styles.popup__subtitle}>Tem certeza?</span>

                <span
                  className="button clear"
                  title="Voltar"
                  onClick={() => setCancelOrderIsOpen(false)}>
                  <PiX />
                </span>

                <span
                  className="button clear"
                  title="Cancelar pedido"
                  onClick={handleCancelCurrentOrder}>
                  <PiCheckBold />
                </span>
              </>

              : <span
                className="button primary clear"
                onClick={() => setCancelOrderIsOpen(true)}>
                <PiTrash />
                Cancelar pedido
              </span>}
          </div>
        </div>
      </form>

      <Trigger type="error">Erro ao carregar pedido.</Trigger>
    </Popup>
  )
}

export default UpdateOrder