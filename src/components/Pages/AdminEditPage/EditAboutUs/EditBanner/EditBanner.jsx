import React, {useState, useEffect} from 'react'
import {useFormState} from '../../../../../hooks/useFormState'
import {getBanner, updateBannerData} from '../../../../../services/ApiClient'
import Button from '../../../../Form/FormButton/FormButton'
import {Editor} from '@tinymce/tinymce-react'
import InputFile from '../../../../Form/InputFile/InputFile'
import {app} from '../../../../../services/firebase'

function EditBanner() {

    const [bannerData, setBannerData] = useState()
    const [disabled, setDisabled] = useState(true)

    const {state} = useFormState(
        {
            data: {
                id: '',
                description: bannerData?.description,
                imgURL: bannerData?.imgURL,
            },
            error: {
                description: true,
                imgURL: false,
            },
            touch: {},
        },
        {
            description: v => v.length,
            imgURL: v => v.length,
        }
    )



    const {data} = state
    const [registerError, setRegisterError] = useState(null)


    const updateBanner = async (event) => {
        event.preventDefault()
        data.id = bannerData._id

        try {
            await updateBannerData(data)
                .then(banner => {
                    setBannerData(banner[0])
                })
                .catch(error => {
                    setRegisterError(error)
                })
        } catch (err) {
            setRegisterError(err.response?.data?.message)
        }
    }

    const handleBannerDescription = (e) => {
        data.description = e.target.getContent()
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
        data.imgURL = fileUrl
    }

    useEffect(() => {
        const fetchData = async () => {
            const getBannerData = await getBanner()
            setBannerData(getBannerData)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <section className="container-fluid EditContent">
            <h2>Banner</h2>
            <form className="AdminEdit__form" onSubmit={updateBanner}>
                <div className="row">
                    <div className="col-12 col-sm-6">
                        <p className="AdminEdit__form__label">
                            Descripción
                        </p>
                        <Editor
                            initialValue={bannerData?.description}
                            onChange={handleBannerDescription}
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
                    <div className="col-12 col-sm-6">
                        <p className="AdminEdit__form__label">
                            Imagen
                        </p>
                        <InputFile
                            value={data?.imgURL}
                            onChange={onFileSelected}
                            id="fileButton"
                            name="picpath"
                            type="file"
                            placeholder={bannerData?.imgURL}
                        />
                    </div>
                    <div className="col-12">
                        <Button className="leti-btn mt-5 AdminEdit__form-leti-btn" >Guardar cambios</Button>
                    </div>
                </div>
                {registerError && <div className="alert alert-danger">{registerError}</div>}
            </form>
        </section>
    )
}

export default EditBanner
