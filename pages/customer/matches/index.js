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

    const headers = ['Store', 'Library sale', 'Date', 'Zip Code', ''];

    const boxdata = [
        {
            paras: [
                {
                    para1: 'Thrift store #2',
                    para2: true,
                    para3: '6 days ago',
                    para4: '16031',
                },
                {
                    para1: 'Thrift store #2',
                    para2: true,
                    para3: '6 days ago',
                    para4: '16031',
                },
                {
                    para1: 'Thrift store #2',
                    para2: true,
                    para3: '6 days ago',
                    para4: '16031',
                },
            ],
        },
        {
            paras: [
                {
                    para1: 'Thrift store #2',
                    para2: true,
                    para3: '6 days ago',
                    para4: '16031',
                },
                {
                    para1: 'Thrift store #2',
                    para2: true,
                    para3: '6 days ago',
                    para4: '16031',
                },
                {
                    para1: 'Thrift store #2',
                    para2: true,
                    para3: '6 days ago',
                    para4: '16031',
                },
            ],
        },
        {
            paras: [
                {
                    para1: 'Thrift store #2',
                    para2: true,
                    para3: '6 days ago',
                    para4: '16031',
                },
                {
                    para1: 'Thrift store #2',
                    para2: true,
                    para3: '6 days ago',
                    para4: '16031',
                },
                {
                    para1: 'Thrift store #2',
                    para2: true,
                    para3: '6 days ago',
                    para4: '16031',
                },
            ],
        },
        {
            paras: [
                {
                    para1: 'Thrift store #2',
                    para2: true,
                    para3: '6 days ago',
                    para4: '16031',
                },
                {
                    para1: 'Thrift store #2',
                    para2: true,
                    para3: '6 days ago',
                    para4: '16031',
                },
                {
                    para1: 'Thrift store #2',
                    para2: true,
                    para3: '6 days ago',
                    para4: '16031',
                },
            ],
        },
        {
            paras: [
                {
                    para1: 'Thrift store #2',
                    para2: true,
                    para3: '6 days ago',
                    para4: '16031',
                },
                {
                    para1: 'Thrift store #2',
                    para2: true,
                    para3: '6 days ago',
                    para4: '16031',
                },
                {
                    para1: 'Thrift store #2',
                    para2: true,
                    para3: '6 days ago',
                    para4: '16031',
                },
            ],
        },
    ];


    console.log('active :::::::::::::::::::', active)
    return (
        <div className='bg-[#FEFBE8] min-h-screen'>
            <Head >
                <link rel="shortcut icon" href="/images/fav.png" />

            </Head>
            <div className='match-tab'>
                <HeaderComponent />
                <Inputcomponent />
                <section className='px-5 mt-4 sm:mt-6 border-t-2 border-black py-3'>


                    <div className="flex py-2 sm:py-6" >

                        <button onClick={() => setActive('all')} className={` !mx-2 text-[#828282] font-bold sm:!mx-5 text-base sm:text-2xl ${active == "all" && '!text-black'} `} id="pills-all-tab" data-bs-toggle="pill" data-bs-target="#pills-all" type="button" role="tab" aria-controls="pills-all" aria-selected="true">All</button>


                        <button onClick={() => setActive('profile')} className={` !mx-2 text-[#828282] font-bold sm:!mx-5 text-base sm:text-2xl ${active == "profile" && '!text-black'} `} id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Title</button>


                        <button onClick={() => setActive('contact')} className={` !mx-2 text-[#828282] font-bold sm:!mx-5 text-base sm:text-2xl ${active == "contact" && '!text-black'} `} id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Authors</button>


                        <button onClick={() => setActive('saved')} className={` !mx-2 text-[#828282] font-bold sm:!mx-5 text-base sm:text-2xl ${active == "saved" && '!text-black'} `} id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Saved</button>

                    </div>


                    <div >

                        {active == "all" && (
                            <div className='flex flex-wrap justify-center'>
                                {boxdata.map((data, i) => {
                                    return (
                                        <div
                                            className=' py-4 rounded-lg border sm:mx-3 my-2 sm:my-3 w-full sm:w-[34rem] border-[#2eaaed]'
                                            key={i}
                                        >
                                            <div className='flex justify-between w-full px-4'>
                                                <h4 className='text-black text-base font-medium'>Seth Godin</h4>
                                                <p className='bg-[#2eaaed] px-3 py-1 text-xs text-white font-medium rounded-3xl'>Author</p>
                                            </div>
                                            <div className='mt-2 flex w-full'>
                                                <div className='w-full'>
                                                    <table className='w-full'>
                                                        <thead>
                                                            <tr>
                                                                {headers.map((header, index) => (
                                                                    <th key={index} className={`text-base font-medium leading-5 text-gray-600 text-left px-4 py-2`}>
                                                                        {header}
                                                                    </th>
                                                                ))}
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {data.paras.map((item, idx) => (
                                                                <tr key={idx}>
                                                                    <td className='text-gray-900 text-sm px-4 py-2'>{item.para1}</td>
                                                                    <td className='text-gray-900 text-sm px-4 py-2'>{item.para2 ? <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-books stroke-black w-6 h-6" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M5 4m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z"></path><path d="M9 4m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z"></path><path d="M5 8h4"></path><path d="M9 16h4"></path><path d="M13.803 4.56l2.184 -.53c.562 -.135 1.133 .19 1.282 .732l3.695 13.418a1.02 1.02 0 0 1 -.634 1.219l-.133 .041l-2.184 .53c-.562 .135 -1.133 -.19 -1.282 -.732l-3.695 -13.418a1.02 1.02 0 0 1 .634 -1.219l.133 -.041z"></path><path d="M14 9l4 -1"></path><path d="M16 16l3.923 -.98"></path></svg> : ''}</td>
                                                                    <td className='text-gray-900 text-sm px-4 py-2'>{item.para3}</td>
                                                                    <td className='text-gray-900 text-sm px-4 py-2'>{item.para4}</td>
                                                                    <td className='px-4 py-2'>
                                                                        <button className="w-8 h-8 mx-1 bg-yellow-500 hover:bg-opacity-90 flex justify-center items-center border border-black rounded-md">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-bookmark stroke-white w-6 h-6" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                                                <path d="M9 4h6a2 2 0 0 1 2 2v14l-5 -3l-5 3v-14a2 2 0 0 1 2 -2" />
                                                                            </svg>
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                        {active == "profile" && (
                            <h1>Profile</h1>
                        )}
                        {active == "contact" && (
                            <h1>Contact</h1>
                        )}
                        {active == "saved" && (
                            <h1>Saved</h1>
                        )}

                    </div>


                </section>
            </div>

        </div>
    );
}



export default Matches;
