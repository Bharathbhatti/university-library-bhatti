
import Header from '@/components/Header';

import React, { ReactNode } from 'react';

const layout = async({children}:{children:ReactNode}) => {
  
  return (
    <main className='root-container'>
        <div className='mx-auto max-w-7xl'>
        <h1 className='font-bebas-neue text-7xl font-bold text-light-100 mt-20'>
            Welcome to bookwise!!!
        </h1>
            <div className='mt-20 pb-20'>
                {children}
            </div>
        </div>
    </main>
  )
}

export default layout;