import React, {useState, useEffect} from 'react'
import {useFormState} from '../../../../../hooks/useFormState'
import {getProductBanner, updateProductBanner} from '../../../../../services/ApiClient'
import InputWithLabel from '../../../../Form/InputWithLabel/InputWithLabel'
import Button from '../../../../Form/FormButton/FormButton'
import {Editor} from '@tinymce/tinymce-react'

function EditProductBanner() {

    const [bannerData, setBannerData] = useState()

    const {state, onBlur, onChange} = useFormState(
        {
            data: {
                id: '',
                description: bannerData?.description,
                imgURL: bannerData?.imgURL,
                title: bannerData?.title,
                button1Title: bannerData?.button1Title,
                button1Link: bannerData?.button1Link,
                button2Title: bannerData?.button2Title,
                button2Link: bannerData?.button2Link,
            },
            error: {
                description: true,
                imgURL: false,
                title: false,
                button1Title: false,
                button1Link: false,
                button2Title: false,
                button2Link: false,
            },
            touch: {},
        },
        {
            description: v => v.length,
            imgURL: v => v.length,
            title: v => v.length,
            button1Title: v => v.length,
            button1Link: v => v.length,
            button2Title: v => v.length,
            button2Link: v => v.length,
        }
    )



    const {data, error, touch} = state
    const [registerError, setRegisterError] = useState(null)


    const updateBanner = async (event) => {
        event.preventDefault()
        data.id = bannerData._id

        try {
            await updateProductBanner(data)
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
    const handleBannerDescription = (e) => {
        data.description = e.target.getContent()
    }


    useEffect(() => {
        const fetchData = async () => {
            const getBannerData = await getProductBanner()
            setBannerData(getBannerData)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <section className="container-fluid EditContent">
            <h2>Banner Productos Page</h2>
            <form className="AdminEdit__form" onSubmit={updateBanner}>
                <div className="row">
                    <div className="col-12 col-sm-6">
                        <p className="AdminEdit__form__label">
                            Descripción
                        </p>
                        <Editor
                            onChange={handleBannerDescription}
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
                                placeholder: bannerData?.description
                            }}
                        />
                    </div>
                    <div className="col-12 col-sm-6">
                        <p className="AdminEdit__form__label">
                            Imagen
                        </p>
                        <InputWithLabel
                            value={data?.imgURL}
                            onBlur={onBlur}
                            onChange={onChange}
                            name="imgURL"
                            type="text"
                            cssStyle={`form-control ${touch.imgURL && error.imgURL ? "is-invalid" : ""}`}
                            placeholder={bannerData?.imgURL}
                        />
                    </div>
                    <div className="col-12 col-sm-6">
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
                            button1Title
                        </p>
                        <InputWithLabel
                            value={data?.button1Title}
                            onBlur={onBlur}
                            onChange={onChange}
                            name="button1Title"
                            type="text"
                            cssStyle={`form-control ${touch.button1Title && error.button1Title ? "is-invalid" : ""}`}
                            placeholder={bannerData?.button1Title}
                        />
                    </div>
                    <div className="col-12 col-sm-6">
                        <p className="AdminEdit__form__label">
                            button1Link
                        </p>
                        <InputWithLabel
                            value={data?.button1Link}
                            onBlur={onBlur}
                            onChange={onChange}
                            name="button1Link"
                            type="text"
                            cssStyle={`form-control ${touch.button1Link && error.button1Link ? "is-invalid" : ""}`}
                            placeholder={bannerData?.button1Link}
                        />
                    </div>
                    <div className="col-12 col-sm-6">
                        <p className="AdminEdit__form__label">
                            button2Title
                        </p>
                        <InputWithLabel
                            value={data?.button2Title}
                            onBlur={onBlur}
                            onChange={onChange}
                            name="button2Title"
                            type="text"
                            cssStyle={`form-control ${touch.button2Title && error.button2Title ? "is-invalid" : ""}`}
                            placeholder={bannerData?.button2Title}
                        />
                    </div>
                    <div className="col-12 col-sm-6">
                        <p className="AdminEdit__form__label">
                            button2Link
                        </p>
                        <InputWithLabel
                            value={data?.button2Link}
                            onBlur={onBlur}
                            onChange={onChange}
                            name="button2Link"
                            type="text"
                            cssStyle={`form-control ${touch.button2Link && error.button2Link ? "is-invalid" : ""}`}
                            placeholder={bannerData?.button2Link}
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

export default EditProductBanner
