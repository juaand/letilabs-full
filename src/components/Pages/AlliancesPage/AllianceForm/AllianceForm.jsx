import React, {useState, useEffect} from 'react'

import {getFormAlliances, allianceForm} from '../../../../services/ApiClient'
import TextAreaWithLabel from '../../../Form/TextAreaWithLabel/TextAreaWithLabel'
import DropdownWithLabel from '../../../Form/DropdownWithLabel/DropdownWithLabel'
import InputWithLabel from '../../../Form/InputWithLabel/InputWithLabel'
import {useFormState} from '../../../../hooks/useFormState'
import Button from '../../../Form/FormButton/FormButton'
import dataCountry from '../../../../data/dataCountry'
import Loader from '../../../Loader/Loader'
import './AllianceForm.css'

function AllianceForm() {


    const {state, onBlur, onChange} = useFormState(
        {
            data: {
                name: "",
                lastname: "",
                mail: "",
                phone: "",
                country: "",
                company: "",
                message: ""
            },
            error: {
                name: true,
                lastname: true,
                mail: true,
                phone: true,
                country: true,
                message: true,
                company: true
            },
            touch: {},
        },
        {
            name: v => v.length,
            lastname: v => v.length,
            mail: v => v.length,
            phone: v => v.length,
            country: v => v.length,
            company: v => v.length,
            message: v => v.length
        }
    )

    // eslint-disable-next-line no-unused-vars
    const [registerError, setRegisterError] = useState(null)
    const [formResponse, setFormResponse] = useState([])
    const [init, setInit] = useState(state.data.message)
    const [message, setMessage] = useState(false)
    const [formData, setFormData] = useState([])
    const [loading, setLoading] = useState(true)

    const {data, error, touch} = state

    const handleSubmit = async (event) => {
        event.preventDefault()
        data.message = init

        if (Object.values(error).map(el => el).includes(false)) {
            try {
                const newVigilancia = await allianceForm(data)
                console.log(newVigilancia)
                setFormResponse(newVigilancia)
                setMessage(!message)
            } catch (err) {
                setRegisterError(err.response?.data?.message)
            }
        } else {
            setMessage('Por favor rellene todos los campos')
        }
    }

    const handleChange = (e) => {
        setInit(e.target.value)
        error.message = false
    }


    const isError = Object.values(error).some(err => err)

    useEffect(() => {
        const fetchData = async () => {
            const getFormAlliancesData = await getFormAlliances()
            setFormData(getFormAlliancesData[0])
        }
        fetchData()
        setLoading(!loading)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {loading && <Loader />}
            <section className="AllianceForm">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-11 col-sm-12 AllianceForm__container">
                            <div className="row">
                                <div className="col-12">
                                    <h1>{formData?.title}</h1>
                                </div>
                                <div className="col-12 col-sm-5">
                                    <p dangerouslySetInnerHTML={{__html: formData?.desc}} />
                                    <div className="AllianceForm__links">
                                        <a href={`tel:${formData?.phone}`}
                                        >{formData?.phone}</a>                                     <a href={`mailto:${formData?.email}`}>{formData?.email}</a></div>
                                </div>
                            </div>
                            {message &&
                                <div className="row AllianceForm__message">
                                    <div className="col-12">
                                        <h3>Gracias {formResponse.name},</h3>
                                        <p>Tu comentario ha sido enviado exitosamente.</p>
                                        <p className="AllianceForm__message-small">En breve nos pondremos en contacto contigo.</p>
                                        <div className="leti-blue-triangle"></div>
                                        <div className="leti-red-triangle"></div>
                                    </div>
                                </div>
                            }
                            {!message &&
                                <>
                                    <div className="row">
                                        <div className="col-12">
                                            <form onSubmit={handleSubmit} className="AllianceForm__form">
                                                <div className="row justify-content-between">
                                                    <div className="col-12 col-sm-6">

                                                        <InputWithLabel
                                                            value={data.name}
                                                            onBlur={onBlur}
                                                            onChange={onChange}
                                                            name="name"
                                                            type="text"
                                                            label="Nombre"
                                                            cssStyle={`form-control ${touch.name && error.name ? "is-invalid" : ""}`}
                                                            tabIndex="1"
                                                        />

                                                    </div>
                                                    <div className="col-12 col-sm-6">
                                                        <InputWithLabel
                                                            value={data.lastname}
                                                            onBlur={onBlur}
                                                            onChange={onChange}
                                                            name="lastname"
                                                            type="text"
                                                            label="Apellido"
                                                            cssStyle={`form-control ${touch.lastname && error.lastname ? "is-invalid" : ""}`}
                                                            tabIndex="2"
                                                        />
                                                    </div>
                                                    <div className="col-12 col-sm-6">
                                                        <InputWithLabel
                                                            value={data.mail}
                                                            onBlur={onBlur}
                                                            onChange={onChange}
                                                            name="mail"
                                                            type="email"
                                                            label="Email"
                                                            cssStyle={`form-control ${touch.mail && error.mail ? "is-invalid" : ""}`}
                                                            tabIndex="3"
                                                        />

                                                    </div>
                                                    <div className="col-12 col-sm-6">
                                                        <InputWithLabel
                                                            value={data.phone}
                                                            onBlur={onBlur}
                                                            onChange={onChange}
                                                            name="phone"
                                                            type="text"
                                                            label="Teléfono"
                                                            cssStyle={`form-control ${touch.phone && error.phone ? "is-invalid" : ""}`}
                                                            tabIndex="4"
                                                        />

                                                    </div>

                                                    <div className="col-12 col-sm-6">
                                                        <DropdownWithLabel
                                                            value={data.country}
                                                            label="País"
                                                            name="country"
                                                            onChange={onChange}
                                                            cssStyle={`form-control AllianceForm__dropdown ${touch.country && error.country ? "is-invalid" : ""}`}
                                                            tabIndex="5"
                                                            list="countries"
                                                            data={dataCountry}
                                                        />

                                                    </div>

                                                    <div className="col-12 col-sm-6">
                                                        <InputWithLabel
                                                            value={data.company}
                                                            onBlur={onBlur}
                                                            onChange={onChange}
                                                            name="company"
                                                            type="text"
                                                            label="Empresa/Institución"
                                                            cssStyle={`form-control ${touch.company && error.company ? "is-invalid" : ""}`}
                                                            tabIndex="6"
                                                        />

                                                    </div>
                                                    <div className="col-12">

                                                        <TextAreaWithLabel
                                                            label="Cuéntanos sobre tu iniciativa"
                                                            value={init}
                                                            onChange={handleChange}
                                                            name="effects"
                                                            rows="4"
                                                            cssStyle="form-control textarea"
                                                            placeholder=""
                                                            tabIndex="7"
                                                        />
                                                    </div>
                                                    <div className="col-12 d-flex justify-content-end">

                                                        <Button
                                                            type="submit"
                                                            cssStyle={`leti-btn ${isError && "disabled"}`}
                                                        >
                                                            Enviar
                                                        </Button>
                                                    </div>
                                                </div>

                                                {registerError && <div className="alert alert-danger">{registerError}</div>}
                                            </form>
                                        </div>
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </section>
        </>
    )

}

export default AllianceForm
