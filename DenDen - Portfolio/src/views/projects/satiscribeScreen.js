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


const SatiscribeScreen = () => {

    const aspectRatio = 560/315
    const idealWidth = window.innerWidth * 0.7
    const aspectRatioHeight = idealWidth / aspectRatio

    const [visible, setVisible] = useState(true)
    const [override, setOverride] = useState(true)
    const [loading, setLoading] = useState(true)
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
                <img src='/project/satiscribe/satiscribeheader.png' className='project-data-header' />
            </div>

            <div className='project-data-content'>
                <div className='project-data-title-container'>
                    <p className='project-data-title'>ChatBot - Automated Telecommunication Customer Care</p>
                    <p className='project-data-scope'>Artificial Intelligence</p>
                </div>

                <YarnLine pathColour={pathColour} lineContainerElement={lineElementContainer[0]} pathElement={pathContainer[0]} yarnElement={yarnElementContainer[0]}/>

                <div className='project-data-info'>
                    <p className='project-data-date'>April - March 2022</p>
                    <p className='project-data-company'>NLP</p>
                    <div className='project-data-links'>
                        <a className='project-data-link' href='https://github.com/DenDen2002/Telecommunication-chat-bot' target='_blank'>GitHub</a>
                    </div>
                </div>

                <div className='project-data-details'>
                    <p>ChatbotX is your all-in-one solution for telecommunication chatbots. Whether you need technical support, billing assistance, or just want to chat, ChatbotX has you covered. Let’s explore how we’re building this intelligent chatbot using PyTorch and NLP models.</p>

                    <h1>Solution Approach:</h1>
                    <p><strong>Data Collection and Preprocessing:</strong></p>
                    <p>1. Gather telecommunication-related conversations.</p>
                    <p>2. Tokenize sentences, remove stop words, and handle special characters.</p>

                    <h1>Model Architecture:</h1>
                    <p><strong>Sequence-to-sequence (seq2seq) model with attention.</strong></p>
                    <p>1. Encoder: LSTM or GRU to understand user input.</p>
                    <p>2. Decoder: LSTM or GRU to generate contextually relevant responses.</p>

                    <h1>Training:</h1>
                    <p>1. Train the model on preprocessed data.</p>
                    <p>2. Optimize using backpropagation and gradient descent.</p>
                    <p>3. Monitor loss and accuracy during training.</p>

                    <h1>Inference:</h1>
                    <p>1. Input user queries.</p>
                    <p>2. Encode input using trained encoder.</p>
                    <p>3. Generate responses using decoder with attention.</p>

                    <h1>Deployment:</h1>
                    <p>1. Deploy as a web service or integrate into telecommunication apps.</p>
                    <p>2. Ensure scalability and low latency.</p>

                    <h1>Challenges and Considerations:</h1>
                    <p><strong>1. Domain-Specific Vocabulary:</strong> Understand telecommunication terms and jargon.</p>
                    <p><strong>2. Handling Ambiguity:</strong> Some queries may have multiple interpretations.</p>
                    <p><strong>3. User Intent Recognition:</strong> Identify user intent (e.g., technical support, billing inquiry).</p>
                    <p><strong>4. Error Handling:</strong> Gracefully handle out-of-domain or unknown queries.</p>

                    <h1>Evaluation and Improvement:</h1>
                    <p>1. Evaluate performance using metrics like BLEU score or perplexity.</p>
                    <p>2. Continuously improve based on user feedback and retraining.</p>
                </div>
                <YarnLine pathColour={pathColour} lineContainerElement={lineElementContainer[1]} pathElement={pathContainer[1]} yarnElement={yarnElementContainer[1]}/>
                <div className='next-project'>
                    <p className='project-arrow'>→</p>
                    <p className='project-view' onClick={() => navigate('/ai_framework')}>Next Project: <span style={{'borderBottomColor': `{pathColour}`}}>AI Design Framework</span></p>
                    <div className='project-lines'></div>
                </div>
            </div>
            <div style={{height:'55vh'}}></div>
        </>
        )
    );
};

export default SatiscribeScreen;
