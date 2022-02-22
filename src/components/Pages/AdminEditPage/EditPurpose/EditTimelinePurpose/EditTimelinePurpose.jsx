import React, {useState, useEffect} from 'react'
import {Editor} from '@tinymce/tinymce-react'

import {getTimeLinePurpose, addTimeLinePurposeData} from '../../../../../services/ApiClient'
import {useFormState} from '../../../../../hooks/useFormState'
import InputFile from '../../../../Form/InputFile/InputFile'
import Button from '../../../../Form/FormButton/FormButton'
import EditItemModal from './EditItemModal/EditItemModal'
import {app} from '../../../../../services/firebase'
import Loader from '../../../../Loader/Loader'

function EditTimelinePurpose() {

    const [registerError, setRegisterError] = useState(null)
    const [imageSuccess, setImageSuccess] = useState('')
    const [isDisabled, setIsDisabled] = useState(false)
    const [timelineData, setTimeLineData] = useState()
    const [modalData, setModalData] = useState()
    const [message, setMessage] = useState('')
    const [bool, setBool] = useState(false)

    const {state} = useFormState(
        {
            data: {
                imgURL: timelineData?.imgURL,
                desc: timelineData?.desc,
            },
            error: {
                imgURL: true,
                desc: true,
            },
            touch: {},
        },
        {
            imgURL: v => v.length,
            desc: v => v.length,
        }
    )
    const {data, error} = state

    const handleDesc = (e) => {
        data.desc = e.target.getContent()
        error.desc = false
    }

    const onFileSelected = async (e) => {
        setIsDisabled(!isDisabled)

        // Get file
        const file = e.target.files[0]

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

    const showModal = (data) => {
        setModalData(data)
        setBool(!bool)
    }

    const addTimeLineItem = async (event) => {
        setMessage('')
        event.preventDefault()

        if (error.imgURL === false && error.desc === false) {
            try {
                await addTimeLinePurposeData(data)
                    .then(timeline => {
                        setTimeLineData(timeline)
                    })
                    .catch(error => {
                        setRegisterError(error)
                    })
            } catch (err) {
                setRegisterError(err.response?.data?.message)
            }
        } else {
            setMessage('Por favor rellene ambos campos')
        }
    }

    const deleteItem = (data) => {
        setTimeLineData(data)
        setBool(!bool)
    }

    const hideModal = (info) => {
        setTimeLineData(info)
        setBool(!bool)
    }

    useEffect(() => {
        const fetchData = async () => {
            const getTimeLineData = await getTimeLinePurpose()
            setTimeLineData(getTimeLineData)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {isDisabled && <Loader message="Cargando imagen..." />}
            {bool && <EditItemModal hideModal={(info) => hideModal(info)} infodata={modalData} deleteItem={(updateData) => deleteItem(updateData)} closeModal={() => setBool(!bool)} />}
            {timelineData?.length > 0 &&
                <section className="container-fluid EditContent EditContent-timeline">
                    <h2>Editar elemento del timeLine</h2>
                    <div className="row justify-content-around">
                        {timelineData?.map(el =>
                            <div className="col-4 EditCarousel__edit" onClick={() => showModal(el)}>
                                <img className="EditCarousel__img" src={el?.imgURL} onerror="this.src = 'https://firebasestorage.googleapis.com/v0/b/grupo-leti-fd84e.appspot.com/o/images%2Fno-image.png?alt=media&token=73bf7cd8-629d-4deb-b281-9e629fbfb752';" alt={el?.imgURL} />
                                <h4 className="EditContent__boldtitle" dangerouslySetInnerHTML={{__html: el?.desc}} />
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
                                Imagen
                            </p>
                            <InputFile
                                classStyle="mb-0"
                                value={data?.imgURL}
                                onChange={onFileSelected}
                                id="fileButton"
                                name="imgURL"
                                type="file"
                                placeholder={timelineData?.imgURL}
                            />
                            {imageSuccess && <span className="AdminEdit__message mt-1">{imageSuccess}</span>}
                        </div>
                        <div className="col-12 col-sm-6">
                            <p className="AdminEdit__form__label">
                                Descripción
                            </p>
                            <Editor
                                initialValue={data?.desc}
                                onChange={handleDesc}
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
                        <div className="col-12">
                            <Button cssStyle="leti-btn AdminEdit__form-leti-btn" >Añadir nuevo elemento</Button>
                            {message && <span className="AdminEdit__message">{message}</span>}
                        </div>

                    </div>
                    {registerError && <div className="alert alert-danger">{registerError}</div>}
                </form>
            </section>
        </>
    )
}

export default EditTimelinePurpose
