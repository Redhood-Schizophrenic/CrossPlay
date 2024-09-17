'use client';

import React, { useEffect, useState } from 'react'
import { pocketbase_url } from '@/app/constants/url_consts';

export default function AddDevices({ handleClose, devices }) {

	const [data, setdata] = useState([]);
	const [name, setname] = useState('');
	const [description, setdescription] = useState('');
	const [category, setcategory] = useState('N/A');
	const [isLoaded, setisLoaded] = useState(false);
	// const pb_url = 'http://192.168.1.206:8090';

	const fetchCategory = async () => {
		const res = await fetch(`${pocketbase_url}/api/collections/Devices_Type/records`);
		const data = await res.json();
		setdata(data);
	}

	useEffect(() => {
		fetchCategory();
	}, []);

	const addDevices = async (e) => {
		e.preventDefault();
		try {
			setisLoaded(true);
			const res = await fetch(`${pocketbase_url}/api/collections/Devices/records`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					'Name': name,
					'Description': description,
					'Category': category
				}),
			});

			if (res.ok) {
				const data = res.json();
				alert("Device is Added \n data.message");
				devices();
				handleClose();
			}

		} catch (e) {
			throw console.error(e);
		} finally {
			setisLoaded(false);
		}
	}

	console.log("This is ", name, "\n", description, "\n", category);

	return (
		<div className='bg-black bg-opacity-60 w-full h-dvh fixed top-0 left-0 flex justify-center items-center'>
			<form onSubmit={addDevices} className='w-[50%]'>
				<div className='flex flex-col gap-4'>
					<div className='w-full inline-flex flex-col'>
						<label>Device Name</label>
						<input
							type="text"
							className='w-full p-1 text-black text-lg rounded-md'
							value={name}
							onChange={(e) => {
								setname(e.target.value);
							}}
						/>
					</div>
					<div className='w-full inline-flex flex-col'>
						<label>Device Description</label>
						<input
							type="text"
							className='w-full p-1 text-black text-lg rounded-md'
							value={description}
							onChange={(e) => {
								setdescription(e.target.value);
							}}
						/>
					</div>
					<div className='w-full inline-flex flex-col'>
						<label>Device Category</label>
						<select
							className='w-full p-2 text-black text-lg rounded-md'
							value={category}
							onChange={(e) => {
								setcategory(e.target.value);
							}}
						>
							<option value=''>--select--</option>
							{
								data?.items?.map((items, index) => {
									return (
										<option key={index} value={items.id}>{items.Name}</option>
									)
								})
							}
						</select>
					</div>
				</div>

				<hr className='w-full h-1 my-8 border-white border-2' />

				<div className='w-full flex flex-col gap-4'>
					<button className='p-2 w-full rounded-md text-lg bg-green-500 hover:bg-green-600' type='submit'>Save</button>
					<button onClick={handleClose} className='p-2 w-full rounded-md text-lg bg-zinc-600 hover:bg-zinc-700' type='reset'>Cancel</button>
				</div>
			</form>
		</div>
	)
}
