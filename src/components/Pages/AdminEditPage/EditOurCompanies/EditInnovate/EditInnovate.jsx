import React, {useState, useEffect} from 'react'

import {getInnovationOC, updateInnovationOC} from '../../../../../services/ApiClient'
import InputWithLabel from '../../../../Form/InputWithLabel/InputWithLabel'
import {useFormState} from '../../../../../hooks/useFormState'
import Button from '../../../../Form/FormButton/FormButton'


function EditInnovate() {

    const [registerError, setRegisterError] = useState(null)
    const [bannerData, setBannerData] = useState([])
    const [message, setMessage] = useState('')

    const {state, onChange} = useFormState(
        {
            data: {
                id: '',
                description: bannerData?.description,
            },
            error: {
                description: true,
            },
            touch: {},
        },
        {
            description: v => v.length,
        }
    )


    const {data, error, } = state


    const updateBanner = async (event) => {
        event.preventDefault()

        if (Object.values(error).map(el => el).includes(false)) {
            data.id = bannerData?._id
            try {
                await updateInnovationOC(data)
                    .then(banner => {
                        setBannerData(banner)
                        setMessage('Data actualizada exitosamente')
                    })
                    .catch(error => {
                        setRegisterError(error)
                    })
            } catch (err) {
                setRegisterError(err.response?.data?.message)
            }
        } else {
            setMessage('Por favor edite el título')
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const getBannerData = await getInnovationOC()
            setBannerData(getBannerData)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <section className="container-fluid EditContent">
            <h2>Editar título</h2>
            <form className="AdminEdit__form" onSubmit={updateBanner}>
                <div className="row">
                    <div className="col-12">
                        <p className="AdminEdit__form__label">
                            Título
                        </p>
                        <InputWithLabel
                            value={data?.description}
                            onChange={onChange}
                            name="description"
                            type="text"
                            cssStyle="form-control"
                            placeholder={bannerData?.description}
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
    )
}

export default EditInnovate
