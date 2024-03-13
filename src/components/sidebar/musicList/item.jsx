import { MusicContext } from '../../../context/musicContext'
import { useContext } from 'preact/hooks'
import { MusicMinus } from '../../buttons/buttons'


const MusicItem = ({ file, index, setTarget }) => {
    const { playlist, audio, setAudio, setCurrent, setPaused, setPlaylist } = useContext(MusicContext)
    const setCurrentMusic = () => {
        audio.src = playlist[index].url
        audio.load()
        setAudio(audio)
        setCurrent(index)
        audio.play()
        setPaused(false)
    }
    const onDrag = (e) => {
        e.preventDefault()
        setTarget(index)
    }
    const bg = index % 2 === 0 ? 'bg-[var(--tertiary)]' : ''
    return (
        <>
            <button onDrag={e => onDrag(e)}
                data-index={index}
                onDragOver={e => e.preventDefault()}
                draggable
                onClick={() => setCurrentMusic()}
                className={`${bg} item text-left px-2  w-full overflow-hidden cursor-pointer border-b-[1px] border-[#ffffff7a]`} >
                {file.name.length > 15 ? file.name.slice(0, 15) + '...' : file.name}

            </button>
            <button className='bg-[#953636] rounded-md shadow-black shadow-md active:scale-95 w-fit h-fit mx-auto my-auto' onClick={() => setPlaylist(playlist.filter((e, i) => i !== index))}>
                <MusicMinus width='24' height='24' />
            </button>
        </>
    )
}

export default MusicItem