import React from 'react'

function EditProdutcsBanner() {
    const updateUsInfo = () => {
        console.log('updateUsInfo')
    }

    return (
        <section className="container-fluid EditContent">
            <h2>Banner de productos</h2>
            <form className="AdminEdit__form" onSubmit={updateUsInfo}>
                Formulario de edición de banner de productos
            </form>
        </section>
    )
}

export default EditProdutcsBanner
