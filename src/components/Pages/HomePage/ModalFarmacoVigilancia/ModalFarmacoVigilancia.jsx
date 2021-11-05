import './ModalFarmacoVigilancia.css'
import React, {useState} from 'react'
import {useFormState} from '../../../../hooks/useFormState'
import InputWithLabel from '../../../Form/InputWithLabel/InputWithLabel'
import RadioButtonWithLabel from '../../../Form/RadioButtonWithLabel/RadioButtonWithLabel'
import Button from '../../../Form/FormButton/FormButton'
import DateTimePicker from "react-datetime-picker"
import TextAreaWithLabel from '../../../Form/TextAreaWithLabel/TextAreaWithLabel'
import {vigilanciaForm} from '../../../../services/ApiClient'

function ModalFarmacoVigilancia({hideModal}) {

    const {state, onBlur, onChange} = useFormState(
        {
            data: {
                name: "",
                lastname: "",
                sex: "",
                medicine: "",
                date: new Date(),
                effects: "",
                prescribed: ""
            },
            error: {
                name: true,
                lastname: true,
                sex: true,
                medicine: true,
                date: true,
                prescribed: true,
                effects: true
            },
            touch: {},
        },
        {
            name: v => v.length,
            lastname: v => v.length,
            sex: v => v.length,
            medicine: v => v.length,
            date: v => v.length,
            effects: v => v.length,
            prescribed: v => v.length
        }
    )

    const [date, setDate] = useState(new Date())
    const [registerError, setRegisterError] = useState(null)
    const [effects, setEffects] = useState(state.data.effects)
    const [formResponse, setFormResponse] = useState([])
    const [message, setMessage] = useState(false)

    const {data, error, touch} = state

    const handleSubmit = async (event) => {
        event.preventDefault()
        data.effects = effects

        try {
            const newVigilancia = await vigilanciaForm(data)
            document.querySelector('form').reset()
            document.querySelector('.ModalFarmacoVigilancia__container').classList.add('ModalFarmacoVigilancia__container--success')
            setFormResponse(newVigilancia)
            setMessage(!message)
        } catch (err) {
            setRegisterError(err.response?.data?.message)
        }
    }

    const handleChange = (e) => {
        setEffects(e.target.value)
        error.effects = false
    }

    const setTime = (e) => {
        setDate(e)
        data.date = e
        error.date = false
    }

    const isError = Object.values(error).some(err => err)

    return (
        <section className="ModalFarmacoVigilancia">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-11 col-sm-12 ModalFarmacoVigilancia__container">
                        {message &&
                            <>
                                <h1>Gracias {formResponse.name},</h1>
                                <p>Tu comentario ha sido enviado exitosamente.</p>
                                <div className="leti-blue-triangle"></div>
                                <div className="leti-red-triangle"></div>
                                <div className="leti-btn" onClick={hideModal}>Cerrar</div>
                            </>
                        }
                        {!message &&
                            <>
                                <span className="ModalFarmacoVigilancia__close" onClick={hideModal}></span>
                                <div className="row">
                                    <div className="col-12">
                                        <h1>Estamos para cuidarte</h1></div>
                                    <div className="col-12 col-sm-5">
                                        <p><strong>Farmacovigilancia</strong></p>
                                        <p>Facilita la recolección, vigilancia, investigación y evaluación de la información sobre reacciones adversas de los medicamentos, lo que permite realizar correctivos y establecer la seguridad terapéutica de los mismos.</p>
                                        <p className="blue-text">Nos preocupa saber si alguno de nuestros productos le causó algún efecto adverso, así podemos trabajar para ayudarlo.</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <form onSubmit={handleSubmit}>
                                            <div className="row justify-content-between">
                                                <div className="col-12 col-sm-5">

                                                    <InputWithLabel
                                                        value={data.name}
                                                        onBlur={onBlur}
                                                        onChange={onChange}
                                                        name="name"
                                                        type="text"
                                                        label="Nombre del paciente"
                                                        className={`form-control ${touch.name && error.name ? "is-invalid" : ""}`}
                                                        tabindex="1"
                                                    />

                                                    <div className="form-group ModalFarmacoVigilancia__date" tabindex="3">
                                                        <label className="label" htmlFor="date">
                                                            Fecha de nacimiento
                                                        </label>
                                                        <DateTimePicker
                                                            onChange={setTime}
                                                            value={data.date}
                                                            locale="es-ES"
                                                            format="dd-MM-y"
                                                        />
                                                    </div>

                                                    <InputWithLabel
                                                        value={data.medicine}
                                                        onBlur={onBlur}
                                                        onChange={onChange}
                                                        name="medicine"
                                                        type="text"
                                                        label="Medicamento que tomó"
                                                        className={`form-control ${touch.medicine && error.medicine ? "is-invalid" : ""}`}
                                                        tabindex="5"
                                                    />
                                                </div>
                                                <div className="col-12 col-sm-5">

                                                    <InputWithLabel
                                                        value={data.lastname}
                                                        onBlur={onBlur}
                                                        onChange={onChange}
                                                        name="lastname"
                                                        type="text"
                                                        label="Apellido del paciente"
                                                        className={`form-control ${touch.lastname && error.lastname ? "is-invalid" : ""}`}
                                                        tabindex="2"
                                                    />

                                                    <RadioButtonWithLabel data={['F', 'M']} name="sex"
                                                        value={data.genero}
                                                        onBlur={onBlur}
                                                        onChange={onChange}
                                                        label="Género"
                                                        tabindex="4"
                                                    />

                                                    <RadioButtonWithLabel data={['Si', 'No']} name="prescribed"
                                                        value={data.prescribed}
                                                        onBlur={onBlur}
                                                        onChange={onChange}
                                                        label="¿El medicamento fue prescrito?"
                                                        tabindex="6"
                                                    />

                                                </div>
                                                <div className="col-12">
                                                    <TextAreaWithLabel
                                                        label="Describa detalladamente el/los efectos presentados"
                                                        value={effects}
                                                        onChange={handleChange}
                                                        name="effects"
                                                        rows="4"
                                                        className="form-control textarea"
                                                        placeholder=""
                                                        tabindex="7"
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

export default ModalFarmacoVigilancia
