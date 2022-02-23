
import React, {useState, useEffect} from 'react'
import {useFormState} from '../../../../../hooks/useFormState'
import {getCarrouselTA, updateCarrouselTA} from '../../../../../services/ApiClient'
import InputWithLabel from '../../../../Form/InputWithLabel/InputWithLabel'
import Button from '../../../../Form/FormButton/FormButton'
import InputFile from '../../../../Form/InputFile/InputFile'
import {app} from '../../../../../services/firebase'
import EditElementsModal from './EditElementsModal/EditElementsModal'

function EditCarrouselTA() {

    const {state, onBlur, onChange} = useFormState(
        {
            data: {
                mainTitle: '',
                title: '',
                imgURL: '',
                desc: '',
            },
            error: {
                mainTitle: false,
                title: false,
                imgURL: false,
                desc: false,
            },
            touch: {},
        },
        {
            mainTitle: v => v.length,
            title: v => v.length,
            imgURL: v => v.length,
            desc: v => v.length,
        }
    )

    const {data, error, touch} = state
    const [registerError, setRegisterError] = useState(null)
    const [modalData, setModalData] = useState()
    const [carrouselTAData, setCarrouselTAData] = useState()
    const [bool, setBool] = useState(false)
    const [disabled, setDisabled] = useState(true)

    const showModal = (data) => {
        setModalData(data)
        setBool(!bool)
    }

    const updateCarrouselTAItem = async (event) => {
        event.preventDefault()

        try {
            await updateCarrouselTA(data)
                .then(carrouselTA => {
                    setCarrouselTAData(carrouselTA)
                })
                .catch(error => {
                    setRegisterError(error)
                })
        } catch (err) {
            setRegisterError(err.response?.data?.message)
        }
    }

    const deleteItem = (data) => {
        setCarrouselTAData(data)
        setBool(!bool)
    }

    const onFileSelected = async (e) => {
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
        data.imgURL = fileUrl
        // console.log(fileUrl)
    }

    useEffect(() => {
        const fetchData = async () => {
            const getCarrouselTAData = await getCarrouselTA()
            setCarrouselTAData(getCarrouselTAData)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {bool && <EditElementsModal hideModal={() => setBool(!bool)} element={modalData} deleteItem={(updateData) => deleteItem(updateData)} />}
            {carrouselTAData?.length > 0 &&
                <section className="container-fluid EditContent EditContent-timeline">
                    <h2>Editar elemento del carrusel</h2>
                    <div className="row justify-content-around">
                        {carrouselTAData?.map(el =>
                            <div className="col-1 EditCarousel__edit" onClick={() => showModal(el)}>
                                <img className="EditCarousel__img" src={el.imgURL} onError="this.src = 'https://firebasestorage.googleapis.com/v0/b/grupo-leti-fd84e.appspot.com/o/images%2Fno-image.png?alt=media&token=73bf7cd8-629d-4deb-b281-9e629fbfb752';" alt={el.imgURL} />
                                <p>{el.title}</p>
                            </div>
                        )}
                    </div>
                </section>}
            <section className="container-fluid EditContent">
                <h2>Añadir nuevo elemento a la Galería</h2>
                <form className="AdminEdit__form" onSubmit={updateCarrouselTAItem}>
                    <div className="row">
                        <div className="col-12 col-sm-4">
                            <p className="AdminEdit__form__label">
                                Título Principal
                            </p>
                            <InputWithLabel
                                value={data?.mainTitle}
                                onBlur={onBlur}
                                onChange={onChange}
                                name="mainTitle"
                                type="text"
                                cssStyle={`form-control ${touch.mainTitle && error.mainTitle ? "is-invalid" : ""}`}
                                placeholder="Ingresa descripción del producto"
                            />
                        </div>
                        <div className="col-12 col-sm-4">
                            <p className="AdminEdit__form__label">
                                Título
                            </p>
                            <InputWithLabel
                                value={data?.title}
                                onBlur={onBlur}
                                onChange={onChange}
                                name="title"
                                type="text"
                                cssStyle={`form-control ${touch.title && error.title ? "is-invalid" : ""}`}
                                placeholder="Ingresa descripción del producto"
                            />
                        </div>
                        <div className="col-12 col-sm-4">
                            <p className="AdminEdit__form__label">
                                Descripción Área
                            </p>
                            <InputWithLabel
                                value={data?.desc}
                                onBlur={onBlur}
                                onChange={onChange}
                                name="desc"
                                type="text"
                                cssStyle={`form-control ${touch.desc && error.desc ? "is-invalid" : ""}`}
                                placeholder="Ingresa descripción del producto"
                            />
                        </div>
                        <div className="col-12">
                            <p className="AdminEdit__form__label">
                                Imagen Área
                            </p>
                            <InputFile
                                value={data?.imgURL}
                                onChange={onFileSelected}
                                id="fileButton"
                                name="picpath"
                                type="file"
                            />
                        </div>
                        <div className="col-12">
                            <Button cssStyle="leti-btn AdminEdit__form-leti-btn" >Añadir nuevo producto</Button>
                        </div>

                    </div>
                    {registerError && <div className="alert alert-danger">{registerError}</div>}
                </form>
            </section>
        </>
    )
}

export default EditCarrouselTA
