import React, {useState, useEffect} from 'react'
import {useFormState} from '../../../../../hooks/useFormState'
import {getFarmaco, updateFarmacoData} from '../../../../../services/ApiClient'
import InputWithLabel from '../../../../Form/InputWithLabel/InputWithLabel'
import Button from '../../../../Form/FormButton/FormButton'
import {Editor} from '@tinymce/tinymce-react'

function EditFarmacoVigilancia() {

    const [farmacoData, setFarmacoData] = useState()

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
                subTitle: false,
                buttonTitle: false,
            },
            touch: {},
        },
        {
            title: v => v.length,
            subTitle: v => v.length,
            buttonTitle: v => v.length,
        }
    )

    const {data, error, touch} = state
    const [registerError, setRegisterError] = useState(null)


    const updateFarmaco = async (event) => {
        event.preventDefault()
        data.id = farmacoData._id

        try {
            await updateFarmacoData(data)
                .then(farmaco => {
                    setFarmacoData(farmaco[0])
                })
                .catch(error => {
                    setRegisterError(error)
                })
        } catch (err) {
            setRegisterError(err.response?.data?.message)
        }
    }
    const handleFarmacoSubTitle = (e) => {
        data.subTitle = e.target.getContent()
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
            <h2>Farmaco vigilancia</h2>
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
                            placeholder={farmacoData?.title}
                        />
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
                            placeholder={farmacoData?.buttonTitle}
                        />
                    </div>
                    <div className="col-12 col-sm-6">
                        <p className="AdminEdit__form__label">
                            Descripción
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
                        <Button cssStyle="leti-btn AdminEdit__form-leti-btn" >Editar Farmaco Vigilancia</Button>
                    </div>

                </div>
                {registerError && <div className="alert alert-danger">{registerError}</div>}
            </form>
        </section>
    )
}

export default EditFarmacoVigilancia
