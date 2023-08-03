import Inputcomponent from '@/components/customer/Inputcomponent';
import { useState, useEffect } from "react";
import styles from './matches.module.scss';
import HeaderComponent from '@/components/customer/HeaderComponent';
import TooltipComponent from "@/components/utility/Tooltip";
import Loading from "@/components/utility/loading";
import PaginationComponent from "@/components/utility/Pagination";
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

    const [loadingListings, setLoadingListings] = useState(false);
    const [listings, setListings] = useState([]);

    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("title");

    const [loadingSearchResults, setLoadingSearchResults] = useState(false);
    const [searchResults, setSearchResults] = useState([]);

    // pagination

    const [inventoryMatchesPage, setInventoryMatchesPage] = useState(1);

    const openRequestsItemsPerPage = 7;

    const paginateData = (data, currentPage, itemsPerPage) => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        return data.slice(startIndex, endIndex);
    };
    // pagination end

    const calculateDaysAgo = (dateListed) => {
        const listedDate = new Date(dateListed);

        const currentDate = new Date();

        const diffTime = Math.abs(currentDate - listedDate);

        // Calculate the difference in days
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        // If the difference is more than one day, return it as "x days ago"
        // If it's exactly one day, return "1 day ago"
        // Else if it's less than a day, return "Today"
        if (diffDays > 1) {
            return `${diffDays} days ago`;
        } else if (diffDays === 1) {
            return `1 day ago`;
        } else {
            return "Today";
        }
    };

    const fetchListings = async () => {
        const res = await fetch("/api/fetch-listings");

        if (res.status === 200) {
            const data = await res.json();
            setListings(data);
        }
    };

    useEffect(() => {
        const initialFetch = async () => {
            setLoadingListings(true);
            await fetchListings();
            setLoadingListings(false);
        };
        initialFetch();
    }, []);

    const fetchSearchResults = async () => {
        setLoadingSearchResults(true);
        const res = await fetch("/api/fetch-searchResults", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ searchTerm, filter }),
        });

        if (res.status === 200) {
            const data = await res.json();
            setSearchResults(data);
            setLoadingSearchResults(false);
        }
    };

    const loadingMessage = () => {
        if (loadingListings === true) {
            return "Loading";
        } else if (loadingSearchResults === true) {
            return "Searching";
        }
    };

    const arrayToMap = searchResults.length > 0 ? searchResults : listings;

    const resultCount =
        searchResults.length > 0 ? searchResults.length : listings.length;

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



                    <div>
                        <p className="text-gray-900 text-base">
                            {resultCount} Results found
                        </p>
                    </div>
                    <div className="">
                        {loadingListings || loadingSearchResults ? (
                            <div className="sm:flex justify-center pb-10">
                                <div>
                                    <p className="me-1">{loadingMessage()}</p>
                                    <div className="pt-2.5">
                                        <Loading />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div>
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
                                                        <div className='w-full max-h-[11.5rem] overflow-y-auto'>
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
                        )}
                    </div>


                </section>
            </div>

        </div>
    );
}



export default Matches;
