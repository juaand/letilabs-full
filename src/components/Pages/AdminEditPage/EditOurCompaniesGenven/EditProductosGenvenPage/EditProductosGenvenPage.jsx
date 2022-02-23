import React, {useState, useEffect} from 'react'
import {useFormState} from '../../../../../hooks/useFormState'
import {getProductosGenvenOC, updateProductosGenvenOC} from '../../../../../services/ApiClient'
import InputWithLabel from '../../../../Form/InputWithLabel/InputWithLabel'
import InputFile from '../../../../Form/InputFile/InputFile'
import {app} from '../../../../../services/firebase'
import Button from '../../../../Form/FormButton/FormButton'
import {Editor} from '@tinymce/tinymce-react'


function EditProductosGenvenPage() {
    const [bannerData, setBannerData] = useState()
    const [imageSuccess, setImageSuccess] = useState('')
    const [message, setMessage] = useState('')
    const [isDisabled, setIsDisabled] = useState(false)

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
    const [disabled, setDisabled] = useState(true)

    const updateBanner = async (event) => {
        event.preventDefault()
        data.id = bannerData._id

        try {
            await updateProductosGenvenOC(data)
                .then(banner => {
                    setBannerData(banner)
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
                //Se habilita el botón para subir el blog
                setDisabled(!disabled)
            })
            .catch(err => {console.log(err)})


        // Get file url
        const fileUrl = await filePath.getDownloadURL()
        data.logo = fileUrl
        setImageSuccess("Imagen subida correctamente")
        setIsDisabled(false)
    }

    useEffect(() => {
        const fetchData = async () => {
            const getBannerData = await getProductosGenvenOC()
            setBannerData(getBannerData)
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
                        <div className="col-12 EditElementsModal__img">
                            <img src={bannerData?.img1URL} onError="this.src = 'https://firebasestorage.googleapis.com/v0/b/grupo-leti-fd84e.appspot.com/o/images%2Fno-image.png?alt=media&token=73bf7cd8-629d-4deb-b281-9e629fbfb752';" alt={bannerData?.img1URL} />
                            <InputFile
                                value={bannerData?.img1URL}
                                onChange={onFileSelected}
                                id="fileButton"
                                name="imgURL"
                                type="file"
                                placeholder={bannerData?.img1URL}
                            />
                        </div>
                    </div>
                    <div className="col-12 col-sm-6">
                        <div className="col-12 EditElementsModal__img">
                            <img src={bannerData?.img2URL} onError="this.src = 'https://firebasestorage.googleapis.com/v0/b/grupo-leti-fd84e.appspot.com/o/images%2Fno-image.png?alt=media&token=73bf7cd8-629d-4deb-b281-9e629fbfb752';" alt={bannerData?.img2URL} />
                            <InputFile
                                value={bannerData?.img2URL}
                                onChange={onFileSelected}
                                id="fileButton"
                                name="imgURL"
                                type="file"
                                placeholder={bannerData?.img2URL}
                            />
                        </div>
                    </div>
                    <div className="col-12 col-sm-6">
                        <div className="col-12 EditElementsModal__img">
                            <img src={bannerData?.img3URL} onError="this.src = 'https://firebasestorage.googleapis.com/v0/b/grupo-leti-fd84e.appspot.com/o/images%2Fno-image.png?alt=media&token=73bf7cd8-629d-4deb-b281-9e629fbfb752';" alt={bannerData?.img3URL} />
                            <InputFile
                                value={bannerData?.img3URL}
                                onChange={onFileSelected}
                                id="fileButton"
                                name="imgURL"
                                type="file"
                                placeholder={bannerData?.img3URL}
                            />
                        </div>
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