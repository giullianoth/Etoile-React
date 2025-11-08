import { useEffect, useState } from "react"
import PlatesList from "../../components/pages/plates/PlatesList"
import PageTitle from "../../components/PageTitle"
import type { IPlate } from "../../types/plate"
import Modal from "react-modal"
import PlateModal from "../../components/pages/plates/PlateModal"
import type { ICartItem } from "../../types/cart-item"
import { useAppContext } from "../../context/context"

const Plates = () => {
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
    const [plateToShow, setPlateToShow] = useState<IPlate | null>(null)
    const { categoriesState, refetch: refetchCategories, getAvailableCategories } = useAppContext().categories
    const { platesState, refetch: refetchPlates, getAvailablePlates } = useAppContext().plates
    const { addToCart } = useAppContext().cart

    useEffect(() => {
        const fetchPlates = async () => {
            if (refetchCategories) {
                await getAvailableCategories()
            }

            if (refetchPlates) {
                await getAvailablePlates()
            }
        }

        fetchPlates()
    }, [refetchCategories, refetchPlates])

    const handleSelectPlate = (plate: IPlate) => {
        setPlateToShow(plate)
        setModalIsOpen(true)
    }

    const handleAddPlate = (plate: IPlate) => {
        const cartItem: ICartItem = {
            plate: plate,
            quantity: 1
        }

        addToCart(cartItem)
        setModalIsOpen(false)
    }

    return (
        <>
            <PageTitle>Pratos</PageTitle>

            <PlatesList
                categories={categoriesState.categories}
                plates={platesState.plates}
                loading={categoriesState.loading && platesState.loading}
                categoriesErrorMessage={categoriesState.errorMessage!}
                platesErrorMessage={platesState.errorMessage!}
                onSelectPlate={handleSelectPlate} />

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                closeTimeoutMS={300}
                overlayClassName="modal-overlay"
                className="modal">
                <PlateModal
                    plate={plateToShow!}
                    onAddPlate={handleAddPlate} />
            </Modal>
        </>
    )
}

export default Plates