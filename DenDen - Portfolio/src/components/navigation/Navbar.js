import React,  { useEffect }  from 'react';
import '../styles/navigation/NavBarScreenStyles.css';
import { useNavigate, useLocation } from 'react-router-dom';

import LightToggle from './LightToggle';

import { useTheme } from '../../context/lightContext';

const NavBar = ({animation, override, visible, sticky}) => {

  const location = useLocation();
  const navigate = useNavigate();
  const lightMode = useTheme()
  const pathColour = !(override === undefined ) ? override: lightMode

  useEffect(() => {
    if (animation) {
      document.querySelector('.navContainer').style.opacity = 0
      document.querySelector('.navContainer').style.animation = 'fadein 1s forwards'
    } else {
      document.querySelector('.navContainer').style.animation = 'none';
      document.querySelector('.navContainer').style.opacity = 1
    }
  })

  return (
    <div className='navContainer' style={{visibility: visible===false ? 'hidden' : 'visible', position: sticky===false ? 'static' : 'sticky'}}>
        <p className={pathColour ? 'name' : 'namedark'} onClick={() => navigate('/', {state: {firstTime:false}})}> Ngawang Tobden</p>
        <div className='rightnavContainer'>
            <p className={pathColour ? 'righttext' : 'righttextdark'} style={{textDecoration: location.pathname==='/archive' ? 'underline' : 'none'}} onClick={() => navigate('/archive')}>Archive</p>
            <p className={pathColour ?'righttext' : 'righttextdark'} style={{textDecoration: location.pathname==='/about' ? 'underline' : 'none'}} onClick={() => navigate('/about')}>About</p>
            <LightToggle/>
        </div>
    </div>
  );
};

export default NavBar;
