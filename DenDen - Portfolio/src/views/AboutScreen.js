import React,  { useState, useEffect }  from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { setDocumentMode } from '../functions/lightModeFunctions';
import NavBar from '../components/navigation/Navbar';
import YarnLine from '../components/divider/YarnLineDivider';
import LineDivider from '../components/divider/LineDivider';
import experienceJSON from '../data/experience.json'

import '../components/Global.css'
import '../components/styles/AboutScreenStyles.css'
import { useSetTheme, useTheme } from '../context/lightContext';

const AboutScreen = () => {

  const [yarnpathContainer, setyarnpathContainer] = useState({})
  const [yarnlineElementContainer, setyarnlineElementContainer] = useState({})
  const [yarnElementContainer, setyarnElementContainer] = useState({})
  var initialYarnPathState = {};
  var initialYarnLineState = {};
  var initialYarnState={}

  const [pathContainer, setpathContainer] = useState({})
  const [lineElementContainer, setlineElementContainer] = useState({})
  var initialPathState = {};
  var initialLineState = {};

  document.removeEventListener('mousemove', window.handleMouseMove)

  const lightMode = useTheme()

  var pathColour = lightMode ? "var(--dark_base)" : "var(--light_base)"

  useEffect(() => {
    const allLineContainer = document.querySelectorAll('.linecontainer')
    const allPathElement = document.querySelectorAll('#path')
    const allYarnElement = document.querySelectorAll('.yarn')

    allLineContainer.forEach((lineElement, index) => {
      if (index < 3) {
        initialYarnLineState[index] = lineElement
      } else {
        initialLineState[(index - 3)] = lineElement
      }
    })

    allPathElement.forEach((pathElement, index) => {
      if (index < 3) {
        initialYarnPathState[index] = pathElement
      } else {
        initialPathState[(index - 3)] = pathElement
      }
    })

    allYarnElement.forEach((yarnElement, index) => {
        initialYarnState[index] = yarnElement
    })
    setyarnElementContainer(initialYarnState)
    setyarnlineElementContainer(initialYarnLineState)
    setyarnpathContainer(initialYarnPathState)

    setlineElementContainer(initialLineState)
    setpathContainer(initialPathState)
  }, [])



  return (
    <div className='about-container'>
        <NavBar animation={false} sticky={false}/>
          <div className='about'>
            <div className='about-header'>
              <p className='about-text'>About</p>
              <YarnLine pathColour={pathColour} lineContainerElement={yarnlineElementContainer[0]} pathElement={yarnpathContainer[0]} yarnElement={yarnElementContainer[0]}/>
            </div>

            <div className='about-content'>
              <div className='about-me'>
              <p className='about-me-text'>Since young, I have been passionate about understanding complex systems and creating innovative solutions. This led me to pursue a career in data science and artificial intelligence, fields where I can make a significant impact by designing intelligent systems that are beneficial for everyone. My goal is to harness the power of data and AI to solve real-world problems and improve people's lives.</p>
              <p className='about-me-text'>With the rapid advancements in AI today, I believe we should not fear these technologies but rather learn how to effectively integrate them into our daily lives and work. This is why I focus my efforts on the intersection of human-computer interaction and AI. It is essential that we empower ourselves with AI while ensuring that we remain in control and that these technologies serve us.</p>
              <p className='about-me-text'>In today’s rapidly evolving world, adaptability is key. I draw inspiration from the art of origami, where a single piece of paper can be transformed into countless creations. Similarly, developing a diverse skill set is crucial for staying flexible and adaptable in the face of change. Embracing life-long learning is vital to continuously grow and thrive in the dynamic fields of AI and data science.</p>
              </div>

              <div className='about-contacts'>
                <p className='about-contacts-header'>Contact Me</p>
                <a className='about-contacts-link'  href="mailto:${karmal882003@gmail.com}" target="_blank">Email</a>
                <a className='about-contacts-link'  href="https://www.linkedin.com/in/ngawang-tobden/" target="_blank">LinkedIn</a>
                <a className='about-contacts-link' style={{ marginBottom:'50px'}} href="https://github.com/DenDen2002/" target="_blank">GitHub</a>

                <p className='about-contacts-header'>More Info</p>
                <a className='about-contacts-link' href="https://drive.google.com/file/d/1qxEkUQSiZ3wJKqeA7tjZYJIW2KZ19Dem/view?usp=sharing" target="_blank">Resume</a>
              </div>
            </div>
          </div>

          <div className='skills'>
            <div className='skills-header'>
              <p className='skills-text'>Skills</p>
              <YarnLine pathColour={pathColour} lineContainerElement={yarnlineElementContainer[1]} pathElement={yarnpathContainer[1]} yarnElement={yarnElementContainer[1]}/>
            </div>

            <div className='skill-set'>
                <p className='skill-set-header'>Web Development</p>
                <p className='skill-set-text'>React, Next.js, Javascript, HTML/CSS, FastAPI, Flask</p>

                <p className='skill-set-header'>AI Development</p>
                <p className='skill-set-text'>Tensorflow, Pytorch, Computer Vision, Natural Language Processing</p>
                
                <p className='skill-set-header'>Database</p>
                <p className='skill-set-text'>MongoDB, MYSQL</p>
                
                <p className='skill-set-header'>DevOps</p>
                <p className='skill-set-text'>Docker, Google Cloud</p>
                
                <p className='skill-set-header'>Creative Development</p>
                <p className='skill-set-text' style={{marginBottom:'8px'}}>2D: Figma</p>
                <p className='skill-set-text'>3D: Blender</p>
              </div>
          </div>
          <div style={{height:'55vh'}}></div>
        </div>
  );
};

export default AboutScreen;
