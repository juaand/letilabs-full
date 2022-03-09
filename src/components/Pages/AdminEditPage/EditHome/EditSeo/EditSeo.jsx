import React, {useState, useEffect} from 'react'
import {Editor} from '@tinymce/tinymce-react'

import {getSeo, updateSeo} from '../../../../../services/ApiClient'
import InputWithLabel from '../../../../Form/InputWithLabel/InputWithLabel'
import {useFormState} from '../../../../../hooks/useFormState'
import Button from '../../../../Form/FormButton/FormButton'

function EditSeo() {

    const [modalFarmacoData, setModalFarmacoData] = useState()
    const [message, setMessage] = useState('')

    const {state, onBlur, onChange} = useFormState(
        {
            data: {
                id: '',
                keywords: modalFarmacoData?.keywords,
                page: modalFarmacoData?.page,
                description: modalFarmacoData?.description,
            },
            error: {
                keywords: true,
                page: true,
                description: true,
            },
            touch: {},
        },
        {
            keywords: v => v.length,
            page: v => v.length,
            description: v => v.length,
        }
    )

    const {data, error} = state
    const [registerError, setRegisterError] = useState(null)


    const updateFarmaco = async (event) => {
        event.preventDefault()
        data.id = modalFarmacoData._id

        if (Object.values(error).map(el => el).includes(false)) {
            try {
                await updateSeo(data)
                    .then(farmaco => {
                        setModalFarmacoData(farmaco[0])
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

    const handleDescription = (e) => {
        data.description = e.target.getContent()
        error.description = false
    }

    useEffect(() => {
        const fetchData = async () => {
            const getFarmacoData = await getSeo()
            setModalFarmacoData(getFarmacoData)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <section className="container-fluid EditContent">
            <h2>SEO</h2>
            <form className="AdminEdit__form" onSubmit={updateFarmaco}>
                <div className="row">
                    <div className="col-12">
                        <p className="AdminEdit__form__label">
                            Palabras clave (separadas por comas)
                        </p>
                        <InputWithLabel
                            value={data?.keywords}
                            onBlur={onBlur}
                            onChange={onChange}
                            name="keywords"
                            type="text"
                            cssStyle="form-control mb-5"
                            placeholder="Palabras clave separadas por comas"
                        />
                    </div>
                    <div className="col-12">
                        <p className="AdminEdit__form__label">
                            Descripción
                        </p>
                        <Editor
                            initialValue={modalFarmacoData?.description}
                            onChange={handleDescription}
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

export default EditSeo
