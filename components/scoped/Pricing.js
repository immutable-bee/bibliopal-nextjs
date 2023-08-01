import React, { useState } from 'react';

const Pricing = () => {
    const pricingData = [
        {
            "__1": "keywords",
            "__2": "Monthly each",
            "__3": "3 months",
            "__4": "",
            "__5": "Zip Codes",
            "__6": "Monthly each",
            "__7": "3 months"
        },
        {
            "__1": 1,
            "__2": "$0.67",
            "__3": "$2.00",
            "__4": "",
            "__5": 1,
            "__6": "$1.67",
            "__7": "$5.00"
        },
        {
            "__1": 2,
            "__2": "$0.63",
            "__3": "$3.80",
            "__4": "",
            "__5": 2,
            "__6": "$1.58",
            "__7": "$9.50"
        },
        {
            "__1": 3,
            "__2": "$0.60",
            "__3": "$5.40",
            "__4": "",
            "__5": 3,
            "__6": "$1.50",
            "__7": "$13.50"
        },
        {
            "__1": 4,
            "__2": "$0.57",
            "__3": "$6.80",
            "__4": "",
            "__5": 4,
            "__6": "$1.42",
            "__7": "$17.00"
        },
        {
            "__1": 5,
            "__2": "$0.53",
            "__3": "$8.00",
            "__4": "",
            "__5": 5,
            "__6": "$1.33",
            "__7": "$20.00"
        },
        {
            "__1": 6,
            "__2": "$0.50",
            "__3": "$9.00",
            "__4": "",
            "__5": 6,
            "__6": "$1.25",
            "__7": "$22.50"
        },
        {
            "__1": 7,
            "__2": "$0.47",
            "__3": "$9.80",
            "__4": "",
            "__5": 7,
            "__6": "$1.17",
            "__7": "$24.50"
        },
        {
            "__1": 8,
            "__2": "$0.43",
            "__3": "$10.40",
            "__4": "",
            "__5": 8,
            "__6": "$1.08",
            "__7": "$26.00"
        },
        {
            "__1": 9,
            "__2": "$0.40",
            "__3": "$10.80",
            "__4": "",
            "__5": 9,
            "__6": "$1.00",
            "__7": "$27.00"
        },
        {
            "__1": 10,
            "__2": "$0.37",
            "__3": "$11.00",
            "__4": "",
            "__5": 10,
            "__6": "$0.92",
            "__7": "$27.50"
        },

        {
            "__1": "keywords",
            "__2": "Monthly each",
            "__3": "6 months",
            "__4": "",
            "__5": "Zip Codes",
            "__6": "Monthly each",
            "__7": "6 months"
        },
        {
            "__1": 1,
            "__2": "$0.50",
            "__3": "$3.00",
            "__4": "",
            "__5": 1,
            "__6": "$1.33",
            "__7": "$8.00"
        },
        {
            "__1": 2,
            "__2": "$0.48",
            "__3": "$5.70",
            "__4": "",
            "__5": 2,
            "__6": "$1.27",
            "__7": "$15.20"
        },
        {
            "__1": 3,
            "__2": "$0.45",
            "__3": "$8.10",
            "__4": "",
            "__5": 3,
            "__6": "$1.20",
            "__7": "$21.60"
        },
        {
            "__1": 4,
            "__2": "$0.43",
            "__3": "$10.20",
            "__4": "",
            "__5": 4,
            "__6": "$1.13",
            "__7": "$27.20"
        },
        {
            "__1": 5,
            "__2": "$0.40",
            "__3": "$12.00",
            "__4": "",
            "__5": 5,
            "__6": "$1.07",
            "__7": "$32.00"
        },
        {
            "__1": 6,
            "__2": "$0.38",
            "__3": "$13.50",
            "__4": "",
            "__5": 6,
            "__6": "$1.00",
            "__7": "$36.00"
        },
        {
            "__1": 7,
            "__2": "$0.35",
            "__3": "$14.70",
            "__4": "",
            "__5": 7,
            "__6": "$0.93",
            "__7": "$39.20"
        },
        {
            "__1": 8,
            "__2": "$0.33",
            "__3": "$15.60",
            "__4": "",
            "__5": 8,
            "__6": "$0.87",
            "__7": "$41.60"
        },
        {
            "__1": 9,
            "__2": "$0.30",
            "__3": "$16.20",
            "__4": "",
            "__5": 9,
            "__6": "$0.80",
            "__7": "$43.20"
        },
        {
            "__1": 10,
            "__2": "$0.28",
            "__3": "$16.50",
            "__4": "",
            "__5": 10,
            "__6": "$0.73",
            "__7": "$44.00"
        },

        {
            "__1": "keywords",
            "__2": "Monthly each",
            "__3": "12 months",
            "__4": "",
            "__5": "Zip Codes",
            "__6": "Monthly each",
            "__7": "12 months"
        },
        {
            "__1": 1,
            "__2": "$0.33",
            "__3": "$4.00",
            "__4": "",
            "__5": 1,
            "__6": "$0.83",
            "__7": "$10.00"
        },
        {
            "__1": 2,
            "__2": "$0.32",
            "__3": "$7.60",
            "__4": "",
            "__5": 2,
            "__6": "$0.79",
            "__7": "$19.00"
        },
        {
            "__1": 3,
            "__2": "$0.30",
            "__3": "$10.80",
            "__4": "",
            "__5": 3,
            "__6": "$0.75",
            "__7": "$27.00"
        },
        {
            "__1": 4,
            "__2": "$0.28",
            "__3": "$13.60",
            "__4": "",
            "__5": 4,
            "__6": "$0.71",
            "__7": "$34.00"
        },
        {
            "__1": 5,
            "__2": "$0.27",
            "__3": "$16.00",
            "__4": "",
            "__5": 5,
            "__6": "$0.67",
            "__7": "$40.00"
        },
        {
            "__1": 6,
            "__2": "$0.25",
            "__3": "$18.00",
            "__4": "",
            "__5": 6,
            "__6": "$0.63",
            "__7": "$45.00"
        },
        {
            "__1": 7,
            "__2": "$0.23",
            "__3": "$19.60",
            "__4": "",
            "__5": 7,
            "__6": "$0.58",
            "__7": "$49.00"
        },
        {
            "__1": 8,
            "__2": "$0.22",
            "__3": "$20.80",
            "__4": "",
            "__5": 8,
            "__6": "$0.54",
            "__7": "$52.00"
        },
        {
            "__1": 9,
            "__2": "$0.20",
            "__3": "$21.60",
            "__4": "",
            "__5": 9,
            "__6": "$0.50",
            "__7": "$54.00"
        },
        {
            "__1": 10,
            "__2": "$0.18",
            "__3": "$22.00",
            "__4": "",
            "__5": 10,
            "__6": "$0.46",
            "__7": "$55.00"
        }
    ]
    const [selectedFrequency, setSelectedFrequency] = useState('3 months');
    const [selectedType, setSelectedType] = useState('keywords');
    const [selectedCount, setSelectedCount] = useState(1);
    const [selectedKeywords, setSelectedKeywords] = useState(1);

    const getFrequencyOffset = (frequency) => {
        for (let i = 0; i < pricingData.length; i++) {
            if (pricingData[i].__3 === frequency) {
                return i;
            }
        }
        return 0; // default to 0 if not found
    };



    const getPrice = () => {
        // Determine the index offset based on the selected frequency
        let frequencyOffset;
        switch (selectedFrequency) {
            case '3 months':
                frequencyOffset = 0;
                break;
            case '6 months':
                frequencyOffset = 14;
                break;
            case '12 months':
                frequencyOffset = 28;
                break;
            default:
                return 'N/A';
        }

        // Determine the correct key based on the selected type
        let priceKey;
        if (selectedType === 'keywords') {
            priceKey = '__2';
        } else if (selectedType === 'zipCodes') {
            priceKey = '__6';
        } else {
            return 'N/A';
        }

        // Convert selectedKeywords to a number, and find the correct object in pricingData
        const index = frequencyOffset + Number(selectedKeywords);
        const priceObj = pricingData[index];

        // Return the appropriate price or 'N/A' if not found
        return priceObj ? priceObj[priceKey] : 'N/A';
    };






    const getTotal = () => {
        // You can implement your logic to calculate the total price here
        return getPrice();
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
                />
            </div>

            <div className="flex justify-center mt-3 items-center">
                <div className="border-2 border-black rounded-full flex items-center justify-center w-24 text-xl font-bold h-24">
                    <div>
                        <h3 className="flex text-center justify-center">{getPrice()}</h3>
                        <h3 className="flex text-center justify-center">each</h3>
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
