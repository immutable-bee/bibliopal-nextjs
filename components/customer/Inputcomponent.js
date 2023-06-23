import React, { useState } from 'react';
import styles from './inputcomponent.module.scss';
import Image from 'next/image';
const Inputcomponent = () => {
  const [active, setActive] = useState('all');

  return (
    <div>
      <div>
        <section >
          <div className=''>
            <div className='flex mt-4 justify-center'>
              <div className=''>
                <div className='max-w-4xl'>
                  <h1 className='text-center text-sm sm:text-3xl font-semibold'>Welcome to local4books. Here you can view all of the newly stocked books</h1>
                </div>
              </div>
            </div>
            <div className='flex py-5 px-2 justify-center w-full items-center'>
              <div className='w-full px-3 max-w-6xl border-2 border-[#ffc71f] rounded-3xl'>
                <div className=" flex justify-between">
                  <input type="text" className=" px-2 rounded-full py-3 sm:py-4 border-none w-full focus:outline-none" placeholder="" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                  <ul className=" flex items-center " >
                    <button onClick={() => setActive('all')} className={` bg-white text-gray-600 rounded-full px-4 sm:px-10 font-medium sm:font-semibold py-1 sm:py-2   ${active == "all" && '!bg-black !text-white'} `} id="pills-all-tab" data-bs-toggle="pill" data-bs-target="#pills-all" type="button" role="tab" aria-controls="pills-all" aria-selected="true">Title</button>
                    <button onClick={() => setActive('profile')} className={`  rounded-full px-4 sm:px-10 font-medium sm:font-semibold py-1 sm:py-2   ${active == "profile" && '!bg-black !text-white'} `} id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Author</button>
                  </ul>
                </div>
              </div>
              <div className='ml-3'>

                <button type="button" className='bg-[#ffc71f] px-3 sm:px-5 py-3 sm:py-5 rounded-lg'><div >
                  <Image src="./images/search-icon.svg"
                    className=''
                    alt="search_icon"
                    width={18}
                    height={18}
                  />
                </div></button>

              </div>
            </div>
            <div className='sm:flex justify-center'>
              <div className='px-3 sm:block sm:py-0 py-1 flex justify-center items-center'>
                <label className='text-sm min-w-fit font-normal'>ZIP CODE 1</label>
                <input className='w-full sm:w-auto focus:ring-1 focus:ring-[#ffc71f] focus:outline-none border border-gray-500 px-3 rounded-lg mx-2 py-2' type="text"></input>
              </div>
              <div className='px-3 sm:block sm:py-0 py-1 flex justify-center items-center'>
                <label className='text-sm min-w-fit font-normal'>ZIP CODE 1</label>
                <input className='w-full sm:w-auto focus:ring-1 focus:ring-[#ffc71f] focus:outline-none border border-gray-500 px-3 rounded-lg mx-2 py-2' type="text"></input>
              </div>
            </div>
          </div>
        </section>
        {/* end heading section */}

      </div>
   
    </div>
  );
}

export default Inputcomponent;
