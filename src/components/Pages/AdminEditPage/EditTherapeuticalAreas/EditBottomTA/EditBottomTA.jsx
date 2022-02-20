import React, {useState, useEffect} from 'react'
import {getBottomTA,} from '../../../../../services/ApiClient'
import DeleteItemModal from './DeleteItemModal/DeleteItemModal'


function EditBottomTA() {

    const [registerError, setRegisterError] = useState(null)
    const [modalData, setModalData] = useState()
    const [ourPeopleData, setOurPeopleData] = useState()
    const [bool, setBool] = useState(false)

    const showModal = (data) => {
        setModalData(data)
        setBool(!bool)
    }

    const deleteItem = (data) => {
        setOurPeopleData(data)
        setBool(!bool)
    }

    useEffect(() => {
        const fetchData = async () => {
            const getOurPeopleData = await getBottomTA()
            setOurPeopleData(getOurPeopleData)

        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {bool && <DeleteItemModal hideModal={() => setBool(!bool)} element={modalData} deleteItem={(updateData) => deleteItem(updateData)} />}
            {ourPeopleData?.length > 0 &&
                <section className="container-fluid EditContent EditContent-timeline">
                    <h2>Editar elementos CTA</h2>
                    <div className="row justify-content-around">
                        {ourPeopleData?.map(el =>
                            <div className="col-5 EditCarousel__edit" onClick={() => showModal(el)}>
                                <img className="EditCarousel__img" src={el.img} alt={el.img} />
                                <p>{el.title}</p>
                            </div>
                        )}
                    </div>
                </section>}
        </>
    )
}

export default EditBottomTA
