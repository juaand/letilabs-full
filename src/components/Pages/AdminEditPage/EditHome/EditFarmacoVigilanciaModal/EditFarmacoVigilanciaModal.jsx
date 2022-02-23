import React, {useState, useEffect} from 'react'
import {Editor} from '@tinymce/tinymce-react'

import {getModalFarmaco, updateModalFarmaco} from '../../../../../services/ApiClient'
import InputWithLabel from '../../../../Form/InputWithLabel/InputWithLabel'
import {useFormState} from '../../../../../hooks/useFormState'
import Button from '../../../../Form/FormButton/FormButton'

function EditFarmacoVigilanciaModal() {

    const [modalFarmacoData, setModalFarmacoData] = useState()
    const [message, setMessage] = useState('')

    const {state, onBlur, onChange} = useFormState(
        {
            data: {
                id: '',
                title: modalFarmacoData?.title,
                subTitle: modalFarmacoData?.subTitle,
                description: modalFarmacoData?.description,
            },
            error: {
                title: true,
                subTitle: true,
                description: true,
            },
            touch: {},
        },
        {
            title: v => v.length,
            subTitle: v => v.length,
            description: v => v.length,
        }
    )

    const {data, error, touch} = state
    const [registerError, setRegisterError] = useState(null)


    const updateFarmaco = async (event) => {
        event.preventDefault()
        data.id = modalFarmacoData._id

        if (Object.values(error).map(el => el).includes(false)) {
            try {
                await updateModalFarmaco(data)
                    .then(farmaco => {
                        setModalFarmacoData(farmaco[0])
                        setMessage('Data atualizada exitosamente')
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
        data.description = e.target.getContent()
        error.description = false
    }

    useEffect(() => {
        const fetchData = async () => {
            const getFarmacoData = await getModalFarmaco()
            setModalFarmacoData(getFarmacoData)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    
    return (
        <section className="container-fluid EditContent">
            <h2>Modal farmaco vigilancia <small>(Edita el modal de farmacovigilancia de todo el site)</small></h2>
            <form className="AdminEdit__form" onSubmit={updateFarmaco}>
                <div className="row">
                    <div className="col-12 col-sm-6">
                        <p className="AdminEdit__form__label">
                            Título
                        </p>
                        <InputWithLabel
                            value={data?.title}
                            onBlur={onBlur}
                            onChange={onChange}
                            name="title"
                            type="text"
                            cssStyle={`form-control ${touch.title && error.title ? "is-invalid" : ""}`}
                            placeholder={modalFarmacoData?.title}
                        />
                        <p className="AdminEdit__form__label">
                            Subtítulo
                        </p>
                        <InputWithLabel
                            value={data?.subTitle}
                            onBlur={onBlur}
                            onChange={onChange}
                            name="subTitle"
                            type="text"
                            cssStyle={`form-control ${touch.subTitle && error.subTitle ? "is-invalid" : ""}`}
                            placeholder={modalFarmacoData?.subTitle}
                        />
                    </div>
                    <div className="col-12 col-sm-6">
                        <p className="AdminEdit__form__label">
                            Descripción
                        </p>
                        <Editor
                            initialValue={modalFarmacoData?.description}
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
                        /></div>
                    <div className="col-12">
                        <Button cssStyle="leti-btn AdminEdit__form-leti-btn" >Guardar cambios</Button>
                        {message && <span className="AdminEdit__message">{message}</span>}
                    </div>

                </div>
                {registerError && <div className="alert alert-danger">{registerError}</div>}
            </form>
        </section>
    )
}

export default EditFarmacoVigilanciaModal
