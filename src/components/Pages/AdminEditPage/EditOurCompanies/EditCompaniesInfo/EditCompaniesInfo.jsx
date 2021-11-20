import React from 'react'

function EditCompaniesInfo() {
    const updateUsInfo = () => {
        console.log('updateUsInfo')
    }

    return (
        <section className="container-fluid EditContent">
            <h2>Áreas de negocio</h2>
            <form className="AdminEdit__form" onSubmit={updateUsInfo}>
                Formulario de edición de áreas de negocio
            </form>
        </section>
    )
}

export default EditCompaniesInfo
