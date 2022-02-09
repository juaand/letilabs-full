import React, {useState, useEffect} from 'react'
import {getBottomTech} from '../../../../../services/ApiClient'
import DeleteItemModal from './DeleteItemModal/DeleteItemModal'



function EditBottomTech() {
    const [modalData, setModalData] = useState()
    const [IDData, setIDData] = useState()
    const [bool, setBool] = useState(false)

    const showModal = (data) => {
        setModalData(data)
        setBool(!bool)
    }

    const deleteItem = (data) => {
        setIDData(data)
        setBool(!bool)
    }

    useEffect(() => {
        const fetchData = async () => {
            const getIDData = await getBottomTech()
            setIDData(getIDData)

        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {bool && <DeleteItemModal hideModal={() => setBool(!bool)} data={modalData} deleteItem={(updateData) => deleteItem(updateData)} />}
            {IDData?.length > 0 &&
                <section className="container-fluid EditContent">
                    <h2>Editar bottom</h2>
                    <div className="row justify-content-around">
                        {IDData?.map(el =>
                            <div className="col-1 EditCarousel__trash" onClick={() => showModal(el)}>
                                <img className="EditCarousel__img" src={el?.img} alt={el?.img} />
                                <p>{el?.title}</p>
                                <p>{el?.button}</p>
                                <p>{el?.url}</p>
                            </div>
                        )}
                    </div>
                </section>}
        </>
    )
}

export default EditBottomTech
