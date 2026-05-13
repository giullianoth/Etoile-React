import { PiPlusCircle } from "react-icons/pi"
import styles from "./List.module.css"
import Checkbox from "../../../../Form/Checkbox"
import { useEffect, useState, type ChangeEvent, type MouseEvent } from "react"
import Delete from "../Delete"
import CategoryForm from "../CategoryForm"
import CategoryRow from "../Row/CategoryRow"
import type { ICategory } from "../../../../../types/plate"
import Modal from "../../../../Modal"

const Categories = () => {
    const [categoryFormIsOpen, setCategoryFormIsOpen] = useState<boolean>(false)
    const [deleteIsOpen, setDeleteIsOpen] = useState<boolean>(false)
    const [selectedCategories, setSelectedCategories] = useState<{ category: ICategory, selected: boolean }[]>([])
    const [allCategoriesSelected, setAllCategoriesSelected] = useState<boolean>(false)
    const [deleteCategoryTitle, setDeleteCategoryTitle] = useState<string>("")

    // const categoriesToDelete = selectedCategories
    //     .filter(info => info.selected)
    //     .map(info => info.category)

    useEffect(() => {
        if (selectedCategories.every(info => info.selected)) {
            setAllCategoriesSelected(true)
        } else {
            setAllCategoriesSelected(false)
        }
    }, [selectedCategories])

    // const categoryCheck = (categoryId: string) => {
    //     const selected = selectedCategories.find(info => info.category._id === categoryId)?.selected
    //     return selected ?? false
    // }

    // const handleSelectCategory = (categoryId: string, selected: boolean) => {
    //     setSelectedCategories(prevCategories => prevCategories.map(prevCategory => {
    //         if (prevCategory.category._id === categoryId) {
    //             return {
    //                 ...prevCategory,
    //                 selected
    //             }
    //         }
    //         return prevCategory
    //     }))
    // }

    const handleSelectAll = (event: ChangeEvent<HTMLInputElement>) => {
        const { checked } = event.target
        setAllCategoriesSelected(checked)

        setSelectedCategories(prevCategories => prevCategories.map(info => ({
            ...info,
            selected: checked
        })))
    }

    const handleOpenEdit = () => {
        setCategoryFormIsOpen(true)
    }

    const handleOpenDelete = (event: MouseEvent) => {
        event.stopPropagation()
        setDeleteCategoryTitle("Excluir categoria?")
        setDeleteIsOpen(true)
    }

    const handleSetListToDelete = () => {
        setDeleteCategoryTitle("Excluir categorias selecionadas?")
        setDeleteIsOpen(true)
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
                        <CategoryRow
                            onOpenDelete={handleOpenDelete}
                            onOpenEdit={handleOpenEdit}
                            selecting={selectedCategories.every(info => !info.selected)} />
                    </tbody>
                </table>

                {/* {selectedCategories.some(info => info.selected) && */}
                <p className={styles.plates__actions}>
                    <strong>Ações em massa:</strong>

                    <button
                        className="button clear small"
                        onClick={handleSetListToDelete}>
                        Excluir
                    </button>
                </p>
                {/* } */}

                {/* <Trigger type="warning">
                        Ainda não há categorias cadastradas.
                    </Trigger> */}
            </section>
            <Modal
                isOpen={categoryFormIsOpen}
                onRequestClose={() => setCategoryFormIsOpen(false)}>
                <CategoryForm onCloseCategoryForm={() => setCategoryFormIsOpen(false)} />
            </Modal>


            <Modal
                isOpen={deleteIsOpen}
                onRequestClose={() => setDeleteIsOpen(false)}>
                <Delete
                    onCloseDelete={() => setDeleteIsOpen(false)}
                    title={deleteCategoryTitle} />
            </Modal>
        </>
    )
}

export default Categories