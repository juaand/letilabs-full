import './AdminEditPage.css'
import React, {useEffect} from 'react'
import { useHistory } from 'react-router';



function AdminEditPage() {
    let history = useHistory()
  

    function handleClick() {
        setTimeout(() => {history.push("/")}, 1);
        setTimeout(() => {history.push("/sobre-nosotros")}, 1);
        setTimeout(() => {history.push("/admin-editar-contenido")}, 1);
      }

    useEffect(() => {

        document.title = "Grupo Leti | AdminEditPage"
    }, [])

    return (
        <>
        <main>
            <h1>AdminEditPage</h1>
            <div onClick={handleClick}>editar</div>
        </main>
        </>
    )
}

export default AdminEditPage
