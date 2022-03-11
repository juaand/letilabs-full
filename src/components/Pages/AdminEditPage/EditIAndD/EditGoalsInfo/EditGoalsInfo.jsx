import React, {useState, useEffect} from 'react'
import {Editor} from '@tinymce/tinymce-react'

import {getGoalsIdData, updateGoalsTitle, createIDGoal, createContent} from '../../../../../services/ApiClient'
import InputWithLabel from '../../../../Form/InputWithLabel/InputWithLabel'
import {useFormState} from '../../../../../hooks/useFormState'
import Button from '../../../../Form/FormButton/FormButton'
import EditItemModal from './EditItemModal/EditItemModal'


function EditGoalsInfo() {

    const [newItemMessage, setNewItemMessage] = useState('')
    const [ourGoalsData, setOurGoalsData] = useState([])
    const [modalData, setModalData] = useState([])
    const [message, setMessage] = useState('')
    const [bool, setBool] = useState(false)

    const {state, onChange} = useFormState(
        {
            data: {
                id: '',
                title: ourGoalsData[0]?.title,
                name:'',
                desc:''
            },
            error: {
                title: true,
                name: true,
                desc: true,
            },
            touch: {},
        },
        {
            title: v => v.length,
            name: v => v.length,
            desc: v => v.length,
        }
    )

    const {data, error} = state
    const [registerError, setRegisterError] = useState(null)

    const showModal = (info) => {
        setModalData(info)
        setBool(!bool)
    }

    const deleteItem = (info) => {
        setOurGoalsData(info)
        setBool(!bool)
    }

    const hideModal = (info) => {
        setOurGoalsData(info)
        setBool(!bool)
    }

    const handleDescription = (e) => {
        data.desc = e.target.getContent()
        contentData.content = e.target.getContent({format: "text"})
        error.desc = false
    }

    const updateInfo = async (event) => {
        event.preventDefault()

        if (error.title === false) {
            try {
                await updateGoalsTitle(data)
                    .then(info => {
                        setOurGoalsData(info)
                        setMessage('Título atualizado exitosamente')
                    })
                    .catch(error => {
                        setRegisterError(error)
                    })
            } catch (err) {
                setRegisterError(err.response?.data?.message)
            }
        } else {
            setMessage('Por favor edite el título')
        }
    }

    const contentData = {
        content: '',
        url: '/investigacion-y-desarrollo',
        name: 'Investigación y desarrollo',
        type: '',
    }

    const addItem = async (event) => {
        event.preventDefault()
        data.title = ourGoalsData[0]?.title

        if (contentData.content.length > 0) {
            contentData.type = `I&D ${data?.name}`
            createContent(contentData)
        }

        if (error.name === false && error.desc === false) {
            try {
                await createIDGoal(data)
                    .then(info => {
                        setOurGoalsData(info)
                        setNewItemMessage('Elemento creado exitosamente')
                    })
                    .catch(error => {
                        setRegisterError(error)
                    })
            } catch (err) {
                setRegisterError(err.response?.data?.message)
            }
        } else {
            setNewItemMessage('Por favor rellene todos los campos')
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const getOurGoalsOCData = await getGoalsIdData()
            setOurGoalsData(getOurGoalsOCData)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {bool && <EditItemModal hideModal={(info) => hideModal(info)} infodata={modalData} deleteItem={(updateData) => deleteItem(updateData)} closeModal={() => setBool(!bool)} />}
            {ourGoalsData?.length > 0 &&
                <section className="container-fluid Letilabs EditContent EditContent-timeline pt-0">
                    <form className="AdminEdit__form" onSubmit={updateInfo}>
                        <div className="row">
                            <h3 className="mt-5">Editar título carrusel</h3>
                            <div className="col-12">
                                <InputWithLabel
                                    value={data.title}
                                    label="Título carrusel"
                                    onChange={onChange}
                                    name="title"
                                    type="text"
                                    cssStyle="form-control mb-5"
                                    placeholder={ourGoalsData[0]?.title}
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
                    <h2>Editar objetivos</h2>
                    <div className="row justify-content-around">
                    <h3 className="mb-5">Editar objetivo</h3>
                        {ourGoalsData?.map(el =>
                            <div className="col-sm-3 col-12 EditCarousel__edit" onClick={() => showModal(el)}>
                                <h4>{el?.name}</h4>
                                <p dangerouslySetInnerHTML={{__html: el?.desc}} />
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
                                    value={data.name}
                                    onChange={onChange}
                                    name="name"
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
                                {newItemMessage && <span className="AdminEdit__message ">{newItemMessage}</span>}
                            </div>
                        </div>
                    </form>
                </section>}
        </>
    )
}

export default EditGoalsInfo
