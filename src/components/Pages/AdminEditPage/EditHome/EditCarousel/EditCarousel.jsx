import './EditCarousel.css'
import React, {useState, useEffect} from 'react'
import {useFormState} from '../../../../../hooks/useFormState'
import {getCarousel, addCarouselData} from '../../../../../services/ApiClient'
import InputWithLabel from '../../../../Form/InputWithLabel/InputWithLabel'
import Button from '../../../../Form/FormButton/FormButton'
import DeleteItemModal from './DeleteItemModal/DeleteItemModal'
import InputFile from '../../../../Form/InputFile/InputFile'
import {app} from '../../../../../services/firebase'


function EditCarousel() {

    const {state, onBlur, onChange} = useFormState(
        {
            data: {
                name: '',
                desc: '',
                img: '',
            },
            error: {
                name: false,
                desc: false,
                img: false,
            },
            touch: {},
        },
        {
            name: v => v.length,
            desc: v => v.length,
            img: v => v.length,
        }
    )

    const {data, error, touch} = state
    const [registerError, setRegisterError] = useState(null)
    const [modalData, setModalData] = useState()
    const [carouselData, setCarouselData] = useState()
    const [bool, setBool] = useState(false)
    const [disabled, setDisabled] = useState(true)

    const showModal = (data) => {
        setModalData(data)
        setBool(!bool)
    }

    const addCarouselItem = async (event) => {
        event.preventDefault()

        try {
            await addCarouselData(data)
                .then(carousel => {
                    setCarouselData(carousel)
                })
                .catch(error => {
                    setRegisterError(error)
                })
        } catch (err) {
            setRegisterError(err.response?.data?.message)
        }
    }

    const deleteItem = (data) => {
        setCarouselData(data)
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
                console.log('Uploaded')
                //Se habilita el botón para subir el blog
                setDisabled(!disabled)
            })
            .catch(err => {console.log(err)})


        // Get file url
        const fileUrl = await filePath.getDownloadURL()
        data.picPath = fileUrl
        console.log(fileUrl)
    }

    useEffect(() => {
        const fetchData = async () => {
            const getCarouselData = await getCarousel()
            setCarouselData(getCarouselData)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {bool && <DeleteItemModal hideModal={() => setBool(!bool)} data={modalData} deleteItem={(updateData) => deleteItem(updateData)} />}
            {carouselData?.length > 0 &&
                <section className="container-fluid EditContent">
                    <h2>Editar elemento del carrusel</h2>
                    <div className="row justify-content-around">
                        {carouselData?.map(el =>
                            <div className="col-1 EditCarousel__trash" onClick={() => showModal(el)}>
                                <img className="EditCarousel__img" src={"./images/" + el.name + ".png"} alt={el.name} />
                                <p>{el.name}</p>
                            </div>
                        )}
                    </div>
                </section>}
            <section className="container-fluid EditContent">
                <h2>Añadir nuevo producto al carrusel</h2>
                <form className="AdminEdit__form" onSubmit={addCarouselItem}>
                    <div className="row">
                        <div className="col-12 col-sm-4">
                            <p className="AdminEdit__form__label">
                                Nombre del producto
                            </p>
                            <InputWithLabel
                                value={data?.name}
                                onBlur={onBlur}
                                onChange={onChange}
                                name="name"
                                type="text"
                                className={`form-control ${touch.name && error.name ? "is-invalid" : ""}`}
                                placeholder="Ingresa descripción del producto"
                            />
                        </div>
                        <div className="col-12 col-sm-4">
                            <p className="AdminEdit__form__label">
                                Descripción del producto
                            </p>
                            <InputWithLabel
                                value={data?.desc}
                                onBlur={onBlur}
                                onChange={onChange}
                                name="desc"
                                type="text"
                                className={`form-control ${touch.desc && error.desc ? "is-invalid" : ""}`}
                                placeholder="Ingresa descripción del producto"
                            />
                        </div>
                        <div className="col-12 col-sm-4">
                            <p className="AdminEdit__form__label">
                                Imagen del producto
                            </p>
                            <InputFile
                                value={data.picpath}
                                onChange={onFileSelected}
                                id="fileButton"
                                name="picpath"
                                type="file"
                                placeholder="Ingresa imagen de portada del paciente"
                            />
                        </div>
                        <div className="col-12">
                            <Button className="leti-btn AdminEdit__form-leti-btn" disabled={disabled}>Añadir nuevo producto</Button>
                        </div>

                    </div>
                    {registerError && <div className="alert alert-danger">{registerError}</div>}
                </form>
            </section>
        </>
    )
}

export default EditCarousel
