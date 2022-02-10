import React, {useState, useEffect} from 'react'
import {getBottomOurPeople} from '../../../../../services/ApiClient'
import DeleteItemModal from '../../EditOurPeople/EditBottomOurPeople/DeleteItemModal/DeleteItemModal'


function EditBottomOurPeople() {
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
            const getOurPeopleData = await getBottomOurPeople()
            setOurPeopleData(getOurPeopleData)

        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {bool && <DeleteItemModal hideModal={() => setBool(!bool)} data={modalData} deleteItem={(updateData) => deleteItem(updateData)} />}
            {ourPeopleData?.length > 0 &&
                <section className="container-fluid EditContent EditContent-timeline">
                    <h2>Editar compañía</h2>
                    <div className="row justify-content-around">
                        {ourPeopleData?.map(el =>
                            <div className="col-4 EditCarousel__edit" onClick={() => showModal(el)}>
                                <img className="EditCarousel__img" src={el.img.toLowerCase()} alt={el.img} />
                                <p>{el.title}</p>
                                <p>{el.button}</p>
                                <p>{el.url}</p>
                            </div>
                        )}
                    </div>
                </section>}
        </>
    )
}

export default EditBottomOurPeople
