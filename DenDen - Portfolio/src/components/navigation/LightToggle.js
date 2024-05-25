import React,  { useEffect, useState }  from 'react';
import '../styles/navigation/LightToggleStyles.css';
import { Sun } from 'react-feather';

import { useSetTheme, useTheme } from '../../context/lightContext';

const LightToggle = () => {

  const [onMount, setOnMount] = useState(0)
  
  const lightMode = useTheme()
  const setLightMode = useSetTheme()

  useEffect(() => {
    if (!lightMode && onMount >= 1) {
      document.querySelector('.toggleButton').style.animation = 'togglemoveleft 1s ease-in-out forwards'
      document.querySelector('.toggleEyes').style.animation = 'eyeSlit 1s ease-in-out forwards'
    } else if (onMount >= 1){
      document.querySelector('.toggleButton').style.animation = 'togglemoveright 1s ease-in-out forwards'
      document.querySelector('.toggleEyes').style.animation = 'eyeWiden 1s ease-in-out forwards'
    } else if (onMount < 1 && lightMode !== undefined){
      setOnMount(onMount + 1)
    } 
  }, [lightMode])
    

  return (
    <div className='lightToggleContainer' onClick={() => setLightMode()} style={{backgroundColor: lightMode ? `var(--dark_base)` : `var(--light_base)`}}>
      <div className='toggleButton' style={{backgroundColor: lightMode ? `var(--light_base)` : `var(--eye_orange)`, left: lightMode ? '1.7em' : '0.15em'}} >
        <div className='toggleEyes' style={{transform: lightMode ? 'scaleX(1)' : 'scaleX(0.2)'}}></div>
      </div>

      <Sun className='sun' style={{opacity: lightMode ? 1 : 0}}/>
      <div className='moon' style={{opacity: lightMode ? 0 : 1}}></div>

    </div>
  );
};

export default LightToggle;
