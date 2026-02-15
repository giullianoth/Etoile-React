import PlatesComponent from "../../../components/Pages/Restricted/Plates/List/Plates"
import Categories from "../../../components/Pages/Restricted/Plates/List/Categories"
import { useAppContext } from "../../../context/context"
import { useEffect } from "react"
import Loading from "../../../components/Loading"
import Trigger from "../../../components/Trigger"

const Plates = () => {
    const {
        fetching,
        fetchErrorMessage,
        handleFetchCategories,
        categories
    } = useAppContext().plates

    useEffect(() => {
        const fetchData = async () => {
            await handleFetchCategories()
        }

        fetchData()
    }, [handleFetchCategories])

    if (fetching) {
        return <Loading />
    }

    return (
        fetchErrorMessage
            ? <Trigger type="error">{fetchErrorMessage}</Trigger>

            : <>
                <PlatesComponent />
                <Categories categories={categories} />
            </>
    )
}

export default Plates