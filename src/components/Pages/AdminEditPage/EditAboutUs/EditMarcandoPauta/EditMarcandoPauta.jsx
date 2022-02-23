import React, {useState, useEffect} from 'react'
import {Editor} from '@tinymce/tinymce-react'

import {getMarcandoPauta, updateMarcandoPautaData} from '../../../../../services/ApiClient'
import InputWithLabel from '../../../../Form/InputWithLabel/InputWithLabel'
import {useFormState} from '../../../../../hooks/useFormState'
import InputFile from '../../../../Form/InputFile/InputFile'
import Button from '../../../../Form/FormButton/FormButton'
import {app} from '../../../../../services/firebase'
import Loader from '../../../../Loader/Loader'

function EditMarcandoPauta() {

    const [marcandoPautaData, setMarcandoPautaData] = useState()
    const [disabled, setDisabled] = useState(true)
    const [isDisabled, setIsDisabled] = useState(false)
    const [message, setMessage] = useState('')

    const {state} = useFormState(
        {
            data: {
                id: '',
                description: marcandoPautaData?.description,
                imgURL: marcandoPautaData?.imgURL,
            },
            error: {
                description: true,
                imgURL: false,
            },
            touch: {},
        },
        {
            description: v => v.length,
            imgURL: v => v.length,
        }
    )

    const {data, error} = state
    const [registerError, setRegisterError] = useState(null)


    const updateMarcandoPauta = async (event) => {
        event.preventDefault()
        data.id = marcandoPautaData._id

        if (Object.values(error).map(el => el).includes(false)) {
            try {
                await updateMarcandoPautaData(data)
                    .then(marcandoPauta => {
                        setMarcandoPautaData(marcandoPauta)
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
    
    const handleMarcandoPautaDescription = (e) => {
        data.description = e.target.getContent()
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
            const getMarcandoPautaData = await getMarcandoPauta()
            setMarcandoPautaData(getMarcandoPautaData)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
        {isDisabled && <Loader message="Cargando imagen..." />}
        <section className="container-fluid EditContent">
            <h2>Marcando pauta</h2>
            <form className="AdminEdit__form" onSubmit={updateMarcandoPauta}>
                <div className="row">
                    <div className="col-12 col-sm-6">
                        <p className="AdminEdit__form__label">
                            Descripción
                        </p>
                        <Editor
                            initialValue={marcandoPautaData?.description}
                            onChange={handleMarcandoPautaDescription}
                            apiKey={process.env.REACT_APP_API_TINY_CLOUD}
                            init={{
                                height: 140,
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
                    <div className="col-12 EditElementsModal__img">
                            <img src={marcandoPautaData?.imgURL} onError="this.src = 'https://firebasestorage.googleapis.com/v0/b/grupo-leti-fd84e.appspot.com/o/images%2Fno-image.png?alt=media&token=73bf7cd8-629d-4deb-b281-9e629fbfb752';" alt={marcandoPautaData?.imgURL} />
                            <InputFile
                                value={data?.imgURL}
                                onChange={onFileSelected}
                                id="fileButton"
                                name="picpath"
                                type="file"
                                placeholder={marcandoPautaData?.imgURL}
                            />
                        </div>
                    </div>
                    <div className="col-12">
                        <Button cssStyle="leti-btn AdminEdit__form-leti-btn" >Guardar cambios</Button>
                    </div>

                </div>
                {registerError && <div className="alert alert-danger">{registerError}</div>}
            </form>
        </section>
        </>
    )
}

export default EditMarcandoPauta
