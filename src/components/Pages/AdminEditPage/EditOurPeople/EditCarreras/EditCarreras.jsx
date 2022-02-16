import React, {useState, useEffect} from 'react'
import {Editor} from '@tinymce/tinymce-react'

import {getCarreras, updateCarrerasData} from '../../../../../services/ApiClient'
import InputWithLabel from '../../../../Form/InputWithLabel/InputWithLabel'
import {useFormState} from '../../../../../hooks/useFormState'
import Button from '../../../../Form/FormButton/FormButton'


function EditCarreras() {

    const [carrerasData, setCarrerasData] = useState([])
    const [message, setMessage] = useState('')

    const {state, onBlur, onChange} = useFormState(
        {
            data: {
                id: '',
                title: carrerasData?.title,
                description: carrerasData?.description,
                buttonLink: carrerasData?.buttonLink,
                buttonTitle: carrerasData?.buttonTitle,
            },
            error: {
                title: true,
                description: true,
                buttonLink: true,
                buttonTitle: true,
            },
            touch: {},
        },
        {
            title: v => v.length,
            description: v => v.length,
            buttonLink: v => v.length,
            buttonTitle: v => v.length,
        }
    )

    const {data, error, touch} = state
    const [registerError, setRegisterError] = useState(null)


    const updateCarreras = async (event) => {
        event.preventDefault()
        data.id = carrerasData._id

        console.log(data)
        console.log(error)

        if (Object.values(error).map(el => el).includes(false)) {
            try {
                await updateCarrerasData(data)
                    .then(carreras => {
                        setCarrerasData(carreras)
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

    const handleCarrerasDescription = (e) => {
        data.description = e.target.getContent()
    }


    useEffect(() => {
        const fetchData = async () => {
            const getCarrerasData = await getCarreras()
            setCarrerasData(getCarrerasData)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <section className="container-fluid EditContent">
            <h2>Carreras</h2>
            <form className="AdminEdit__form" onSubmit={updateCarreras}>
                <div className="row">
                    <div className="col-12 col-sm-3">
                        <p className="AdminEdit__form__label">
                            Título
                        </p>
                        <InputWithLabel
                            value={data?.title}
                            onBlur={onBlur}
                            onChange={onChange}
                            name="title"
                            type="text"
                            cssStyle={`form-control mb-0 ${touch.title && error.title ? "is-invalid" : ""}`}
                            placeholder={carrerasData?.title}
                        />
                    </div>
                    <div className="col-12 col-sm-3">
                        <p className="AdminEdit__form__label">
                            Descripción
                        </p>

                        <InputWithLabel
                            value={data?.description}
                            onBlur={onBlur}
                            onChange={onChange}
                            name="description"
                            type="text"
                            cssStyle={`form-control mb-0 ${touch.description && error.description ? "is-invalid" : ""}`}
                            placeholder={carrerasData?.description}
                        />
                    </div>
                    <div className="col-12 col-sm-3">
                        <p className="AdminEdit__form__label">
                            Título del botón
                        </p>
                        <InputWithLabel
                            value={data?.buttonTitle}
                            onBlur={onBlur}
                            onChange={onChange}
                            name="buttonTitle"
                            type="text"
                            cssStyle={`form-control ${touch.buttonTitle && error.buttonTitle ? "is-invalid" : ""}`}
                            placeholder={carrerasData?.buttonTitle}
                        />
                    </div>
                    <div className="col-12 col-sm-3">
                        <p className="AdminEdit__form__label">
                            buttonLink del botón
                        </p>
                        <InputWithLabel
                            value={data?.buttonLink}
                            onBlur={onBlur}
                            onChange={onChange}
                            name="buttonLink"
                            type="text"
                            cssStyle={`form-control ${touch.buttonLink && error.buttonLink ? "is-invalid" : ""}`}
                            placeholder={carrerasData?.buttonLink}
                        />
                    </div>
                    <div className="col-12">
                        <Button cssStyle="leti-btn AdminEdit__form-leti-btn">Guardar cambios</Button>
                        {message && <span className="AdminEdit__message">{message}</span>}
                    </div>
                </div>
                {registerError && <div className="alert alert-danger">{registerError}</div>}
            </form>
        </section>
    )
}

export default EditCarreras
