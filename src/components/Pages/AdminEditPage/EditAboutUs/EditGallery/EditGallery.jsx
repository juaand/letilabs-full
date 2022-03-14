
import React, {useState, useEffect} from 'react'
import {Editor} from '@tinymce/tinymce-react'

import {getGallery, addGalleryData, updateGalleryTitle, createContent} from '../../../../../services/ApiClient'
import InputWithLabel from '../../../../Form/InputWithLabel/InputWithLabel'
import EditElementsModal from './EditElementsModal/EditElementsModal'
import {useFormState} from '../../../../../hooks/useFormState'
import InputFile from '../../../../Form/InputFile/InputFile'
import Button from '../../../../Form/FormButton/FormButton'
import {app} from '../../../../../services/firebase'
import Loader from '../../../../Loader/Loader'

function EditGallery() {

    const {state, onBlur, onChange} = useFormState(
        {
            data: {
                mainTitle: '',
                desc: '',
                title: '',
                imgPath: '',
            },
            error: {
                mainTitle: true,
                desc: true,
                title: true,
                imgPath: true,
            },
            touch: {},
        },
        {
            mainTitle: v => v.length,
            desc: v => v.length,
            title: v => v.length,
            imgPath: v => v.length,
        }
    )

    const {data, error} = state

    const [registerError, setRegisterError] = useState(null)
    const [imageSuccess, setImageSuccess] = useState('')
    const [isDisabled, setIsDisabled] = useState(false)
    const [galleryData, setGalleryData] = useState([])
    const [modalData, setModalData] = useState([])
    const [titleMessage, setTitleMessage] = useState('')
    const [message, setMessage] = useState('')
    const [bool, setBool] = useState(false)

    const showModal = (data) => {
        setModalData(data)
        setBool(!bool)
    }

    const contentData = {
        content: '',
        url: '/sobre-nosotros',
        name: 'Sobre Nosotros',
        type: '',
    }

    const addGalleryItem = async (event) => {
        event.preventDefault()
        data.mainTitle = galleryData[0]?.mainTitle

        if (contentData?.content?.length > 0) {
            contentData.type = `Sobre nosotros - ${data?.title}`
            createContent(contentData)
        }

        if (error.title === false && error.imgPath === false && error.desc === false) {
            try {
                await addGalleryData(data)
                    .then(gallery => {
                        setGalleryData(gallery)
                        setMessage('Data actualizada exitosamente')
                    })
                    .catch(error => {
                        setRegisterError(error)
                    })
            } catch (err) {
                setRegisterError(err.response?.data?.message)
            }
        } else {
            setMessage('Por rellene todos los campos')
        }
    }

    const handleDesc = (e) => {
        data.desc = e.target.getContent()
        contentData.content = e.target.getContent({format: "text"})
        error.desc = false
    }

    const deleteItem = (data) => {
        setGalleryData(data)
        setBool(!bool)
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
        data.imgPath = fileUrl
        setIsDisabled(false)
        error.imgPath = false
    }

    const updateInfo = async (event) => {
        event.preventDefault()

        if (error.mainTitle === false) {
            try {
                await updateGalleryTitle(data)
                    .then(info => {
                        setGalleryData(info)
                        setTitleMessage('Título atualizado exitosamente')
                    })
                    .catch(error => {
                        setRegisterError(error)
                    })
            } catch (err) {
                setRegisterError(err.response?.data?.message)
            }
        } else {
            setTitleMessage('Por favor edite el título')
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const getGalleryData = await getGallery()
            setGalleryData(getGalleryData)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {isDisabled && <Loader message="Cargando imagen..." />}
            {bool && <EditElementsModal hideModal={() => setBool(!bool)} element={modalData} deleteItem={(updateData) => deleteItem(updateData)} />}
            {galleryData?.length > 0 &&
                <section className="container-fluid EditContent EditContent-timeline">
                    <h2>Editar elemento de la galería</h2>
                    <div className="row justify-content-around">
                        {galleryData?.map(el =>
                            <div className="col-sm-1 col-12 EditCarousel__edit" onClick={() => showModal(el)}>
                                <img className="EditCarousel__img" src={el.imgPath} onError="this.src = 'https://firebasestorage.googleapis.com/v0/b/grupoleti.appspot.com/o/images%2Fno-image.png?alt=media&token=6e518b16-dc11-46e3-83e8-ae4b84a18293';" alt={el.imgPath} />
                                <p>{el.title}</p>
                            </div>
                        )}
                    </div>
                </section>}
            <section className="container-fluid EditContent">
                <h2>Galería</h2>
                <form className="AdminEdit__form" onSubmit={updateInfo}>
                    <div className="row">
                        <h3 className="mt-5">Editar título galería</h3>
                        <div className="col-12">
                            <InputWithLabel
                                value={data.mainTitle}
                                label="Título galería"
                                onChange={onChange}
                                name="mainTitle"
                                type="text"
                                cssStyle="form-control mb-5"
                                placeholder={galleryData[0]?.mainTitle}
                            />
                        </div>
                        <div className="col-12 col-sm-6">
                            <Button type="submit" cssStyle="leti-btn">Editar título</Button>
                            {titleMessage && <span className="AdminEdit__message ">{titleMessage}</span>}
                        </div>
                    </div>

                    <hr className="mt-5 mb-5" />

                    {registerError && <div className="alert alert-danger">{registerError}</div>}
                </form>
                <form className="AdminEdit__form" onSubmit={addGalleryItem}>
                    <div className="row">
                        <h3>Añadir nuevo elemento a la galería</h3>
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
                                cssStyle="form-control mb-0"
                                placeholder="Ingresa descripción del producto"
                            />
                        </div>
                        <div className="col-12 col-sm-6">
                            <p className="AdminEdit__form__label">
                                Imagen
                            </p>
                            <InputFile
                                value={data?.imgPath}
                                onChange={onFileSelected}
                                id="fileButton"
                                name="picpath"
                                type="file"
                            />
                            {imageSuccess && <span className="AdminEdit__message mt-1">{imageSuccess}</span>}
                        </div>
                        <div className="col-12">
                            <p className="AdminEdit__form__label">
                                Descripción
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
                            <Button cssStyle="leti-btn AdminEdit__form-leti-btn" >Añadir nuevo producto</Button>
                            {message && <span className="AdminEdit__message">{message}</span>}
                        </div>

                    </div>
                    {registerError && <div className="alert alert-danger">{registerError}</div>}
                </form>
            </section>
        </>
    )
}

export default EditGallery
