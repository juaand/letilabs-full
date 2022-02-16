import React, {useState, useEffect} from 'react'

import {getEquipoOurPeople, updateEquipoOurPeople} from '../../../../../services/ApiClient'
import InputWithLabel from '../../../../Form/InputWithLabel/InputWithLabel'
import {useFormState} from '../../../../../hooks/useFormState'
import InputFile from '../../../../Form/InputFile/InputFile'
import Button from '../../../../Form/FormButton/FormButton'
import {app} from '../../../../../services/firebase'
import Loader from '../../../../Loader/Loader'

function EditEquipoOurPeople() {

    const [imageSuccess, setImageSuccess] = useState('')
    const [isDisabled, setIsDisabled] = useState(false)
    const [bannerData, setBannerData] = useState()
    const [message, setMessage] = useState('')

    const {state, onBlur, onChange} = useFormState(
        {
            data: {
                id: '',
                title: bannerData?.title,
                description: bannerData?.description,
                person: bannerData?.person,
                imgURL: bannerData?.imgURL,
                buttonTitle: bannerData?.buttonTitle,
                buttonLink: bannerData?.buttonLink,
            },
            error: {
                title: true,
                description: true,
                person: true,
                imgURL: true,
                buttonTitle: true,
                buttonLink: true,
            },
            touch: {},
        },
        {
            title: v => v.length,
            description: v => v.length,
            person: v => v.length,
            imgURL: v => v.length,
            buttonTitle: v => v.length,
            buttonLink: v => v.length,
        }
    )

    const {data, error} = state
    const [registerError, setRegisterError] = useState(null)

    const updateInfo = async (event) => {
        event.preventDefault()
        data.id = bannerData._id

        if (Object.values(error).map(el => el).includes(false)) {
            try {
                await updateEquipoOurPeople(data)
                    .then(() => {
                        setMessage('Data actualizada correctamente')
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

    useEffect(() => {
        const fetchData = async () => {
            const getBannerData = await getEquipoOurPeople()
            setBannerData(getBannerData)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {isDisabled && <Loader message="Cargando imagen..." />}
            <section className="container-fluid EditContent">
                <h2>Banner nuestra filosofía</h2>
                <form className="AdminEdit__form" onSubmit={updateInfo}>
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
                                cssStyle="form-control"
                                placeholder={bannerData?.title}
                            />

                        </div>
                        <div className="col-12 col-sm-4">
                            <p className="AdminEdit__form__label">
                                Descripción
                            </p>
                            <InputWithLabel
                                value={data?.description}
                                onBlur={onBlur}
                                onChange={onChange}
                                name="description"
                                type="text"
                                cssStyle="form-control"
                                placeholder={bannerData?.description}
                            />
                        </div>
                        <div className="col-12 col-sm-4">
                            <p className="AdminEdit__form__label">
                                Persona del equipo y cargo
                            </p>
                            <InputWithLabel
                                value={data?.person}
                                onBlur={onBlur}
                                onChange={onChange}
                                name="person"
                                type="text"
                                cssStyle="form-control"
                                placeholder={bannerData?.person}
                            />
                        </div>
                        <div className="col-12 col-sm-4">
                            <p className="AdminEdit__form__label">
                                Imagen
                            </p>
                            <InputFile
                                classStyle="mb-0"
                                value={data?.imgURL}
                                onChange={onFileSelected}
                                id="fileButton"
                                name="imgURL"
                                type="file"
                                placeholder={bannerData?.imgURL}
                            />
                            {imageSuccess && <span className="AdminEdit__message mt-1">{imageSuccess}</span>}
                        </div>
                        <div className="col-12 col-sm-4">
                            <p className="AdminEdit__form__label">
                                Texto botón
                            </p>
                            <InputWithLabel
                                value={data?.buttonTitle}
                                onBlur={onBlur}
                                onChange={onChange}
                                name="buttonTitle"
                                type="text"
                                cssStyle="form-control"
                                placeholder={bannerData?.buttonTitle}
                            />
                        </div>
                        <div className="col-12 col-sm-4">
                            <p className="AdminEdit__form__label">
                                URL botón
                            </p>
                            <InputWithLabel
                                value={data?.buttonLink}
                                onBlur={onBlur}
                                onChange={onChange}
                                name="buttonLink"
                                type="text"
                                cssStyle="form-control"
                                placeholder={bannerData?.buttonLink}
                            />
                        </div>
                        <div className="col-12">
                            <Button cssStyle="leti-btn AdminEdit__form-leti-btn" >Guardar cambios</Button>
                            {message && <span className="AdminEdit__message">{message}</span>}
                        </div>

                    </div>
                    {registerError && <div className="alert alert-danger">{registerError}</div>}
                </form>
            </section>
        </>
    )
}

export default EditEquipoOurPeople
