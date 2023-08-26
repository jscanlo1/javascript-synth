import { useState } from 'react'
import './App.css'
import wavetable from './assets/Ethnic_33.json'
const audioCtx = new AudioContext();
// Create an oscillator node to generate tones

const wave = new PeriodicWave(audioCtx, {
  real: wavetable.real,
  imag: wavetable.imag,
});



const osc = audioCtx.createOscillator();

// Create a gain node to control the volume
const amp = audioCtx.createGain();

// Pass the oscillator's output through the gain node and to our speakers
osc.connect(amp);
amp.connect(audioCtx.destination);

// Start generating those tones!
osc.start();


const updateFreqValue = (value) => {
  const freq = value;
  osc.frequency.value = freq;
};

const updateGainValue = (value) => {
  const gain = value;
  amp.gain.value = value;
}


const toggleAudio = () => {
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  } else {
    audioCtx.suspend();
  }
};


export default function App() {
  const [frequency, setFrequency] = useState(0.0)
  const [gain, setGain] = useState(0.0)

  updateFreqValue(frequency);
  updateGainValue(gain);

  


  return (
    <div style={{ width: '100vw', height: '100vh' }} onClick={toggleAudio} >

      <label htmlFor="frequency">Frequency</label>
      <input 
        onChange={(e) => {
          setFrequency(e.target.value);
        }}
        name="frequency"
        id="frequency"
        type="range"
        min="0"
        max="1000"
        value={frequency}
        step="100" />

      <label htmlFor="gain">Gain</label>
      <input
        onChange={(e) => {
          setGain(e.target.value);
        }}
        name="gain"
        id="gain"
        type="range"
        min="0"
        max="1"
        value={gain}
        step="0.1" />
      
    </div>);
}

