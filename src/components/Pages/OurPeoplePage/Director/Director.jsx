import './Director.css'
import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Fade} from 'react-awesome-reveal'
import {getEquipoOurPeople} from '../../../../services/ApiClient'
import Loader from '../../../Loader/Loader'

function Director() {

    const [dataDirector, setDataDirector] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            const getEquipoData = await getEquipoOurPeople()
            setDataDirector(getEquipoData)
        }
        fetchData()
        setLoading(!loading)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <>
            {loading && <Loader />}
            <section className="container-fluid Director">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-sm-6 Director__image" style={{
                            background: `url(${dataDirector?.imgURL}) no-repeat center center / cover`,
                        }} />

                        <div className="col-12 col-sm-6 offset-sm-6 Director__info">
                            <h1>{dataDirector?.title}</h1>
                            <Fade triggerOnce direction="up" duration={1600}>
                                <p>{dataDirector?.description}</p>
                                <small>{dataDirector?.person}</small>
                                <Link to={dataDirector?.buttonLink} className="leti-btn">{dataDirector?.buttonTitle}</Link>
                            </Fade>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Director
