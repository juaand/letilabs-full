import './QuestionModal.css'
import React, {useState} from 'react'
import {useFormState} from '../../../../hooks/useFormState'
import InputWithLabel from '../../../Form/InputWithLabel/InputWithLabel'
import Button from '../../../Form/FormButton/FormButton'
import TextAreaWithLabel from '../../../Form/TextAreaWithLabel/TextAreaWithLabel'
import {vigilanciaForm} from '../../../../services/ApiClient'
import {Reveal} from "react-awesome-reveal"
import {keyframes} from "@emotion/react"

function QuestionModal({hideModal}) {

    const customAnimation = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0rem, -10rem, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }`

    const {state, onBlur, onChange} = useFormState(
        {
            data: {
                name: "",
                lastname: "",
                work: "",
                years: "",
                speciality: "",
                info: "",
                license: "",
                mail: "",
            },
            error: {
                name: true,
                lastname: true,
                work: true,
                years: true,
                speciality: true,
                license: true,
                info: true,
                mail: true,
            },
            touch: {},
        },
        {
            name: v => v.length,
            lastname: v => v.length,
            work: v => v.length,
            years: v => v.length,
            speciality: v => v.length,
            info: v => v.length,
            license: v => v.length,
            mail: v => v.length,
        }
    )

    const [registerError, setRegisterError] = useState(null)
    const [info, setInfo] = useState(state.data.info)
    const [formResponse, setFormResponse] = useState([])
    const [message, setMessage] = useState(false)

    const {data, error, touch} = state

    const handleSubmit = async (event) => {
        event.preventDefault()
        data.info = info

        try {
            console.log(data)
            // const newVigilancia = await vigilanciaForm(data)
            // document.querySelector('form').reset()
            // document.querySelector('.QuestionModal__container').classList.add('QuestionModal__container--success')
            // setFormResponse(newVigilancia)
            // setMessage(!message)
        } catch (err) {
            setRegisterError(err.response?.data?.message)
        }
    }

    const handleChange = (e) => {
        setInfo(e.target.value)
        error.info = false
    }

    const clickedOutside = (e) => {
        if (!document.querySelector('.QuestionModal__container').contains(e.target)) {
            hideModal()
        }
    }

    const isError = Object.values(error).some(err => err)

    return (
        <section className="QuestionModal" onClick={clickedOutside}>
            <Reveal triggerOnce keyframes={customAnimation} duration={600} className="container">
                <div className="row justify-content-center">
                    <div className="col-11 col-sm-12 QuestionModal__container">
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
                                <span className="QuestionModal__close" onClick={hideModal}></span>
                                <div className="row">
                                    <div className="col-12">
                                        <form onSubmit={handleSubmit} className="QuestionModal__form">
                                            <div className="row justify-content-between">
                                                <div className="col-12 col-sm-6">
                                                    <InputWithLabel
                                                        value={data.name}
                                                        onBlur={onBlur}
                                                        onChange={onChange}
                                                        name="name"
                                                        type="text"
                                                        label="Nombre del paciente"
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
                                                        label="Apellido del paciente"
                                                        cssStyle={`form-control ${touch.lastname && error.lastname ? "is-invalid" : ""}`}
                                                        tabIndex="2"
                                                    />
                                                </div>
                                                <div className="col-12 col-sm-4">
                                                    <InputWithLabel
                                                        value={data.mail}
                                                        onBlur={onBlur}
                                                        onChange={onChange}
                                                        name="mail"
                                                        type="email"
                                                        label="Correo electrónico"
                                                        cssStyle={`form-control ${touch.mail && error.mail ? "is-invalid" : ""}`}
                                                        tabIndex="3"
                                                    />
                                                </div>
                                                <div className="col-12 col-sm-4">
                                                    <InputWithLabel
                                                        value={data.work}
                                                        onBlur={onBlur}
                                                        onChange={onChange}
                                                        name="work"
                                                        type="text"
                                                        label="Institución donde ejerce"
                                                        cssStyle={`form-control ${touch.work && error.work ? "is-invalid" : ""}`}
                                                        tabIndex="4"
                                                    />
                                                </div>
                                                <div className="col-12 col-sm-4">
                                                    <InputWithLabel
                                                        value={data.years}
                                                        onBlur={onBlur}
                                                        onChange={onChange}
                                                        name="years"
                                                        type="text"
                                                        label="Años de servicio"
                                                        cssStyle={`form-control ${touch.years && error.years ? "is-invalid" : ""}`}
                                                        tabIndex="5"
                                                    />
                                                </div>
                                                <div className="col-12 col-sm-6">
                                                    <InputWithLabel
                                                        value={data.speciality}
                                                        onBlur={onBlur}
                                                        onChange={onChange}
                                                        name="speciality"
                                                        type="text"
                                                        label="Especialidad"
                                                        cssStyle={`form-control ${touch.speciality && error.speciality ? "is-invalid" : ""}`}
                                                        tabIndex="6"
                                                    />
                                                </div>
                                                <div className="col-12 col-sm-6">
                                                    <InputWithLabel
                                                        value={data.license}
                                                        onBlur={onBlur}
                                                        onChange={onChange}
                                                        name="license"
                                                        type="text"
                                                        label="Número de licencia"
                                                        cssStyle={`form-control ${touch.license && error.license ? "is-invalid" : ""}`}
                                                        tabIndex="7"
                                                    />
                                                </div>

                                                <div className="col-12">
                                                    <TextAreaWithLabel
                                                        label="Información que desea"
                                                        value={info}
                                                        onChange={handleChange}
                                                        name="info"
                                                        rows="4"
                                                        cssStyle="form-control textarea"
                                                        placeholder=""
                                                        tabIndex="8"
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
            </Reveal>
        </section>
    )
}

export default QuestionModal
