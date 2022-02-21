import React, {useState, useEffect} from 'react'
import {getBottomTech} from '../../../../../services/ApiClient'
import EditItemModal from './EditItemModal/EditItemModal'

function EditBottomTech() {
    const [modalData, setModalData] = useState()
    const [ctaData, setCtaData] = useState()
    const [bool, setBool] = useState(false)

    const showModal = (data) => {
        setModalData(data)
        setBool(!bool)
    }

    const hideModal = (info) => {
        setCtaData(info)
        setBool(!bool)
    }

    useEffect(() => {
        const fetchData = async () => {
            const getIDData = await getBottomTech()
            setCtaData(getIDData)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {bool && <EditItemModal hideModal={(info) => hideModal(info)} infodata={modalData} closeModal={() => setBool(!bool)} />}
            {ctaData?.length > 0 &&
                <section className="container-fluid EditContent EditContent-timeline">
                    <h2>Editar CTA</h2>
                    <div className="row justify-content-around">
                        {ctaData?.map(el =>
                            <div className="col-4 EditCarousel__edit" onClick={() => showModal(el)}>
                                <img className="EditCarousel__img" src={el.img} alt={el.img} />
                                <h4 className="EditContent__boldtitle">{el.title}</h4>
                            </div>
                        )}
                    </div>
                </section>}
        </>
    )
}

export default EditBottomTech
