import React, {useState, useEffect} from 'react'
import {useFormState} from '../../../../../hooks/useFormState'
import {getUsInfo, updateUsInfoData, createContent} from '../../../../../services/ApiClient'
import InputWithLabel from '../../../../Form/InputWithLabel/InputWithLabel'
import Button from '../../../../Form/FormButton/FormButton'
import {Editor} from '@tinymce/tinymce-react'

function EditUsInfo() {

    const [usInfoData, setUsInfoData] = useState()
    const [message, setMessage] = useState('')
    const [registerError, setRegisterError] = useState(null)

    const {state, onBlur, onChange} = useFormState(
        {
            data: {
                id: '',
                description: usInfoData?.description,
                url: usInfoData?.url,
                buttonTitle: usInfoData?.buttonTitle,
            },
            error: {
                description: true,
                url: true,
                buttonTitle: true,
            },
            touch: {},
        },
        {
            description: v => v.length,
            url: v => v.length,
            buttonTitle: v => v.length,
        }
    )

    const {data, error, touch} = state

    const contentData = {
        content: '',
        url: '/',
        name: 'Inicio',
        type: 'Somos Leti',
    }

    const updateUsInfo = async (event) => {
        event.preventDefault()
        data.id = usInfoData._id

        if (contentData?.content?.length > 0) {
            createContent(contentData)
        }

        if (Object.values(error).map(el => el).includes(false)) {
            try {
                await updateUsInfoData(data)
                    .then(usInfo => {
                        setUsInfoData(usInfo)
                        setMessage('Cambios realizados con exito')
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


    const handleUsInfoDescription = (e) => {
        data.description = e.target.getContent()
        contentData.content = e.target.getContent({format: "text"})
        error.description = false
    }

    useEffect(() => {

        const fetchData = async () => {
            const getUsInfoData = await getUsInfo()
            setUsInfoData(getUsInfoData)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <section className="container-fluid EditContent">
            <h2>Somos Leti</h2>
            <form className="AdminEdit__form" onSubmit={updateUsInfo}>
                <div className="row">
                    <div className="col-12 col-sm-6">
                        <p className="AdminEdit__form__label">
                            Descripci??n
                        </p>
                        <Editor
                            initialValue={usInfoData?.description}
                            onChange={handleUsInfoDescription}
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
                        />
                    </div>
                    <div className="col-12 col-sm-6">
                        <p className="AdminEdit__form__label">
                            URL del bot??n <small>(en min??sculas y sin espacios en blanco)</small>
                        </p>
                        <InputWithLabel
                            value={data?.url}
                            onBlur={onBlur}
                            onChange={onChange}
                            name="url"
                            type="text"
                            cssStyle={`form-control ${touch.url && error.url ? "is-invalid" : ""}`}
                            placeholder={usInfoData?.url}
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
                            cssStyle={`form-control ${touch.buttonTitle && error.buttonTitle ? "is-invalid" : ""}`}
                            placeholder={usInfoData?.buttonTitle}
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

export default EditUsInfo
