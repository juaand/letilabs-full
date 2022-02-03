import React, {useState, useEffect} from 'react'
import {useFormState} from '../../../../../hooks/useFormState'
import {getInfoCardsOurPeople, updateInfoCardsOurPeople} from '../../../../../services/ApiClient'
import InputWithLabel from '../../../../Form/InputWithLabel/InputWithLabel'
import Button from '../../../../Form/FormButton/FormButton'
import DeleteItemModal from './DeleteItemModal/DeleteItemModal'

function EditInfoCardsOurPeople() {

    const {state, onBlur, onChange} = useFormState(
        {
            data: {
                mainTitle: '',
                imgURL: '',
                title: '',
                info: '',
            },
            error: {
                mainTitle: false,
                imgURL: false,
                title: false,
                info: false,
            },
            touch: {},
        },
        {
            mainTitle: v => v.length,
            imgURL: v => v.length,
            title: v => v.length,
            info: v => v.length,
        }
    )

    const {data, error, touch} = state
    const [registerError, setRegisterError] = useState(null)
    const [modalData, setModalData] = useState()
    const [ourOCData, setOurOCData] = useState()
    const [bool, setBool] = useState(false)

    const showModal = (data) => {
        setModalData(data)
        setBool(!bool)
    }

    const deleteItem = (data) => {
        setOurOCData(data)
        setBool(!bool)
    }

    useEffect(() => {
        const fetchData = async () => {
            const getOurOCData = await getInfoCardsOurPeople()
            setOurOCData(getOurOCData)

        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {bool && <DeleteItemModal hideModal={() => setBool(!bool)} data={modalData} deleteItem={(updateData) => deleteItem(updateData)} />}
            {ourOCData?.length > 0 &&
                <section className="container-fluid EditContent">
                    <h2>Editar InfoCard</h2>
                    <div className="row justify-content-around">
                        {ourOCData?.map(el =>
                            <div className="col-1 EditCarousel__trash" onClick={() => showModal(el)}>
                                <p>{el?.mainTitle}</p>
                                <p>{el?.imgURL}</p>
                                <p>{el?.title}</p>
                                <p>{el?.info}</p>
                            </div>
                        )}
                    </div>
                </section>}
        </>
    )
}

export default EditInfoCardsOurPeople
