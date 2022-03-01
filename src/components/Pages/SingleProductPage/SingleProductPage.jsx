import './SingleProductPage.css'
import React, {useState, useEffect} from 'react'
import {getProduct} from '../../../services/ApiClient'
import Slider from "react-slick"
import {Link} from 'react-router-dom'
import {Fade} from 'react-awesome-reveal'
import Loader from '../../Loader/Loader'

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
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        window.scrollTo(0, 0)
        const fetchData = async () => {
            const getProductData = await getProduct(buscar)
            setProduct(getProductData)
        }
        fetchData()
        setLoading(!loading)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [buscar])

    return (
        <>
            {loading && <Loader />}
            <section className="container SingleProductPage">
                <div className="row">
                    <div className="col-12 SingleProductPage__back">
                        <Link className="SingleProductPage__link" to="/listado-de-productos">Regresar al listado de productos</Link>
                    </div>
                    {product.length > 1 ?
                        <Fade triggerOnce cascade direction="up">
                            <Slider {...settings}>
                                {product[0].map(el =>
                                    <>
                                        <div className="col-12 SingleProductPage__product">
                                            <div className="row">
                                                <div className="col-12 col-sm-6 SingleProductPage__pic" style={{
                                                    background: `url(${el?.picPath}) no-repeat center / 60%`,
                                                }} />
                                                <div className="col-12 col-sm-6 SingleProductPage__info">
                                                    <h1>{el?.name}</h1>
                                                    <h2 dangerouslySetInnerHTML={{__html: el?.active_principle}} />
                                                    {el?.therapeutic_group?.length > 1 ? el?.therapeutic_group.map(el => <span className="tag">{el}</span>) : <span>{el?.therapeutic_group}</span>}
                                                    <p><strong>Composición</strong> <span dangerouslySetInnerHTML={{__html: el?.composition}}/></p>
                                                    <p><strong>Indicación</strong> <span dangerouslySetInnerHTML={{__html: el?.indication}}/>
                                                    </p>
                                                    <p><strong>Presentación</strong> <span dangerouslySetInnerHTML={{__html: el?.presentation}}/></p>
                                                    <p><strong>Registro sanitario</strong> <span dangerouslySetInnerHTML={{__html: el?.health_register}}/></p>
                                                    <p><strong>Vida útil</strong> <span dangerouslySetInnerHTML={{__html: el?.util_life}}/></p>
                                                    <p className="SingleProductPage__cpe">{el?.CPE}</p>
                                                    <img src={el?.QRpath} onError="this.src = 'https://firebasestorage.googleapis.com/v0/b/grupo-leti-fd84e.appspot.com/o/images%2Fno-image.png?alt=media&token=73bf7cd8-629d-4deb-b281-9e629fbfb752';" alt={el?.name + ' código de barras'} className="SingleProductPage__cb" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row justify-content-between">
                                            <div className="col-sm-3 col-12 SingleProductPage__posology">
                                                <p>
                                                    <h2>Reacciones adversas</h2>
                                                    <ul>
                                                        <li dangerouslySetInnerHTML={{__html: el?.adverse_reactions}}>
                                                        </li>
                                                    </ul>
                                                </p>
                                            </div>
                                            <div className="col-sm-3 col-12 SingleProductPage__posology">
                                                <p>
                                                    <h2>Modo de empleo</h2>
                                                    <ul>
                                                        <li dangerouslySetInnerHTML={{__html: el?.how_to_use}}>
                                                        </li>
                                                    </ul>
                                                </p>
                                            </div>
                                            <div className="col-sm-3 col-12 SingleProductPage__posology">
                                                <p>
                                                    <h2>Contraindicaciones</h2>
                                                    <ul>
                                                        <li dangerouslySetInnerHTML={{__html: el?.contraindications}}>
                                                        </li>
                                                    </ul>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="col-12 SingleProductPage__posology wborder">
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
                        </Fade>
                        :
                        <>
                            <div className="col-12 SingleProductPage__product">
                                <div className="row">
                                    <div className="col-12 col-sm-6 SingleProductPage__pic" style={{
                                        background: `url(${product[0]?.picPath}) no-repeat center / 60%`,
                                    }} />
                                    <div className="col-12 col-sm-6 SingleProductPage__info">
                                        <>
                                            <h1>{product[0]?.name}</h1>
                                            <h2>{product[0]?.active_principle}</h2>
                                            {product[0]?.therapeutic_group?.length > 1 ? product[0]?.therapeutic_group.map(el => <span>{el}</span>) : <span>{product[0]?.therapeutic_group}</span>}
                                            <p><strong>Composición</strong> {product[0]?.composition}</p>
                                            <p><strong>Indicación</strong>
                                                <span dangerouslySetInnerHTML={{__html: product[0]?.indication}}>
                                                </span>
                                            </p>
                                            <p><strong>Presentación</strong> {product[0]?.presentation}</p>
                                            <p><strong>Registro sanitario</strong> {product[0]?.health_register}</p>
                                            <p><strong>Vida útil</strong> {product[0]?.util_life}</p>
                                            <p className="SingleProductPage__cpe">{product[0]?.CPE}</p>
                                            <img src={product[0]?.QRpath} onError="this.src = 'https://firebasestorage.googleapis.com/v0/b/grupo-leti-fd84e.appspot.com/o/images%2Fno-image.png?alt=media&token=73bf7cd8-629d-4deb-b281-9e629fbfb752';" alt={product[0]?.name + ' código de barras'} className="SingleProductPage__cb" />
                                        </>
                                    </div>
                                </div>
                            </div>
                            <div className="row justify-content-between">
                                <div className="col-sm-3 col-12 SingleProductPage__posology">
                                    <p>
                                        <h2>Reacciones adversas</h2>
                                        <ul>
                                            <li dangerouslySetInnerHTML={{__html: product[0]?.adverse_reactions}}>
                                            </li>
                                        </ul>
                                    </p>
                                </div>
                                <div className="col-sm-3 col-12 SingleProductPage__posology">
                                    <p>
                                        <h2>Modo de empleo</h2>
                                        <ul>
                                            <li dangerouslySetInnerHTML={{__html: product[0]?.how_to_use}}>
                                            </li>
                                        </ul>
                                    </p>
                                </div>
                                <div className="col-sm-3 col-12 SingleProductPage__posology">
                                    <p>
                                        <h2>Contraindicaciones</h2>
                                        <ul>
                                            <li dangerouslySetInnerHTML={{__html: product[0]?.contraindications}}>
                                            </li>
                                        </ul>
                                    </p>
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
                        <div className="row justify-content-between">
                            {product[1]?.map(el =>
                                <div className="col-12 col-sm-3 SingleProductPage__another__block">
                                    {/* <img src={el?.picPath} onError="this.src = 'https://firebasestorage.googleapis.com/v0/b/grupo-leti-fd84e.appspot.com/o/images%2Fno-image.png?alt=media&token=73bf7cd8-629d-4deb-b281-9e629fbfb752';" alt={el?.name} className="SingleProductPage__another__img" /> */}
                                    <h2 className="SingleProductPage__another__img SingleProductPage__another__img-txt">{el?.name}<sup>&reg;</sup></h2>
                                    <h2>{el?.name}</h2>
                                    <p className="SingleProductPage__another__principle">{el?.active_principle}</p>
                                    <Link to={{
                                        pathname: '/producto',
                                        state: {
                                            buscar: el?.name
                                        }
                                    }} className="leti-btn">Ver producto</Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default SingleProductPage
