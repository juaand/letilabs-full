import './AdminProductPage.css'
import React, {useState, useEffect} from 'react'
import {Helmet} from 'react-helmet'
import {addHomeScreen, getVadevecumData, addProductApi} from '../../../services/ApiClient'
import ShowEditModal from './ShowEditModal/ShowEditModal'
import Loader from '../../Loader/Loader'
import {Reveal} from "react-awesome-reveal"
import {keyframes} from "@emotion/react"
import {useFormState} from '../../../hooks/useFormState'
import InputWithLabel from '../../Form/InputWithLabel/InputWithLabel'
import InputFile from '../../Form/InputFile/InputFile'
import {Editor} from '@tinymce/tinymce-react'
import {app} from '../../../services/firebase'
import Button from '../../Form/FormButton/FormButton'

function AdminProductPage() {

    const {state, onBlur, onChange} = useFormState(
        {
            data: {
                name: "",
                line: "",
                health_register: "",
                picPath: "",
                QRpath: "",
                active_principle: "",
                posology: "",
                presentation: "",
                composition: "",
                indication: "",
            },
            error: {
                name: true,
                line: true,
                health_register: true,
                picPath: true,
                QRpath: true,
                posology: true,
                active_principle: true,
                presentation: true,
                composition: true,
                indication: true,
            },
            touch: {},
        },
        {
            name: v => v.length,
            line: v => v.length,
            health_register: v => v.length,
            picPath: v => v.length,
            QRpath: v => v.length,
            active_principle: v => v.length,
            posology: v => v.length,
            presentation: v => v.length,
            composition: v => v.length,
            indication: v => v.length,
        }
    )

    const {data, error, touch} = state
    const [registerError, setRegisterError] = useState(null)
    const [search, setSearch] = useState('')
    const [products, setProducts] = useState([])
    const [message, setMessage] = useState('')
    const [bool, setBool] = useState(false)
    const [editProduct, setEditProduct] = useState('')
    const [createProduct, setCreateProduct] = useState(false)
    const [productMessage, setProductMessage] = useState('')
    const [filter, setFilter] = useState([])
    const [loading, setLoading] = useState(true)

    const createNewProduct = async (event) => {
        event.preventDefault()

        try {
            setProductMessage('Cargando producto...')
            const newProduct = await addProductApi(data)
            document.querySelector('form').reset()
            setProducts(newProduct)
            setMessage('Producto creado con éxito')
            setCreateProduct(!createProduct)
            setTimeout(() => {
                setMessage('')
            }, 2000)
        } catch (err) {
            setRegisterError(err.response?.data?.message)
        }
    }

    const isError = Object.values(error).some(err => err)

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

    const filteredProducts = products.filter(el => {
        return (
            el.name.toLowerCase().indexOf(search.toLocaleLowerCase()) > -1
        )
    })

    const showAtHome = async (e, id) => {
        if (products.filter(el => el?.show_in_home === true).length >= 18 && e.target.checked === true) {
            setMessage('Ya se han alcanzado el máximo de productos para mostrar en la página principal. Por favor, desmarque alguno para continuar.')
        } else {
            setMessage('')
            const res = await addHomeScreen(e.target.checked, id)
            setProducts(res)
        }
    }

    const showModal = (product) => {
        setBool(!bool)
        setEditProduct(product)
    }

    const hideModal = () => {
        setBool(!bool)
    }

    const updateData = (data) => {
        setBool(!bool)
        setProducts(data)
    }

    const showAddNewForm = () => {
        setCreateProduct(!createProduct)
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
                //console.log('Uploaded')
            })
            .catch(err => {console.log(err)})

        // Get file url
        const fileUrl = await filePath.getDownloadURL()
        data[e.target.name] = fileUrl
        error[e.target.name] = false
    }

    const handleComposition = (e) => {
        data.composition = e.target.getContent()
        error.composition = false
    }

    const handleActivePrinciple = (e) => {
        data.active_principle = e.target.getContent()
        error.active_principle = false
    }

    const handlePosology = (e) => {
        data.posology = e.target.getContent()
        error.posology = false
    }

    const handlePresentation = (e) => {
        data.presentation = e.target.getContent()
        error.presentation = false
    }

    const handleIndication = (e) => {
        data.indication = e.target.getContent()
        error.indication = false
    }

    const carouselHomeProducts = async (e) => {
        e.target.checked ?
            setProducts(products.filter(el => el?.show_in_home === true))
            :
            setProducts(filter)
    }

    useEffect(() => {
        const fetchData = async () => {
            const allProducts = await getVadevecumData()
            setProducts(allProducts)
            setFilter(allProducts)
            setLoading(false)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <>
            {loading && <Loader />}
            {bool && <ShowEditModal product={editProduct} hideModal={hideModal} updateData={(data) => updateData(data)} />}
            <Helmet>
                <title>Grupo Leti | Administrador Productos</title>
            </Helmet>
            <main className="container-fluid AdminProductPage">
                {message && <div className="alert alert-danger" role="alert">{message}</div>}
                <div className="row">
                    <div className="col-12 AdminProductPage__bg">
                        <div className="container">
                            <input type="text" className="form-control AdminProductPage__search" placeholder="Filtrar por producto" onChange={handleChange} value={search} />
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <button className="AdminProductPage__add" onClick={showAddNewForm}>Añadir nuevo producto</button>
                                </div>
                            </div>
                            {filteredProducts.length > 0 &&
                                <div className="row">
                                    <div className="col-12 AdminProductPage__showproducts">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"
                                                onChange={carouselHomeProducts} />
                                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                                Mostrar sólo los productos del carrusel del home.
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            }
                            {!filteredProducts.length &&
                                <div className="row">
                                    <div className="col-12">
                                        <h1 className="mb-5">El producto que busca no se encuentra.</h1>
                                    </div>
                                </div>
                            }
                            {createProduct &&
                                <Reveal triggerOnce keyframes={customAnimation} duration={600} className="row">
                                    <>
                                        <div className={`col-12 AdminProductPage__create ${createProduct && 'show'}`}>
                                            <h1>Crear producto</h1>
                                            {productMessage && <div className="product-message">{productMessage}</div>
                                            }
                                            {!productMessage &&
                                                <>
                                                    <small>* Todos los campos son obligatorios</small>
                                                    <form className="AdminEdit__form" onSubmit={createNewProduct}>
                                                        <div className="row">
                                                            <div className="col-12 col-sm-6">
                                                                <InputFile
                                                                    label="Imagen producto"
                                                                    value={data.picPath}
                                                                    onChange={onFileSelected}
                                                                    id="fileButton"
                                                                    name="picPath"
                                                                    type="file"
                                                                />
                                                            </div>
                                                            <div className="col-12 col-sm-6">
                                                                <InputFile
                                                                    label="QR producto"
                                                                    value={data.QRpath}
                                                                    onChange={onFileSelected}
                                                                    id="fileButton"
                                                                    name="QRpath"
                                                                    type="file"
                                                                />
                                                            </div>
                                                            <div className="col-12 col-sm-4">
                                                                <InputWithLabel
                                                                    label="Nombre"
                                                                    value={data.name}
                                                                    onBlur={onBlur}
                                                                    onChange={onChange}
                                                                    name="name"
                                                                    type="text"
                                                                    placeholder="Ingresa nombre del producto"
                                                                    cssStyle={`form-control ${touch.name && error.name ? "is-invalid" : ""}`}
                                                                />
                                                            </div>
                                                            <div className="col-12 col-sm-4">
                                                                <InputWithLabel
                                                                    label="Línea"
                                                                    value={data.line}
                                                                    onBlur={onBlur}
                                                                    onChange={onChange}
                                                                    name="line"
                                                                    type="text"
                                                                    cssStyle={`form-control ${touch.line && error.line ? "is-invalid" : ""}`}
                                                                    placeholder="Ingresa línea del producto"
                                                                />
                                                            </div>
                                                            <div className="col-12 col-sm-4">
                                                                <InputWithLabel
                                                                    label="Registro sanitario"
                                                                    value={data.health_register}
                                                                    onBlur={onBlur}
                                                                    onChange={onChange}
                                                                    name="health_register"
                                                                    type="text"
                                                                    cssStyle={`form-control ${touch.health_register && error.health_register ? "is-invalid" : ""}`}
                                                                    placeholder="Registro sanitario"
                                                                />
                                                            </div>
                                                            <div className="row">
                                                                <div className="col">
                                                                    <p className="label">Composición</p>
                                                                    <Editor
                                                                        onChange={handleComposition}
                                                                        apiKey={process.env.REACT_APP_API_TINY_CLOUD}
                                                                        init={{
                                                                            placeholder: "Ingresa composición del producto",
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
                                                                <div className="col">
                                                                    <p className="label">Principio activo</p>
                                                                    <Editor
                                                                        onChange={handleActivePrinciple}
                                                                        apiKey={process.env.REACT_APP_API_TINY_CLOUD}
                                                                        init={{
                                                                            placeholder: "Ingresa principio(s) activo(s) del producto",
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
                                                                <div className="col">
                                                                    <p className="label">Posología</p>
                                                                    <Editor
                                                                        onChange={handlePosology}
                                                                        apiKey={process.env.REACT_APP_API_TINY_CLOUD}
                                                                        init={{
                                                                            placeholder: "Ingresa posología del producto",
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
                                                                <div className="col">
                                                                    <p className="label">Presentación</p>
                                                                    <Editor
                                                                        onChange={handlePresentation}
                                                                        apiKey={process.env.REACT_APP_API_TINY_CLOUD}
                                                                        init={{
                                                                            placeholder: "Ingresa presentación del producto",
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
                                                                <div className="col">
                                                                    <p className="label">Indicaciones</p>
                                                                    <Editor
                                                                        onChange={handleIndication}
                                                                        apiKey={process.env.REACT_APP_API_TINY_CLOUD}
                                                                        init={{
                                                                            placeholder: "Ingresa indicaciones del producto",
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

                                                            </div>

                                                            <div className="col-12 mt-5">
                                                                <Button type="submit" className={`leti-btn ${isError && "disabled"}`}>Crear producto</Button>
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
                                {filteredProducts.map(el =>
                                    <div className="col-sm-4 col-12">
                                        <div className="card AdminProductPage__card">
                                            <div className="card-body">
                                                <img src={el?.picPath} className="AdminProductPage__img-top" onerror="this.src = 'https://firebasestorage.googleapis.com/v0/b/grupo-leti-fd84e.appspot.com/o/images%2Fno-image.png?alt=media&token=73bf7cd8-629d-4deb-b281-9e629fbfb752';" alt={el?.name} />
                                                <img src={el?.QRpath} className="AdminProductPage__img-bottom" onerror="this.src = 'https://firebasestorage.googleapis.com/v0/b/grupo-leti-fd84e.appspot.com/o/images%2Fno-image.png?alt=media&token=73bf7cd8-629d-4deb-b281-9e629fbfb752';" alt={el?.name} />
                                            </div>
                                            <div className="card-body">
                                                <h5 dangerouslySetInnerHTML={{__html: el?.line}}>
                                                </h5>
                                                <p className="card-text" dangerouslySetInnerHTML={{__html: el?.name}} />
                                            </div>
                                            <ul className="list-group list-group-flush">
                                                <li className="list-group-item AdminProductPage__check"><div className="form-check">
                                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked={el.show_in_home} onChange={(e) => showAtHome(e, el._id)} />
                                                    <label className="form-check-label" htmlFor="flexCheckChecked">
                                                        mostrar en carrusel del home
                                                    </label>
                                                </div></li>
                                                <span className="card-title">Composición</span><li className="list-group-item" dangerouslySetInnerHTML={{__html: el?.composition}} />
                                                <span className="card-title">Principio activo</span><li className="list-group-item" dangerouslySetInnerHTML={{__html: el?.active_principle}} />
                                                <span className="card-title">Posología</span><li className="list-group-item" dangerouslySetInnerHTML={{__html: el?.posology}} />
                                                <span className="card-title">Presentación</span>
                                                <li className="list-group-item" dangerouslySetInnerHTML={{__html: el?.presentation}} />
                                                <span className="card-title">Registro sanitario</span>
                                                <li className="list-group-item" dangerouslySetInnerHTML={{__html: el?.health_register}} />
                                                {el?.trademarks &&
                                                    <>
                                                        <span className="card-title">Trademarks</span>
                                                        <li className="list-group-item" dangerouslySetInnerHTML={{__html: el?.trademarks}} />
                                                    </>
                                                }
                                                <span className="card-title">Indicaciones</span>
                                                <li className="list-group-item" dangerouslySetInnerHTML={{__html: el?.indication}} />
                                            </ul>
                                            <div className="card-footer">
                                                <div onClick={() => showModal(el)} className="leti-btn">Editar producto</div>
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

export default AdminProductPage


