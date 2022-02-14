import React, {useState, useEffect} from 'react'
import {Editor} from '@tinymce/tinymce-react'

import {useFormState} from '../../../../../hooks/useFormState'
import {getProductBanner, updateProductBanner} from '../../../../../services/ApiClient'
import InputWithLabel from '../../../../Form/InputWithLabel/InputWithLabel'
import Button from '../../../../Form/FormButton/FormButton'
import InputFile from '../../../../Form/InputFile/InputFile'
import {app} from '../../../../../services/firebase'
import Loader from '../../../../Loader/Loader'


function EditProductBanner() {

    const [bannerData, setBannerData] = useState()
    const [isDisabled, setIsDisabled] = useState(false)
    const [message, setMessage] = useState('')

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
                imgURL: true,
                title: true,
                button1Title: true,
                button1Link: true,
                button2Title: true,
                button2Link: true,
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

        if (Object.values(error).map(el => el).includes(false)) {
            try {
                await updateProductBanner(data)
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
            setMessage('Por favor rellene alguno de los campos')
        }
    }

    const handleBannerDescription = (e) => {
        data.description = e.target.getContent()
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
            const getBannerData = await getProductBanner()
            setBannerData(getBannerData[0])
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {isDisabled && <Loader message="Cargando imagen..." />}
            <section className="container-fluid EditContent">
                <h2>Banner productos</h2>
                <form className="AdminEdit__form" onSubmit={updateBanner}>
                    <div className="row">
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
                                cssStyle={`form-control mb-0 ${touch.title && error.title ? "is-invalid" : ""}`}
                                placeholder={bannerData?.title}
                            />
                            <p className="AdminEdit__form__label mt-5">
                                Imagen
                            </p>

                            <InputFile
                                value={data?.imgURL}
                                onChange={onFileSelected}
                                id="fileButton"
                                name="urlToPic"
                                type="file" 
                            />
                        </div>
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
                        <div className="col-12 col-sm-3">
                            <p className="AdminEdit__form__label">
                                Botón izquierdo
                            </p>
                            <InputWithLabel
                                value={data?.button1Title}
                                onBlur={onBlur}
                                onChange={onChange}
                                name="button1Title"
                                type="text"
                                cssStyle={`form-control mb-0 ${touch.button1Title && error.button1Title ? "is-invalid" : ""}`}
                                placeholder={bannerData?.button1Title}
                            />
                        </div>
                        <div className="col-12 col-sm-3">
                            <p className="AdminEdit__form__label">
                                Ruta botón izquierdo
                            </p>
                            <InputWithLabel
                                value={data?.button1Link}
                                onBlur={onBlur}
                                onChange={onChange}
                                name="button1Link"
                                type="text"
                                cssStyle={`form-control mb-0 ${touch.button1Link && error.button1Link ? "is-invalid" : ""}`}
                                placeholder={bannerData?.button1Link}
                            />
                        </div>
                        <div className="col-12 col-sm-3">
                            <p className="AdminEdit__form__label">
                                Botón derecho
                            </p>
                            <InputWithLabel
                                value={data?.button2Title}
                                onBlur={onBlur}
                                onChange={onChange}
                                name="button2Title"
                                type="text"
                                cssStyle={`form-control mb-0 ${touch.button2Title && error.button2Title ? "is-invalid" : ""}`}
                                placeholder={bannerData?.button2Title}
                            />
                        </div>
                        <div className="col-12 col-sm-3">
                            <p className="AdminEdit__form__label">
                                Ruta botón derecho
                            </p>
                            <InputWithLabel
                                value={data?.button2Link}
                                onBlur={onBlur}
                                onChange={onChange}
                                name="button2Link"
                                type="text"
                                cssStyle={`form-control mb-0 ${touch.button2Link && error.button2Link ? "is-invalid" : ""}`}
                                placeholder={bannerData?.button2Link}
                            />
                        </div>
                        <div className="col-12">
                            <Button cssStyle={`leti-btn mt-5 AdminEdit__form-leti-btn ${isDisabled && 'disabled'}`}>Guardar cambios</Button>
                            {message && <span className="AdminEdit__message">{message}</span>}
                        </div>

                    </div>
                    {registerError && <div className="alert alert-danger">{registerError}</div>}
                </form>
            </section>
        </>
    )
}

export default EditProductBanner
