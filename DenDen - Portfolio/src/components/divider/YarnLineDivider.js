import React, { useEffect, useState } from 'react';
import gsap ,{ Elastic } from 'gsap';
import '../styles/divider/LineDividerStyles.css'

function YarnLine({pathColour, lineContainerElement, pathElement, yarnElement}) {
    const [bounce, setBounce] = useState(false)
    const [mouseX, setMouseX] = useState(0);
    const [mouseY, setMouseY] = useState(0);
    const [playAnimation, setPlayAnimation] = useState(true)
    const [mouseSpeed, setMouseSpeed] = useState(0);


    const windowWidth =  window.innerWidth
    const lineWidth = windowWidth*0.85
    
    var divLocation
    let straightSection = `M0,50 L${lineWidth -16}, 50`
  

    useEffect(() => {
        if (pathElement !== undefined) {
            if (playAnimation) {
                pathElement.style.setProperty('stroke-dasharray', (lineWidth -17) + 'px')
                pathElement.style.setProperty('stroke-dashoffset', (lineWidth -18) + 'px')
                pathElement.style.opacity = '1'
                pathElement.style.animation = 'drawline 3.99s forwards ease-in-out';
                yarnElement.style.animation = 'rollin 4s forwards ease-in-out, rotating 4s forwards ease-in-out'

                const timeoutId = setTimeout(() => {
                    setPlayAnimation(false)
                    }, 4000); 
                  return () => {
                    clearTimeout(timeoutId);
                  };
            } else {
                window.addEventListener('mousemove', handleMouseMove);
                var rangecurveleft = mouseX - 50
                var rangecurveright = mouseX + 50 > `${lineWidth - 50}` ? `${lineWidth - 50}` : mouseX + 50
            
                var leftsection = `M0,50 L${rangecurveleft}, 50`
                var rightsection = `M${rangecurveright},50 L${lineWidth-16}, 50`
                var curve = `M${rangecurveleft}, 50 Q${mouseX}, 50 ${rangecurveright}, 50`
                var line = leftsection + " " + curve + " " + rightsection
                
                pathElement.setAttribute('d', line);
            }
        } else {
            setPlayAnimation(true)
        }
        return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [playAnimation,  pathElement]);

    const handleMouseMove = (e) => {
        var mouseXcoord = e.clientX;
        var mouseYcoord = e.clientY;
        setMouseX(e.offsetX);
        setMouseY(e.offsetY);
        divLocation = lineContainerElement.getBoundingClientRect()

        if ( 0 <= divLocation.bottom <= window.innerHeight) {
            if (divLocation.left <= mouseXcoord && mouseXcoord <= (divLocation.right - 100) && (divLocation.top) <= mouseYcoord && mouseYcoord <= (divLocation.bottom)) {
                setBounce(true)
            } else {
                setBounce(false)
            }

            if (mouseYcoord < (divLocation.top + divLocation.bottom)/2) {
                setMouseSpeed(-1)
            } else {
                setMouseSpeed(1)
            }
        } else {
            setBounce(false)
        }
    };


    function setCurve () {
        if (bounce) {
            var randomInt = Math.floor( Math.random() * (200 - 25) + 25)
            var randomYInt = Math.floor( Math.random() * (50 - 0))

            var rangecurveleft = mouseX - randomInt < `${windowWidth*0.075}` ? 0 : mouseX - randomInt;
            var rangecurveright = mouseX + randomInt > `${lineWidth - 50}` ? `${lineWidth - 50}` : mouseX + randomInt
            var curveup = 50 + (mouseSpeed === -1 ? randomYInt : mouseSpeed === 1 ? -randomYInt : 0);

            var leftsection = `M0,50 L${rangecurveleft}, 50`
            var rightsection = `M${rangecurveright},50 L${lineWidth -16}, 50`

            var curve = `M${rangecurveleft}, 50 Q${mouseX}, ${curveup} ${rangecurveright}, 50`

            var line = leftsection + " " + curve + " " + rightsection
            // var pathElement = document.getElementById('#path');

            gsap.to(pathElement, {
              attr: { d: line },
              duration: 1, 
              ease: Elastic.easeOut.config(0.5, 50), 
            });
          } else {
            var rangecurveleft = mouseX - 50
            var rangecurveright = mouseX + 50 > `${lineWidth - 50}` ? `${lineWidth - 50}` : mouseX + 50
        
            var leftsection = `M0,50 L${rangecurveleft}, 50`
            var rightsection = `M${rangecurveright},50 L${lineWidth - 16}, 50`
            var curve = `M${rangecurveleft}, 50 Q${mouseX}, 50 ${rangecurveright}, 50`
            var line = leftsection + " " + curve + " " + rightsection

            // var pathElement = document.getElementById('#path');
        
            gsap.to(pathElement, {
              attr: { d: line },
              duration: 1, 
              ease: Elastic.easeOut.config(0.5, 15), 
            });
          }
        }


    useEffect(() => {
        if (!playAnimation) {
            setCurve()
        }
    }, [mouseX, mouseY])
    

    return (
        <>
            <div className='linecontainer'>
                <svg width={lineWidth-16} height="75">
                <path
                    vectorEffect="non-scaling-stroke"
                    id="path"
                    d={straightSection}
                    stroke= {pathColour}
                    strokeWidth="1.5px"
                    fill="none"
                    style={{transition: 'stroke 1.5s ease', opacity:'0'}}
                />
                </svg>
                <svg className='yarn' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 225 225">
                    <defs>
                        <style>{`.cls-1{fill:none;stroke:${pathColour};stroke-miterlimit:10;stroke-width:8px;transition: stroke 1.5s ease}`}</style>
                    </defs>
                    <g id="Layer_4">
                        <circle className="cls-1" cx="112.5" cy="112.5" r="108.5"/>
                        <path className="cls-1" d="m138.07,166.72c13.66,23.51,28.93,39.28,28.93,39.28"/>
                        <path className="cls-1" d="m143,11s-25,30-26,86c-.04,2.27,0,4.54.13,6.79"/>
                        <path className="cls-1" d="m83.62,149.89c13.86,38.78,42.76,68.64,42.76,68.64"/>
                        <path className="cls-1" d="m120,5s-25.91,29.95-37,72"/>
                        <path className="cls-1" d="m117.13,103.79c46.86,25.24,103.87,17.21,103.87,17.21"/>
                        <path className="cls-1" d="m48.01,25.25s15.99,44.75,60.99,73.75c2.67,1.72,5.38,3.31,8.13,4.79"/>
                        <path className="cls-1" d="m29.82,110.51c-17.82,22.49-15.67,47.87-15.67,47.87"/>
                        <path className="cls-1" d="m101.04,4.6s-19.83,20.55-38.3,46.08"/>
                        <path className="cls-1" d="m71.12,142.05c-23.12,20.95-23.12,56.95-23.12,56.95"/>
                        <path className="cls-1" d="m51.52,127.42c-.15.62-.31,1.25-.46,1.87"/>
                        <path className="cls-1" d="m124.24,137.38c44.5,10.41,93.76.62,93.76.62"/>
                        <path className="cls-1" d="m59.59,99.04c8.25,8.38,18.01,16.73,29.37,24.05,10.58,6.82,22.74,11.36,35.29,14.29"/>
                        <path className="cls-1" d="m43.46,80.41c4.54,5.95,9.9,12.3,16.12,18.63"/>
                        <path className="cls-1" d="m24,49s6.19,14,19.46,31.41"/>
                        <path className="cls-1" d="m138.19,166.65c38.82,2.28,73.81-11.65,73.81-11.65"/>
                        <path className="cls-1" d="m29.08,109.75c19.07,19.56,46.14,38.61,72.92,49.25,11.82,4.69,24.19,6.95,36.19,7.65"/>
                        <path className="cls-1" d="m8,82c4.55,8.78,11.89,18.32,21.08,27.75"/>
                        <path className="cls-1" d="m192,38s-49-6-66,7"/>
                        <path className="cls-1" d="m208,61s-57-16-89,14"/>
                        <path className="cls-1" d="m215,80s-61.67-7.13-93.67,22.87"/>
                        <path className="cls-1" d="m51.48,126.01c-23.77,20.21-21.48,56.99-21.48,56.99"/>
                        <path className="cls-1" d="m57,161c4,40,26,56,26,56"/>
                    </g>
                </svg>
            </div>
        </>
  )
}

export default YarnLine;
