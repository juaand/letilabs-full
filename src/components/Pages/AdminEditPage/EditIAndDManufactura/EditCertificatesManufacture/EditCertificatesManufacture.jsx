import React, {useState, useEffect} from 'react'
import {Editor} from '@tinymce/tinymce-react'

import {getCertificatesManufacture, updateCertificatesManufactureData, createCertificate, createContent} from '../../../../../services/ApiClient'
import {useFormState} from '../../../../../hooks/useFormState'
import {app} from '../../../../../services/firebase'

import InputWithLabel from '../../../../Form/InputWithLabel/InputWithLabel'
import InputFile from '../../../../Form/InputFile/InputFile'
import Button from '../../../../Form/FormButton/FormButton'
import EditItemModal from './EditItemModal/EditItemModal'
import Loader from '../../../../Loader/Loader'

function EditCertificatesManufacture() {

    const [certificatesManufactureData, setCertificatesManufactureData] = useState([])
    const [modalData, setModalData] = useState([])

    const [registerError, setRegisterError] = useState(null)
    const [isDisabled, setIsDisabled] = useState(false)
    const [disabled, setDisabled] = useState(true)
    const [bool, setBool] = useState(false)

    const [imageSuccess, setImageSuccess] = useState('')
    const [infoMessage, setInfoMessage] = useState('')
    const [message, setMessage] = useState('')


    const {state, onChange} = useFormState(
        {
            data: {
                title: certificatesManufactureData[0]?.title,
                imgURL: '',
                desc: certificatesManufactureData[0]?.desc,
            },
            error: {
                title: true,
                imgURL: true,
                desc: true,
            },
            touch: {},
        },
        {
            title: v => v.length,
            imgURL: v => v.length,
            desc: v => v.length,
        }
    )

    const {data, error} = state

    const createCertificatesManufactureItem = async (event) => {
        event.preventDefault()
        data.title = certificatesManufactureData[0]?.title
        data.desc = certificatesManufactureData[0]?.desc

        if (error.imgURL === false) {
            try {
                await createCertificate(data)
                    .then(certificatesManufacture => {
                        setCertificatesManufactureData(certificatesManufacture)
                    })
                    .catch(error => {
                        setRegisterError(error)
                    })
            } catch (err) {
                setRegisterError(err.response?.data?.message)
            }
        } else {
            setMessage('Por favor seleccione una imagen')
        }
    }

    const contentData = {
        content: '',
        url: '/manufactura',
        name: 'Manufactura',
        type: 'Manufactura certificados',
    }

    const updateCertificateInfo = async (event) => {
        event.preventDefault()

        if (contentData?.content?.length > 0) {
            createContent(contentData)
        }

        if (error.title === false || error.desc === false) {
            /* eslint-disable no-self-assign */
            data.title ? data.title = data.title : data.title = certificatesManufactureData[0]?.title
            data.desc ? data.desc = data.desc : data.desc = certificatesManufactureData[0]?.desc

            try {
                await updateCertificatesManufactureData(data)
                    .then(certificatesManufacture => {
                        setCertificatesManufactureData(certificatesManufacture)
                        setInfoMessage('Datos actualizados exitosamente')
                    })
                    .catch(error => {
                        setRegisterError(error)
                    })
            } catch (err) {
                setRegisterError(err.response?.data?.message)
            }
        } else {
            setInfoMessage('Por favor edite alguno de los campos')
        }
    }

    const handleCerificateDescChange = (e) => {
        data.desc = e.target.getContent()
        contentData.content = e.target.getContent({format: "text"})
        error.desc = false
    }

    const showModal = (info) => {
        setModalData(info)
        setBool(!bool)
    }

    const hideModal = (info) => {
        setCertificatesManufactureData(info)
        setBool(!bool)
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
                setImageSuccess("Imagen subida correctamente")
                setDisabled(!disabled)
            })
            .catch(err => {console.log(err)})


        // Get file url
        const fileUrl = await filePath.getDownloadURL()
        data.imgURL = fileUrl
        setIsDisabled(false)
        error.imgURL = false
    }

    useEffect(() => {
        const fetchData = async () => {
            const getCertificatesManufactureData = await getCertificatesManufacture()
            setCertificatesManufactureData(getCertificatesManufactureData)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {isDisabled && <Loader message="Cargando imagen..." />}
            {bool && <EditItemModal hideModal={(info) => hideModal(info)} infodata={modalData} closeModal={() => setBool(!bool)} />}
            <section className="container-fluid EditContent">
                <h2>Editar info certificados</h2>
                <form className="AdminEdit__form" onSubmit={updateCertificateInfo}>
                    <div className="row">
                        <div className="col-12 col-sm-6">
                            <p className="AdminEdit__form__label">
                                Título
                            </p>
                            <InputWithLabel
                                value={data?.title}
                                onChange={onChange}
                                name="title"
                                type="text"
                                cssStyle="form-control"
                                placeholder={certificatesManufactureData[0]?.title}
                            />
                        </div>
                        <div className="col-12 col-sm-6">
                            <p className="AdminEdit__form__label">
                                Descripción
                            </p>
                            <Editor
                                initialValue={certificatesManufactureData[0]?.desc}
                                onChange={handleCerificateDescChange}
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
                        <div className="col-12">
                            <Button cssStyle="leti-btn AdminEdit__form-leti-btn" >Editar info</Button>
                            {infoMessage && <span className="AdminEdit__message">{infoMessage}</span>}
                        </div>

                    </div>
                    {registerError && <div className="alert alert-danger">{registerError}</div>}
                </form>
            </section>
            {certificatesManufactureData?.length > 0 &&
                <section className="container-fluid EditContent EditContent-timeline">
                    <h2>Editar certificado</h2>
                    <div className="row justify-content-around">
                        {certificatesManufactureData?.map(el =>
                            <div className="col-3 EditCarousel__edit" onClick={() => showModal(el)}>
                                <img className="EditCarousel__img" src={el.imgURL} onError="this.src = 'https://firebasestorage.googleapis.com/v0/b/grupoleti.appspot.com/o/images%2Fno-image.png?alt=media&token=6e518b16-dc11-46e3-83e8-ae4b84a18293';" alt={el.title} />
                            </div>
                        )}
                    </div>
                </section>
            }
            <section className="container-fluid EditContent">
                <h2>Añadir nuevo certificado</h2>
                <form className="AdminEdit__form" onSubmit={createCertificatesManufactureItem}>
                    <div className="row">
                        <div className="col-12">
                            <p className="AdminEdit__form__label">
                                Certificado
                            </p>
                            <InputFile
                                value={data?.imgURL}
                                onChange={onFileSelected}
                                id="fileButton"
                                name="picpath"
                                type="file"
                                placeholder="Selecciona una imagen"
                            />
                            {imageSuccess && <span className="AdminEdit__message mt-1">{imageSuccess}</span>}
                        </div>
                        <div className="col-12">
                            <Button cssStyle="leti-btn AdminEdit__form-leti-btn" >Añadir nuevo certificado</Button>
                            {message && <span className="AdminEdit__message">{message}</span>}
                        </div>

                    </div>
                    {registerError && <div className="alert alert-danger">{registerError}</div>}
                </form>
            </section>
        </>
    )
}

export default EditCertificatesManufacture
