import './Video.css'
import React, {useState, useEffect} from 'react'
import {Fade} from 'react-awesome-reveal'
import {getVideoTech} from '../../../../services/ApiClient'
import Loader from '../../../Loader/Loader'

function Video() {

    const [videoData, setVideoData] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            const getVideoData = await getVideoTech()
            setVideoData(getVideoData[0])
        }
        fetchData()
        setLoading(!loading)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {loading && <Loader />}
            <Fade triggerOnce direction="up">
                <section className="container-fluid Video__tech-title">
                    <h1>{videoData?.title}</h1>
                </section>
                <section className="container-fluid Video">
                    {videoData && (
                        <video loop muted autoPlay playsInline>
                            <source src={videoData?.videoURL} type="video/mp4" />
                        </video>
                    )}
                </section>
            </Fade>
        </>
    )
}

export default Video
