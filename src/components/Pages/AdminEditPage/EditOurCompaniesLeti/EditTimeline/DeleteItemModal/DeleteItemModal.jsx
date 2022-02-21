import './DeleteItemModal.css'
import React, {useState} from 'react'
import {deleteCarItem, updateTimeLineLetiData} from '../../../../../../services/ApiClient'
import InputFile from '../../../../../Form/InputFile/InputFile'
import {app} from '../../../../../../services/firebase'
import {useFormState} from '../../../../../../hooks/useFormState'
import {Editor} from '@tinymce/tinymce-react'
import InputWithLabel from '../../../../../Form/InputWithLabel/InputWithLabel'
import Loader from '../../../../../Loader/Loader'


function DeleteItemModal({deleteItem, element, hideModal}) {

    const [imageSuccess, setImageSuccess] = useState('')
    const [isDisabled, setIsDisabled] = useState(false)

    const {state, onChange} = useFormState(
        {
            data: {
                id: element.id,
                button: element.button,
                url: element.url,
                desc: element.desc,
                imgURL: element.imgURL,
            },
            error: {
                button: true,
                url: true,
                desc: true,
                imgURL: false,
            },
            touch: {},
        },
        {
            button: v => v.length,
            url: v => v.length,
            desc: v => v.length,
            imgURL: v => v.length,
        }
    )

    const {data} = state
    const [registerError, setRegisterError] = useState(null)

    const [disabled, setDisabled] = useState(true)

    const deleteCarrouselItem = async (id) => {
        const updateData = await deleteCarItem(id)
        deleteItem(updateData)
    }

    const editCarrouselItem = async (id) => {

        try {
            await updateTimeLineLetiData(data, id)
            .then(updateData => {
                deleteItem(updateData)
            })
        } catch (err) {
            setRegisterError(err.response?.data?.message)
        }
    }

    const handleBannerDescription = (e) => {
        data.desc = e.target.getContent()
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
        data.imgURL = fileUrl
        setImageSuccess("Imagen subida correctamente")
        setIsDisabled(false)
    }

    return (
        <>
        {isDisabled && <Loader message="Cargando imagen..."/>}
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
                                            <p className="EditElementsModal__text"><strong>Editar url</strong></p>
                                        </div>
                                        <div className="col-sm-12">
                                            <InputWithLabel
                                                value={data?.button}
                                                onChange={onChange}
                                                name="button"
                                                type="text"
                                                cssStyle="form-control"
                                                placeholder={element?.button}
                                            />
                                        </div>
                                        <div className="col-sm-12">
                                            <InputWithLabel
                                                value={data?.url}
                                                onChange={onChange}
                                                name="url"
                                                type="text"
                                                cssStyle="form-control"
                                                placeholder={element?.url}
                                            />
                                        </div>
                                        <div className="col-12">
                                            <p className="EditElementsModal__text"><strong>Editar imgURL</strong></p>
                                        </div>
                                        <div className="col-12 EditElementsModal__img">
                                            <img src={element.imgURL} alt={element.imgURL} />
                                            <InputFile
                                                value={element?.imgURL}
                                                onChange={onFileSelected}
                                                id="fileButton"
                                                name="imgURL"
                                                type="file"
                                                placeholder={element?.imgURL}
                                            />
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
                                            <div onClick={() => deleteCarrouselItem(element._id)} className="leti-btn delete">Eliminar elemento</div></div>
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
