import React, {useState, useEffect} from 'react'
import {getInfoCardsIdData} from '../../../../../services/ApiClient'
import DeleteItemModal from './DeleteItemModal/DeleteItemModal'

function EditInfoCardsID() {

    const [modalData, setModalData] = useState()
    const [ourCompaniesOCData, setOurCompaniesOCData] = useState()
    const [bool, setBool] = useState(false)

    const showModal = (data) => {
        setModalData(data)
        setBool(!bool)
    }

    const deleteItem = (data) => {
        setOurCompaniesOCData(data)
        setBool(!bool)
    }

    useEffect(() => {
        const fetchData = async () => {
            const getInfoCardsIdDataData = await getInfoCardsIdData()
            setOurCompaniesOCData(getInfoCardsIdDataData)

        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {bool && <DeleteItemModal hideModal={() => setBool(!bool)} data={modalData} deleteItem={(updateData) => deleteItem(updateData)} />}
            {ourCompaniesOCData?.length > 0 &&
                <section className="container-fluid Letilabs EditContent EditContent-timeline">
                    <h2>Editar infocards</h2>
                    <div className="row justify-content-around">
                        {ourCompaniesOCData?.map(el =>
                            <div className="col-3 EditCarousel__edit" onClick={() => showModal(el)}>
                                <img className="EditCarousel__img" src={el?.picPath} alt={el?.picPath} />
                                <h4 className="mt-5">{el?.btn}</h4>
                                <p>{el?.info}</p>
                            </div>
                        )}
                    </div>
                </section>}
        </>
    )
}

export default EditInfoCardsID
