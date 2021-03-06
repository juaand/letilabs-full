import './List.css'
import React, {useState, useEffect} from 'react'
import {getProductList} from '../../../../services/ApiClient'
import {Link} from 'react-router-dom'
import Loader from '../../../Loader/Loader'

function List() {

    const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

    const [currentLetter, setCurrentLetter] = useState('A')
    const [vadevecumData, setVadevecumData] = useState([])
    const [loading, setLoading] = useState(true)

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
        setLoading(!loading)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {loading && <Loader />}
            <section className="container-fluid List">
                <section className="container">
                    <div className="List__to-top" onClick={() => window.scrollTo(0, 0)}></div>
                    <div className="row">
                        {alphabet.map((el, key) =>
                            <>
                                {[...new Set(vadevecumData.map(el => el.name.charAt(0)))].includes(el) ?
                                    <div className={`col ${el} link ${key === 0 && 'active'}`} onClick={() => loadVadevecumInfo(el)}>{el}</div>
                                    :
                                    <div className={`col inactive`}>{el}</div>}
                            </>
                        )}
                    </div>
                </section>
                <section className="container List__products">
                    <div className="row List__align">
                        <div className="col-11 col-sm-12">
                            <h1>{currentLetter}</h1>
                        </div>
                    </div>
                    <div className="row List__align">
                        {vadevecumData.filter(el => el.name.charAt(0) === currentLetter).map(el =>
                            <div className="col-11 col-sm-4 col-sm-4 List__card">
                                <div className="List__sku" style={{
                                    background: `url("${el?.picPath}") no-repeat center center / contain`
                                }} />
                                <p className="List__name"><strong><span dangerouslySetInnerHTML={{__html: el?.name}}>
                                </span></strong></p>
                                <p><strong>Categoría</strong>
                                    <ul className="List__list">
                                        {el.therapeutic_group.map(el => <li>{el}</li>)}
                                    </ul>
                                </p>
                                <p><strong>Composición</strong> <span  className="List__composition" dangerouslySetInnerHTML={{__html: el?.composition}}/></p>
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
            </section>
        </>
    )
}

export default List
