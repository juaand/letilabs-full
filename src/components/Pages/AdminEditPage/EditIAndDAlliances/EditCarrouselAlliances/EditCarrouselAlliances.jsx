import React, {useState, useEffect} from 'react'

import {getLogoCarouselData, updateTitleCarrouselAlliance, deleteLogoCarouselAlliance} from '../../../../../services/ApiClient'
import InputWithLabel from '../../../../Form/InputWithLabel/InputWithLabel'
import {useFormState} from '../../../../../hooks/useFormState'
import Button from '../../../../Form/FormButton/FormButton'

function EditCarrouselAlliances() {

    const [logoAlliData, setLogoAlliData] = useState([])
    const [message, setMessage] = useState('')

    const {state, onChange} = useFormState(
        {
            data: {
                title: logoAlliData[0]?.title,
            },
            error: {
                title: true,
            },
            touch: {},
        },
        {
            title: v => v.length,
        }
    )

    const {data, error} = state
    const [registerError, setRegisterError] = useState(null)

    const deleteItem = async (id) => {
        const getUpdatedData = await deleteLogoCarouselAlliance(id)
        setLogoAlliData(getUpdatedData)
    }

    const updateInfo = async (event) => {
        event.preventDefault()

        console.log(data)

        if (Object.values(error).map(el => el).includes(false)) {
            try {
                await updateTitleCarrouselAlliance(data)
                    .then(info => {
                        setLogoAlliData(info)
                        setMessage('Data atualizada exitosamente')
                    })
                    .catch(error => {
                        setRegisterError(error)
                    })
            } catch (err) {
                setRegisterError(err.response?.data?.message)
            }
        } else {
            setMessage('Por favor edite el campo')
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const getLogoCarouselDataData = await getLogoCarouselData()
            setLogoAlliData(getLogoCarouselDataData)

        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <section className="container-fluid EditContent pt-0">
                <h2>Editar título carrusel de logos</h2>
                <form className="AdminEdit__form" onSubmit={updateInfo}>
                    <div className="row">
                        <div className="col-12 mt-5">
                            <InputWithLabel
                                value={data.title}
                                label="Título carrusel"
                                onChange={onChange}
                                name="title"
                                type="text"
                                cssStyle="form-control mb-5"
                                placeholder={logoAlliData[0]?.title}
                            />
                        </div>
                        <div className="col-12 col-sm-6">
                            <Button type="submit" cssStyle="leti-btn">Guardar cambios</Button>
                            {message && <span className="AdminEdit__message ">{message}</span>}
                        </div>

                    </div>
                    {registerError && <div className="alert alert-danger">{registerError}</div>}
                </form>
            </section>
            {logoAlliData?.length > 0 &&
                <section className="container-fluid EditContent EditContent-timeline">
                    <h2>Eliminar logo del carrusel</h2>
                    <div className="row justify-content-around">
                        {logoAlliData?.map(el =>
                            <div className="col-1 EditUnidades__trash" onClick={() => deleteItem(el._id)}>
                                <img className="EditCarousel__img" src={el?.picPath} alt="logo de aliado de grupo leti" />
                            </div>
                        )}
                    </div>
                </section>
            }
        </>
    )
}

export default EditCarrouselAlliances
