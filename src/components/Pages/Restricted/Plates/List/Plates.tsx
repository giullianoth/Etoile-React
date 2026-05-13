import { PiPlusCircle } from "react-icons/pi"
import styles from "./List.module.css"
import { useEffect, useState, type ChangeEvent, type MouseEvent } from "react"
import Checkbox from "../../../../Form/Checkbox"
import PlateForm from "../PlateForm"
import Delete from "../Delete"
import SetAvailability from "../SetAvailability"
import type { IPlate } from "../../../../../types/plate"
// import Trigger from "../../../../Trigger"
import PlateRow from "../Row/PlateRow"
import Modal from "../../../../Modal"

const Plates = () => {
    const [plateFormIsOpen, setPlateFormIsOpen] = useState<boolean>(false)
    const [deleteIsOpen, setDeleteIsOpen] = useState<boolean>(false)
    const [changeAvailabilityIsOpen, setChangeAvailabilityIsOpen] = useState<boolean>(false)
    const [selectedPlates, setSelectedPlates] = useState<{ plate: IPlate, selected: boolean }[]>([])
    const [allPlatesSelected, setAllPlatesSelected] = useState<boolean>(false)
    const [deletePlateTitle, setDeletePlateTitle] = useState<string>("")

    // const platesToDelete = selectedPlates
    //     .filter(info => info.selected)
    //     .map(info => info.plate)

    useEffect(() => {
        if (selectedPlates.every(info => info.selected)) {
            setAllPlatesSelected(true)
        } else {
            setAllPlatesSelected(false)
        }
    }, [selectedPlates])

    // const plateCheck = (plateId: string) => {
    //     const selected = selectedPlates.find(info => info.plate._id === plateId)?.selected
    //     return selected ?? false
    // }

    // const handleSelectPlate = (plateId: string, selected: boolean) => {
    //     setSelectedPlates(prevPlates => prevPlates.map(prevPlate => {
    //         if (prevPlate.plate._id === plateId) {
    //             return { ...prevPlate, selected }
    //         }
    //         return prevPlate
    //     }))
    // }

    const handleSelectAll = (event: ChangeEvent<HTMLInputElement>) => {
        const { checked } = event.target
        setAllPlatesSelected(checked)

        setSelectedPlates(prevPlates => prevPlates.map(info => ({
            ...info,
            selected: checked
        })))
    }

    const handleOpenEdit = () => {
        setPlateFormIsOpen(true)
    }

    const handleOpenDelete = (event: MouseEvent) => {
        event.stopPropagation()
        setDeletePlateTitle("Excluir prato?")
        setDeleteIsOpen(true)
    }

    const handleSetListToDelete = () => {
        setDeletePlateTitle("Excluir pratos selecionados?")
        setDeleteIsOpen(true)
    }

    return (
        <>
            <section className={styles.plates}>
                <header className={styles.plates__title}>
                    <h2>Lista de pratos</h2>

                    <button className="button primary small" onClick={() => setPlateFormIsOpen(true)}>
                        <PiPlusCircle />
                        Novo prato
                    </button>
                </header>

                <table>
                    {selectedPlates.some(info => info.selected)
                        ? <thead className="not-hidden">
                            <tr>
                                <th>
                                    <Checkbox
                                        id="select-all-plates"
                                        title="Selecionar todos"
                                        className={styles.plate__checkbox}
                                        checked={allPlatesSelected}
                                        onChange={handleSelectAll} />
                                </th>

                                <th colSpan={7}>
                                    <label htmlFor="select-all-plates">
                                        Selecionar todos
                                    </label>
                                </th>
                            </tr>
                        </thead>

                        : <thead>
                            <tr>
                                <th></th>
                                <th></th>
                                <th>Prato</th>
                                <th>Disponível</th>
                                <th>Categoria</th>
                                <th>Descrição</th>
                                <th>Preço</th>
                                <th className="centered">Ações</th>
                            </tr>
                        </thead>}

                    <tbody>
                        <PlateRow
                            onOpenDelete={handleOpenDelete}
                            onOpenEdit={handleOpenEdit}
                            selecting={selectedPlates.every(info => !info.selected)} />
                    </tbody>
                </table>

                {/* {selectedPlates.some(info => info.selected) && */}
                <p className={styles.plates__actions}>
                    <strong>Ações em massa:</strong>

                    <button
                        className="button clear small"
                        onClick={() => setChangeAvailabilityIsOpen(true)}>
                        Marcar como Indisponível
                    </button>

                    <button
                        className="button clear small"
                        onClick={() => setChangeAvailabilityIsOpen(true)}>
                        Marcar como Disponível
                    </button>

                    <button
                        className="button clear small"
                        onClick={handleSetListToDelete}>
                        Excluir
                    </button>
                </p>
                {/* } */}

                {/* <Trigger type="warning">
                    Ainda não há pratos cadastrados.
                </Trigger> */}
            </section>

            <Modal
                isOpen={plateFormIsOpen}
                onRequestClose={() => setPlateFormIsOpen(false)}>
                <PlateForm onClosePlateForm={() => setPlateFormIsOpen(false)} />
            </Modal>

            <Modal
                isOpen={changeAvailabilityIsOpen}
                onRequestClose={() => setChangeAvailabilityIsOpen(false)}>
                <SetAvailability
                    onCloseSetAvailability={() => setChangeAvailabilityIsOpen(false)}
                    availability="available" />
            </Modal>

            <Modal
                isOpen={deleteIsOpen}
                onRequestClose={() => setDeleteIsOpen(false)}>
                <Delete
                    onCloseDelete={() => setDeleteIsOpen(false)}
                    title={deletePlateTitle} />
            </Modal>
        </>
    )
}

export default Plates