import { useEffect, useState, type FormEvent } from "react"
import styles from "../../../../Popup/Popup.module.css"
import type { IOrderCreate, IOrderStatus } from "../../../../../types/order"
import Popup from "../../../../Popup"
import { PiTrash } from "react-icons/pi"
import InputWithLabel from "../../../../Form/InputWithLabel/InputWithLabel"
import SelectWithLabel from "../../../../Form/InputWithLabel/SelectWithLabel"
import { useAppContext } from "../../../../../context/app-context"
import Loading from "../../../../Loading"
import Trigger from "../../../../Trigger"
import type { IPlate } from "../../../../../types/plate"
import PlateToSelect from "../PlateToSelect"
import { uploadsURL } from "../../../../../services/api"
import { useDateFormats } from "../../../../../hooks/date-formats"

type Props = {
    action: "create" | "update"
    onClosePopup: () => void
}

const OrderForm = ({ action, onClosePopup }: Props) => {
    const [step, setStep] = useState<1 | 2>(1)
    const [date, setDate] = useState<string>("")
    const [time, setTime] = useState<string>("")
    const [status, setStatus] = useState<IOrderStatus>("Pendente")
    const [userId, setUserId] = useState<string>("")
    const { combineDateAndTime, dateFormat, timeFormat } = useDateFormats()
    const { addMessage } = useAppContext().message

    const [platesInfo, setPlatesInfo] = useState<{
        plate: IPlate,
        quantity: number,
        selected: boolean
    }[]>([])

    const {
        fetching: fetchingUsers,
        handleFetchUsers,
        users,
    } = useAppContext().users

    const {
        fetching: fetchingPlates,
        handleFetchAvailablePlates,
        plates,
    } = useAppContext().plates

    const {
        mutating,
        mutateSuccess,
        mutateSuccessMessage,
        mutateErrorMessage,
        handleCreateOrder,
        handleResetOrdersMessage,
        currentOrder,
        handleUpdateOrder,
    } = useAppContext().orders

    const selectedPlatesInfo = platesInfo.filter(info => info.selected)

    useEffect(() => {
        const fetchAdditionalFields = async () => {
            const fieldsPromises = [
                handleFetchUsers(),
                handleFetchAvailablePlates()
            ]

            await Promise.all(fieldsPromises)
        }

        fetchAdditionalFields()
    }, [handleFetchAvailablePlates, handleFetchUsers])

    useEffect(() => {
        const arrangePlatesInfo = () => {
            if (plates) {
                setPlatesInfo(plates.map(plate => {
                    if (currentOrder) {
                        const selectedOrderItem = currentOrder.orderItems.find(item => item.plateId === plate._id)

                        if (selectedOrderItem) {
                            return {
                                plate: selectedOrderItem.itemDetails,
                                quantity: selectedOrderItem.quantity,
                                selected: true
                            }
                        }
                    }

                    return {
                        plate,
                        quantity: 1,
                        selected: false
                    }
                }))
            }
        }

        arrangePlatesInfo()
    }, [plates, currentOrder])

    useEffect(() => {
        const verifySelectedPlates = () => {
            if (!selectedPlatesInfo.length) {
                setStep(1)
            }
        }
        verifySelectedPlates()
    }, [selectedPlatesInfo])

    useEffect(() => {
        const initializeFormFields = () => {
            if (action === "update" && currentOrder && platesInfo.length) {
                setDate(dateFormat(currentOrder.time, true))
                setTime(timeFormat(currentOrder.time))
                setStatus(currentOrder.status)
                setUserId(currentOrder.userDetails[0]._id)
                setStep(2)
            }
        }

        initializeFormFields()
    }, [action, currentOrder, dateFormat, timeFormat, platesInfo])

    useEffect(() => {
        if (mutateSuccess && mutateSuccessMessage) {
            addMessage(mutateSuccessMessage)
            handleResetOrdersMessage()
            onClosePopup()
        }
    }, [addMessage, handleResetOrdersMessage, mutateSuccess, mutateSuccessMessage, onClosePopup])

    const handleSelectPlate = (plateId: string, selected: boolean) => {
        setPlatesInfo(prevInfo => prevInfo.map(info => {
            if (plateId === info.plate._id) {
                return { ...info, selected }
            }

            return info
        }))
    }

    const handleIncrementPlateQuantity = (plateId: string, mode: "minus" | "plus") => {
        setPlatesInfo(prevInfo => prevInfo.map(info => {
            if (plateId === info.plate._id) {
                const newQuantity = mode === "plus" ? info.quantity + 1 : info.quantity - 1

                if (newQuantity >= 1) {
                    return { ...info, quantity: newQuantity }
                }
            }

            return info
        }))
    }

    const handleChangePlateQuantity = (plateId: string, quantity: string) => {
        const newQuantity = parseInt(quantity)

        setPlatesInfo(prevInfo => prevInfo.map(info => {
            if (plateId === info.plate._id && newQuantity >= 1) {
                return { ...info, quantity: newQuantity }
            }
            return info
        }))
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()

        const coombinedDate = combineDateAndTime(date, time)

        const orderData: Partial<IOrderCreate> = {
            userId,
            status,
            time: coombinedDate,
            items: selectedPlatesInfo.map(info => ({
                plateId: info.plate._id,
                quantity: info.quantity
            }))
        }

        switch (action) {
            case "create":
                await handleCreateOrder(orderData)
                break

            case "update":
                if (currentOrder) {
                    await handleUpdateOrder(orderData, currentOrder._id)
                }
                break
        }
    }

    return (
        <Popup>
            <div className={styles.popup__heading}>
                <h2>
                    {action === "create" ? "Novo" : "Editar"} pedido
                </h2>
            </div>

            {fetchingUsers || fetchingPlates
                ? <div className={styles.popup__form}>
                    <Loading />
                </div>

                : !users || !plates
                    ? <Trigger type="error">Erro ao carregar formulário. Tente de novo.</Trigger>

                    : <>
                        {step === 1 &&
                            <div className={styles.popup__form}>
                                <p>
                                    <strong className={styles.popup__strongDetached}>Cliente</strong>
                                </p>

                                <select
                                    value={userId || ""}
                                    onChange={event => setUserId(event.target.value)}
                                    disabled={mutating}>
                                    <option
                                        value=""
                                        className={styles.popup__neutralOption}>Selecione um cliente</option>
                                    {users.map(user => (
                                        <option
                                            key={user._id}
                                            value={user._id}>{user.fullname}</option>
                                    ))}
                                </select>

                                <p>
                                    <strong className={styles.popup__strongDetached}>Selecionar itens</strong>
                                </p>

                                <div className={styles.popup_list}>
                                    {platesInfo.map(info => (
                                        <PlateToSelect
                                            key={info.plate._id}
                                            plate={info.plate}
                                            selected={info.selected}
                                            quantity={info.quantity}
                                            onSelect={handleSelectPlate}
                                            onChangeQuantity={handleIncrementPlateQuantity}
                                            loading={mutating} />
                                    ))}
                                </div>

                                <div className={`${styles.popup__action} ${styles.popup__ended} ${styles.popup__stretched}`}>
                                    <button
                                        className="button primary outline"
                                        onClick={onClosePopup}
                                        disabled={mutating}>Voltar</button>

                                    <button
                                        className="button primary"
                                        onClick={() => setStep(2)}
                                        disabled={!selectedPlatesInfo.length || mutating}>
                                        Próximo
                                    </button>
                                </div>
                            </div>}

                        {step === 2 &&
                            <form className={styles.popup__form} onSubmit={handleSubmit}>
                                <InputWithLabel
                                    label="Data de comparecimento"
                                    type="date"
                                    value={date || ""}
                                    onChange={event => setDate(event.target.value)} />

                                <InputWithLabel
                                    label="Horário de comparecimento"
                                    type="time"
                                    value={time || ""}
                                    onChange={event => setTime(event.target.value)} />

                                <SelectWithLabel
                                    label="Status"
                                    name="status"
                                    value={status || ""}
                                    onChange={event => setStatus(event.target.value as IOrderStatus)}>
                                    <option value="Pendente">Pendente</option>
                                    <option value="Cancelado">Cancelado</option>
                                    <option value="Concluído">Concluído</option>
                                </SelectWithLabel>

                                <div className={styles.popup_list}>
                                    <h3 className={styles.popup__listItem}>Itens</h3>

                                    {selectedPlatesInfo.map(info => (
                                        <div
                                            key={info.plate._id}
                                            className={styles.popup__listItem}>
                                            <div className={styles.popup__listImage}>
                                                <img
                                                    src={info.plate.image
                                                        ? `${uploadsURL}/plates/${info.plate.image}`
                                                        : "/images/no-image.jpg"}
                                                    alt="Plate" />
                                            </div>

                                            <div className={styles.popup__listInfo}>
                                                <p className={`${styles.popup__listName} ${styles.popup__listSmall}`}>
                                                    <strong>{info.plate.name}</strong>
                                                </p>

                                                <div className={styles.popup__listDetails}>
                                                    <input
                                                        type="number"
                                                        min={1}
                                                        value={info.quantity}
                                                        onChange={event => handleChangePlateQuantity(
                                                            info.plate._id,
                                                            event.target.value
                                                        )} />
                                                </div>
                                            </div>

                                            <div className={styles.popup__listAction}>
                                                <button
                                                    type="button"
                                                    className="button primary clear"
                                                    title="Excluir este item"
                                                    onClick={() => handleSelectPlate(info.plate._id, false)}
                                                    disabled={mutating}>
                                                    <PiTrash />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className={`${styles.popup__action} ${styles.popup__stretched} ${styles.popup__ended}`}>
                                    <button
                                        type="button"
                                        className="button primary outline"
                                        onClick={() => setStep(1)}
                                        disabled={mutating}>
                                        Anterior
                                    </button>

                                    <button
                                        type="submit"
                                        className="button primary"
                                        disabled={mutating}>
                                        {action === "create" ? "Criar" : "Atualizar"}
                                        {mutating && <Loading inButton />}
                                    </button>
                                </div>

                                {mutateErrorMessage &&
                                    <Trigger type="error">{mutateErrorMessage}</Trigger>}
                            </form>}
                    </>}
        </Popup>
    )
}

export default OrderForm