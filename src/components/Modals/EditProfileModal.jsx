import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';

const EditProfileModal = ({ closeEditProfileModal, assetToEdit }) => {
  return (
    <div className={'fixed top-0 right-0 left-0 bottom-0 flex w-full h-full bg-gray-800/50 z-30 items-center justify-center p-0 m-0 bg-scroll'}
      onClick={closeEditProfileModal}
      >
      <div className='flex flex-col bg-white rounded-xl w-5/6 md:w-1/2 xl:w-1/3 2xl:w-1/4 h-auto z-40 rounded-lg border border-gray-600 shadow-xl'
        onClick={(e) => e.stopPropagation()} >
        <div className='flex flex-row relative h-14 items-center mx-5'>
          <AiOutlineClose
              size={18}
              className='absolute cursor-pointer'
              onClick={closeEditProfileModal}
            />
          <p className='mx-auto font-semibold text-xl'>Update {assetToEdit} </p>
        </div>
        <hr />
        <div className='flex flex-col mx-5 mt-8'>
          <form className='flex flex-col items-center justify-center'>
            <input type='text' className='border w-4/5 h-10 rounded-xl px-5'/>
            <button type='submit' className='bg-amber-500 w-1/5 h-12 my-8 rounded-lg text-white text-xl'>Save</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditProfileModal;