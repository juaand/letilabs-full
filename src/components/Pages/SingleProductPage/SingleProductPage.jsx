import './SingleProductPage.css'
import React, {useState, useEffect} from 'react'
import {getProduct} from '../../../services/ApiClient'
import Slider from "react-slick"

function SingleProductPage(props) {

    let settings = {
        slidesToShow: 1,
        speed: 500,
        dots: true,
        arrows: true,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 576,
                settings: {
                    arrows: true,
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    }

    const buscar = props?.location?.state?.buscar

    const [product, setProduct] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const getProductData = await getProduct(buscar)
            setProduct(getProductData)
        }
        fetchData()
    }, [buscar])

    return (
        <section className="container SingleProductPage">
            <div className="row">
                <div className="col-12 SingleProductPage__back">
                    <p>Regresar al listado de productos</p>
                </div>
                {product.length > 1 ?
                    <Slider {...settings}>
                        {product.map(el =>
                            <>
                                <div className="col-12 SingleProductPage__product">
                                    <div className="row">
                                        <div className="col-12 col-sm-6 SingleProductPage__pic">algo</div>
                                        <div className="col-12 col-sm-6 SingleProductPage__info">
                                            <h1>{el?.name}</h1>
                                            <h2>{el?.active_principle}</h2>
                                            {el?.therapeutic_group?.length > 1 ? el?.therapeutic_group.map(el => <span>{el}</span>) : <span>{el?.therapeutic_group}</span>}
                                            <p><strong>Composición</strong> {el?.composition}</p>
                                            <p><strong>Indicación</strong> {el?.indication}
                                            </p>
                                            <p><strong>Presentación</strong> {el?.presentation}</p>
                                            <p><strong>Resgitro sanitario</strong> {el?.health_register}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 SingleProductPage__posology">
                                    <p>
                                        <h2>Posología</h2>
                                        <ul>
                                            <li dangerouslySetInnerHTML={{__html: el?.posology}}>
                                            </li>
                                        </ul>
                                    </p>
                                </div>
                            </>
                        )}
                    </Slider>
                    :
                    <>
                        <div className="col-12 SingleProductPage__product">
                            <div className="row">
                                <div className="col-12 col-sm-6 SingleProductPage__pic"></div>
                                <div className="col-12 col-sm-6 SingleProductPage__info">
                                    <>
                                        <h1>{product[0]?.name}</h1>
                                        <h2>{product[0]?.active_principle}</h2>
                                        {product[0]?.therapeutic_group?.length > 1 ? product[0]?.therapeutic_group.map(el => <span>{el}</span>) : <span>{product[0]?.therapeutic_group}</span>}
                                        <p><strong>Composición</strong> {product[0]?.composition}</p>
                                        <p><strong>Indicación</strong> {product[0]?.indication}
                                        </p>
                                        <p><strong>Presentación</strong> {product[0]?.presentation}</p>
                                        <p><strong>Resgitro sanitario</strong> {product[0]?.health_register}</p>
                                    </>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 SingleProductPage__posology">
                            <p>
                                <h2>Posología</h2>
                                <ul>
                                    <li dangerouslySetInnerHTML={{__html: product[0]?.posology}}>
                                    </li>
                                </ul>
                            </p>
                        </div>
                    </>
                }
                <div className="col-12 SingleProductPage__another">
                    <h1>Otros productos del portafolio</h1>
                </div>
            </div>
        </section>
    )
}

export default SingleProductPage
