import React from 'react'

function EditVideo() {

    const updateUsInfo = () => {
        console.log('updateUsInfo')
    }

    return (
        <section className="container-fluid EditContent">
            <h2>video</h2>
            <form className="AdminEdit__form" onSubmit={updateUsInfo}>
                Formulario de edición de video
            </form>
        </section>
    )
}

export default EditVideo
