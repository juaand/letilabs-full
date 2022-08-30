import React, {useState, useEffect} from 'react'
import {useFormState} from '../../../../../hooks/useFormState'
import {getInfoCardsOurPhilosophy, createPillar, createContent} from '../../../../../services/ApiClient'
import {app} from '../../../../../services/firebase'
import Button from '../../../../Form/FormButton/FormButton'
import InputFile from '../../../../Form/InputFile/InputFile'
import InputWithLabel from '../../../../Form/InputWithLabel/InputWithLabel'
import Loader from '../../../../Loader/Loader'
import EditItemModal from './EditItemModal/EditItemModal'

function EditInfoCardsOurPhilosophy() {
    const [fileSizeMessage, setFileSizeMessage] = useState('')
    const [modalData, setModalData] = useState()
    const [ourOCData, setOurOCData] = useState()
    const [bool, setBool] = useState(false)

    const [imageSuccess, setImageSuccess] = useState('')
    const [isDisabled, setIsDisabled] = useState(false)
    const [message, setMessage] = useState('')

    const {state, onBlur, onChange} = useFormState(
        {
            data: {
                title: '',
                picPath: '',
            },
            error: {
                title: true,
                picPath: true,
            },
            touch: {},
        },
        {
            title: v => v.length,
            picPath: v => v.length,
        }
    )

    const {data, error, touch} = state
    const [registerError, setRegisterError] = useState(null)

    const showModal = (info) => {
        setModalData(info)
        setBool(!bool)
    }

    const hideModal = (info) => {
        setOurOCData(info)
        setBool(!bool)
    }

    const deleteItem = (info) => {
        setOurOCData(info)
        setBool(!bool)
    }

    const contentData = {
        content: data?.title,
        url: '/nuestra-filosofia',
        name: 'Nuestra filosofía',
        type: '',
    }

    const addPillar = async (event) => {
        event.preventDefault()

        if (contentData?.content?.length > 0) {
            contentData.type = `Nuestra filosofía - ${data?.title}`
            createContent(contentData)
        }

        if (error.title === false && error.picPath === false) {
            const newPillar = await createPillar(data)
            setOurOCData(newPillar)
            setMessage('Pilar creado exitosamente')
            setRegisterError(null)
        } else {
            setMessage('Por favor complete todos los campos')
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
                    // console.log('Uploaded')
                })
                .catch(err => {console.log(err)})

            // Get file url
            const fileUrl = await filePath.getDownloadURL()
            data.picPath = fileUrl
            setImageSuccess("Imagen subida correctamente")
            setIsDisabled(false)
            error.picPath = false
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const getOurOCData = await getInfoCardsOurPhilosophy()
            setOurOCData(getOurOCData)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {isDisabled && <Loader message="Cargando imagen..." />}
            {bool && <EditItemModal hideModal={(data) => hideModal(data)} infodata={modalData} deleteItem={(updateData) => deleteItem(updateData)} closeModal={() => setBool(!bool)} />}
            {ourOCData?.length > 0 &&
                <section className="container-fluid EditContent EditContent-timeline">
                    <h2>Editar pilares</h2>
                    <div className="row justify-content-around">
                        {ourOCData?.map(el =>
                            <div className="col-sm-1 col-6 EditCarousel__edit" onClick={() => showModal(el)}>
                                <img src={el?.picPath} onError="this.src = 'https://firebasestorage.googleapis.com/v0/b/grupoleti.appspot.com/o/images%2Fno-image.png?alt=media&token=6e518b16-dc11-46e3-83e8-ae4b84a18293';" alt={el?.title} />
                                <p>{el?.title}</p>
                            </div>
                        )}
                    </div>
                </section>
            }
            <section className="container-fluid EditContent">
                <h2>Añadir nuevo pilar</h2>
                <div className="row justify-content-around">
                    <form className="AdminEdit__form" onSubmit={addPillar}>
                        <div className="row">
                            <div className="col-12 col-sm-6">
                                <p className="AdminEdit__form__label">
                                    Imagen
                                </p>
                                <InputFile
                                    onChange={onFileSelected}
                                    id="fileButton"
                                    name="picPath"
                                    type="file"
                                />
                                {imageSuccess && <small className="img-success">{imageSuccess}</small>}
                            </div>
                            <div className="col-12 col-sm-6">
                                <p className="AdminEdit__form__label">
                                    Título
                                </p>
                                <InputWithLabel
                                    onBlur={onBlur}
                                    onChange={onChange}
                                    name="title"
                                    type="text"
                                    cssStyle={`form-control mb-0 ${touch.title && error.title ? "is-invalid" : ""}`}
                                    placeholder="Ingresa título del pilar"
                                />
                            </div>
                            {
                                fileSizeMessage &&
                                <div className="col-12">
                                    <small>{fileSizeMessage}</small>
                                </div>
                            }
                            <div className="col-12">
                                <Button cssStyle={`leti-btn AdminEdit__form-leti-btn mt-5 ${isDisabled && 'disabled'}`}>Crear pilar</Button>
                                {message && <span className="AdminEdit__message">{message}</span>}
                            </div>

                        </div>
                        {registerError && <div className="alert alert-danger">{registerError}</div>}
                    </form>
                </div>
            </section>
        </>
    )
}

export default EditInfoCardsOurPhilosophy
