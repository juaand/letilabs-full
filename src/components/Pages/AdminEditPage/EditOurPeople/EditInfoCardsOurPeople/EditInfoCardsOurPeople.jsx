import React, {useState, useEffect} from 'react'
import {getInfoCardsOurPeople} from '../../../../../services/ApiClient'
import DeleteItemModal from './DeleteItemModal/DeleteItemModal'

function EditInfoCardsOurPeople() {
    const [modalData, setModalData] = useState()
    const [ourOCData, setOurOCData] = useState()
    const [bool, setBool] = useState(false)

    const showModal = (data) => {
        setModalData(data)
        setBool(!bool)
    }

    const deleteItem = (data) => {
        setOurOCData(data)
        setBool(!bool)
    }

    useEffect(() => {
        const fetchData = async () => {
            const getOurOCData = await getInfoCardsOurPeople()
            setOurOCData(getOurOCData)

        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {bool && <DeleteItemModal hideModal={() => setBool(!bool)} data={modalData} deleteItem={(updateData) => deleteItem(updateData)} />}
            {ourOCData?.length > 0 &&
                <section className="container-fluid EditContent">
                    <h2>Editar InfoCard</h2>
                    <div className="row justify-content-around">
                        {ourOCData?.map(el =>
                            <div className="col-1 EditCarousel__trash" onClick={() => showModal(el)}>
                                <p>{el?.mainTitle}</p>
                                <p>{el?.imgURL}</p>
                                <p>{el?.title}</p>
                                <p>{el?.info}</p>
                            </div>
                        )}
                    </div>
                </section>}
        </>
    )
}

export default EditInfoCardsOurPeople
