import React from 'react'
import { Canvas } from 'react-three-fiber';
import './App.scss';
import Header from './components/header';

function App() {
  return (
    <>
      <Header />
      <Canvas
      colorManagement
      camera={{position:[0,0,120], fov:70}}
      >
        
      </Canvas>
    </>
  );
}

export default App;
