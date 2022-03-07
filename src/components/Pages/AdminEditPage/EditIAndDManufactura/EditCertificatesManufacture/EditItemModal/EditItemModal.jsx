import React, {useState} from 'react'
import {Fade} from 'react-awesome-reveal'

import {updateCertificatesImage, deleteCertificate} from '../../../../../../services/ApiClient'
import {useFormState} from '../../../../../../hooks/useFormState'
import {app} from '../../../../../../services/firebase'

import Button from '../../../../../Form/FormButton/FormButton'
import './EditItemModal.css'
import InputFile from '../../../../../Form/InputFile/InputFile'
import Loader from '../../../../../Loader/Loader'

function EditItemModal({infodata, hideModal, closeModal}) {

    console.log('infodata', infodata)

    const [isDisabled, setIsDisabled] = useState(false)
    const [disabled, setDisabled] = useState(true)

    const [imageSuccess, setImageSuccess] = useState('')
    const [message, setMessage] = useState('')

    const {state} = useFormState(
        {
            data: {
                id: infodata?._id,
                imgUrl: infodata?.imgUrl,
            },
            error: {
                imgUrl: true
            },
            touch: {},
        },
        {
            imgUrl: v => v.length
        }
    )

    const {data, error} = state
    const [registerError, setRegisterError] = useState(null)

    const updateInfo = async (event) => {
        event.preventDefault()
        data.id = infodata?._id

        if (Object.values(error).map(el => el).includes(false)) {
            try {
                await updateCertificatesImage(data)
                    .then(info => {
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
            setMessage('Por favor edite la imagen')
        }
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
                setDisabled(!disabled)
            })
            .catch(err => {console.log(err)})


        // Get file url
        const fileUrl = await filePath.getDownloadURL()
        data.imgURL = fileUrl
        setIsDisabled(false)
        error.imgURL = false
    }

    const deleteSelected = async (id) => {
        const updatedData = await deleteCertificate(id)
        hideModal(updatedData)
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
                                        <div className="col-sm-12">
                                            <h1 className="DeleteItemModal__ask">Editar certificado</h1>
                                        </div>
                                        <div className="col-12">
                                            <img src={infodata?.imgURL} onError="this.src = 'https://firebasestorage.googleapis.com/v0/b/grupo-leti-fd84e.appspot.com/o/images%2Fno-image.png?alt=media&token=73bf7cd8-629d-4deb-b281-9e629fbfb752';" alt={infodata?.title} width="15%" />
                                            <InputFile
                                                value={infodata?.imgURL}
                                                onChange={onFileSelected}
                                                id="fileButton"
                                                name="picpath"
                                                type="file"
                                                placeholder="Selecciona una imagen"
                                            />
                                            {imageSuccess && <span className="AdminEdit__message mt-1">{imageSuccess}</span>}
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <Button type="submit" cssStyle="leti-btn">Guardar cambios</Button>
                                        </div>
                                        <div className="col-12 col-sm-6 d-flex justify-content-end">
                                            <div onClick={() => deleteSelected(infodata?._id)} className="leti-btn delete">Eliminar certificado</div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        {message && <span className="AdminEdit__message m-0">{message}</span>}
                                        {registerError && <div className="alert alert-danger">{registerError}</div>}
                                    </div>
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


