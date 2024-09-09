import { pocketbase_url } from "@/app/constants/url_consts";
import PocketBase from 'pocketbase';
const pb = new PocketBase(pocketbase_url);

export const update_playstation_session = async(data) => {

	try {

		const session_id = await data['session_id'] || ""; 
		const device_id = await data['device_id'] || "";
		const customer_name = await data['customer_name'] || "";
		const customer_contact = await data['customer_contact'] || "";
		const date = await data['date'] || "";
		const hours = parseInt(data['hours']) || 1;
		const in_time = await data['in_time'] || "";
		const out_time = await data['out_time'] || "";
		const no_of_players = parseInt(data['no_of_players']) || "";
		const snacks = await data['snacks'] || 0;
		const player_type = await data['player_type'] || "Multiplayer";
		const session_price = await data['session_price'] || 0;
		const total_price = await data['total_price'] || 0;
		const minutes = hours * 60;

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
			"Total_Price": total_price
		};

		try {
			const result = await pb.collection('Gaming_Sessions').update(session_id, request_data);
			return {
				returncode: 200,
				message: "Succesfully updated session",
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
