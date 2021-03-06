import React, {useState, useEffect} from 'react'


import {getCarouselTech, updateCarouselTitleTech, createTechCarousel, createContent} from '../../../../../services/ApiClient'
import InputWithLabel from '../../../../Form/InputWithLabel/InputWithLabel'
import {useFormState} from '../../../../../hooks/useFormState'
import InputFile from '../../../../Form/InputFile/InputFile'
import Button from '../../../../Form/FormButton/FormButton'
import EditItemModal from './EditItemModal/EditItemModal'
import {app} from '../../../../../services/firebase'
import Loader from '../../../../Loader/Loader'
import {Editor} from '@tinymce/tinymce-react'

function EditCarrouselTech() {

    const [ourGoalsOCData, setOurGoalsOCData] = useState([])
    const [newItemMessage, setNewItemMessage] = useState('')
    const [imageSuccess, setImageSuccess] = useState('')
    const [isDisabled, setIsDisabled] = useState(false)
    const [modalData, setModalData] = useState([])
    const [message, setMessage] = useState('')
    const [bool, setBool] = useState(false)

    const {state, onChange} = useFormState(
        {
            data: {
                id: '',
                mainTitle: ourGoalsOCData[0]?.mainTitle,
                title: '',
                imgURL: '',
                description: ''
            },
            error: {
                mainTitle: true,
                title: true,
                imgURL: true,
                description: true,
            },
            touch: {},
        },
        {
            mainTitle: v => v.length,
            title: v => v.length,
            imgURL: v => v.length,
            description: v => v.length,
        }
    )

    const {data, error} = state
    const [registerError, setRegisterError] = useState(null)

    const showModal = (data) => {
        setModalData(data)
        setBool(!bool)
    }

    const deleteItem = (data) => {
        setOurGoalsOCData(data)
        setBool(!bool)
    }

    const hideModal = (data) => {
        setOurGoalsOCData(data)
        setBool(!bool)
    }

    const contentData = {
        content: '',
        url: '/tecnologia',
        name: 'Tecnolog??a',
        type: '',
    }

    const addItem = async (event) => {
        event.preventDefault()
        data.mainTitle = ourGoalsOCData[0]?.mainTitle

        if (contentData?.content?.length > 0) {
            contentData.type = `Tecnolog??a ${data?.title}`
            createContent(contentData)
        }

        if (error.title === false && error.description === false && error.imgURL === false) {
            if (data.description.length < 37) {
                setMessage('La descripci??n debe tener al menos 30 caracteres')
            } else {
                try {
                    await createTechCarousel(data)
                        .then(info => {
                            setOurGoalsOCData(info)
                            setMessage('Elemento creado exitosamente')
                        })
                        .catch(error => {
                            setRegisterError(error)
                        })
                } catch (err) {
                    setRegisterError(err.response?.data?.message)
                }
            }
        } else {
            setMessage('Por favor rellene todos los campos')
        }
    }

    const handleDescription = (e) => {
        data.description = e.target.getContent()
        contentData.content = e.target.getContent({format: "text"})
        error.description = false
    }

    const updateInfo = async (event) => {
        event.preventDefault()

        if (error.mainTitle === false) {
            try {
                await updateCarouselTitleTech(data)
                    .then(info => {
                        setOurGoalsOCData(info)
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

    const onFileSelected = async (e) => {
        setMessage('')
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
            const getOurGoalsOCData = await getCarouselTech()
            setOurGoalsOCData(getOurGoalsOCData)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {isDisabled && <Loader message="Cargando imagen..." />}
            {bool && <EditItemModal hideModal={(data) => hideModal(data)} infodata={modalData} deleteItem={(updateData) => deleteItem(updateData)} closeModal={() => setBool(!bool)} />}
            {ourGoalsOCData?.length > 0 &&
                <section className="container-fluid EditContent EditContent-timeline pt-0 mb-0">
                    <form className="AdminEdit__form" onSubmit={updateInfo}>
                        <div className="row">
                            <h3 className="mt-5">Editar t??tulo carrusel</h3>
                            <div className="col-12">
                                <InputWithLabel
                                    value={data.mainTitle}
                                    label="T??tulo carrusel"
                                    onChange={onChange}
                                    name="mainTitle"
                                    type="text"
                                    cssStyle="form-control mb-5"
                                    placeholder={ourGoalsOCData[0]?.mainTitle}
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
                    <h2>Editar Carousel</h2>
                    <div className="row justify-content-around">
                        <h3 className="mb-5">Editar elementos del carrusel</h3>
                        {ourGoalsOCData?.map(el =>
                            <div className="col-1 EditCarousel__edit logros" onClick={() => showModal(el)}>
                                <img src={el?.imgURL} onError="this.src = 'https://firebasestorage.googleapis.com/v0/b/grupoleti.appspot.com/o/images%2Fno-image.png?alt=media&token=6e518b16-dc11-46e3-83e8-ae4b84a18293';" alt={el?.name} />
                                <h4 className="mt-5">{el?.title}</h4>
                            </div>
                        )}
                    </div>
                    <hr className="mt-5 mb-5" />
                    <form className="AdminEdit__form" onSubmit={addItem}>
                        <div className="row">
                            <h3 className="mt-0">A??adir elemento al carrusel</h3>
                            <div className="col-sm-6 col-12">
                                <p className="AdminEdit__form__label">
                                    Seleccionar imagen
                                </p>
                                <InputFile
                                    value={data?.imgURL}
                                    onChange={onFileSelected}
                                    id="fileButton"
                                    name="imgURL"
                                    type="file"
                                    placeholder="A??adir imagen"
                                    classStyle="mb-0"
                                />
                                {imageSuccess && <span className="AdminEdit__message mt-1">{imageSuccess}</span>}
                                <p className="AdminEdit__form__label mt-5">
                                    T??tulo
                                </p>
                                <InputWithLabel
                                    value={data.title}
                                    onChange={onChange}
                                    name="title"
                                    type="text"
                                    cssStyle="form-control"
                                    placeholder="A??adir t??tulo"
                                />
                            </div>
                            <div className="col-sm-6 col-12">
                                <p className="AdminEdit__form__label">
                                    Descripci??n
                                </p>
                                <Editor
                                    initialValue=""
                                    onChange={handleDescription}
                                    apiKey={process.env.REACT_APP_API_TINY_CLOUD}
                                    init={{
                                        height: 180,
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
                                <Button type="submit" cssStyle="leti-btn">Crear elemento</Button>
                                {message && <span className="AdminEdit__message ">{message}</span>}
                            </div>
                        </div>
                    </form>
                </section>
            }
        </>
    )
}

export default EditCarrouselTech
