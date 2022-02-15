import React, {useState, useEffect} from 'react'

import InputWithLabel from '../../../../Form/InputWithLabel/InputWithLabel'
import {getInfoCardsOurPeople, updateInfoCardsOurPeople} from '../../../../../services/ApiClient'
import DeleteItemModal from './DeleteItemModal/DeleteItemModal'
import {useFormState} from '../../../../../hooks/useFormState'
import InputFile from '../../../../Form/InputFile/InputFile'
import Button from '../../../../Form/FormButton/FormButton'
import {app} from '../../../../../services/firebase'
import Loader from '../../../../Loader/Loader'

function EditInfoCardsOurPeople() {

    const [registerError, setRegisterError] = useState(null)
    const [isDisabled, setIsDisabled] = useState(false)
    const [modalData, setModalData] = useState()
    const [ourOCData, setOurOCData] = useState()
    const [message, setMessage] = useState('')
    const [bool, setBool] = useState(false)
    const [imageSuccess, setImageSuccess] = useState('')

    const {state, onBlur, onChange} = useFormState(
        {
            data: {
                id: ourOCData?._id,
                mainTitle: ourOCData?.mainTitle,
                imgURL: ourOCData?.imgURL,
            },
            error: {
                mainTitle: true,
                imgURL: true,
            },
            touch: {},
        },
        {
            mainTitle: v => v.length,
            imgURL: v => v.length,
        }
    )

    const {data, error, touch} = state

    const showModal = (info) => {
        setModalData(info)
        setBool(!bool)
    }

    const deleteItem = (info) => {
        setOurOCData(info)
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
            })
            .catch(err => {console.log(err)})

        // Get file url
        const fileUrl = await filePath.getDownloadURL()
        data.imgURL = fileUrl
        setIsDisabled(false)
        error.imgURL = false
    }

    const updateICOurPeople = async (event) => {
        event.preventDefault()
        data.id = ourOCData[0]?._id

        console.log(data)

        if (Object.values(error).map(el => el).includes(false)) {
            try {
                await updateInfoCardsOurPeople(data)
                    .then(equipo => {
                        setOurOCData(equipo)
                        setMessage('Data atualizada exitosamente')
                    })
                    .catch(error => {
                        setRegisterError(error)
                    })
            } catch (err) {
                setRegisterError(err.response?.data?.message)
            }
        } else {
            setMessage('Por favor edite alguno de los campos')
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const getOurOCData = await getInfoCardsOurPeople()
            setOurOCData(getOurOCData)
            console.log(getOurOCData)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {isDisabled && <Loader message="Cargando imagen..." />}
            {bool && <DeleteItemModal hideModal={() => setBool(!bool)} data={modalData} deleteItem={(updateData) => deleteItem(updateData)} />}
            {ourOCData?.length > 0 &&
                <section className="container-fluid EditContent EditContent-timeline pt-5">
                    <h2>Equipos</h2>
                    <form className="AdminEdit__form" onSubmit={updateICOurPeople}>
                        <div className="row justify-content-around">
                            <div className="col-12 col-sm-6">
                                <p className="AdminEdit__form__label">
                                    Título
                                </p>
                                <InputWithLabel
                                    value={data?.mainTitle}
                                    onBlur={onBlur}
                                    onChange={onChange}
                                    name="mainTitle"
                                    type="text"
                                    cssStyle={`form-control ${touch.title && error.title ? "is-invalid" : ""}`}
                                    placeholder={ourOCData[0]?.mainTitle}
                                />
                            </div>
                            <div className="col-12 col-sm-6">
                                <p className="AdminEdit__form__label">
                                    Imagen
                                </p>
                                <InputFile
                                classStyle="mb-0"
                                    value={data?.imgURL}
                                    onChange={onFileSelected}
                                    id="fileButton"
                                    name="picpath"
                                    type="file"
                                    placeholder={ourOCData[0]?.imgURL}
                                />
                                {imageSuccess && <span className="AdminEdit__message mt-1">{imageSuccess}</span>}
                            </div>
                            <div className="col-12">
                                <Button cssStyle="leti-btn AdminEdit__form-leti-btn">Guardar cambios</Button>
                                {message && <span className="AdminEdit__message">{message}</span>}
                            </div>
                        </div>
                        <hr className="mt-5 mb-5" />
                        <div className="row justify-content-around mt-5 pt-5">
                            {ourOCData?.map(el =>
                                <div className="col-3 EditCarousel__edit logros" onClick={() => showModal(el)}>
                                    <h4 className="mt-3 mb-3">{el?.title}</h4>
                                    <p>{el?.info}</p>
                                </div>
                            )}
                        </div>
                    </form>
                    {registerError && <div className="alert alert-danger">{registerError}</div>}
                </section>
            }
        </>
    )
}

export default EditInfoCardsOurPeople
