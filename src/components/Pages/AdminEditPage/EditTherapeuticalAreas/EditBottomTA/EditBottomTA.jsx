import React, {useState, useEffect} from 'react'
import {useFormState} from '../../../../../hooks/useFormState'
import {getBottomTA, updateBottomTA} from '../../../../../services/ApiClient'
import InputWithLabel from '../../../../Form/InputWithLabel/InputWithLabel'
import Button from '../../../../Form/FormButton/FormButton'
import DeleteItemModal from './DeleteItemModal/DeleteItemModal'


function EditBottomTA() {
    const {state, onBlur, onChange} = useFormState(
        {
            data: {
                title: '',
                img: '',
                buttonLink: '',
                buttonTitle: '',
            },
            error: {
                title: false,
                img: false,
                buttonLink: false,
                buttonTitle: false,
            },
            touch: {},
        },
        {
            title: v => v.length,
            img: v => v.length,
            buttonLink: v => v.length,
            buttonTitle: v => v.length,
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
            const getOurPeopleData = await getBottomTA()
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
                                <p>{el.buttonTitle}</p>
                                <p>{el.buttonLink}</p>
                            </div>
                        )}
                    </div>
                </section>}
        </>
    )
}

export default EditBottomTA
