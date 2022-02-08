import React, {useState, useEffect} from 'react'
import {useFormState} from '../../../../../hooks/useFormState'
import {getCarouselTech, updateCarouselTech} from '../../../../../services/ApiClient'
import InputWithLabel from '../../../../Form/InputWithLabel/InputWithLabel'
import Button from '../../../../Form/FormButton/FormButton'
import DeleteItemModal from './DeleteItemModal/DeleteItemModal'

function EditCarrouselTech() {

    const {state, onBlur, onChange} = useFormState(
        {
            data: {
                mainTitle: '',
                imgURL: '',
                title: '',
                description: '',
            },
            error: {
                mainTitle: false,
                imgURL: false,
                title: false,
                description: false,
            },
            touch: {},
        },
        {
            mainTitle: v => v.length,
            imgURL: v => v.length,
            title: v => v.length,
            description: v => v.length,
        }
    )

    const {data, error, touch} = state
    const [registerError, setRegisterError] = useState(null)
    const [modalData, setModalData] = useState()
    const [ourGoalsOCData, setOurGoalsOCData] = useState()
    const [bool, setBool] = useState(false)

    const showModal = (data) => {
        setModalData(data)
        setBool(!bool)
    }

    const deleteItem = (data) => {
        setOurGoalsOCData(data)
        setBool(!bool)
    }

    useEffect(() => {
        const fetchData = async () => {
            const getOurGoalsOCData = await getCarouselTech()
            setOurGoalsOCData(getOurGoalsOCData)

        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {bool && <DeleteItemModal hideModal={() => setBool(!bool)} data={modalData} deleteItem={(updateData) => deleteItem(updateData)} />}
            {ourGoalsOCData?.length > 0 &&
                <section className="container-fluid EditContent">
                    <h2>Editar Carousel</h2>
                    <div className="row justify-content-around">
                        {ourGoalsOCData?.map(el =>
                            <div className="col-1 EditCarousel__trash" onClick={() => showModal(el)}>
                                <p>{el?.mainTitle}</p>
                                <p>{el?.imgURL}</p>
                                <p>{el?.title}</p>
                                <p>{el?.description}</p>
                            </div>
                        )}
                    </div>
                </section>}
        </>
    )
}

export default EditCarrouselTech
