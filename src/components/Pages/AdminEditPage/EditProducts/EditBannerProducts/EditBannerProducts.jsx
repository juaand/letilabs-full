import React, {useState, useEffect} from 'react'
import {Editor} from '@tinymce/tinymce-react'

import {getProductBanner, updateProductBanner, createContent} from '../../../../../services/ApiClient'
import {useFormState} from '../../../../../hooks/useFormState'
import {app} from '../../../../../services/firebase'

import InputWithLabel from '../../../../Form/InputWithLabel/InputWithLabel'
import Button from '../../../../Form/FormButton/FormButton'
import InputFile from '../../../../Form/InputFile/InputFile'
import Loader from '../../../../Loader/Loader'


function EditProductBanner() {

    const [fileSizeMessage, setFileSizeMessage] = useState('')
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
            },
            error: {
                description: true,
                imgURL: true,
                title: true,
                button1Title: true,
                button1Link: true,
            },
            touch: {},
        },
        {
            description: v => v.length,
            imgURL: v => v.length,
            title: v => v.length,
            button1Title: v => v.length,
            button1Link: v => v.length,
        }
    )



    const {data, error, touch} = state
    const [registerError, setRegisterError] = useState(null)

    const contentData = {
        content: data?.description,
        url: '/productos',
        name: 'Productos',
        type: `${bannerData?._id}`,
    }

    const updateBanner = async (event) => {
        event.preventDefault()
        data.id = bannerData._id

        if (contentData?.content?.length > 0) {
            createContent(contentData)
        }

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

    const handleDescription = (e) => {
        data[e.target.settings.name] = e.target.getContent({format: 'text'})
        error[e.target.settings.name] = false
    }

    const onFileSelected = async (e) => {

        // Get file
        const file = e.target.files[0]

        if (file.size > 300000) {
            setFileSizeMessage("El tamaño de la imagen excede el máximo permitido (300KB), por favor optimícela y vuelva a intentar")
        } else {
            setIsDisabled(!isDisabled)
            setFileSizeMessage('')
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
                        <div className="col-12">
                            <div className="col-12 EditElementsModal__img">
                                <img src={bannerData?.imgURL} onError="this.src = 'https://firebasestorage.googleapis.com/v0/b/grupoleti.appspot.com/o/images%2Fno-image.png?alt=media&token=6e518b16-dc11-46e3-83e8-ae4b84a18293';" alt={bannerData?.title} />
                                <InputFile
                                    value={data?.imgURL}
                                    onChange={onFileSelected}
                                    id="fileButton"
                                    name="urlToPic"
                                    type="file"
                                />
                            </div>
                        </div>
                        {
                            fileSizeMessage &&
                            <div className="col-12">
                                <small>{fileSizeMessage}</small>
                            </div>
                        }
                        <div className="col-12 col-sm-6">
                            <p className="AdminEdit__form__label">
                                Título
                            </p>
                            <Editor
                                initialValue={bannerData?.title}
                                onChange={handleDescription}
                                apiKey={process.env.REACT_APP_API_TINY_CLOUD}
                                init={{
                                    name: 'title',
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
                                Descripción
                            </p>
                            <Editor
                                initialValue={bannerData?.description}
                                onChange={handleDescription}
                                apiKey={process.env.REACT_APP_API_TINY_CLOUD}
                                init={{
                                    name: 'description',
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
                                Texto botón
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
                                Ruta botón
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
