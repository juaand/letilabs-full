import React, {useState, useEffect} from 'react'
import {Fade} from 'react-awesome-reveal'
import {getPurposeVideo} from '../../../../services/ApiClient'


function Video() {

    const [videoData, setVideoData] = useState()

    useEffect(() => {
        const fetchData = async () => {
            const getVideoData = await getPurposeVideo()
            setVideoData(getVideoData[0]?.videoURL)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Fade triggerOnce direction="up" duration={600}>
            <section >
                {videoData && (
                    <video loop muted autoPlay playsInline>
                        <source src={videoData} type="video/mp4" />
                    </video>
                )}
            </section>
        </Fade>
    )
}

export default Video
