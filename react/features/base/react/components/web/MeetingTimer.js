import React, { useState, useRef, useEffect } from 'react'
import { APP_LINK_SCHEME } from '../../../util';

// const { api } = window.alwaysOnTop;

const MeetingTimer = () => {
    // We need ref in this, because we are dealing
    // with JS setInterval to keep track of it and
    // stop it when needed
    const Ref = useRef(null);
  
    // The state for our timer
    const [timer, setTimer] = useState('00:00:00');
    // const [timeLimit, setTimeLimit] = useState(0);
  
  
    const getTimeRemaining = (e) => {
        const total = Date.parse(e) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / 1000 / 60 / 60) % 24);
        return {
            total, hours, minutes, seconds
        };
    }
  
  
    const startTimer = (e) => {
        let { total, hours, minutes, seconds } 
                    = getTimeRemaining(e);
        if (total >= 0) {
  
            // update the timer
            // check if less than 10 then we need to 
            // add '0' at the beginning of the variable
            setTimer(
                (hours > 9 ? hours : '0' + hours) + ':' +
                (minutes > 9 ? minutes : '0' + minutes) + ':'
                + (seconds > 9 ? seconds : '0' + seconds)
            )
        }
        if (total == 0) {
            // props.api.executeCommand('hangup');
            APP.conference.hangup(true);
        }
    }
  
  
    const clearTimer = (e) => {
  
        // If you adjust it you should also need to
        // adjust the Endtime formula we are about
        // to code next    
        // setTimer('00:01:10');
  
        // If you try to remove this line the 
        // updating of timer Variable will be
        // after 1000ms or 1sec
        if (Ref.current) clearInterval(Ref.current);
        const id = setInterval(() => {
            startTimer(e);
        }, 1000)
        Ref.current = id;
    }
  
    const getDeadTime = (timeLimit) => {
        let deadline = new Date();
  
        deadline.setSeconds(deadline.getSeconds() + timeLimit);
        return deadline;
    }
  
    // We can use useEffect so that when the component
    // mount the timer will start as soon as possible
  
    // We put empty array to act as componentDid
    // mount only
    useEffect(() => {
        APP.socket.on("roomDetail", (data) => {
            clearTimer(getDeadTime(parseInt(data.slotDuration)));
        })
    }, []);

    const style = {
        maxWidth: 140,
        maxHeight: 70,
        position: 'absolute'
    };
  
    return (
        <div className="watermark leftwatermark" style = { style }>
            <h2>{timer}</h2>
        </div>
    )
}

export default MeetingTimer;
