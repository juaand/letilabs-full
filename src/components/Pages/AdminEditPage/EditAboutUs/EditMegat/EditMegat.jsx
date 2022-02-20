import React, {useState, useEffect} from 'react'
import {useFormState} from '../../../../../hooks/useFormState'
import {getMegat, updateMegatData} from '../../../../../services/ApiClient'
import InputWithLabel from '../../../../Form/InputWithLabel/InputWithLabel'
import Button from '../../../../Form/FormButton/FormButton'
import {Editor} from '@tinymce/tinymce-react'


function EditMegat() {

    const [megatData, setMegatData] = useState()

    const {state, onBlur, onChange} = useFormState(
        {
            data: {
                id: '',
                title: megatData?.title,
                description: megatData?.description,
                url: megatData?.url,
                buttonTitle: megatData?.buttonTitle,
            },
            error: {
                title: true,
                description: true,
                url: false,
                buttonTitle: false,
            },
            touch: {},
        },
        {
            dtitle: v => v.length,
            description: v => v.length,
            url: v => v.length,
            buttonTitle: v => v.length,
        }
    )

    const {data, error, touch} = state
    const [registerError, setRegisterError] = useState(null)


    const updateMegat = async (event) => {
        event.preventDefault()
        data.id = megatData._id

        try {
            await updateMegatData(data)
                .then(megat => {
                    setMegatData(megat)
                })
                .catch(error => {
                    setRegisterError(error)
                })
        } catch (err) {
            setRegisterError(err.response?.data?.message)
        }
    }
    const handleMegatDescription = (e) => {
        data.description = e.target.getContent()
    }


    useEffect(() => {

        const fetchData = async () => {
            const getMegatData = await getMegat()
            setMegatData(getMegatData)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <section className="container-fluid EditContent">
            <h2>Megat</h2>
            <form className="AdminEdit__form" onSubmit={updateMegat}>
                <div className="row">
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
                        placeholder={megatData?.title}
                    />
                    <div className="col-12 col-sm-6">
                        <p className="AdminEdit__form__label">
                            Descripción
                        </p>
                        <Editor
                            initialValue={megatData?.description}
                            onChange={handleMegatDescription}
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
                            URL del botón
                        </p>
                        <InputWithLabel
                            value={data?.url}
                            onBlur={onBlur}
                            onChange={onChange}
                            name="url"
                            type="text"
                            cssStyle={`form-control ${touch.url && error.url ? "is-invalid" : ""}`}
                            placeholder={megatData?.url}
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
                            placeholder={megatData?.buttonTitle}
                        />
                    </div>
                    <div className="col-12">
                        <Button cssStyle="leti-btn AdminEdit__form-leti-btn" >Guardar cambios - Megat
                        </Button>
                    </div>

                </div>
                {registerError && <div className="alert alert-danger">{registerError}</div>}
            </form>
        </section>
    )
}

export default EditMegat
