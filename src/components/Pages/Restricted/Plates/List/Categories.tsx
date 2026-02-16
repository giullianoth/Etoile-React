import { PiPlusCircle } from "react-icons/pi"
import styles from "./List.module.css"
import Checkbox from "../../../../Form/Checkbox"
import { useEffect, useState, type ChangeEvent } from "react"
import Modal from "react-modal"
import Delete from "../Delete"
import CategoryForm from "../CategoryForm"
import CategoryRow from "../Row/CategoryRow"
import type { ICategory } from "../../../../../types/plate"
import Trigger from "../../../../Trigger"
import { useAppContext } from "../../../../../context/context"

type Props = {
    categories: ICategory[]
}

const Categories = ({ categories }: Props) => {
    const [categoryFormIsOpen, setCategoryFormIsOpen] = useState<boolean>(false)
    const [deleteIsOpen, setDeleteIsOpen] = useState<boolean>(false)
    const [selectedCategories, setSelectedCategories] = useState<{ category: ICategory, selected: boolean }[]>([])
    const [allCategoriesSelected, setAllCategoriesSelected] = useState<boolean>(false)
    const [deleteCategoryTitle, setDeleteCategoryTitle] = useState<string>("")

    const { handleSetCategoryToEdit } = useAppContext().plates

    useEffect(() => {
        if (categories.length) {
            setSelectedCategories(
                categories.map(category => ({
                    category,
                    selected: false
                }))
            )
        }
    }, [categories])

    useEffect(() => {
        if (selectedCategories.every(info => info.selected)) {
            setAllCategoriesSelected(true)
        } else {
            setAllCategoriesSelected(false)
        }
    }, [selectedCategories])

    const categoryCheck = (CategoryId: string) => {
        const selected = selectedCategories.find(info => info.category._id === CategoryId)?.selected
        return selected ?? false
    }

    const handleSelectCategory = (categoryId: string, selected: boolean) => {
        setSelectedCategories(prevCategorys => prevCategorys.map(prevCategory => {
            if (prevCategory.category._id === categoryId) {
                return {
                    ...prevCategory,
                    selected
                }
            }
            return prevCategory
        }))
    }

    const handleSelectAll = (event: ChangeEvent<HTMLInputElement>) => {
        const { checked } = event.target
        setAllCategoriesSelected(checked)

        setSelectedCategories(prevCategories => prevCategories.map(info => ({
            ...info,
            selected: checked
        })))
    }

    const handleOpenEdit = (categoryToEdit: ICategory) => {
        setCategoryFormIsOpen(true)
        handleSetCategoryToEdit(categoryToEdit)
    }

    const handleOpenDelete = (categoryToDelete: ICategory) => {
        setDeleteCategoryTitle("Excluir categoria?")
        setDeleteIsOpen(true)
        handleSetCategoryToEdit(categoryToDelete)
    }

    return (
        <>
            <section>
                <header className={styles.plates__title}>
                    <h2>Lista de categorias</h2>

                    <button
                        className="button primary small"
                        onClick={() => setCategoryFormIsOpen(true)}>
                        <PiPlusCircle />
                        Nova categoria
                    </button>
                </header>

                {categories.length
                    ? <>
                        <table>
                            {selectedCategories.some(info => info.selected)
                                ? <thead className="not-hidden">
                                    <tr>
                                        <th>
                                            <Checkbox
                                                id="select-all-categories"
                                                title="Selecionar todos"
                                                className={styles.plate__checkbox}
                                                checked={allCategoriesSelected}
                                                onChange={handleSelectAll} />
                                        </th>

                                        <th colSpan={3}>
                                            <label htmlFor="select-all-categories">
                                                Selecionar todos
                                            </label>
                                        </th>
                                    </tr>
                                </thead>

                                : <thead>
                                    <tr>
                                        <th></th>
                                        <th>Categoria</th>
                                        <th>Descrição</th>
                                        <th className="centered">Ações</th>
                                    </tr>
                                </thead>}

                            <tbody>
                                {categories.map(category => (
                                    <CategoryRow
                                        key={category._id}
                                        category={category}
                                        onOpenDelete={handleOpenDelete}
                                        onOpenEdit={handleOpenEdit}
                                        checked={categoryCheck(category._id)}
                                        onSelectCategory={handleSelectCategory}
                                        selecting={!selectedCategories.some(info => info.selected)} />
                                ))}
                            </tbody>
                        </table>

                        {selectedCategories.some(info => info.selected) &&
                            <p className={styles.plates__actions}>
                                <strong>Ações em massa:</strong>

                                <button
                                    className="button clear small"
                                    onClick={() => setDeleteIsOpen(true)}>
                                    Excluir
                                </button>
                            </p>}
                    </>

                    : <Trigger type="warning">
                        Ainda não há categorias cadastradas.
                    </Trigger>}
            </section>
            <Modal
                isOpen={categoryFormIsOpen}
                onRequestClose={() => setCategoryFormIsOpen(false)}
                onAfterClose={() => handleSetCategoryToEdit(null)}
                closeTimeoutMS={300}
                className="modal"
                overlayClassName="modal-overlay">
                <CategoryForm setCategoryFormIsOpen={setCategoryFormIsOpen} />
            </Modal>


            <Modal
                isOpen={deleteIsOpen}
                onRequestClose={() => setDeleteIsOpen(false)}
                onAfterClose={() => handleSetCategoryToEdit(null)}
                closeTimeoutMS={300}
                className="modal"
                overlayClassName="modal-overlay">
                <Delete
                    setModalIsOpen={setDeleteIsOpen}
                    title={deleteCategoryTitle} />
            </Modal>
        </>
    )
}

export default Categories