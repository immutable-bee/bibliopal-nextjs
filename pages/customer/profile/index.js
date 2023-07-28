import React, { useState } from 'react';
import styles from './profile.module.scss';
import Image from 'next/image';
import Link from 'next/link';
// import 'bootstrap/dist/css/bootstrap.css';
import Head from "next/head"
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


						<div className='pb-4 sm:pb-8'>
							<div>
								<h3 className='text-xl mt-5 sm:mt-12 font-medium'>Subscription Plan</h3>
							</div>
							<div className='w-full mx-auto mt-2 sm:mt-0'>
								<div className='flex items-center justify-center'>
									<div className='mx-3 w-40'>
										<div className='mx-auto w-full h-32 flex items-center justify-center'>
											<Image
												src={FreePlan}
												alt="img"

												className="w-20 sm:w-32"
											/>
										</div>
										<h4 className='text-xl sm:text-2xl mt-3 sm:mt-4 text-center font-bold uppercase'>FREE</h4>
									</div>

									<div className='mx-3 w-40'>
										<div className='mx-auto w-full h-32 flex items-center justify-center'>
											<Image
												src={Tier2}
												alt="img"

												className="w-20 sm:w-32"
											/>
										</div>
										<h4 className='text-xl sm:text-2xl mt-3 sm:mt-4 text-center font-bold uppercase'>Owl</h4>
									</div>
									<div className='mx-3 w-40'>
										<div className='mx-auto w-full h-32 flex items-center justify-center'>
											<Image
												src={BookWorm}
												alt="img"

												className="w-20 sm:w-32"
											/>
										</div>
										<h4 className='text-xl sm:text-2xl mt-3 sm:mt-4 text-center font-bold uppercase'>Worm</h4>
									</div>
								</div>
								<div className='flex mt-4 sm:mt-8 justify-center'>

									<button type="btn" className='mx-1 sm:mx-2 duration-300 ease-in-out bg-white font-bold border border-[#eb5757] hover:bg-[#eb5757] hover:text-white px-6 text-[#eb5757] py-2 rounded-full'>Cancel</button>


									<button className='mx-1 sm:mx-2 duration-300 ease-in-out hover:bg-white font-bold border hover:border-[#2EAAED] bg-[#2EAAED] text-white px-6 hover:text-[#2EAAED] py-2 rounded-full' type="btn" >Upgrade Now </button>

								</div>
							</div>
						</div>
					</div>
				</section>
			</div >
		</div >
	);
}
export default Profilecomponent;
