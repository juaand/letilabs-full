import React, {useState, useEffect} from 'react'
import {getInfoCardsOurPhilosophy, updateInfoCardsOurPhilosophy} from '../../../../../services/ApiClient'
import EditItemModal from './EditItemModal/EditItemModal'

function EditInfoCardsOurPhilosophy() {
    const [modalData, setModalData] = useState()
    const [ourOCData, setOurOCData] = useState()
    const [bool, setBool] = useState(false)

    const showModal = (data) => {
        setModalData(data)
        setBool(!bool)
    }

    const hideModal = (data) => {
        console.log(data)
        setOurOCData(data)
        setBool(!bool)
    }

    const deleteItem = (data) => {
        setOurOCData(data)
        setBool(!bool)
    }

    useEffect(() => {
        const fetchData = async () => {
            const getOurOCData = await getInfoCardsOurPhilosophy()
            setOurOCData(getOurOCData)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {bool && <EditItemModal hideModal={(data) => hideModal(data)} infodata={modalData} deleteItem={(updateData) => deleteItem(updateData)} />}
            {ourOCData?.length > 0 &&
                <section className="container-fluid EditContent EditContent-timeline">
                    <h2>Editar pilares</h2>
                    <div className="row justify-content-around">
                        {ourOCData?.map(el =>
                            <div className="col-1 EditCarousel__edit" onClick={() => showModal(el)}>
                                <img src={el?.picPath} alt={el?.title} />
                                <p>{el?.title}</p>
                            </div>
                        )}
                    </div>
                </section>
            }
            <section className="container-fluid EditContent EditContent-timeline">
                <h2>Añadir nuevo pilar</h2>
                <div className="row justify-content-around">
                    <div className="col-1 EditCarousel__edit" >
                        <img src="" alt="" />
                        <p>Título</p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default EditInfoCardsOurPhilosophy
