import React, {useState, useEffect} from 'react'
import {getBottomOC} from '../../../../../services/ApiClient'
import DeleteItemModal from '../../EditOurCompanies/EditBottomCta/DeleteItemModal/DeleteItemModal'



function EditBottomCta() {

    const [registerError, setRegisterError] = useState(null)
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
            const getOurCompaniesOCData = await getBottomOC()
            setOurCompaniesOCData(getOurCompaniesOCData)

        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {bool && <DeleteItemModal hideModal={() => setBool(!bool)} element={modalData} event deleteItem={(updateData) => deleteItem(updateData)} />}
            {ourCompaniesOCData?.length > 0 &&
                <section className="container-fluid EditContent EditContent-timeline">
                    <h2>Editar elementos CTA</h2>
                    <div className="row justify-content-around">
                        {ourCompaniesOCData?.map(el =>
                            <div className="col-5 EditCarousel__edit" onClick={() => showModal(el)}>
                                <img className="EditCarousel__img" src={el.img.toLowerCase()} alt={el.img} />
                                <p>{el.title}</p>
                            </div>
                        )}
                    </div>
                </section>}
        </>
    )
}

export default EditBottomCta
