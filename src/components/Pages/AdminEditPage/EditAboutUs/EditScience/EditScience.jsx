import React, {useState, useEffect} from 'react'
import {Editor} from '@tinymce/tinymce-react'

import {getScience, updateScienceData, createContent} from '../../../../../services/ApiClient'
import InputWithLabel from '../../../../Form/InputWithLabel/InputWithLabel'
import {useFormState} from '../../../../../hooks/useFormState'
import InputFile from '../../../../Form/InputFile/InputFile'
import Button from '../../../../Form/FormButton/FormButton'
import {app} from '../../../../../services/firebase'
import Loader from '../../../../Loader/Loader'

function EditScience() {

    const [registerError, setRegisterError] = useState(null)
    const [isDisabled, setIsDisabled] = useState(false)
    const [scienceData, setScienceData] = useState()
    const [message, setMessage] = useState('')

    const {state, onBlur, onChange} = useFormState(
        {
            data: {
                id: '',
                title: scienceData?.title,
                desc: scienceData?.desc,
                imgURL: scienceData?.imgURL,
            },
            error: {
                title: true,
                desc: true,
                imgURL: true,
            },
            touch: {},
        },
        {
            title: v => v.length,
            desc: v => v.length,
            imgURL: v => v.length,
        }
    )

    const {data, error} = state

    const contentData = {
        content: '',
        url: '/somos-leti',
        name: 'Somos Leti',
        type: 'Somos leti megat',
    }

    const updateScience = async (event) => {
        event.preventDefault()
        data.id = scienceData._id

        if (contentData?.content?.length > 0) {
            createContent(contentData)
        }

        if (Object.values(error).map(el => el).includes(false)) {
            try {
                await updateScienceData(data)
                    .then(science => {
                        setScienceData(science)
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

    const handleScienceDescription = (e) => {
        data.desc = e.target.getContent()
        contentData.content = e.target.getContent({format: "text"})
        error.desc = false
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
            const getScienceData = await getScience()
            console.log(getScienceData)
            setScienceData(getScienceData)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {isDisabled && <Loader message="Cargando imagen..." />}
            <section className="container-fluid EditContent">
                <h2>La ciencia como base</h2>
                <form className="AdminEdit__form" onSubmit={updateScience}>
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
                                placeholder={scienceData?.title}
                            />
                        </div>
                        <div className="col-12 col-sm-6">
                            <div className="EditElementsModal__img m-0">
                                <img src={scienceData?.imgURL} onError="this.src = 'https://firebasestorage.googleapis.com/v0/b/grupoleti.appspot.com/o/images%2Fno-image.png?alt=media&token=6e518b16-dc11-46e3-83e8-ae4b84a18293';" alt={scienceData?.title} />
                                <InputFile
                                    value={data?.imgURL}
                                    onChange={onFileSelected}
                                    id="fileButton"
                                    name="imgURL"
                                    type="file"
                                    placeholder={scienceData?.imgURL}
                                    label="Subir imagen"
                                />
                            </div>
                        </div>
                        <div className="col-12 col-sm-6">
                            <p className="AdminEdit__form__label">
                                Descripción
                            </p>
                            <Editor
                                initialValue={scienceData?.desc}
                                onChange={handleScienceDescription}
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

export default EditScience
