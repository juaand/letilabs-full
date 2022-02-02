import React, {useState, useEffect} from 'react'
import {useFormState} from '../../../../../hooks/useFormState'
import {getProductosGenvenOC, updateProductosGenvenOC} from '../../../../../services/ApiClient'
import InputWithLabel from '../../../../Form/InputWithLabel/InputWithLabel'
import Button from '../../../../Form/FormButton/FormButton'
import {Editor} from '@tinymce/tinymce-react'


function EditProductosGenvenPage() {
    const [bannerData, setBannerData] = useState()

    const {state, onBlur, onChange} = useFormState(
        {
            data: {
                id: '',
                description: bannerData?.description,
                buttonTitle: bannerData?.buttonTitle,
                buttonLink: bannerData?.buttonLink,
                img1URL: bannerData?.img1URL,
                img2URL: bannerData?.img2URL,
                img3URL: bannerData?.img3URL,
            },
            error: {
                description: true,
                buttonTitle: true,
                buttonLink: true,
                img1URL: false,
                img2URL: false,
                img3URL: false,
            },
            touch: {},
        },
        {
            description: v => v.length,
            buttonTitle: v => v.length,
            buttonLink: v => v.length,
            img1URL: v => v.length,
            img2URL: v => v.length,
            img3URL: v => v.length,
        }
    )



    const {data, error, touch} = state
    const [registerError, setRegisterError] = useState(null)


    const updateBanner = async (event) => {
        event.preventDefault()
        data.id = bannerData._id

        try {
            await updateProductosGenvenOC(data)
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
            const getBannerData = await getProductosGenvenOC()
            setBannerData(getBannerData[0])
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <section className="container-fluid EditContent">
            <h2>Productos Genven</h2>
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
                            Título botón
                        </p>
                        <InputWithLabel
                            value={data?.buttonTitle}
                            onBlur={onBlur}
                            onChange={onChange}
                            name="buttonTitle"
                            type="text"
                            cssStyle={`form-control ${touch.buttonTitle && error.buttonTitle ? "is-invalid" : ""}`}
                            placeholder={bannerData?.buttonTitle}
                        />
                    </div>
                    <div className="col-12 col-sm-6">
                        <p className="AdminEdit__form__label">
                            Link botón
                        </p>
                        <InputWithLabel
                            value={data?.buttonLink}
                            onBlur={onBlur}
                            onChange={onChange}
                            name="buttonLink"
                            type="text"
                            cssStyle={`form-control ${touch.buttonLink && error.buttonLink ? "is-invalid" : ""}`}
                            placeholder={bannerData?.buttonLink}
                        />
                    </div>
                    <div className="col-12 col-sm-6">
                        <p className="AdminEdit__form__label">
                            Imagen
                        </p>
                        <InputWithLabel
                            value={data?.img1URL}
                            onBlur={onBlur}
                            onChange={onChange}
                            name="img1URL"
                            type="text"
                            cssStyle={`form-control ${touch.img1URL && error.img1URL ? "is-invalid" : ""}`}
                            placeholder={bannerData?.img1URL}
                        />
                    </div>
                    <div className="col-12 col-sm-6">
                        <p className="AdminEdit__form__label">
                            Imagen
                        </p>
                        <InputWithLabel
                            value={data?.img1URL}
                            onBlur={onBlur}
                            onChange={onChange}
                            name="img1URL"
                            type="text"
                            cssStyle={`form-control ${touch.img1URL && error.img1URL ? "is-invalid" : ""}`}
                            placeholder={bannerData?.img1URL}
                        />
                    </div>
                    <div className="col-12 col-sm-6">
                        <p className="AdminEdit__form__label">
                            Imagen 2
                        </p>
                        <InputWithLabel
                            value={data?.img2URL}
                            onBlur={onBlur}
                            onChange={onChange}
                            name="img2URL"
                            type="text"
                            cssStyle={`form-control ${touch.img2URL && error.img2URL ? "is-invalid" : ""}`}
                            placeholder={bannerData?.img2URL}
                        />
                    </div>
                    <div className="col-12 col-sm-6">
                        <p className="AdminEdit__form__label">
                            Imagen 3
                        </p>
                        <InputWithLabel
                            value={data?.img3URL}
                            onBlur={onBlur}
                            onChange={onChange}
                            name="img3URL"
                            type="text"
                            cssStyle={`form-control ${touch.img3URL && error.img3URL ? "is-invalid" : ""}`}
                            placeholder={bannerData?.img3URL}
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

export default EditProductosGenvenPage