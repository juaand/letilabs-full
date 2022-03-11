import React, {useState, useEffect} from 'react'
import {Editor} from '@tinymce/tinymce-react'

import {getCarrouselBiocontrolled, addCarrouselBiocontrolledData, updateBioCarrouselTitle, createContent} from '../../../../../services/ApiClient'
import InputWithLabel from '../../../../Form/InputWithLabel/InputWithLabel'
import {useFormState} from '../../../../../hooks/useFormState'
import Button from '../../../../Form/FormButton/FormButton'
import EditItemModal from './EditItemModal/EditItemModal'

function EditTimelineBiocontrolled() {

    const [carouselManufactureData, setCarouselManufactureData] = useState([])
    const [goalMessage, setGoalMessage] = useState('')
    const [modalData, setModalData] = useState([])
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
                await updateBioCarrouselTitle(data)
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
        url: '/biocontrolled',
        name: 'Biocontrolled',
        type: `Biocontrolled ${data?.info}`,
    }

    const addGoal = async (event) => {
        event.preventDefault()
        data.title = carouselManufactureData[0]?.title

        if (contentData.content.length > 0) {
            createContent(contentData)
        }

        if (error.info === false) {
            try {
                await addCarrouselBiocontrolledData(data)
                    .then(info => {
                        setCarouselManufactureData(info)
                        setGoalMessage('Logro añadido exitosamente')
                    })
                    .catch(error => {
                        setRegisterError(error)
                    })
            } catch (err) {
                setRegisterError(err.response?.data?.message)
            }
        } else {
            setGoalMessage('Por añada un logro.')
        }
    }

    const handleChange = (e) => {
        data.title = e.target.getContent()
        error.title = false
    }

    useEffect(() => {
        const fetchData = async () => {
            const getOurCarouselManufactureData = await getCarrouselBiocontrolled()
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
                    <h2>Logros</h2>
                    <div className="row justify-content-around">
                        <form className="AdminEdit__form" onSubmit={updateInfo}>
                            <div className="row">
                                <h3 className="mt-5">Editar título Logros</h3>
                                <div className="col-12">
                                    <Editor
                                        initialValue={carouselManufactureData[0]?.title}
                                        onChange={handleChange}
                                        apiKey={process.env.REACT_APP_API_TINY_CLOUD}
                                        init={{
                                            height: 120,
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
                                    <Button type="submit" cssStyle="leti-btn">Editar título</Button>
                                    {message && <span className="AdminEdit__message ">{message}</span>}
                                </div>
                            </div>

                            <hr className="mt-5 mb-5" />

                            {registerError && <div className="alert alert-danger">{registerError}</div>}
                        </form>
                        <h3 className="mb-5">Editar Logros</h3>
                        {carouselManufactureData?.map(el =>
                            <div className="col-sm-3 col-12 EditCarousel__edit logros" onClick={() => showModal(el)}>
                                <p>{el?.info}</p>
                            </div>
                        )}
                        <hr className="mt-5 mb-5" />
                        <h3>Añadir nuevo logro</h3>
                        <form className="AdminEdit__form" onSubmit={addGoal}>
                            <div className="row">
                                <div className="col-12">
                                    <InputWithLabel
                                        value={data.info}
                                        label="Descripción del logro"
                                        onChange={onChange}
                                        name="info"
                                        type="text"
                                        cssStyle="form-control mb-5"
                                        placeholder="Añada descripción del logro"
                                    />
                                </div>
                                <div className="col-12 col-sm-6">
                                    <Button type="submit" cssStyle="leti-btn">Añadir logro</Button>
                                    {goalMessage && <span className="AdminEdit__message ">{goalMessage}</span>}
                                </div>
                            </div>
                        </form>
                    </div>
                </section>
            }
        </>
    )
}

export default EditTimelineBiocontrolled
