import React from 'react'

export interface IProps {
    children: React.ReactNode
}

const layout = ({children}: IProps) => {
  return (
    <div 
        className='overflow-hidden 
        bg-white 
        text-black 
        min-h-screen 
        flex justify-center 
        items-center'
    >
        {children}
    </div>
  )
}

export default layout