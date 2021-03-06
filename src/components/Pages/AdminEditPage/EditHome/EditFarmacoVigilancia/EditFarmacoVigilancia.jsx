import React, {useState, useEffect} from 'react'
import {Editor} from '@tinymce/tinymce-react'

import {getFarmaco, updateFarmacoData} from '../../../../../services/ApiClient'
import InputWithLabel from '../../../../Form/InputWithLabel/InputWithLabel'
import {useFormState} from '../../../../../hooks/useFormState'
import Button from '../../../../Form/FormButton/FormButton'

function EditFarmacoVigilancia() {

    const [farmacoData, setFarmacoData] = useState()
    const [message, setMessage] = useState('')

    const {state, onBlur, onChange} = useFormState(
        {
            data: {
                id: '',
                title: farmacoData?.title,
                subTitle: farmacoData?.subTitle,
                buttonTitle: farmacoData?.buttonTitle,
            },
            error: {
                title: true,
                subTitle: true,
                buttonTitle: true,
            },
            touch: {},
        },
        {
            title: v => v.length,
            subTitle: v => v.length,
            buttonTitle: v => v.length,
        }
    )

    const {data, error} = state
    const [registerError, setRegisterError] = useState(null)


    const updateFarmaco = async (event) => {
        event.preventDefault()
        data.id = farmacoData._id

        if (Object.values(error).map(el => el).includes(false)) {
            try {
                await updateFarmacoData(data)
                    .then(farmaco => {
                        setFarmacoData(farmaco)
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

    const handleFarmacoSubTitle = (e) => {
        data.subTitle = e.target.getContent()
        error.subTitle = false
    }

    useEffect(() => {

        const fetchData = async () => {
            const getFarmacoData = await getFarmaco()
            setFarmacoData(getFarmacoData)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <section className="container-fluid EditContent">
            <h2>Farmaco vigilancia
                <small>(Edita los textos de farmacovigilancia de todo el site)</small></h2>
            <form className="AdminEdit__form" onSubmit={updateFarmaco}>
                <div className="row">
                    <div className="col-12 col-sm-6">
                        <p className="AdminEdit__form__label">
                            T??tulo
                        </p>
                        <InputWithLabel
                            value={data?.title}
                            onBlur={onBlur}
                            onChange={onChange}
                            name="title"
                            type="text"
                            cssStyle="form-control"
                            placeholder={farmacoData?.title}
                        />
                        <p className="AdminEdit__form__label">
                            T??tulo del bot??n
                        </p>
                        <InputWithLabel
                            value={data?.buttonTitle}
                            onBlur={onBlur}
                            onChange={onChange}
                            name="buttonTitle"
                            type="text"
                            cssStyle="form-control"
                            placeholder={farmacoData?.buttonTitle}
                        />
                    </div>
                    <div className="col-12 col-sm-6">
                        <p className="AdminEdit__form__label">
                            Descripci??n
                        </p>
                        <Editor
                            initialValue={farmacoData?.subTitle}
                            onChange={handleFarmacoSubTitle}
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

export default EditFarmacoVigilancia
