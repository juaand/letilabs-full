import './AdminProductPage.css'
import React, {useState, useEffect} from 'react'
import {Helmet} from 'react-helmet'
import {addHomeScreen, getVadevecumData} from '../../../services/ApiClient'
import {Link} from 'react-router-dom'

function AdminProductPage() {

    const [search, setSearch] = useState('')
    const [products, setProducts] = useState([])
    const [message, setMessage] = useState('')

    const handleChange = (e) => {
        setSearch(e.target.value)
    }

    const filteredProducts = products.filter(el => {
        return (
            el.name.toLowerCase().indexOf(search.toLocaleLowerCase()) > -1
        )
    })

    const showAtHome = async (e, id) => {
        console.log(e.target.checked, id)
        if (products.filter(el => el?.show_in_home === true).length >= 18  && e.target.checked === true) {
            setMessage('Ya se han alcanzado el máximo de productos para mostrar en la página principal.')
        } else {
            setMessage('add to home')
            const res = await addHomeScreen(e.target.checked, id)
            setProducts(res)
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
            <Helmet>
                <title>Grupo Leti | Administrador Productos</title>
            </Helmet>
            {message && <div className="alert alert-danger" role="alert">{message}</div>}
            <main className="container-fluid AdminProductPage">
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
                                            <img src={el?.picPath} className="AdminProductPage__img-top" alt={el?.name} />
                                            <div className="card-body">
                                                <h5 dangerouslySetInnerHTML={{__html: el?.name}}>
                                                </h5>
                                                <p className="card-text">{el?.line}</p>
                                            </div>
                                            <ul className="list-group list-group-flush">
                                                <li className="list-group-item"><div className="form-check">
                                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked={el.show_in_home} onChange={(e) => showAtHome(e, el._id)} />
                                                    <label className="form-check-label" for="flexCheckChecked">
                                                        mostrar en carrusel del home
                                                    </label>
                                                </div></li>
                                                <li className="list-group-item">A second item</li>
                                                <li className="list-group-item">A third item</li>
                                            </ul>
                                            <div className="card-footer">
                                                <Link to="#" className="leti-btn">Editar producto</Link>
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


