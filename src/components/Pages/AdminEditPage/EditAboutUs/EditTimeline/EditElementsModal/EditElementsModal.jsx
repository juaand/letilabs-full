import './EditElementsModal.css'
import React, {useState} from 'react'
import {deleteCarItem} from '../../../../../../services/ApiClient'
import InputFile from '../../../../../Form/InputFile/InputFile'
import {app} from '../../../../../../services/firebase'
import {useFormState} from '../../../../../../hooks/useFormState'
import {Editor} from '@tinymce/tinymce-react'
import InputWithLabel from '../../../../../Form/InputWithLabel/InputWithLabel'

function EditElementsModal({deleteItem, element, hideModal}) {

    const {state, onChange} = useFormState(
        {
            data: {
                year: element.year,
                desc: element.desc,
                imgURL: element.imgURL,
            },
            error: {
                year: true,
                desc: true,
                imgURL: false,
            },
            touch: {},
        },
        {
            year: v => v.length,
            desc: v => v.length,
            imgURL: v => v.length,
        }
    )

    const {data} = state

    const [disabled, setDisabled] = useState(true)

    const deleteCarrouselItem = async (id) => {
        const updateData = await deleteCarItem(id)
        deleteItem(updateData)
    }

    const editCarrouselItem = async (id) => {
        console.log('editar contenido')
        // const updateData = await editCarItem(id)
        // deleteItem(updateData)
    }

    const handleBannerDescription = (e) => {
        data.desc = e.target.getContent()
    }

    const onFileSelected = async (e) => {
        // Get file
        const file = e.target.files[0]

        // Create storage ref
        const storageRef = app.storage().ref()
        const filePath = storageRef.child('images/' + file.name)

        // Upload file
        await filePath.put(file)
            .then(() => {
                console.log('Uploaded')
                //Se habilita el botón para subir el blog
                setDisabled(!disabled)
            })
            .catch(err => {console.log(err)})


        // Get file url
        const fileUrl = await filePath.getDownloadURL()
        data.imgURL = fileUrl
        console.log(fileUrl)
    }

    return (
        <div className="EditElementsModal">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-11 col-sm-5 EditElementsModal__container">
                        <span className="EditElementsModal__close" onClick={hideModal}></span>
                        <div className="col-sm-12">
                            <p className="EditElementsModal__ask">Editar elemento {element.year}</p>
                            <div className="card">
                                <div className="card-body EditElementsModal__body">
                                    <div className="row align-items-center">
                                        <div className="col-sm-12">
                                            <p className="EditElementsModal__text"><strong>Editar año</strong></p>
                                        </div>
                                        <div className="col-sm-12">
                                            <InputWithLabel
                                                onChange={onChange}
                                                name="year"
                                                type="text"
                                                className="form-control"
                                                placeholder="Ingresa año"
                                            />
                                        </div>
                                        <div className="col-12">
                                            <p className="EditElementsModal__text"><strong>Editar imagen</strong></p>
                                        </div>
                                        <div className="col-12 EditElementsModal__img">
                                            <img src={"./images/" + element.imgURL} alt={element.name} />
                                            <InputFile
                                                value={element?.imgURL}
                                                onChange={onFileSelected}
                                                id="fileButton"
                                                name="picpath"
                                                type="file"
                                                className="form-control"
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
    )
}

export default EditElementsModal
