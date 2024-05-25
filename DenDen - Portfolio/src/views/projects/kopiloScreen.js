import React,  { useState, useEffect }  from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { useTheme } from '../../context/lightContext';
import { assignLoadingScreen, rollYarn, scrollToTop } from '../../functions/projectsFunction';

import NavBar from '../../components/navigation/Navbar';
import YarnLine from '../../components/divider/YarnLineDivider';
import ProjLoadingScreen from '../../components/loaders/projloaderScreen';

import '../../components/Global.css'
import '../../components/styles/projects/Main.css'

const KopiloScreen = () => {

    const [override, setOverride] = useState(true)
    const [loading, setLoading] = useState(true)
    const [visible, setVisible] = useState(true)
    const navigate = useNavigate()

    const lightMode = useTheme()
    var pathColour = lightMode ? "var(--dark_base)" : "var(--light_base)"

    const [pathContainer, setpathContainer] = useState({})
    const [lineElementContainer, setlineElementContainer] = useState({})
    const [yarnElementContainer, setyarnElementContainer] = useState({})
    var initialPathState = {};
    var initialLineState = {};
    var initialYarnState={}

    const { pathname } = useLocation();

    document.removeEventListener('mousemove', window.handleMouseMove)

    window.onbeforeunload = function () {
        window.scrollTo(0, 0);
      }

    useEffect(() => {
        window.removeEventListener('scroll', window.handleScroll);
        window.addEventListener('scroll', handleScroll);
        window.handleScroll = handleScroll;
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [])
    
    function handleScroll() {
        const rect = document.querySelector('.project-data-header').getBoundingClientRect()
        const header = document.querySelector('.project-data-title').getBoundingClientRect()
        if (rect.bottom > (window.innerHeight*0.1)) {
            setOverride(true);
        } else {
            setOverride(undefined);
        }

        if (header.top < (window.innerHeight*0.14)) {
            setVisible(false)
        } else {
            setVisible(true)
        }
      }
    
    useEffect(() => {
        assignLoadingScreen(3, setLoading)
    }, []);

    useEffect(() => {
        rollYarn(loading, 
            initialLineState, 
            initialPathState, 
            initialYarnState, 
            setlineElementContainer,
            setpathContainer,
            setyarnElementContainer)
    }, [loading])

    useEffect(() => {
        scrollToTop()
    }, [pathname]);


    return (
        loading ? (
            <ProjLoadingScreen/>
        ) : (
        <>
            <NavBar animation={false} override={override} visible={visible}/>
            <div>
                <img src='/project/kopilo/dbsheader.png' className='project-data-header' />
            </div>

            <div className='project-data-content'>
                <div className='project-data-title-container'>
                    <p className='project-data-title'>Taking Artificial Intelligence to the next level</p>
                    <p className='project-data-scope'>Artificial Intelligence</p>
                </div>

                <YarnLine pathColour={pathColour} lineContainerElement={lineElementContainer[0]} pathElement={pathContainer[0]} yarnElement={yarnElementContainer[0]}/>

                <div className='project-data-info'>
                    <p className='project-data-date'>Feb - May 2023</p>
                    <p className='project-data-company'>Reinforcement Learning</p>
                    <div className='project-data-links'>
                        <a className='project-data-link' href='https://github.com/DenDen2002/DrukChessAi' target='_blank'>GitHub</a>
                        <a className='project-data-link' href='https://docs.google.com/document/d/1Cy9plPfeOUgQyY38wvMfb9fAW6aA2Xvh/edit' target='_blank'>Documentation</a>
                    </div>
                </div>

                <div className='project-data-details' style={{marginBottom:'12vh'}}>
                    <p>During my college project, I had the exciting opportunity to delve into the fascinating world of artificial intelligence (AI) and apply it to a classic game: chess. Our goal was to create a chess-playing AI agent that could learn and improve through reinforcement learning techniques.
                        <br/><br/>We kicked off the project by understanding the problem space and the tough requirements. To achieve this, we needed to create an intelligent system capable of handling complex scenarios and play on a high level.<br/>
                        <br/>After understanding the different rule sets of chess and how the decision is made efficiently made by min maxing the reward system, i was able to create a AI model good enough to beat a average human. <b></b> 
                        The main challenge was ensuring that our model training had enough time to be of the right level before the deadline came.<br/><br/>
                        </p>
                    <div className='project-redirect'>
                        <div className='project-redirect-links'>
                            <p className='project-arrow'>→</p>
                            <a style={{'borderBottomColor': `{pathColour}`, textDecoration:'none'}} className='project-view' href='https://druk-chess-ai.onrender.com' target='_blank'><span>View our Project Website</span></a>
                        </div>
                    </div>
                </div>

                <YarnLine pathColour={pathColour} lineContainerElement={lineElementContainer[1]} pathElement={pathContainer[1]} yarnElement={yarnElementContainer[1]}/>
                <div className='next-project'>
                    <p className='project-arrow'>→</p>
                    <p className='project-view' onClick={() => navigate('/satiscribe')}>Next Project: <span style={{'borderBottomColor': `{pathColour}`}}>ChatBot</span></p>
                    <div className='project-lines'></div>
                </div>
            </div>
            <div style={{height:'55vh'}}></div>
        </>
        )
    );
};

export default KopiloScreen;
