import { useEffect, useState, type ChangeEvent, type Dispatch, type FormEvent, type SetStateAction } from "react"
import Popup from "../../../../Popup"
import styles from "../../../../Popup/Popup.module.css"
import Checkbox from "../../../../Form/Checkbox"
import { PiCamera } from "react-icons/pi"
import { useAppContext } from "../../../../../context/context"
import type { ICategory, IPlate } from "../../../../../types/plate"
import InputWithLabel from "../../../../Form/InputWithLabel/InputWithLabel"
import TextareaWithLabel from "../../../../Form/InputWithLabel/TextareaWithLabel"
import SelectWithLabel from "../../../../Form/InputWithLabel/SelectWithLabel"
import InputWithIcon from "../../../../Form/InputWithIcon"
import { uploadsURL } from "../../../../../services/api"
import Loading from "../../../../Loading"
import Trigger from "../../../../Trigger"

type Props = {
    setPlateFormIsOpen: Dispatch<SetStateAction<boolean>>
}

const PlateForm = ({ setPlateFormIsOpen }: Props) => {
    const [currentCategory, setCurrentCategory] = useState<ICategory | undefined>(undefined)
    const [previewImage, setPreviewImage] = useState<File | null>(null)
    const { addMessage } = useAppContext().message

    const {
        currentPlate,
        plateFormFields,
        handleChangePlateFormFields,
        categories,
        loading,
        success,
        successMessage,
        errorMessage,
        handleUpdatePlate,
        handleClearPlateFormFields
    } = useAppContext().plates

    useEffect(() => {
        if (plateFormFields.categoryId) {
            setCurrentCategory(
                categories.find(category => category._id === plateFormFields.categoryId)
            )
        }
    }, [categories, plateFormFields])

    useEffect(() => {
        if (!currentPlate) {
            handleClearPlateFormFields()
        }
    }, [currentPlate, handleClearPlateFormFields])

    useEffect(() => {
        if (success && successMessage) {
            addMessage(successMessage)
            setPlateFormIsOpen(false)
        }
    }, [addMessage, setPlateFormIsOpen, success, successMessage])

    const handleChangeImage = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        setPreviewImage(file || null)
    }

    const handleChangeData = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        handleChangePlateFormFields(
            event.target.name as keyof IPlate,
            event.target.name === "available"
                ? (event.target as HTMLInputElement).checked
                : event.target.value
        )
    }

    const handleChangeCategory = (event: ChangeEvent<HTMLSelectElement>) => {
        const selectedId = event.target.value
        handleChangePlateFormFields("categoryId", selectedId)

        setCurrentCategory(
            categories.find(category => category._id === selectedId)
        )
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()

        if (currentPlate && currentPlate._id) {
            await handleUpdatePlate(currentPlate._id, previewImage)
        }
    }

    return (
        <Popup divided>
            <div className={styles.popup__half}>
                {currentPlate?.image &&
                    <img
                        src={
                            previewImage
                                ? URL.createObjectURL(previewImage)
                                : `${uploadsURL}/plates/${currentPlate.image}`
                        }
                        alt={currentPlate.name}
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
                        {currentPlate ? "Editar prato" : "Novo prato"}
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
                        name="categoryId"
                        label="Categoria"
                        required
                        value={currentCategory?._id}
                        onChange={handleChangeCategory}>
                        {categories.map(category => (
                            <option key={category._id}
                                value={category._id}>
                                {category.name}
                            </option>
                        ))}
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
                            className="button primary"
                            disabled={loading}>
                            {currentPlate ? "Atualizar" : "Criar"}
                            {loading && <Loading inButton />}
                        </button>
                    </div>

                    {errorMessage && <Trigger type="error">{errorMessage}</Trigger>}
                </form>
            </div>
        </Popup>
    )
}

export default PlateForm