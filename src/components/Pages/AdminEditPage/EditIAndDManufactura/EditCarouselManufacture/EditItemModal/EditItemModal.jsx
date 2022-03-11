import React, {useState} from 'react'
import {Fade} from 'react-awesome-reveal'
import {Editor} from '@tinymce/tinymce-react'

import {updateCarouselManufacture, deleteProccess, createContent} from '../../../../../../services/ApiClient'
import {useFormState} from '../../../../../../hooks/useFormState'

import Button from '../../../../../Form/FormButton/FormButton'
import './EditItemModal.css'


function EditItemModal({deleteItem, infodata, hideModal, closeModal}) {

    const [carouselData, setCarouselData] = useState(infodata)
    const [message, setMessage] = useState('')

    const {state} = useFormState(
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

    const contentData = {
        content: '',
        url: '/manufactura',
        name: 'Manufactura',
        type: `${infodata?._id}`,
    }

    const updateInfo = async (event) => {
        event.preventDefault()
        data.id = carouselData?._id

        if (contentData?.content?.length > 0) {
            createContent(contentData)
        }

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

    const handleChange = (e) => {
        data.info = e.target.getContent()
        contentData.content = e.target.getContent({format: "text"})
        error.info = false
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
                                        <h1 className="DeleteItemModal__ask">Editar proceso</h1>
                                    </div>
                                    <div className="col-12">
                                        <Editor
                                            initialValue={carouselData?.info}
                                            onChange={handleChange}
                                            apiKey={process.env.REACT_APP_API_TINY_CLOUD}
                                            init={{
                                                name: 'composition',
                                                height: 140,
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
                                        <div onClick={() => deleteSelected(carouselData?._id)} className="leti-btn delete">Eliminar proceso</div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    {message && <span className="AdminEdit__message m-0">{message}</span>}
                                    {registerError && <div className="alert alert-danger">{registerError}</div>}
                                </div>
                            </form>
                        </>
                    </Fade>
                </div>
            </div>
        </div>
    )
}

export default EditItemModal


