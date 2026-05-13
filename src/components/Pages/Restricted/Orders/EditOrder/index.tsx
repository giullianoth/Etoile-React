import { PiTrash } from "react-icons/pi"
import Popup from "../../../../Popup"
import styles from "../../../../Popup/Popup.module.css"
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import { useDateFormats } from "../../../../../hooks/date-formats"
import type { IOrderUpdate } from "../../../../../types/order"
import InputWithLabel from "../../../../Form/InputWithLabel/InputWithLabel"
import SelectWithLabel from "../../../../Form/InputWithLabel/SelectWithLabel"

type Props = {
    onCloseEdit: () => void
}

const EditOrder = ({ onCloseEdit }: Props) => {
    const [date, setDate] = useState<string>("")
    const [time, setTime] = useState<string>("")
    const [formData, setFormData] = useState<Partial<IOrderUpdate>>({})
    const { timeFormat, defaultDateFormat } = useDateFormats()

    useEffect(() => {
        setDate(defaultDateFormat(new Date()))
        setTime(timeFormat(new Date()))
    }, [defaultDateFormat, timeFormat])

    const handleChangeFormData = (event: ChangeEvent<HTMLSelectElement>) => {
        setFormData(prevData => ({
            ...prevData,
            [event.target.name]: event.target.value
        }))
    }

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault()
        onCloseEdit()
        console.log({ ...formData, date, time })
    }

    return (
        <Popup>
            <div className={styles.popup__heading}>
                <h2>Editar pedido</h2>
            </div>

            <form className={styles.popup__form} onSubmit={handleSubmit}>
                <InputWithLabel
                    label="Data de comparecimento"
                    type="date"
                    name="date"
                    value={date}
                    onChange={event => setDate(event.target.value)} />

                <InputWithLabel
                    label="Horário de comparecimento"
                    type="time"
                    name="time"
                    value={time}
                    onChange={event => setTime(event.target.value)} />

                <SelectWithLabel
                    label="Status do pedido"
                    name="status"
                    value={formData.status || ""}
                    onChange={handleChangeFormData}>
                    <option value="Pendente">Pendente</option>
                    <option value="Cancelado">Cancelado</option>
                    <option value="Concluído">Concluído</option>
                </SelectWithLabel>

                <div className={styles.popup_list}>
                    <h3 className={styles.popup__listItem}>Itens</h3>

                    <div className={styles.popup__listItem}>
                        <div className={styles.popup__listImage}>
                            <img src="/images/plates/ravioli-de-ricota-e-espinafre-ao-sugo.png" alt="Plate" />
                        </div>

                        <div className={styles.popup__listInfo}>
                            <p className={`${styles.popup__listName} ${styles.popup__listSmall}`}>
                                <strong>While Grain Bread</strong>
                            </p>

                            <div className={styles.popup__listDetails}>
                                <input type="number" />
                            </div>
                        </div>

                        <div className={styles.popup__listAction}>
                            <span
                                className="button primary clear"
                                title="Excluir este item">
                                <PiTrash />
                            </span>
                        </div>
                    </div>
                </div>

                <div className={`${styles.popup__action} ${styles.popup__stretched} ${styles.popup__ended}`}>
                    <button
                        type="button"
                        className="button primary outline"
                        onClick={onCloseEdit}>
                        Voltar
                    </button>

                    <button
                        type="submit"
                        className="button primary">
                        Confirmar
                    </button>
                </div>
            </form>
        </Popup>
    )
}

export default EditOrder