import './Video.css'
import React, {useState, useEffect} from 'react'
import {getApiVideo} from '../../../../services/ApiClient'
import Loader from '../../../../components/Loader/Loader'

function Video() {

    const [videoData, setVideoData] = useState()
    const [loader, setLoader] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            const getVideoData = await getApiVideo()
            setVideoData(getVideoData[0]?.url)
        }
        fetchData()
        setLoader(!loader)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <>
            {loader && <Loader />}
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
