import React, {useState, useEffect} from 'react'
import {Helmet} from 'react-helmet'

import {getSeo} from '../../../services/ApiClient'

import FindProduct from './FindProduct/FindProduct'
import Banner from './Banner/Banner'
import List from './List/List'

import './ProductListPage.css'

function ProductListPage() {

    const [seoInfo, setSeoInfo] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            const getSeoData = await getSeo()
            const filterSeo = getSeoData.filter(seo => seo.page === 'Listado de productos')
            setSeoInfo(filterSeo[0])
        }
        fetchData()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <Helmet>
                <title>{`Grupo LETI | ${seoInfo?.page}`}</title>
                <meta name="description" content={`${seoInfo?.description}`} />
                <meta name="keywords" content={`${seoInfo?.keywords}`} />
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
