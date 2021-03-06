import React, {useState, useEffect} from 'react'
import {Editor} from '@tinymce/tinymce-react'

import {getSeo, updateSeo} from '../../../../../services/ApiClient'
import InputWithLabel from '../../../../Form/InputWithLabel/InputWithLabel'
import {useFormState} from '../../../../../hooks/useFormState'
import Button from '../../../../Form/FormButton/FormButton'

function EditSeo() {

    const [seoData, setSeoData] = useState()
    const [message, setMessage] = useState('')

    const {state, onBlur, onChange} = useFormState(
        {
            data: {
                id: '',
                keywords: seoData?.keywords,
                page: 'Noticias',
                description: seoData?.description,
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


    const updateSeoData = async (event) => {
        event.preventDefault()
        data.id = seoData.id

        if (Object.values(error).map(el => el).includes(false)) {
            try {
                if (error.keywords === false) {
                    const setKeywords = data.keywords.split(',')
                    data.keywords = setKeywords
                }
                await updateSeo(data)
                    .then(seo => {
                        setSeoData(seo)
                        setMessage('SEO actualizado exitosamente')
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
        data.description = e.target.getContent({format: "text"})
        error.description = false
    }

    useEffect(() => {
        const fetchData = async () => {
            const getSeoData = await getSeo()
            const filterSeo = getSeoData.filter(seo => seo.page === 'Noticias')
            setSeoData(filterSeo[0])
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <section className="container-fluid EditContent EditContent__active">
            <h2>SEO</h2>
            <form className="AdminEdit__form" onSubmit={updateSeoData}>
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
                            placeholder={seoData?.keywords?.join(', ')}
                        />
                    </div>
                    <div className="col-12">
                        <p className="AdminEdit__form__label">
                            Descripci??n
                        </p>
                        <Editor
                            initialValue={seoData?.description}
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
