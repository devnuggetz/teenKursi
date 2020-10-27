import React, { Suspense } from 'react'
import { Canvas } from 'react-three-fiber';
import './App.scss';
import Header from './components/header';
import {Html, RoundedBox, useGLTFLoader} from 'drei'
import { Section } from './components/section';

const Model=()=>{
  const gltf= useGLTFLoader('/armchairYellow.gltf', true)
  return <primitive object={gltf.scene} dispose={null} />
}
const Lights=()=>{
  return(
    <>
    <ambientLight intensity={0.3} />
    <directionalLight position={[10,10,5]} intensity={1}/>
    </>
  )
}
const HtmlContent=()=>{
  return( 
    <Section factor={1.5} offset={1}>
      <group position={[0,250,0]}>
        <mesh position={[0,-35,0]}>
          <Model />
        </mesh>
      <Html
        fullscreen 
        >
          <div className='container'>
            <h1 className='title'>Hello</h1>
          </div>
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
           <HtmlContent />
        </Suspense>
      </Canvas>
    </>
  );
}

export default App;
