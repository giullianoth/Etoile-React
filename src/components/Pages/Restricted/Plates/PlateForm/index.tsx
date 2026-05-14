import { useState, type ChangeEvent, type FormEvent } from "react"
import Popup from "../../../../Popup"
import styles from "../../../../Popup/Popup.module.css"
import Checkbox from "../../../../Form/Checkbox"
import { PiCamera } from "react-icons/pi"
import type { IPlate } from "../../../../../types/plate"
import InputWithLabel from "../../../../Form/InputWithLabel/InputWithLabel"
import TextareaWithLabel from "../../../../Form/InputWithLabel/TextareaWithLabel"
import SelectWithLabel from "../../../../Form/InputWithLabel/SelectWithLabel"
import InputWithIcon from "../../../../Form/InputWithIcon"

type Props = {
    onClosePlateForm: () => void
}

const PlateForm = ({ onClosePlateForm }: Props) => {
    const [currentCategory, setCurrentCategory] = useState<string>("")
    const [previewImage, setPreviewImage] = useState<File | null>(null)
    const [formData, setFormData] = useState<Partial<IPlate>>({})
    const [available, setAvailable] = useState<boolean>(false)

    const handleChangeImage = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        setPreviewImage(file || null)
    }

    const handleChangeFormData = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prevData => ({
            ...prevData,
            [event.target.name]: event.target.value
        }))
    }

    const handleChangeCategory = (event: ChangeEvent<HTMLSelectElement>) => {
        setCurrentCategory(event.target.value)
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()
        console.log({ ...formData, previewImage, currentCategory, available })
    }

    return (
        <Popup divided>
            <div className={styles.popup__half}>
                {previewImage &&
                    <img
                        src={
                            previewImage
                                ? URL.createObjectURL(previewImage)
                                : ""
                        }
                        alt={"Prato"}
                        className={styles.popup__preview} />}

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
                        Novo prato
                    </h2>
                </div>

                <form className={styles.popup__form} onSubmit={handleSubmit}>
                    <input
                        type="file"
                        name="image"
                        id="plate-image"
                        onChange={handleChangeImage} />

                    <InputWithLabel
                        type="text"
                        name="name"
                        label="Prato"
                        required
                        placeholder="Prato"
                        value={formData.name || ""}
                        onChange={handleChangeFormData} />

                    <TextareaWithLabel
                        name="description"
                        label="Descrição"
                        placeholder="Descrição"
                        value={formData.description || ""}
                        onChange={handleChangeFormData} />

                    <InputWithLabel
                        type="text"
                        name="ingredients"
                        label="Ingredientes"
                        placeholder="Ingredientes"
                        required
                        value={formData.ingredients || ""}
                        onChange={handleChangeFormData} />

                    <label className={styles.popup__checkField}>
                        <Checkbox
                            name="available"
                            checked={available}
                            onChange={event => setAvailable(event.target.checked)} />

                        <span>Disponível</span>
                    </label>

                    <SelectWithLabel
                        name="categoryId"
                        label="Categoria"
                        required
                        value={currentCategory || ""}
                        onChange={handleChangeCategory}>
                        <option value={"1"}>
                            Categoria
                        </option>
                    </SelectWithLabel>

                    <InputWithIcon
                        icon={<span><strong>R$</strong></span>}>
                        <InputWithLabel
                            type="number"
                            name="price"
                            label="Preço"
                            placeholder="Preço"
                            required
                            value={formData.price || ""}
                            onChange={handleChangeFormData} /></InputWithIcon>

                    <InputWithLabel
                        type="text"
                        name="pairing"
                        label="Acompanhamento"
                        placeholder="Acompanhamento"
                        value={formData.pairing}
                        onChange={handleChangeFormData} />

                    <div className={`${styles.popup__action} ${styles.popup__stretched}`}>
                        <button
                            type="button"
                            className="button primary outline"
                            onClick={onClosePlateForm}>
                            Cancelar
                        </button>

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