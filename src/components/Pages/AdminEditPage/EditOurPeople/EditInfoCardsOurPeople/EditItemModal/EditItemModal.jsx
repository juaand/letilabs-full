import React, {useState} from 'react'
import {Editor} from '@tinymce/tinymce-react'
import {Fade} from 'react-awesome-reveal'

import './EditItemModal.css'
import {deleteOPInfoCard, updateInfoCardsOurPeople, createContent} from '../../../../../../services/ApiClient'
import {useFormState} from '../../../../../../hooks/useFormState'
import InputWithLabel from '../../../../../Form/InputWithLabel/InputWithLabel'
import Button from '../../../../../Form/FormButton/FormButton'

function EditItemModal({deleteItem, infodata, hideModal, closeModal}) {

    const [infocardsData, setInfoCardsData] = useState(infodata)
    const [message, setMessage] = useState('')

    const {state, onChange} = useFormState(
        {
            data: {
                id: infocardsData._id,
                title: infocardsData.title,
                info: infocardsData.info,
            },
            error: {
                title: true,
                info: true,
            },
            touch: {},
        },
        {
            title: v => v.length,
            info: v => v.length,
        }
    )

    const {data, error} = state
    const [registerError, setRegisterError] = useState(null)

    const contentData = {
        content: '',
        url: '/nuestra-gente',
        name: 'Nuestra gente',
        type: `${infodata?._id}`,
    }

    const updateInfo = async (event) => {
        event.preventDefault()

        if (contentData?.content?.length > 0) {
            createContent(contentData)
        }

        if (Object.values(error).map(el => el).includes(false)) {
            try {
                await updateInfoCardsOurPeople(data)
                    .then(info => {
                        setInfoCardsData(info)
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
            setMessage('Por favor complete alguno de los campos')
        }
    }


    const deleteSelected = async (id) => {
        const updateData = await deleteOPInfoCard(id)
        deleteItem(updateData)
    }

    const handleDescription = (e) => {
        data[e.target.settings.name] = e.target.getContent()
        contentData.content = e.target.getContent({format: "text"})
        error[e.target.settings.name] = false
    }


    return (
        <div className="EditItemModal">
            <div className="container">
                <div className="row justify-content-center">
                    <Fade direction="down" className="col-11 col-sm-6 EditItemModal__container">
                        <>
                            <span className="EditItemModal__close" onClick={closeModal}></span>
                            <form className="AdminEdit__form" onSubmit={updateInfo}>
                                <div className="row">
                                    <div className="col-sm-12">
                                        <h1 className="DeleteItemModal__ask">Editar equipo<span className="ShowEditModal__news-title">{infocardsData.title}</span></h1>
                                    </div>
                                    <div className="col-12">
                                        <InputWithLabel
                                            label="Título equipo"
                                            onChange={onChange}
                                            name="title"
                                            type="text"
                                            cssStyle="form-control"
                                            placeholder={infocardsData?.title}
                                        />
                                    </div>
                                    <div className="col-12">
                                        <p className="AdminEdit__form__label">
                                            Info equipo
                                        </p>
                                        <Editor
                                            initialValue={infocardsData?.info}
                                            onChange={handleDescription}
                                            apiKey={process.env.REACT_APP_API_TINY_CLOUD}
                                            init={{
                                                name: 'info',
                                                height: 180,
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
                                    <div className="col-12 col-sm-6 mt-5">
                                        <Button type="submit" cssStyle="leti-btn">Guardar cambios</Button>
                                    </div>
                                    <div className="col-12 col-sm-6 mt-5 d-flex justify-content-end">
                                        <div onClick={() => deleteSelected(infocardsData?._id)} className="leti-btn delete">Eliminar info</div>
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
    )
}

export default EditItemModal
