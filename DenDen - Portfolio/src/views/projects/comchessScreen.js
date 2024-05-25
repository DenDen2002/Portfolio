import React,  { useState, useEffect }  from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { useTheme } from '../../context/lightContext';
import { assignLoadingScreen, rollYarn, scrollToTop } from '../../functions/projectsFunction';

import NavBar from '../../components/navigation/Navbar';
import YarnLine from '../../components/divider/YarnLineDivider';
import ProjLoadingScreen from '../../components/loaders/projloaderScreen';

import '../../components/Global.css'
import '../../components/styles/projects/Main.css'
import '../../components/styles/projects/SatiscribeStyles.css'

const CChessScreen = () => {

    const aspectRatio = 560/315
    const idealWidth = window.innerWidth * 0.7
    const aspectRatioHeight = idealWidth / aspectRatio

    const lightMode = useTheme()

    const [visible, setVisible] = useState(true)
    const [override, setOverride] = useState(true)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

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
                <img src='/project/communitychess/ccheader.png' className='project-data-header' />
            </div>

            <div className='project-data-content'>
                <div className='project-data-title-container'>
                    <p className='project-data-title'>Community Chess</p>
                    <p className='project-data-scope'>DESIGN THINKING, ANIMATION</p>
                </div>

                <YarnLine pathColour={pathColour} lineContainerElement={lineElementContainer[0]} pathElement={pathContainer[0]} yarnElement={yarnElementContainer[0]}/>

                <div className='project-data-info'>
                    <p className='project-data-date'>Feb - Apr 2022</p>
                    <p className='project-data-company'>SUTD</p>
                    <div className='project-data-links'>
                        <a className='project-data-link' href='http://asd.courses.sutd.edu.sg/dti-teams/project-part-1-cheng-wei-xuan/' target='_blank'>Phase 1</a>
                        <a className='project-data-link' href='http://asd.courses.sutd.edu.sg/dti-teams/project-part-2-c1g7/' target='_blank'>Phase 2</a>
                        <a className='project-data-link' href='http://asd.courses.sutd.edu.sg/dti-teams/project-part-3-cheng-wei-xuan/' target='_blank'>Phase 3</a>
                        <a className='project-data-link' href='http://asd.courses.sutd.edu.sg/dti-teams/project-part-4-c1g7/#start' target='_blank'>Phase 4</a>
                    </div>
                </div>

                <div className='project-data-details'>
                    <p>Community Chess is a life sized interactive Chess game which aims to foster community spirit around Changi Business Park. Passers-by can join a team and collectively strategise on what is the best move to beat the opponent team in a game of chess through the web app. At night, the physical chess pieces also light up, providing an ambience and becoming a light installation instead.
                        <br/><br/>
                        As this project is under the Design Thinking and Innovation module, I was introduced to the double diamond framework, with each stage in the framework being a key milestone for our project. The 4 phases can be summarised in the following:
                        <br/><br/>
                        1. Discover - This was an individual component where I had to discover opportunities at a chosen site by using the <b>Macro AEIOU</b> (activity, environment, interactions, objects and users) approach. 
                        <br/><br/>
                        2. Define - This was a group component where we used a pugh chart to select our area of interest among our unique sites from phase 1. We then did a <b>MICRO AEIOU</b> approach to better understand the design opportunities of our chosen site to design our problem statement. During this phase, I was in charge of all the drawings and sketches.
                        <br/><br/>
                        3. Develop - This was an individual component where I explored multiple solution before finalising on one and expanding on the idea. This was done through the use of <b>storyboards, tree diagrams and user journey maps</b>.
                        <br/><br/>
                        4. Deliver - Once again, this was a group component where we came together to select a solution from our 5 unique solutions. We were then tasked to prototype our solution and document our design journey. I was sketched the different designs of our solution and designed the posters. Furthermore, I made a motion graphic animation detailing our solution in <b>Adobe After Effects</b>.
                        </p>
                    <div className='project-redirect' style={{marginBottom:'2vh', marginTop:'2vh'}}>
                        <div className='project-redirect-links'>
                            <p className='project-arrow'>→</p>
                            <a style={{'borderBottomColor': `{pathColour}`, textDecoration:'none'}} className='project-view' href='http://asd.courses.sutd.edu.sg/dti-teams/project-part-1-cheng-wei-xuan/' target='_blank'><span>View Phase 1 Discover</span></a>
                        </div>
                        <div className='project-redirect-links'>
                            <p className='project-arrow'>→</p>
                            <a style={{'borderBottomColor': `{pathColour}`, textDecoration:'none'}} className='project-view' href='http://asd.courses.sutd.edu.sg/dti-teams/project-part-2-c1g7/' target='_blank'><span>View Phase 2 Define</span></a>
                        </div>
                    </div>
                    <div className='project-redirect'>
                        <div className='project-redirect-links'>
                            <p className='project-arrow'>→</p>
                            <a style={{'borderBottomColor': `{pathColour}`, textDecoration:'none'}} className='project-view' href='http://asd.courses.sutd.edu.sg/dti-teams/project-part-3-cheng-wei-xuan/' target='_blank'><span>View Phase 3 Develop</span></a>
                        </div>
                        <div className='project-redirect-links'>
                            <p className='project-arrow'>→</p>
                            <a style={{'borderBottomColor': `{pathColour}`, textDecoration:'none'}} className='project-view' href='http://asd.courses.sutd.edu.sg/dti-teams/project-part-4-c1g7/#start' target='_blank'><span>View Phase 4 Deliver</span></a>
                        </div>
                    </div>
                </div>
                <div className='project-data-image-container'>
                    <div style={{marginLeft:'7vw'}}>
                        <iframe width={idealWidth} height={aspectRatioHeight} src="https://www.youtube.com/embed/KGasKbLUNzM?si=lYgEy-SB106PPnxa" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                    </div>
                </div>

                <YarnLine pathColour={pathColour} lineContainerElement={lineElementContainer[1]} pathElement={pathContainer[1]} yarnElement={yarnElementContainer[0]}/>
                <div className='next-project'>
                    <p className='project-arrow'>→</p>
                    <p className='project-view' onClick={() => navigate('/kopilo')}>Next Project: <span style={{'borderBottomColor': `{pathColour}`}}>DBS Digitialising Fund Transfer Dispute</span></p>
                    <div className='project-lines'></div>
                </div>
            </div>
            <div style={{height:'55vh'}}></div>
        </>
        )
    );
};

export default CChessScreen;
