import React, {useState} from 'react'
import {Fade} from 'react-awesome-reveal'

import './EditItemModal.css'
import {updateCarouselManufacture, deleteProccess} from '../../../../../../services/ApiClient'
import InputWithLabel from '../../../../../Form/InputWithLabel/InputWithLabel'
import {useFormState} from '../../../../../../hooks/useFormState'
import Button from '../../../../../Form/FormButton/FormButton'


function EditItemModal({deleteItem,infodata, hideModal, closeModal}) {

    const [carouselData, setCarouselData] = useState(infodata)
    const [message, setMessage] = useState('')

    const {state, onChange} = useFormState(
        {
            data: {
                title: infodata?.title,
                info: infodata?.info,
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
        data.id = carouselData?._id

        if (Object.values(error).map(el => el).includes(false)) {
            try {
                await updateCarouselManufacture(data)
                    .then(info => {
                        setCarouselData(info)
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
            setMessage('Por favor edite el proceso')
        }
    }

    const deleteSelected = async (id) => {
        const updatedData = await deleteProccess(id)
        deleteItem(updatedData)
    }

    return (
        <div className="EditItemModal">
            <div className="container">
                <div className="row justify-content-center">
                    <Fade direction="down" className="col-11 col-sm-10 EditItemModal__container">
                        <>
                            <span className="EditItemModal__close" onClick={closeModal}></span>
                            <form className="AdminEdit__form" onSubmit={updateInfo}>
                                <div className="row">
                                    <div className="col-sm-12">
                                        <h1 className="DeleteItemModal__ask">Editar proceso</h1>
                                    </div>
                                    <div className="col-12">
                                        <InputWithLabel
                                            label="Descripción del proceso"
                                            onChange={onChange}
                                            name="info"
                                            type="text"
                                            cssStyle="form-control"
                                            placeholder={carouselData?.info}
                                        />
                                    </div>
                                    <div className="col-12 col-sm-6 mt-5">
                                            <div onClick={() => deleteSelected(carouselData?._id)} className="leti-btn delete">Eliminar proceso</div>
                                        </div>
                                    <div className="col-6 mt-5 mb-5">
                                        <Button type="submit" cssStyle="leti-btn">Guardar cambios</Button>
                                        {message && <span className="AdminEdit__message">{message}</span>}
                                    </div>
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

