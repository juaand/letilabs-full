let depth, diff, speed, axis, horizontalSum, verticalSum


document.onscroll = () => {

    depth = window.scrollY
    // Menu collapse effect

    if (depth > 100) {
        document.querySelector('.navbar-brand ').classList.add('thin')
    } else {
        document.querySelector('.navbar-brand ').classList.remove('thin')
    }



    // Parallax elements
    document.querySelectorAll('.parallax').forEach(eachElement => {

        diff = eachElement.getBoundingClientRect().top
        speed = eachElement.dataset.speed
        axis = eachElement.dataset.axis

        horizontalSum = diff * speed
        verticalSum = diff * speed

        if (axis === 'horizontal') verticalSum = 0
        if (axis === 'vertical') horizontalSum = 0

        eachElement.style.transform = `rotate(${verticalSum + horizontalSum}deg)`
    })

}