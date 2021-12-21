import React from 'react'

function SingleProductPage(props) {

    const buscar = props?.location?.state?.buscar
    const especialidad = props?.location?.state?.especialidad

    return (
        <div>
            <h1>{buscar}</h1>
            <h1>{especialidad}</h1>
        </div>
    )
}

export default SingleProductPage
