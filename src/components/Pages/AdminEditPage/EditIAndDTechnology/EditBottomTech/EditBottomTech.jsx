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
                            <div className="col-sm-4 col-12 EditCarousel__edit" onClick={() => showModal(el)}>
                                <img className="EditCarousel__img" src={el.img} onError="this.src = 'https://firebasestorage.googleapis.com/v0/b/grupo-leti-fd84e.appspot.com/o/images%2Fno-image.png?alt=media&token=73bf7cd8-629d-4deb-b281-9e629fbfb752';" alt={el.img} />
                                <h4 className="EditContent__boldtitle">{el.title}</h4>
                            </div>
                        )}
                    </div>
                </section>}
        </>
    )
}

export default EditBottomTech
