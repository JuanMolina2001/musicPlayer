import Seek from './components/seek'
import Controls from './components/Controls'
import { useContext } from "preact/hooks"
import { MusicContext } from '../../context/musicContext'

const Player = () => {
    const { audio} = useContext(MusicContext)
  return (
      <div className='flex flex-col justify-center items-center bg-[var(--primary)] py-1 z-40' id='playerControl'>
        <Seek audio={audio} />
        <Controls audio={audio}/>
      </div>
  )
}

export default Player