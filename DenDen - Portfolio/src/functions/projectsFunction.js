export function scrollToTop() {
    document.documentElement.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant", 
    });
}

export function rollYarn(loading, 
    initialLineState, 
    initialPathState, 
    initialYarnState, 
    setlineElementContainer,
    setpathContainer,
    setyarnElementContainer) {
    if (!loading) {
        const allLineState = document.querySelectorAll('.linecontainer')
        const allPathState = document.querySelectorAll('#path')
        const allYarnState = document.querySelectorAll('.yarn')
        allLineState.forEach((LineState, index) => {
            initialLineState[index] = LineState
        })

        allPathState.forEach((PathState, index) => {
            initialPathState[index] = PathState
        })

        allYarnState.forEach((YarnState, index) => {
            initialYarnState[index] = YarnState
        })

        setlineElementContainer(initialLineState)
        setpathContainer(initialPathState)
        setyarnElementContainer(initialYarnState)
    }
}


export function assignLoadingScreen(range, setLoading) {
    const randomInt = Math.floor (Math.random() * (range-0))

    if (randomInt == 1) {
        setLoading(false)
    } else {
        const randomTime = Math.floor(Math.random() * (2700-1500) + 1500);
        const timeoutId = setTimeout(() => {
            document.querySelector('.loading-container').style.animation = 'contract 1s ease-in-out forwards'
            setTimeout(() => {
                setLoading(false);
            }, 1000)
        }, randomTime);
            return () => {
            clearTimeout(timeoutId);
        };
    }
}