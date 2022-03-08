import React, {useState, useEffect} from 'react'
import {Editor} from '@tinymce/tinymce-react'

import {deleteNews, updateNews, getTags} from '../../../../services/ApiClient'
import {useFormState} from '../../../../hooks/useFormState'
import {app} from '../../../../services/firebase'

import InputWithLabel from '../../../Form/InputWithLabel/InputWithLabel'
import InputFile from '../../../Form/InputFile/InputFile'
import Button from '../../../Form/FormButton/FormButton'
import Loader from '../../../Loader/Loader'

import './ShowEditModal.css'

function ShowEditModal({news, hideModal, updateData}) {

    const [registerError, setRegisterError] = useState(null)
    const [isDisabled, setIsDisabled] = useState(false)

    const [imageSuccess, setImageSuccess] = useState('')
    const [message, setMessage] = useState('')

    const [tagsData, setTagsData] = useState([])

    const {state, onChange} = useFormState(
        {
            data: {
                title: news.title,
                subTitle: news.subTitle,
                urlToPic: news.urlToPic,
                tag: news.tag,
                content: news.content,
                outstanding: news.outstanding,
                publishDate: news.publishDate,
            },
            error: {
                title: true,
                subTitle: true,
                urlToPic: true,
                tag: true,
                content: true,
                outstanding: true,
                publishDate: true,
            },
            touch: {},
        },
        {
            title: v => v.length,
            subTitle: v => v.length,
            urlToPic: v => v.length,
            tag: v => v.length,
            content: v => v.length,
            outstanding: v => v.length,
            publishDate: v => v.length,
        }
    )

    const {data, error} = state

    const handleContent = (e) => {
        data.content = e.target.getContent()
        error.content = false
    }

    const updateThisNews = async (event) => {
        event.preventDefault()
        data.id = news.id

        if (Object.values(error).map(el => el).includes(false)) {
            try {
                if (error.tag === false) {
                    const setTags = data.tag.split(',')
                    data.tag = setTags
                }
                await updateNews(data)
                    .then(info => {
                        updateData(info)
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

    const deleteSelectedNews = async (id) => {
        const updateDeletedNews = await deleteNews(id)
        updateData(updateDeletedNews)
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
                // console.log('Uploaded')
            })
            .catch(err => {console.log(err)})

        // Get file url
        const fileUrl = await filePath.getDownloadURL()
        data.urlToPic = fileUrl
        setImageSuccess("Imagen subida correctamente")
        setIsDisabled(false)
        error.urlToPic = false
    }

    useEffect(() => {
        const fetchData = async () => {
            const getTagsData = await getTags()
            setTagsData(getTagsData)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <>
            {isDisabled && <Loader message="Cargando imagen..." />}
            <main className="modal ShowEditModal">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 ShowEditModal__container">
                            <>
                                <span className="ShowEditModal__close" onClick={hideModal}></span>
                                <form className="AdminEdit__form" onSubmit={updateThisNews}>
                                    <div className="row">
                                        <div className="col-sm-12 ShowEditModal__thumbnail">
                                            <div className="ShowEditModal__thumbnail-img" style={{
                                                background: `url(${data?.urlToPic}) no-repeat center center / cover`,
                                            }}></div>
                                            <h1 className="DeleteItemModal__ask">Editar noticia <span className="ShowEditModal__news-title">{news.title}</span></h1>
                                        </div>
                                        <div className="col-12 col-sm-4">
                                            <InputFile
                                                label="Imagen noticia"
                                                value={data?.urlToPic}
                                                onChange={onFileSelected}
                                                id="fileButton"
                                                name="urlToPic"
                                                type="file"
                                            />
                                            {imageSuccess && <small className="img-success">{imageSuccess}</small>}
                                        </div>
                                        <div className="col-12 col-sm-4">
                                            <InputWithLabel
                                                label="Título"
                                                value={data?.title}
                                                onChange={onChange}
                                                name="title"
                                                type="text"
                                                cssStyle="form-control"
                                                placeholder="Ingresa el título de la noticia"
                                            />
                                        </div>
                                        <div className="col-12 col-sm-4">
                                            <InputWithLabel
                                                label="Subtítulo"
                                                value={data?.subTitle}
                                                onChange={onChange}
                                                name="subTitle"
                                                type="text"
                                                cssStyle="form-control"
                                                placeholder="Ingresa el subtítulo de la noticia"
                                            />
                                        </div>
                                        <div className="col-12">
                                            <InputWithLabel
                                                label={`Etiquetas:  ${tagsData?.map(el => el.tag).join(', ')} (separadas por coma)`}
                                                value={data?.tag}
                                                onChange={onChange}
                                                name="tag"
                                                type="text"
                                                cssStyle="form-control"
                                                placeholder="Ingresa el subtítulo de la noticia"
                                            />
                                        </div>
                                        <div className="row">
                                            <div className="col-12">
                                                <p className="label"><strong>Contenido de la noticia</strong></p>
                                                <Editor
                                                    initialValue={data?.content}
                                                    onChange={handleContent}
                                                    apiKey={process.env.REACT_APP_API_TINY_CLOUD}
                                                    init={{
                                                        placeholder: "Ingresa texto de la noticia",
                                                        height: 500,
                                                        menubar: false,
                                                        plugins: [
                                                            'advlist autolink lists link image charmap print preview anchor',
                                                            'searchreplace visualblocks code fullscreen',
                                                            'insertdatetime media table paste code help wordcount'
                                                        ],
                                                        toolbar: 'undo redo | formatselect | ' +
                                                            'bold italic | alignleft aligncenter ' +
                                                            'alignright alignjustify | bullist numlist outdent indent | ' +
                                                            'table image | help',
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-6 mt-5">
                                            <Button type="submit" cssStyle={`leti-btn ${isDisabled && 'disabled'}`}>Guardar cambios</Button>
                                            {message && <span className="AdminEdit__message">{message}</span>}
                                        </div>
                                        <div className="col-12 col-sm-6 mt-5 d-flex justify-content-end">
                                            <div onClick={() => deleteSelectedNews(news?.id)} className="leti-btn delete">Eliminar noticia</div>
                                        </div>
                                    </div>
                                    {registerError && <div className="alert alert-danger">{registerError}</div>}
                                </form>
                            </>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default ShowEditModal
