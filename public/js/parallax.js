let depth, diff, speed, axis, horizontalSum, verticalSum


document.onscroll = () => {

    depth = window.scrollY
    // Menu collapse effect

    if (depth > 100) {
        document.querySelector('.navbar-brand').classList.add('thin')
        document.querySelector('.Search').classList.add('thin')

        if (window.screen.width <= 576) {
            document.querySelector('.Nav').classList.add('thin')
        }
    } else {
        document.querySelector('.navbar-brand').classList.remove('thin')
        document.querySelector('.Search').classList.remove('thin')

        if (window.screen.width <= 576) {
            document.querySelector('.Nav').classList.remove('thin')
        }
    }



    // Parallax elements
    document.querySelectorAll('.parallax-scale').forEach(eachElement => {

        diff = eachElement.getBoundingClientRect().top
        speed = eachElement.dataset.speed

        scaleSum = diff * speed * 0.01

        eachElement.style.transform = `scale(${scaleSum})`
    })


    document.querySelectorAll('.parallax-rotate').forEach(eachElement => {

        diff = eachElement.getBoundingClientRect().top
        speed = eachElement.dataset.speed

        horizontalSum = diff * speed
        verticalSum = diff * speed

        eachElement.style.transform = `rotate(${verticalSum + horizontalSum}deg)`
    })

    document.querySelectorAll('.parallax').forEach(eachElement => {

        diff = eachElement.getBoundingClientRect().top
        speed = eachElement.dataset.speed
        axis = eachElement.dataset.axis

        horizontalSum = diff * speed
        verticalSum = diff * speed

        if (axis === 'horizontal') verticalSum = 0
        if (axis === 'vertical') horizontalSum = 0

        eachElement.style.transform = `translate(${horizontalSum}px, ${verticalSum}px)`
    })

}