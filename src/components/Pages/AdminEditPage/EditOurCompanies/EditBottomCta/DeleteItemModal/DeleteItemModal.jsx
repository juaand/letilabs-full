import './DeleteItemModal.css'
import React, {useState} from 'react'
import {deleteCarItem, updateBottomOC} from '../../../../../../services/ApiClient'
import InputFile from '../../../../../Form/InputFile/InputFile'
import {app} from '../../../../../../services/firebase'
import {useFormState} from '../../../../../../hooks/useFormState'
import InputWithLabel from '../../../../../Form/InputWithLabel/InputWithLabel'
import Loader from '../../../../../Loader/Loader'


function DeleteItemModal({deleteItem, element, hideModal}) {

    const [imageSuccess, setImageSuccess] = useState('')
    const [isDisabled, setIsDisabled] = useState(false)

    const {state, onChange} = useFormState(
        {
            data: {
                id: element.id,
                title: element.title,
                url: element.url,
                button: element.button,
                img: element.img,
            },
            error: {
                title: true,
                url: true,
                button: true,
                img: false,
            },
            touch: {},
        },
        {
            title: v => v.length,
            url: v => v.length,
            button: v => v.length,
            img: v => v.length,
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
            await updateBottomOC(data, id)
                .then(updateData => {
                    deleteItem(updateData)
                })
        } catch (err) {
            setRegisterError(err.response?.data?.message)
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
                //Se habilita el botón para subir el blog
                setDisabled(!disabled)
            })
            .catch(err => {console.log(err)})


        // Get file title
        const fileUrl = await filePath.getDownloadURL()
        data.img = fileUrl
        setImageSuccess("Imagen subida correctamente")
        setIsDisabled(false)
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
                                                <p className="EditElementsModal__text"><strong>Editar title</strong></p>
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
                                            <div className="col-sm-12">
                                                <p className="EditElementsModal__text"><strong>Editar link botón</strong></p>
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
                                            <div className="col-sm-12">
                                                <p className="EditElementsModal__text"><strong>Editar titulo botón</strong></p>
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
                                            <div className="col-12">
                                                <p className="EditElementsModal__text"><strong>Editar img</strong></p>
                                            </div>
                                            <div className="col-12 EditElementsModal__img">
                                                <img src={element.img} onError="this.src = 'https://firebasestorage.googleapis.com/v0/b/grupo-leti-fd84e.appspot.com/o/images%2Fno-image.png?alt=media&token=73bf7cd8-629d-4deb-b281-9e629fbfb752';" alt={element.img} />
                                                <InputFile
                                                    value={element?.img}
                                                    onChange={onFileSelected}
                                                    id="fileButton"
                                                    name="img"
                                                    type="file"
                                                    placeholder={element?.img}
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