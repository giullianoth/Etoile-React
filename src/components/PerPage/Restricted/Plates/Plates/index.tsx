import { PiPlusCircle } from "react-icons/pi"
import styles from "../List.module.css"
import { useEffect, useState, type ChangeEvent } from "react"
import type { IPlate } from "../../../../../types/plate"
import Checkbox from "../../../../Form/Checkbox"
import PlateRow from "../PlateRow"
import { useAppContext } from "../../../../../context/app-context"
import Loading from "../../../../Loading"
import Trigger from "../../../../Trigger"
import Modal from "../../../../Modal"
import PlateForm from "../PlateForm"
import DeletePlates from "../DeletePlates"
import ActivatePlate from "../ActivatePlate"
import DeactivatePlate from "../DeactivatePlate"

const Plates = () => {
    const [selectedPlatesInfo, setSelectedPlatesInfo] = useState<{ plate: IPlate, selected: boolean }[]>([])
    const [allPlatesSelected, setAllPlatesSelected] = useState<boolean>(false)
    const [createIsOpen, setCreateIsOpen] = useState<boolean>(false)
    const [editIsOpen, setEditIsOpen] = useState<boolean>(false)
    const [deleteIsOpen, setDeleteIsOpen] = useState<boolean>(false)
    const [activateIsOpen, setActivateIsOpen] = useState<boolean>(false)
    const [deactivateIsOpen, setDeactivateIsOpen] = useState<boolean>(false)
    const [platesToModify, setPlatesToModify] = useState<IPlate[]>([])
    const selectedPlates = selectedPlatesInfo.filter(info => info.selected).map(info => info.plate)

    const {
        fetching,
        fetchErrorMessage,
        handleFetchPlates,
        plates,
        handleSetPlateToEdit,
        currentPlate,
    } = useAppContext().plates

    useEffect(() => {
        const fetchPlatesData = async () => {
            await handleFetchPlates()
        }
        fetchPlatesData()
    }, [handleFetchPlates])

    useEffect(() => {
        const arrangePlates = () => {
            if (plates) {
                setSelectedPlatesInfo(plates.map(plate => ({
                    plate,
                    selected: false
                })))
            }
        }

        arrangePlates()
    }, [plates])

    const handleSelectPlate = (plateId: string, selected: boolean) => {
        setSelectedPlatesInfo(prevPlates => prevPlates.map(prevPlate => {
            if (prevPlate.plate._id === plateId) {
                return {
                    ...prevPlate,
                    selected
                }
            }
            return prevPlate
        }))
    }

    const handleSelectAll = (event: ChangeEvent<HTMLInputElement>) => {
        const { checked } = event.target
        setAllPlatesSelected(checked)

        setSelectedPlatesInfo(prevPlates => prevPlates.map(info => ({
            ...info,
            selected: checked
        })))
    }

    const handleOpenDelete = (platesToDelete: IPlate[]) => {
        setPlatesToModify(platesToDelete)
        setDeleteIsOpen(true)
    }

    const handleOpenActivte = (platesToDelete: IPlate[]) => {
        setPlatesToModify(platesToDelete)
        setActivateIsOpen(true)
    }

    const handleOpenDeactivte = (platesToDelete: IPlate[]) => {
        setPlatesToModify(platesToDelete)
        setDeactivateIsOpen(true)
    }

    return (
        <>
            <section className={styles.plates}>
                <header className={styles.plates__title}>
                    <h2>Lista de pratos</h2>

                    <button
                        className="button primary small"
                        onClick={() => setCreateIsOpen(true)}>
                        <PiPlusCircle />
                        Novo prato
                    </button>
                </header>

                {fetching
                    ? <Loading />

                    : fetchErrorMessage
                        ? <Trigger type="error">{fetchErrorMessage}</Trigger>

                        : selectedPlatesInfo.length
                            ? <>
                                <table>
                                    {selectedPlates.length
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
                                                <th className="centered">Ação</th>
                                            </tr>
                                        </thead>}

                                    <tbody>
                                        {selectedPlatesInfo.map(info => (
                                            <PlateRow
                                                key={info.plate._id}
                                                plate={info.plate}
                                                selected={info.selected}
                                                selecting={selectedPlates.length > 0}
                                                onSelect={handleSelectPlate}
                                                onOpenEdit={() => setEditIsOpen(true)}
                                                onOpenDelete={() => handleOpenDelete([info.plate])} />
                                        ))}
                                    </tbody>
                                </table>

                                {selectedPlates.length > 0 &&
                                    <p className={styles.plates__actions}>
                                        <strong>Ações em massa:</strong>

                                        <button
                                            className="button clear small"
                                            onClick={() => handleOpenDeactivte(selectedPlates)}>
                                            Marcar como Indisponível
                                        </button>

                                        <button
                                            className="button clear small"
                                            onClick={() => handleOpenActivte(selectedPlates)}>
                                            Marcar como Disponível
                                        </button>

                                        <button
                                            className="button clear small"
                                            onClick={() => handleOpenDelete(selectedPlates)}>
                                            Excluir
                                        </button>
                                    </p>}
                            </>

                            : <Trigger type="warning">Ainda não há pratos cadastrados.</Trigger>}
            </section>

            <Modal
                isOpen={createIsOpen}
                onRequestClose={() => setCreateIsOpen(false)}
                onAfterClose={() => handleSetPlateToEdit(null)}>
                <PlateForm
                    action="create"
                    onClosePopup={() => setCreateIsOpen(false)} />
            </Modal>

            <Modal
                isOpen={editIsOpen}
                onRequestClose={() => setEditIsOpen(false)}
                onAfterClose={() => handleSetPlateToEdit(null)}>
                {currentPlate &&
                    <PlateForm
                        action="update"
                        onClosePopup={() => setEditIsOpen(false)} />}
            </Modal>

            <Modal
                isOpen={deleteIsOpen}
                onRequestClose={() => setDeleteIsOpen(false)}
                onAfterClose={() => setPlatesToModify([])}>
                {platesToModify.length > 0 &&
                    <DeletePlates
                        platesToDelete={platesToModify}
                        onClosePopup={() => setDeleteIsOpen(false)}
                        willDeleteMany={selectedPlates.length > 0} />}
            </Modal>

            <Modal
                isOpen={activateIsOpen}
                onRequestClose={() => setActivateIsOpen(false)}
                onAfterClose={() => setPlatesToModify([])}>
                {platesToModify.length > 0 &&
                    <ActivatePlate
                        platesToActivate={platesToModify}
                        onClosePopup={() => setActivateIsOpen(false)} />}
            </Modal>

            <Modal
                isOpen={deactivateIsOpen}
                onRequestClose={() => setDeactivateIsOpen(false)}
                onAfterClose={() => setPlatesToModify([])}>
                {platesToModify.length > 0 &&
                    <DeactivatePlate
                        platesToDeactivate={platesToModify}
                        onClosePopup={() => setDeactivateIsOpen(false)} />}
            </Modal>
        </>
    )
}

export default Plates