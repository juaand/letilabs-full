import React, {useState, useEffect} from 'react'
import {Editor} from '@tinymce/tinymce-react'

import {getBottomOurPhilosophy, updateBottomOurPhilosophy, createContent} from '../../../../../services/ApiClient'
import InputWithLabel from '../../../../Form/InputWithLabel/InputWithLabel'
import {useFormState} from '../../../../../hooks/useFormState'
import InputFile from '../../../../Form/InputFile/InputFile'
import Button from '../../../../Form/FormButton/FormButton'
import {app} from '../../../../../services/firebase'
import Loader from '../../../../Loader/Loader'

function EditBottomOurPhilosophy() {

    const [bottomOurPhilosophyData, setBottomOurPhilosophyData] = useState()
    const [isDisabled, setIsDisabled] = useState(false)
    const [message, setMessage] = useState('')

    const {state, onBlur, onChange} = useFormState(
        {
            data: {
                id: '',
                title: bottomOurPhilosophyData?.title,
                description: bottomOurPhilosophyData?.description,
                buttonLink: bottomOurPhilosophyData?.buttonLink,
                buttonTitle: bottomOurPhilosophyData?.buttonTitle,
                imgURL: bottomOurPhilosophyData?.imgURL,
            },
            error: {
                title: true,
                description: true,
                buttonLink: true,
                buttonTitle: true,
                imgURL: true,
            },
            touch: {},
        },
        {
            title: v => v.length,
            description: v => v.length,
            buttonLink: v => v.length,
            buttonTitle: v => v.length,
            imgURL: v => v.length,
        }
    )

    const {data, error, touch} = state
    const [registerError, setRegisterError] = useState(null)

    const contentData = {
        content: '',
        url: '/nuestra-filosofia',
        name: 'Nuestra filosofía',
        type: `${bottomOurPhilosophyData?._id}`,
    }

    const updateBotBannerOP = async (event) => {
        event.preventDefault()
        data.id = bottomOurPhilosophyData._id

        if (contentData?.content?.length > 0) {
            createContent(contentData)
        }

        if (Object.values(error).map(el => el).includes(false)) {
            if (data?.title?.trim() === '' && data?.description?.trim() === '') {
                setMessage('Por favor, rellene el título o la descripción.')
            } else {
                try {
                    await updateBottomOurPhilosophy(data)
                        .then(BottomOurPhilosophy => {
                            setBottomOurPhilosophyData(BottomOurPhilosophy)
                            setMessage('Data atualizada exitosamente')
                        })
                        .catch(error => {
                            setRegisterError(error)
                        })
                } catch (err) {
                    setRegisterError(err.response?.data?.message)
                }
            }
        } else {
            setMessage('Por favor edite alguno de los campos')
        }
    }
    const handleBottomOurPhilosophyDescription = (e) => {
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
            const getBottomOurPhilosophyData = await getBottomOurPhilosophy()
            setBottomOurPhilosophyData(getBottomOurPhilosophyData)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {isDisabled && <Loader message="Cargando imagen..." />}
            <section className="container-fluid EditContent">
                <h2>Carreras</h2>
                <form className="AdminEdit__form" onSubmit={updateBotBannerOP}>
                    <div className="row">
                        <div className="col-12 col-sm-6">
                            <p className="AdminEdit__form__label">
                                Descripción
                            </p>
                            <Editor
                                initialValue={bottomOurPhilosophyData?.description}
                                onChange={handleBottomOurPhilosophyDescription}
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
                                Título
                            </p>
                            <InputWithLabel
                                value={data?.title}
                                onBlur={onBlur}
                                onChange={onChange}
                                name="title"
                                type="text"
                                cssStyle={`form-control mb-0 ${touch.title && error.title ? "is-invalid" : ""}`}
                                placeholder={bottomOurPhilosophyData?.title}
                            />
                            <p className="AdminEdit__form__label mt-4">
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
                                Título del botón
                            </p>
                            <InputWithLabel
                                value={data?.buttonTitle}
                                onBlur={onBlur}
                                onChange={onChange}
                                name="buttonTitle"
                                type="text"
                                cssStyle={`form-control ${touch.buttonTitle && error.buttonTitle ? "is-invalid" : ""}`}
                                placeholder={bottomOurPhilosophyData?.buttonTitle}
                            />
                        </div>
                        <div className="col-12 col-sm-6">
                            <p className="AdminEdit__form__label">
                                URL del botón
                            </p>
                            <InputWithLabel
                                value={data?.buttonLink}
                                onBlur={onBlur}
                                onChange={onChange}
                                name="buttonLink"
                                type="text"
                                cssStyle={`form-control ${touch.buttonLink && error.buttonLink ? "is-invalid" : ""}`}
                                placeholder={bottomOurPhilosophyData?.buttonLink}
                            />
                        </div>
                        <div className="col-12">
                            <Button cssStyle="leti-btn AdminEdit__form-leti-btn" >Guardar cambios
                            </Button>
                            {message && <span className="AdminEdit__message">{message}</span>}
                        </div>

                    </div>
                    {registerError && <div className="alert alert-danger">{registerError}</div>}
                </form>
            </section>
        </>
    )
}

export default EditBottomOurPhilosophy
