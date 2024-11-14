import React from 'react'
import Countdown from "react-countdown";

const Timer  = () => {
  return (
    <Countdown date={Date.now()+10*60*1000}/>
  )
}
export default Timer;