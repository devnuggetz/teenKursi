import React, { Suspense, useRef } from 'react'
import { Canvas, useFrame } from 'react-three-fiber';
import './App.scss';
import Header from './components/header';
import {Html, RoundedBox, useGLTFLoader} from 'drei'
import { Section } from './components/section';

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
const HtmlContent=({children, modelPath, positionY})=>{
  const ref= useRef();
  useFrame(()=>{
    ref.current.rotation.y+=0.01;
  })
  return( 
    <Section factor={1.5} offset={1}>
      <group position={[0,positionY,0]}>
        <mesh 
        ref={ref}
        position={[0,-35,0]}>
          <Model modelPath={modelPath}/>
        </mesh>
      <Html
        fullscreen 
        >
          {children}
        </Html>
      </group>
    </Section>
  )
}
function App() {
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
           modelPath='/armchairYellow.gltf'
           positionY={250}>
          <div className='container'>
            <h1 className='title'>Hello</h1>
          </div>
           </HtmlContent>
           <HtmlContent 
           modelPath='/armchairGreen.gltf'
           positionY={0}>
          <div className='container'>
            <h1 className='title'>Hello</h1>
          </div>
           </HtmlContent>
        </Suspense>
      </Canvas>
    </>
  );
}

export default App;
