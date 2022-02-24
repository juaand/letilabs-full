import React, {useState, useEffect} from 'react'

import {getLogoCarouselData, updateTitleCarrouselAlliance, createAlly, deleteLogoCarouselAlliance} from '../../../../../services/ApiClient'
import InputWithLabel from '../../../../Form/InputWithLabel/InputWithLabel'
import {useFormState} from '../../../../../hooks/useFormState'
import InputFile from '../../../../Form/InputFile/InputFile'
import Button from '../../../../Form/FormButton/FormButton'
import {app} from '../../../../../services/firebase'
import Loader from '../../../../Loader/Loader'

function EditCarrouselAlliances() {

    const [logoAlliData, setLogoAlliData] = useState([])
    const [imageMessage, setImageMessage] = useState('')
    const [imageSuccess, setImageSuccess] = useState('')
    const [isDisabled, setIsDisabled] = useState(false)
    const [message, setMessage] = useState('')

    const {state, onChange} = useFormState(
        {
            data: {
                title: '',
                picPath: '',
            },
            error: {
                title: true,
                picPath: true,
            },
            touch: {},
        },
        {
            title: v => v.length,
            picPath: v => v.length,
        }
    )

    const {data, error} = state
    const [registerError, setRegisterError] = useState(null)

    const deleteItem = async (id) => {
        const getUpdatedData = await deleteLogoCarouselAlliance(id)
        setLogoAlliData(getUpdatedData)
    }

    const updateInfo = async (event) => {
        event.preventDefault()

        if (error.title === false) {
            try {
                await updateTitleCarrouselAlliance(data)
                    .then(info => {
                        setLogoAlliData(info)
                        setMessage('Data atualizada exitosamente')
                    })
                    .catch(error => {
                        setRegisterError(error)
                    })
            } catch (err) {
                setRegisterError(err.response?.data?.message)
            }
        } else {
            setMessage('Por favor edite el campo')
        }
    }

    const createNewAlly = async (event) => {
        event.preventDefault()
        data.title = logoAlliData[0]?.title

        console.log(data)

        if (error.picPath === false) {
            try {
                await createAlly(data)
                    .then(info => {
                        setLogoAlliData(info)
                        setImageMessage('Data atualizada exitosamente')
                    })
                    .catch(error => {
                        setRegisterError(error)
                    })
            } catch (err) {
                setRegisterError(err.response?.data?.message)
            }
        } else {
            setImageMessage('Por añada una imagen')
        }

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
                setImageSuccess("Imagen subida correctamente")
            })
            .catch(err => {console.log(err)})

        // Get file url
        const fileUrl = await filePath.getDownloadURL()
        data.picPath = fileUrl
        setIsDisabled(false)
        error.picPath = false
    }

    useEffect(() => {
        const fetchData = async () => {
            const getLogoCarouselDataData = await getLogoCarouselData()
            setLogoAlliData(getLogoCarouselDataData)

        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {isDisabled && <Loader message="Cargando imagen..." />}
            <section className="container-fluid EditContent pt-0">
                <h2>Aliados</h2>
                <form className="AdminEdit__form" onSubmit={updateInfo}>
                    <div className="row">
                        <h3 className="mt-5">Editar título carrusel</h3>
                        <div className="col-12">
                            <InputWithLabel
                                value={data.title}
                                label="Título carrusel"
                                onChange={onChange}
                                name="title"
                                type="text"
                                cssStyle="form-control mb-5"
                                placeholder={logoAlliData[0]?.title}
                            />
                        </div>
                        <div className="col-12 col-sm-6">
                            <Button type="submit" cssStyle="leti-btn">Editar título</Button>
                            {message && <span className="AdminEdit__message ">{message}</span>}
                        </div>
                    </div>
                    {registerError && <div className="alert alert-danger">{registerError}</div>}
                </form>
                <hr className="mt-5" />
                <h3 className="mt-5">Añadir nuevo aliado al carrusel</h3>
                <form className="AdminEdit__form" onSubmit={createNewAlly}>
                    <div className="row">
                        <div className="col-12">
                            <p className="AdminEdit__form__label">
                                Imagen
                            </p>
                            <InputFile
                                classStyle="mb-0"
                                value={data?.picPath}
                                onChange={onFileSelected}
                                id="fileButton"
                                name="picPath"
                                type="file"
                                placeholder={logoAlliData[0]?.picPath}
                            />
                            {imageSuccess && <span className="AdminEdit__message mt-1">{imageSuccess}</span>}
                        </div>
                        <div className="col-12 col-sm-6">
                            <Button type="submit" cssStyle="leti-btn mt-5">Añadir aliado</Button>
                            {imageMessage && <span className="AdminEdit__message ">{imageMessage}</span>}
                        </div>
                    </div>
                    {registerError && <div className="alert alert-danger">{registerError}</div>}
                </form>

            </section>
            {logoAlliData?.length > 0 &&
                <section className="container-fluid EditContent EditContent-timeline">
                    <h2>Eliminar aliado del carrusel</h2>
                    <div className="row justify-content-around">
                        {logoAlliData?.map(el =>
                            <div className="col-sm-1 col-6 EditUnidades__trash" onClick={() => deleteItem(el._id)}>
                                <img className="EditCarousel__img" src={el?.picPath} onError="this.src = 'https://firebasestorage.googleapis.com/v0/b/grupo-leti-fd84e.appspot.com/o/images%2Fno-image.png?alt=media&token=73bf7cd8-629d-4deb-b281-9e629fbfb752';" alt="logo de aliado de grupo leti" />
                            </div>
                        )}
                    </div>
                </section>
            }
        </>
    )
}

export default EditCarrouselAlliances
