import React, {useState} from 'react'
import {Editor} from '@tinymce/tinymce-react'

import {deleteGalleryItem, updateGalleryData, createContent} from '../../../../../../services/ApiClient'
import {useFormState} from '../../../../../../hooks/useFormState'
import InputWithLabel from '../../../../../Form/InputWithLabel/InputWithLabel'
import InputFile from '../../../../../Form/InputFile/InputFile'
import {app} from '../../../../../../services/firebase'
import Loader from '../../../../../Loader/Loader'

import './EditElementsModal.css'


function EditElementsModal({deleteItem, element, hideModal}) {

    const [imageSuccess, setImageSuccess] = useState('')
    const [message, setMessage] = useState('')

    const [isDisabled, setIsDisabled] = useState(false)

    const {state, onChange} = useFormState(
        {
            data: {
                id: element._id,
                mainTitle: element.mainTitle,
                title: element.title,
                desc: element.desc,
                imgPath: element.imgPath,
            },
            error: {
                mainTitle: true,
                title: true,
                desc: true,
                imgPath: true,
            },
            touch: {},
        },
        {
            mainTitle: v => v.length,
            title: v => v.length,
            desc: v => v.length,
            imgPath: v => v.length,
        }
    )

    const {data, error} = state
    const [registerError, setRegisterError] = useState(null)


    const [disabled, setDisabled] = useState(true)

    const deleteCarrouselItem = async (id) => {
        const updateData = await deleteGalleryItem(id)
        deleteItem(updateData)
    }

    const contentData = {
        content: '',
        url: '/sobre-nosotros',
        name: 'Sobre nosotros',
        type: `${element?._id}`,
    }

    const editCarrouselItem = async () => {
        if (contentData?.content?.length > 0) {
            createContent(contentData)
        }

        if (Object.values(error).map(el => el).includes(false)) {
            data.id = element._id
            try {
                await updateGalleryData(data)
                    .then(updateData => {
                        deleteItem(updateData)
                    })
            } catch (err) {
                setRegisterError(err.response?.data?.message)
            }
        } else {
            setMessage('Por favor edite alguno de los campos')
        }
    }

    const handleBannerDescription = (e) => {
        data.desc = e.target.getContent()
        contentData.content = e.target.getContent({format: "text"})
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
        data.imgPath = fileUrl
        setImageSuccess("Imagen subida correctamente")
        setIsDisabled(false)
        error.imgPath = false
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
                                <p className="EditElementsModal__ask">Editar elemento {element.title}</p>
                                <div className="card">
                                    <div className="card-body EditElementsModal__body">
                                        <div className="row align-items-center">
                                            <div className="col-sm-12">
                                                <p className="EditElementsModal__text"><strong>Editar título</strong></p>
                                            </div>
                                            <div className="col-sm-12">
                                                <InputWithLabel
                                                    value={data?.title}
                                                    onChange={onChange}
                                                    name="title"
                                                    type="text"
                                                    cssStyle="form-control"
                                                    placeholder={element?.title}
                                                />
                                            </div>
                                            <div className="col-12">
                                                <p className="EditElementsModal__text"><strong>Editar imagen</strong></p>
                                            </div>
                                            <div className="col-12 EditElementsModal__img">
                                                <img src={element.imgPath} onError="this.src = 'https://firebasestorage.googleapis.com/v0/b/grupo-leti-fd84e.appspot.com/o/images%2Fno-image.png?alt=media&token=73bf7cd8-629d-4deb-b281-9e629fbfb752';" alt={element.imgPath} />
                                                <InputFile
                                                    value={element?.imgPath}
                                                    onChange={onFileSelected}
                                                    id="fileButton"
                                                    name="picpath"
                                                    type="file"
                                                />
                                                {imageSuccess &&
                                                    <div className="col-12">
                                                        <span className="AdminEdit__message mt-1">{imageSuccess}</span>
                                                    </div>
                                                }
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
                                                <div onClick={() => editCarrouselItem(element._id)} className="leti-btn">Editar elemento</div>
                                            </div>
                                            <div className="col-12 col-sm-6">
                                                <div onClick={() => deleteCarrouselItem(element._id)} className="leti-btn delete">Eliminar elemento</div>
                                            </div>
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

export default EditElementsModal
