import './DeleteItemModal.css'
import React, {useState} from 'react'
import {deleteCarItem, updateOurCompaniesInfoCardsLeti} from '../../../../../../services/ApiClient'
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
                title: element.title,
                info: element.info,
                logo: element.logo,
            },
            error: {
                title: true,
                info: true,
                logo: true,
            },
            touch: {},
        },
        {
            title: v => v.length,
            info: v => v.length,
            logo: v => v.length,
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
            await updateOurCompaniesInfoCardsLeti(data, id)
            .then(updateData => {
                deleteItem(updateData)
            })
        } catch (err) {
            setRegisterError(err.response?.data?.message)
        }
    }

    const handleBannerDescription = (e) => {
        data.info = e.target.getContent()
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
                                        <div className="col-12">
                                            <p className="EditElementsModal__text"><strong>Editar logo</strong></p>
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
