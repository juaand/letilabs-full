import React, {useState, useEffect} from 'react'
import {getInfoCardsIdData} from '../../../../../services/ApiClient'
import EditItemModal from './EditItemModal/EditItemModal'

function EditInfoCardsID() {

    const [modalData, setModalData] = useState()
    const [ianddData, setIanddData] = useState()
    const [bool, setBool] = useState(false)

    const showModal = (data) => {
        setModalData(data)
        setBool(!bool)
    }

    const deleteItem = (data) => {
        setIanddData(data)
        setBool(!bool)
    }

    const hideModal = (data) => {
        setIanddData(data)
        setBool(!bool)
    }

    useEffect(() => {
        const fetchData = async () => {
            const getInfoCardsIdDataData = await getInfoCardsIdData()
            setIanddData(getInfoCardsIdDataData)

        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {bool && <EditItemModal hideModal={(data) => hideModal(data)} infodata={modalData} deleteItem={(updateData) => deleteItem(updateData)} closeModal={() => setBool(!bool)} />}
            {ianddData?.length > 0 &&
                <section className="container-fluid Letilabs EditContent EditContent-timeline">
                    <h2>Editar infocards</h2>
                    <div className="row justify-content-around">
                        {ianddData?.map(el =>
                            <div className="col-3 EditCarousel__edit" onClick={() => showModal(el)}>
                                <img className="EditCarousel__img" src={el?.picPath} alt={el?.picPath} />
                                <h4 className="mt-5">{el?.title}</h4>
                                <p dangerouslySetInnerHTML={{ __html: el?.info }} />
                            </div>
                        )}
                    </div>
                </section>}
        </>
    )
}

export default EditInfoCardsID
