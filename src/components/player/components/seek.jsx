import { secondsToTime } from '../../../utils/utils'
import { useState, useEffect } from 'react'
const Seek = ({ audio }) => {
  const [currentTime, setCurrentTime] = useState(0)
  const duration = audio.duration
  useEffect(() => {
    audio.addEventListener('timeupdate', () => {
      setCurrentTime(audio.currentTime)
    })
  }, [audio])
  return (

    <div className='w-3/4 flex m-auto gap-3'>
      <span>
      {secondsToTime(currentTime)}
      </span>
      <input id='tracker' type="range" step='0.00000001' min="0" max={duration} value={parseFloat(currentTime)} onChange={(e) => audio.currentTime = e.target.value} className='w-full'/>

      <span>
        {secondsToTime(duration)}
      </span>
    </div>
  )
}
export default Seek
