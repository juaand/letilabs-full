import React, {useState, useEffect} from 'react'
import {useFormState} from '../../../../../hooks/useFormState'
import {getProductBottom, updateProductBottom} from '../../../../../services/ApiClient'
import InputWithLabel from '../../../../Form/InputWithLabel/InputWithLabel'
import Button from '../../../../Form/FormButton/FormButton'
import {Editor} from '@tinymce/tinymce-react'

function EditProductBottom() {

    const [bannerData, setBannerData] = useState()

    const {state, onBlur, onChange} = useFormState(
        {
            data: {
                id: '',
                findProductsTitle: bannerData?.findProductsTitle,
                imgURL: bannerData?.imgURL,
                title: bannerData?.title,
                buttonTitle: bannerData?.buttonTitle,
                farmacoTitle: bannerData?.farmacoTitle,
                farmacoBtn: bannerData?.farmacoBtn,
                farmacoDesc: bannerData?.farmacoDesc,
            },
            error: {
                findProductsTitle: true,
                imgURL: false,
                title: false,
                buttonTitle: false,
                farmacoTitle: false,
                farmacoBtn: false,
                farmacoDesc: false,
            },
            touch: {},
        },
        {
            findProductsTitle: v => v.length,
            imgURL: v => v.length,
            title: v => v.length,
            buttonTitle: v => v.length,
            farmacoTitle: v => v.length,
            farmacoBtn: v => v.length,
            farmacoDesc: v => v.length,
        }
    )



    const {data, error, touch} = state
    const [registerError, setRegisterError] = useState(null)


    const updateBanner = async (event) => {
        event.preventDefault()
        data.id = bannerData._id

        try {
            await updateProductBottom(data)
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
    const handleBannerfindProductsTitle = (e) => {
        data.findProductsTitle = e.target.getContent()
    }

    const handleProductsFarmacoDesc = (e) => {
        data.findProductsTitle = e.target.getContent()
    }

    useEffect(() => {
        const fetchData = async () => {
            const getBannerData = await getProductBottom()
            setBannerData(getBannerData)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <section className="container-fluid EditContent">
            <h2>Bottom Product Edit</h2>
            <form className="AdminEdit__form" onSubmit={updateBanner}>
                <div className="row">
                    <div className="col-12 col-sm-6">
                        <p className="AdminEdit__form__label">
                            Descripción
                        </p>
                        <Editor
                            onChange={handleBannerfindProductsTitle}
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
                                placeholder: bannerData?.findProductsTitle
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
                            buttonTitle
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
                            farmacoTitle
                        </p>
                        <InputWithLabel
                            value={data?.farmacoTitle}
                            onBlur={onBlur}
                            onChange={onChange}
                            name="farmacoTitle"
                            type="text"
                            cssStyle={`form-control ${touch.farmacoTitle && error.farmacoTitle ? "is-invalid" : ""}`}
                            placeholder={bannerData?.farmacoTitle}
                        />
                    </div>
                    <div className="col-12 col-sm-6">
                        <p className="AdminEdit__form__label">
                            farmacoBtn
                        </p>
                        <InputWithLabel
                            value={data?.farmacoBtn}
                            onBlur={onBlur}
                            onChange={onChange}
                            name="farmacoBtn"
                            type="text"
                            cssStyle={`form-control ${touch.farmacoBtn && error.farmacoBtn ? "is-invalid" : ""}`}
                            placeholder={bannerData?.farmacoBtn}
                        />
                    </div>
                    <div className="col-12 col-sm-6">
                        <p className="AdminEdit__form__label">
                            Farmaco Descripción
                        </p>
                        <Editor
                            onChange={handleProductsFarmacoDesc}
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
                                placeholder: bannerData?.findProductsTitle
                            }}
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

export default EditProductBottom
