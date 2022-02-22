import React, {useState, useEffect} from 'react'
import {useAuthContext} from '../../../contexts/AuthContext'
import {createContent, getProductBottom, getFarmaco} from '../../../services/ApiClient'
import {Helmet} from 'react-helmet'
import Banner from './Banner/Banner'
import FindProduct from './FindProduct/FindProduct'
import Bottom from './Bottom/Bottom'
import FarmacoVigilancia from './FarmacoVigilancia/FarmacoVigilancia'
import Loader from '../../Loader/Loader'

function ProductsPage() {
    const {user} = useAuthContext()
    const data = {
        content: [],
        url: '/productos',
        name: 'Productos',
    }

    const [bottomData, setBottomData] = useState()
    const [farmacoData, setFarmacoData] = useState()
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
        }
        fetchData()
        setLoading(!loading)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <>
            {loading && <Loader />}
            <Helmet>
                <title>Grupo Leti | Productos</title>
                <meta name="description" content="Trabajamos cada día para poner nuestros conocimientos y habilidades al servicio de las personas: Desarrollando y poniendo a su disposición productos que abarquen una amplia gama de necesidades." />
                <meta name="keywords" content="Grupo Leti, Productos" />
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
