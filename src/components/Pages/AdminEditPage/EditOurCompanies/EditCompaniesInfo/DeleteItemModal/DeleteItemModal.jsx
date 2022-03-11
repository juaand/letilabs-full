import React, {useState} from 'react'
import {Editor} from '@tinymce/tinymce-react'

import {updateOurCompaniesOC, createContent} from '../../../../../../services/ApiClient'
import {useFormState} from '../../../../../../hooks/useFormState'
import InputFile from '../../../../../Form/InputFile/InputFile'
import {app} from '../../../../../../services/firebase'
import Loader from '../../../../../Loader/Loader'

import './DeleteItemModal.css'


function DeleteItemModal({deleteItem, element, hideModal}) {

    const [registerError, setRegisterError] = useState(null)
    const [isDisabled, setIsDisabled] = useState(false)
    const [disabled, setDisabled] = useState(true)

    const [imageSuccess, setImageSuccess] = useState('')
    const [message, setMessage] = useState('')

    const {state} = useFormState(
        {
            data: {
                id: element.id,
                name: element.name,
                url: element.url,
                info: element.info,
                logo: element.logo,
            },
            error: {
                name: true,
                url: true,
                info: true,
                logo: true,
            },
            touch: {},
        },
        {
            name: v => v.length,
            url: v => v.length,
            info: v => v.length,
            logo: v => v.length,
        }
    )

    const {data, error} = state

    const contentData = {
        content: '',
        url: '/nuestras-empresas',
        name: 'Nuestras empresas',
        type: `${element?._id}`,
    }

    const editCarrouselItem = async (id) => {

        if (contentData?.content?.length > 0) {
            createContent(contentData)
        }

        if (Object.values(error).map(el => el).includes(false)) {
            data.id = element._id
            try {
                await updateOurCompaniesOC(data)
                    .then(updateData => {
                        deleteItem(updateData)
                        setMessage('Data actualizada correctamente')
                    })
            } catch (err) {
                setRegisterError(err.response?.data?.message)
            }
        } else {
            setMessage('Por favor edite alguno de los campos')
        }
    }

    const handleBannerDescription = (e) => {
        data.info = e.target.getContent()
        contentData.content = e.target.getContent({format: "text"})
        error.info = false
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
                setImageSuccess("Imagen subida correctamente")
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
                                            <div className="col-12">
                                                <p className="EditElementsModal__text"><strong>Editar logo</strong></p>
                                            </div>
                                            <div className="col-12 EditElementsModal__img">
                                                <img src={element.logo} onError="this.src = 'https://firebasestorage.googleapis.com/v0/b/grupo-leti-fd84e.appspot.com/o/images%2Fno-image.png?alt=media&token=73bf7cd8-629d-4deb-b281-9e629fbfb752';" alt={element.logo} />
                                                <InputFile
                                                    value={element?.logo}
                                                    onChange={onFileSelected}
                                                    id="fileButton"
                                                    name="logo"
                                                    type="file"
                                                    placeholder={element?.logo}
                                                />
                                                {imageSuccess && <span className="AdminEdit__message mt-1">{imageSuccess}</span>}
                                            </div>
                                            <div className="col-12">
                                                <p className="EditElementsModal__text"><strong>Editar descripción</strong></p>
                                                <Editor
                                                    initialValue={data?.info}
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
                                                <div onClick={() => editCarrouselItem(element._id)} className="leti-btn">Editar elemento</div>
                                            </div>
                                            {/* <div className="col-12 col-sm-6">
                                                <div onClick={() => deleteCarrouselItem(element._id)} className="leti-btn delete">Eliminar elemento</div>
                                            </div> */}
                                            <div className="col-12">
                                                {message && <span className="AdminEdit__message m-0">{message}</span>}
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
