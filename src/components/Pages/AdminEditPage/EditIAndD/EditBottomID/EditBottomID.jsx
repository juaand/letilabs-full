import React, {useState, useEffect} from 'react'
import {getBottomIdData} from '../../../../../services/ApiClient'
import DeleteItemModal from './DeleteItemModal/DeleteItemModal'

function EditBottomID() {

    const [modalData, setModalData] = useState()
    const [IDData, setIDData] = useState()
    const [bool, setBool] = useState(false)

    const showModal = (info) => {
        setModalData(info)
        setBool(!bool)
    }

    const deleteItem = (info) => {
        setIDData(info)
        setBool(!bool)
    }

    useEffect(() => {
        const fetchData = async () => {
            const getIDData = await getBottomIdData()
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
                                <img className="EditCarousel__img" src={el.img.toLowerCase()} alt={el.img} />
                                <p>{el.title}</p>
                                <p>{el.button}</p>
                                <p>{el.url}</p>
                            </div>
                        )}
                    </div>
                </section>}
        </>
    )
}

export default EditBottomID
