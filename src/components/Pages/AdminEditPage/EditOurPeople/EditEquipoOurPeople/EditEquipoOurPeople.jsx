import React, {useState, useEffect} from 'react'
import {useFormState} from '../../../../../hooks/useFormState'
import {getEquipoOurPeople, updateEquipoOurPeople} from '../../../../../services/ApiClient'
import InputWithLabel from '../../../../Form/InputWithLabel/InputWithLabel'
import Button from '../../../../Form/FormButton/FormButton'
import {Editor} from '@tinymce/tinymce-react'


function EditEquipoOurPeople() {
    const [bannerData, setBannerData] = useState()

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
                imgURL: false,
                buttonTitle: false,
                buttonLink: false,
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



    const {data, error, touch} = state
    const [registerError, setRegisterError] = useState(null)


    const updateBanner = async (event) => {
        event.preventDefault()
        data.id = bannerData._id

        try {
            await updateEquipoOurPeople(data)
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
    const handleBannerTitle = (e) => {
        data.title = e.target.getContent()
    }
    const handleBannerDescription = (e) => {
        data.description = e.target.getContent()
    }
    const handleBannerPerson = (e) => {
        data.person = e.target.getContent()
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
        <section className="container-fluid EditContent">
            <h2>Equipo</h2>
            <form className="AdminEdit__form" onSubmit={updateBanner}>
                <div className="row">
                <div className="col-12 col-sm-4">
                        <p className="AdminEdit__form__label">
                            Título
                        </p>
                        <Editor
                            initialValue={bannerData?.title}                        
                            onChange={handleBannerTitle}
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
                    <div className="col-12 col-sm-4">
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
                    <div className="col-12 col-sm-4">
                        <p className="AdminEdit__form__label">
                            Persona del equipo y cargo
                        </p>
                        <Editor
                            initialValue={bannerData?.person}
                            onChange={handleBannerPerson}
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
                    <div className="col-12 col-sm-4">
                        <p className="AdminEdit__form__label">
                            Imagen
                        </p>
                        <InputWithLabel
                            value={data?.imgURL}
                            onBlur={onBlur}
                            onChange={onChange}
                            name="imgURL"
                            type="text"
                            cssStyle={`form-control ${touch.imgURL && error.imgURL ? "is-invalid" : ""}`}
                            placeholder={bannerData?.imgURL}
                        />
                    </div>
                    <div className="col-12 col-sm-4">
                        <p className="AdminEdit__form__label">
                            Imagen 2
                        </p>
                        <InputWithLabel
                            value={data?.buttonTitle}
                            onBlur={onBlur}
                            onChange={onChange}
                            name="buttonTitle"
                            type="text"
                            cssStyle={`form-control ${touch.buttonTitle && error.buttonTitle ? "is-invalid" : ""}`}
                            placeholder={bannerData?.buttonTitle}
                        />
                    </div>
                    <div className="col-12 col-sm-4">
                        <p className="AdminEdit__form__label">
                            Imagen 3
                        </p>
                        <InputWithLabel
                            value={data?.buttonLink}
                            onBlur={onBlur}
                            onChange={onChange}
                            name="buttonLink"
                            type="text"
                            cssStyle={`form-control ${touch.buttonLink && error.buttonLink ? "is-invalid" : ""}`}
                            placeholder={bannerData?.buttonLink}
                        />
                    </div>
                    <div className="col-12">
                        <Button cssStyle="leti-btn AdminEdit__form-leti-btn" >Guardar cambios - Banner</Button>
                    </div>

                </div>
                {registerError && <div className="alert alert-danger">{registerError}</div>}
            </form>
        </section>
    )
}

export default EditEquipoOurPeople
