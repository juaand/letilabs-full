import React, {useState, useEffect} from 'react'

import {app} from '../../../../../services/firebase'
import {useFormState} from '../../../../../hooks/useFormState'
import {getNewsTitles, updateNewsTitles} from '../../../../../services/ApiClient'
import InputWithLabel from '../../../../Form/InputWithLabel/InputWithLabel'
import Button from '../../../../Form/FormButton/FormButton'
import InputFile from '../../../../Form/InputFile/InputFile'
import Loader from '../../../../Loader/Loader'

function EditNewsTitles() {

    const [fileSizeMessage, setFileSizeMessage] = useState('')
    const [titlesdata, setTitlesData] = useState()
    const [isDisabled, setIsDisabled] = useState(false)
    const [message, setMessage] = useState('')

    const {state, onBlur, onChange} = useFormState(
        {
            data: {
                id: '',
                lastestTitle: titlesdata?.lastestTitle,
                mostTitle: titlesdata?.mostTitle,
                searchTitle: titlesdata?.searchTitle,
                picPath: titlesdata?.picPath,
            },
            error: {
                lastestTitle: true,
                mostTitle: true,
                searchTitle: true,
                picPath: true,
            },
            touch: {},
        },
        {
            lastestTitle: v => v.length,
            mostTitle: v => v.length,
            searchTitle: v => v.length,
            picPath: v => v.length,
        }
    )

    const {data, error, touch} = state
    const [registerError, setRegisterError] = useState(null)


    const updateTitles = async (event) => {
        event.preventDefault()
        data.id = titlesdata.id

        if (Object.values(error).map(el => el).includes(false)) {
            try {
                await updateNewsTitles(data)
                    .then(titles => {
                        setTitlesData(titles)
                        setMessage('Títulos actualizados exitosamente')
                    })
                    .catch(error => {
                        setRegisterError(error)
                    })
            } catch (err) {
                setRegisterError(err.response?.data?.message)
            }
        } else {
            setMessage('Por favor complete alguno de los campos')
        }
    }

    const onFileSelected = async (e) => {

        // Get file
        const file = e.target.files[0]

        if (file.size > 300000) {
            setFileSizeMessage("El tamaño de la imagen excede el máximo permitido (300KB), por favor optimícela y vuelva a intentar")
        } else {
            setIsDisabled(!isDisabled)
            setFileSizeMessage('')
            // Create storage ref
            const storageRef = app.storage().ref()
            const filePath = storageRef.child('images/' + file.name)

            // Upload file
            await filePath.put(file)
                .then(() => {
                    setMessage("Imagen subida correctamente")
                })
                .catch(err => {console.log(err)})

            // Get file url
            const fileUrl = await filePath.getDownloadURL()
            data.picPath = fileUrl
            setIsDisabled(false)
            error.picPath = false
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const getTitlesData = await getNewsTitles()
            setTitlesData(getTitlesData)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {isDisabled && <Loader message="Cargando imagen..." />}
            <section className="container-fluid EditContent">
                <h2>Títulos Noticias</h2>
                <form className="AdminEdit__form" onSubmit={updateTitles}>
                    <div className="row">
                        <div className="col-12 col-sm-4">
                            <p className="AdminEdit__form__label">
                                Título <strong>{titlesdata?.lastestTitle}</strong>
                            </p>
                            <InputWithLabel
                                value={data?.lastestTitle}
                                onBlur={onBlur}
                                onChange={onChange}
                                name="lastestTitle"
                                type="text"
                                cssStyle={`form-control mb-0 ${touch.lastestTitle && error.lastestTitle ? "is-invalid" : ""}`}
                                placeholder={titlesdata?.lastestTitle}
                            />
                        </div>
                        <div className="col-12 col-sm-4">
                            <p className="AdminEdit__form__label">
                                Título <strong>{titlesdata?.mostTitle}</strong>
                            </p>
                            <InputWithLabel
                                value={data?.mostTitle}
                                onBlur={onBlur}
                                onChange={onChange}
                                name="mostTitle"
                                type="text"
                                cssStyle={`form-control mb-0 ${touch.mostTitle && error.mostTitle ? "is-invalid" : ""}`}
                                placeholder={titlesdata?.mostTitle}
                            />
                        </div>
                        <div className="col-12 col-sm-4">
                            <p className="AdminEdit__form__label">
                                Título <strong>{titlesdata?.searchTitle}</strong>
                            </p>
                            <InputWithLabel
                                value={data?.searchTitle}
                                onBlur={onBlur}
                                onChange={onChange}
                                name="searchTitle"
                                type="text"
                                cssStyle={`form-control mb-0 ${touch.searchTitle && error.searchTitle ? "is-invalid" : ""}`}
                                placeholder={titlesdata?.searchTitle}
                            />
                        </div>
                        <div className="col-12">
                            <div className="col-12 EditElementsModal__img">
                                <img src={titlesdata?.picPath} onError="this.src = 'https://firebasestorage.googleapis.com/v0/b/grupoleti.appspot.com/o/images%2Fno-image.png?alt=media&token=6e518b16-dc11-46e3-83e8-ae4b84a18293';" alt="Noticias Leti" />

                                <InputFile
                                    value={data?.picPath}
                                    onChange={onFileSelected}
                                    id="fileButton"
                                    name="urlToPic"
                                    type="file"
                                    label="Seleccionar imagen"
                                />
                            </div>
                        </div>
                        {
                            fileSizeMessage &&
                            <div className="col-12">
                                <small>{fileSizeMessage}</small>
                            </div>
                        }
                        <div className="col-12">
                            <Button cssStyle={`leti-btn AdminEdit__form-leti-btn ${isDisabled && 'disabled'}`} >Guardar cambios</Button>
                            {message && <span className="AdminEdit__message">{message}</span>}
                        </div>

                    </div>
                    {registerError && <div className="alert alert-danger">{registerError}</div>}
                </form>
            </section>
        </>
    )
}

export default EditNewsTitles
