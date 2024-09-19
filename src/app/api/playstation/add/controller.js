import { pocketbase_url } from "@/app/constants/url_consts";
import PocketBase from 'pocketbase';
const pb = new PocketBase(pocketbase_url);

export const add_playstation_session = async (data) => {

	try {

		const device_id = await data['device_id'] || null;
		const customer_name = await data['customer_name'] || null;
		const customer_contact = await data['customer_contact'] || null;
		const date = await data['date'] || null;
		const hours = parseInt(data['hours']) || 1;
		const in_time = await data['in_time'] || null;
		const out_time = await data['out_time'] || null;
		const no_of_players = parseInt(data['no_of_players']) || null;
		const snacks = await data['snacks'] || 0;

		if (customer_name === null || date === null || in_time === null || out_time === null || no_of_players === null || device_id === null) {
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

		// Assuming 'HH:MM' format
		const [in_hour, in_minute] = await in_time.split(":").map(Number);
		const [out_hour, out_minute] = await out_time.split(":").map(Number);

		const in_time_datetime = new Date(date);
		in_time_datetime.setHours(in_hour, in_minute);

		const out_time_datetime = new Date(date);
		out_time_datetime.setHours(out_hour, out_minute);

		const happy_hour_start = new Date(date);
		happy_hour_start.setHours(9, 0); // 09:00 AM

		const happy_hour_end = new Date(date);
		happy_hour_end.setHours(13, 0); // 01:00 PM

		let session_price;

		// Session Price Calculator
		if (player_type === "Single") {
			if (in_time_datetime >= happy_hour_start && out_time_datetime <= happy_hour_end) {
				session_price = 75 * hours;
			} else {
				session_price = 150 * hours;
			}
		} else if (player_type === "Multiplayer") {
			if (in_time_datetime >= happy_hour_start && out_time_datetime <= happy_hour_end) {
				session_price = 35 * no_of_players * hours;
			} else {
				session_price = 70 * no_of_players * hours;
			}
		} else {
			return {
				returncode: 400,
				message: "Invalid No.of Players",
				output: []
			};
		}


		const request_data = {
			"Date": date,
			"Device": device_id,
			"Customer_Name": customer_name,
			"Customer_Contact": customer_contact || "N/A",
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
