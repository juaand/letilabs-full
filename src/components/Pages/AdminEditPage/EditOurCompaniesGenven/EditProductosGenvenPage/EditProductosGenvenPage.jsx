import React, {useState, useEffect} from 'react'
import {Editor} from '@tinymce/tinymce-react'

import {getProductosGenvenOC, updateProductosGenvenOC, createContent} from '../../../../../services/ApiClient'
import InputWithLabel from '../../../../Form/InputWithLabel/InputWithLabel'
import {useFormState} from '../../../../../hooks/useFormState'
import InputFile from '../../../../Form/InputFile/InputFile'
import Button from '../../../../Form/FormButton/FormButton'
import {app} from '../../../../../services/firebase'
import Loader from '../../../../Loader/Loader'


function EditProductosGenvenPage() {

    const [registerError, setRegisterError] = useState(null)
    const [isDisabled, setIsDisabled] = useState(false)
    const [bannerData, setBannerData] = useState()
    const [message, setMessage] = useState('')

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
                img1URL: true,
                img2URL: true,
                img3URL: true,
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

    const contentData = {
        content: '',
        url: '/genven',
        name: 'Genven',
        type: `${bannerData?._id}`,
    }

    const updateBanner = async (event) => {
        event.preventDefault()

        if (contentData?.content?.length > 0) {
            createContent(contentData)
        }

        if (Object.values(error).map(el => el).includes(false)) {
            data.id = bannerData._id
            try {
                await updateProductosGenvenOC(data)
                    .then(banner => {
                        setBannerData(banner)
                        setMessage('Data actualizada exitosamente')
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

    const handleBannerDescription = (e) => {
        data.description = e.target.getContent()
        contentData.content = e.target.getContent({format: "text"})
        error.description = false
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
                setMessage("Imagen uno subida correctamente")
            })
            .catch(err => {console.log(err)})

        // Get file url
        const fileUrl = await filePath.getDownloadURL()
        data.img1URL = fileUrl
        setIsDisabled(false)
        error.img1URL = false
    }

    const onFileSelected2 = async (e) => {
        setIsDisabled(!isDisabled)

        // Get file
        const file = e.target.files[0]

        // Create storage ref
        const storageRef = app.storage().ref()
        const filePath = storageRef.child('images/' + file.name)

        // Upload file
        await filePath.put(file)
            .then(() => {
                setMessage("Imagen dos subida correctamente")
            })
            .catch(err => {console.log(err)})

        // Get file url
        const fileUrl = await filePath.getDownloadURL()
        data.img2URL = fileUrl
        setIsDisabled(false)
        error.img2URL = false
    }

    const onFileSelected3 = async (e) => {
        setIsDisabled(!isDisabled)

        // Get file
        const file = e.target.files[0]

        // Create storage ref
        const storageRef = app.storage().ref()
        const filePath = storageRef.child('images/' + file.name)

        // Upload file
        await filePath.put(file)
            .then(() => {
                setMessage("Imagen tres subida correctamente")
            })
            .catch(err => {console.log(err)})

        // Get file url
        const fileUrl = await filePath.getDownloadURL()
        data.img3URL = fileUrl
        setIsDisabled(false)
        error.img3URL = false
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
        <>
            {isDisabled && <Loader message="Cargando imagen..." />}
            <section className="container-fluid EditContent">
                <h2>Productos Genven</h2>
                <form className="AdminEdit__form" onSubmit={updateBanner}>
                    <div className="row">
                        <div className="col-12 col-sm-6">
                            <p className="AdminEdit__form__label">
                                Descripci??n
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
                                T??tulo bot??n
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
                                Link bot??n
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
                        <div className="col-12 col-sm-4">
                            <div className="col-12 EditElementsModal__img">
                                <img src={bannerData?.img1URL} onError="this.src = 'https://firebasestorage.googleapis.com/v0/b/grupoleti.appspot.com/o/images%2Fno-image.png?alt=media&token=6e518b16-dc11-46e3-83e8-ae4b84a18293';" alt={bannerData?.img1URL} />
                                <InputFile
                                    value={bannerData?.img1URL}
                                    onChange={onFileSelected}
                                    id="fileButton"
                                    name="imgURL"
                                    type="file"
                                    placeholder={bannerData?.img1URL}
                                    label="Imagen uno"
                                />
                            </div>
                        </div>
                        <div className="col-12 col-sm-4">
                            <div className="col-12 EditElementsModal__img">
                                <img src={bannerData?.img2URL} onError="this.src = 'https://firebasestorage.googleapis.com/v0/b/grupoleti.appspot.com/o/images%2Fno-image.png?alt=media&token=6e518b16-dc11-46e3-83e8-ae4b84a18293';" alt={bannerData?.img2URL} />
                                <InputFile
                                    value={bannerData?.img2URL}
                                    onChange={onFileSelected2}
                                    id="fileButton"
                                    name="imgURL"
                                    type="file"
                                    placeholder={bannerData?.img2URL}
                                    label="Imagen dos"
                                />
                            </div>
                        </div>
                        <div className="col-12 col-sm-4">
                            <div className="col-12 EditElementsModal__img">
                                <img src={bannerData?.img3URL} onError="this.src = 'https://firebasestorage.googleapis.com/v0/b/grupoleti.appspot.com/o/images%2Fno-image.png?alt=media&token=6e518b16-dc11-46e3-83e8-ae4b84a18293';" alt={bannerData?.img3URL} />
                                <InputFile
                                    value={bannerData?.img3URL}
                                    onChange={onFileSelected3}
                                    id="fileButton"
                                    name="imgURL"
                                    type="file"
                                    placeholder={bannerData?.img3URL}
                                    label="Imagen tres"
                                />
                            </div>
                        </div>
                        <div className="col-12">
                            <Button cssStyle="leti-btn AdminEdit__form-leti-btn" >Guardar cambios</Button>
                            {message && <span className="AdminEdit__message">{message}</span>}
                        </div>

                    </div>
                    {registerError && <div className="alert alert-danger">{registerError}</div>}
                </form>
            </section>
        </>
    )
}

export default EditProductosGenvenPage