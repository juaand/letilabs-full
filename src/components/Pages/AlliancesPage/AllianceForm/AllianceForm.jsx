import './AllianceForm.css'
import React, {useState} from 'react'
import {useFormState} from '../../../../hooks/useFormState'
import {vigilanciaForm} from '../../../../services/ApiClient'
import Button from '../../../Form/FormButton/FormButton'
import InputWithLabel from '../../../Form/InputWithLabel/InputWithLabel'
import TextAreaWithLabel from '../../../Form/TextAreaWithLabel/TextAreaWithLabel'
import DropdownWithLabel from '../../../Form/DropdownWithLabel/DropdownWithLabel'
import dataCountry from '../../../../data/dataCountry'

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
                desc: ""
            },
            error: {
                name: true,
                lastname: true,
                mail: true,
                phone: true,
                country: true,
                desc: true,
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
            desc: v => v.length
        }
    )

    // eslint-disable-next-line no-unused-vars
    const [registerError, setRegisterError] = useState(null)
    const [init, setInit] = useState(state.data.desc)
    const [formResponse, setFormResponse] = useState([])
    const [message, setMessage] = useState(false)

    const {data, error, touch} = state

    const handleSubmit = async (event) => {
        event.preventDefault()
        data.desc = init

        try {
            console.log(data)
            // const newVigilancia = await vigilanciaForm(data)
            // document.querySelector('form').reset()
            // document.querySelector('.ModalFarmacoVigilancia__container').classList.add('ModalFarmacoVigilancia__container--success')
            // setFormResponse(newVigilancia)
            // setMessage(!message)
        } catch (err) {
            setRegisterError(err.response?.data?.message)
        }
    }

    const handleChange = (e) => {
        setInit(e.target.value)
        error.desc = false
    }


    const isError = Object.values(error).some(err => err)

    return (
        <section className="AllianceForm">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-11 col-sm-12 AllianceForm__container">
                        {message &&
                            <>
                                <h1>Gracias {formResponse.name},</h1>
                                <p>Tu comentario ha sido enviado exitosamente.</p>
                                <div className="leti-blue-triangle"></div>
                                <div className="leti-red-triangle"></div>
                            </>
                        }
                        {!message &&
                            <>
                                <div className="row">
                                    <div className="col-12">
                                        <h1>¡Tu contribución cuenta!</h1>
                                    </div>
                                    <div className="col-12 col-sm-5">
                                        <p>¿Quieres aliarte con nosotros?
                                            Compártenos tu iniciativa aquí o contáctanos.</p>
                                        <div className="AllianceForm__links">
                                            <a href="tel:+582123602511"
                                            >+582123602511</a>                                     <a href="mailto:comunicaciones.leti@leti.com">comunicaciones.leti@leti.com.ve</a></div>
                                    </div>
                                </div>
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
                                                        className={`leti-btn ${isError && "disabled"}`}
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
    )

}

export default AllianceForm
