import React from 'react'

function EditFindProduct() {

    const updateUsInfo = () => {
        console.log('updateUsInfo')
    }

    return (
        <section className="container-fluid EditContent">
            <h2>Buscar producto</h2>
            <form className="AdminEdit__form" onSubmit={updateUsInfo}>
                Formulario de edición de buscar producto
            </form>
        </section>
    )
}

export default EditFindProduct
