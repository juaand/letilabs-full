import './ProductListPage.css'
import React from 'react'
import {Helmet} from 'react-helmet'
import Banner from './Banner/Banner'
import FindProduct from './FindProduct/FindProduct'
import List from './List/List'


function ProductListPage() {

    return (
        <>
            <Helmet>
                <title>Grupo Leti | Listado de productos</title>
                <meta name="description" content="Nuestro amplio portafolio de productos incluye muchas marcas reconocidas que forman parte de la historia del Grupo Leti." />
                <meta name="keywords" content="Grupo Leti, Listado de productos" />
            </Helmet>
            <main>
                <Banner />
                <FindProduct />
                <List />
            </main>
        </>
    )
}

export default ProductListPage
