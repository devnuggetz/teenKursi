import React, { Suspense, useEffect, useRef } from 'react'
import { Canvas, useFrame } from 'react-three-fiber';
import './App.scss';
import Header from './components/header';
import {Html, RoundedBox, useGLTFLoader} from 'drei'
import { Section } from './components/section';
import state from './components/state';
import { useInView } from 'react-intersection-observer';


const Model=({modelPath})=>{
  const gltf= useGLTFLoader(modelPath, true)
  return <primitive object={gltf.scene} dispose={null} />
}
const Lights=()=>{
  return(
    <>
    <ambientLight intensity={0.3} />
    <directionalLight position={[10,10,5]} intensity={1}/>
    <directionalLight position={[0,10,0]} intensity={1.5}/>
    <spotLight intensity={1} position={[1000,0,0]} />
    </>
  )
}
const HtmlContent=({children,domContent, modelPath, positionY, bgColor})=>{
  const ref= useRef();
  const [refItem, inView]= useInView({
    threshold:0
  })
  useFrame(()=>{
    ref.current.rotation.y+=0.01;
  })
  useEffect(()=>{
    inView && (document.body.style.backgroundColor= bgColor)
  },[inView])
  return( 
    <Section factor={1.5} offset={1}>
      <group position={[0,positionY,0]}>
        <mesh 
        ref={ref}
        position={[0,-35,0]}>
          <Model modelPath={modelPath}/>
        </mesh>
      <Html
      portal={domContent}
        fullscreen 
        >
          <div ref={refItem}>
            {children}
          </div>

        </Html>
      </group>
    </Section>
  )
}
function App() {
  const domContent= useRef();
  const scrollArea= useRef();
  const onScroll=(e)=>{
    state.top.current= e.target.scrollTop
  }
  useEffect(()=>void onScroll({target: scrollArea.current}),[])
  return (
    <>
      <Header />
      <Canvas
      colorManagement
      camera={{position:[0,0,120], fov:70}}
      >
        <Lights />
        <Suspense fallback={null}>
           <HtmlContent 
           bgColor={'#f15946'}
           domContent={domContent}
           modelPath='/armchairYellow.gltf'
           positionY={250}>
          <div className='container'>
            <h1 className='title'>Hello</h1>
          </div>
           </HtmlContent>
           <HtmlContent 
           bgColor={'#571ec1'}
           domContent={domContent}
           modelPath='/armchairGreen.gltf'
           positionY={0}>
          <div className='container'>
            <h1 className='title'>Hello</h1>
          </div>
           </HtmlContent>
           <HtmlContent 
           bgColor={'#636567'}
           domContent={domContent}
           modelPath='/armchairGray.gltf'
           positionY={-250}>
          <div className='container'>
            <h1 className='title'>Hello</h1>
          </div>
           </HtmlContent>
        </Suspense>
      </Canvas>
      <div className='scrollArea' ref={scrollArea} onScroll={onScroll}>
        <div style={{position:'sticky', top:0}} ref={domContent}></div>
        <div style={{height: `${state.sections*100}vh`}}></div>
      </div>
    </>
  );
}

export default App;
