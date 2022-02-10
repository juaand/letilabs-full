import React, {useState, useEffect} from 'react'
import {getLogoCarouselData} from '../../../../../services/ApiClient'
import DeleteItemModal from './DeleteItemModal/DeleteItemModal'

function EditCarrouselAlliances() {
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
            const getLogoCarouselDataData = await getLogoCarouselData()
            setOurCompaniesOCData(getLogoCarouselDataData)

        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {bool && <DeleteItemModal hideModal={() => setBool(!bool)} data={modalData} deleteItem={(updateData) => deleteItem(updateData)} />}
            {ourCompaniesOCData?.length > 0 &&
                <section className="container-fluid EditContent EditContent-timeline">
                    <h2>Editar Carrousel logos</h2>
                    <div className="row justify-content-around">
                        {ourCompaniesOCData?.map(el =>
                            <div className="col-1 EditCarousel__edit" onClick={() => showModal(el)}>
                                <img className="EditCarousel__img" src={el?.picPath} alt={el?.picPath} />
                            </div>
                        )}
                    </div>
                </section>}
        </>
    )
}

export default EditCarrouselAlliances
