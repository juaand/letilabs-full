import './Form.css'
import React, {useState} from 'react'
import {useFormState} from '../../../../hooks/useFormState'
import {vigilanciaForm} from '../../../../services/ApiClient'
import Button from '../../../Form/FormButton/FormButton'
import InputWithLabel from '../../../Form/InputWithLabel/InputWithLabel'
import TextAreaWithLabel from '../../../Form/TextAreaWithLabel/TextAreaWithLabel'
import DropdownWithLabel from '../../../Form/DropdownWithLabel/DropdownWithLabel'
import vadevecum from '../../../../data/vadevecum'
import RadioButtonWithLabel from '../../../Form/RadioButtonWithLabel/RadioButtonWithLabel'
import DateTimePicker from 'react-datetime-picker'

function Form() {

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

    // eslint-disable-next-line no-unused-vars
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
            document.querySelector('.PurposeForm__container').classList.add('PurposeForm__container--success')
            setFormResponse(newVigilancia)
            setMessage(!message)
            data.name = ""
            data.lastname = ""
            data.sex = ""
            data.medicine = ""
            data.date = new Date()
            data.prescribed = ""
            setEffects('')
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

    const getVadevecumNames = vadevecum.map(el => el.name)
    const dataList = [...new Set(getVadevecumNames)].sort()

    return (
        <section className="PurposeForm">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-11 col-sm-12 PurposeForm__container">
                        {message &&
                            <div className="PurposeForm__sent">
                                <div className="PurposeForm__content">
                                    <h1>Gracias {formResponse.name},</h1>
                                    <p>Tu comentario ha sido enviado exitosamente.</p>
                                    <div className="leti-blue-triangle"></div>
                                    <div className="leti-red-triangle"></div>
                                    <div className="leti-btn" onClick={() => setMessage(!message)}>Cerrar</div>
                                </div>
                            </div>
                        }
                        {!message &&
                            <>
                                <div className="row">
                                    <div className="col-12">
                                        <h1>Estamos para cuidarte</h1></div>
                                    <div className="col-12 col-sm-5">
                                        <p><strong>Farmacovigilancia</strong></p>
                                        <p>Conscientes de la responsabilidad por ofrecer medicamentos de alta calidad, facilitamos la recolección, evaluación e investigación de la información sobre posibles reacciones adversas de nuestros medicamentos, para realizar correctivos y establecer la máxima seguridad terapéutica de los mismos.</p>
                                        <p className="blue-text">Nos preocupa saber si alguno de nuestros productos le causó algún efecto adverso, así podemos trabajar para ayudarle.</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <form onSubmit={handleSubmit} className="PurposeForm__form">
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
                                                        tabIndex="1"
                                                    />

                                                    <div className="form-group PurposeForm__date" tabIndex="3">
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

                                                    <DropdownWithLabel
                                                        value={data.medicine}
                                                        label="Medicamento que tomó"
                                                        name="medicine"
                                                        onChange={onChange}
                                                        className={`form-control  mt-5 ${touch.medicine && error.medicine ? "is-invalid" : ""}`}
                                                        tabIndex="5"
                                                        list="medicines"
                                                        data={dataList}
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
                                                        tabIndex="2"
                                                    />

                                                    <RadioButtonWithLabel data={['F', 'M']} name="sex"
                                                        value={data.genero}
                                                        onBlur={onBlur}
                                                        onChange={onChange}
                                                        label="Género"
                                                        tabIndex="4"
                                                    />

                                                    <RadioButtonWithLabel data={['Si', 'No']} name="prescribed"
                                                        value={data.prescribed}
                                                        onBlur={onBlur}
                                                        onChange={onChange}
                                                        label="¿El medicamento fue prescrito?"
                                                        tabIndex="6"
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

export default Form