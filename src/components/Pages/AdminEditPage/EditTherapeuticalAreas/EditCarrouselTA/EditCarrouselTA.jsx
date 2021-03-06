
import React, {useState, useEffect} from 'react'
import {Editor} from '@tinymce/tinymce-react'

import {getCarrouselTA, createCarrouselTA, updateTAGalleryTitle, createContent} from '../../../../../services/ApiClient'
import InputWithLabel from '../../../../Form/InputWithLabel/InputWithLabel'
import EditElementsModal from './EditElementsModal/EditElementsModal'
import {useFormState} from '../../../../../hooks/useFormState'
import InputFile from '../../../../Form/InputFile/InputFile'
import Button from '../../../../Form/FormButton/FormButton'
import {app} from '../../../../../services/firebase'
import Loader from '../../../../Loader/Loader'

function EditCarrouselTA() {

    const {state, onBlur, onChange} = useFormState(
        {
            data: {
                mainTitle: '',
                title: '',
                imgURL: '',
                desc: '',
            },
            error: {
                mainTitle: true,
                title: true,
                imgURL: true,
                desc: true,
            },
            touch: {},
        },
        {
            mainTitle: v => v.length,
            title: v => v.length,
            imgURL: v => v.length,
            desc: v => v.length,
        }
    )

    const {data, error} = state

    const [imageSuccess, setImageSuccess] = useState('')
    const [newItemMessage, setNewItemMessage] = useState('')
    const [registerError, setRegisterError] = useState(null)
    const [carrouselTAData, setCarrouselTAData] = useState()
    const [isDisabled, setIsDisabled] = useState(false)
    const [modalData, setModalData] = useState()
    const [message, setMessage] = useState('')
    const [bool, setBool] = useState(false)

    const showModal = (data) => {
        setModalData(data)
        setBool(!bool)
    }

    const updateInfo = async (event) => {
        event.preventDefault()

        if (error.mainTitle === false) {
            try {
                await updateTAGalleryTitle(data)
                    .then(info => {
                        setCarrouselTAData(info)
                        setNewItemMessage('T??tulo actualizado exitosamente')
                    })
                    .catch(error => {
                        setRegisterError(error)
                    })
            } catch (err) {
                setRegisterError(err.response?.data?.message)
            }
        } else {
            setNewItemMessage('Por favor edite el t??tulo')
        }
    }

    const contentData = {
        content: '',
        url: '/areas-terapeuticas',
        name: '??reas terape??ticas',
        type: '',
    }

    const createCarrouselItem = async (event) => {
        event.preventDefault()

        if (contentData?.content?.length > 0) {
            contentData.type = `??reas terap??uticas - ${data?.title}`
            createContent(contentData)
        }

        if (error.title === false && error.imgURL === false && error.desc === false) {
            data.mainTitle = carrouselTAData[0]?.mainTitle
            if (data.desc.length < 37) {
                setMessage('La descripci??n debe tener al menos 30 caracteres')
            } else {
                try {
                    await createCarrouselTA(data)
                        .then(carrouselTA => {
                            setCarrouselTAData(carrouselTA)
                            setMessage('Elemento a??adido exitosamente')
                        })
                        .catch(error => {
                            setRegisterError(error)
                        })
                } catch (err) {
                    setRegisterError(err.response?.data?.message)
                }
            }
        } else {
            setMessage('Por rellene todos los campos')
        }
    }

    const deleteItem = (data) => {
        setCarrouselTAData(data)
        setBool(!bool)
    }

    const handleDesc = (e) => {
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
                setImageSuccess("Imagen subida correctamente")
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
            const getCarrouselTAData = await getCarrouselTA()
            setCarrouselTAData(getCarrouselTAData)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {isDisabled && <Loader message="Cargando imagen..." />}
            {bool && <EditElementsModal hideModal={() => setBool(!bool)} element={modalData} deleteItem={(updateData) => deleteItem(updateData)} />}
            {carrouselTAData?.length > 0 &&
                <section className="container-fluid EditContent EditContent-timeline">
                    <h2>Editar elemento de la galer??a</h2>
                    <div className="row justify-content-around">
                        {carrouselTAData?.map(el =>
                            <div className="col-sm-1 col-6 EditCarousel__edit" onClick={() => showModal(el)}>
                                <img className="EditCarousel__img" src={el.imgURL} onError="this.src = 'https://firebasestorage.googleapis.com/v0/b/grupoleti.appspot.com/o/images%2Fno-image.png?alt=media&token=6e518b16-dc11-46e3-83e8-ae4b84a18293';" alt={el.imgURL} />
                                <p>{el.title}</p>
                            </div>
                        )}
                    </div>
                </section>}
            <section className="container-fluid EditContent">
                <form className="AdminEdit__form" onSubmit={updateInfo}>
                    <div className="row">
                        <h3>Editar t??tulo de la galer??a</h3>
                        <div className="col-12">
                            <InputWithLabel
                                value={data?.mainTitle}
                                label="T??tulo carrusel"
                                onChange={onChange}
                                name="mainTitle"
                                type="text"
                                cssStyle="form-control mb-5"
                                placeholder={carrouselTAData?.length > 0 && carrouselTAData[0]?.mainTitle}
                            />
                        </div>
                        <div className="col-12 col-sm-6">
                            <Button type="submit" cssStyle="leti-btn">Editar t??tulo</Button>
                            {newItemMessage && <span className="AdminEdit__message ">{newItemMessage}</span>}
                        </div>
                    </div>

                    <hr className="mt-5 mb-5" />

                    {registerError && <div className="alert alert-danger">{registerError}</div>}
                </form>
                <h2>Galer??a</h2>
                <form className="AdminEdit__form" onSubmit={createCarrouselItem}>
                    <div className="row">
                        <h3>A??adir nuevo elemento a la galer??a</h3>
                        <div className="col-12 col-sm-6">
                            <p className="AdminEdit__form__label">
                                T??tulo del ??rea
                            </p>
                            <InputWithLabel
                                value={data?.title}
                                onBlur={onBlur}
                                onChange={onChange}
                                name="title"
                                type="text"
                                cssStyle="form-control mb-0"
                                placeholder="Ingresa t??tulo"
                            />
                        </div>
                        <div className="col-12 col-sm-6">
                            <p className="AdminEdit__form__label">
                                Imagen ??rea
                            </p>
                            <InputFile
                                value={data?.imgURL}
                                onChange={onFileSelected}
                                id="fileButton"
                                name="picpath"
                                type="file"
                            />
                            {imageSuccess && <span className="AdminEdit__message mt-1">{imageSuccess}</span>}
                        </div>
                        <div className="col-12">
                            <p className="AdminEdit__form__label">
                                Descripci??n ??rea
                            </p>
                            <Editor
                                initialValue={data?.desc}
                                onChange={handleDesc}
                                apiKey={process.env.REACT_APP_API_TINY_CLOUD}
                                init={{
                                    height: 220,
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
                            <Button cssStyle="leti-btn AdminEdit__form-leti-btn" >A??adir ??rea</Button>
                            {message && <span className="AdminEdit__message">{message}</span>}
                        </div>

                    </div>
                    {registerError && <div className="alert alert-danger">{registerError}</div>}
                </form>
            </section>
        </>
    )
}

export default EditCarrouselTA
