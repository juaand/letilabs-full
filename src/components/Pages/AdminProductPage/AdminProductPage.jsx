import './AdminProductPage.css'
import React, {useState, useEffect} from 'react'
import {Helmet} from 'react-helmet'
import {getVadevecumData} from '../../../services/ApiClient'

function AdminProductPage() {

    const [search, setSearch] = useState('')
    const [products, setProducts] = useState([])

    const handleChange = (e) => {
        setSearch(e.target.value)
    }

    const filteredProducts = products.filter(el => {
        return (
            el.name.toLowerCase().indexOf(search.toLocaleLowerCase()) > -1
        )
    })

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
            <main className="container-fluid AdminProductPage">
                <div className="row">
                    <div className="col-12 AdminProductPage__bg">
                        <div className="container">
                            <input type="text" className="form-control AdminProductPage__search" placeholder="Filtrar por producto" onChange={handleChange} value={search} />
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="container">
                            {filteredProducts.map(el => <p>{el.name}</p>)}
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default AdminProductPage


