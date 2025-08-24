import React, { useEffect, useState } from 'react'
import { dummyPlans } from '../assets/assets';
import Loading from './Loading';

const Credits = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);


  const fetchplans = async () => {
    setPlans(dummyPlans)
    setLoading(false);
  }

  useEffect(() => {
    fetchplans();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className='max-w-7xl h-screen overflow-y-scroll mx-auto px-4 sm:px-6 lg:px-8 py-12'>
      <h2 className='text-3xl font-semibold text-center mb-10 xl:mt-30 text-gray-800 dark:text-white'>Credit Plans</h2>
    
    <div className='flex flex-wrap justify-center gap-8'>
      {plans.map((plan) => (
        <div key={plan.id} className={ ` border border-gray-200 dark:border-purple-700 rounded-lg shadow hover:shadow-lg transition-shadow p-6 min-w-[300px] flex flex-col ${plan._id === "pro" ? "bg-purple-100 dark:bg-purple-800" : "bg-white dark:bg-transparent"} ` }>
          <div className='flex-1'>
            <h3 className='text-xl font-semibold text-gray-800 dark:text-white'>{plan.name}</h3>
            <p className='text-2xl font-bold text-purple-600 dark:text-pink-300 mb-4 400'>${plan.price} <span className='text-base font-normal text-gray-600 dark:text-purple-200'>{''}/ {plan.credits} Credits</span></p>
            <p className='text-gray-600 dark:text-gray-400'>{plan.description}</p>
           <ul className='list-disc list-inside'>
             {plan.features.map((feature, index) => (
               <li key={index} className='text-gray-600 dark:text-gray-400'>{feature}</li>
             ))}
           </ul>
           <div className='mt-4'>
             <button className='bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors'>Choose Plan</button>
           </div>
          </div>
        </div>
      ))}
    </div>
   </div>
  )
}

export default Credits