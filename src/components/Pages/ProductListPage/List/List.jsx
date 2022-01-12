import './List.css'
import React, {useState} from 'react'
// import vadevecum from '../../../../data/vadevecum'

function List() {

    const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

    const [currentLetter, setCurrentLetter] = useState('A')

    // const titlesInitial = [...new Set(vadevecum.map(el => el.name).map(el => el.charAt(0)))].sort()

    const loadVadevecumInfo = (letter) => {
        setCurrentLetter(letter)

        
    }

    return (
        <>
            <section className="container List">
                <div className="row">
                    {alphabet.map((el, key) =>
                        <div className={`col link ${key === 0 && 'active'}`} onClick={() => loadVadevecumInfo(el)}>{el}</div>
                    )}
                </div>
            </section>
            <section className="container List__products">
                <div className="row">
                    <div className="col-12">
                        <h1>{currentLetter}</h1>
                    </div>
                </div>
            </section>
        </>
    )
}

export default List
