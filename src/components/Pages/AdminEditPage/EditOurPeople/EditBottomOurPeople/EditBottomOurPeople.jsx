import React, {useState, useEffect} from 'react'
import {getBottomOurPeople} from '../../../../../services/ApiClient'
import EditItemModal from '../../EditOurPeople/EditBottomOurPeople/EditItemModal/EditItemModal'


function EditBottomOurPeople() {
    const [modalData, setModalData] = useState()
    const [ourPeopleData, setOurPeopleData] = useState()
    const [bool, setBool] = useState(false)

    const showModal = (data) => {
        setModalData(data)
        setBool(!bool)
    }

    const hideModal = (info) => {
        setOurPeopleData(info)
        setBool(!bool)
    }

    useEffect(() => {
        const fetchData = async () => {
            const getOurPeopleData = await getBottomOurPeople()
            setOurPeopleData(getOurPeopleData)

        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {bool && <EditItemModal hideModal={(info) => hideModal(info)} infodata={modalData} closeModal={() => setBool(!bool)} />}
            {ourPeopleData?.length > 0 &&
                <section className="container-fluid EditContent EditContent-timeline">
                    <h2>Editar CTA</h2>
                    <div className="row justify-content-around">
                        {ourPeopleData?.map(el =>
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

export default EditBottomOurPeople
