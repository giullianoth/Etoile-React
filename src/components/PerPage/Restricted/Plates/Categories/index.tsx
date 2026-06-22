import { useEffect, useState, type ChangeEvent } from "react"
import type { ICategory } from "../../../../../types/plate"
import styles from "../List.module.css"
import { useAppContext } from "../../../../../context/app-context"
import { PiPlusCircle } from "react-icons/pi"
import Trigger from "../../../../Trigger"
import Loading from "../../../../Loading"
import Checkbox from "../../../../Form/Checkbox"
import CategoryRow from "../CategoryRow"
import Modal from "../../../../Modal"
import CategoryForm from "../CategoryForm"
import DeleteCategories from "../DeleteCategories"

const Categories = () => {
    const [selectedCategoriesInfo, setSelectedCategoriesInfo] = useState<{
        category: ICategory,
        selected: boolean
    }[]>([])

    const [allCategoriesSelected, setAllCategoriesSelected] = useState<boolean>(false)
    const [createIsOpen, setCreateIsOpen] = useState<boolean>(false)
    const [editIsOpen, setEditIsOpen] = useState<boolean>(false)
    const [deleteIsOpen, setDeleteIsOpen] = useState<boolean>(false)
    const [categoriesToModify, setCategoriesToModify] = useState<ICategory[]>([])
    const selectedCategories = selectedCategoriesInfo.filter(info => info.selected).map(info => info.category)

    const {
        fetching,
        fetchErrorMessage,
        handleFetchCategories,
        categories,
        handleSetCategoryToEdit,
        currentCategory,
    } = useAppContext().plates

    useEffect(() => {
        const fetchCategoriesData = async () => {
            await handleFetchCategories()
        }
        fetchCategoriesData()
    }, [handleFetchCategories])

    useEffect(() => {
        const arrangeCategories = () => {
            if (categories) {
                setSelectedCategoriesInfo(categories.map(category => ({
                    category,
                    selected: false
                })))
            }
        }

        arrangeCategories()
    }, [categories])

    const handleSelectCategory = (categoryId: string, selected: boolean) => {
        setSelectedCategoriesInfo(prevCategories => prevCategories.map(prevCategory => {
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

        setSelectedCategoriesInfo(prevCategories => prevCategories.map(info => ({
            ...info,
            selected: checked
        })))
    }

    const handleOpenDelete = (categoriesToDelete: ICategory[]) => {
        setCategoriesToModify(categoriesToDelete)
        setDeleteIsOpen(true)
    }

    return (
        <>
            <section className={styles.plates}>
                <header className={styles.plates__title}>
                    <h2>Lista de categorias</h2>

                    <button
                        className="button primary small"
                        onClick={() => setCreateIsOpen(true)}>
                        <PiPlusCircle />
                        Nova categoria
                    </button>
                </header>

                {fetching
                    ? <Loading />

                    : fetchErrorMessage
                        ? <Trigger type="error">{fetchErrorMessage}</Trigger>

                        : selectedCategoriesInfo.length
                            ? <>
                                <table>
                                    {selectedCategories.length
                                        ? <thead className="not-hidden">
                                            <tr>
                                                <th>
                                                    <Checkbox
                                                        id="select-all-plates"
                                                        title="Selecionar todos"
                                                        className={styles.plate__checkbox}
                                                        checked={allCategoriesSelected}
                                                        onChange={handleSelectAll} />
                                                </th>

                                                <th colSpan={3}>
                                                    <label htmlFor="select-all-plates">
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
                                                <th className="centered">Ação</th>
                                            </tr>
                                        </thead>}

                                    <tbody>
                                        {selectedCategoriesInfo.map(info => (
                                            <CategoryRow
                                                key={info.category._id}
                                                category={info.category}
                                                selected={info.selected}
                                                selecting={selectedCategories.length > 0}
                                                onSelect={handleSelectCategory}
                                                onOpenEdit={() => setEditIsOpen(true)}
                                                onOpenDelete={() => handleOpenDelete([info.category])} />
                                        ))}
                                    </tbody>
                                </table>

                                {selectedCategories.length > 0 &&
                                    <p className={styles.plates__actions}>
                                        <strong>Ações em massa:</strong>

                                        <button
                                            className="button clear small"
                                            onClick={() => handleOpenDelete(selectedCategories)}>
                                            Excluir
                                        </button>
                                    </p>}
                            </>

                            : <Trigger type="warning">Ainda não há pratos cadastrados.</Trigger>}
            </section>

            <Modal
                isOpen={createIsOpen}
                onRequestClose={() => setCreateIsOpen(false)}>
                <CategoryForm
                    action="create"
                    onClosePopup={() => setCreateIsOpen(false)} />
            </Modal>

            <Modal
                isOpen={editIsOpen}
                onRequestClose={() => setEditIsOpen(false)}
                onAfterClose={() => handleSetCategoryToEdit(null)}>
                {currentCategory &&
                    <CategoryForm
                        action="update"
                        onClosePopup={() => setEditIsOpen(false)} />}
            </Modal>

            <Modal
                isOpen={deleteIsOpen}
                onRequestClose={() => setDeleteIsOpen(false)}
                onAfterClose={() => setCategoriesToModify([])}>
                {categoriesToModify.length > 0 &&
                    <DeleteCategories
                        categoriesToDelete={categoriesToModify}
                        onClosePopup={() => setDeleteIsOpen(false)}
                        willDeleteMany={selectedCategories.length > 0} />}
            </Modal>
        </>
    )
}

export default Categories