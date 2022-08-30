import React, {useState, useEffect} from 'react'
import {Editor} from '@tinymce/tinymce-react'

import {getTimeLine, addTimeLineData, createContent} from '../../../../../services/ApiClient'
import InputWithLabel from '../../../../Form/InputWithLabel/InputWithLabel'
import EditElementsModal from './EditElementsModal/EditelementsModal'
import {useFormState} from '../../../../../hooks/useFormState'
import InputFile from '../../../../Form/InputFile/InputFile'
import Button from '../../../../Form/FormButton/FormButton'
import {app} from '../../../../../services/firebase'
import Loader from '../../../../Loader/Loader'
import './EditTimeline.css'

function EditTimeline() {

    const {state, onBlur, onChange} = useFormState(
        {
            data: {
                year: '',
                imgURL: '',
                desc: '',
            },
            error: {
                year: true,
                imgURL: true,
                desc: true,
            },
            touch: {},
        },
        {
            year: v => v.length,
            imgURL: v => v.length,
            desc: v => v.length,
        }
    )

    const [fileSizeMessage, setFileSizeMessage] = useState('')
    const [registerError, setRegisterError] = useState(null)
    const [imageSuccess, setImageSuccess] = useState('')
    const [isDisabled, setIsDisabled] = useState(false)
    const [timelineData, setTimeLineData] = useState()
    const [modalData, setModalData] = useState()
    const [message, setMessage] = useState('')
    const [bool, setBool] = useState(false)

    const {data, error, touch} = state

    const showModal = (info) => {
        setModalData(info)
        setBool(!bool)
    }

    const contentData = {
        content: '',
        url: '/somos-leti',
        name: 'Somos Leti',
        type: '',
    }

    const addTimeLineItem = async (event) => {
        event.preventDefault()

        if (contentData?.content?.length > 0) {
            contentData.type = `Sobre leti - ${data?.year}`
            createContent(contentData)
        }

        if (error.year === false && error.imgURL === false && error.desc === false) {
            try {
                await addTimeLineData(data)
                    .then(timeline => {
                        setTimeLineData(timeline)
                        setMessage('Data actualizada exitosamente')
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

    const deleteItem = (info) => {
        setTimeLineData(info)
        setBool(!bool)
    }

    const handleDesc = (e) => {
        data.desc = e.target.getContent()
        contentData.content = e.target.getContent({format: "text"})
        error.desc = false
    }

    const onFileSelected = async (e) => {


        // Get file
        const file = e.target.files[0]
        if (file.size > 300000) {
            setImageSuccess('')
            setFileSizeMessage("El tamaño de la imagen excede el máximo permitido (300KB), por favor optimícela y vuelva a intentar")
        } else {
            setIsDisabled(!isDisabled)
            setImageSuccess('')
            // Create storage ref
            const storageRef = app.storage().ref()
            const filePath = storageRef.child('images/' + file.name)

            // Upload file
            await filePath.put(file)
                .then(() => {
                    setImageSuccess("Imagen subida correctamente")
                })
                .catch(err => {console.log(err)})

            // Get file url
            const fileUrl = await filePath.getDownloadURL()
            data.imgURL = fileUrl
            setIsDisabled(false)
            error.imgURL = false
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const getTimeLineData = await getTimeLine()
            setTimeLineData(getTimeLineData)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {isDisabled && <Loader message="Cargando imagen..." />}
            {bool && <EditElementsModal hideModal={() => setBool(!bool)} element={modalData} deleteItem={(updateData) => deleteItem(updateData)} />}
            {timelineData?.length > 0 &&
                <section className="container-fluid EditContent EditContent-timeline">
                    <h2>Editar elemento del timeLine</h2>
                    <div className="row justify-content-around">
                        {timelineData?.map(el =>
                            <div className="col-12 col-sm-1 EditCarousel__edit" onClick={() => showModal(el)}>
                                <img className="EditCarousel__img" src={el.imgURL} onError="this.src = 'https://firebasestorage.googleapis.com/v0/b/grupoleti.appspot.com/o/images%2Fno-image.png?alt=media&token=6e518b16-dc11-46e3-83e8-ae4b84a18293';" alt={el.year} />
                                <p>{el.year}</p>
                            </div>
                        )}
                    </div>
                </section>}
            <section className="container-fluid EditContent">
                <h2>Añadir nuevo elemento al timeline</h2>
                <form className="AdminEdit__form" onSubmit={addTimeLineItem}>
                    <div className="row">
                        <div className="col-12 col-sm-6">
                            <p className="AdminEdit__form__label">
                                Año
                            </p>
                            <InputWithLabel
                                value={data?.year}
                                onBlur={onBlur}
                                onChange={onChange}
                                name="year"
                                type="number"
                                cssStyle={`form-control mb-0 ${touch.year && error.year ? "is-invalid" : ""}`}
                                placeholder="Ingresa año"
                            />
                        </div>
                        <div className="col-12 col-sm-6">
                            <p className="AdminEdit__form__label">
                                Imagen
                            </p>
                            <InputFile
                                value={data?.imgURL}
                                onChange={onFileSelected}
                                id="fileButton"
                                name="picpath"
                                type="file"
                                placeholder="Selecciona una imagen"
                            />
                            {imageSuccess && <span className="AdminEdit__message mt-1">{imageSuccess}</span>}
                        </div>
                        {
                            fileSizeMessage &&
                            <div className="col-12">
                                <small>{fileSizeMessage}</small>
                            </div>
                        }
                        <div className="col-12">
                            <p className="AdminEdit__form__label">
                                Descripción
                            </p>
                            <Editor
                                initialValue={data?.desc}
                                onChange={handleDesc}
                                apiKey={process.env.REACT_APP_API_TINY_CLOUD}
                                init={{
                                    height: 220,
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
                        <div className="col-12">
                            <Button cssStyle="leti-btn AdminEdit__form-leti-btn mt-5" >Añadir nuevo año</Button>
                            {message && <span className="AdminEdit__message">{message}</span>}
                        </div>

                    </div>
                    {registerError && <div className="alert alert-danger">{registerError}</div>}
                </form>
            </section>
        </>
    )
}

export default EditTimeline
