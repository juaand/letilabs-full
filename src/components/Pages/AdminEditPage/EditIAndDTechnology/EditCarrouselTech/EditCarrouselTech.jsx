import React, {useState, useEffect} from 'react'
import {getCarouselTech} from '../../../../../services/ApiClient'
import DeleteItemModal from './DeleteItemModal/DeleteItemModal'

function EditCarrouselTech() {
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
            const getOurGoalsOCData = await getCarouselTech()
            setOurGoalsOCData(getOurGoalsOCData)

        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {bool && <DeleteItemModal hideModal={() => setBool(!bool)} data={modalData} deleteItem={(updateData) => deleteItem(updateData)} />}
            {ourGoalsOCData?.length > 0 &&
                <section className="container-fluid EditContent EditContent-timeline">
                    <h2>Editar Carousel</h2>
                    <div className="row justify-content-around">
                        {ourGoalsOCData?.map(el =>
                            <div className="col-3 EditCarousel__edit logros" onClick={() => showModal(el)}>
                                <img src={el?.imgURL} alt={el?.name}  />
                                <h4 className="mt-5">{el?.title}</h4>
                            </div>
                        )}
                    </div>
                </section>}
        </>
    )
}

export default EditCarrouselTech
