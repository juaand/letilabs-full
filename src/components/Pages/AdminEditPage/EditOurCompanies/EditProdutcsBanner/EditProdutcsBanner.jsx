import React, {useState, useEffect} from 'react'
import {Editor} from '@tinymce/tinymce-react'

import {getBannerProductsOC, updateBannerProductsOC} from '../../../../../services/ApiClient'
import {useFormState} from '../../../../../hooks/useFormState'
import InputFile from '../../../../Form/InputFile/InputFile'
import Button from '../../../../Form/FormButton/FormButton'
import {app} from '../../../../../services/firebase'
import Loader from '../../../../Loader/Loader'


function EditProdutcsBanner() {

    const [registerError, setRegisterError] = useState(null)
    const [isDisabled, setIsDisabled] = useState(false)
    const [bannerData, setBannerData] = useState()
    const [message, setMessage] = useState('')

    const {state} = useFormState(
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
                imgURL: true,
                img2URL: true,
                img3URL: true,
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



    const {data, error} = state

    const updateBanner = async (event) => {
        event.preventDefault()
        data.id = bannerData._id

        console.log(data)
        if (Object.values(error).map(el => el).includes(false)) {
            try {
                await updateBannerProductsOC(data)
                    .then(banner => {
                        console.log(banner)
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
        error.description = false
    }
    const handleBannerDescription2 = (e) => {
        data.description2 = e.target.getContent()
        error.description2 = false
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
        data.imgURL = fileUrl
        setIsDisabled(false)
        error.imgURL = false
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
            const getBannerData = await getBannerProductsOC()
            setBannerData(getBannerData)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
        {isDisabled && <Loader message="Cargando imagen..." />}
        <section className="container-fluid EditContent">
            <h2>Productos</h2>
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
                    <div className="col-12 col-sm-4">
                        <div className="col-12 EditElementsModal__img">
                            <img src={bannerData?.imgURL} onError="this.src = 'https://firebasestorage.googleapis.com/v0/b/grupo-leti-fd84e.appspot.com/o/images%2Fno-image.png?alt=media&token=73bf7cd8-629d-4deb-b281-9e629fbfb752';" alt={bannerData?.imgURL} />
                            <InputFile
                                value={bannerData?.imgURL}
                                onChange={onFileSelected}
                                id="fileButton"
                                name="imgURL"
                                type="file"
                                placeholder={bannerData?.imgURL}
                                label="Imagen uno"
                            />
                        </div>
                    </div>
                    <div className="col-12 col-sm-4">
                        <div className="col-12 EditElementsModal__img">
                            <img src={bannerData?.img2URL} onError="this.src = 'https://firebasestorage.googleapis.com/v0/b/grupo-leti-fd84e.appspot.com/o/images%2Fno-image.png?alt=media&token=73bf7cd8-629d-4deb-b281-9e629fbfb752';" alt={bannerData?.img2URL} />
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
                            <img src={bannerData?.img3URL} onError="this.src = 'https://firebasestorage.googleapis.com/v0/b/grupo-leti-fd84e.appspot.com/o/images%2Fno-image.png?alt=media&token=73bf7cd8-629d-4deb-b281-9e629fbfb752';" alt={bannerData?.img3URL} />
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

export default EditProdutcsBanner
