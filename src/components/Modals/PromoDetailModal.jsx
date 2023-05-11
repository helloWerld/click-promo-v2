import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';


const PromoDetailModal = ({ closeModal, promotion }) => {
  return (
    <div className={'fixed top-0 right-0 left-0 bottom-0 flex w-full h-full bg-gray-800/50 z-30 items-center justify-center p-0 m-0 bg-scroll'}
      onClick={closeModal}
      >
      <div className='flex flex-col bg-white rounded-xl w-1/3 h-auto z-40 rounded-lg border border-gray-600 shadow-xl'
        onClick={(e) => e.stopPropagation()} >
        <div className='flex flex-row relative h-14 items-center mx-5'>
          <AiOutlineClose
            size={18}
            className='absolute cursor-pointer'
            onClick={closeModal}
          />
          <p className='mx-auto font-semibold'>Details</p>
        </div>
        <hr />
        <div className='flex flex-col mx-5 mt-8'>
          <h2 className='text-2xl font-semibold'>{promotion.name}</h2>
        </div>
      </div>
    </div>
  )
}

export default PromoDetailModal