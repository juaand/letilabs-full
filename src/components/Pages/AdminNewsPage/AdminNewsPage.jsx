import React, {useState, useEffect} from 'react'
import {Helmet} from 'react-helmet'
import {keyframes} from "@emotion/react"
import {Reveal} from "react-awesome-reveal"
import {Editor} from '@tinymce/tinymce-react'

import './AdminNewsPage.css'
import {addOutstandingNews, getNews, addNewsApi, getTags} from '../../../services/ApiClient'
import {useFormState} from '../../../hooks/useFormState'
import {app} from '../../../services/firebase'
import ShowEditModal from './ShowEditModal/ShowEditModal'
import Loader from '../../Loader/Loader'
import InputWithLabel from '../../Form/InputWithLabel/InputWithLabel'
import InputFile from '../../Form/InputFile/InputFile'
import Button from '../../Form/FormButton/FormButton'
import CheckBoxWithLabel from '../../Form/CheckBoxWithLabel/CheckBoxWithLabel'

function AdminNewsPage() {

    const {state, onBlur, onChange} = useFormState(
        {
            data: {
                title: "",
                subTitle: "",
                urlToPic: "",
                tag: [],
                content: "",
                outstanding: false,
                publishDate: new Date(),
            },
            error: {
                title: true,
                subTitle: true,
                urlToPic: true,
                tag: true,
                content: true,
            },
            touch: {},
        },
        {
            title: v => v.length,
            subTitle: v => v.length,
            urlToPic: v => v.length,
            tag: v => v.length,
            content: v => v.length,
        }
    )

    const {data, error, touch} = state
    const [registerError, setRegisterError] = useState(null)
    const [search, setSearch] = useState('')
    const [newsData, setNewsData] = useState([])
    const [message, setMessage] = useState('')
    const [bool, setBool] = useState(false)
    const [editNews, setEditNews] = useState('')
    const [createNews, setCreateNews] = useState(false)
    const [newsMessage, setNewsMessage] = useState('')
    const [filter, setFilter] = useState([])
    const [loading, setLoading] = useState(true)
    const [allTagsData, setAllTagsData] = useState([])
    const [imageSuccess, setImageSuccess] = useState('')
    const [isDisabled, setIsDisabled] = useState(false)

    const createNewNews = async (event) => {
        event.preventDefault()

        try {
            setNewsMessage('Subiendo noticia...')
            const newNews = await addNewsApi(data)
            document.querySelector('form').reset()
            setNewsData(newNews)
            setMessage('Noticia publicada con éxito')
            setCreateNews(!createNews)
            setTimeout(() => {
                setMessage('')
            }, 2000)
        } catch (err) {
            setRegisterError(err.response?.data?.message)
        }
    }


    const customAnimation = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0rem, -5rem, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }`

    const handleChange = (e) => {
        setSearch(e.target.value)
    }

    const filteredNews = newsData.filter(el => {
        return (
            el.title.toLowerCase().indexOf(search.toLocaleLowerCase()) > -1 || el.tag.map(tag => tag.toLowerCase().indexOf(search.toLocaleLowerCase()) > -1).includes(true)
        )
    })

    const outstandingNews = async (e, id) => {
        if (newsData.filter(el => el?.outstanding === true).length >= 1 && e.target.checked === true) {
            setMessage('Sólo puede mostrar una noticia destacada: deseleccione la noticia destacada actual para poder publicar una nueva')
        } else {
            setMessage('')
            const res = await addOutstandingNews(e.target.checked, id)
            setNewsData(res)
        }
    }

    const showModal = (info) => {
        setBool(!bool)
        setEditNews(info)
    }

    const hideModal = () => {
        setBool(!bool)
    }

    const updateData = (data) => {
        setBool(!bool)
        setNewsData(data)
    }

    const showAddNewForm = () => {
        setCreateNews(!createNews)
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
                //console.log('Uploaded')
            })
            .catch(err => {console.log(err)})

        // Get file url
        const fileUrl = await filePath.getDownloadURL()
        data.urlToPic = fileUrl
        error.urlToPic = false
        setImageSuccess("Imagen subida correctamente")
        setIsDisabled(false)
    }

    const handleContent = (e) => {
        data.content = e.target.getContent()
        error.content = false
    }

    const carouselHomeProducts = async (e) => {
        e.target.checked ?
            setNewsData(newsData.filter(el => el?.outstanding === true))
            :
            setNewsData(filter)
    }

    const setTag = (e) => {
        error.tag = false
        if (!data.tag.includes(e.target.value)) {
            data.tag.push(e.target.value)
        } else {
            data.tag = (data.tag.filter(el => el !== e.target.value))
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const allNews = await getNews()
            const allTags = await getTags()
            setNewsData(allNews)
            setFilter(allNews)
            setAllTagsData(allTags)
            setLoading(false)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <>
            {loading && <Loader />}
            {isDisabled && <Loader message="Cargando imagen..." />}
            {bool && <ShowEditModal news={editNews} hideModal={hideModal} updateData={(data) => updateData(data)} />}
            <Helmet>
                <title>Grupo Leti | Administrador Productos</title>
            </Helmet>
            <main className="container-fluid AdminNewsPage">
                {message && <div className="alert alert-danger" role="alert">{message}</div>}
                <div className="row">
                    <div className="col-12 AdminNewsPage__bg">
                        <div className="container">
                            <input type="text" className="form-control AdminNewsPage__search" placeholder="Filtrar por título o etiqueta." onChange={handleChange} value={search} />
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <button className="AdminNewsPage__add" onClick={showAddNewForm}>Añadir nueva noticia</button>
                                </div>
                            </div>
                            {filteredNews.length > 0 &&
                                <div className="row">
                                    <div className="col-12 AdminNewsPage__shownews">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"
                                                onChange={carouselHomeProducts} />
                                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                                Mostrar sólo la noticia destacada
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            }
                            {!filteredNews.length &&
                                <div className="row">
                                    <div className="col-12">
                                        <h1 className="mb-5">El producto que busca no se encuentra.</h1>
                                    </div>
                                </div>
                            }
                            {createNews &&
                                <Reveal triggerOnce keyframes={customAnimation} duration={600} className="row">
                                    <>
                                        <div className={`col-12 AdminNewsPage__create ${createNews && 'show'}`}>
                                            <div className="AdminNewsPage__close" onClick={() => setCreateNews(!createNews)} />
                                            <h1>Nueva noticia</h1>
                                            {newsMessage && <div className="product-message">{newsMessage}</div>
                                            }
                                            {!newsMessage &&
                                                <>
                                                    <small>* Todos los campos son obligatorios</small>
                                                    <form className="AdminEdit__form" onSubmit={createNewNews}>
                                                        <div className="row">
                                                            <div className="col-12 col-sm-4">
                                                                <InputFile
                                                                    label="Imagen noticia"
                                                                    value={data.urlToPic}
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
                                                                    value={data.title}
                                                                    onBlur={onBlur}
                                                                    onChange={onChange}
                                                                    name="title"
                                                                    type="text"
                                                                    placeholder="Ingresa título de la noticia"
                                                                    cssStyle={`form-control ${touch.title && error.title ? "is-invalid" : ""}`}
                                                                />
                                                            </div>
                                                            <div className="col-12 col-sm-4">
                                                                <InputWithLabel
                                                                    label="Subtítulo"
                                                                    value={data.subTitle}
                                                                    onBlur={onBlur}
                                                                    onChange={onChange}
                                                                    name="subTitle"
                                                                    type="text"
                                                                    cssStyle={`form-control ${touch.subTitle && error.subTitle ? "is-invalid" : ""}`}
                                                                    placeholder="Ingresa subtítulo de la noticia"
                                                                />
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-12">
                                                                    <CheckBoxWithLabel
                                                                        data={allTagsData?.map(el => el.tag)}
                                                                        name="themes"
                                                                        label="Etiquetas"
                                                                        tabIndex="2"
                                                                        onChange={setTag} />
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col">
                                                                    <p className="label">Contenido</p>
                                                                    <Editor
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
                                                            <div className="col-12 mt-5">
                                                                <Button type="submit" cssStyle={`leti-btn ${isDisabled && "disabled"}`}>Publicar noticia</Button>
                                                            </div>
                                                        </div>

                                                        {registerError && <div className="alert alert-danger">{registerError}</div>}
                                                    </form>
                                                </>
                                            }
                                        </div>
                                    </>
                                </Reveal>
                            }
                            <div className="row">
                                {filteredNews.map(el =>
                                    <div className="col-sm-4 col-12">
                                        <div className="card AdminNewsPage__card">
                                            <div className="card-body card-body-img">
                                                <img src={el?.urlToPic} className="AdminNewsPage__img-top" alt={el?.title} />
                                                <p className="AdminNewsPage__img-title" dangerouslySetInnerHTML={{__html: el?.title}} />
                                                <div className="AdminNewsPage__img-alltags">
                                                    {el?.tag.map(tag => <span className="AdminNewsPage__img-tag" dangerouslySetInnerHTML={{__html: tag}} />)}
                                                </div>
                                            </div>
                                            <ul className="list-group list-group-flush">
                                                <li className="list-group-item AdminNewsPage__check">
                                                    <div className="form-check">
                                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked={el.outstanding} onChange={(e) => outstandingNews(e, el.id)} />
                                                        <label className="form-check-label" htmlFor="flexCheckChecked">
                                                            Seleccionar como noticia destacada.
                                                        </label>
                                                    </div>
                                                </li>

                                            </ul>
                                            <div className="card-footer">
                                                <div onClick={() => showModal(el)} className="leti-btn">Editar noticia</div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default AdminNewsPage


