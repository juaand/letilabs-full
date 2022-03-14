import React, {useState, useEffect} from 'react'
import {Editor} from '@tinymce/tinymce-react'

import {getMegat, updateMegatData, createContent} from '../../../../../services/ApiClient'
import InputWithLabel from '../../../../Form/InputWithLabel/InputWithLabel'
import {useFormState} from '../../../../../hooks/useFormState'
import InputFile from '../../../../Form/InputFile/InputFile'
import Button from '../../../../Form/FormButton/FormButton'
import {app} from '../../../../../services/firebase'
import Loader from '../../../../Loader/Loader'

function EditMegat() {

    const [registerError, setRegisterError] = useState(null)
    const [isDisabled, setIsDisabled] = useState(false)
    const [megatData, setMegatData] = useState()
    const [message, setMessage] = useState('')

    const {state, onBlur, onChange} = useFormState(
        {
            data: {
                id: '',
                title: megatData?.title,
                description: megatData?.description,
                url: megatData?.url,
                buttonTitle: megatData?.buttonTitle,
                logoURL: megatData?.logoURL,
            },
            error: {
                title: true,
                description: true,
                url: true,
                buttonTitle: true,
                logoURL: true,
            },
            touch: {},
        },
        {
            title: v => v.length,
            description: v => v.length,
            url: v => v.length,
            buttonTitle: v => v.length,
            logoURL: v => v.length,
        }
    )

    const {data, error} = state

    const contentData = {
        content: '',
        url: '/sobre-nosotros',
        name: 'Sobre nosotros',
        type: 'Sobre nosotros megat',
    }

    const updateMegat = async (event) => {
        event.preventDefault()
        data.id = megatData._id

        if (contentData?.content?.length > 0) {
            createContent(contentData)
        }

        if (Object.values(error).map(el => el).includes(false)) {
            try {
                await updateMegatData(data)
                    .then(megat => {
                        setMegatData(megat)
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

    const handleMegatDescription = (e) => {
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
        data.logoURL = fileUrl
        setIsDisabled(false)
        error.logoURL = false
    }


    useEffect(() => {

        const fetchData = async () => {
            const getMegatData = await getMegat()
            setMegatData(getMegatData)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {isDisabled && <Loader message="Cargando imagen..." />}
            <section className="container-fluid EditContent">
                <h2>Megat</h2>
                <form className="AdminEdit__form" onSubmit={updateMegat}>
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
                                cssStyle="form-control"
                                placeholder={megatData?.title}
                            />
                        </div>
                        <div className="col-12 col-sm-6">
                            <div className="EditElementsModal__img m-0">
                                <img src={megatData?.logoURL} onError="this.src = 'https://firebasestorage.googleapis.com/v0/b/grupoleti.appspot.com/o/images%2Fno-image.png?alt=media&token=6e518b16-dc11-46e3-83e8-ae4b84a18293';" alt={megatData?.title} />
                                <InputFile
                                    value={data?.logoURL}
                                    onChange={onFileSelected}
                                    id="fileButton"
                                    name="logoURL"
                                    type="file"
                                    placeholder={megatData?.logoURL}
                                    label="Subir imagen"
                                />
                            </div>
                        </div>
                        <div className="col-12 col-sm-6">
                            <p className="AdminEdit__form__label">
                                Descripción
                            </p>
                            <Editor
                                initialValue={megatData?.description}
                                onChange={handleMegatDescription}
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
                                URL del botón
                            </p>
                            <InputWithLabel
                                value={data?.url}
                                onBlur={onBlur}
                                onChange={onChange}
                                name="url"
                                type="text"
                                cssStyle="form-control"
                                placeholder={megatData?.url}
                            />
                            <p className="AdminEdit__form__label">
                                Título del botón
                            </p>
                            <InputWithLabel
                                value={data?.buttonTitle}
                                onBlur={onBlur}
                                onChange={onChange}
                                name="buttonTitle"
                                type="text"
                                cssStyle="form-control"
                                placeholder={megatData?.buttonTitle}
                            />
                        </div>
                        <div className="col-12">
                            <Button cssStyle="leti-btn AdminEdit__form-leti-btn mt-5" >Guardar cambios
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

export default EditMegat
