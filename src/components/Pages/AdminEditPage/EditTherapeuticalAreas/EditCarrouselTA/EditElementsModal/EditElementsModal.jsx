import React, {useState} from 'react'
import {Editor} from '@tinymce/tinymce-react'

import {deleteTaCarrItem, updateCarrouselTA, createContent} from '../../../../../../services/ApiClient'
import InputWithLabel from '../../../../../Form/InputWithLabel/InputWithLabel'
import {useFormState} from '../../../../../../hooks/useFormState'
import InputFile from '../../../../../Form/InputFile/InputFile'
import {app} from '../../../../../../services/firebase'
import Loader from '../../../../../Loader/Loader'
import './EditElementsModal.css'

function EditElementsModal({deleteItem, element, hideModal}) {

    const [registerError, setRegisterError] = useState(null)
    const [imageSuccess, setImageSuccess] = useState('')
    const [isDisabled, setIsDisabled] = useState(false)
    const [message, setMessage] = useState('')

    const {state, onChange} = useFormState(
        {
            data: {
                id: '',
                mainTitle: element.mainTitle,
                title: element.title,
                desc: element.desc,
                imgURL: element.imgURL,
            },
            error: {
                mainTitle: true,
                title: true,
                desc: true,
                imgURL: true,
            },
            touch: {},
        },
        {
            mainTitle: v => v.length,
            title: v => v.length,
            desc: v => v.length,
            imgURL: v => v.length,
        }
    )

    const {data, error} = state

    const deleteCarrouselItem = async (id) => {
        const updateData = await deleteTaCarrItem(id)
        deleteItem(updateData)
    }

    const contentData = {
        content: '',
        url: '/areas-terapeuticas',
        name: 'Áreas terapeúticas',
        type: `${element?._id}`,
    }

    const editCarrouselItem = async () => {
        data.id = element._id

        if (contentData?.content?.length > 0) {
            createContent(contentData)
        }

        if (Object.values(error).map(el => el).includes(false)) {
            try {
                await updateCarrouselTA(data)
                    .then(updateData => {
                        deleteItem(updateData)
                        setMessage('Data actualizada exitosamente')
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
                setImageSuccess("Imagen subida correctamente")
            })
            .catch(err => {console.log(err)})

        // Get file url
        const fileUrl = await filePath.getDownloadURL()
        data.imgURL = fileUrl
        setIsDisabled(false)
        error.imgURL = false
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
                                                <img src={element.imgURL} onError="this.src = 'https://firebasestorage.googleapis.com/v0/b/grupoleti.appspot.com/o/images%2Fno-image.png?alt=media&token=6e518b16-dc11-46e3-83e8-ae4b84a18293';" alt={element.name} />
                                                <InputFile
                                                    value={element?.imgURL}
                                                    onChange={onFileSelected}
                                                    id="fileButton"
                                                    name="imgURL"
                                                    type="file"
                                                />
                                                {imageSuccess && <span className="AdminEdit__message mt-1">{imageSuccess}</span>}
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
                                            <div className="col-12 m-0">
                                                {message && <span className="AdminEdit__message">{message}</span>}
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
