import { useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import Popup from "../../../../Popup"
import styles from "../../../../Popup/Popup.module.css"
import Checkbox from "../../../../Form/Checkbox"
import { PiCamera } from "react-icons/pi"
import type { IPlate } from "../../../../../types/plate"
import InputWithLabel from "../../../../Form/InputWithLabel/InputWithLabel"
import TextareaWithLabel from "../../../../Form/InputWithLabel/TextareaWithLabel"
import SelectWithLabel from "../../../../Form/InputWithLabel/SelectWithLabel"
import InputWithIcon from "../../../../Form/InputWithIcon"
import { useAppContext } from "../../../../../context/app-context"
import Loading from "../../../../Loading"
import Trigger from "../../../../Trigger"
import { uploadsURL } from "../../../../../services/api"

type Props = {
    action: "create" | "update"
    onClosePopup: () => void
}

const PlateForm = ({ onClosePopup, action }: Props) => {
    const [imagePreview, setImagePreview] = useState<File | null>(null)
    const [formData, setFormData] = useState<Partial<IPlate>>({})
    const [ingredients, setIngredients] = useState<string>("")
    const [available, setAvailable] = useState<boolean>(false)
    const { addMessage } = useAppContext().message

    const {
        fetching,
        fetchErrorMessage,
        handleFetchCategories,
        categories,
        mutating,
        mutateSuccess,
        mutateSuccessMessage,
        mutateErrorMessage,
        handleCreatePlate,
        handleResetPlatesMessages,
        currentPlate,
        handleUpdatePlate,
    } = useAppContext().plates

    useEffect(() => {
        const loadCategories = async () => {
            await handleFetchCategories()
        }

        loadCategories()
    }, [handleFetchCategories])

    useEffect(() => {
        const loadFormFields = () => {
            if (currentPlate) {
                setFormData({
                    name: currentPlate.name,
                    description: currentPlate.description || "",
                    categoryId: currentPlate.categoryId,
                    price: currentPlate.price,
                    pairing: currentPlate.pairing || ""
                })

                setAvailable(currentPlate.available)
                setIngredients(currentPlate.ingredients.join(", "))
            }
        }

        loadFormFields()
    }, [currentPlate])

    useEffect(() => {
        if (mutateSuccess && mutateSuccessMessage) {
            addMessage(mutateSuccessMessage)
            handleResetPlatesMessages()
            onClosePopup()
        }
    }, [addMessage, mutateSuccess, mutateSuccessMessage, handleResetPlatesMessages, onClosePopup])

    const handleChangeImage = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        setImagePreview(file || null)
    }

    const handleChangeFormData = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setFormData(prevData => ({
            ...prevData,
            [event.target.name]: event.target.value
        }))
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()

        const plateData: Partial<IPlate> = {
            ...formData,
            available,
            ingredients: ingredients.split(",").map(ingredient => ingredient.trim())
        }

        switch (action) {
            case "create":
                await handleCreatePlate(plateData, imagePreview)
                break

            case "update":
                if (currentPlate) {
                    await handleUpdatePlate(plateData, imagePreview, currentPlate._id)
                }
                break
        }
    }

    return (
        <Popup divided>
            {fetchErrorMessage && !categories
                ? <Trigger type="error">Erro ao carregar formulário. Tente de novo.</Trigger>

                : <><div className={styles.popup__half}>
                    {(imagePreview || currentPlate?.image) &&
                        <img
                            src={
                                imagePreview
                                    ? URL.createObjectURL(imagePreview)
                                    : currentPlate?.image
                                        ? `${uploadsURL}/plates/${currentPlate.image}`
                                        : ""
                            }
                            alt="Pré-visualização da imagem do prato"
                            className={styles.popup__preview} />}

                    <label
                        htmlFor="plate-image"
                        className={styles.popup__previewButton}
                        title={imagePreview || currentPlate?.image ? "Alterar imagem" : "Adicionar imagem"}>
                        <PiCamera />
                    </label>
                </div>

                    <div className={styles.popup__half}>
                        <div className={styles.popup__heading}>
                            <h2>
                                {action === "create" ? "Novo" : "Editar"} prato
                            </h2>
                        </div>

                        {fetching
                            ? <Loading />

                            : <form className={styles.popup__form} onSubmit={handleSubmit}>
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
                                    value={ingredients || ""}
                                    onChange={event => setIngredients(event.target.value)} />

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
                                    value={formData.categoryId || ""}
                                    onChange={handleChangeFormData}>
                                    <option
                                        value=""
                                        className={styles.popup__neutralOption}>Selecione a categoria</option>
                                    {categories.map(category => (
                                        <option
                                            key={category._id}
                                            value={category._id}>{category.name}</option>
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
                                        value={formData.price || ""}
                                        onChange={handleChangeFormData} /></InputWithIcon>

                                <InputWithLabel
                                    type="text"
                                    name="pairing"
                                    label="Acompanhamento"
                                    placeholder="Acompanhamento"
                                    value={formData.pairing || ""}
                                    onChange={handleChangeFormData} />

                                <div className={`${styles.popup__action} ${styles.popup__stretched}`}>
                                    <button
                                        type="button"
                                        className="button primary outline"
                                        onClick={onClosePopup}
                                        disabled={mutating}>
                                        Cancelar
                                    </button>

                                    <button
                                        type="submit"
                                        className="button primary"
                                        disabled={mutating}>
                                        {action === "create" ? "Criar" : "Atualizar"}
                                        {mutating && <Loading inButton />}
                                    </button>
                                </div>

                                {mutateErrorMessage && <Trigger type="error">{mutateErrorMessage}</Trigger>}
                            </form>}
                    </div>
                </>}
        </Popup>
    )
}

export default PlateForm