import './AdminProductPage.css'
import React, {useState, useEffect} from 'react'
import {Helmet} from 'react-helmet'
import {addHomeScreen, getVadevecumData} from '../../../services/ApiClient'
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
                lastname: "",
                work: "",
                years: "",
                speciality: "",
                info: "",
                license: "",
                mail: "",
            },
            error: {
                name: true,
                lastname: true,
                work: true,
                years: true,
                speciality: true,
                license: true,
                info: true,
                mail: true,
            },
            touch: {},
        },
        {
            name: v => v.length,
            lastname: v => v.length,
            work: v => v.length,
            years: v => v.length,
            speciality: v => v.length,
            info: v => v.length,
            license: v => v.length,
            mail: v => v.length,
        }
    )

    const {data, error, touch} = state
    const [registerError, setRegisterError] = useState(null)

    const createNewProduct = async (event) => {
        event.preventDefault()

        try {
            console.log(data)
            // const newVigilancia = await vigilanciaForm(data)
            // document.querySelector('form').reset()
            // document.querySelector('.QuestionModal__container').classList.add('QuestionModal__container--success')
            // setFormResponse(newVigilancia)
            // setMessage(!message)
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

    const [search, setSearch] = useState('')
    const [products, setProducts] = useState([])
    const [message, setMessage] = useState('')
    const [bool, setBool] = useState(false)
    const [editProduct, setEditProduct] = useState('')
    const [createProduct, setCreateProduct] = useState(false)

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
                console.log('Uploaded')
            })
            .catch(err => {console.log(err)})

        // Get file url
        const fileUrl = await filePath.getDownloadURL()
        data[e.target.name] = fileUrl
    }

    const handleComposition = (e) => {
        data.composition = e.target.getContent()
    }

    const handleActivePrinciple = (e) => {
        data.active_principle = e.target.getContent()
    }

    const handlePosology = (e) => {
        data.posology = e.target.getContent()
    }

    const handlePresentation = (e) => {
        data.presentation = e.target.getContent()
    }

    useEffect(() => {
        const fetchData = async () => {
            const allProducts = await getVadevecumData()
            setProducts(allProducts)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <>
            {!filteredProducts.length && <Loader />}
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
                            {createProduct &&
                                <Reveal triggerOnce keyframes={customAnimation} duration={600} className="row">
                                    <>
                                        <div className={`col-12 AdminProductPage__create ${createProduct && 'show'}`}>
                                            <h1>Crear producto</h1>
                                            <form className="AdminEdit__form" onSubmit={createNewProduct}>
                                                <div className="row">
                                                    <div className="col-12 col-sm-4">
                                                        <InputWithLabel
                                                            label="Nombre"
                                                            value={data?.name}
                                                            onChange={onChange}
                                                            name="name"
                                                            type="text"
                                                            placeholder="Ingresa nombre del producto"
                                                            className="form-control"
                                                        />
                                                    </div>
                                                    <div className="col-12 col-sm-4">
                                                        <InputWithLabel
                                                            label="Línea"
                                                            value={data?.line}
                                                            onChange={onChange}
                                                            name="line"
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Ingresa línea del producto"
                                                        />
                                                    </div>
                                                    <div className="col-12 col-sm-4">
                                                        <InputWithLabel
                                                            label="Registro sanitario"
                                                            value={data?.health_register}
                                                            onChange={onChange}
                                                            name="health_register"
                                                            type="text"
                                                            className="form-control"
                                                            placeholder="Registro sanitario"
                                                        />
                                                    </div>
                                                    <div className="col-12 col-sm-6">
                                                        <InputFile
                                                            label="Imagen producto"
                                                            value={data?.picPath}
                                                            onChange={onFileSelected}
                                                            id="fileButton"
                                                            name="picPath"
                                                            type="file"
                                                        />
                                                    </div>
                                                    <div className="col-12 col-sm-6">
                                                        <InputFile
                                                            label="QR producto"
                                                            value={data?.QRpath}
                                                            onChange={onFileSelected}
                                                            id="fileButton"
                                                            name="QRpath"
                                                            type="file"
                                                        />
                                                    </div>
                                                    <div className="col-12 col-sm-3">
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
                                                    <div className="col-12 col-sm-3">
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
                                                    <div className="col-12 col-sm-3">
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
                                                    <div className="col-12 col-sm-3">
                                                        <p className="label">Presentación</p>
                                                        <Editor
                                                            initialValue={data?.presentation}
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
                                                    <div className="col-12 mt-5">
                                                        <Button type="submit" className="leti-btn">Crear producto</Button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </>
                                </Reveal>
                            }
                            <div className="row">
                                {filteredProducts.map(el =>
                                    <div className="col-sm-4 col-12">
                                        <div className="card AdminProductPage__card">
                                            <div className="card-body">
                                                <img src={el?.picPath} className="AdminProductPage__img-top" alt={el?.name} />
                                                <img src={el?.QRpath} className="AdminProductPage__img-bottom" alt={el?.name} />
                                            </div>
                                            <div className="card-body">
                                                <h5 dangerouslySetInnerHTML={{__html: el?.line}}>
                                                </h5>
                                                <p className="card-text" dangerouslySetInnerHTML={{__html: el?.name}} />
                                            </div>
                                            <ul className="list-group list-group-flush">
                                                <li className="list-group-item AdminProductPage__check"><div className="form-check">
                                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked={el.show_in_home} onChange={(e) => showAtHome(e, el._id)} />
                                                    <label className="form-check-label" for="flexCheckChecked">
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
                                                    </>}
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


