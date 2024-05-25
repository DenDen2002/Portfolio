import React, { useRef, useState } from "react";

import {
  Plane,
  RenderTarget,
  ShaderPass,
  useCurtainsEvent
} from "react-curtains";
import {
  vertexShader,
  fragmentShader,
  distortionFs,
  blurFs
} from "./shaders";

import { Vec2 } from "curtainsjs";
import HomeScreen from "../../views/HomeScreen";
import "../styles/scrollAnimation/projectScrollStyles.css";

function ProjectScroll() {
    
    function scrollIntoView () {
        const firstProj = document.querySelector('#kopilo')
        firstProj.scrollIntoView({
          behavior: 'smooth', 
          block: 'end'      
        });
      }
    
    const planesDeformations = useRef(0);

    useCurtainsEvent("onRender", (curtains) => {
      planesDeformations.current = curtains.lerp(
        planesDeformations.current,
        0,
        0.25
      );
    });
  
    useCurtainsEvent("onScroll", (curtains) => {
      const delta = curtains.getScrollDeltas();
  
      delta.y = -delta.y;
  
      // threshold
      if (delta.y > 50) {
        delta.y = 50;
      } else if (delta.y < -50) {
        delta.y = -50;
      }
  
      if (Math.abs(delta.y) > Math.abs(planesDeformations.current)) {
        planesDeformations.current = curtains.lerp(
          planesDeformations.current,
          delta.y,
          0.25
        );
      }
    });
  
    const passUniforms = {
      scrollEffect: {
        name: "uScrollEffect",
        type: "1f",
        value: 0
      }
    };
  
    // render passes
    const onPassRender = (pass) => {
      // update the uniform
      pass.uniforms.scrollEffect.value = planesDeformations.current;
    };
  
    // additional blur pass
    const blurUniforms = {
      scrollEffect: {
        name: "uScrollEffect",
        type: "1f",
        value: 0
      },
      resolution: {
        name: "uResolution",
        type: "2f",
        value: new Vec2()
      }
    };
  
    const setPassResolution = (pass) => {
      const passBBox = pass.getBoundingRect();
      pass.uniforms.resolution.value = new Vec2(passBBox.width, passBBox.height);
    };


    const KopiloProjectPlane = () => {

    return (
    <div className="SelectiveRenderTargets-element" id='kopilo'>
        <div className="SelectiveRenderTargets-element-inner">
          <RenderTarget uniqueKey="distortionTarget">
            <ShaderPass
              fragmentShader={distortionFs}
              uniforms={passUniforms}
              onRender={onPassRender}
            >
              <Plane
                className="SelectiveRenderTargets-plane"
                // plane init parameters
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
              >
                <img
                  src='/project/kopilo/dbsmain.png'
                  data-sampler="planeTexture"
                  alt=""
                />
              </Plane>
            </ShaderPass>
          </RenderTarget>
        </div>
        <div className="project-left">
            <div className='project-top'>
                <p className='project-scope'>Deep Learning</p>
                <p className='project-name'>Druk Chess AI</p>
            </div>
            <p className='project-desc'>Play against the best!</p>
        </div>
      </div>
    );
  };

  
  const SatiscribeProjectPlane = () => {
    return (
    <div className="SelectiveRenderTargets-element">
        <div className='project-right' style={{alignItems: 'flex-end'}}>
            <div className='project-top'>
                <p className='project-scope' style={{textAlign:'right'}}>ui/ux</p>
                <p className='project-name' style={{textAlign:'right'}}>SATISCRIBE</p>
            </div>
            <p className='project-desc' style={{textAlign:'right', width:'60%'}}>Automated meeting minutes and project management platform</p>
        </div>
        <div className="SelectiveRenderTargets-element-inner">
          <RenderTarget uniqueKey="distortionTarget">
            <ShaderPass
              fragmentShader={distortionFs}
              uniforms={passUniforms}
              onRender={onPassRender}
            >
              <Plane
                className="SelectiveRenderTargets-plane"
                // plane init parameters
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
              >
                <img
                  src='/project/satiscribe/satiscribelight.png'
                  data-sampler="planeTexture"
                  alt=""
                />
              </Plane>
            </ShaderPass>
          </RenderTarget>
        </div>
      </div>
    );
  };


  const AIDProjectPlane = () => {
    return (
    <div className="SelectiveRenderTargets-element">
        <div className="SelectiveRenderTargets-element-inner">
          <RenderTarget uniqueKey="distortionTarget">
            <ShaderPass
              fragmentShader={distortionFs}
              uniforms={passUniforms}
              onRender={onPassRender}
            >
              <Plane
                className="SelectiveRenderTargets-plane-long"
                // plane init parameters
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
              >
                <img
                  src='/project/aid/aidmain.png'
                  data-sampler="planeTexture"
                  alt=""
                />
              </Plane>
            </ShaderPass>
          </RenderTarget>
          <div className='project-horizontal' >
                <div className='project-top' style={{width: '100%'}}>
                    <p className='project-scope'>natural language processing</p>
                    <p className='project-name'>ai design framework</p>
                </div>
                <p className='project-desc'>Framework to automatically generate design opportunities</p>
            </div>
        </div>
      </div>
    );
  };
  


  const NepitniumProjectPlane = () => {
    return (
    <div className="SelectiveRenderTargets-element">
        <div className='project-right' style={{alignItems: 'flex-end'}}>
            <div className='project-top'>
                <p className='project-scope'>product design</p>
                <p className='project-name'>NEPTINIUM</p>
            </div>
            <p className='project-desc'>Designing SUTD’s first Electric Vehicle Additive Manufacturing (EVAM) car</p>
        </div>
        <div className="SelectiveRenderTargets-element-inner">
          <RenderTarget uniqueKey="distortionTarget">
            <ShaderPass
              fragmentShader={distortionFs}
              uniforms={passUniforms}
              onRender={onPassRender}
            >
              <Plane
                className="SelectiveRenderTargets-plane"
                // plane init parameters
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
              >
                <img
                  src='/project/neptinium/neptiniummain.png'
                  data-sampler="planeTexture"
                  alt=""
                />
              </Plane>
            </ShaderPass>
          </RenderTarget>
        </div>
      </div>
    );
  };
  

  return (
    <>
    <HomeScreen onClick={scrollIntoView}/>      
  
    <div className="SelectiveRenderTargets">
      <div className="SelectiveRenderTargets-wrapper" style={{overflowX:'hidden'}}>
        <KopiloProjectPlane/>
        <SatiscribeProjectPlane/>
        <AIDProjectPlane/>
        <NepitniumProjectPlane/>
        <ShaderPass
          fragmentShader={blurFs}
          uniforms={blurUniforms}
          onRender={onPassRender}
          onReady={setPassResolution}
          onAfterResize={setPassResolution}
        />
      </div>
    </div>
    </>
  );
}


export default ProjectScroll;