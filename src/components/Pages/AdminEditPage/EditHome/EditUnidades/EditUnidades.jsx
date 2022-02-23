import React, {useState, useEffect} from 'react'

import {getUnidades} from '../../../../../services/ApiClient'
import DeleteItemModal from './DeleteItemModal/DeleteItemModal'
import './EditUnidades.css'

function EditUnidades() {

    const [unidadesData, setUnidadesData] = useState()
    const [modalData, setModalData] = useState()
    const [bool, setBool] = useState(false)

    const showModal = (data) => {
        setModalData(data)
        setBool(!bool)
    }

    const deleteItem = (data) => {
        setUnidadesData(data)
        setBool(!bool)
    }

    useEffect(() => {
        const fetchData = async () => {
            const getUnidadesData = await getUnidades()
            setUnidadesData(getUnidadesData)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {bool && <DeleteItemModal hideModal={() => setBool(!bool)} element={modalData} event deleteItem={(updateData) => deleteItem(updateData)} />}
            {unidadesData?.length > 0 &&
                <section className="container-fluid EditContent EditContent-timeline">
                    <h2>Editar unidad de negocio</h2>
                    <div className="row justify-content-around">
                        {unidadesData?.map(el =>
                            <div className="col-2 EditCarousel__edit" onClick={() => showModal(el)}>
                                <img className="EditUnidades__img" src={el.logo} onError="this.src = 'https://firebasestorage.googleapis.com/v0/b/grupo-leti-fd84e.appspot.com/o/images%2Fno-image.png?alt=media&token=73bf7cd8-629d-4deb-b281-9e629fbfb752';" alt={el.name} />
                            </div>
                        )}
                    </div>
                </section>
            }
        </>
    )
}

export default EditUnidades
