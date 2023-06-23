import Inputcomponent from '@/components/customer/Inputcomponent';
import React, { useState } from 'react';
import styles from './matches.module.scss';
// import Image from 'next/image';
// import Link from 'next/link';
// import 'bootstrap/dist/css/bootstrap.css';
import HeaderComponent from '@/components/customer/HeaderComponent';
import Head from "next/head"

const Matches = () => {
    const [active, setActive] = useState('all');

    var boxdata = [
        {
            head1: 'Store',
            para1: 'Thrift store #2',
            para2: 'Thrift store #2',
            para3: 'Thrift store #2',
            head2: 'Date',
            para4: '6 days ago',
            para5: '6 days ago',
            para6: '6 days ago',
            head3: 'Zip Code',
            para7: '16031',
            para8: '16031',
            para9: '16031',
        },
        {
            head1: 'Store',
            para1: 'Thrift store #2',
            para2: 'Thrift store #2',
            para3: 'Thrift store #2',
            head2: 'Date',
            para4: '6 days ago',
            para5: '6 days ago',
            para6: '6 days ago',
            head3: 'Zip Code',
            para7: '16031',
            para8: '16031',
            para9: '16031',
        },
        {
            head1: 'Store',
            para1: 'Thrift store #2',
            para2: 'Thrift store #2',
            para3: 'Thrift store #2',
            head2: 'Date',
            para4: '6 days ago',
            para5: '6 days ago',
            para6: '6 days ago',
            head3: 'Zip Code',
            para7: '16031',
            para8: '16031',
            para9: '16031',
        },
        {
            head1: 'Store',
            para1: 'Thrift store #2',
            para2: 'Thrift store #2',
            para3: 'Thrift store #2',
            head2: 'Date',
            para4: '6 days ago',
            para5: '6 days ago',
            para6: '6 days ago',
            head3: 'Zip Code',
            para7: '16031',
            para8: '16031',
            para9: '16031',
        },
        {
            head1: 'Store',
            para1: 'Thrift store #2',
            para2: 'Thrift store #2',
            para3: 'Thrift store #2',
            head2: 'Date',
            para4: '6 days ago',
            para5: '6 days ago',
            para6: '6 days ago',
            head3: 'Zip Code',
            para7: '16031',
            para8: '16031',
            para9: '16031',
        },
        {
            head1: 'Store',
            para1: 'Thrift store #2',
            para2: 'Thrift store #2',
            para3: 'Thrift store #2',
            head2: 'Date',
            para4: '6 days ago',
            para5: '6 days ago',
            para6: '6 days ago',
            head3: 'Zip Code',
            para7: '16031',
            para8: '16031',
            para9: '16031',
        },
        {
            head1: 'Store',
            para1: 'Thrift store #2',
            para2: 'Thrift store #2',
            para3: 'Thrift store #2',
            head2: 'Date',
            para4: '6 days ago',
            para5: '6 days ago',
            para6: '6 days ago',
            head3: 'Zip Code',
            para7: '16031',
            para8: '16031',
            para9: '16031',
        },
        {
            head1: 'Store',
            para1: 'Thrift store #2',
            para2: 'Thrift store #2',
            para3: 'Thrift store #2',
            head2: 'Date',
            para4: '6 days ago',
            para5: '6 days ago',
            para6: '6 days ago',
            head3: 'Zip Code',
            para7: '16031',
            para8: '16031',
            para9: '16031',
        },
        {
            head1: 'Store',
            para1: 'Thrift store #2',
            para2: 'Thrift store #2',
            para3: 'Thrift store #2',
            head2: 'Date',
            para4: '6 days ago',
            para5: '6 days ago',
            para6: '6 days ago',
            head3: 'Zip Code',
            para7: '16031',
            para8: '16031',
            para9: '16031',
        },
        {
            head1: 'Store',
            para1: 'Thrift store #2',
            para2: 'Thrift store #2',
            para3: 'Thrift store #2',
            head2: 'Date',
            para4: '6 days ago',
            para5: '6 days ago',
            para6: '6 days ago',
            head3: 'Zip Code',
            para7: '16031',
            para8: '16031',
            para9: '16031',
        },
        {
            head1: 'Store',
            para1: 'Thrift store #2',
            para2: 'Thrift store #2',
            para3: 'Thrift store #2',
            head2: 'Date',
            para4: '6 days ago',
            para5: '6 days ago',
            para6: '6 days ago',
            head3: 'Zip Code',
            para7: '16031',
            para8: '16031',
            para9: '16031',
        },
        {
            head1: 'Store',
            para1: 'Thrift store #2',
            para2: 'Thrift store #2',
            para3: 'Thrift store #2',
            head2: 'Date',
            para4: '6 days ago',
            para5: '6 days ago',
            para6: '6 days ago',
            head3: 'Zip Code',
            para7: '16031',
            para8: '16031',
            para9: '16031',
        },
        {
            head1: 'Store',
            para1: 'Thrift store #2',
            para2: 'Thrift store #2',
            para3: 'Thrift store #2',
            head2: 'Date',
            para4: '6 days ago',
            para5: '6 days ago',
            para6: '6 days ago',
            head3: 'Zip Code',
            para7: '16031',
            para8: '16031',
            para9: '16031',
        },
        {
            head1: 'Store',
            para1: 'Thrift store #2',
            para2: 'Thrift store #2',
            para3: 'Thrift store #2',
            head2: 'Date',
            para4: '6 days ago',
            para5: '6 days ago',
            para6: '6 days ago',
            head3: 'Zip Code',
            para7: '16031',
            para8: '16031',
            para9: '16031',
        },

        {
            head1: 'Store',
            para1: 'Thrift store #2',
            para2: 'Thrift store #2',
            para3: 'Thrift store #2',
            head2: 'Date',
            para4: '6 days ago',
            para5: '6 days ago',
            para6: '6 days ago',
            head3: 'Zip Code',
            para7: '16031',
            para8: '16031',
            para9: '16031',
        },
        {
            head1: 'Store',
            para1: 'Thrift store #2',
            para2: 'Thrift store #2',
            para3: 'Thrift store #2',
            head2: 'Date',
            para4: '6 days ago',
            para5: '6 days ago',
            para6: '6 days ago',
            head3: 'Zip Code',
            para7: '16031',
            para8: '16031',
            para9: '16031',
        },
        {
            head1: 'Store',
            para1: 'Thrift store #2',
            para2: 'Thrift store #2',
            para3: 'Thrift store #2',
            head2: 'Date',
            para4: '6 days ago',
            para5: '6 days ago',
            para6: '6 days ago',
            head3: 'Zip Code',
            para7: '16031',
            para8: '16031',
            para9: '16031',
        },
        {
            head1: 'Store',
            para1: 'Thrift store #2',
            para2: 'Thrift store #2',
            para3: 'Thrift store #2',
            head2: 'Date',
            para4: '6 days ago',
            para5: '6 days ago',
            para6: '6 days ago',
            head3: 'Zip Code',
            para7: '16031',
            para8: '16031',
            para9: '16031',
        },

        {
            head1: 'Store',
            para1: 'Thrift store #2',
            para2: 'Thrift store #2',
            para3: 'Thrift store #2',
            head2: 'Date',
            para4: '6 days ago',
            para5: '6 days ago',
            para6: '6 days ago',
            head3: 'Zip Code',
            para7: '16031',
            para8: '16031',
            para9: '16031',
        },

    ]

    console.log('active :::::::::::::::::::', active)
    return (
        <div className='bg-[#FEFBE8]'>
            <Head >
                <link rel="shortcut icon" href="/images/fav.png" />

            </Head>
            <div className='match-tab'>
                <HeaderComponent />
                <Inputcomponent />
                <section  className='px-5 mt-4 sm:mt-6 border-t-2 border-black py-3'>
                   
                      
                                <div className="flex py-2 sm:py-6" >
                                    
                                        <button onClick={() => setActive('all')} className={` !mx-2 text-[#828282] font-bold sm:!mx-5 text-base sm:text-2xl ${active == "all" && '!text-black'} `} id="pills-all-tab" data-bs-toggle="pill" data-bs-target="#pills-all" type="button" role="tab" aria-controls="pills-all" aria-selected="true">All</button>
                                    
                                    
                                        <button onClick={() => setActive('profile')} className={` !mx-2 text-[#828282] font-bold sm:!mx-5 text-base sm:text-2xl ${active == "profile" && '!text-black'} `} id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Profile</button>
                                    
                                    
                                        <button onClick={() => setActive('contact')} className={` !mx-2 text-[#828282] font-bold sm:!mx-5 text-base sm:text-2xl ${active == "contact" && '!text-black'} `} id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Contact</button>
                                    
                                </div>
                            

                                <div >
                          
                                    {active == "all" && (
                                        <div className='flex flex-wrap justify-center'>
                                            {
                                                boxdata.map((data, i) => {
                                                    return (
                                                        <div className='px-4 py-4 cursor-pointer hover:opacity-80 rounded-lg border sm:mx-3 my-2 sm:my-3 w-full sm:w-[28rem] border-[#2eaaed]' key={i}>
                                                           
                                                                <div className='flex justify-between w-full'>
                                                                    <h4 className='text-black text-base font-medium'>Seth Godin</h4>
                                                                    <p className='bg-[#2eaaed] px-3 py-1 text-xs text-white font-medium rounded-3xl'>Author</p>
                                                                </div>
                                                                <div className='mt-2 flex w-full'>
                                                                    <div className='w-1/2'>
                                                                        <div >
                                                                            <h5 className='text-xs leading-5 text-gray-600'>{data.head1}</h5>
                                                                            <p className='text-gray-900 text-sm'>{data.para1}</p>
                                                                            <p className='text-gray-900 text-sm'>{data.para2}</p>
                                                                            <p className='text-gray-900 text-sm'>{data.para3}</p>
                                                                        </div>
                                                                    </div>
                                                                    <div className=' w-1/4'>
                                                                        <div >
                                                                            <h5 className='text-xs text-gray-500'>{data.head2}</h5>
                                                                            <p className='text-gray-900 text-sm'>{data.para4}</p>
                                                                            <p className='text-gray-900 text-sm'>{data.para5}</p>
                                                                            <p className='text-gray-900 text-sm'>{data.para6}</p>
                                                                        </div>
                                                                    </div>
                                                                    <div className='w-1/4 ml-5'>
                                                                        <div >
                                                                            <h5 className='text-xs text-gray-500'>{data.head3}</h5>
                                                                            <p className='text-gray-900 text-sm'>{data.para7}</p>
                                                                            <p className='text-gray-900 text-sm'>{data.para8}</p>
                                                                            <p className='text-gray-900 text-sm'>{data.para9}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                           
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>

                                    )}
                                    {active == "profile" && (

                                        <h1>Profile</h1>
                                    )}
                                    {active == "contact" && (
                                        <h1>Contact</h1>
                                    )}
                            
                        </div>

                  
                </section>
            </div>
           
        </div>
    );
}



export default Matches;
