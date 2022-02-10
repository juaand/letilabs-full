import React, {useState, useEffect} from 'react'
import {useFormState} from '../../../../../hooks/useFormState'
import {getFormAlliances, updateFormAlliances} from '../../../../../services/ApiClient'
import InputWithLabel from '../../../../Form/InputWithLabel/InputWithLabel'
import Button from '../../../../Form/FormButton/FormButton'
import {Editor} from '@tinymce/tinymce-react'


function EditFormAlliances() {

    const [bannerData, setBannerData] = useState()

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
                phone: false,
                title: false,
                email: false,
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



    const {data, error, touch} = state
    const [registerError, setRegisterError] = useState(null)


    const updateBanner = async (event) => {
        event.preventDefault()
        data.id = bannerData._id

        try {
            await updateFormAlliances(data)
                .then(banner => {
                    setBannerData(banner[0])
                })
                .catch(error => {
                    setRegisterError(error)
                })
        } catch (err) {
            setRegisterError(err.response?.data?.message)
        }
    }
    const handleBannerDesc = (e) => {
        data.desc = e.target.getContent()
    }


    useEffect(() => {
        const fetchData = async () => {
            const getBannerData = await getFormAlliances()
            setBannerData(getBannerData)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
            <section className="container-fluid EditContent">
            <h2>Formulario Alianzas</h2>
            <form className="AdminEdit__form" onSubmit={updateBanner}>
                <div className="row">
                    <div className="col-12 col-sm-6">
                        <p className="AdminEdit__form__label">
                            Descripción
                        </p>
                        <Editor
                            onChange={handleBannerDesc}
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
                                placeholder: bannerData?.desc
                            }}
                        />
                    </div>
                    <div className="col-12 col-sm-6">
                        <p className="AdminEdit__form__label">
                            Telefono
                        </p>
                        <InputWithLabel
                            value={data?.phone}
                            onBlur={onBlur}
                            onChange={onChange}
                            name="phone"
                            type="text"
                            cssStyle={`form-control ${touch.phone && error.phone ? "is-invalid" : ""}`}
                            placeholder={bannerData?.phone}
                        />
                        <p className="AdminEdit__form__label">
                            title
                        </p>
                        <InputWithLabel
                            value={data?.title}
                            onBlur={onBlur}
                            onChange={onChange}
                            name="title"
                            type="text"
                            cssStyle={`form-control ${touch.title && error.title ? "is-invalid" : ""}`}
                            placeholder={bannerData?.title}
                        />
                    </div>
                    <div className="col-12 col-sm-6">
                        <p className="AdminEdit__form__label">
                            email
                        </p>
                        <InputWithLabel
                            value={data?.email}
                            onBlur={onBlur}
                            onChange={onChange}
                            name="email"
                            type="text"
                            cssStyle={`form-control ${touch.email && error.email ? "is-invalid" : ""}`}
                            placeholder={bannerData?.email}
                        />
                    </div>
                    <div className="col-12">
                        <Button cssStyle="leti-btn AdminEdit__form-leti-btn" >Guardar cambios - Banner</Button>
                    </div>

                </div>
                {registerError && <div className="alert alert-danger">{registerError}</div>}
            </form>
        </section>
    )
}

export default EditFormAlliances
