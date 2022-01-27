import React, {useState, useEffect} from 'react'
import {useFormState} from '../../../../../hooks/useFormState'
import {getCarrouselBiocontrolled, addCarrouselBiocontrolledData} from '../../../../../services/ApiClient'
import InputWithLabel from '../../../../Form/InputWithLabel/InputWithLabel'
import Button from '../../../../Form/FormButton/FormButton'
import DeleteItemModal from '../../EditOurCompaniesBiocontrolled/EditCarrousel/DeleteItemModal/DeleteItemModal'

function EditCarrouselBiocontrolled() {

    const {state, onBlur, onChange} = useFormState(
        {
            data: {
                info: '',
            },
            error: {
                info: false,
            },
            touch: {},
        },
        {
            info: v => v.length,
        }
    )

    const {data, error, touch} = state
    const [registerError, setRegisterError] = useState(null)
    const [modalData, setModalData] = useState()
    const [carrouselData, setCarrouselData] = useState()
    const [bool, setBool] = useState(false)

    const showModal = (data) => {
        setModalData(data)
        setBool(!bool)
    }

    const addCarrouselItem = async (event) => {
        event.preventDefault()

        try {
            await addCarrouselBiocontrolledData(data)
                .then(carrousel => {
                    setCarrouselData(carrousel)
                })
                .catch(error => {
                    setRegisterError(error)
                })
        } catch (err) {
            setRegisterError(err.response?.data?.message)
        }
    }

    const deleteItem = (data) => {
        setCarrouselData(data)
        setBool(!bool)
    }

    useEffect(() => {
        const fetchData = async () => {
            const getCarrouselData = await getCarrouselBiocontrolled()
            setCarrouselData(getCarrouselData)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {bool && <DeleteItemModal hideModal={() => setBool(!bool)} data={modalData} deleteItem={(updateData) => deleteItem(updateData)} />}
            {carrouselData?.length > 0 &&
                <section className="container-fluid EditContent">
                    <h2>Elminar elemento del Carrousel</h2>
                    <div className="row justify-content-around">
                        {carrouselData?.map(el =>
                            <div className="col-1 EditCarousel__trash" onClick={() => showModal(el)}>
                                <p>{el?.info}</p>
                            </div>
                        )}
                    </div>
                </section>}
            <section className="container-fluid EditContent">
                <h2>Añadir nuevo elemento al Carrousel</h2>
                <form className="AdminEdit__form" onSubmit={addCarrouselItem}>
                    <div className="row">
                        <div className="col-12 col-sm-4">
                            <p className="AdminEdit__form__label">
                                información
                            </p>
                            <InputWithLabel
                                value={data?.info}
                                onBlur={onBlur}
                                onChange={onChange}
                                name="info"
                                type="text"
                                className={`form-control ${touch.info && error.info ? "is-invalid" : ""}`}
                                placeholder="Ingresa información"
                            />
                        </div>
                        <div className="col-12">
                            <Button className="leti-btn AdminEdit__form-leti-btn" >Añadir nuevo elemento</Button>
                        </div>

                    </div>
                    {registerError && <div className="alert alert-danger">{registerError}</div>}
                </form>
            </section>
        </>
    )
}

export default EditCarrouselBiocontrolled
