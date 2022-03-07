import React, {useState} from 'react'
import {Fade} from 'react-awesome-reveal'

import './EditItemModal.css'
import {deleteOPPillar, updateOPPillar} from '../../../../../../services/ApiClient'
import InputFile from '../../../../../Form/InputFile/InputFile'
import {app} from '../../../../../../services/firebase'
import {useFormState} from '../../../../../../hooks/useFormState'
import InputWithLabel from '../../../../../Form/InputWithLabel/InputWithLabel'
import Button from '../../../../../Form/FormButton/FormButton'
import Loader from '../../../../../Loader/Loader'

function EditItemModal({deleteItem, infodata, hideModal, closeModal}) {

    const [imageSuccess, setImageSuccess] = useState('')
    const [isDisabled, setIsDisabled] = useState(false)
    const [infocardsData, setInfoCardsData] = useState(infodata)
    const [message, setMessage] = useState('')

    const {state, onChange} = useFormState(
        {
            data: {
                id: infocardsData?._id,
                title: infocardsData?.title,
                picPath: infocardsData?.picPath,
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

    const updatePillar = async (event) => {
        event.preventDefault()

        if (Object.values(error).map(el => el).includes(false)) {
            try {
                await updateOPPillar(data)
                    .then(banner => {
                        setInfoCardsData(banner)
                        setMessage('Data atualizada exitosamente')
                        hideModal(banner)
                    })
                    .catch(error => {
                        setRegisterError(error)
                    })
            } catch (err) {
                setRegisterError(err.response?.data?.message)
            }
        } else {
            setMessage('Por favor complete alguno de los campos')
        }
    }


    const deleteSelected = async (id) => {
        const updateData = await deleteOPPillar(id)
        deleteItem(updateData)
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
                // console.log('Uploaded')
            })
            .catch(err => {console.log(err)})

        // Get file url
        const fileUrl = await filePath.getDownloadURL()
        data.picPath = fileUrl
        setImageSuccess("Imagen subida correctamente")
        setIsDisabled(false)
        error.picPath = false
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
                                <form className="AdminEdit__form" onSubmit={updatePillar}>
                                    <div className="row">
                                        <div className="col-sm-12 ShowEditModal__thumbnail">
                                            <div className="ShowEditModal__thumbnail-img" style={{
                                                background: `url(${infocardsData?.picPath}) no-repeat center center / cover`,
                                            }}></div>
                                            <h1 className="DeleteItemModal__ask">Editar pilar<span className="ShowEditModal__news-title">{infocardsData.title}</span></h1>
                                        </div>
                                        <div className="col-12">
                                            <InputFile
                                                label="Imagen pilar"
                                                value={infocardsData?.picPath}
                                                onChange={onFileSelected}
                                                id="fileButton"
                                                name="picPath"
                                                type="file"
                                            />
                                            {imageSuccess && <small className="img-success">{imageSuccess}</small>}
                                        </div>
                                        <div className="col-12">
                                            <InputWithLabel
                                                label="Título pilar"
                                                onChange={onChange}
                                                name="title"
                                                type="text"
                                                cssStyle="form-control"
                                                placeholder={infocardsData?.title}
                                            />
                                        </div>
                                        <div className="col-12 col-sm-6 mt-5">
                                            <Button type="submit" cssStyle={`leti-btn ${isDisabled && 'disabled'}`}>Guardar cambios</Button>
                                        </div>
                                        <div className="col-12 col-sm-6 mt-5 d-flex justify-content-end">
                                            <div onClick={() => deleteSelected(infocardsData?._id)} className="leti-btn delete">Eliminar {infocardsData?.title}</div>
                                        </div>
                                        {message &&
                                                <div className="row">
                                                    <span className="AdminEdit__message col-12 m-0">{message}</span>
                                                </div>}
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
