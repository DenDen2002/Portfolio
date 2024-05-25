import React,  { useEffect, useRef }  from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin  } from '@fortawesome/free-brands-svg-icons';

import { movePupils } from '../functions/lightModeFunctions';
import '../components/styles/LandingHeaderStyles.css';
import '../components/Global.css';
import { useSetTheme } from '../context/lightContext';

const LandingHeader = ({lightMode, isloadingScreen, pathColour , onClick}) => {

  let animationFinished = false;
  var mountingCount = useRef(0);
  let pupilXoffset;
  let pupilYoffset;

  const setLightMode = useSetTheme()

  useEffect(() => {
    if (isloadingScreen === false && mountingCount.current >= 1) {
      mountingCount.current += 1
      const eyeContainer = document.querySelector('.eyesHome');
      const pupils = document.querySelector('.pupilsHome');
      eyeContainer.style.animation = "none";
      pupils.style.animation = "none";
      pupils.style.top = '-1px';
      pupils.style.left = '18px';
  
      document.body.style.transition = "background-color 2.5s, border-color 2.5s"
      document.body.style.transitionDelay = "0.1s"

      if (lightMode === true) {
          eyeContainer.style.animation = "narrowingeyes 1.5s ease forwards";
          pupils.style.animation = "openeyes 2s ease forwards";
          setTimeout(() => {
            eyeContainer.style.backgroundColor = "white"
          }, 100)
      } else if (lightMode === false) {
          eyeContainer.style.animation = "narrowingeyes 1.5s ease forwards";
          pupils.style.animation = "sliteyes 2s ease forwards";
          setTimeout(() => {
            eyeContainer.style.backgroundColor = "var(--eye_orange)"
          }, 100)
      } 
      eyeContainer.addEventListener("animationend", () => {
        eyeContainer.style.animation = "blinking 6s ease-in-out infinite 5s";
        pupils.style.animation = "none";
      }, { once: true }); 
    }
    else {
      mountingCount.current += 1
    }
  }, [lightMode]);
  


  useEffect(()=> {
    if (!isloadingScreen && lightMode!==undefined) {  
      document.getElementsByClassName("contactbutton")[0].addEventListener("mouseover", mouseOver);
      document.getElementsByClassName("contactbutton")[0].addEventListener("mouseout", mouseOut);
      document.querySelector('.logoCircleHome').addEventListener("animationend", animationEnd);
      document.removeEventListener("mousemove", window.handleMouseMove);
      document.addEventListener("mousemove", handleMouseMove);
      document.querySelector('.pupilsHome').style.transform = lightMode ? 'scaleX(1)' : `scaleX(0.3)`;
      window.handleMouseMove = handleMouseMove;
    }
  }, [isloadingScreen, lightMode])


  function handleMouseMove(e) {
    movePupils(e, animationFinished, pupilXoffset, pupilYoffset);
  }
  
  function mouseOver() {
    var getInTouchElement = document.getElementsByClassName("getintouch")[0];
    setTimeout(function() {
      getInTouchElement.textContent = "Send a mail?";
    }, 100)
  }

  function mouseOut() {
    var getInTouchElement = document.getElementsByClassName("getintouch")[0];
    setTimeout(function() {
      getInTouchElement.textContent = "Get in touch";
    }, 100)
  }

  function contactMe() {
    const email = "karmal882003@gmail.com";
    const mailtoLink = `mailto:${email}`;
    window.location.href = mailtoLink;
  }


  function animationEnd() {
    animationFinished = true
    const eyeContainer = document.querySelector('.eyesHome');
    const logoCircle = document.querySelector('.logoCircleHome');
    pupilXoffset = eyeContainer.offsetLeft + logoCircle.offsetLeft;
    pupilYoffset = eyeContainer.offsetTop + logoCircle.offsetTop;
  }


  return (
    <>
        <div className='flexcontainer'>
            <div className='logoCircleHome' style={{backgroundColor: lightMode ? `var(--light_orange)` : `var(--dark_brown)`}}>
                <svg id="logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 239.89 155.04">
                <defs>
                    <style>{`.cls-1{stroke-miterlimit:10;}.cls-1`},{`.cls-2{fill:none;stroke:${pathColour};stroke-linecap:round;stroke-width:8px;transition:stroke 1s ease;}.cls-2{stroke-linejoin:round;}`}</style>
                </defs>
                <g id="Layer_3">
                    <path className="cls-1" d="m162,34s18-30,32-30,16,44,16,44"/>
                    <path className="cls-1" d="m100,34s-18-30-32-30c-14,0-16,44-16,44"/>
                    <path className="cls-1" d="m54,64s-18,21-11,53c6.64,30.34,35,23.82,35,23.82"/>
                    <path className="cls-2" d="m103.67,113s-4.52,8.75-3.61,18c.9,9.25,4.64,19.22,14.41,20,12.53,1,20.48-19,20.48-19h.05s8.01,20,20.48,19c9.77-.78,13.51-10.75,14.41-20,.9-9.25-3.61-18-3.61-18"/>
                    <line className="cls-1" x1="159.93" y1="69.89" x2="181" y2="90.96"/>
                    <line className="cls-1" x1="180.76" y1="69.53" x2="159.69" y2="90.61"/>
                    <line className="cls-1" x2="4" y2="105" x1="26.54" y1="105"/>
                    <line className="cls-1" x2="4.09" y2="117.09" x1="26.63" y1="117.09"/>
                    <line className="cls-1" x1="213.26" y1="102.05" x2="235.8" y2="102.05"/>
                    <line className="cls-1" x1="213.35" y1="114.14" x2="235.89" y2="114.14"/>
                </g>
                </svg>
                
                <div className='eyesHome' id="clip" onClick={() => setLightMode()} style={{backgroundColor: lightMode ? 'white' : `var(--eye_orange)`}} >
                    <div className='pupilsHome'></div>
                </div>
            </div>

            <div className='welcometext'>
                <p className='info'>Hi! I’m Ngawang Tobden,</p>
                <p className='info2'>a Backend Developer and an AI&DS student.</p>
                <p className='info3'>Let's make things <span className='outline' style={{WebkitTextStrokeColor: pathColour}}>fun</span>!</p>
                <div className='iconContainer'>
                <button className='contactbutton'>
                    <p> <span className='arrow'>→ </span><span className='getintouch' onClick={contactMe}>Get in touch</span></p>
                </button>
                <div className='righticonContainer'>
                    <a style={{position:'relative'}} href='https://github.com/DenDen2002' target="_blank">
                    <FontAwesomeIcon icon={faGithub} className="externalIcon" style={{color:pathColour}}/>
                    <div className='hoverContainer'>GitHub</div>
                    </a>
                    <a  style={{position:'relative'}}  href='https://www.linkedin.com/in/ngawang-tobden' target="_blank">
                    <FontAwesomeIcon icon={faLinkedin} className="externalIcon" style={{color: pathColour}}/>
                    <div className='hoverContainer'>LinkedIn</div>
                    </a>
                </div>
                </div>
            </div>

            <div className='flexright' onClick={onClick}>
                <p className='scroll'>Scoll to discover</p>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className='arrowdown' style={{fill: pathColour}}>
                <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/>
                </svg>
            </div>
        </div>
    </>
  )
};

export default LandingHeader;
