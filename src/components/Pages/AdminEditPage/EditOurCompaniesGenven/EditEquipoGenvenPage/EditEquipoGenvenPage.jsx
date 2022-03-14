import React, {useState, useEffect} from 'react'
import {Editor} from '@tinymce/tinymce-react'

import {getEquipoGenvenOC, updateEquipoGenvenOC, createContent} from '../../../../../services/ApiClient'
import InputWithLabel from '../../../../Form/InputWithLabel/InputWithLabel'
import {useFormState} from '../../../../../hooks/useFormState'
import InputFile from '../../../../Form/InputFile/InputFile'
import Button from '../../../../Form/FormButton/FormButton'
import {app} from '../../../../../services/firebase'
import Loader from '../../../../Loader/Loader'


function EditEquipoGenvenPage() {

    const [isDisabled, setIsDisabled] = useState(false)
    const [bannerData, setBannerData] = useState()
    const [message, setMessage] = useState('')

    const {state, onBlur, onChange} = useFormState(
        {
            data: {
                id: '',
                description: bannerData?.description,
                imgURL: bannerData?.imgURL,
                buttonTitle: bannerData?.buttonTitle,
                buttonLink: bannerData?.buttonLink,
            },
            error: {
                description: true,
                imgURL: true,
                buttonTitle: true,
                buttonLink: true,
            },
            touch: {},
        },
        {
            description: v => v.length,
            imgURL: v => v.length,
            buttonTitle: v => v.length,
            buttonLink: v => v.length,
        }
    )



    const {data, error} = state
    const [registerError, setRegisterError] = useState(null)

    const contentData = {
        content: '',
        url: '/genven',
        name: 'Genven',
        type: `${bannerData?._id}`,
    }

    const updateInfoEquipo = async (event) => {
        event.preventDefault()
        data.id = bannerData._id

        if (contentData?.content?.length > 0) {
            createContent(contentData)
        }

        if (Object.values(error).map(el => el).includes(false)) {
            try {
                await updateEquipoGenvenOC(data)
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
                setMessage("Imagen cargada correctamente")
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
            const getBannerData = await getEquipoGenvenOC()
            setBannerData(getBannerData)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {isDisabled && <Loader message="Cargando imagen..." />}
            <section className="container-fluid EditContent">
                <h2>Equipo Genven</h2>
                <form className="AdminEdit__form" onSubmit={updateInfoEquipo}>
                    <div className="row">
                        <div className="col-12 col-sm-6 EditElementsModal__img m-0">
                            <img src={bannerData?.imgURL} onError="this.src = 'https://firebasestorage.googleapis.com/v0/b/grupoleti.appspot.com/o/images%2Fno-image.png?alt=media&token=6e518b16-dc11-46e3-83e8-ae4b84a18293';" alt={bannerData?.title} />
                            <InputFile
                                value={bannerData?.imgURL}
                                onChange={onFileSelected}
                                id="fileButton"
                                name="imgURL"
                                type="file"
                                label="imagen"
                                placeholder={bannerData?.imgURL}
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
                        <div className="col-12 col-sm-6">
                            <p className="AdminEdit__form__label">
                                Texto botón
                            </p>
                            <InputWithLabel
                                value={data?.buttonTitle}
                                onBlur={onBlur}
                                onChange={onChange}
                                name="buttonTitle"
                                type="text"
                                cssStyle="form-control mb-0"
                                placeholder={bannerData?.buttonTitle}
                            />
                        </div>
                        <div className="col-12 col-sm-6">
                            <p className="AdminEdit__form__label">
                                URL botón
                            </p>
                            <InputWithLabel
                                value={data?.buttonLink}
                                onBlur={onBlur}
                                onChange={onChange}
                                name="buttonLink"
                                type="text"
                                cssStyle="form-control mb-0"
                                placeholder={bannerData?.buttonLink}
                            />
                        </div>
                        <div className="col-12">

                            <Button cssStyle="leti-btn AdminEdit__form-leti-btn mt-5" >Guardar cambios</Button>
                            {message && <span className="AdminEdit__message">{message}</span>}

                        </div>

                    </div>
                    {registerError && <div className="alert alert-danger">{registerError}</div>}
                </form>
            </section>
        </>
    )
}

export default EditEquipoGenvenPage
