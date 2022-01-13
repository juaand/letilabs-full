import './List.css'
import React, {useState, useEffect} from 'react'
import {getProductList} from '../../../../services/ApiClient'
import {Link} from 'react-router-dom'

function List() {

    const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

    const [currentLetter, setCurrentLetter] = useState('A')
    const [vadevecumData, setVadevecumData] = useState([])

    const loadVadevecumInfo = (letter) => {
        setCurrentLetter(letter)

        const checkActive = document.querySelectorAll('.active')
        if (checkActive) {
            checkActive.forEach(el => el.classList.remove('active'))
            document.querySelector(`.${letter}`).classList.add('active')
        }

    }

    useEffect(() => {
        const fetchData = async () => {
            const data = await getProductList()
            setVadevecumData(data)
        }
        fetchData()
    }, [])

    return (
        <>
            <section className="container List">
                <div className="row">
                    {alphabet.map((el, key) =>
                        <div className={`col ${el} link ${key === 0 && 'active'}`} onClick={() => loadVadevecumInfo(el)}>{el}</div>
                    )}
                </div>
            </section>
            <section className="container List__products">
                <div className="row">
                    <div className="col-12">
                        <h1>{currentLetter}</h1>
                    </div>
                </div>
                <div className="row">

                    {vadevecumData.filter(el => el.name.charAt(0) === currentLetter).map(el =>
                        <div className="col-12 col-sm-4 List__card">
                            <div className="List__sku">SKU</div>
                            <p><strong>Nombre</strong> {el.name}</p>
                            <p><strong>Categoría</strong>
                                <ul className="List__list">
                                    {el.therapeutic_group.map(el => <li>{el}</li>)}
                                </ul>
                            </p>
                            <p><strong>Composición</strong> {el.composition}</p>
                            <Link to={{
                                pathname: `/producto`,
                                state: {
                                    buscar: el.name
                                }
                            }} className="leti-btn">Ver ficha</Link>
                        </div>
                    )}
                </div>
            </section>
        </>
    )
}

export default List
