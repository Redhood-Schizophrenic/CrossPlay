import { pocketbase_url } from "@/app/constants/url_consts";
import PocketBase from 'pocketbase';
const pb = new PocketBase(pocketbase_url);

export const add_pc_gaming_session = async(data) => {

	try {

		const device_id = await data['device_id'] || null;
		const customer_name = await data['customer_name'] || null;
		const customer_contact = await data['customer_contact'] || null;
		const date = await data['date'] || null;
		const hours = parseInt(data['hours']) || 1;
		const in_time = await data['in_time'] || null;
		const out_time = await data['out_time'] || null;
		const no_of_players = parseInt(data['no_of_players']) || 1;
		const snacks = await data['snacks'] || 0;

		if (customer_name === null || customer_contact === null || date === null || in_time === null || out_time === null || device_id === null) {
			return {
				returncode: 400,
				message: "Missing some input values",
				output: []
			};
		}

		// Supporting Values
		const minutes = hours * 60;
		let player_type;
		if (no_of_players >= 2) {
			player_type = "Multiplayer";
		} else {
			player_type = "Single";
		}

		let session_price;

		// Session Price Calculator
		if (minutes <= 150) {
			session_price = minutes;
		} else {
			session_price = 50 * hours;	
		}

		const request_data = {
			"Date": date,
			"Device": device_id,
			"Customer_Name": customer_name,
			"Customer_Contact": customer_contact,
			"Hours": hours,
			"Minutes": minutes,
			"In_Time": in_time,
			"Out_Time": out_time,
			"No_of_Players": no_of_players,
			"Player_Type": player_type,
			"Snacks": snacks,
			"Session_Price": session_price,
			"Total_Price": 0,
			"Status": "Open"
		};

		try {
			const result = await pb.collection('Gaming_Sessions').create(request_data);
			return {
				returncode: 200,
				message: "Succesfully added session",
				output: result
			};

		} catch (error) {
			return {
				returncode: 500,
				message: error.message,
				output: []
			}
		}

	} catch (error) {
		return {
			returncode: 400,
			message: "An error occurred",
			output: []
		};
	}
};
