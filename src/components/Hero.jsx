'use client';

import { api_url, pocketbase_url } from '@/app/constants/url_consts';
import React, { useEffect, useState } from 'react';
import AddDevices from './AddDevices';

export default function Hero() {

	const [category, setcategory] = useState([]);
	const [devices, setdevices] = useState([]);
	const [isLoaded, setisLoaded] = useState(false);
	const [openModal, setopenModal] = useState(false);
	const [device_id, setdevice_id] = useState('');
	const [customer_name, setcustomer_name] = useState('');
	const [customer_number, setcustomer_number] = useState('');
	const [formatedDate, setformatedDate] = useState('');
	const [hours, sethours] = useState();
	const [in_time, setin_time] = useState('');
	const [out_time, setout_time] = useState('');
	const [noOfPlayer, setnoOfPlayer] = useState(1);
	const [snacks, setsnacks] = useState();
	const [time, settime] = useState('00:00');
	const [date, setDate] = useState('');
	const [openTime, setopenTime] = useState(false);
	const [open1Modal, setopen1Modal] = useState(false);

	const fetchCategory = async () => {
		const res = await fetch(`${pocketbase_url}/api/collections/Devices_Type/records`);
		const data = await res.json();
		setcategory(data.items);
	}

	const fetchDevices = async () => {
		const res = await fetch(`${pocketbase_url}/api/collections/Devices/records`);
		const data = await res.json();
		setdevices(data.items);
	}

	const handleDateChange = (e) => {
		const inputDate = new Date(e.target.value);
		setDate(e.target.value)
		// Check if a valid date is selected
		if (!isNaN(inputDate)) {
			const options = { day: 'numeric', month: 'long', year: 'numeric' };
			const formatted = inputDate.toLocaleDateString('en-IN', options);
			setformatedDate(formatted);
		}
	};

	function ModalOpen() {
		setopenModal(true);
	}

	function ModalClose() {
		setopenModal(false);
	}

	function Modal1Open() {
		setopen1Modal(true);
	}

	function Modal1Close() {
		setopen1Modal(false);
	}

	async function AddSession(e) {
		e.preventDefault();
		try {
			setisLoaded(true);
			const res = await fetch(`${api_url}/api/playstation/add`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					"customer_name": customer_name,
					"customer_contact": customer_number,
					"device_id": device_id,
					"date": formatedDate,
					"hours": parseInt(hours),
					"in_time": in_time,
					"out_time": out_time,
					"no_of_players": parseInt(noOfPlayer),
					"snacks": parseInt(snacks)
				}),
			});

			if (res.ok) {
				location.href = "/"
			}
		} catch (e) {
			throw console.error(e);
		} finally {
			setisLoaded(false);
		}
	}

	useEffect(() => {
		fetchCategory();
		fetchDevices();
	}, []);

	const ps = devices.filter(item => item.Category === category[0]?.id);
	const pg = devices.filter(item => item.Category === category[1]?.id);


	if (isLoaded) {
		return (
			<div className='w-full h-dvh flex justify-center items-center'>
				<p className='text-lg'>Loading...</p>
			</div>
		)
	}
	return (
		<div className='flex flex-col justify-center items-center gap-8 p-6 text-lg'>
			<div className='w-full h-auto'>
				<div className='flex justify-between items-center my-4 py-4'>
					<p className='text-xl font-bold'>Devices</p>
					<button onClick={Modal1Open} className='py-2 px-4 bg-green-500 active:bg-green-700 rounded-full'>Add device</button>
				</div>
				<div className='bg-slate-900 shadow-black shadow-md py-4 px-4 text-center flex justify-between items-center rounded-md'>
					<h2>{category[0]?.Name}</h2>
				</div>
				<div className='p-4 flex items-center gap-8 flex-wrap'>
					{
						ps.map((items, index) => {
							return (
								<div key={index} className='flex-col flex justify-between items-center'>
									<div
										title={items.Description}
										key={index}
										onClick={() => { setdevice_id(items.id); ModalOpen(); }}
										className='w-[200px] h-[200px] bg-slate-900 shadow-black shadow-md rounded-md inline-flex justify-center items-center m-4 cursor-pointer flex-col gap-10'
									>
										<span className='font-semibold cursor-pointer'>{items.Name}</span>
									</div>
								</div>
							)
						})
					}
				</div>
			</div>
			<div className='w-full h-auto'>
				<div className='bg-slate-900 shadow-black shadow-md py-4 px-4 text-center flex justify-between items-center rounded-md'>
					<h2>{category[1]?.Name}</h2>
				</div>
				<div className='p-4 flex items-center gap-8 flex-wrap'>
					{
						pg.map((items, index) => {
							return (
								<div key={index} className='flex-col flex justify-between items-center'>
									<div
										title={items.Description}
										key={index}
										onClick={() => { setdevice_id(items.id); ModalOpen(); }}
										className='w-[200px] h-[200px] bg-slate-900 shadow-black shadow-md rounded-md inline-flex justify-center items-center m-4 cursor-pointer'
									>
										<span className='font-semibold cursor-pointer'>{items.Name}</span>
									</div>
								</div>
							)
						})
					}
				</div>
			</div>
			{
				openModal && (
					<div className='w-full h-full fixed z-30 top-0 left-0 flex justify-center items-center bg-black bg-opacity-40 backdrop-blur-md'>
						<form onSubmit={AddSession} className='w-[40%] h-auto'>
							<div className='flex lg:flex-row justify-center items-center gap-4 flex-col'>
								<div>
									<div className='w-full inline-flex flex-col justify-center items-start'>
										<label>Customer name</label>
										<input type="text" value={customer_name} onChange={(e) => { setcustomer_name(e.target.value) }} className='w-full text-lg text-black p-2 rounded-lg' />
									</div>
									<div className='w-full inline-flex flex-col justify-center items-start'>
										<label>Customer number</label>
										<input type="text" minLength={10} maxLength={10} value={customer_number} onChange={(e) => { setcustomer_number(e.target.value) }} className='w-full text-lg text-black p-2 rounded-lg' />
									</div>
									<div className='w-full inline-flex flex-col justify-center items-start'>
										<label>Date</label>
										<input type="date" value={date} onChange={handleDateChange} className='w-full text-lg text-black p-2 rounded-lg' />
									</div>
									<div className='w-full inline-flex flex-col justify-center items-start'>
										<label>Hours</label>
										<input type="number" value={hours} onChange={(e) => sethours(Number(e.target.value))} className='w-full text-lg text-black p-2 rounded-lg' />
									</div>
								</div>
								<div>
									<div className='w-full inline-flex flex-col justify-center items-start'>
										<label className=''>In Time</label>
										<input type="time" value={in_time} onChange={(e) => setin_time(e.target.value)} className='w-full text-lg text-black p-2 rounded-lg' />
									</div>
									<div className='w-full inline-flex flex-col justify-center items-start'>
										<label>Out Time</label>
										<input type="time" value={out_time} onChange={(e) => setout_time(e.target.value)} className='w-full text-lg text-black p-2 rounded-lg' />
									</div>
									<div className='w-full inline-flex flex-col justify-center items-start'>
										<label>No of Players</label>
										<input type="number" value={noOfPlayer} onChange={(e) => setnoOfPlayer(Number(e.target.value))} className='w-full text-lg text-black p-2 rounded-lg' />
									</div>
									<div className='w-full inline-flex flex-col justify-center items-start'>
										<label>Snacks</label>
										<input type="number" value={snacks} onChange={(e) => setsnacks(Number(e.target.value))} className='w-full text-lg text-black p-2 rounded-lg' />
									</div>
								</div>
							</div>
							<div className='w-full flex flex-col gap-4 mt-[2rem]'>
								<button className='p-2 w-full bg-green-500 hover:bg-green-600 rounded-lg'>Save</button>
								<button onClick={ModalClose} className='p-2 w-full bg-white text-black hover:bg-opacity-80 rounded-lg'>Cancel</button>
							</div>
						</form>
					</div>
				)
			}
			{
				open1Modal && (
					<AddDevices handleClose={Modal1Close} devices={fetchDevices} />
				)
			}
		</div>
	)
}
