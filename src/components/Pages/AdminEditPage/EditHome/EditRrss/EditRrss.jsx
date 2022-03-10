import React, {useState, useEffect} from 'react'

import {getRrssInfo, updateRrssInfo} from '../../../../../services/ApiClient'
import {useFormState} from '../../../../../hooks/useFormState'

import InputWithLabel from '../../../../Form/InputWithLabel/InputWithLabel'
import Button from '../../../../Form/FormButton/FormButton'

function EditCookies() {

    const [rrssData, setRrssData] = useState()
    const [message, setMessage] = useState('')

    const {state, onChange} = useFormState(
        {
            data: {
                id: rrssData?._id,
                facebook: rrssData?.facebook,
                linkedin: rrssData?.linkedin,
                whatsapp: rrssData?.whatsapp,
            },
            error: {
                facebook: true,
                linkedin: true,
                whatsapp: true,
            },
            touch: {},
        },
        {
            facebook: v => v.length,
            linkedin: v => v.length,
            whatsapp: v => v.length,
        }
    )

    const {data, error} = state
    const [registerError, setRegisterError] = useState(null)


    const updateFarmaco = async (event) => {
        event.preventDefault()
        data.id = rrssData._id

        if (Object.values(error).map(el => el).includes(false)) {
            try {
                await updateRrssInfo(data)
                    .then(cookie => {
                        setRrssData(cookie)
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

    useEffect(() => {
        const fetchData = async () => {
            const getRrssData = await getRrssInfo()
            setRrssData(getRrssData[0])
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <section className="container-fluid EditContent EditContent__active">
            <h2>Redes sociales</h2>
            <form className="AdminEdit__form" onSubmit={updateFarmaco}>
                <div className="row">
                    <div className="col-sm-4 col-12">
                        <p className="AdminEdit__form__label">
                            Facebook URL (No olvide el http://)
                        </p>
                        <InputWithLabel
                            value={data?.facebook}
                            onChange={onChange}
                            name="facebook"
                            type="text"
                            cssStyle="form-control"
                            placeholder={rrssData?.facebook}
                        />
                    </div>
                    <div className="col-sm-4 col-12">
                        <p className="AdminEdit__form__label">
                            Linkedin URL (No olvide el http://)
                        </p>
                        <InputWithLabel
                            value={data?.linkedin}
                            onChange={onChange}
                            name="linkedin"
                            type="text"
                            cssStyle="form-control"
                            placeholder={rrssData?.linkedin}
                        />
                    </div>
                    <div className="col-sm-4 col-12">
                        <p className="AdminEdit__form__label">
                            Teléfono Whatsapp (Ej: 5712345678)
                        </p>
                        <InputWithLabel
                            value={data?.whatsapp}
                            onChange={onChange}
                            name="whatsapp"
                            type="text"
                            cssStyle="form-control"
                            placeholder={rrssData?.whatsapp}
                        />
                    </div>
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

export default EditCookies
