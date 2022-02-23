import React, {useState} from 'react'
import {Editor} from '@tinymce/tinymce-react'

import {deleteUnitItem, updateUnidadesData} from '../../../../../../services/ApiClient'
import InputWithLabel from '../../../../../Form/InputWithLabel/InputWithLabel'
import {useFormState} from '../../../../../../hooks/useFormState'
import InputFile from '../../../../../Form/InputFile/InputFile'
import {app} from '../../../../../../services/firebase'
import Loader from '../../../../../Loader/Loader'
import './DeleteItemModal.css'


function DeleteItemModal({deleteItem, element, hideModal}) {

    const [isDisabled, setIsDisabled] = useState(false)
    const [message, setMessage] = useState('')

    const {state, onChange} = useFormState(
        {
            data: {
                id: element.id,
                url: element.url,
                desc: element.desc,
                logo: element.logo,
            },
            error: {
                url: true,
                desc: true,
                logo: true,
            },
            touch: {},
        },
        {
            url: v => v.length,
            desc: v => v.length,
            logo: v => v.length,
        }
    )

    const {data, error} = state
    const [registerError, setRegisterError] = useState(null)

    const [disabled, setDisabled] = useState(true)

    const deleteCarrouselItem = async (id) => {
        const updateData = await deleteUnitItem(id)
        deleteItem(updateData)
    }

    const editCarrouselItem = async (id) => {

        if (error.desc === false || error.logo === false) {
            try {
                await updateUnidadesData(data, id)
                    .then(updateData => {
                        deleteItem(updateData)
                    })
            } catch (err) {
                setRegisterError(err.response?.data?.message)
            }
        } else {
            setMessage('Por favor edite el logo o la descripción')
        }
    }

    const handleBannerDescription = (e) => {
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
                //Se habilita el botón para subir el blog
                setDisabled(!disabled)
            })
            .catch(err => {console.log(err)})


        // Get file url
        const fileUrl = await filePath.getDownloadURL()
        data.logo = fileUrl
        setIsDisabled(false)
        error.logo = false
    }

    return (
        <>
            {isDisabled && <Loader message="Cargando imagen..." />}
            <div className="EditElementsModal">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-11 col-sm-5 EditElementsModal__container">
                            <span className="EditElementsModal__close" onClick={hideModal}></span>
                            <div className="col-sm-12">
                                <p className="EditElementsModal__ask">Editar elemento {element.url}</p>
                                <div className="card">
                                    <div className="card-body EditElementsModal__body">
                                        <div className="row align-items-center">
                                            <div className="col-sm-12">
                                                <p className="EditElementsModal__text"><strong>Url</strong></p>
                                            </div>
                                            <div className="col-sm-12">
                                                <InputWithLabel
                                                    value={data?.url}
                                                    onChange={onChange}
                                                    name="url"
                                                    type="text"
                                                    cssStyle="form-control"
                                                    placeholder={element?.url}
                                                    disabled
                                                />
                                            </div>
                                            <div className="col-12">
                                                <p className="EditElementsModal__text"><strong>Editar logo</strong></p>
                                            </div>
                                            <div className="col-12 EditElementsModal__img m-0">
                                                <img src={element.logo} onError="this.src = 'https://firebasestorage.googleapis.com/v0/b/grupo-leti-fd84e.appspot.com/o/images%2Fno-image.png?alt=media&token=73bf7cd8-629d-4deb-b281-9e629fbfb752';" alt={element.logo} />
                                                <InputFile
                                                    value={element?.logo}
                                                    onChange={onFileSelected}
                                                    id="fileButton"
                                                    name="logo"
                                                    type="file"
                                                    placeholder={element?.logo}
                                                />
                                            </div>
                                            <div className="col-12">
                                            </div>
                                            <div className="col-12">
                                                <p className="EditElementsModal__text"><strong>Editar descripción</strong></p>
                                                <Editor
                                                    initialValue={data?.desc}
                                                    onChange={handleBannerDescription}
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
                                                <div onClick={() => deleteCarrouselItem(element._id)} className="leti-btn delete mt-0">Eliminar elemento</div>
                                            </div>
                                            <div className="col-12 col-sm-6">
                                                <div onClick={() => editCarrouselItem(element._id)} className="leti-btn mt-0">Guardar cambios</div>
                                            </div>
                                            <div className="col-12 d-flex justify-content-end">
                                                {message && <span className="AdminEdit__message">{message}</span>}
                                            </div>
                                            <div className="col-12">
                                                {registerError && <div className="alert alert-danger">{registerError}</div>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default DeleteItemModal
