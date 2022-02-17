import React, {useState, useEffect} from 'react'
import {Editor} from '@tinymce/tinymce-react'

import {getProductBottom, updateProductBottom} from '../../../../../services/ApiClient'
import InputWithLabel from '../../../../Form/InputWithLabel/InputWithLabel'
import {useFormState} from '../../../../../hooks/useFormState'
import InputFile from '../../../../Form/InputFile/InputFile'
import Button from '../../../../Form/FormButton/FormButton'
import {app} from '../../../../../services/firebase'
import Loader from '../../../../Loader/Loader'

function EditProductBottom() {

    const [bannerData, setBannerData] = useState()
    const [titleMessage, setTitleMessage] = useState('')
    const [isDisabled, setIsDisabled] = useState(false)
    const [message, setMessage] = useState('')

    const {state, onBlur, onChange} = useFormState(
        {
            data: {
                id: '',
                findProductsTitle: bannerData?.findProductsTitle,
                imgURL: bannerData?.imgURL,
                title: bannerData?.title,
                buttonTitle: bannerData?.buttonTitle,
                farmacoTitle: '',
                farmacoBtn: bannerData?.farmacoBtn,
                farmacoDesc: bannerData?.farmacoDesc,
            },
            error: {
                findProductsTitle: true,
                imgURL: true,
                title: true,
                buttonTitle: true,
                farmacoTitle: true,
                farmacoBtn: true,
                farmacoDesc: true,
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

    const updateTitle = async (event) => {
        event.preventDefault()
        event.target.reset()
        data.id = bannerData._id

        if (Object.values(error).map(el => el).includes(false)) {
            try {
                await updateProductBottom(data)
                    .then(banner => {
                        setBannerData(banner)
                        setTitleMessage('Título atualizado exitosamente')
                        console.log(banner)
                    })
                    .catch(error => {
                        setRegisterError(error)
                    })
            } catch (err) {
                setRegisterError(err.response?.data?.message)
            }
        } else {
            setTitleMessage('Por favor haga un cambio en el texto')
        }

    }

    const updateCTABanner = async (event) => {
        event.preventDefault()
        data.id = bannerData._id

        if (Object.values(error).map(el => el).includes(false)) {
            try {
                await updateProductBottom(data)
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
            setMessage('Por favor complete alguno de los campos')
        }
    }

    const handleBannerfindProductsTitle = (e) => {
        data.title = e.target.getContent()
        error.title = false
    }

    const handleProductsFarmacoDesc = (e) => {
        data.farmacoDesc = e.target.getContent()
        error.farmacoDesc = false
    }

    const handleProductsListTitle = (e) => {
        data.findProductsTitle = e.target.getContent()
        error.findProductsTitle = false
    }

    const onFileSelected = async (e) => {
        setIsDisabled(!isDisabled)

        // Get file
        const file = e.target.files[0]

        // Create storage ref
        const storageRef = app.storage().ref()
        const filePath = storageRef.child('images/' + file.name)

        // Upload file
        await filePath.put(file)
            .then(() => {
                setMessage("Imagen subida correctamente")
            })
            .catch(err => {console.log(err)})

        // Get file url
        const fileUrl = await filePath.getDownloadURL()
        data.imgURL = fileUrl
        setIsDisabled(false)
        error.imgURL = false
    }

    useEffect(() => {
        const fetchData = async () => {
            const getBannerData = await getProductBottom()
            setBannerData(getBannerData[0])
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {isDisabled && <Loader message="Cargando imagen..." />}
            <section className="container-fluid EditContent">
                <h2>Título buscador de productos</h2>
                <form className="AdminEdit__form" onSubmit={updateTitle}>
                    <div className="row">
                        <div className="col-12">
                            <p className="AdminEdit__form__label">
                                Título
                            </p>
                            <Editor
                                initialValue={bannerData?.findProductsTitle}
                                onChange={handleProductsListTitle}
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
                        <div className="col-12">
                            <Button cssStyle="leti-btn AdminEdit__form-leti-btn">Guardar cambios</Button>
                            {titleMessage && <span className="AdminEdit__message">{titleMessage}</span>}
                        </div>
                    </div>
                </form>
            </section>
            <section className="container-fluid EditContent">
                <h2>CTA productos</h2>
                <form className="AdminEdit__form" onSubmit={updateCTABanner}>
                    <div className="row">
                        <div className="col-12">
                            <h3><strong>Banner</strong></h3>
                        </div>
                        <div className="col-12 col-sm-4">
                            <p className="AdminEdit__form__label">
                                Imagen
                            </p>
                            <InputFile
                                value={data?.imgURL}
                                onChange={onFileSelected}
                                id="fileButton"
                                name="imgURL"
                                type="file"
                            />
                        </div>
                        <div className="col-12 col-sm-4">
                            <p className="AdminEdit__form__label">
                                Título
                            </p>
                            <Editor
                                initialValue={bannerData?.title}
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
                                }}
                            />
                        </div>
                        <div className="col-12 col-sm-4">
                            <p className="AdminEdit__form__label">
                                Texto botón
                            </p>
                            <InputWithLabel
                                value={data?.buttonTitle}
                                onBlur={onBlur}
                                onChange={onChange}
                                name="buttonTitle"
                                type="text"
                                cssStyle={`form-control mb-0 ${touch.buttonTitle && error.buttonTitle ? "is-invalid" : ""}`}
                                placeholder={bannerData?.buttonTitle}
                            />
                        </div>

                        <div className="col-12">
                            <h3><strong>Modal farmaco vigilancia</strong></h3>
                        </div>
                        <div className="col-12 col-sm-4">
                            <p className="AdminEdit__form__label">
                                Título
                            </p>
                            <InputWithLabel
                                value={data?.farmacoTitle}
                                onBlur={onBlur}
                                onChange={onChange}
                                name="farmacoTitle"
                                type="text"
                                cssStyle={`form-control mb-0 ${touch.farmacoTitle && error.farmacoTitle ? "is-invalid" : ""}`}
                                placeholder={bannerData?.farmacoTitle}
                            />
                        </div>

                        <div className="col-12 col-sm-4">
                            <p className="AdminEdit__form__label">
                                Descripción
                            </p>
                            <Editor
                                initialValue={bannerData?.farmacoDesc}
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
                                }}
                            />
                        </div>
                        <div className="col-12 col-sm-4">
                            <p className="AdminEdit__form__label">
                                Texto botón
                            </p>
                            <InputWithLabel
                                value={data?.farmacoBtn}
                                onBlur={onBlur}
                                onChange={onChange}
                                name="farmacoBtn"
                                type="text"
                                cssStyle={`form-control mb-0 ${touch.farmacoBtn && error.farmacoBtn ? "is-invalid" : ""}`}
                                placeholder={bannerData?.farmacoBtn}
                            />
                        </div>
                        <div className="col-12">
                            <Button cssStyle={`leti-btn AdminEdit__form-leti-btn ${isDisabled && 'disabled'}`}>Guardar cambios</Button>
                            {message && <span className="AdminEdit__message">{message}</span>}
                        </div>

                    </div>
                    {registerError && <div className="alert alert-danger">{registerError}</div>}
                </form>
            </section>
        </>
    )
}

export default EditProductBottom
