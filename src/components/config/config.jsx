import React from 'react'

const Config = () => {
  const hideConfig = () => {
    document.getElementById('config').style.transform = 'translateY(-100%)'
  }
  return (
    <div className='absolute w-screen h-screen top-0 left-0 bg-[var(--transparent)]' id='config'>
      <button onClick={() => { hideConfig() }}>
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-xbox-x" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 21a9 9 0 0 0 9 -9a9 9 0 0 0 -9 -9a9 9 0 0 0 -9 9a9 9 0 0 0 9 9z" /><path d="M9 8l6 8" /><path d="M15 8l-6 8" /></svg>
      </button>
      {/* <details >
      <summary className='cursor-pointer list-none'>
        Tema
      </summary>
      <div className='flex flex-col gap-3'>
      <button className='w-fit'>
          Light
        </button>
        <button className='w-fit'>
          Dark
        </button>
        <button className='w-fit'>
          Custom
        </button>
        </div>
    </details> */}
    </div>
  )
}

export default Config