import React, {useState, useEffect} from 'react'
import DateTimePicker from "react-datetime-picker"

import {vigilanciaForm, getVadevecumData, getModalFarmaco} from '../../../../services/ApiClient'
import RadioButtonWithLabel from '../../../Form/RadioButtonWithLabel/RadioButtonWithLabel'
import TextAreaWithLabel from '../../../Form/TextAreaWithLabel/TextAreaWithLabel'
import DropdownWithLabel from '../../../Form/DropdownWithLabel/DropdownWithLabel'
import InputWithLabel from '../../../Form/InputWithLabel/InputWithLabel'
import {useFormState} from '../../../../hooks/useFormState'
import Button from '../../../Form/FormButton/FormButton'
import './ModalFarmacoVigilancia.css'

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
                prescribed: "",
                email: ""
            },
            error: {
                name: true,
                lastname: true,
                sex: true,
                medicine: true,
                date: true,
                prescribed: true,
                effects: true,
                email: true
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
            prescribed: v => v.length,
            email: v => v.length
        }
    )


    const [modalFarmacoData, setModalFarmacoData] = useState()
    const [effects, setEffects] = useState(state.data.effects)
    const [registerError, setRegisterError] = useState(null)
    const [formResponse, setFormResponse] = useState([])
    const [vadevecum, setVadevecum] = useState([])
    const [message, setMessage] = useState(false)
    // eslint-disable-next-line no-unused-vars
    const [date, setDate] = useState(new Date())

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

    const clickedOutside = (e) => {
        if (!document.querySelector('.ModalFarmacoVigilancia__container').contains(e.target)) {
            hideModal()
        }
    }

    const isError = Object.values(error).some(err => err)

    const getVadevecumNames = vadevecum?.map(el => el.name)
    const dataList = [...new Set(getVadevecumNames)].sort()

    useEffect(() => {
        const fetchData = async () => {
            const data = await getVadevecumData()
            setVadevecum(data)
            const getModalData = await getModalFarmaco()
            setModalFarmacoData(getModalData)
        }
        fetchData()

    }, [])

    return (
        <section className="ModalFarmacoVigilancia" onClick={clickedOutside}>
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
                                        <h1>{modalFarmacoData?.title}</h1></div>
                                    <div className="col-12 col-sm-5">
                                        <p><strong>{modalFarmacoData?.subTitle}</strong></p>
                                        <p className="ModalFarmacoVigilancia__desc" dangerouslySetInnerHTML={{__html: modalFarmacoData?.description}} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <form onSubmit={handleSubmit} className="ModalFarmacoVigilancia__form">
                                            <div className="row justify-content-between">
                                                <div className="col-12">
                                                    <div className="row">
                                                        <div className="col-12 col-sm-4">
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
                                                        <div className="col-12 col-sm-4">
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
                                                                value={data.email}
                                                                onBlur={onBlur}
                                                                onChange={onChange}
                                                                name="email"
                                                                type="email"
                                                                label="Correo electr??nico del paciente"
                                                                cssStyle={`form-control ${touch.email && error.email ? "is-invalid" : ""}`}
                                                                tabIndex="3"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12 col-sm-5">
                                                    <div className="form-group ModalFarmacoVigilancia__date" tabIndex="3">
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
                                                        label="Medicamento que tom??"
                                                        name="medicine"
                                                        onChange={onChange}
                                                        cssStyle={`form-control ${touch.medicine && error.medicine ? "is-invalid" : ""}`}
                                                        tabIndex="6"
                                                        list="medicines"
                                                        data={dataList}
                                                    />

                                                </div>
                                                <div className="col-12 col-sm-5">

                                                    <RadioButtonWithLabel data={['F', 'M']} name="sex"
                                                        value={data.genero}
                                                        onBlur={onBlur}
                                                        onChange={onChange}
                                                        label="G??nero"
                                                        tabIndex="4"
                                                    />

                                                    <RadioButtonWithLabel data={['Si', 'No']} name="prescribed"
                                                        value={data.prescribed}
                                                        onBlur={onBlur}
                                                        onChange={onChange}
                                                        label="??El medicamento fue prescrito?"
                                                        tabIndex="7"
                                                    />

                                                </div>
                                                <div className="col-12">
                                                    <TextAreaWithLabel
                                                        label="Describa detalladamente el/los efectos presentados"
                                                        value={effects}
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
    )
}

export default ModalFarmacoVigilancia
