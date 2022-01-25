import './AdminProductPage.css'
import React, {useState, useEffect} from 'react'
import {Helmet} from 'react-helmet'
import {addHomeScreen, getVadevecumData} from '../../../services/ApiClient'
import ShowEditModal from './ShowEditModal/ShowEditModal'

function AdminProductPage() {

    const [search, setSearch] = useState('')
    const [products, setProducts] = useState([])
    const [message, setMessage] = useState('')
    const [bool, setBool] = useState(false)
    const [editProduct, setEditProduct] = useState({})

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

    const hideModal = (data) => {
        setBool(!bool)

        if (data) {
            setProducts(data)
        }
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
            {bool && <ShowEditModal product={editProduct} hideModal={(data) => hideModal(data)} />}
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
                                                <p className="card-text">{el?.name}</p>
                                            </div>
                                            <ul className="list-group list-group-flush">
                                                <li className="list-group-item"><div className="form-check">
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
                                                <span className="card-title">Trademarks</span>
                                                <li className="list-group-item" dangerouslySetInnerHTML={{__html: el?.trademarks}} />
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


