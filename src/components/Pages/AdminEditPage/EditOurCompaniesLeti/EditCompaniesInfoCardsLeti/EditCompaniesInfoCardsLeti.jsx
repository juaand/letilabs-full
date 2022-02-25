import React, {useState, useEffect} from 'react'
import {Editor} from '@tinymce/tinymce-react'

import {getOurCompaniesInfoCardsLeti, createLetiInfoCard} from '../../../../../services/ApiClient'
import InputWithLabel from '../../../../Form/InputWithLabel/InputWithLabel'
import {useFormState} from '../../../../../hooks/useFormState'
import Button from '../../../../Form/FormButton/FormButton'
import EditItemModal from './EditItemModal/EditItemModal'
import './EditCompaniesInfoCardsLeti.css'

function EditCompaniesInfoCardsLeti() {

    const [ourCompaniesOCData, setOurCompaniesOCData] = useState()
    const [modalData, setModalData] = useState()
    const [message, setMessage] = useState('')
    const [bool, setBool] = useState(false)

    const showModal = (info) => {
        setModalData(info)
        setBool(!bool)
    }

    const deleteItem = (info) => {
        setOurCompaniesOCData(info)
        setBool(!bool)
    }

    const hideModal = (info) => {
        setOurCompaniesOCData(info)
        setBool(!bool)
    }

    const {state, onChange} = useFormState(
        {
            data: {
                id: '',
                title: '',
                info: ''
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

    const handleDescription = (e) => {
        data.info = e.target.getContent()
        error.info = false
    }

    const addItem = async (event) => {
        event.preventDefault()

        if (error.title === false && error.info === false) {
            try {
                await createLetiInfoCard(data)
                    .then(info => {
                        setOurCompaniesOCData(info)
                        setMessage('Elemento creado exitosamente')
                    })
                    .catch(error => {
                        setRegisterError(error)
                    })
            } catch (err) {
                setRegisterError(err.response?.data?.message)
            }
        } else {
            setMessage('Por favor rellene todos los campos')
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const getOurCompaniesOCData = await getOurCompaniesInfoCardsLeti()
            setOurCompaniesOCData(getOurCompaniesOCData)

        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {bool && <EditItemModal hideModal={(info) => hideModal(info)} infodata={modalData} deleteItem={(updateData) => deleteItem(updateData)} closeModal={() => setBool(!bool)} />}
            {ourCompaniesOCData?.length > 0 &&
                <section className="container-fluid Letilabs EditContent EditContent-timeline">
                    <h2>Editar InfoCard</h2>
                    <div className="row justify-content-around">
                        {ourCompaniesOCData?.map(el =>
                            <div className="col-sm-3 col-12 EditCarousel__edit" onClick={() => showModal(el)}>
                                <h4>{el?.title}</h4>
                                <p dangerouslySetInnerHTML={{__html: el?.info}} />
                            </div>
                        )}
                    </div>
                    <hr className="mt-5 mb-5" />
                    <form className="AdminEdit__form" onSubmit={addItem}>
                        <div className="row">
                            <h3 className="mt-0">Añadir nuevo objetivo</h3>
                            <div className="col-sm-6 col-12">
                                <p className="AdminEdit__form__label">
                                    Título
                                </p>
                                <InputWithLabel
                                    value={data.title}
                                    onChange={onChange}
                                    name="title"
                                    type="text"
                                    cssStyle="form-control"
                                    placeholder="Añadir título"
                                />
                            </div>
                            <div className="col-sm-6 col-12">
                                <p className="AdminEdit__form__label">
                                    Descripción
                                </p>
                                <Editor
                                    initialValue=""
                                    onChange={handleDescription}
                                    apiKey={process.env.REACT_APP_API_TINY_CLOUD}
                                    init={{
                                        height: 180,
                                        menubar: false,
                                        plugins: [
                                            'advlist autolink lists link image',
                                            'charmap print preview anchor help',
                                            'searchreplace visualblocks code',
                                            'insertdatetime media table paste wordcount'
                                        ],
                                        toolbar:
                                            'bold',
                                    }}
                                />
                            </div>
                            <div className="col-12 col-sm-6">
                                <Button type="submit" cssStyle="leti-btn">Crear objetivo</Button>
                                {message && <span className="AdminEdit__message">{message}</span>}
                            </div>
                        </div>
                        {registerError && <div className="alert alert-danger">{registerError}</div>}
                    </form>
                </section>}
        </>
    )
}

export default EditCompaniesInfoCardsLeti
