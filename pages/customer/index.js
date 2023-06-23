import React from 'react';
import styles from './home.module.scss';
// import Image from 'next/image';
// import Link from 'next/link';
// import 'bootstrap/dist/css/bootstrap.css';
import Inputcomponent from '@/components/customer/Inputcomponent';
import HeaderComponent from '@/components/customer/HeaderComponent';


// import ProfileComponent from '@/components/customer/ProfileComponent';
const Home = () => {
  var data = [
    {
      head1: 'You don’t know JavaScript',
      para1: 'Kyle Simpson',
      para2: 'Thrift store #11',
      para3: 'Zip code : 16031',
      para4: '5 days ago',
    },
    {
      head1: 'You don’t know JavaScript',
      para1: 'Kyle Simpson',
      para2: 'Thrift store #11',
      para3: 'Zip code : 16031',
      para4: '5 days ago',
    },
    {
      head1: 'You don’t know JavaScript',
      para1: 'Kyle Simpson',
      para2: 'Thrift store #11',
      para3: 'Zip code : 16031',
      para4: '5 days ago',
    },
    {
      head1: 'You don’t know JavaScript',
      para1: 'Kyle Simpson',
      para2: 'Thrift store #11',
      para3: 'Zip code : 16031',
      para4: '5 days ago',
    },
    {
      head1: 'You don’t know JavaScript',
      para1: 'Kyle Simpson',
      para2: 'Thrift store #11',
      para3: 'Zip code : 16031',
      para4: '5 days ago',
    },
    {
      head1: 'You don’t know JavaScript',
      para1: 'Kyle Simpson',
      para2: 'Thrift store #11',
      para3: 'Zip code : 16031',
      para4: '5 days ago',
    },
    {
      head1: 'You don’t know JavaScript',
      para1: 'Kyle Simpson',
      para2: 'Thrift store #11',
      para3: 'Zip code : 16031',
      para4: '5 days ago',
    },
    {
      head1: 'You don’t know JavaScript',
      para1: 'Kyle Simpson',
      para2: 'Thrift store #11',
      para3: 'Zip code : 16031',
      para4: '5 days ago',
    },
    {
      head1: 'You don’t know JavaScript',
      para1: 'Kyle Simpson',
      para2: 'Thrift store #11',
      para3: 'Zip code : 16031',
      para4: '5 days ago',
    },
    {
      head1: 'You don’t know JavaScript',
      para1: 'Kyle Simpson',
      para2: 'Thrift store #11',
      para3: 'Zip code : 16031',
      para4: '5 days ago',
    },
    {
      head1: 'You don’t know JavaScript',
      para1: 'Kyle Simpson',
      para2: 'Thrift store #11',
      para3: 'Zip code : 16031',
      para4: '5 days ago',
    },
    {
      head1: 'You don’t know JavaScript',
      para1: 'Kyle Simpson',
      para2: 'Thrift store #11',
      para3: 'Zip code : 16031',
      para4: '5 days ago',
    },
    {
      head1: 'You don’t know JavaScript',
      para1: 'Kyle Simpson',
      para2: 'Thrift store #11',
      para3: 'Zip code : 16031',
      para4: '5 days ago',
    },
    {
      head1: 'You don’t know JavaScript',
      para1: 'Kyle Simpson',
      para2: 'Thrift store #11',
      para3: 'Zip code : 16031',
      para4: '5 days ago',
    },
    {
      head1: 'You don’t know JavaScript',
      para1: 'Kyle Simpson',
      para2: 'Thrift store #11',
      para3: 'Zip code : 16031',
      para4: '5 days ago',
    },
    {
      head1: 'You don’t know JavaScript',
      para1: 'Kyle Simpson',
      para2: 'Thrift store #11',
      para3: 'Zip code : 16031',
      para4: '5 days ago',
    },
    {
      head1: 'You don’t know JavaScript',
      para1: 'Kyle Simpson',
      para2: 'Thrift store #11',
      para3: 'Zip code : 16031',
      para4: '5 days ago',
    },
    {
      head1: 'You don’t know JavaScript',
      para1: 'Kyle Simpson',
      para2: 'Thrift store #11',
      para3: 'Zip code : 16031',
      para4: '5 days ago',
    },
    {
      head1: 'You don’t know JavaScript',
      para1: 'Kyle Simpson',
      para2: 'Thrift store #11',
      para3: 'Zip code : 16031',
      para4: '5 days ago',
    },
    {
      head1: 'You don’t know JavaScript',
      para1: 'Kyle Simpson',
      para2: 'Thrift store #11',
      para3: 'Zip code : 16031',
      para4: '5 days ago',
    },
  ]
  return (
    <>
     
      <HeaderComponent />
      <Inputcomponent />

      <section  className='px-2 sm:px-5 mt-6 border-t-2 border-black py-3'>
        <div className=''>
         
              <div >
                <p className='text-gray-900 text-base'>32 Results found</p>
              </div>
          
          <div className='sm:flex flex-wrap justify-center'>
            {
              data.map((data, i) => {
                return (
                  <div className='px-4 py-4 cursor-pointer hover:opacity-80 flex rounded-lg border sm:mx-3 my-2 sm:my-3 w-full sm:w-96 border-[#2eaaed]' key={i}>
                 
                      <div className='bg-[#ffc71f] w-24 mr-3 rounded-lg'>

                      </div>
                      <div className='w-full mb-3 '>
                        <h3 className='text-black text-lg font-semibold'>{data.head1}</h3>
                        <p className='text-gray-800 text-base leading-5'>{data.para1}</p>
                        <p className='text-gray-800 text-base leading-5'>{data.para2}</p>
                        <label className='text-gray-500 text-base'>{data.para3}</label>
                        <h6 className='text-sm text-gray-500 text-right'>{data.para4}</h6>
                      </div>
                    
                  </div>
                )
              }
              )
            }

          </div>
          {/* <ProfileComponent /> */}
        </div>
      </section>
    </>
  );
}

export default Home;
