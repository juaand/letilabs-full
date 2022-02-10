import React, {useState, useEffect} from 'react'
import {useFormState} from '../../../../../hooks/useFormState'
import {getBannerProductsOC, updateBannerProductsOC} from '../../../../../services/ApiClient'
import InputWithLabel from '../../../../Form/InputWithLabel/InputWithLabel'
import Button from '../../../../Form/FormButton/FormButton'
import {Editor} from '@tinymce/tinymce-react'


function EditProdutcsBanner() {
    const [bannerData, setBannerData] = useState()
    console.log(bannerData)

    const {state, onBlur, onChange} = useFormState(
        {
            data: {
                id: '',
                description: bannerData?.description,
                description2: bannerData?.description2,
                imgURL: bannerData?.imgURL,
                img2URL: bannerData?.img2URL,
                img3URL: bannerData?.img3URL,
            },
            error: {
                description: true,
                description2: true,
                imgURL: false,
                img2URL: false,
                img3URL: false,
            },
            touch: {},
        },
        {
            description: v => v.length,
            description2: v => v.length,
            imgURL: v => v.length,
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
            await updateBannerProductsOC(data)
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
    const handleBannerDescription2 = (e) => {
        data.description2 = e.target.getContent()
    }


    useEffect(() => {
        const fetchData = async () => {
            const getBannerData = await getBannerProductsOC()
            setBannerData(getBannerData)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <section className="container-fluid EditContent">
            <h2>Products Banner</h2>
            <form className="AdminEdit__form" onSubmit={updateBanner}>
                <div className="row">
                    <div className="col-12 col-sm-6">
                        <p className="AdminEdit__form__label">
                            Descripción
                        </p>
                        <Editor
                            initialValue={bannerData?.description}
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
                            }}
                        />
                    </div>
                    <div className="col-12 col-sm-6">
                        <p className="AdminEdit__form__label">
                            Descripción 2
                        </p>
                        <Editor
                            initialValue={bannerData?.description2}
                            onChange={handleBannerDescription2}
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

export default EditProdutcsBanner
