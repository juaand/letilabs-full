import React, {useState, useEffect} from 'react'
import {useFormState} from '../../../../../hooks/useFormState'
import {getUsInfo, updateUsInfoData} from '../../../../../services/ApiClient'
import InputWithLabel from '../../../../Form/InputWithLabel/InputWithLabel'
import Button from '../../../../Form/FormButton/FormButton'
import {Editor} from '@tinymce/tinymce-react'


function EditUsInfo() {

    const [usInfoData, setUsInfoData] = useState()

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
                url: false,
                buttonTitle: false,
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
    const [registerError, setRegisterError] = useState(null)


    const updateUsInfo = async (event) => {
        event.preventDefault()
        data.id = usInfoData._id

        try {
            await updateUsInfoData(data)
                .then(usInfo => {
                    setUsInfoData(usInfo[0])
                })
                .catch(error => {
                    setRegisterError(error)
                })
        } catch (err) {
            setRegisterError(err.response?.data?.message)
        }
    }
    const handleUsInfoDescription = (e) => {
        data.description = e.target.getContent()
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
            <h2>sobre nosotros</h2>
            <form className="AdminEdit__form" onSubmit={updateUsInfo}>
                <div className="row">
                    <div className="col-12 col-sm-6">
                        <p className="AdminEdit__form__label">
                            Descripción
                        </p>
                        <Editor
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
                                placeholder: usInfoData?.description
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
                            className={`form-control ${touch.url && error.url ? "is-invalid" : ""}`}
                            placeholder={usInfoData?.url}
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
                            className={`form-control ${touch.buttonTitle && error.buttonTitle ? "is-invalid" : ""}`}
                            placeholder={usInfoData?.buttonTitle}
                        />
                    </div>
                    <div className="col-12">
                        <Button className="leti-btn AdminEdit__form-leti-btn" >Editar Sobre Nosotros</Button>
                    </div>

                </div>
                {registerError && <div className="alert alert-danger">{registerError}</div>}
            </form>
        </section>
    )
}

export default EditUsInfo
