import React, {useState, useEffect} from 'react'
import {Fade} from 'react-awesome-reveal'
import {getPurposeVideo} from '../../../../services/ApiClient'
import Loader from '../../../Loader/Loader'

function Video() {

    const [videoData, setVideoData] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            const getVideoData = await getPurposeVideo()
            setVideoData(getVideoData[0]?.videoURL)
        }
        fetchData()
        setLoading(!loading)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {loading && <Loader />}
            <Fade triggerOnce direction="up" duration={600}>
                <section className="container-fluid Video Video__purpose">
                    {videoData && (
                        <video poster="https://firebasestorage.googleapis.com/v0/b/grupo-leti-fd84e.appspot.com/o/images%2Fvideo-hero.jpg?alt=media&token=ac7994ed-0ede-4447-a252-94981fec24b5" loop muted autoPlay playsInline>
                            <source src={videoData} type="video/mp4" />
                        </video>
                    )}
                </section>
            </Fade>
        </>
    )
}

export default Video
