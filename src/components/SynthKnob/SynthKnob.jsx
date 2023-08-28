import { useState } from "react";
import Draggable from 'react-draggable'; // The default

let centerX;
let centerY;
let oldX;
let oldY;
let rectX = 40;
let rectY = 20;

export default function SynthKnob ({value, setValue, min, max}) {

    const [indicatorX, setIndicatorX] = useState(40);
    const [indicatorY, setIndicatorY] = useState(20);
    

    function calculateNewXPosition(newX) {
        if(Math.abs(rectX + (newX - oldX) ) < 20 || rectX + (newX - oldX)  > 60 ) {
            return rectX;
        } else {
            return (rectX + (newX - oldX));
        }
    }

    function calculateNewYPosition(newY ) {
        if(Math.abs(rectY + (newY - oldY) ) < 20 || rectY + (newY - oldY)  > 60 ) {
            return rectY;
        } else {
            return (rectY + (newY - oldY));
        }

    }

    function calculateNewPosition (newX, newY) {
        rectX = calculateNewXPosition(newX);
        rectY = calculateNewYPosition(newY);
        
        const hAdjuster = (rectY < 40) ? -1 : 1;
        const wAdjuster = (rectX < 40) ? -1 : 1; 
        const circleX = 40 + wAdjuster * (20 * Math.cos( Math.asin((rectY - 40)/ 20 )));
        const circleY = 40 + hAdjuster * (20 * Math.sin( Math.acos((rectX - 40)/ 20 )));

        console.log('Height: ' + circleY);
        console.log('Width: ' + circleX);
        setIndicatorX(rectX);
        setIndicatorY(circleY);
        //setIndicatorY(calculateNewYPosition(newY) );
        //setIndicatorY(40 + (20 * Math.sin( Math.acos((calculateNewXPosition(newX) - 40)/ 20 ))));
        //setIndicatorX(40 + (20 * Math.cos( Math.asin((calculateNewYPosition(newY) - 40)/ 20 ))));
        oldX = newX;
        oldY = newY;
    }

    function HandleDragStart(e) {
        oldX = e.clientX ;
        oldY = e.clientY;
    }

    function HandleDrag (e) {
        calculateNewPosition(e.clientX, e.clientY);

    }

    function handleDragStop (e) {

    }
    return (
        <div className=' relative w-20 h-20  mx-auto place-content-center'>
            <div className="absolute  max-h-full max-w-full" ref={el => {
                if (!el) return;

                centerX = el.getBoundingClientRect().x + 40; 
                centerY = el.getBoundingClientRect().y + 40; 

            }}>
            <svg version="1.1" width="80" height="80" xmlns="http://www.w3.org/2000/svg">
                

                <circle cx="40" cy="40" r="30" fill="gray"/>
                
                <circle id="indicator" cx={indicatorX} cy={indicatorY} r="6"  fill='black' />

                <Draggable position={{ x: 0, y: 0 }} onStart={(e) => HandleDragStart(e)} onDrag={(e) => {HandleDrag(e)}} onStop={(e) => {}}>
                    <rect width={80} height={80} x1={0} y1={0} fill="blue" opacity={0.3}/>
                </Draggable>

                
                
                
            </svg>

            </div>
            
        </div>
    )
}