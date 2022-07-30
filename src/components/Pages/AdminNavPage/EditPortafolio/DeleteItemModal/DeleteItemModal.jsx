import React, {useState} from 'react'
import {Editor} from '@tinymce/tinymce-react'

import {updateNavData} from '../../../../../services/ApiClient'
import InputWithLabel from '../../../../Form/InputWithLabel/InputWithLabel'
import {useFormState} from '../../../../../hooks/useFormState'
import './DeleteItemModal.css'

function DeleteItemModal({deleteItem, element, hideModal}) {

    const [registerError, setRegisterError] = useState(null)
    const [message, setMessage] = useState('')

    const {state, onChange} = useFormState(
        {
            data: {
                id: element.id,
                title: element.title,
                desc: element.desc,
                nav_btn: element.nav_btn,
                nav_cta: element.nav_cta,

            },
            error: {
                title: true,
                desc: true,
                nav_btn: true,
                nav_cta: true,
            },
            touch: {},
        },
        {
            title: v => v.length,
            desc: v => v.length,
            nav_btn: v => v.length,
            nav_cta: v => v.length,
        }
    )

    const {data, error} = state


    const editCarrouselItem = async (id) => {

        if (Object.values(error).map(el => el).includes(false)) {
            data.id = id
            if (data?.title?.trim() === '' || data?.desc?.trim() === '' || data?.nav_btn?.trim() === '' || data?.nav_cta?.trim() === '') {
                setMessage('No puede dejar ningún campo vacío.')
            } else {
                try {
                    await updateNavData(data, id)
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
        data.desc = e.target.getContent()
        error.desc = false
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
                                            <p className="EditElementsModal__text"><strong>Editar nombre del botón</strong></p>
                                        </div>
                                        <div className="col-sm-12">
                                            <InputWithLabel
                                                value={data?.nav_btn}
                                                onChange={onChange}
                                                name="nav_btn"
                                                type="text"
                                                cssStyle="form-control"
                                                placeholder={element?.nav_btn}
                                            />
                                        </div>
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
                                        <div className="col-sm-12">
                                            <p className="EditElementsModal__text"><strong>Editar texto CTA</strong></p>
                                            <InputWithLabel
                                                value={data?.nav_cta}
                                                onChange={onChange}
                                                name="nav_cta"
                                                type="text"
                                                cssStyle="form-control"
                                                placeholder={element?.nav_cta}
                                            />
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div onClick={() => editCarrouselItem(element._id)} className="leti-btn mt-0">Editar elemento</div>
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
