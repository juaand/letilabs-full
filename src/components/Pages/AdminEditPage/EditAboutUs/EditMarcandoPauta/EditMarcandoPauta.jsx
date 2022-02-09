import React, {useState, useEffect} from 'react'
import {Editor} from '@tinymce/tinymce-react'

import {useFormState} from '../../../../../hooks/useFormState'
import {getMarcandoPauta, updateMarcandoPautaData} from '../../../../../services/ApiClient'
import Button from '../../../../Form/FormButton/FormButton'
import InputFile from '../../../../Form/InputFile/InputFile'
import {app} from '../../../../../services/firebase'

function EditMarcandoPauta() {

    const [marcandoPautaData, setMarcandoPautaData] = useState()
    const [disabled, setDisabled] = useState(true)

    const {state, onBlur, onChange} = useFormState(
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



    const {data, error, touch} = state
    const [registerError, setRegisterError] = useState(null)


    const updateMarcandoPauta = async (event) => {
        event.preventDefault()
        data.id = marcandoPautaData._id

        try {
            await updateMarcandoPautaData(data)
                .then(marcandopauta => {
                    setMarcandoPautaData(marcandopauta[0])
                })
                .catch(error => {
                    setRegisterError(error)
                })
        } catch (err) {
            setRegisterError(err.response?.data?.message)
        }
    }
    
    const handleMarcandoPautaDescription = (e) => {
        data.description = e.target.getContent()
    }

    const onFileSelected = async (e) => {
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
        data.imgURL = fileUrl
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
                            Imagen
                        </p>
                        <InputFile
                            value={data?.imgURL}
                            onChange={onFileSelected}
                            id="fileButton"
                            name="picpath"
                            type="file"
                            placeholder={marcandoPautaData?.imgURL}
                        />
                    </div>
                    <div className="col-12">
                        <Button cssStyle="leti-btn mt-5 AdminEdit__form-leti-btn" >Guardar cambios - Banner</Button>
                    </div>

                </div>
                {registerError && <div className="alert alert-danger">{registerError}</div>}
            </form>
        </section>
    )
}

export default EditMarcandoPauta
