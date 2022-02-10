import React, {useState, useEffect} from 'react'
import {useFormState} from '../../../../../hooks/useFormState'
import {getTitleFarmPurpose, updateTitleFarmDataPurpose} from '../../../../../services/ApiClient'
import InputWithLabel from '../../../../Form/InputWithLabel/InputWithLabel'
import Button from '../../../../Form/FormButton/FormButton'

function EditTitlePurpose() {

    const [titleData, setTitleData] = useState()

    const {state, onBlur, onChange} = useFormState(
        {
            data: {
                id: '',
                title: titleData?.title,
            },
            error: {
                title: false,
            },
            touch: {},
        },
        {
            title: v => v.length,
        }
    )



    const {data, error, touch} = state
    const [registerError, setRegisterError] = useState(null)


    const updateTitle = async (event) => {
        event.preventDefault()
        data.id = titleData._id

        try {
            await updateTitleFarmDataPurpose(data)
                .then(title => {
                    setTitleData(title[0])
                })
                .catch(error => {
                    setRegisterError(error)
                })
        } catch (err) {
            setRegisterError(err.response?.data?.message)
        }
    }


    useEffect(() => {
        const fetchData = async () => {
            const getTitleData = await getTitleFarmPurpose()
            setTitleData(getTitleData)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <section className="container-fluid EditContent">
            <h2>Titulo Farmacología</h2>
            <form className="AdminEdit__form" onSubmit={updateTitle}>
                <div className="row">
                    <div className="col-12">
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
                            placeholder={titleData?.title}
                        />
                    </div>
                    <div className="col-12">
                        <Button cssStyle="leti-btn AdminEdit__form-leti-btn" >Guardar cambios - título</Button>
                    </div>

                </div>
                {registerError && <div className="alert alert-danger">{registerError}</div>}
            </form>
        </section>
    )
}

export default EditTitlePurpose
