import './OurCompanies.css'
import React, {useEffect, useState} from 'react'
import useFetch from "react-fetch-hook";


const fs = require('fs');


function OurCompanies(props) {

    const title = props.title || 'Nuestras empresas'


        // const [newPage, setNewPage] = useState([])
        const { isLoading, data } = useFetch("https://letilabs-dev.herokuapp.com/sobre-nosotros");
        console.log(data)
        // fetch("http://mywebservice.com/items").then((response) => {
        //         response.json().then((json) => {
        //             setNewPage({items: json.items})
        //             console.log(newPage)
        //         }).catch((error) => {});
        //     });

        let promesaEscrituraArchivo = new Promise((resolve, reject) => {
            fs.writeFile('ex313_archivo_texto.txt', data, (error) => {
                if(error){
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
        promesaEscrituraArchivo
.then(() => {
    console.log('La escritura del archivo ha sido satisfactoria.');
})
.catch((error) => {
    console.log('Ha ocurrido un error:', error);
});

    useEffect(() => {
        document.title = `Grupo Leti | ${title}`
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <h1>NUESTRAS EMPRESAS</h1>
            <div>{data?.name}</div>
        </>
    )
}

export default OurCompanies
