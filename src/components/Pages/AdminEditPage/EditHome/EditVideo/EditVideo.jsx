import React, {useState} from 'react'
import {updateVideoData} from '../../../../../services/ApiClient'
import {app} from '../../../../../services/firebase'
import InputFile from '../../../../Form/InputFile/InputFile'

function EditVideo() {

    const [videoData, setVideoData] = useState()
    const [message, setMessage] = useState('')

    const onFileSelected = async (e) => {
        // Get file
        const file = e.target.files[0]

        // Create storage ref
        const storageRef = app.storage().ref()
        const filePath = storageRef.child('videos/' + file.name)

        // Upload file
        await filePath.put(file)
            .then(() => {
                setMessage('Video subido correctamente')
            })
            .catch(err => {console.log(err)})


        // Get file url
        const fileUrl = await filePath.getDownloadURL()
        setVideoData(fileUrl)
        console.log(fileUrl)

        //Upload video url to API
        const updateData = await updateVideoData(fileUrl)
    }

    return (
        <section className="container-fluid EditContent">
            <h2>video</h2>

            {message ? <p className="text-success">{message}</p> :
                <div className="row">
                    <div className="col-12">
                        <p>Vídeo actual</p>
                        <InputFile
                            value={videoData}
                            onChange={onFileSelected}
                            id="fileButton"
                            name="picpath"
                            type="file"
                            className="video"
                        />
                    </div>
                </div>}
        </section>
    )
}

export default EditVideo
