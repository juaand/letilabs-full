import React, {useState, useEffect} from 'react'
import {getGoalsIdData} from '../../../../../services/ApiClient'
import EditItemModal from './EditItemModal/EditItemModal'

function EditGoalsInfo() {

    const [modalData, setModalData] = useState()
    const [ourGoalsData, setOurGoalsData] = useState()
    const [bool, setBool] = useState(false)

    const showModal = (info) => {
        setModalData(info)
        setBool(!bool)
    }

    const deleteItem = (info) => {
        setOurGoalsData(info)
        setBool(!bool)
    }

    const hideModal = (info) => {
        setOurGoalsData(info)
        setBool(!bool)
    }

    useEffect(() => {
        const fetchData = async () => {
            const getOurGoalsOCData = await getGoalsIdData()
            setOurGoalsData(getOurGoalsOCData)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {bool && <EditItemModal hideModal={(info) => hideModal(info)} infodata={modalData} deleteItem={(updateData) => deleteItem(updateData)} closeModal={() => setBool(!bool)} />}
            {ourGoalsData?.length > 0 &&
                <section className="container-fluid Letilabs EditContent EditContent-timeline">
                    <h2>Editar objetivos</h2>
                    <div className="row justify-content-around">
                        {ourGoalsData?.map(el =>
                            <div className="col-3 EditCarousel__edit" onClick={() => showModal(el)}>
                                <h4>{el?.name}</h4>
                                <p dangerouslySetInnerHTML={{ __html: el?.desc }} />
                            </div>
                        )}
                    </div>
                </section>}
        </>
    )
}

export default EditGoalsInfo
