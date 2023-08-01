import React, { useState } from 'react';

const Pricing = () => {
    const pricingData = [

        {
            validity: '3 months',
            keyword: 1,
            keyword_price: "$0.67",
            keyword_set_month_price: "$2.00",
            zip_codes: 1,
            zip_code_price: "$1.67",
            zip_code_set_month_price: "$5.00"
        },
        {
            validity: '3 months',
            keyword: 2,
            keyword_price: "$0.63",
            keyword_set_month_price: "$3.80",
            zip_codes: 2,
            zip_code_price: "$1.58",
            zip_code_set_month_price: "$9.50"
        },
        {
            validity: '3 months',
            keyword: 3,
            keyword_price: "$0.60",
            keyword_set_month_price: "$5.40",
            zip_codes: 3,
            zip_code_price: "$1.50",
            zip_code_set_month_price: "$13.50"
        },
        {
            validity: '3 months',
            keyword: 4,
            keyword_price: "$0.57",
            keyword_set_month_price: "$6.80",
            zip_codes: 4,
            zip_code_price: "$1.42",
            zip_code_set_month_price: "$17.00"
        },
        {
            validity: '3 months',
            keyword: 5,
            keyword_price: "$0.53",
            keyword_set_month_price: "$8.00",
            zip_codes: 5,
            zip_code_price: "$1.33",
            zip_code_set_month_price: "$20.00"
        },
        {
            validity: '3 months',
            keyword: 6,
            keyword_price: "$0.50",
            keyword_set_month_price: "$9.00",
            zip_codes: 6,
            zip_code_price: "$1.25",
            zip_code_set_month_price: "$22.50"
        },
        {
            validity: '3 months',
            keyword: 7,
            keyword_price: "$0.47",
            keyword_set_month_price: "$9.80",
            zip_codes: 7,
            zip_code_price: "$1.17",
            zip_code_set_month_price: "$24.50"
        },
        {
            validity: '3 months',
            keyword: 8,
            keyword_price: "$0.43",
            keyword_set_month_price: "$10.40",
            zip_codes: 8,
            zip_code_price: "$1.08",
            zip_code_set_month_price: "$26.00"
        },
        {
            validity: '3 months',
            keyword: 9,
            keyword_price: "$0.40",
            keyword_set_month_price: "$10.80",
            zip_codes: 9,
            zip_code_price: "$1.00",
            zip_code_set_month_price: "$27.00"
        },
        {
            validity: '3 months',
            keyword: 10,
            keyword_price: "$0.37",
            keyword_set_month_price: "$11.00",
            zip_codes: 10,
            zip_code_price: "$0.92",
            zip_code_set_month_price: "$27.50"
        },


        {
            validity: '6 months',
            keyword: 1,
            keyword_price: "$0.50",
            keyword_set_month_price: "$3.00",
            zip_codes: 1,
            zip_code_price: "$1.33",
            zip_code_set_month_price: "$8.00"
        },
        {
            validity: '6 months',
            keyword: 2,
            keyword_price: "$0.48",
            keyword_set_month_price: "$5.70",
            zip_codes: 2,
            zip_code_price: "$1.27",
            zip_code_set_month_price: "$15.20"
        },
        {
            validity: '6 months',
            keyword: 3,
            keyword_price: "$0.45",
            keyword_set_month_price: "$8.10",
            zip_codes: 3,
            zip_code_price: "$1.20",
            zip_code_set_month_price: "$21.60"
        },
        {
            validity: '6 months',
            keyword: 4,
            keyword_price: "$0.43",
            keyword_set_month_price: "$10.20",
            zip_codes: 4,
            zip_code_price: "$1.13",
            zip_code_set_month_price: "$27.20"
        },
        {
            validity: '6 months',
            keyword: 5,
            keyword_price: "$0.40",
            keyword_set_month_price: "$12.00",
            zip_codes: 5,
            zip_code_price: "$1.07",
            zip_code_set_month_price: "$32.00"
        },
        {
            validity: '6 months',
            keyword: 6,
            keyword_price: "$0.38",
            keyword_set_month_price: "$13.50",
            zip_codes: 6,
            zip_code_price: "$1.00",
            zip_code_set_month_price: "$36.00"
        },
        {
            validity: '6 months',
            keyword: 7,
            keyword_price: "$0.35",
            keyword_set_month_price: "$14.70",
            zip_codes: 7,
            zip_code_price: "$0.93",
            zip_code_set_month_price: "$39.20"
        },
        {
            validity: '6 months',
            keyword: 8,
            keyword_price: "$0.33",
            keyword_set_month_price: "$15.60",
            zip_codes: 8,
            zip_code_price: "$0.87",
            zip_code_set_month_price: "$41.60"
        },
        {
            validity: '6 months',
            keyword: 9,
            keyword_price: "$0.30",
            keyword_set_month_price: "$16.20",
            zip_codes: 9,
            zip_code_price: "$0.80",
            zip_code_set_month_price: "$43.20"
        },
        {
            validity: '6 months',
            keyword: 10,
            keyword_price: "$0.28",
            keyword_set_month_price: "$16.50",
            zip_codes: 10,
            zip_code_price: "$0.73",
            zip_code_set_month_price: "$44.00"
        },


        {
            validity: '12 months',
            keyword: 1,
            keyword_price: "$0.33",
            keyword_set_month_price: "$4.00",
            zip_codes: 1,
            zip_code_price: "$0.83",
            zip_code_set_month_price: "$10.00"
        },
        {
            validity: '12 months',
            keyword: 2,
            keyword_price: "$0.32",
            keyword_set_month_price: "$7.60",
            zip_codes: 2,
            zip_code_price: "$0.79",
            zip_code_set_month_price: "$19.00"
        },
        {
            validity: '12 months',
            keyword: 3,
            keyword_price: "$0.30",
            keyword_set_month_price: "$10.80",
            zip_codes: 3,
            zip_code_price: "$0.75",
            zip_code_set_month_price: "$27.00"
        },
        {
            validity: '12 months',
            keyword: 4,
            keyword_price: "$0.28",
            keyword_set_month_price: "$13.60",
            zip_codes: 4,
            zip_code_price: "$0.71",
            zip_code_set_month_price: "$34.00"
        },
        {
            validity: '12 months',
            keyword: 5,
            keyword_price: "$0.27",
            keyword_set_month_price: "$16.00",
            zip_codes: 5,
            zip_code_price: "$0.67",
            zip_code_set_month_price: "$40.00"
        },
        {
            validity: '12 months',
            keyword: 6,
            keyword_price: "$0.25",
            keyword_set_month_price: "$18.00",
            zip_codes: 6,
            zip_code_price: "$0.63",
            zip_code_set_month_price: "$45.00"
        },
        {
            validity: '12 months',
            keyword: 7,
            keyword_price: "$0.23",
            keyword_set_month_price: "$19.60",
            zip_codes: 7,
            zip_code_price: "$0.58",
            zip_code_set_month_price: "$49.00"
        },
        {
            validity: '12 months',
            keyword: 8,
            keyword_price: "$0.22",
            keyword_set_month_price: "$20.80",
            zip_codes: 8,
            zip_code_price: "$0.54",
            zip_code_set_month_price: "$52.00"
        },
        {
            validity: '12 months',
            keyword: 9,
            keyword_price: "$0.20",
            keyword_set_month_price: "$21.60",
            zip_codes: 9,
            zip_code_price: "$0.50",
            zip_code_set_month_price: "$54.00"
        },
        {
            validity: '12 months',
            keyword: 10,
            keyword_price: "$0.18",
            keyword_set_month_price: "$22.00",
            zip_codes: 10,
            zip_code_price: "$0.46",
            zip_code_set_month_price: "$55.00"
        }
    ]
    const [selectedFrequency, setSelectedFrequency] = useState('3 months');
    const [selectedType, setSelectedType] = useState('keywords');
    const [selectedCount, setSelectedCount] = useState(1);
    const [selectedKeywords, setSelectedKeywords] = useState(1);





    const getPrice = () => {
        console.log(selectedFrequency, selectedKeywords)
        const filtered = pricingData.filter(x => x.validity === selectedFrequency && x.keyword === Number(selectedKeywords))
        console.log(filtered)
        return filtered && filtered[0] && filtered[0][selectedType === 'keywords' ? 'keyword_price' : 'zip_code_price']
    };

    const increase = () => {
        if (selectedKeywords === 10) {
            setSelectedKeywords(0);
        } else {
            setSelectedKeywords(selectedKeywords + 1);
        }
    }


    const handleClick = (point) => {
        setSelectedKeywords(point);
    };







    const getTotal = () => {
        // You can implement your logic to calculate the total price here
        return parseFloat(getPrice().substring(1)) * selectedKeywords

    };

    return (
        <div className="pb-4 sm:pb-8">
            <div>
                <h3 className="text-2xl mb-4 mt-5 sm:mt-12 font-semibold">
                    Buy More Alerts
                </h3>
            </div>
            <div className="flex justify-center">
                <button
                    className={`${selectedType === 'keywords' ? 'bg-green-500 text-black' : 'bg-gray-300 text-black'} mx-1 py-2 px-4 rounded-xl`}
                    onClick={() => setSelectedType('keywords')}
                >
                    Keywords
                </button>
                <button
                    className={`${selectedType === 'zipCodes' ? 'bg-green-500 text-black' : 'bg-gray-300 text-black'} mx-1 py-2 px-4 rounded-xl`}
                    onClick={() => setSelectedType('zipCodes')}
                >
                    Zip Codes
                </button>

            </div>
            <div className="flex justify-center mt-3">
                <h3 className="text-black font-medium text-lg">Renewal frequency</h3>
            </div>
            <div className="flex justify-center mt-1">

                <button
                    className={`${selectedFrequency === '3 months' ? 'bg-green-500 text-black' : 'bg-gray-300 text-black'} mx-1 py-2 px-4 rounded-xl`}
                    onClick={() => setSelectedFrequency('3 months')}
                >
                    3-Month
                </button>
                <button className={`${selectedFrequency === '6 months' ? 'bg-green-500 text-black' : 'bg-gray-300 text-black'} mx-1 py-2 px-4 rounded-xl`}
                    onClick={() => setSelectedFrequency('6 months')}>
                    6-Month
                </button>
                <button className={`${selectedFrequency === '12 months' ? 'bg-green-500 text-black' : 'bg-gray-300 text-black'} mx-1 py-2 px-4 rounded-xl`}
                    onClick={() => setSelectedFrequency('12 months')}>
                    12-Month
                </button>

            </div>
            <div className='flex justify-center mt-7'>
                <input
                    type="number"
                    value={selectedKeywords}
                    className='px-3 py-2 w-20 rounded-lg'
                    onChange={e => setSelectedKeywords(e.target.value)}
                    min="1"
                    max="10"
                />
            </div>

            <div className="flex justify-center mt-10 items-center">

                <div className="relative border-2 border-black rounded-full w-24 h-24">


                    {Array.from({ length: 10 }, (_, index) => (
                        <div
                            key={index}
                            onClick={() => handleClick(index + 1)}
                            className={`absolute w-2 h-2 bg-black rounded-full cursor-pointer point-${index + 1}`}
                        />
                    ))}
                    <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center">

                        <div className="text-xl font-bold">
                            <h3 className="flex text-center justify-center">{getPrice()}</h3>
                            <h3 className="flex text-center justify-center">each</h3>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-center mt-7 items-center">
                <h3 className="text-xl font-medium mr-3">Total</h3>
                <div className="border-8 border-black px-3 py-1">{getTotal()}</div>
            </div>
            <div className="flex justify-center mt-7">
                <button
                    className="sm:mx-2 duration-300 ease-in-out hover:bg-white font-bold border hover:border-green-600 bg-green-600 text-white px-12 hover:text-green-600 py-3 mx-auto rounded-full"
                    type="btn"
                >
                    Buy
                </button>
            </div>
        </div>
    );
};

export default Pricing;
