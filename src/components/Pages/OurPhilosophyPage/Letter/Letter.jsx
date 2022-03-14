import './Letter.css'
import React, {useState, useEffect} from 'react'
import {Fade} from 'react-awesome-reveal'
import {getLetterOurPhilosophy} from '../../../../services/ApiClient'
import Loader from '../../../Loader/Loader'

function Letter() {

    const [data, setData] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            const getData = await getLetterOurPhilosophy()
            setData(getData)
        }
        fetchData()
        setLoading(!loading)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {loading && <Loader />}
            <section className="container Letter">
                <div className="row justify-content-center">
                    <div className="col-11 col-sm-8">
                        <Fade triggerOnce cascade direction="up">
                            <h1 className="Letter__title" dangerouslySetInnerHTML={{__html: data?.mainTitle}} />
                            <p dangerouslySetInnerHTML={{__html: data?.body}} />
                            <img className="Letter__img" src={data?.imgURL} onError="this.src = 'https://firebasestorage.googleapis.com/v0/b/grupoleti.appspot.com/o/images%2Fno-image.png?alt=media&token=6e518b16-dc11-46e3-83e8-ae4b84a18293';" alt="Firma" />
                        </Fade>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Letter
