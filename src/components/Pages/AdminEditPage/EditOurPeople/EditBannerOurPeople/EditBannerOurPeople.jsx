import React, {useState, useEffect} from 'react'
import {Editor} from '@tinymce/tinymce-react'

import {getBannerOurPeople, updateBannerOurPeople, createContent} from '../../../../../services/ApiClient'
import {useFormState} from '../../../../../hooks/useFormState'
import {app} from '../../../../../services/firebase'

import InputFile from '../../../../Form/InputFile/InputFile'
import Button from '../../../../Form/FormButton/FormButton'
import Loader from '../../../../Loader/Loader'

function EditBannerOurPeople() {

    const [bannerData, setBannerData] = useState([])
    const [isDisabled, setIsDisabled] = useState(false)
    const [message, setMessage] = useState('')

    const {state} = useFormState(
        {
            data: {
                id: '',
                description: bannerData?.description,
                imgURL: bannerData?.imgURL,
                title: bannerData?.title,
            },
            error: {
                description: true,
                imgURL: true,
                title: true,
            },
            touch: {},
        },
        {
            description: v => v.length,
            imgURL: v => v.length,
            title: v => v.length,
        }
    )


    const {data, error} = state
    const [registerError, setRegisterError] = useState(null)

    const contentData = {
        content: '',
        url: '/nuestra-gente',
        name: 'Nuestra gente',
        type: `${bannerData?._id}`,
    }

    const updateBanner = async (event) => {
        event.preventDefault()
        data.id = bannerData._id

        if (contentData.content.length > 0) {
            createContent(contentData)
        }

        if (Object.values(error).map(el => el).includes(false)) {
            try {
                await updateBannerOurPeople(data)
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
            setMessage('Por favor edite alguno de los campos')
        }
    }
    
    const handleBannerDescription = (e) => {
        data[e.target.settings.name] = e.target.getContent()
        contentData.content = e.target.getContent({format: "text"})
        error[e.target.settings.name] = false
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
            const getBannerData = await getBannerOurPeople()
            setBannerData(getBannerData)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {isDisabled && <Loader message="Cargando imagen..." />}
            <section className="container-fluid EditContent">
                <h2>Banner</h2>
                <form className="AdminEdit__form" onSubmit={updateBanner}>
                    <div className="row">
                        <div className="col-12">
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
                        <div className="col-12 col-sm-6">
                            <p className="AdminEdit__form__label">
                                Título
                            </p>
                            <Editor
                                initialValue={bannerData?.title}
                                onChange={handleBannerDescription}
                                apiKey={process.env.REACT_APP_API_TINY_CLOUD}
                                init={{
                                    name: 'title',
                                    height: 180,
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
                                onChange={handleBannerDescription}
                                apiKey={process.env.REACT_APP_API_TINY_CLOUD}
                                init={{
                                    name: 'description',
                                    height: 180,
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

export default EditBannerOurPeople
