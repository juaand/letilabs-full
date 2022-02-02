
import React, {useState, useEffect} from 'react'
import {useFormState} from '../../../../../hooks/useFormState'
import {getGallery, addGalleryData} from '../../../../../services/ApiClient'
import InputWithLabel from '../../../../Form/InputWithLabel/InputWithLabel'
import Button from '../../../../Form/FormButton/FormButton'
import InputFile from '../../../../Form/InputFile/InputFile'
import {app} from '../../../../../services/firebase'
import EditElementsModal from './EditElementsModal/EditElementsModal'

function EditGallery() {

    const {state, onBlur, onChange} = useFormState(
        {
            data: {
                mainTitle: '',
                title: '',
                imgPath: '',
            },
            error: {
                mainTitle: false,
                title: false,
                imgPath: false,
            },
            touch: {},
        },
        {
            mainTitle: v => v.length,
            title: v => v.length,
            imgPath: v => v.length,
        }
    )

    const {data, error, touch} = state
    const [registerError, setRegisterError] = useState(null)
    const [modalData, setModalData] = useState()
    const [galleryData, setGalleryData] = useState()
    const [bool, setBool] = useState(false)
    const [disabled, setDisabled] = useState(true)

    const showModal = (data) => {
        setModalData(data)
        setBool(!bool)
    }

    const addGalleryItem = async (event) => {
        event.preventDefault()

        try {
            await addGalleryData(data)
                .then(gallery => {
                    setGalleryData(gallery)
                })
                .catch(error => {
                    setRegisterError(error)
                })
        } catch (err) {
            setRegisterError(err.response?.data?.message)
        }
    }

    const deleteItem = (data) => {
        setGalleryData(data)
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
        data.imgPath = fileUrl
        console.log(fileUrl)
    }

    useEffect(() => {
        const fetchData = async () => {
            const getGalleryData = await getGallery()
            setGalleryData(getGalleryData)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {bool && <EditElementsModal hideModal={() => setBool(!bool)} element={modalData} deleteItem={(updateData) => deleteItem(updateData)} />}
            {galleryData?.length > 0 &&
                <section className="container-fluid EditContent">
                    <h2>Editar elemento de la galería</h2>
                    <div className="row justify-content-around">
                        {galleryData?.map(el =>
                            <div className="col-1 EditCarousel__trash" onClick={() => showModal(el)}>
                                <img className="EditCarousel__img" src={"./images/" + el.imgPath} alt={el.imgPath} />
                                <p>{el.title}</p>
                            </div>
                        )}
                    </div>
                </section>}
            <section className="container-fluid EditContent">
                <h2>Añadir nuevo elemento a la Galería</h2>
                <form className="AdminEdit__form" onSubmit={addGalleryItem}>
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
                                cssStyle={`form-control ${touch.name && error.name ? "is-invalid" : ""}`}
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
                                cssStyle={`form-control ${touch.desc && error.desc ? "is-invalid" : ""}`}
                                placeholder="Ingresa descripción del producto"
                            />
                        </div>
                        <div className="col-12 col-sm-4">
                            <p className="AdminEdit__form__label">
                                Imagen del producto
                            </p>
                            <InputFile
                                value={data?.imgPath}
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

export default EditGallery
