import React, {useState, useEffect} from 'react'

import EditItemModal from '../../EditOurCompanies/EditBottomCta/EditItemModal/EditItemModal'
import {getBottomOC} from '../../../../../services/ApiClient'

function EditBottomCta() {

    const [modalData, setModalData] = useState()
    const [ctaDta, setCtaData] = useState()
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
            const getOCCtaData = await getBottomOC()
            setCtaData(getOCCtaData)

        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {bool && <EditItemModal hideModal={(info) => hideModal(info)} infodata={modalData} closeModal={() => setBool(!bool)} />}
            {ctaDta?.length > 0 &&
                <section className="container-fluid EditContent EditContent-timeline">
                    <h2>Editar CTA</h2>
                    <div className="row justify-content-around">
                        {ctaDta?.map(el =>
                            <div className="col-sm-4 col-12 EditCarousel__edit" onClick={() => showModal(el)}>
                                <img className="EditCarousel__img" src={el.img} onError="this.src = 'https://firebasestorage.googleapis.com/v0/b/grupoleti.appspot.com/o/images%2Fno-image.png?alt=media&token=6e518b16-dc11-46e3-83e8-ae4b84a18293';" alt={el.img} />
                                <h4 className="EditContent__boldtitle">{el.title}</h4>
                            </div>
                        )}
                    </div>
                </section>}
        </>
    )
}

export default EditBottomCta
