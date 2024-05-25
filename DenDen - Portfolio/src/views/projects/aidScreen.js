import React,  { useState, useEffect }  from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { useTheme } from '../../context/lightContext';
import { assignLoadingScreen, rollYarn, scrollToTop } from '../../functions/projectsFunction';

import NavBar from '../../components/navigation/Navbar';
import YarnLine from '../../components/divider/YarnLineDivider';
import ProjLoadingScreen from '../../components/loaders/projloaderScreen';

import '../../components/Global.css'
import '../../components/styles/projects/Main.css'
import '../../components/styles/projects/AidStyles.css'

const AidScreen = () => {
   
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
                <img src='/project/aid/aidheader.png' className='project-data-header' />
            </div>

            <div className='project-data-content'>
                <div className='project-data-title-container'>
                    <p className='project-data-title'>AI Automated Design Framework</p>
                    <p className='project-data-scope'>AI - NLP</p>
                </div>

                <YarnLine pathColour={pathColour} lineContainerElement={lineElementContainer[0]} pathElement={pathContainer[0]} yarnElement={yarnElementContainer[0]}/>

                <div className='project-data-info'>
                    <p className='project-data-date'>Apr - May 2023</p>
                    <p className='project-data-company'>NLP</p>
                    <div className='project-data-links'>
                        <a className='project-data-link' href='https://github.com/DenDen2002/AI-Automated-Design-Framework' target='_blank'>GitHub</a>
                    </div>
                </div>

                <div className='project-data-details'>
                    <p>This AI Automated Design Framework is a suggested pipeline to help generate design opportunities of a given product by simply entering the product name.
                    <br/><br/>
                    The framework make uses of different NLP models and techniques. There are 4 main parts in this framework
                    <br/><br/>
                    1. Data Crawling and Collection <br/>
                    2. Data Cleaning and Categorisation <br/>
                    3. Sentiment Analysis <br/>
                    4. Data summarisation <br/>
                    5. Generation of Design Opportunities <br/>
                    <br/><br/>
                    The framework starts with Data Crawling and Collection. When a product name is submitted, <b>Selenium</b> is used to gather product reviews on multiple online shopping platforms.
                    <br/><br/>
                    These data will then be cleaned and categorised through 2 <b>BART zero shot model</b> to first extract out irrelevant product reviews before categorising them into qualities related to the product such as price, weight, battery life etc. These qualities are extracted out from Google Shopping’s product categories.
                    <br/><br/>
                    Once the data have been cleaned and categorised, they are passed through a <b>FLAIR</b> sentiment analysis model to categorise the reviews as positive or negative. These reviews help determine which product qualities are of most importance.
                    <br/><br/>
                    Due to the large amount of reviews, it is difficult to send all these data to a Large Language Model. Hence, an <b>abstractive summariser</b> is used to summarise all the product reviews categorised as positive/negative for the specific quality.
                    <br/><br/>
                    The summaries are then sent to a LLM, <b>GPT-3</b> to generate a list of design opportunities for the product based on the reviews.
                    <br/><br/>
                    This framework covers from data collection to processing the data and thus is versatile for almost all products (as long as there are product reviews online!) The main limitation of this framework is the large time it requires due to the long pipeline with multiple steps.</p>
                </div>
                <div className='project-data-image-container'>

                    <div className='aid-image-container'>
                        <img src='/project/aid/pipeline1.png' className='aid-image'></img>
                        <img src='/project/aid/pipeline2.png' className='aid-image'></img>
                        <img src='/project/aid/pipeline3.png' className='aid-image'></img>
                        <img src='/project/aid/pipeline4.png' className='aid-image'></img>
                        <img src='/project/aid/pipeline5.png' className='aid-image' style={{marginBottom:'0vh'}}></img>
                    </div>

                </div>

                <YarnLine pathColour={pathColour} lineContainerElement={lineElementContainer[1]} pathElement={pathContainer[1]} yarnElement={yarnElementContainer[1]}/>
                <div className='next-project'>
                    <p className='project-arrow'>→</p>
                    <p className='project-view' onClick={() => navigate('/kopilo')}>Go back to first project: <span style={{'borderBottomColor': `{pathColour}`}}>DrukChessAI</span></p>
                    <div className='project-lines'></div>
                </div>
            </div>
            <div style={{height:'55vh'}}></div>
        </>
        )
    );
};

export default AidScreen;
