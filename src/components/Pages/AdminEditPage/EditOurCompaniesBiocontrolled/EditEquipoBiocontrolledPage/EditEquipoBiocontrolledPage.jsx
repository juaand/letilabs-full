import React, {useState, useEffect} from 'react'
import {useFormState} from '../../../../../hooks/useFormState'
import {getEquipoBiocontrolledOC, updateEquipoBiocontrolledOC} from '../../../../../services/ApiClient'
import InputWithLabel from '../../../../Form/InputWithLabel/InputWithLabel'
import InputFile from '../../../../Form/InputFile/InputFile'
import {app} from '../../../../../services/firebase'
import Button from '../../../../Form/FormButton/FormButton'
import {Editor} from '@tinymce/tinymce-react'


function EditEquipoBiocontrolledPage() {
    const [bannerData, setBannerData] = useState()
    const [imageSuccess, setImageSuccess] = useState('')
    const [message, setMessage] = useState('')
    const [isDisabled, setIsDisabled] = useState(false)

    const {state, onBlur, onChange} = useFormState(
        {
            data: {
                id: '',
                description: bannerData?.description,
                person: bannerData?.person,
                imgURL: bannerData?.imgURL,
                buttonTitle: bannerData?.buttonTitle,
                buttonLink: bannerData?.buttonLink,
            },
            error: {
                description: true,
                person: true,
                imgURL: false,
                buttonTitle: false,
                buttonLink: false,
            },
            touch: {},
        },
        {
            description: v => v.length,
            person: v => v.length,
            imgURL: v => v.length,
            buttonTitle: v => v.length,
            buttonLink: v => v.length,
        }
    )



    const {data, error, touch} = state
    const [registerError, setRegisterError] = useState(null)
    const [disabled, setDisabled] = useState(true)


    const updateBanner = async (event) => {
        event.preventDefault()
        data.id = bannerData._id

        try {
            await updateEquipoBiocontrolledOC(data)
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
    const handleBannerPerson = (e) => {
        data.person = e.target.getContent()
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
            const getBannerData = await getEquipoBiocontrolledOC()
            setBannerData(getBannerData)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <section className="container-fluid EditContent">
            <h2>Equipo Biocontrolled</h2>
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
                            Persona del equipo y cargo
                        </p>
                        <Editor
                            initialValue={bannerData?.person}
                            onChange={handleBannerPerson}
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
                            />
                        </div>
                    </div>
                    <div className="col-12 col-sm-4">
                        <p className="AdminEdit__form__label">
                            Titulo boton
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
                    <div className="col-12 col-sm-4">
                        <p className="AdminEdit__form__label">
                            Url boton
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
                    <div className="col-12">
                        <Button cssStyle="leti-btn AdminEdit__form-leti-btn" >Guardar cambios - Banner</Button>
                    </div>

                </div>
                {registerError && <div className="alert alert-danger">{registerError}</div>}
            </form>
        </section>
    )
}

export default EditEquipoBiocontrolledPage
