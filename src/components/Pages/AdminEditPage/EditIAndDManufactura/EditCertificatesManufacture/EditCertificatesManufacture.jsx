import React, {useState, useEffect} from 'react'

import {getCertificatesManufacture, deleteCertificate, updateCertificatesManufactureData} from '../../../../../services/ApiClient'
import {useFormState} from '../../../../../hooks/useFormState'
import InputFile from '../../../../Form/InputFile/InputFile'
import Button from '../../../../Form/FormButton/FormButton'
import {app} from '../../../../../services/firebase'

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
    const [certificatesManufactureData, setCertificatesManufactureData] = useState()
    const [disabled, setDisabled] = useState(true)


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

    const deleteItem = async (id) => {
        const getUpdated = await deleteCertificate(id)
        setCertificatesManufactureData(getUpdated)
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
            {certificatesManufactureData?.length > 0 &&
                <section className="container-fluid EditContent EditContent-timeline">
                    <h2>Eliminar certificado</h2>
                    <div className="row justify-content-around">
                        {certificatesManufactureData?.map(el =>
                            <div className="col-3 EditUnidades__trash" onClick={() => deleteItem(el._id)}>
                                <img className="EditCarousel__img" src={el.imgURL} alt={el.title} />
                            </div>
                        )}
                    </div>
                </section>}
            <section className="container-fluid EditContent">
                <h2>Añadir nuevo certificado</h2>
                <form className="AdminEdit__form" onSubmit={updateCertificatesManufactureItem}>
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
