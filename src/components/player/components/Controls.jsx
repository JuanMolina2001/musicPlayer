import { Play, PlayerSkip, PlayerTrack, Pause, Shuffle, Repeat } from '../../buttons/buttons'
import { shuffle } from '../../../utils/utils'
import { useContext } from 'preact/hooks'
import { MusicContext } from '../../../context/musicContext'

const Controls = () => {
    const { audio, current, paused, setPaused, playlist, setPlaylist, setCurrent } = useContext(MusicContext    )
    const disabled = current === null ? true : false
    return (
        <div className='flex gap-[2rem]  items-center m-auto relative'>
            <button>
                <Repeat height='20' width='20' />
            </button>
            <button disabled={disabled} className='rotate-180' onClick={()=>{
                        const prev = current === 0 ? 0 : current - 1
                        audio.src = playlist[prev].url
                        audio.load()
                        audio.play()
                        setCurrent(prev)
            }}>
                <PlayerSkip height='20' width='20'  />
            </button>
            <button disabled={disabled} className='rotate-180' onClick={() => { audio.currentTime = audio.currentTime - 10 }}>
                <PlayerTrack height='20' width='20' />
            </button>
            {paused ?
                <button disabled={disabled} onClick={() => { audio.play(), setPaused(false) }}>
                    <Play height='20' width='20' />
                </button>
                :
                <button onClick={() => { audio.pause(), setPaused(true) }}>
                    <Pause height='20' width='20' />
                </button>

            }
            <button disabled={disabled} onClick={() => { audio.currentTime = audio.currentTime + 10 }}>
                <PlayerTrack height='20' width='20' />
            </button>
            <button disabled={disabled} onClick={() => {
                    console.log('clicked')
                    const next = current === playlist.length - 1 ? 0 : current + 1
                    audio.src = playlist[next].url
                    audio.load()
                    audio.play()
                    setCurrent(next)
                }}>
                <PlayerSkip height='20' width='20' />
            </button>
            <button onClick={() => setPlaylist(shuffle(playlist))}>
                <Shuffle height='20' width='20' />
            </button>
        </div>
    )
}
export default Controls
