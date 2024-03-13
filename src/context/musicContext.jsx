import { useEffect, useState } from "preact/hooks"
import { createContext } from "preact"

export const MusicContext = createContext()


export const MusicContextProvider = ({ children }) => {
  
    const [playlist, setPlaylist] = useState([])
    const [audio, setAudio] = useState(new Audio())
    const [current, setCurrent] = useState(null)
    const [paused, setPaused] = useState(true)
    useEffect(() => {
        if (playlist.length > 0 && current === null) {
            setCurrent(0)
            audio.src = playlist[0].url
            audio.load()
        }
    }, [playlist])

    return (
        <MusicContext.Provider value={{
            playlist,
            setPlaylist,
            audio,
            setAudio,
            current,
            setCurrent,
            paused,
            setPaused
        }}>
            {children}
        </MusicContext.Provider>
    )
}