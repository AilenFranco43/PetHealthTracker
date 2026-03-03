import React from 'react'
import { FaHeart, FaArrowRight } from "react-icons/fa"
import { Link } from 'react-router-dom';


const Header = () => {
    return (
        <header className='flex items-center justify-between px-4 py-3 md:px-12 bg-white shadow-sm'>
            <div className='flex items-center gap-2 '>
                <div className='bg-gradient-to-r from-[#00BFA5] to-[#00C8FF] w-10 h-10 rounded-2xl flex items-center justify-center shadow-md shadow-[#00BFA5]/30'>
                    <FaHeart className='text-white text-lg' />
                </div>
                <h1 className='text-[#0A99A5] text-xl font-poppins'>Pet Health</h1>
            </div>

            <Link to="/login" className='flex items-center gap-2 bg-gradient-to-r from-[#00BFA5] to-[#00C8FF] text-white px-6 py-2 rounded-full hover:opacity-90 transition-opacity '>
                 <span className='font-medium'>Iniciar Sesión</span>
                <FaArrowRight />
            </Link>
        </header>
    )
}

export default Header