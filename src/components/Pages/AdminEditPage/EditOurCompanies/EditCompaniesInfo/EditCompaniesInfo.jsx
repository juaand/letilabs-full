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
            {bool && <DeleteItemModal hideModal={() => setBool(!bool)} element={modalData} deleteItem={(updateData) => deleteItem(updateData)} />}
            {ourCompaniesOCData?.length > 0 &&
                <section className="container-fluid EditContent EditContent-timeline">
                    <h2>Editar unidades de negocio</h2>
                    <div className="row justify-content-around">
                        {ourCompaniesOCData?.map(el =>
                            <div className="col-sm-1 col-12 EditCarousel__edit" onClick={() => showModal(el)}>
                                <h1>{el.mainTitle}</h1>
                                <img className="EditCarousel__img" src={el?.logo} onError="this.src = 'https://firebasestorage.googleapis.com/v0/b/grupoleti.appspot.com/o/images%2Fno-image.png?alt=media&token=6e518b16-dc11-46e3-83e8-ae4b84a18293';" alt={"logo " + el?.name} />
                            </div>
                        )}
                    </div>
                </section>}
        </>
    )
}

export default EditCompaniesInfo
