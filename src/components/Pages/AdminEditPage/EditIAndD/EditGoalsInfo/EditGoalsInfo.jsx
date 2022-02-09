import React, {useState, useEffect} from 'react'
import {getGoalsIdData} from '../../../../../services/ApiClient'
import DeleteItemModal from './DeleteItemModal/DeleteItemModal'

function EditGoalsInfo() {

    const [modalData, setModalData] = useState()
    const [ourGoalsOCData, setOurGoalsOCData] = useState()
    const [bool, setBool] = useState(false)

    const showModal = (data) => {
        setModalData(data)
        setBool(!bool)
    }

    const deleteItem = (data) => {
        setOurGoalsOCData(data)
        setBool(!bool)
    }

    useEffect(() => {
        const fetchData = async () => {
            const getOurGoalsOCData = await getGoalsIdData()
            setOurGoalsOCData(getOurGoalsOCData)

        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {bool && <DeleteItemModal hideModal={() => setBool(!bool)} data={modalData} deleteItem={(updateData) => deleteItem(updateData)} />}
            {ourGoalsOCData?.length > 0 &&
                <section className="container-fluid EditContent">
                    <h2>Editar objetivos</h2>
                    <div className="row justify-content-around">
                        {ourGoalsOCData?.map(el =>
                            <div className="col-1 EditCarousel__trash" onClick={() => showModal(el)}>
                                <p>{el?.name}</p>
                                <p>{el?.title}</p>
                                <p>{el?.desc}</p>
                            </div>
                        )}
                    </div>
                </section>}
        </>
    )
}

export default EditGoalsInfo
