import React, { useState } from 'react';
import styles from './profile.module.scss';
import Image from 'next/image';
import Link from 'next/link';
// import 'bootstrap/dist/css/bootstrap.css';
import Head from "next/head"
import PricingComponent from '@/components/scoped/Pricing';
import HeaderComponent from '@/components/customer/HeaderComponent';
import FreePlan from '../../../assets/free.png'
import BookWorm from '../../../assets/worm.webp'
import Tier2 from '../../../assets/owl.png'
import CloseCircle from "../../../public/images/close-circle.svg"
import CopySVG from "../../../public/images/copy.svg"
const Profilecomponent = () => {
	const [newTitle, setNewTitle] = useState('');
	const [newZipCode, setNewZipCode] = useState('');
	const [newAuthor, setNewAuthor] = useState('');
	const [titles, setTitles] = useState([]);
	const [authors, setAuthors] = useState([]);
	const [zipCodes, setZipCodes] = useState([]);
	const [type, setType] = useState([]);

	const addTitle = (e) => {
		e.preventDefault();
		if (newTitle !== '') {
			setTitles([...titles, newTitle]);
			setNewTitle('');
		}
	};

	const deleteTitle = (index) => {
		const newTitles = [...titles];
		newTitles.splice(index, 1);
		setTitles(newTitles);
	};

	const addAuthor = (e) => {
		e.preventDefault();
		if (newAuthor !== '') {
			setAuthors([...authors, newAuthor]);
			setNewAuthor('');
		}
	};

	const deleteAuthor = (index) => {
		const newAuthors = [...authors];
		newAuthors.splice(index, 1);
		setAuthors(newAuthors);
	};

	const addZipCode = (e) => {
		e.preventDefault();
		if (newZipCode !== '') {
			setZipCodes([...zipCodes, newZipCode]);
			setNewZipCode('');
		}
	};

	const deleteZipCode = (index) => {
		const newZipCodes = [...zipCodes];
		newZipCodes.splice(index, 1);
		setZipCodes(newZipCodes);
	};
	return (
		<div className='bg-[#FEFBE8] min-h-screen'>

			<Head >
				<link rel="shortcut icon" href="/images/fav.png" />

			</Head>

			<div>
				<HeaderComponent />

				<section className='px-5 '>
					<div className='max-w-xl mx-auto'>

						<div className="py-2 mt-0 sm:mt-6">
							<label className="text-sm text-black font-medium">Name</label>
							<div >
								<input
									className="bg-white form-input focus:ring-1 focus:ring-[#ffc71f] focus:outline-none border border-gray-500 w-full rounded-lg  px-4 my-1 py-2" type="text" placeholder='John Doe' />
							</div>
						</div>
						<div className="py-2 ">
							<label className="text-sm text-black font-medium">Email address</label>
							<div >
								<input
									className="bg-white form-input focus:ring-1 focus:ring-[#ffc71f] focus:outline-none border border-gray-500 w-full rounded-lg  px-4 my-1 py-2" type="email" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='MohammedIsmail@gmail.com' />
							</div>
						</div>
						<div className='flex items-center mt-6'>
							<span className="text-sm mr-3 font-medium text-gray-900 dark:text-gray-300">
								Subscribing
							</span>
							<label className="relative  flex items-center cursor-pointer">

								<input
									type="checkbox"
									value=""
									className="sr-only peer"
									checked={type}
									onChange={() => setType(!type)}
								/>
								<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#2EAAED]"></div>
								<span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
									Email alerts
								</span>
							</label>
						</div>

						<div>
							<h3 className='text-xl mt-2 sm:mt-7 font-medium'>Book Alerts</h3>
						</div>

						<div className='mt-1 sm:mt-4'>
							<label className="text-sm text-black font-medium">Titles</label>
							<div>
								<form className='flex my-1' onSubmit={addTitle}>
									<input
										value={newTitle}
										onChange={e => setNewTitle(e.target.value)}
										className="bg-white  form-input focus:ring-1 focus:ring-[#ffc71f] focus:outline-none border border-gray-500 w-full rounded-lg  px-4 py-2.5"
										type="text"
									/>
									<button type="submit" className="bg-[#2eaaed] px-3 flex items-center  rounded-lg  text-decoration-none ms-2">
										<Image
											src={CopySVG}
											width={20}
											height={20}
											alt='profile-icon'
											className="img-fluid"
										/>
									</button>
								</form>
							</div>
							<div className='flex items-center mt-3'>
								{titles.map((title, index) => (
									<div key={index} className='flex mx-1'>
										<p className='rounded-full flex items-center border text-xs sm:text-sm font-medium border-[#2eaaed] px-2 py-1'>
											{title}
											<span className='ms-2 cursor-pointer' onClick={() => deleteTitle(index)}>
												<Image src={CloseCircle} alt="" className="w-3 sm:w-4" />
											</span>
										</p>
									</div>
								))}
							</div>
						</div>
						<div className='mt-4'>
							<label className="text-sm text-black font-medium">Authors</label>
							<div>
								<form className='flex my-1' onSubmit={addAuthor}>
									<input
										value={newAuthor}
										onChange={e => setNewAuthor(e.target.value)}
										className="bg-white  form-input focus:ring-1 focus:ring-[#ffc71f] focus:outline-none border border-gray-500 w-full rounded-lg  px-4 py-2.5"
										type="text"
									/>
									<button type="submit" className="bg-[#2eaaed] px-3 flex items-center  rounded-lg  text-decoration-none ms-2">
										<Image
											src={CopySVG}
											width={20}
											height={20}
											alt='profile-icon'
											className="img-fluid"
										/>
									</button>
								</form>
							</div>
							<div className='flex items-center mt-3'>
								{authors.map((author, index) => (
									<div key={index} className='flex mx-1'>
										<p className='rounded-full flex items-center border text-sm font-medium border-[#2eaaed] px-2 py-1'>
											{author}
											<span className='ms-2 cursor-pointer' onClick={() => deleteAuthor(index)}>
												<Image src={CloseCircle} alt="" className="w-4" />
											</span>
										</p>
									</div>
								))}
							</div>
						</div>







						<div>
							<div>
								<h3 className='text-xl mt-5 sm:mt-16 font-medium'>Book alert zip codes</h3>
							</div>
							<div className='mt-4'>
								<label className="text-sm text-black font-medium">Zip Code</label>
								<div>
									<form className='flex my-1' onSubmit={addZipCode}>
										<input
											value={newZipCode}
											onChange={e => setNewZipCode(e.target.value)}
											className="bg-white  form-input focus:ring-1 focus:ring-[#ffc71f] focus:outline-none border border-gray-500 w-full rounded-lg  px-4 py-2.5"
											type="text" placeholder='1593300'
										/>
										<button type="submit" className="bg-[#2eaaed] px-3 flex items-center  rounded-lg  text-decoration-none ms-2">
											<Image
												src={CopySVG}
												width={20}
												height={20}
												alt='profile-icon'
												className="img-fluid"
											/>
										</button>
									</form>
								</div>
								<div className='flex items-center mt-3'>
									{zipCodes.map((row, index) => (
										<div key={index} className='flex mx-1'>
											<p className='rounded-full flex items-center border text-sm font-medium border-[#2eaaed] px-2 py-1'>
												{row}
												<span className='ms-2 cursor-pointer' onClick={() => deleteZipCode(index)}>
													<Image src={CloseCircle} alt="" className="w-4" />
												</span>
											</p>
										</div>
									))}
								</div>
							</div>
						</div>

						<div className='flex justify-center items-center mt-5'>
							<h3 class="text-xl font-medium mr-3">Total alerts</h3>
							<input
								type="number"
								value={''}

								className='px-3 py-3 w-32 rounded-xl border-2 border-gray-500'


								disabled
							/>
						</div>

						{/* <h3 className='text-xl mt-5 sm:mt-12 font-medium'>Subscription Plan</h3> */}
						<PricingComponent />


					</div>
				</section>
			</div >
		</div >
	);
}
export default Profilecomponent;
