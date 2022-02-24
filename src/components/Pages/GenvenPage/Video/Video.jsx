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
            <section className="container-fluid Video Video__genven">
                {videoData && (
                    <video poster="https://firebasestorage.googleapis.com/v0/b/grupo-leti-fd84e.appspot.com/o/images%2Fno-image.png?alt=media&token=73bf7cd8-629d-4deb-b281-9e629fbfb752" loop muted autoPlay playsInline>
                        <source src={videoData} type="video/mp4" />
                    </video>
                )}
            </section>
        </>
    )
}



export default Video
