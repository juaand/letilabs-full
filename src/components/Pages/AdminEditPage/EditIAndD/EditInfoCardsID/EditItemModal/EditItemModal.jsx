import React, {useState} from 'react'
import {Editor} from '@tinymce/tinymce-react'
import {Fade} from 'react-awesome-reveal'

import './EditItemModal.css'
import {updateInfoCardsIdData} from '../../../../../../services/ApiClient'
import InputWithLabel from '../../../../../Form/InputWithLabel/InputWithLabel'
import {useFormState} from '../../../../../../hooks/useFormState'
import InputFile from '../../../../../Form/InputFile/InputFile'
import Button from '../../../../../Form/FormButton/FormButton'
import {app} from '../../../../../../services/firebase'
import Loader from '../../../../../Loader/Loader'

function EditItemModal({infodata, hideModal, closeModal}) {

    console.log('infodata', infodata)

    const [timelineData, setTimelineData] = useState(infodata)
    const [imageSuccess, setImageSuccess] = useState('')
    const [isDisabled, setIsDisabled] = useState(false)
    const [message, setMessage] = useState('')

    const {state, onChange} = useFormState(
        {
            data: {
                id: timelineData?._id,
                title: timelineData?.title,
                picPath: timelineData?.picPath,
                info: timelineData?.info,
            },
            error: {
                picPath: true,
                info: true,
                title: true,
            },
            touch: {},
        },
        {
            picPath: v => v.length,
            info: v => v.length,
            title: v => v.length,
        }
    )

    const {data, error} = state
    const [registerError, setRegisterError] = useState(null)

    const onFileSelected = async (e) => {
        setMessage('')
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
        data.picPath = fileUrl
        setIsDisabled(false)
        error.picPath = false
    }

    const updateInfo = async (event) => {
        event.preventDefault()

        if (Object.values(error).map(el => el).includes(false)) {
            try {
                await updateInfoCardsIdData(data)
                    .then(info => {
                        setTimelineData(info)
                        setMessage('Data atualizada exitosamente')
                        hideModal(info)
                    })
                    .catch(error => {
                        setRegisterError(error)
                    })
            } catch (err) {
                setRegisterError(err.response?.data?.message)
            }
        } else {
            setMessage('Por favor edite alguno de los campos')
        }
    }

    const handleInfo = (e) => {
        data.info = e.target.getContent()
        error.info = false
    }


    return (
        <>
            {isDisabled && <Loader message="Cargando imagen..." />}
            <div className="EditItemModal">
                <div className="container">
                    <div className="row justify-content-center">
                        <Fade direction="down" className="col-11 col-sm-6 EditItemModal__container">
                            <>
                                <span className="EditItemModal__close" onClick={closeModal}></span>
                                <form className="AdminEdit__form" onSubmit={updateInfo}>
                                    <div className="row">
                                        <div className="col-sm-12 ShowEditModal__thumbnail mb-5">
                                            <div className="ShowEditModal__thumbnail-img" style={{
                                                background: `url(${data?.picPath}) no-repeat center center / cover`,
                                            }}></div>
                                            <h1 className="DeleteItemModal__ask">Editar elemento
                                                <span class="ShowEditModal__news-title">{timelineData?.title}</span></h1>
                                        </div>
                                        <div className="col-12">
                                            <p className="AdminEdit__form__label">
                                                Título
                                            </p>
                                            <InputWithLabel
                                                value={data?.title}
                                                onChange={onChange}
                                                name="title"
                                                type="text"
                                                cssStyle="form-control"
                                                placeholder={timelineData?.title}
                                            />
                                        </div>
                                        <div className="col-12">
                                            <p className="AdminEdit__form__label">
                                                Editar imagen
                                            </p>
                                            <InputFile
                                                value={data?.picPath}
                                                onChange={onFileSelected}
                                                id="fileButton"
                                                name="picPath"
                                                type="file"
                                                placeholder={timelineData?.picPath}
                                                classStyle="mb-0"
                                            />
                                            {imageSuccess && <span className="AdminEdit__message mt-1">{imageSuccess}</span>}
                                        </div>
                                        <div className="col-12">
                                            <p className="AdminEdit__form__label mt-5">
                                                Editar descripción
                                            </p>
                                            <Editor
                                                initialValue={timelineData?.info}
                                                onChange={handleInfo}
                                                apiKey={process.env.REACT_APP_API_TINY_CLOUD}
                                                init={{
                                                    height: 200,
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
                                        <div className="col-12 mt-0">
                                            <Button type="submit" cssStyle="leti-btn">Guardar cambios</Button>
                                            {message && <span className="AdminEdit__message">{message}</span>}
                                        </div>
                                    </div>
                                    {registerError && <div className="alert alert-danger">{registerError}</div>}
                                </form>
                            </>
                        </Fade>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditItemModal
