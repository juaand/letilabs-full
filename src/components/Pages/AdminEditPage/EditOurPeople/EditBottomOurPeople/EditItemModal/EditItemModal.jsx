import React, {useState} from 'react'
import {Fade} from 'react-awesome-reveal'

import './EditItemModal.css'
import {updateBottomOurPeople} from '../../../../../../services/ApiClient'
import InputWithLabel from '../../../../../Form/InputWithLabel/InputWithLabel'
import {useFormState} from '../../../../../../hooks/useFormState'
import InputFile from '../../../../../Form/InputFile/InputFile'
import Button from '../../../../../Form/FormButton/FormButton'
import {app} from '../../../../../../services/firebase'
import Loader from '../../../../../Loader/Loader'


function EditItemModal({infodata, hideModal, closeModal}) {

    const [registerError, setRegisterError] = useState(null)

    const [isDisabled, setIsDisabled] = useState(false)

    const [ctaData, setCtaData] = useState(infodata)

    const [imageSuccess, setImageSuccess] = useState('')
    const [message, setMessage] = useState('')

    const {state, onChange} = useFormState(
        {
            data: {
                id: '',
                buttonLink: ctaData?.buttonLink,
                buttonTitle: ctaData?.buttonTitle,
                img: ctaData?.img,
                title: ctaData?.title,
            },
            error: {
                title: true,
                img: true,
                buttonTitle: true,
                buttonLink: true,
            },
            touch: {},
        },
        {
            title: v => v.length,
            img: v => v.length,
            buttonTitle: v => v.length,
            buttonLink: v => v.length,
        }
    )

    const {data, error} = state

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
                setImageSuccess("Imagen subida correctamente")
            })
            .catch(err => {console.log(err)})

        // Get file url
        const fileUrl = await filePath.getDownloadURL()
        data.img = fileUrl
        setIsDisabled(false)
        error.img = false
    }

    const updateInfo = async (event) => {
        event.preventDefault()
        data.id = ctaData?._id

        if (Object.values(error).map(el => el).includes(false)) {
            try {
                await updateBottomOurPeople(data)
                    .then(info => {
                        setCtaData(info)
                        setMessage('Data atualizada exitosamente')
                        hideModal(info)
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

    return (
        <>
            {isDisabled && <Loader message="Cargando imagen..." />}
            <div className="EditItemModal">
                <div className="container">
                    <div className="row justify-content-center">
                        <Fade direction="down" className="col-11 col-sm-10 EditItemModal__container">
                            <>
                                <span className="EditItemModal__close" onClick={closeModal}></span>
                                <form className="AdminEdit__form" onSubmit={updateInfo}>
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <h1 className="DeleteItemModal__ask">Editar<span className="ShowEditModal__news-title">{ctaData.title}</span></h1>
                                        </div>
                                        <div className="col-sm-6 col-12">
                                            <p className="AdminEdit__form__label">
                                                Imagen CTA
                                            </p>
                                            <InputFile
                                                classStyle="mb-0"
                                                value={data?.img}
                                                onChange={onFileSelected}
                                                id="fileButton"
                                                name="imgURL"
                                                type="file"
                                                placeholder={ctaData?.img}
                                            />
                                            {imageSuccess && <span className="AdminEdit__message mt-1">{imageSuccess}</span>}
                                        </div>
                                        <div className="col-sm-6 col-12">
                                            <InputWithLabel
                                                label="Título CTA"
                                                onChange={onChange}
                                                name="title"
                                                type="text"
                                                cssStyle="form-control"
                                                placeholder={ctaData?.title}
                                            />
                                        </div>
                                        <div className="col-sm-6 col-12">
                                            <InputWithLabel
                                                label="Texto del botón"
                                                onChange={onChange}
                                                name="buttonTitle"
                                                type="text"
                                                cssStyle="form-control"
                                                placeholder={ctaData?.buttonTitle}
                                            />
                                        </div>
                                        <div className="col-sm-6 col-12">
                                            <InputWithLabel
                                                label="URL del botón"
                                                onChange={onChange}
                                                name="buttonLink"
                                                type="text"
                                                cssStyle="form-control"
                                                placeholder={ctaData?.buttonLink}
                                            />
                                        </div>
                                        <div className="col-12 mt-5 mb-5">
                                            <Button type="submit" cssStyle="leti-btn">Guardar cambios</Button>
                                            {message && <span className="AdminEdit__message">{message}</span>}
                                        </div>
                                    </div>
                                    {registerError && <div className="alert alert-danger">{registerError}</div>}
                                </form>
                            </>
                        </Fade>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditItemModal


