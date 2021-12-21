import './SingleProductPage.css'
import React, {useState, useEffect} from 'react'

function SingleProductPage(props) {

    const buscar = props?.location?.state?.buscar
    const especialidad = props?.location?.state?.especialidad

    useEffect(() => {
        const fetchData = async () => {
            const getBannerData = await getProduct()
            setBannerData(getBannerData)
        }
        fetchData()
    }, [buscar])

    return (
        <section className="container SingleProductPage">
            <div className="row">
                <div className="col-12 SingleProductPage__back">
                    <p>Regresar al listado de productos</p>
                </div>
                <div className="col-12 col-sm-6 SingleProductPage__pic"></div>
                <div className="col-12 col-sm-6 SingleProductPage__info">
                    <h1>{buscar}</h1>
                </div>
            </div>
        </section>
    )
}

export default SingleProductPage
