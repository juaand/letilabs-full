import React, {useState} from 'react'
import {Editor} from '@tinymce/tinymce-react'
import {Fade} from 'react-awesome-reveal'

import {deleteLetiInfoCard, updateOurCompaniesInfoCardsLeti, createContent} from '../../../../../../services/ApiClient'
import InputWithLabel from '../../../../../Form/InputWithLabel/InputWithLabel'
import {useFormState} from '../../../../../../hooks/useFormState'
import Button from '../../../../../Form/FormButton/FormButton'
import './EditItemModal.css'

function EditItemModal({deleteItem, infodata, hideModal, closeModal}) {

    const [timelineData, setTimelineData] = useState(infodata)
    const [message, setMessage] = useState('')

    const {state, onChange} = useFormState(
        {
            data: {
                id: timelineData?._id,
                title: timelineData?.title,
                info: timelineData?.info,
            },
            error: {
                info: true,
                title: true,
            },
            touch: {},
        },
        {
            info: v => v.length,
            title: v => v.length,
        }
    )

    const {data, error} = state
    const [registerError, setRegisterError] = useState(null)

    const contentData = {
        content: '',
        url: '/leti',
        name: 'Leti',
        type: `${infodata?._id}`,
    }

    const updateInfo = async (event) => {
        event.preventDefault()

        if (contentData.content.length > 0) {
            createContent(contentData)
        }

        if (Object.values(error).map(el => el).includes(false)) {
            try {
                await updateOurCompaniesInfoCardsLeti(data)
                    .then(info => {
                        setTimelineData(info)
                        setMessage('Data atualizada exitosamente')
                        hideModal(info)
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

    const handleDescription = (e) => {
        data.info = e.target.getContent()
        contentData.content = e.target.getContent({format: "text"})
        error.info = false
    }

    const deleteSelected = async (id) => {
        const updatedData = await deleteLetiInfoCard(id)
        deleteItem(updatedData)
    }


    return (
        <>
            <div className="EditItemModal">
                <div className="container">
                    <div className="row justify-content-center">
                        <Fade direction="down" className="col-11 col-sm-6 EditItemModal__container">
                            <>
                                <span className="EditItemModal__close" onClick={closeModal}></span>
                                <form className="AdminEdit__form" onSubmit={updateInfo}>
                                    <div className="row">
                                        <div className="col-sm-12 ShowEditModal__thumbnail mb-5">
                                            <h1 className="DeleteItemModal__ask">Editar elemento
                                                <span class="ShowEditModal__news-title">{timelineData?.title}</span></h1>
                                        </div>
                                        <div className="col-12">
                                            <p className="AdminEdit__form__label">
                                                Objetivo
                                            </p>
                                            <InputWithLabel
                                                value={data?.title}
                                                onChange={onChange}
                                                name="title"
                                                type="text"
                                                cssStyle="form-control"
                                                placeholder={timelineData?.title}
                                            />
                                        </div>
                                        <div className="col-12">
                                            <p className="AdminEdit__form__label">
                                                Descripción
                                            </p>
                                            <Editor
                                                initialValue={timelineData?.info}
                                                onChange={handleDescription}
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
                                            <Button type="submit" cssStyle="leti-btn">Guardar cambios</Button>
                                        </div>
                                        <div className="col-12 col-sm-6 d-flex justify-content-end">
                                            <div onClick={() => deleteSelected(timelineData?._id)} className="leti-btn delete">Eliminar objetivo</div>
                                        </div>
                                        {message && <div className="col-12"><span className="AdminEdit__message m-0">{message}</span></div>}
                                    </div>
                                    {registerError && <div className="alert alert-danger">{registerError}</div>}
                                </form>
                            </>
                        </Fade>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditItemModal
