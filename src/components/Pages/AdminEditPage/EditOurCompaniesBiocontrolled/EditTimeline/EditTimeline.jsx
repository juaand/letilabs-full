import React, {useState, useEffect} from 'react'
import {useFormState} from '../../../../../hooks/useFormState'
import {getTimeLineBiocontrolled, addTimeLineBiocontrolledData} from '../../../../../services/ApiClient'
import InputWithLabel from '../../../../Form/InputWithLabel/InputWithLabel'
import InputFile from '../../../../Form/InputFile/InputFile'
import {app} from '../../../../../services/firebase'
import Button from '../../../../Form/FormButton/FormButton'
import EditItemModal from './EditItemModal/EditItemModal'
import {Editor} from '@tinymce/tinymce-react'
import Loader from '../../../../Loader/Loader'

function EditTimelineBiocontrolled() {

    const {state, onBlur, onChange} = useFormState(
        {
            data: {
                imgURL: '',
                desc: '',
                buttonTitle: '',
                buttonLink: '',
            },
            error: {
                imgURL: false,
                desc: false,
                buttonTitle: false,
                buttonLink: false,
            },
            touch: {},
        },
        {
            imgURL: v => v.length,
            desc: v => v.length,
            buttonTitle: v => v.length,
            buttonLink: v => v.length,
        }
    )

    const {data, error, touch} = state
    const [registerError, setRegisterError] = useState(null)
    const [modalData, setModalData] = useState()
    const [timelineData, setTimeLineData] = useState()
    const [bool, setBool] = useState(false)
    const [imageSuccess, setImageSuccess] = useState('')
    const [message, setMessage] = useState('')
    const [isDisabled, setIsDisabled] = useState(false)
    const [disabled, setDisabled] = useState(true)

    const showModal = (data) => {
        setModalData(data)
        setBool(!bool)
    }

    const addTimeLineItem = async (event) => {
        event.preventDefault()

        try {
            await addTimeLineBiocontrolledData(data)
                .then(timeline => {
                    setTimeLineData(timeline)
                })
                .catch(error => {
                    setRegisterError(error)
                })
        } catch (err) {
            setRegisterError(err.response?.data?.message)
        }
    }

    const deleteItem = (data) => {
        setTimeLineData(data)
        setBool(!bool)
    }

    const handleBannerDescription = (e) => {
        data.desc = e.target.getContent()
    }

    const onFileSelected = async (e) => {
        setIsDisabled(!isDisabled)
        // Get file
        const file = e.target.files[0]

        // Create storage ref
        const storageRef = app.storage().ref()
        const filePath = storageRef.child('images/' + file.name)

        // Upload file
        await filePath.put(file)
            .then(() => {
                //Se habilita el botón para subir el blog
                setDisabled(!disabled)
            })
            .catch(err => {console.log(err)})


        // Get file url
        const fileUrl = await filePath.getDownloadURL()
        data.logo = fileUrl
        setImageSuccess("Imagen subida correctamente")
        setIsDisabled(false)
    }

    useEffect(() => {
        const fetchData = async () => {
            const getTimeLineData = await getTimeLineBiocontrolled()
            setTimeLineData(getTimeLineData)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {bool && <EditItemModal hideModal={() => setBool(!bool)} element={modalData} deleteItem={(updateData) => deleteItem(updateData)} />}
            {timelineData?.length > 0 &&
                <section className="container-fluid EditContent EditContent-timeline">
                    <h2>Elminar elemento del TimeLine</h2>
                    <div className="row justify-content-around">
                        {timelineData?.map(el =>
                            <div className="col-5 EditCarousel__edit" onClick={() => showModal(el)}>
                                <img className="EditCarousel__img" src={el?.imgURL} onerror="this.src = 'https://firebasestorage.googleapis.com/v0/b/grupo-leti-fd84e.appspot.com/o/images%2Fno-image.png?alt=media&token=73bf7cd8-629d-4deb-b281-9e629fbfb752';" alt={el?.imgURL} />
                                <p dangerouslySetInnerHTML={{__html: el?.desc}} />
                            </div>
                        )}
                    </div>
                </section>}
            <section className="container-fluid EditContent">
                <h2>Añadir nuevo elemento al timeline</h2>
                <form className="AdminEdit__form" onSubmit={addTimeLineItem}>
                    <div className="row">
                        <div className="col-12 col-sm-3">
                        <p className="AdminEdit__form__label">
                                Imagen
                            </p>
                            <InputFile
                                value={data?.imgURL}
                                onChange={onFileSelected}
                                id="fileButton"
                                name="imgURL"
                                type="file"
                                placeholder={data?.imgURL}
                            />
                        </div>
                        <div className="col-12 col-sm-3">
                        <p className="AdminEdit__form__label">
                                Descripción
                            </p>
                            <Editor
                                initialValue={data?.desc}
                                onChange={handleBannerDescription}
                                apiKey={process.env.REACT_APP_API_TINY_CLOUD}
                                init={{
                                    height: 200,
                                    menubar: false,
                                    plugins: [
                                        'advlist autolink lists link image',
                                        'charmap print preview anchor help',
                                        'searchreplace visualblocks code',
                                        'insertdatetime media table paste wordcount'
                                    ],
                                    toolbar:
                                        'bold',
                                }}
                            />
                        </div>
                        <div className="col-12 col-sm-3">
                            <p className="AdminEdit__form__label">
                                Título botón
                            </p>
                            <InputWithLabel
                                value={data?.buttonTitle}
                                onBlur={onBlur}
                                onChange={onChange}
                                name="buttonTitle"
                                type="text"
                                cssStyle={`form-control ${touch.buttonTitle && error.buttonTitle ? "is-invalid" : ""}`}
                                placeholder="Ingresa Título botón"
                            />
                        </div>
                        <div className="col-12 col-sm-3">
                            <p className="AdminEdit__form__label">
                                Url Botón
                            </p>
                            <InputWithLabel
                                value={data?.buttonLink}
                                onBlur={onBlur}
                                onChange={onChange}
                                name="buttonLink"
                                type="text"
                                cssStyle={`form-control ${touch.buttonLink && error.buttonLink ? "is-invalid" : ""}`}
                                placeholder="Ingresa Url Botón"
                            />
                        </div>
                        <div className="col-12">
                            <Button cssStyle="leti-btn AdminEdit__form-leti-btn" >Añadir nuevo elemento</Button>
                        </div>

                    </div>
                    {registerError && <div className="alert alert-danger">{registerError}</div>}
                </form>
            </section>
        </>
    )
}

export default EditTimelineBiocontrolled
