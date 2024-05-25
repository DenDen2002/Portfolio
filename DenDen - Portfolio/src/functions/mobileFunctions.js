export function isMobile() {
    if (window.innerWidth < 1000 && window.innerHeight < 1000) {
        return true
    } else {
        return false
    }
}

export function needRotation() {
    if (window.innerWidth < window.innerHeight) {
        return true
    } else {
        return false
    }
}

export function renderCorrectScreen(navigate, location, setRotate, setMobile) {
    if (isMobile() && location.pathname !== ('/')) {
        navigate("/")
    } else if (isMobile()) {
        setMobile(true)
        setRotate(false)
    } else if (needRotation() ) {
        setRotate(true)
    } else {
        setRotate(false)
        setMobile(false)
    }
}

export async function cacheImages(srcArray, setLoading) {
    const startTime = performance.now();

    const promises = await srcArray.map((src) => {
        return new Promise(function (resolve, reject) {
            const img = new Image();

            img.src = src
            img.onload = resolve();
            img.onerror = reject();
        })
    })
    await Promise.all(promises);
    const endTime = performance.now(); // Record the end time
    const executionTime = endTime - startTime; // Calculate the execution time in milliseconds
    console.log(executionTime)
    if ( executionTime < 500 ) {
        setLoading(false)
    } else {
        setTimeout(() => setLoading(false), 2000)
    }
}   