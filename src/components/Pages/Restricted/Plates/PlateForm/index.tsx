import type { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react"
import Popup from "../../../../Popup"
import styles from "../../../../Popup/Popup.module.css"
import Checkbox from "../../../../Form/Checkbox"
import { PiCamera } from "react-icons/pi"
import { useAppContext } from "../../../../../context/context"
import type { IPlate } from "../../../../../types/plate"
import InputWithLabel from "../../../../Form/InputWithLabel/InputWithLabel"
import TextareaWithLabel from "../../../../Form/InputWithLabel/TextareaWithLabel"
import SelectWithLabel from "../../../../Form/InputWithLabel/SelectWithLabel"
import InputWithIcon from "../../../../Form/InputWithIcon"

type Props = {
    setPlateFormIsOpen: Dispatch<SetStateAction<boolean>>
}

const PlateForm = ({ setPlateFormIsOpen }: Props) => {
    const {
        currentPlate,
        plateFormFields,
        handleChangePlateFormFields
    } = useAppContext().plates

    const handleChangeData = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        handleChangePlateFormFields(
            event.target.name as keyof IPlate,
            event.target.name === "available"
                ? (event as ChangeEvent<HTMLInputElement>).target.checked
                : event.target.value
        )
    }

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault()
    }

    return (
        <Popup divided>
            <div className={styles.popup__half}>
                <img
                    src="/images/plates/ravioli-de-ricota-e-espinafre-ao-sugo.png"
                    alt="Prato"
                    className={styles.popup__preview} />

                <label
                    htmlFor="plate-image"
                    className={styles.popup__previewButton}
                    title="Adicionar foto">
                    <PiCamera />
                </label>
            </div>

            <div className={styles.popup__half}>
                <div className={styles.popup__heading}>
                    <h2>
                        {currentPlate ? "Editar prato" : "Novo prato"}
                    </h2>
                </div>

                <form className={styles.popup__form} onSubmit={handleSubmit}>
                    <input type="file" id="plate-image" />

                    <InputWithLabel
                        type="text"
                        name="name"
                        label="Prato"
                        required
                        placeholder="Prato"
                        value={plateFormFields.name}
                        onChange={handleChangeData} />

                    <TextareaWithLabel
                        name="description"
                        label="Descrição"
                        placeholder="Descrição"
                        value={plateFormFields.description}
                        onChange={handleChangeData} />

                    <InputWithLabel
                        type="text"
                        name="ingredients"
                        label="Ingredientes"
                        placeholder="Ingredientes"
                        required
                        value={plateFormFields.ingredients?.join(", ")}
                        onChange={handleChangeData} />

                    <label className={styles.popup__checkField}>
                        <Checkbox
                            name="available"
                            checked={plateFormFields.available}
                            onChange={handleChangeData} />

                        <span>Disponível</span>
                    </label>

                    <SelectWithLabel
                        label="Categoria"
                        required>
                        <option value="Entradas">Entradas</option>
                        <option value="Outra categoria">Outra categoria</option>
                    </SelectWithLabel>

                    <InputWithIcon
                        icon={<span><strong>R$</strong></span>}>
                        <InputWithLabel
                            type="number"
                            name="price"
                            label="Preço"
                            placeholder="Preço"
                            required
                            value={plateFormFields.price}
                            onChange={handleChangeData} /></InputWithIcon>

                    <InputWithLabel
                        type="text"
                        name="pairing"
                        label="Acompanhamento"
                        placeholder="Acompanhamento"
                        value={plateFormFields.pairing}
                        onChange={handleChangeData} />

                    <div className={`${styles.popup__action} ${styles.popup__stretched}`}>
                        <span
                            className="button primary outline"
                            onClick={() => setPlateFormIsOpen(false)}>
                            Cancelar
                        </span>

                        <button
                            type="submit"
                            className="button primary">
                            Criar
                        </button>
                    </div>
                </form>
            </div>
        </Popup>
    )
}

export default PlateForm