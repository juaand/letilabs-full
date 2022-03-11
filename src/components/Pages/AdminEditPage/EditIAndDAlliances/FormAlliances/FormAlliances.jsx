import React, {useState, useEffect} from 'react'
import {Editor} from '@tinymce/tinymce-react'

import {getFormAlliances, updateFormAlliances} from '../../../../../services/ApiClient'
import InputWithLabel from '../../../../Form/InputWithLabel/InputWithLabel'
import {useFormState} from '../../../../../hooks/useFormState'
import Button from '../../../../Form/FormButton/FormButton'


function EditFormAlliances() {

    const [bannerData, setBannerData] = useState()
    const [message, setMessage] = useState('')

    const {state, onBlur, onChange} = useFormState(
        {
            data: {
                id: '',
                desc: bannerData?.desc,
                phone: bannerData?.phone,
                title: bannerData?.title,
                email: bannerData?.email,
            },
            error: {
                desc: true,
                phone: true,
                title: true,
                email: true,
            },
            touch: {},
        },
        {
            desc: v => v.length,
            phone: v => v.length,
            title: v => v.length,
            email: v => v.length,
        }
    )

    const {data, error} = state
    const [registerError, setRegisterError] = useState(null)

    const updateFormHeader = async (event) => {
        event.preventDefault()
        data.id = bannerData._id

        if (Object.values(error).map(el => el).includes(false)) {
            try {
                await updateFormAlliances(data)
                    .then(banner => {
                        setBannerData(banner)
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

    const handleBannerDesc = (e) => {
        data.desc = e.target.getContent()
        error.desc = false
    }

    useEffect(() => {
        const fetchData = async () => {
            const getBannerData = await getFormAlliances()
            setBannerData(getBannerData[0])
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <section className="container-fluid EditContent">
            <h2>Formulario Alianzas</h2>
            <form className="AdminEdit__form" onSubmit={updateFormHeader}>
                <div className="row">
                    <div className="col-12 col-sm-6">
                        <p className="AdminEdit__form__label">
                            Descripción
                        </p>
                        <Editor
                            initialValue={bannerData?.desc}
                            onChange={handleBannerDesc}
                            apiKey={process.env.REACT_APP_API_TINY_CLOUD}
                            init={{
                                height: 305,
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
                            Título
                        </p>
                        <InputWithLabel
                            value={data?.title}
                            onBlur={onBlur}
                            onChange={onChange}
                            name="title"
                            type="text"
                            cssStyle="form-control mb-5"
                            placeholder={bannerData?.title}
                        />
                        <p className="AdminEdit__form__label">
                            Teléfono
                        </p>
                        <InputWithLabel
                            value={data?.phone}
                            onBlur={onBlur}
                            onChange={onChange}
                            name="phone"
                            type="text"
                            cssStyle="form-control mb-5"
                            placeholder={bannerData?.phone}
                        />
                        <p className="AdminEdit__form__label">
                            Email
                        </p>
                        <InputWithLabel
                            value={data?.email}
                            onBlur={onBlur}
                            onChange={onChange}
                            name="email"
                            type="text"
                            cssStyle="form-control"
                            placeholder={bannerData?.email}
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

export default EditFormAlliances
