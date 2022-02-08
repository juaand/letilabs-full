import React, {useState, useEffect} from 'react'
import {useFormState} from '../../../../../hooks/useFormState'
import {getMapTech, updateMapTech} from '../../../../../services/ApiClient'
import InputWithLabel from '../../../../Form/InputWithLabel/InputWithLabel'
import Button from '../../../../Form/FormButton/FormButton'
import {Editor} from '@tinymce/tinymce-react'

function EditMapTech() {

    const [mapData, setMapData] = useState()

    const {state, onBlur, onChange} = useFormState(
        {
            data: {
                id: '',
                mapURL: mapData?.mapURL,
                description: mapData?.description,
            },
            error: {
                mapURL: false,
                description: false,
            },
            touch: {},
        },
        {
            mapURL: v => v.length,
            description: v => v.length,
        }
    )



    const {data, error, touch} = state
    const [registerError, setRegisterError] = useState(null)


    const updatemap = async (event) => {
        event.preventDefault()
        data.id = mapData._id

        try {
            await updateMapTech(data)
                .then(map => {
                    setMapData(map[0])
                })
                .catch(error => {
                    setRegisterError(error)
                })
        } catch (err) {
            setRegisterError(err.response?.data?.message)
        }
    }
    const handleMapDescription = (e) => {
        data.description = e.target.getContent()
    }


    useEffect(() => {
        const fetchData = async () => {
            const getMapData = await getMapTech()
            setMapData(getMapData)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <section className="container-fluid EditContent">
            <h2>map I&D</h2>
            <form className="AdminEdit__form" onSubmit={updatemap}>
                <div className="row">
                    <div className="col-12 col-sm-6">
                        <p className="AdminEdit__form__label">
                            Mapa URL
                        </p>
                        <InputWithLabel
                            value={data?.mapURL}
                            onBlur={onBlur}
                            onChange={onChange}
                            name="mapURL"
                            type="text"
                            cssStyle={`form-control ${touch.mapURL && error.mapURL ? "is-invalid" : ""}`}
                            placeholder={mapData?.mapURL}
                        />
                    </div>
                    <div className="col-12 col-sm-6">
                        <p className="AdminEdit__form__label">
                            Descripción
                        </p>
                        <InputWithLabel
                            value={data?.description}
                            onBlur={onBlur}
                            onChange={onChange}
                            name="description"
                            type="text"
                            cssStyle={`form-control ${touch.description && error.description ? "is-invalid" : ""}`}
                            placeholder={mapData?.description}
                        />
                    </div>
                    <div className="col-12">
                        <Button cssStyle="leti-btn AdminEdit__form-leti-btn" >Guardar cambios - map</Button>
                    </div>

                </div>
                {registerError && <div className="alert alert-danger">{registerError}</div>}
            </form>
        </section>
    )
}

export default EditMapTech
