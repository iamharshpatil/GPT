import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Loading = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className='bg-gradient-to-b from-[#1e3c72] to-[#2a69ac] h-screen flex items-center justify-center'>
      <div className='w-16 h-16 border-4 border-dashed border-white rounded-full animate-spin'></div>
    </div>
  )
}

export default Loading