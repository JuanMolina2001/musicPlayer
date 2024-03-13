import { useContext, useEffect, useState } from "preact/hooks";
import MusicItem from "./item";
import { MusicContext } from "../../../context/musicContext";
import { moveElement } from "../../../utils/utils";
import Modal from "./Modal";
import { MusicPLus, Save } from "../../buttons/buttons";

const MusicList = ({hidden}) => {
    const [modal, setModal] = useState(null)
    const { playlist, setPlaylist, audio, setAudio, setCurrent } = useContext(MusicContext)
    const [target, setTarget] = useState(null)
    const handleFile = (e) => {
        setPlaylist([...playlist, ...Array.from(e.target.files).map((file, index) => {
            const data = { name: file.name, url: URL.createObjectURL(file), path: file.path }
            if (index === 0) {
                audio.src = data.url
                audio.load()
            }
            return data
        })]);
        setCurrent(0)

        setAudio(audio)

    }
    useEffect(() => {
        window.electron.sendFiles((event, files) => {
            setPlaylist(files.map(file => {
                const blob = new Blob([file.data])
                file.url = URL.createObjectURL(blob)
                return { name: file.name, url: file.url, path: file.path }
            }))
        })
    }, [])

    return (
    <div hidden={hidden}>
        <label className='w-[24px] h-[24px] block'>
            <input type="file" className='hidden' name="music" id="musicInput" multiple accept='audio/*' onChange={(e) => handleFile(e)} />
            <div className='bg-[var(--tertiary)] rounded-md shadow-black shadow-md active:scale-95 w-fit'>
                <MusicPLus height='30' width='30' />
            </div>

        </label>
        <div onDrop={e => setPlaylist(moveElement(e, e.target.getAttribute('data-index'), target, playlist))} className=" overflow-y-auto overflow-x-hidden h-[75vh] pt-2 grid " id="playlist" style={{ scrollbarWidth: 'thin' }}>
            {playlist.length > 0 ?
                playlist.map((file, index) => (
                    <MusicItem setTarget={setTarget} key={index} file={file} index={index} />
                ))
                :
                <p>No music found</p>
            }
        </div>
        <button className='bg-[var(--tertiary)] rounded-md shadow-black shadow-md active:scale-95 w-fit' onClick={() => playlist.length > 0 ? setModal(<Modal setModal={setModal} playlist={playlist} />) : null} >
            <Save width='24' height='24' />
        </button>
        {modal}
    </div>
    )
}

export default MusicList  