import React, {useState, useEffect} from 'react'
import {useFormState} from '../../../../../hooks/useFormState'
import {getInfoCardsOurPhilosophy, createPillar} from '../../../../../services/ApiClient'
import {app} from '../../../../../services/firebase'
import Button from '../../../../Form/FormButton/FormButton'
import InputFile from '../../../../Form/InputFile/InputFile'
import InputWithLabel from '../../../../Form/InputWithLabel/InputWithLabel'
import Loader from '../../../../Loader/Loader'
import EditItemModal from './EditItemModal/EditItemModal'

function EditInfoCardsOurPhilosophy() {
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

    const addPillar = async (event) => {
        event.preventDefault()

        if (Object.values(error).map(el => el).includes(false)) {
            const newPillar = await createPillar(data)
            setOurOCData(newPillar)
            setMessage('Pilar creado exitosamente')
            setRegisterError(null)
        } else {
            setMessage('Por favor complete todos los campos')
        }

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
                // console.log('Uploaded')
            })
            .catch(err => {console.log(err)})

        // Get file url
        const fileUrl = await filePath.getDownloadURL()
        data.picPath = fileUrl
        setImageSuccess("Imagen subida correctamente")
        setIsDisabled(false)
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
            {bool && <EditItemModal hideModal={(data) => hideModal(data)} infodata={modalData} deleteItem={(updateData) => deleteItem(updateData)} />}
            {ourOCData?.length > 0 &&
                <section className="container-fluid EditContent EditContent-timeline">
                    <h2>Editar pilares</h2>
                    <div className="row justify-content-around">
                        {ourOCData?.map(el =>
                            <div className="col-1 EditCarousel__edit" onClick={() => showModal(el)}>
                                <img src={el?.picPath} alt={el?.title} />
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
                            <div className="col-12">
                                <Button cssStyle={`leti-btn AdminEdit__form-leti-btn ${isDisabled && 'disabled'}`}>Crear pilar</Button>
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
