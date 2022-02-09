import React, {useState, useEffect} from 'react'
import {getOurCompaniesInfoCardsBiocontrolled} from '../../../../../services/ApiClient'
import DeleteItemModal from '../../EditOurCompaniesBiocontrolled/EditCompaniesInfoCardsBiocontrolled/DeleteItemModal/DeleteItemModal'

function EditCompaniesInfoCardsBiocontrolled() {
    
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
            const getOurCompaniesOCData = await getOurCompaniesInfoCardsBiocontrolled()
            setOurCompaniesOCData(getOurCompaniesOCData)

        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {bool && <DeleteItemModal hideModal={() => setBool(!bool)} data={modalData} deleteItem={(updateData) => deleteItem(updateData)} />}
            {ourCompaniesOCData?.length > 0 &&
                <section className="container-fluid EditContent">
                    <h2>Editar InfoCard</h2>
                    <div className="row justify-content-around">
                        {ourCompaniesOCData?.map(el =>
                            <div className="col-1 EditCarousel__trash" onClick={() => showModal(el)}>
                                <p>{el?.title}</p>
                                <p>{el?.info}</p>
                            </div>
                        )}
                    </div>
                </section>}
        </>
    )
}

export default EditCompaniesInfoCardsBiocontrolled
