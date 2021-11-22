import React, {useState, useEffect} from 'react'
import {useFormState} from '../../../../../hooks/useFormState'
import {getCarousel, updateCarouselData} from '../../../../../services/ApiClient'
import InputWithLabel from '../../../../Form/InputWithLabel/InputWithLabel'
import Button from '../../../../Form/FormButton/FormButton'


function EditCarousel() {

    const [carouselData, setCarouselData] = useState()

    const {state, onBlur, onChange} = useFormState(
        {
            data: {
                id: '',
                name: carouselData?.name,
                desc: carouselData?.desc,
                img: carouselData?.img,
            },
            error: {
                name: false,
                desc: false,
                img: false,
            },
            touch: {},
        },
        {
            name: v => v.length,
            desc: v => v.length,
            img: v => v.length,
        }
    )

    const {data, error, touch} = state
    const [registerError, setRegisterError] = useState(null)


    const updateCarouselInfo = async (event) => {
        event.preventDefault()
        data.id = carouselData._id

        try {
            await updateCarouselData(data)
                .then(carousel => {
                    setCarouselData(carousel[0])
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
            const getCarouselData = await getCarousel()
            setCarouselData(getCarouselData)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <section className="container-fluid EditContent">
            <h2>Carousel</h2>
            <form className="AdminEdit__form" onSubmit={updateCarouselInfo}>
            <div className="row">
                    <div className="col-12 col-sm-6">
                        <p className="AdminEdit__form__label">
                            name
                        </p>
                        <InputWithLabel
                            value={data?.name}
                            onBlur={onBlur}
                            onChange={onChange}
                            name="name"
                            type="text"
                            className={`form-control ${touch.name && error.name ? "is-invalid" : ""}`}
                            placeholder={carouselData?.name}
                        />
                        <p className="AdminEdit__form__label">
                            description
                        </p>
                        <InputWithLabel
                            value={data?.desc}
                            onBlur={onBlur}
                            onChange={onChange}
                            name="desc"
                            type="text"
                            className={`form-control ${touch.desc && error.desc ? "is-invalid" : ""}`}
                            placeholder={carouselData?.desc}
                        />
                         <p className="AdminEdit__form__label">
                            img
                        </p>
                        <InputWithLabel
                            value={data?.img}
                            onBlur={onBlur}
                            onChange={onChange}
                            name="img"
                            type="text"
                            className={`form-control ${touch.img && error.img ? "is-invalid" : ""}`}
                            placeholder={carouselData?.img}
                        />
                    </div>
                    <div className="col-12">
                        <Button className="leti-btn AdminEdit__form-leti-btn" >Editar Carousel</Button>
                    </div>

                </div>
                {registerError && <div className="alert alert-danger">{registerError}</div>}
            </form>
        </section>
    )
}

export default EditCarousel
