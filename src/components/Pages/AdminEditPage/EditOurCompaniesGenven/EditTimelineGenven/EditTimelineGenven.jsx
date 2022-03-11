import React, {useState, useEffect} from 'react'
import {Editor} from '@tinymce/tinymce-react'

import {getTimeLineGenven, addTimeLineGenvenData, createContent} from '../../../../../services/ApiClient'
import InputWithLabel from '../../../../Form/InputWithLabel/InputWithLabel'
import {useFormState} from '../../../../../hooks/useFormState'
import InputFile from '../../../../Form/InputFile/InputFile'
import Button from '../../../../Form/FormButton/FormButton'
import EditItemModal from './EditItemModal/EditItemModal'
import {app} from '../../../../../services/firebase'
import Loader from '../../../../Loader/Loader'

function EditTimelineGenven() {

    const {state, onChange} = useFormState(
        {
            data: {
                imgURL: '',
                desc: '',
                buttonText: '',
                buttonLink: '',
            },
            error: {
                imgURL: true,
                desc: true,
                buttonText: true,
                buttonLink: true,
            },
            touch: {},
        },
        {
            imgURL: v => v.length,
            desc: v => v.length,
            buttonText: v => v.length,
            buttonLink: v => v.length,
        }
    )

    const {data, error} = state

    const [registerError, setRegisterError] = useState(null)
    const [imageSuccess, setImageSuccess] = useState('')
    const [isDisabled, setIsDisabled] = useState(false)
    const [timelineData, setTimeLineData] = useState()
    const [disabled, setDisabled] = useState(true)
    const [modalData, setModalData] = useState()
    const [message, setMessage] = useState('')
    const [bool, setBool] = useState(false)

    const showModal = (info) => {
        setModalData(info)
        setBool(!bool)
    }

    const contentData = {
        content: '',
        url: '/genven',
        name: 'Genven',
        type: '',
    }

    const addTimeLineItem = async (event) => {
        event.preventDefault()

        if (contentData?.content?.length > 0) {
            contentData.type = `Genven - ${data?.buttonText}`
            createContent(contentData)
        }

        if (error.imgURL === false && error.desc === false && error.buttonText === false && error.buttonLink === false) {
            try {
                await addTimeLineGenvenData(data)
                    .then(timeline => {
                        setTimeLineData(timeline)
                        setMessage('Elemento añadido exitósamente')
                    })
                    .catch(error => {
                        setRegisterError(error)
                    })
            } catch (err) {
                setRegisterError(err.response?.data?.message)
            }
        } else {
            setMessage('Por favor rellene todos los campos')
        }
    }

    const deleteItem = (info) => {
        setTimeLineData(info)
        setBool(!bool)
    }

    const hideModal = (info) => {
        setTimeLineData(info)
        setBool(!bool)
    }

    const handleBannerDescription = (e) => {
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
                //Se habilita el botón para subir el blog
                setDisabled(!disabled)
                setImageSuccess("Imagen cargada correctamente")
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
            const getTimeLineData = await getTimeLineGenven()
            setTimeLineData(getTimeLineData)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {isDisabled && <Loader message="Cargando imagen..." />}
            {bool && <EditItemModal hideModal={(info) => hideModal(info)} infodata={modalData} deleteItem={(updateData) => deleteItem(updateData)} closeModal={() => setBool(!bool)} />}
            {timelineData?.length > 0 &&
                <section className="container-fluid EditContent EditContent-timeline">
                    <h2>Editar elemento del timeLine</h2>
                    <div className="row justify-content-around">
                        {timelineData?.map(el =>
                            <div className="col-sm-4 col-12 EditCarousel__edit" onClick={() => showModal(el)}>
                                <img className="EditCarousel__img" src={el?.imgURL} onError="this.src = 'https://firebasestorage.googleapis.com/v0/b/grupo-leti-fd84e.appspot.com/o/images%2Fno-image.png?alt=media&token=73bf7cd8-629d-4deb-b281-9e629fbfb752';" alt={el?.imgURL} />
                                <h4 className="EditContent__boldtitle" dangerouslySetInnerHTML={{__html: el?.desc}} />
                            </div>
                        )}
                    </div>
                </section>}
            <section className="container-fluid EditContent">
                <h2>Añadir nuevo producto al timeline</h2>
                <form className="AdminEdit__form" onSubmit={addTimeLineItem}>
                    <div className="row">
                        <div className="col-12 col-sm-4">
                            <p className="AdminEdit__form__label">
                                Texto botón
                            </p>
                            <InputWithLabel
                                value={data?.buttonText}
                                onChange={onChange}
                                name="buttonText"
                                type="text"
                                cssStyle="form-control"
                                placeholder="Ingresa texto del botón"
                            />
                        </div>
                        <div className="col-12 col-sm-4">
                            <p className="AdminEdit__form__label">
                                Url botón
                            </p>
                            <InputWithLabel
                                value={data?.buttonLink}
                                onChange={onChange}
                                name="buttonLink"
                                type="text"
                                cssStyle="form-control"
                                placeholder="Ingresa url del botón"
                            />
                        </div>
                        <div className="col-12 col-sm-4">
                            <p className="AdminEdit__form__label">
                                Imagen
                            </p>
                            <InputFile
                                value={data?.imgURL}
                                onChange={onFileSelected}
                                id="fileButton"
                                name="imgURL"
                                type="file"
                                placeholder={data?.imgURL}
                            />
                            {imageSuccess && <span className="AdminEdit__message mt-1">{imageSuccess}</span>}
                        </div>
                        <div className="col-12">
                            <p className="AdminEdit__form__label">
                                Descripción
                            </p>
                            <Editor
                                initialValue={data?.desc}
                                onChange={handleBannerDescription}
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
                            <Button cssStyle="leti-btn AdminEdit__form-leti-btn" >Añadir nuevo timeline</Button>
                            {message && <span className="AdminEdit__message">{message}</span>}
                        </div>

                    </div>
                    {registerError && <div className="alert alert-danger">{registerError}</div>}
                </form>
            </section>
        </>
    )
}

export default EditTimelineGenven
