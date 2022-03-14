import React, {useState, useEffect} from 'react'
import {Editor} from '@tinymce/tinymce-react'

import {useFormState} from '../../../../../hooks/useFormState'
import {getLetterOurPhilosophy, updateLetterOurPhilosophy, createContent} from '../../../../../services/ApiClient'
import InputFile from '../../../../Form/InputFile/InputFile'
import Button from '../../../../Form/FormButton/FormButton'
import {app} from '../../../../../services/firebase'
import Loader from '../../../../Loader/Loader'

function EditBannerOurPhilosophy() {

    const [bannerData, setBannerData] = useState()
    const [isDisabled, setIsDisabled] = useState(false)
    const [message, setMessage] = useState('')

    const {state} = useFormState(
        {
            data: {
                id: bannerData?._id,
                body: bannerData?.body,
                imgURL: bannerData?.imgURL,
                mainTitle: bannerData?.mainTitle,
            },
            error: {
                body: true,
                imgURL: true,
                mainTitle: true,
            },
            touch: {},
        },
        {
            body: v => v.length,
            imgURL: v => v.length,
            mainTitle: v => v.length,
        }
    )

    const {data, error} = state
    const [registerError, setRegisterError] = useState(null)

    const contentData = {
        content: '',
        url: '/nuestra-filosofia',
        name: 'Nuestra filosofía',
        type: `${bannerData?._id}`,
    }

    const updateLetter = async (event) => {
        event.preventDefault()
        data.id = bannerData._id

        if (contentData?.content?.length > 0) {
            createContent(contentData)
        }

        if (Object.values(error).map(el => el).includes(false)) {
            try {
                await updateLetterOurPhilosophy(data)
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

    const handleBody = (e) => {
        data.body = e.target.getContent()
        contentData.content = e.target.getContent({format: "text"})
        error.body = false
    }

    const handleMainTitle = (e) => {
        data.mainTitle = e.target.getContent()
        error.mainTitle = false
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
            const getLetterData = await getLetterOurPhilosophy()
            setBannerData(getLetterData)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {isDisabled && <Loader message="Cargando imagen..." />}
            <section className="container-fluid EditContent">
                <h2>Carta del CEO</h2>
                <form className="AdminEdit__form" onSubmit={updateLetter}>
                    <div className="row">
                        <div className="col-12 col-sm-6">
                            <p className="AdminEdit__form__label">
                                Título de la carta
                            </p>
                            <Editor
                                initialValue={bannerData?.mainTitle}
                                onChange={handleMainTitle}
                                apiKey={process.env.REACT_APP_API_TINY_CLOUD}
                                init={{
                                    height: 120,
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
                            <div className="col-12 EditElementsModal__img">
                                <img src={bannerData?.imgURL} onError="this.src = 'https://firebasestorage.googleapis.com/v0/b/grupoleti.appspot.com/o/images%2Fno-image.png?alt=media&token=6e518b16-dc11-46e3-83e8-ae4b84a18293';" alt={bannerData?.title} />
                                <InputFile
                                    value={bannerData?.imgURL}
                                    onChange={onFileSelected}
                                    id="fileButton"
                                    name="imgURL"
                                    type="file"
                                />
                            </div>
                        </div>
                        <div className="col-12 col-sm-6">
                            <p className="AdminEdit__form__label">
                                Contenido de la carta
                            </p>
                            <Editor
                                initialValue={bannerData?.body}
                                onChange={handleBody}
                                apiKey={process.env.REACT_APP_API_TINY_CLOUD}
                                init={{
                                    height: 245,
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

export default EditBannerOurPhilosophy
