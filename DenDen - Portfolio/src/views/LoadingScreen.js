import React,  { useEffect }  from 'react';
import '../components/styles/LoadingScreenStyles.css';
import NavBar from '../components/navigation/Navbar';

const LoadingScreen = ({lightMode, pathColour}) => {

  useEffect(() =>  {
    if (lightMode) {
      document.querySelector('.loadingContainer').style.animation = 'fadeanimationlight 1.5s forwards 5s'
    } else {
      document.querySelector('.loadingContainer').style.animation = 'fadeanimationdark 1.5s forwards 5s'
    }
  })

  return (
    <div className='loadingContainer' style={{backgroundColor: lightMode ? 'white' : '#282828'}}>
      <div style={{opacity:0}}>
        <NavBar/>
      </div>
      <div className='logoCircle' style={{backgroundColor: lightMode ? `var(--light_orange)` : `var(--dark_brown)`}}>
        <svg id="logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 239.89 155.04">
          <defs>
          <style>{`.cls-1{stroke-miterlimit:10;}.cls-1`},{`.cls-2{fill:none;stroke:${pathColour};stroke-linecap:round;stroke-width:8px;transition:stroke 1s ease;}.cls-2{stroke-linejoin:round;}`}</style>
          </defs>
          <g id="Layer_3">
            <path className="cls-1 leftear" d="m162,34s18-30,32-30,16,44,16,44"/>
            <path className="cls-1 rightear" d="m100,34s-18-30-32-30c-14,0-16,44-16,44"/>
            <path className="cls-1 c-animation" d="m54,64s-18,21-11,53c6.64,30.34,35,23.82,35,23.82"/>
            <path className="cls-2 w-animation" d="m103.67,113s-4.52,8.75-3.61,18c.9,9.25,4.64,19.22,14.41,20,12.53,1,20.48-19,20.48-19h.05s8.01,20,20.48,19c9.77-.78,13.51-10.75,14.41-20,.9-9.25-3.61-18-3.61-18"/>
            <line className="cls-1 x1-animation" x1="159.93" y1="69.89" x2="181" y2="90.96"/>
            <line className="cls-1 x2-animation" x1="180.76" y1="69.53" x2="159.69" y2="90.61"/>
            <line className="cls-1 whisker" x2="4" y2="105" x1="26.54" y1="105"/>
            <line className="cls-1 whisker" x2="4.09" y2="117.09" x1="26.63" y1="117.09"/>
            <line className="cls-1 whisker" x1="213.26" y1="102.05" x2="235.8" y2="102.05"/>
            <line className="cls-1 whisker" x1="213.35" y1="114.14" x2="235.89" y2="114.14"/>
          </g>
        </svg>
        
        <div className='eyes' id="clip"  style={{backgroundColor: lightMode ? 'white' : `var(--eye_orange)`}}>
            <div className='pupils' style={{transform: lightMode ? 'scaleX(1)' : 'scaleX(0.3)'}}></div>
        </div>
      </div>   
    </div>
  );
};

export default LoadingScreen;
