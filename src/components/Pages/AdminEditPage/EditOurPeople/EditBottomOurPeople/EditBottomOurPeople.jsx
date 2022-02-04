import React, {useState, useEffect} from 'react'
import {useFormState} from '../../../../../hooks/useFormState'
import {getBottomOurPeople, updateBottomOurPeople} from '../../../../../services/ApiClient'
import InputWithLabel from '../../../../Form/InputWithLabel/InputWithLabel'
import Button from '../../../../Form/FormButton/FormButton'
import DeleteItemModal from '../../EditOurPeople/EditBottomOurPeople/DeleteItemModal/DeleteItemModal'



function EditBottomOurPeople() {
    const {state, onBlur, onChange} = useFormState(
        {
            data: {
                title: '',
                img: '',
                url: '',
                button: '',
            },
            error: {
                title: false,
                img: false,
                url: false,
                button: false,
            },
            touch: {},
        },
        {
            title: v => v.length,
            img: v => v.length,
            url: v => v.length,
            button: v => v.length,
        }
    )

    const {data, error, touch} = state
    const [registerError, setRegisterError] = useState(null)
    const [modalData, setModalData] = useState()
    const [ourPeopleData, setOurPeopleData] = useState()
    const [bool, setBool] = useState(false)

    const showModal = (data) => {
        setModalData(data)
        setBool(!bool)
    }

    const deleteItem = (data) => {
        setOurPeopleData(data)
        setBool(!bool)
    }

    useEffect(() => {
        const fetchData = async () => {
            const getOurPeopleData = await getBottomOurPeople()
            setOurPeopleData(getOurPeopleData)

        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {bool && <DeleteItemModal hideModal={() => setBool(!bool)} data={modalData} deleteItem={(updateData) => deleteItem(updateData)} />}
            {ourPeopleData?.length > 0 &&
                <section className="container-fluid EditContent">
                    <h2>Editar compañía</h2>
                    <div className="row justify-content-around">
                        {ourPeopleData?.map(el =>
                            <div className="col-1 EditCarousel__trash" onClick={() => showModal(el)}>
                                <img className="EditCarousel__img" src={el.img.toLowerCase()} alt={el.img} />
                                <p>{el.title}</p>
                                <p>{el.button}</p>
                                <p>{el.url}</p>
                            </div>
                        )}
                    </div>
                </section>}
        </>
    )
}

export default EditBottomOurPeople