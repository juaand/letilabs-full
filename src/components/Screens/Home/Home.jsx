import './Home.css'
import React from 'react'
import Header from '../../Header/Header'
import Video from './Video/Video'
import UsInfo from './UsInfo/UsInfo'
import Carousel from './Carousel/Carousel'


function Home() {
    return (
        <>
            <Header />
            <main>
                <Video />
                <UsInfo />
                <Carousel />
            </main>
        </>
    )
}

export default Home
