import React from 'react'

function EditPortafolio() {

    const updateUsInfo = () => {
        console.log('updateUsInfo')
    }

    return (
        <section className="container-fluid EditContent">
            <h2>Portafolio</h2>
            <form className="AdminEdit__form" onSubmit={updateUsInfo}>
                Formulario de edición de portafolio
            </form>
        </section>
    )
}

export default EditPortafolio
