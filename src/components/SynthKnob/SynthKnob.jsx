import { useState } from "react";
import { CircleSlider } from "react-circle-slider";


export default function SynthKnob ({value, setValue, min, max, setStep}) {

    
    return (
        <div className='relative w-20 h-20  mx-auto place-content-center'>

            <CircleSlider
				size={80}
				knobRadius={9}
                min={min}
                max={max}
                stepSize={setStep}
				knobColor={'#feebc8'}
				circleColor={'#f6ad55'}
				circleWidth={5}
				progressWidth={10}
				progressColor={'#feebc8'}
				value={value}
				onChange={value => setValue(value)}
			/>
        </div>
    )
}