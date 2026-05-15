import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
    const user ={name: "John Doe"}
    const navigate = useNavigate()
    const logoutUser = () => {
        navigate('/')
    }
  return (
    <div className='shadow bg-white'>
        <nav className='flex items-center justify-between max-w-7xl mx-auto px-4 py-3.5 text-slate-800 transition-all'>
            <Link to='/'>
                <svg width="100%" viewBox="0 0 680 120" role="img" xmlns="http://www.w3.org/2000/svg">
  <rect x="40" y="20" width="70" height="80" rx="16" fill="#16a34a"/>
  <rect x="58" y="40" width="34" height="6" rx="3" fill="white"/>
  <rect x="58" y="54" width="34" height="6" rx="3" fill="white"/>
  <rect x="58" y="68" width="22" height="6" rx="3" fill="white"/>
  <text x="126" y="75" font-family="Arial, sans-serif" font-weight="700" font-size="38" fill="#16a34a">Resume</text>
  <text x="376" y="75" font-family="Arial, sans-serif" font-weight="700" font-size="38" fill="#111827">AI</text>
</svg>
            </Link>
            <div className='flex items-center gap-4 text-sm'>
                <p className='max-sm:hidden'>Hi, {user.name}</p>
                <button onClick={logoutUser} className='bg-white hover:bg-slate-50 border border-gray-300 px-7 py-1.5 rounded-full active:scale-95 transition-all'>Logout</button>
            </div>
        </nav>
    </div>
  )
}

export default Navbar