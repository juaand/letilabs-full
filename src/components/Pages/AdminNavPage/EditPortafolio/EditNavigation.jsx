import React, {useState, useEffect} from 'react'

import {getNav} from '../../../../services/ApiClient'


import DeleteItemModal from './DeleteItemModal/DeleteItemModal'


function EditNavigation() {

    const [navData, setNavData] = useState([])
    const [modalData, setModalData] = useState([])

    const [bool, setBool] = useState(false)


    const showModal = (data) => {
        setModalData(data)
        setBool(!bool)
    }

    const deleteItem = (data) => {
        setNavData(data)
        setBool(!bool)
    }

    useEffect(() => {
        const fetchData = async () => {
            const getNavData = await getNav()
            setNavData(getNavData)
        }
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {bool && <DeleteItemModal hideModal={() => setBool(!bool)} element={modalData}  deleteItem={(updateData) => deleteItem(updateData)} />}
            <section className="container-fluid Letilabs EditContent EditContent-timeline">
                <h2>Editar navegación</h2>
                <div className="row justify-content-around">
                    {navData?.map(el =>
                        <div className="col-sm-3 col-12 EditCarousel__edit EditCarousel__edit-force" onClick={() => showModal(el)}>
                            <h5>{el?.nav_btn}</h5>
                            <h4 className="mt-3 mb-3">{el?.title}</h4>
                            <p dangerouslySetInnerHTML={{__html: el?.desc}} />
                        </div>
                    )}
                </div>
            </section>
        </>
    )
}

export default EditNavigation
