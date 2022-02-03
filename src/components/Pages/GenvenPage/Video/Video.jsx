import './Video.css'
import React, {useState, useEffect} from 'react'
import {getOurCompaniesVideoGenven} from '../../../../services/ApiClient'

function Video() {

    const [videoData, setVideoData] = useState()

    useEffect(() => {
        const fetchData = async () => {
            const getVideoData = await getOurCompaniesVideoGenven()
            setVideoData(getVideoData[0]?.videoURL)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <section className="container-fluid Video">
            {videoData && (
                <video loop muted autoPlay playsInline>
                    <source src={videoData} type="video/mp4" />
                </video>
            )}
        </section>
    )
}



export default Video
