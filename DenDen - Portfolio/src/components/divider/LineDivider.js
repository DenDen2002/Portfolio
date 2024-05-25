import React, { useEffect, useState } from 'react';
import gsap ,{ Elastic } from 'gsap';
import '../styles/divider/LineDividerStyles.css'
import '../styles/AboutScreenStyles.css'

function LineDivider({pathColour, lineContainerElement, pathElement}) {
    const [bounce, setBounce] = useState(false)
    const [mouseX, setMouseX] = useState(0);
    const [mouseY, setMouseY] = useState(0);
    const [playAnimation, setPlayAnimation] = useState(true)
    const [mouseSpeed, setMouseSpeed] = useState(0);


    const windowWidth =  window.innerWidth
    const lineWidth = windowWidth*0.85
    
    var divLocation
    let straightSection = `M0,50 L${lineWidth}, 50`
  

    useEffect(() => {
        if (pathElement !== undefined) {
            if (playAnimation) {
                pathElement.style.animation = 'tableright 1.2s forwards ease-in-out 1.25s'
                const timeoutId = setTimeout(() => {
                    setPlayAnimation(false)
                    }, 3000); 
                  return () => {
                    clearTimeout(timeoutId);
                  };
            } else {
                window.addEventListener('mousemove', wave);
                var rangecurveleft = mouseX - 50
                var rangecurveright = mouseX + 50 > `${lineWidth}` ? `${lineWidth}` : mouseX + 50
            
                var leftsection = `M0,50 L${rangecurveleft}, 50`
                var rightsection = `M${rangecurveright},50 L${lineWidth}, 50`
                var curve = `M${rangecurveleft}, 50 Q${mouseX}, 50 ${rangecurveright}, 50`
                var line = leftsection + " " + curve + " " + rightsection
                
                pathElement.setAttribute('d', line);
            }
        } else {
            setPlayAnimation(true)
        }
        return () => {
        window.removeEventListener('mousemove', wave);
        };
    }, [playAnimation,  pathElement]);


    const wave = (e) => {
        var mouseXcoord = e.clientX;
        var mouseYcoord = e.clientY;
        setMouseX(e.offsetX);
        setMouseY(e.offsetY);
        divLocation = lineContainerElement.getBoundingClientRect()

        if ( 0 <= divLocation.bottom <= window.innerHeight) {
            if (divLocation.left <= mouseXcoord && mouseXcoord <= (divLocation.right) && (divLocation.top-10) <= mouseYcoord && mouseYcoord <= (divLocation.bottom+10)) {
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
            var rangecurveright = mouseX + randomInt > `${lineWidth}` ? `${lineWidth}` : mouseX + randomInt
            var curveup = 50 + (mouseSpeed === -1 ? randomYInt : mouseSpeed === 1 ? -randomYInt : 0);

            var leftsection = `M0,50 L${rangecurveleft}, 50`
            var rightsection = `M${rangecurveright},50 L${lineWidth}, 50`

            var curve = `M${rangecurveleft}, 50 Q${mouseX}, ${curveup} ${rangecurveright}, 50`

            var line = leftsection + " " + curve + " " + rightsection            // var pathElement = document.getElementById('#path');

            gsap.to(pathElement, {
              attr: { d: line },
              duration: 1, 
              ease: Elastic.easeOut.config(0.5, 50), 
            });
          } else {
            var rangecurveleft = mouseX - 50
            var rangecurveright = mouseX + 50 > `${lineWidth}` ? `${lineWidth}` : mouseX + 50
        
            var leftsection = `M0,50 L${rangecurveleft}, 50`
            var rightsection = `M${rangecurveright},50 L${lineWidth}, 50`
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
                <svg width={lineWidth} height="75">
                <path
                    vectorEffect="non-scaling-stroke"
                    id="path"
                    className='linePath'
                    d={straightSection}
                    stroke= {pathColour}
                    strokeWidth="1.5px"
                    fill="none"
                    style={{transition: 'stroke 1.5s ease'}}
                />
                </svg>
            </div>
        </>
  )
}

export default LineDivider;
