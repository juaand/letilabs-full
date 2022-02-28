import React, {useState, useEffect} from 'react'

import {getApiVideo} from '../../../../services/ApiClient'
import Loader from '../../../../components/Loader/Loader'
import './Video.css'

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
                    <video poster="https://firebasestorage.googleapis.com/v0/b/grupo-leti-fd84e.appspot.com/o/images%2Fvideo-hero.jpg?alt=media&token=ac7994ed-0ede-4447-a252-94981fec24b5" loop muted autoPlay playsInline>
                        <source src={videoData} type="video/mp4" />
                    </video>
                )}
            </section>
        </>
    )
}



export default Video
