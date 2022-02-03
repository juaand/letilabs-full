import React, {useState, useEffect} from 'react'
import {useFormState} from '../../../../../hooks/useFormState'
import {getPurposeVideo, updatePurposeVideo} from '../../../../../services/ApiClient'
import InputWithLabel from '../../../../Form/InputWithLabel/InputWithLabel'
import Button from '../../../../Form/FormButton/FormButton'

function EditPurposeVideo() {

    const [videoData, setVideoData] = useState()

    const {state, onBlur, onChange} = useFormState(
        {
            data: {
                id: '',
                videoURL: videoData?.videoURL,
            },
            error: {
                videoURL: false,
            },
            touch: {},
        },
        {
            videoURL: v => v.length,
        }
    )



    const {data, error, touch} = state
    const [registerError, setRegisterError] = useState(null)


    const updateVideo = async (event) => {
        event.preventDefault()
        data.id = videoData._id

        try {
            await updatePurposeVideo(data)
                .then(video => {
                    setVideoData(video[0])
                })
                .catch(error => {
                    setRegisterError(error)
                })
        } catch (err) {
            setRegisterError(err.response?.data?.message)
        }
    }


    useEffect(() => {
        const fetchData = async () => {
            const getVideoData = await getPurposeVideo()
            setVideoData(getVideoData[0])
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <section className="container-fluid EditContent">
            <h2>Video </h2>
            <form className="AdminEdit__form" onSubmit={updateVideo}>
                <div className="row">
                    <div className="col-12 col-sm-6">
                        <p className="AdminEdit__form__label">
                            Video
                        </p>
                        <InputWithLabel
                            value={data?.videoURL}
                            onBlur={onBlur}
                            onChange={onChange}
                            name="videoURL"
                            type="text"
                            cssStyle={`form-control ${touch.videoURL && error.videoURL ? "is-invalid" : ""}`}
                            placeholder={videoData?.videoURL}
                        />
                    </div>
                    <div className="col-12">
                        <Button cssStyle="leti-btn AdminEdit__form-leti-btn" >Guardar cambios - Video</Button>
                    </div>

                </div>
                {registerError && <div className="alert alert-danger">{registerError}</div>}
            </form>
        </section>
    )
}

export default EditPurposeVideo
