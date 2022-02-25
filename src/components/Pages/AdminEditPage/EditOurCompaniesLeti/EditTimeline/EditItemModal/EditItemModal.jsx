import React, {useState} from 'react'
import {Editor} from '@tinymce/tinymce-react'
import {Fade} from 'react-awesome-reveal'

import {deleteTimelineLeti, updateTimeLineLetiData} from '../../../../../../services/ApiClient'
import InputWithLabel from '../../../../../Form/InputWithLabel/InputWithLabel'
import {useFormState} from '../../../../../../hooks/useFormState'
import InputFile from '../../../../../Form/InputFile/InputFile'
import Button from '../../../../../Form/FormButton/FormButton'
import {app} from '../../../../../../services/firebase'
import Loader from '../../../../../Loader/Loader'
import './EditItemModal.css'

function EditItemModal({deleteItem, infodata, hideModal, closeModal}) {

    const [timelineData, setTimelineData] = useState(infodata)
    const [imageSuccess, setImageSuccess] = useState('')
    const [isDisabled, setIsDisabled] = useState(false)
    const [message, setMessage] = useState('')

    const {state, onChange} = useFormState(
        {
            data: {
                id: timelineData._id,
                imgURL: timelineData.imgURL,
                desc: timelineData.desc,
                button: timelineData.button,
                url: timelineData.url,
            },
            error: {
                imgURL: true,
                desc: true,
                button: true,
                url: true,
            },
            touch: {},
        },
        {
            imgURL: v => v.length,
            desc: v => v.length,
            button: v => v.length,
            url: v => v.length,
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
        data.imgURL = fileUrl
        setIsDisabled(false)
        error.imgURL = false
    }

    const updateInfo = async (event) => {
        event.preventDefault()

        if (Object.values(error).map(el => el).includes(false)) {
            try {
                await updateTimeLineLetiData(data)
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

    const handleDescription = (e) => {
        data.desc = e.target.getContent()
        error.desc = false
    }

    const deleteSelected = async (id) => {
        const updatedData = await deleteTimelineLeti(id)
        deleteItem(updatedData)
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
                                                background: `url(${timelineData?.imgURL}) no-repeat center center / cover`,
                                            }}></div>
                                            <h1 className="DeleteItemModal__ask">Editar elemento</h1>
                                        </div>
                                        <div className="col-12">
                                            <p className="AdminEdit__form__label">
                                                Editar imagen
                                            </p>
                                            <InputFile
                                                value={data?.imgURL}
                                                onChange={onFileSelected}
                                                id="fileButton"
                                                name="imgURL"
                                                type="file"
                                                placeholder={timelineData?.imgURL}
                                                classStyle="mb-0"
                                            />
                                            {imageSuccess && <span className="AdminEdit__message mt-1">{imageSuccess}</span>}
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <p className="AdminEdit__form__label">
                                                Texto botón
                                            </p>
                                            <InputWithLabel
                                                value={data?.button}
                                                onChange={onChange}
                                                name="button"
                                                type="text"
                                                cssStyle="form-control mb-0"
                                                placeholder="Ingresa texto del botón"
                                            />
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <p className="AdminEdit__form__label">
                                                URL botón
                                            </p>
                                            <InputWithLabel
                                                value={data?.url}
                                                onChange={onChange}
                                                name="url"
                                                type="text"
                                                cssStyle="form-control mb-0"
                                                placeholder="Ingresa url del botón"
                                            />
                                        </div>
                                        <div className="col-12">
                                            <p className="AdminEdit__form__label mt-5">
                                                Editar descripción
                                            </p>
                                            <Editor
                                                initialValue={timelineData?.desc}
                                                onChange={handleDescription}
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
                                        <div className="col-12 col-sm-6">
                                            <Button type="submit" cssStyle="leti-btn">Guardar cambios</Button>
                                        </div>
                                        <div className="col-12 col-sm-6 d-flex justify-content-end">
                                            <div onClick={() => deleteSelected(timelineData?._id)} className="leti-btn delete">Eliminar elemento</div>
                                        </div>
                                        {message &&
                                            <div className="row">
                                                <span className="AdminEdit__message col-12 m-0">{message}</span>
                                            </div>
                                        }
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