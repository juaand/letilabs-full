import React, {useState} from 'react'
import {Editor} from '@tinymce/tinymce-react'

import {deleteCarItem, updatePortfolioData, createContent} from '../../../../../../services/ApiClient'
import InputWithLabel from '../../../../../Form/InputWithLabel/InputWithLabel'
import {useFormState} from '../../../../../../hooks/useFormState'
import './DeleteItemModal.css'

function DeleteItemModal({deleteItem, element, hideModal}) {

    const [registerError, setRegisterError] = useState(null)
    const [message, setMessage] = useState('')

    const {state, onChange} = useFormState(
        {
            data: {
                id: element.id,
                title: element.title,
                description: element.description,
                logo: element.logo,
            },
            error: {
                title: true,
                description: true,
                logo: true,
            },
            touch: {},
        },
        {
            title: v => v.length,
            description: v => v.length,
            logo: v => v.length,
        }
    )

    const {data, error} = state

    const deleteCarrouselItem = async (id) => {
        const updateData = await deleteCarItem(id)
        deleteItem(updateData)
    }


    const contentData = {
        content: '',
        url: '/',
        name: 'Inicio',
        type: `Portafolio ${element?.title}`,
    }


    const editCarrouselItem = async (id) => {

        if (contentData.content.length > 0) {
            createContent(contentData)
        }

        if (Object.values(error).map(el => el).includes(false)) {
            data.id = id
            if (data.title.trim() === '' || data.description.trim() === '') {
                setMessage('El título o la descripción no pueden ir vacios, por favor, rellene ambos campos.')
            } else {
                try {
                    await updatePortfolioData(data, id)
                        .then(updateData => {
                            deleteItem(updateData)
                        })
                } catch (err) {
                    setRegisterError(err.response?.data?.message)
                }
            }
        } else {
            setMessage('Por favor edite alguno de los campos')
        }
    }

    const handleBannerDescription = (e) => {
        data.description = e.target.getContent()
        contentData.content = e.target.getContent({format: "text"})
        error.description = false
    }

    return (
        <div className="EditElementsModal">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-11 col-sm-5 EditElementsModal__container">
                        <span className="EditElementsModal__close" onClick={hideModal}></span>
                        <div className="col-sm-12">
                            <h1 className="DeleteItemModal__ask">Editar<span className="ShowEditModal__news-title">{element.title}</span></h1>
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
                                            <p className="EditElementsModal__text"><strong>Editar descripción</strong></p>
                                            <Editor
                                                initialValue={data?.description}
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
                                            <div onClick={() => editCarrouselItem(element._id)} className="leti-btn mt-0">Editar elemento</div>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div onClick={() => deleteCarrouselItem(element._id)} className="leti-btn mt-0 delete">Eliminar elemento</div>
                                        </div>
                                        <div className="col-12"> {registerError && <div className="alert alert-danger">{registerError}</div>}
                                            {message && <span className="AdminEdit__message m-0">{message}</span>}</div>
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

export default DeleteItemModal
