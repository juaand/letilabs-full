import React, {useState, useEffect} from 'react'
import {getCarouselManufacture} from '../../../../../services/ApiClient'
import DeleteItemModal from './DeleteItemModal/DeleteItemModal'

function EditCarouselManufacture() {
    
    const [modalData, setModalData] = useState()
    const [ourCarouselManufactureData, setOurCarouselManufactureData] = useState()
    const [bool, setBool] = useState(false)

    const showModal = (data) => {
        setModalData(data)
        setBool(!bool)
    }

    const deleteItem = (data) => {
        setOurCarouselManufactureData(data)
        setBool(!bool)
    }

    useEffect(() => {
        const fetchData = async () => {
            const getOurCarouselManufactureData = await getCarouselManufacture()
            setOurCarouselManufactureData(getOurCarouselManufactureData)

        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {bool && <DeleteItemModal hideModal={() => setBool(!bool)} data={modalData} deleteItem={(updateData) => deleteItem(updateData)} />}
            {ourCarouselManufactureData?.length > 0 &&
                <section className="container-fluid  EditContent EditContent-timeline">
                    <h2>Editar procesos</h2>
                    <div className="row justify-content-around">
                        {ourCarouselManufactureData?.map(el =>
                            <div className="col-3 EditCarousel__edit logros" onClick={() => showModal(el)}>
                                <p>{el?.info}</p>
                            </div>
                        )}
                    </div>
                </section>}
        </>
    )
}

export default EditCarouselManufacture
