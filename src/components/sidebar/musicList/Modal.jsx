import React from 'react'

const Modal = ({ playlist,setModal }) => {
    const submit =  (e) => {
        e.preventDefault()
        window.electron.savePlayList({
            name: e.target.name.value,
            path: playlist.map(file => file.path)
        })
        setModal(null)
        
    }
    return (
        <div className='absolute top-0 left-0 w-screen h-screen flex justify-center items-center'>
            <form className='w-[400px] h-[200px] bg-[var(--primary)] shadow-black shadow-md  flex flex-col items-center gap-5' onSubmit={submit}>
                <div className='flex justify-end w-full px-2'>
                    <button onClick={()=> setModal(null)}>x</button>
                </div>
                <span>Nombre de la playlist</span>
                <input type="text" className='text-black' name='name'/>
                <button type='submit' className='bg-[var(--secondary)] px-4 py-2 rounded-lg'>Aceptar</button>
            </form>
        </div>
    )
}

export default Modal