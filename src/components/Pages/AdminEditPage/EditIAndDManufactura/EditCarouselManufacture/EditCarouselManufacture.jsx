import React, {useState, useEffect} from 'react'

import InputWithLabel from '../../../../Form/InputWithLabel/InputWithLabel'
import {getCarouselManufacture, updateTitleProccess} from '../../../../../services/ApiClient'
import {useFormState} from '../../../../../hooks/useFormState'
import Button from '../../../../Form/FormButton/FormButton'
import EditItemModal from './EditItemModal/EditItemModal'

function EditCarouselManufacture() {

    const [carouselManufactureData, setCarouselManufactureData] = useState([])
    const [modalData, setModalData] = useState([])
    const [message, setMessage] = useState('')
    const [bool, setBool] = useState(false)

    const {state, onChange} = useFormState(
        {
            data: {
                title: '',
                picPath: '',
            },
            error: {
                title: true,
                picPath: true,
            },
            touch: {},
        },
        {
            title: v => v.length,
            picPath: v => v.length,
        }
    )

    const {data, error} = state
    const [registerError, setRegisterError] = useState(null)

    const showModal = (data) => {
        setModalData(data)
        setBool(!bool)
    }

    const deleteItem = (data) => {
        setCarouselManufactureData(data)
        setBool(!bool)
    }

    const updateInfo = async (event) => {
        event.preventDefault()

        if (error.title === false) {
            try {
                await updateTitleProccess(data)
                    .then(info => {
                        setCarouselManufactureData(info)
                        setMessage('Título atualizado exitosamente')
                    })
                    .catch(error => {
                        setRegisterError(error)
                    })
            } catch (err) {
                setRegisterError(err.response?.data?.message)
            }
        } else {
            setMessage('Por favor edite el campo')
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const getOurCarouselManufactureData = await getCarouselManufacture()
            setCarouselManufactureData(getOurCarouselManufactureData)

        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {bool && <EditItemModal hideModal={() => setBool(!bool)} infodata={modalData} deleteItem={(updateData) => deleteItem(updateData)} closeModal={() => setBool(!bool)} />}
            {carouselManufactureData?.length > 0 &&

                <section className="container-fluid  EditContent EditContent-timeline pt-0">
                    <h2>Procesos</h2>
                    <div className="row justify-content-around">
                        <form className="AdminEdit__form" onSubmit={updateInfo}>
                            <div className="row">
                                <h3 className="mt-5">Editar título procesos</h3>
                                <div className="col-12">
                                    <InputWithLabel
                                        value={data.title}
                                        label="Título carrusel"
                                        onChange={onChange}
                                        name="title"
                                        type="text"
                                        cssStyle="form-control mb-5"
                                        placeholder={carouselManufactureData[0]?.title}
                                    />
                                </div>
                                <div className="col-12 col-sm-6">
                                    <Button type="submit" cssStyle="leti-btn">Editar título</Button>
                                    {message && <span className="AdminEdit__message ">{message}</span>}
                                </div>
                            </div>

                            <hr className="mt-5 mb-5"/>
                            
                            {registerError && <div className="alert alert-danger">{registerError}</div>}
                        </form>
                        <h3 className="mb-5">Editar Procesos</h3>
                        {carouselManufactureData?.map(el =>
                            <div className="col-3 EditCarousel__edit logros" onClick={() => showModal(el)}>
                                <p>{el?.info}</p>
                            </div>
                        )}
                    </div>
                </section>
            }
        </>
    )
}

export default EditCarouselManufacture
