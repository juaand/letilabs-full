import React, {useState, useEffect} from 'react'
import {getBottomIdData} from '../../../../../services/ApiClient'
import EditItemModal from './EditItemModal/EditItemModal'

function EditBottomID() {

    const [modalData, setModalData] = useState()
    const [IDData, setIDData] = useState()
    const [bool, setBool] = useState(false)

    const showModal = (info) => {
        setModalData(info)
        setBool(!bool)
    }

    const hideModal = (info) => {
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
            {bool && <EditItemModal hideModal={(info) => hideModal(info)} infodata={modalData} closeModal={() => setBool(!bool)} />}
            {IDData?.length > 0 &&
                <section className="container-fluid EditContent EditContent-timeline">
                    <h2>Editar CTA</h2>
                    <div className="row justify-content-around">
                        {IDData?.map(el =>
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

export default EditBottomID
