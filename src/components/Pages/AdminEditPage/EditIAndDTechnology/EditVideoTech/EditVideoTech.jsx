import React, {useState, useEffect} from 'react'
import {useFormState} from '../../../../../hooks/useFormState'
import {getVideoTech, updateVideoTech} from '../../../../../services/ApiClient'
import InputWithLabel from '../../../../Form/InputWithLabel/InputWithLabel'
import Button from '../../../../Form/FormButton/FormButton'
import InputFile from '../../../../Form/InputFile/InputFile'
import {app} from '../../../../../services/firebase'


function EditVideoTech() {

    const [fileSizeMessage, setFileSizeMessage] = useState('')
    const [videoMessage, setVideoMessage] = useState('')
    const [videoTitle, setVideoTitle] = useState('')
    const [videoInfo, setVideoInfo] = useState([])
    const [message, setMessage] = useState('')
    const [videoId, setVideoId] = useState('')

    const {state, onBlur, onChange} = useFormState(
        {
            data: {
                id: '',
                title: videoTitle,
                videoURL: videoInfo,
            },
            error: {
                title: true,
                videoURL: true,
            },
            touch: {},
        },
        {
            videoURL: v => v.length,
            title: v => v.length,
        }
    )


    const {data, error} = state
    const [registerError, setRegisterError] = useState(null)

    const onFileSelected = async (e) => {

        // Get file
        const file = e.target.files[0]

        if (file.size > 2000000) {
            setMessage('')
            setFileSizeMessage("El tamaño del vídeo excede el máximo permitido (20MB), por favor optimícelo y vuelva a intentar")
        } else {

            // Create storage ref
            const storageRef = app.storage().ref()
            const filePath = storageRef.child('videos/' + file.name)

            // Upload file
            setVideoMessage('Espere unos segundos, subiendo vídeo...')
            await filePath.put(file)
                .then(() => {
                    setVideoMessage('El vídeo ha sido editado correctamente.')
                })
                .catch(err => {console.log(err)})

            // Get file url
            await filePath.getDownloadURL()
                .then((vdata) => {
                    setVideoInfo(vdata)
                    updateVideoPath(vdata)
                })
                .catch(err => {console.log(err)})
        }
    }

    const updateVideoPath = async (vdata) => {
        setMessage('')
        data.id = videoId
        data.videoURL = vdata
        data.title = videoTitle

        //Upload video url to API
        await updateVideoTech(data)
            .then((data) => {
                setMessage('')
                setVideoInfo(data.videoURL)
            })
            .catch(err => {console.log(err)})
    }

    const updateTitle = async (event) => {
        event.preventDefault()
        data.id = videoId
        data.videoURL = videoInfo

        if (Object.values(error).map(el => el).includes(false)) {
            try {
                await updateVideoTech(data)
                    .then(video => {
                        setVideoInfo(video)
                        setMessage('Título actualizado exitosamente.')
                        setVideoTitle(video.title)
                    })
                    .catch(error => {
                        setRegisterError(error)
                    })
            } catch (err) {
                setRegisterError(err.response?.data?.message)
            }
        } else {
            setMessage('Por favor edite el título del vídeo.')
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const getVideoData = await getVideoTech()
            setVideoInfo(getVideoData[0].videoURL)
            setVideoTitle(getVideoData[0].title)
            setVideoId(getVideoData[0]._id)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <div className="container-fluid p-0">
                <div className="row">
                    <div className="col-sm-6 col-12">
                        <div className="container-fluid EditContent">
                            <h2>Título del banner del video</h2>
                            <form className="AdminEdit__form" onSubmit={updateTitle}>
                                <div className="row">
                                    <div className="col-12">
                                        <p className="AdminEdit__form__label">
                                            Título
                                        </p>
                                        <InputWithLabel
                                            value={data?.title}
                                            onBlur={onBlur}
                                            onChange={onChange}
                                            name="title"
                                            type="text"
                                            cssStyle="form-control mb-5"
                                            placeholder={videoTitle}
                                        />
                                    </div>
                                    <div className="col-12">
                                        <Button cssStyle="leti-btn AdminEdit__form-leti-btn" >Guardar cambios</Button>
                                        {message && <span className="AdminEdit__message">{message}</span>}
                                    </div>

                                </div>
                                {registerError && <div className="alert alert-danger">{registerError}</div>}
                            </form>
                        </div>
                    </div>
                    <div className="col-sm-6 col-12">
                        <div className="container-fluid EditContent EditVideo">
                            <h2>Video</h2>
                            {videoMessage ? <p className="is-message">{videoMessage}</p> :
                                <div className="row">
                                    <div className="col-12">
                                        <a className="video-link" href={videoInfo} target="_blank" rel="noopener noreferrer">Ver vídeo actual</a>
                                        <InputFile
                                            value={videoInfo}
                                            onChange={onFileSelected}
                                            id="fileButton"
                                            name="videoURL"
                                            type="file"
                                            classStyle="video"
                                        />
                                    </div>
                                    {
                                        fileSizeMessage &&
                                        <div className="col-12">
                                            <small>{fileSizeMessage}</small>
                                        </div>
                                    }
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditVideoTech
