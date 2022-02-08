import React, {useState, useEffect} from 'react'
import {useFormState} from '../../../../../hooks/useFormState'
import {getCertificatesManufacture, updateCertificatesManufactureData} from '../../../../../services/ApiClient'
import InputWithLabel from '../../../../Form/InputWithLabel/InputWithLabel'
import Button from '../../../../Form/FormButton/FormButton'
import InputFile from '../../../../Form/InputFile/InputFile'
import {app} from '../../../../../services/firebase'
import EditElementsModal from './EditElementsModal/EditelementsModal'


function EditCertificatesManufacture() {

    const {state, onBlur, onChange} = useFormState(
        {
            data: {
                title: '',
                imgURL: '',
                desc: '',
            },
            error: {
                title: false,
                imgURL: false,
                desc: false,
            },
            touch: {},
        },
        {
            title: v => v.length,
            imgURL: v => v.length,
            desc: v => v.length,
        }
    )

    const {data, error, touch} = state
    const [registerError, setRegisterError] = useState(null)
    const [modalData, setModalData] = useState()
    const [certificatesManufactureData, setCertificatesManufactureData] = useState()
    const [bool, setBool] = useState(false)
    const [disabled, setDisabled] = useState(true)

    const showModal = (data) => {
        setModalData(data)
        setBool(!bool)
    }

    const updateCertificatesManufactureItem = async (event) => {
        event.preventDefault()

        try {
            await updateCertificatesManufactureData(data)
                .then(certificatesManufacture => {
                    setCertificatesManufactureData(certificatesManufacture)
                })
                .catch(error => {
                    setRegisterError(error)
                })
        } catch (err) {
            setRegisterError(err.response?.data?.message)
        }
    }

    const deleteItem = (data) => {
        setCertificatesManufactureData(data)
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
                // console.log('Uploaded')
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
            const getCertificatesManufactureData = await getCertificatesManufacture()
            setCertificatesManufactureData(getCertificatesManufactureData)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {bool && <EditElementsModal hideModal={() => setBool(!bool)} element={modalData} deleteItem={(updateData) => deleteItem(updateData)} />}
            {certificatesManufactureData?.length > 0 &&
                <section className="container-fluid EditContent">
                    <h2>Editar elemento del CertificatesManufacture</h2>
                    <div className="row justify-content-around">
                        {certificatesManufactureData?.map(el =>
                            <div className="col-1 EditCarousel__trash" onClick={() => showModal(el)}>
                                <img className="EditCarousel__img" src={"./images/" + el.imgURL} alt={el.title} />
                                <p>{el.title}</p>
                            </div>
                        )}
                    </div>
                </section>}
            <section className="container-fluid EditContent">
                <h2>Añadir nuevo producto al CertificatesManufacture</h2>
                <form className="AdminEdit__form" onSubmit={updateCertificatesManufactureItem}>
                    <div className="row">
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
                                placeholder="Ingresa año"
                            />
                        </div>
                        <div className="col-12 col-sm-4">
                            <p className="AdminEdit__form__label">
                                Imagen
                            </p>
                            <InputFile
                                value={data?.imgURL}
                                onChange={onFileSelected}
                                id="fileButton"
                                name="picpath"
                                type="file"
                                placeholder="Selecciona una imagen"
                            />
                        </div>
                        <div className="col-12 col-sm-4">
                            <p className="AdminEdit__form__label">
                                Descripción
                            </p>
                            <InputWithLabel
                                value={data?.desc}
                                onBlur={onBlur}
                                onChange={onChange}
                                name="desc"
                                type="text"
                                cssStyle={`form-control ${touch.desc && error.desc ? "is-invalid" : ""}`}
                                placeholder="Ingresa descripción"
                            />
                        </div>
                        <div className="col-12">
                            <Button cssStyle="leti-btn AdminEdit__form-leti-btn" >Añadir nuevo año</Button>
                        </div>

                    </div>
                    {registerError && <div className="alert alert-danger">{registerError}</div>}
                </form>
            </section>
        </>
    )
}

export default EditCertificatesManufacture
