import { useEffect, useState } from 'preact/hooks'
import Player from './components/player/player';
import {MusicContextProvider} from './context/musicContext'
import Sidebar from './components/sidebar/sidebar';
import Header from './components/header/header';
import Main from './components/main/main';
import Config from './components/config/config';
export function App() {
  const [hide, setHide] = useState(false)
  console.log(window.electron)
  return (
    <MusicContextProvider>
      <Config/>
      <Header/>
      <Sidebar/>
      <Main/>
      <div id='test' className='w-full h-full z-10 bg-[var(--primary)]'>
      </div>
      <Player />
   </MusicContextProvider>
  )
}

