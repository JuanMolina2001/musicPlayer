import { useContext, useState } from 'preact/hooks'
import MusicList from './musicList/musicList'
import Playlists from './playlistList/playlists'


const Sidebar = () => {
    const [hidden, setHidden] = useState(!true)
    return (
        <section id='sidebar' className='h-full px-3' >

            <MusicList hidden={hidden} setHidden={setHidden}/>

            <Playlists hidden={hidden} setHidden={setHidden} />
        </section>
    )
}

export default Sidebar