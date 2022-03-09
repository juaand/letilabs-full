import React, {useState, useEffect} from 'react'

import {createContent, getProductBottom, getFarmaco, getSeo} from '../../../services/ApiClient'

import {useAuthContext} from '../../../contexts/AuthContext'
import {Helmet} from 'react-helmet'

import FarmacoVigilancia from './FarmacoVigilancia/FarmacoVigilancia'
import FindProduct from './FindProduct/FindProduct'
import Loader from '../../Loader/Loader'
import Bottom from './Bottom/Bottom'
import Banner from './Banner/Banner'

function ProductsPage() {

    const {user} = useAuthContext()
    const data = {
        content: [],
        url: '/productos',
        name: 'Productos',
    }

    const [farmacoData, setFarmacoData] = useState([])
    const [bottomData, setBottomData] = useState([])
    const [seoInfo, setSeoInfo] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (user) {
            const mainContent = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6')
            mainContent.forEach(content => {
                data.content.push(content.innerText)
            })

            const fetchData = async () => {
                await createContent(data)
            }
            fetchData()
            setLoading(!loading)
        }

        const isMenuOpen = document.querySelector('.show')
        if (isMenuOpen) {
            isMenuOpen.classList.remove('show')
        }

        const isCloseSearch = document.querySelector('.Header__search-close')
        if (isCloseSearch) {
            isCloseSearch.classList.remove('Header__search-close')
        }


        const fetchData = async () => {
            const getBottomData = await getProductBottom()
            setBottomData(getBottomData[0])
            const getFarmacoData = await getFarmaco()
            setFarmacoData(getFarmacoData)
            const getSeoData = await getSeo()
            const filterSeo = getSeoData.filter(seo => seo.page === 'Productos')
            setSeoInfo(filterSeo[0])
        }
        fetchData()
        setLoading(!loading)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <>
            {loading && <Loader />}
            <Helmet>
                <title>{`Grupo Leti | ${seoInfo?.page}`}</title>
                <meta name="description" content={`${seoInfo?.description}`} />
                <meta name="keywords" content={`${seoInfo?.keywords}`} />
            </Helmet>
            <main>
                <Banner />
                <FindProduct info={bottomData} />
                <Bottom info={bottomData} />
                <FarmacoVigilancia info={farmacoData} />
            </main>
        </>
    )
}

export default ProductsPage
