import './Video.css'
import React, {useState, useEffect} from 'react'
import {getOurCompaniesVideoGenven} from '../../../../services/ApiClient'
import Loader from '../../../Loader/Loader'

function Video() {

    const [videoData, setVideoData] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            const getVideoData = await getOurCompaniesVideoGenven()
            setVideoData(getVideoData[0]?.videoURL)
        }
        fetchData()
        setLoading(!loading)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <>
            {loading && <Loader />}
            <section className="container-fluid Video">
                {videoData && (
                    <video loop muted autoPlay playsInline>
                        <source src={videoData} type="video/mp4" />
                    </video>
                )}
            </section>
        </>
    )
}



export default Video
