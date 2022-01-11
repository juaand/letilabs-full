import React, {useState, useEffect} from 'react'
import {useFormState} from '../../../../../hooks/useFormState'
import {getOurCompaniesOC, updateOurCompaniesOC} from '../../../../../services/ApiClient'
import InputWithLabel from '../../../../Form/InputWithLabel/InputWithLabel'
import Button from '../../../../Form/FormButton/FormButton'
import DeleteItemModal from '../../EditHome/EditCarousel/DeleteItemModal/DeleteItemModal'

function EditCompaniesInfo() {

    const {state, onBlur, onChange} = useFormState(
        {
            data: {
                name: '',
                logo: '',
                url: '',
                info: '',
            },
            error: {
                name: false,
                logo: false,
                url: false,
                info: false,
            },
            touch: {},
        },
        {
            name: v => v.length,
            logo: v => v.length,
            url: v => v.length,
            info: v => v.length,
        }
    )

    const {data, error, touch} = state
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
                <section className="container-fluid EditContent">
                    <h2>Editar compañía</h2>
                    <div className="row justify-content-around">
                        {ourCompaniesOCData?.map(el =>
                            <div className="col-1 EditCarousel__trash" onClick={() => showModal(el)}>
                                <img className="EditCarousel__img" src={"./images/" + el.logo.toLowerCase() + ".svg"} alt={el.logo} />
                                <p>{el.url}</p>
                                <p>{el.info}</p>
                            </div>
                        )}
                    </div>
                </section>}
        </>
    )
}

export default EditCompaniesInfo
