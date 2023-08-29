import { useState } from 'react'
import './App.css'
import wavetable from './assets/Ethnic_33.json'
import SynthKnob from './components/SynthKnob/SynthKnob';
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

  function handleOnGain(val) {
    setGain(val/100.0);
  }

  function handleSetFrequency(val){
    setFrequency(val * 10);
  }
  


  return (
    <div className='w-full h-full'>
      <h1 className='text-2xl pb-8 mb-8'>
        My Modular Synth
      </h1>
      <div className='pb-8 mb-8'>
        <OnButton/>
      </div>

      <div className='flex flex-1 justify-evenly p-4 mb-8 mx-auto w-5/6 border-2 border-zinc-800 rounded-lg '>
        <div className='inline-block w-26 h-42 bg-cyan-400 border-2 border-zinc-800 rounded-lg my-auto m-2 p-2'>
          <p className='font-bold'>
            Oscillator
          </p>
          <div className='w-3/4 mx-auto'>
          <label>
            Frequency Hz
            <input name='osc' id='osc' value={frequency} typeof='text' className='w-20' onChange={(e) => setFrequency(e.target.value)} />
          </label>

          <SynthKnob value={frequency / 10} setValue={handleSetFrequency} min={0} max={200} setStep={1}/>
          </div>
        </div>


        <div className='inline-block w-26 h-42 bg-cyan-400 border-2 border-zinc-800 rounded-lg my-auto m-2 p-2'>
          <p className='font-bold'>
            AMP
          </p>

          <div className='w-3/4 mx-auto'>
          <label>
            Gain
            <input name='amp' id='amp' value={gain } typeof='text' className='w-20' onChange={(e) => setGain(e.target.value)} />
          </label>

          <SynthKnob value={gain * 100} setValue={handleOnGain} min={0} max={100} setStep={1}/>
          </div>
        </div>
      </div>  
    </div>);
}


function OnButton () {
  const [on, setOn] = useState(false);

  function onToggle() {
    setOn(!on);
    toggleAudio();
  }
  let classes;
  if(on){
    classes = 'bg-green-600 shadow-green-500 text-zinc-950';
  } else {
    classes = 'bg-gray-400 shadow-gray-500  text-gray-600';
  }

  return(

    <button onClick={onToggle} className={`${classes} rounded-full h-20 w-20 shadow-2xl border-2 border-zinc-900 `} >ON</button>

  )
}



/**
 * <label htmlFor="gain">Gain</label>
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
 */