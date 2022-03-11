import React, {useState} from 'react'
import {Editor} from '@tinymce/tinymce-react'
import {Fade} from 'react-awesome-reveal'

import './EditItemModal.css'
import {deleteIDGoals, updateGoalsIdData, createContent} from '../../../../../../services/ApiClient'
import InputWithLabel from '../../../../../Form/InputWithLabel/InputWithLabel'
import {useFormState} from '../../../../../../hooks/useFormState'
import Button from '../../../../../Form/FormButton/FormButton'

function EditItemModal({deleteItem, infodata, hideModal, closeModal}) {

    console.log('infodata', infodata)

    const [timelineData, setTimelineData] = useState(infodata)
    const [message, setMessage] = useState('')

    const {state, onChange} = useFormState(
        {
            data: {
                id: timelineData?._id,
                name: timelineData?.name,
                desc: timelineData?.desc,
            },
            error: {
                desc: true,
                name: true,
            },
            touch: {},
        },
        {
            desc: v => v.length,
            name: v => v.length,
        }
    )

    const {data, error} = state
    const [registerError, setRegisterError] = useState(null)

    const contentData = {
        content: '',
        url: '/investigacion-y-desarrollo',
        name: 'Investigación y desarrollo',
        type: `${infodata?._id}`,
    }

    const updateInfo = async (event) => {
        event.preventDefault()

        if (contentData.content.length > 0) {
            createContent(contentData)
        }

        if (Object.values(error).map(el => el).includes(false)) {
            if (data.name.trim() === '' || data.desc.trim() === '') {
                setMessage('El título o la descripción no pueden estar vacíos, por favor complete ambos campos')
            } else {
                try {
                    await updateGoalsIdData(data)
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

            }
        } else {
            setMessage('Por favor edite alguno de los campos')
        }
    }

    const handleDescription = (e) => {
        data.desc = e.target.getContent()
        contentData.content = e.target.getContent({format: "text"})
        error.desc = false
    }

    const deleteSelected = async (id) => {
        const updatedData = await deleteIDGoals(id)
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
                                        <div className="col-sm-12 mb-5">
                                            <h1 className="DeleteItemModal__ask">Editar elemento
                                                <span class="ShowEditModal__news-title">{timelineData?.name}</span></h1>
                                        </div>
                                        <div className="col-12">
                                            <p className="AdminEdit__form__label">
                                                Objetivo
                                            </p>
                                            <InputWithLabel
                                                value={data?.name}
                                                onChange={onChange}
                                                name="name"
                                                type="text"
                                                cssStyle="form-control"
                                                placeholder={timelineData?.name}
                                            />
                                        </div>
                                        <div className="col-12">
                                            <p className="AdminEdit__form__label mt-5">
                                                Descripción
                                            </p>
                                            <Editor
                                                initialValue={timelineData?.desc}
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
                                        <div className="col-12 col-sm-6 mt-5 ">
                                            <Button type="submit" cssStyle="leti-btn">Guardar cambios</Button>
                                        </div>
                                        <div className="col-12 col-sm-6 mt-5 d-flex justify-content-end">
                                            <div onClick={() => deleteSelected(timelineData?._id)} className="leti-btn delete">Eliminar objetivo</div>
                                        </div>
                                        {message &&
                                            <div className="row">
                                                <span className="AdminEdit__message col-12 m-0">{message}</span>
                                            </div>}
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
