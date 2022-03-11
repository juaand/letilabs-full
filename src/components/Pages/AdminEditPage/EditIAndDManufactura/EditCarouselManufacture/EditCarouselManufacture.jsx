import React, {useState, useEffect} from 'react'

import {getCarouselManufacture, updateTitleProccess, createProccess, createContent} from '../../../../../services/ApiClient'
import InputWithLabel from '../../../../Form/InputWithLabel/InputWithLabel'
import Button from '../../../../Form/FormButton/FormButton'
import EditItemModal from './EditItemModal/EditItemModal'

import {useFormState} from '../../../../../hooks/useFormState'

function EditCarouselManufacture() {

    const [carouselManufactureData, setCarouselManufactureData] = useState([])
    const [modalData, setModalData] = useState([])

    const [proccesMessage, setProccesMessage] = useState('')
    const [message, setMessage] = useState('')

    const [bool, setBool] = useState(false)

    const {state, onChange} = useFormState(
        {
            data: {
                title: '',
                info: '',
            },
            error: {
                title: true,
                info: true,
            },
            touch: {},
        },
        {
            title: v => v.length,
            info: v => v.length,
        }
    )

    const {data, error} = state
    const [registerError, setRegisterError] = useState(null)

    const showModal = (info) => {
        setModalData(info)
        setBool(!bool)
    }

    const hideModal = (info) => {
        setCarouselManufactureData(info)
        setBool(!bool)
    }

    const deleteItem = (info) => {
        setCarouselManufactureData(info)
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

    const contentData = {
        content: data?.info,
        url: '/manufactura',
        name: 'Manufactura',
        type: '',
    }

    const addProccess = async (event) => {
        event.preventDefault()
        data.title = carouselManufactureData[0]?.title

        if (contentData?.content?.length > 0) {
            contentData.type = `Manufactura ${data?.info}`
            createContent(contentData)
        }

        if (error.info === false) {
            try {
                await createProccess(data)
                    .then(info => {
                        setCarouselManufactureData(info)
                        setProccesMessage('Proceso añadido exitosamente')
                    })
                    .catch(error => {
                        setRegisterError(error)
                    })
            } catch (err) {
                setRegisterError(err.response?.data?.message)
            }
        } else {
            setProccesMessage('Por favor añada un proceso.')
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
            {bool && <EditItemModal hideModal={(info) => hideModal(info)} infodata={modalData} deleteItem={(updateData) => deleteItem(updateData)} closeModal={() => setBool(!bool)} />}
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

                            <hr className="mt-5 mb-5" />

                            {registerError && <div className="alert alert-danger">{registerError}</div>}
                        </form>
                        <h3 className="mb-5">Editar procesos</h3>
                        {carouselManufactureData?.map(el =>
                            <div className="col-sm-3 col-12 EditCarousel__edit logros" onClick={() => showModal(el)}>
                                <p dangerouslySetInnerHTML={{__html: el.info}} />
                            </div>
                        )}
                        <hr className="mt-5 mb-5" />
                        <h3>Añadir nuevo proceso</h3>
                        <form className="AdminEdit__form" onSubmit={addProccess}>
                            <div className="row">
                                <div className="col-12">
                                    <InputWithLabel
                                        value={data.info}
                                        label="Descripción del proceso"
                                        onChange={onChange}
                                        name="info"
                                        type="text"
                                        cssStyle="form-control mb-5"
                                        placeholder="Añada descripción del proceso"
                                    />
                                </div>
                                <div className="col-12 col-sm-6">
                                    <Button type="submit" cssStyle="leti-btn">Añadir proceso</Button>
                                    {proccesMessage && <span className="AdminEdit__message ">{proccesMessage}</span>}
                                </div>
                            </div>
                        </form>
                    </div>
                </section>
            }
        </>
    )
}

export default EditCarouselManufacture
