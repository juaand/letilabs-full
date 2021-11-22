import React, {useState, useEffect} from 'react'
import {useFormState} from '../../../../../hooks/useFormState'
import {getUnidades, updateUnidadesData} from '../../../../../services/ApiClient'
import InputWithLabel from '../../../../Form/InputWithLabel/InputWithLabel'
import Button from '../../../../Form/FormButton/FormButton'
import {Editor} from '@tinymce/tinymce-react'

function EditUnidades() {

    const [unidadesData, setUnidadesData] = useState()

    const {state, onBlur, onChange} = useFormState(
        {
            data: {
                id: '',
                logo: unidadesData?.logo,
                desc: unidadesData?.desc,
                url: unidadesData?.url,
            },
            error: {
                logo: false,
                desc: false,
                url: false,
            },
            touch: {},
        },
        {
            logo: v => v.length,
            desc: v => v.length,
            url: v => v.length,
        }
    )

    const {data, error, touch} = state
    const [registerError, setRegisterError] = useState(null)


    const updateUnidadesInfo = async (event) => {
        event.preventDefault()
        data.id = unidadesData._id

        try {
            await updateUnidadesData(data)
                .then(unidades => {
                    setUnidadesData(unidades[0])
                })
                .catch(error => {
                    setRegisterError(error)
                })
        } catch (err) {
            setRegisterError(err.response?.data?.message)
        }
    }
    const handleUnidadesDescription = (e) => {
        data.description = e.target.getContent()
    }


    useEffect(() => {
        
        const fetchData = async () => {
            const getUnidadesData = await getUnidades()
            setUnidadesData(getUnidadesData)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <section className="container-fluid EditContent">
            <h2>Unidades de negocio</h2>
            <form className="AdminEdit__form" onSubmit={updateUnidadesInfo}>
            <div className="row">
                    <div className="col-12 col-sm-6">
                        <p className="AdminEdit__form__label">
                            logo
                        </p>
                        <InputWithLabel
                            value={data?.logo}
                            onBlur={onBlur}
                            onChange={onChange}
                            name="logo"
                            type="text"
                            className={`form-control ${touch.logo && error.logo ? "is-invalid" : ""}`}
                            placeholder={unidadesData?.logo}
                        />
                        <p className="AdminEdit__form__label">
                            description
                        </p>
                        <Editor
                            onChange={handleUnidadesDescription}
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
                                placeholder: unidadesData?.desc
                            }}
                        />
                         <p className="AdminEdit__form__label">
                            url
                        </p>
                        <InputWithLabel
                            value={data?.url}
                            onBlur={onBlur}
                            onChange={onChange}
                            name="url"
                            type="text"
                            className={`form-control ${touch.url && error.url ? "is-invalid" : ""}`}
                            placeholder={unidadesData?.url}
                        />
                    </div>
                    <div className="col-12">
                        <Button className="leti-btn AdminEdit__form-leti-btn" >Editar Unidades</Button>
                    </div>

                </div>
                {registerError && <div className="alert alert-danger">{registerError}</div>}
            </form>
        </section>
    )
}

export default EditUnidades
