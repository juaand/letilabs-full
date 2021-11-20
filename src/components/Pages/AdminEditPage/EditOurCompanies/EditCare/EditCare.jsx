import React from 'react'

function EditCare() {
    const updateUsInfo = () => {
        console.log('updateUsInfo')
    }

    return (
        <section className="container-fluid EditContent">
            <h2>Cuidamos</h2>
            <form className="AdminEdit__form" onSubmit={updateUsInfo}>
                Formulario de edición de cuidamos
            </form>
        </section>
    )
}

export default EditCare
