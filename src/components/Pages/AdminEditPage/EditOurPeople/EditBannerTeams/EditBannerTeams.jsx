import React, {useState, useEffect} from 'react'

import {getBannerTeams, updateBannerTeams} from '../../../../../services/ApiClient'
import InputWithLabel from '../../../../Form/InputWithLabel/InputWithLabel'
import {useFormState} from '../../../../../hooks/useFormState'
import InputFile from '../../../../Form/InputFile/InputFile'
import Button from '../../../../Form/FormButton/FormButton'
import {app} from '../../../../../services/firebase'
import Loader from '../../../../Loader/Loader'

function EditBannerTeams() {

    const [registerError, setRegisterError] = useState(null)
    const [imageSuccess, setImageSuccess] = useState('')
    const [isDisabled, setIsDisabled] = useState(false)
    const [teamsBanner, setTeamsBanner] = useState([])
    const [message, setMessage] = useState('')

    const {state, onBlur, onChange} = useFormState(
        {
            data: {
                id: '',
                mainTitle: teamsBanner?.mainTitle,
                imgURL: teamsBanner?.imgURL,
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

    const {data, error} = state

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

    const updateBannerTeamsData = async (event) => {
        event.preventDefault()
        data.id = teamsBanner[0]?._id

        if (Object.values(error).map(el => el).includes(false)) {
            try {
                await updateBannerTeams(data)
                    .then(() => {
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
            const getBannerTeamsData = await getBannerTeams()
            setTeamsBanner(getBannerTeamsData)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {isDisabled && <Loader message="Cargando imagen..." />}
            {teamsBanner?.length > 0 &&
                <section className="container-fluid EditContent EditContent-timeline pt-5">
                    <h2>Banner equipos</h2>
                    <form className="AdminEdit__form" onSubmit={updateBannerTeamsData}>
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
                                    cssStyle="form-control mb-0"
                                    placeholder={teamsBanner[0]?.mainTitle}
                                />
                            </div>
                            <div className="col-12 col-sm-6">
                                <div className="col-12 EditElementsModal__img">
                                    <img src={teamsBanner[0]?.imgURL} onError="this.src = 'https://firebasestorage.googleapis.com/v0/b/grupoleti.appspot.com/o/images%2Fno-image.png?alt=media&token=6e518b16-dc11-46e3-83e8-ae4b84a18293';" alt={teamsBanner[0]?.imgURL} />
                                    <InputFile
                                        classStyle="mb-0"
                                        value={data?.imgURL}
                                        onChange={onFileSelected}
                                        id="fileButton"
                                        name="imgURL"
                                        type="file"
                                        placeholder={teamsBanner[0]?.imgURL}
                                    />
                                    {imageSuccess && <span className="AdminEdit__message mt-1">{imageSuccess}</span>}
                                </div>
                            </div>
                            <div className="col-12">
                                <Button cssStyle="leti-btn AdminEdit__form-leti-btn mt-5">Guardar cambios</Button>
                                {message && <span className="AdminEdit__message">{message}</span>}
                            </div>
                        </div>
                    </form>
                    {registerError && <div className="alert alert-danger">{registerError}</div>}
                </section>
            }
        </>
    )
}

export default EditBannerTeams
