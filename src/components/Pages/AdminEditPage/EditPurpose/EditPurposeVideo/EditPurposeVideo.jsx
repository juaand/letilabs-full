import React, {useState, useEffect} from 'react'
import {getPurposeVideo, updatePurposeVideo} from '../../../../../services/ApiClient'
import InputFile from '../../../../Form/InputFile/InputFile'
import {app} from '../../../../../services/firebase'

function EditPurposeVideo() {

    const [videoData, setVideoData] = useState('')
    const [message, setMessage] = useState('')
    const [videoInfo, setVideoInfo] = useState([])
    const [videoId, setVideoId] = useState('')

    const onFileSelected = async (e) => {

        // Get file
        const file = e.target.files[0]

        // Create storage ref
        const storageRef = app.storage().ref()
        const filePath = storageRef.child('videos/' + file.name)

        // Upload file
        setMessage('Espere unos segundos, subiendo vídeo...')
        await filePath.put(file)
            .then(() => {
                setMessage('El vídeo ha sido editado correctamente.')
            })
            .catch(err => {console.log(err)})

        // Get file url
        await filePath.getDownloadURL()
            .then((vdata) => {
                setVideoData(vdata)
                updateVideoPath(vdata)
            })
            .catch(err => {console.log(err)})
    }

    const updateVideoPath = async (vdata) => {
        setMessage('')

        //Upload video url to API
        await updatePurposeVideo(vdata, videoId)
            .then((data) => {
                setMessage('')
                setVideoInfo(data.videoURL)
            })
            .catch(err => {console.log(err)})
    }

    useEffect(() => {
        const fetchData = async () => {
            const getVideoData = await getPurposeVideo()
            setVideoInfo(getVideoData[0].videoURL)
            setVideoId(getVideoData[0]._id)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <section className="container-fluid EditContent EditVideo">
            <h2>Vídeo</h2>
            {message ? <p className="is-message">{message}</p> :
                <div className="row">
                    <div className="col-12">
                        <a className="video-link" href={videoInfo} target="_blank" rel="noopener noreferrer">Ver vídeo actual</a>
                        <InputFile
                            value={videoData}
                            onChange={onFileSelected}
                            id="fileButton"
                            name="videoURL"
                            type="file"
                            classStyle="video"
                        />
                    </div>
                </div>}
        </section>
    )
}

export default EditPurposeVideo
