import './Map.css'
import React, {useState, useEffect} from "react"
import {getMapTech} from '../../../../services/ApiClient'
import {Fade} from 'react-awesome-reveal'
import Loader from '../../../Loader/Loader'

function Map() {

    const [mapData, setMapData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            const getCarouselData = await getMapTech()
            setMapData(getCarouselData[0])
        }
        fetchData()
        setLoading(!loading)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {loading && <Loader />}
            <Fade triggerOnce direction="up">
                <section className="container-fluid Map">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-sm-6 Map__image">
                                <iframe src={mapData?.mapURL} width="100%" style={{border: 0}} allowFullScreen="" loading="lazy" title="grupo leti mapa"></iframe>
                            </div>
                            <div className="col-12 col-sm-6 offset-sm-6 Map__info">
                                <p>{mapData?.description}</p>
                            </div>
                        </div>
                    </div>
                </section>
            </Fade>
        </>
    )
}

export default Map
