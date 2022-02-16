import React, {useState} from 'react'
import {Fade} from 'react-awesome-reveal'

import './EditItemModal.css'
import {deleteOPInfoCard, updateInfoCardsOurPeople} from '../../../../../../services/ApiClient'
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

    const updateInfo = async (event) => {
        event.preventDefault()

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
                                        <InputWithLabel
                                            label="Info equipo"
                                            onChange={onChange}
                                            name="info"
                                            type="text"
                                            cssStyle="form-control"
                                            placeholder={infocardsData?.info}
                                        />
                                    </div>
                                    <div className="col-12 col-sm-6 mt-5">
                                        <div onClick={() => deleteSelected(infocardsData?._id)} className="leti-btn delete">Eliminar info</div>
                                    </div>
                                    <div className="col-12 col-sm-6 mt-5 d-flex justify-content-end">
                                        <Button type="submit" cssStyle="leti-btn">Guardar cambios</Button>
                                    </div>
                                    {message &&
                                        <div className="row">
                                            <span className="AdminEdit__message col-12 d-flex justify-content-end">{message}</span>
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
