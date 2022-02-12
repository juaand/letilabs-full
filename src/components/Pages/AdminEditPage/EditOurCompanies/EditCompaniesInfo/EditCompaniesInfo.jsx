import React, {useState, useEffect} from 'react'
import {getOurCompaniesOC} from '../../../../../services/ApiClient'
import DeleteItemModal from '../../EditOurCompanies/EditCompaniesInfo/DeleteItemModal/DeleteItemModal'

function EditCompaniesInfo() {
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
            const getOurCompaniesOCData = await getOurCompaniesOC()
            setOurCompaniesOCData(getOurCompaniesOCData)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {bool && <DeleteItemModal hideModal={() => setBool(!bool)} data={modalData} deleteItem={(updateData) => deleteItem(updateData)} />}
            {ourCompaniesOCData?.length > 0 &&
                <section className="container-fluid EditContent EditContent-timeline">
                    <h2>Editar unidades de negocio</h2>
                    <div className="row justify-content-around">
                        {ourCompaniesOCData?.map(el =>
                            <div className="col-1 EditCarousel__edit" onClick={() => showModal(el)}>
                                <h1>{el.mainTitle}</h1>
                                <img className="EditCarousel__img" src={el?.logo} alt={"logo " + el?.name} />
                            </div>
                        )}
                    </div>
                </section>}
        </>
    )
}

export default EditCompaniesInfo
