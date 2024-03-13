import { useEffect, useState, useContext } from 'preact/hooks'
import React from 'react'
import { MusicContext } from '../../../context/musicContext'

const Playlists = ({setHidden, hidden}) => {
    const {setPlaylist} = useContext(MusicContext)
    const [playlists, setPlaylists] = useState([])
    useEffect(() => {
        window.electron.getPlaylists((e, files) => {
            setPlaylists(files)
        })
    }, [])
    return (
        <div hidden={!hidden} className='flex flex-col gap-3'>
            <button onClick={()=>setHidden(!hidden)}>crear nueva playList</button>
            {playlists.map((playlist, index) => {
                return (
                    
                        <button className='' onClick={()=>{
                            window.electron.getPlaylist(playlist.id, (e, files) => {
                                setPlaylist(files.map(file => {
                                    const blob = new Blob([file.data])
                                    file.url = URL.createObjectURL(blob)
                                    return { name: file.name, url: file.url, path: file.path }
                                }))
                        })
                    }} >
                            {playlist.name}
                        </button>
                    
                )
            })}
        </div>
    )
}

export default Playlists