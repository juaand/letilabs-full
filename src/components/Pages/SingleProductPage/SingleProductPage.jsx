import './SingleProductPage.css'
import React, {useState, useEffect} from 'react'
import {getProduct} from '../../../services/ApiClient'

function SingleProductPage(props) {

    const buscar = props?.location?.state?.buscar
    const especialidad = props?.location?.state?.especialidad

    const [product, setProduct] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const getProductData = await getProduct(buscar)
            setProduct(getProductData[0])
        }
        fetchData()
    }, [buscar])

    // active_principle: "Levodropropizina"
    // category: "Tos"
    // composition: "Levodropropizina 0,6%"
    // health_register: "E.F. 30.815/15"
    // id: "94"
    // indication: "Tratamiento sintomático de la tos no productiva (tos seca)"
    // line: "OTC"
    // name: "Antux"
    // posology: "De 10 a 20 kg: 2 ml a 3 ml de la solución cada 8 horas\r\nDe 21 a 30 kg: 3,5ml a 5 ml de la solución cada 8 horas\r\nDe 31 a 40 kg: 5ml a 7 ml de la solución cada 8 horas"
    // presentation: "Antux 0,6% solución oral x 180ml"
    // therapeutic_group: "Antitusígeno"
    // trademarks: ""
    // tv_spot: []
    // _id: "61c1ff2b67766a6eb0387bef"

    return (
        <section className="container SingleProductPage">
            <div className="row">
                <div className="col-12 SingleProductPage__back">
                    <p>Regresar al listado de productos</p>
                </div>
                <div className="col-12 SingleProductPage__product">
                    <div className="row">
                        <div className="col-12 col-sm-6 SingleProductPage__pic"></div>
                        <div className="col-12 col-sm-6 SingleProductPage__info">

                            <>
                                <h1>{product?.name}</h1>
                                <h2>{product?.active_principle}</h2>
                                {product.therapeutic_group.split('/').map((item) => 
                                <span>{item}</span>
                            )}
                                <p><strong>Composición</strong> {product?.composition}</p>
                                <p><strong>Indicación</strong> {product?.indication}
                                </p>
                                <p><strong>Presentación</strong> {product?.presentation}</p>
                                <p><strong>Resgitro sanitario</strong> {product?.health_register}</p>
                            </>
                        </div>
                    </div>
                </div>
                <div className="col-12 SingleProductPage__posology">
                    <p>
                        <h2>Posología</h2>
                        <ul>
                            {product.posology.split('/').map((item) => 
                                <li>{item}</li>
                            )}
                        </ul>
                    </p>
                </div>
                <div className="col-12 SingleProductPage__another">
                    <h1>Otros productos del portafolio</h1>
                </div>
            </div>
        </section>
    )
}

export default SingleProductPage
