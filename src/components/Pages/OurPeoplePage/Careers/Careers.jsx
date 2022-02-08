import React, {useState, useEffect} from 'react'
import {getCarreras} from '../../../../services/ApiClient'
import Loader from '../../../Loader/Loader'

function Careers() {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            const getCarrerasData = await getCarreras()
            setData(getCarrerasData)
        }
        fetchData()
        setLoading(!loading)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {loading && <Loader />}
            <section className="container Careers">
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-4">
                        <h1>{data?.title}</h1>
                        <p>{data?.description}</p>
                    </div>
                    <div className="col-12 col-sm-4 d-flex align-items-center">
                        <a href={data?.buttonLink} target="_blank" className="leti-btn" rel="noopener noreferrer">{data?.buttonTitle}</a>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Careers
