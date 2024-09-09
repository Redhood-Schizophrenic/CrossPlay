import { pocketbase_url } from "@/app/constants/url_consts";
import PocketBase from 'pocketbase';
const pb = new PocketBase(pocketbase_url);

export const extend_playstation_session = async (data) => {

	try {

		const session_id = await data['session_id'] || null;
		let minutes = parseInt(data['minutes']) || 15;
		const in_time = await data['in_time'] || null;
		const out_time = await data['out_time'] || null;

		if (in_time === null || out_time === null || minutes === null || session_id === null) {
			return {
				returncode: 400,
				message: "Missing some input values",
				output: []
			};
		}

		const record = await pb.collection('Gaming_Sessions').getOne(session_id);
		const date = record.Date;
		const no_of_players = record.No_of_Player;
		const player_type = record.Player_Type;
		const old_session_price = record.Session_Price;

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
		happy_hour_end.setHours(13, 30); // 01:30 PM

		let session_price;

		// Session Price Calculator
		if (player_type === "Single") {
			if (in_time_datetime >= happy_hour_start && out_time_datetime <= happy_hour_end) {
				if (minutes == 15) {
					session_price = old_session_price + 20;
				}
				else if (minutes === 30) {
					session_price = old_session_price + 40;
				}
				else if (minutes === 60) {
					session_price = old_session_price + 75;
				}
			} else {
				if (minutes == 15) {
					session_price = old_session_price + 40;
				}
				else if (minutes === 30) {
					session_price = old_session_price + 75;
				}
				else if (minutes === 60) {
					session_price = old_session_price + 150;
				}
			}
		} else if (player_type === "Multiplayer") {
			if (in_time_datetime >= happy_hour_start && out_time_datetime <= happy_hour_end) {
				if (minutes == 15) {
					session_price = old_session_price + 10 * no_of_players;
				}
				else if (minutes === 30) {
					session_price = old_session_price + 20 * no_of_players;
				}
				else if (minutes === 60) {
					session_price = old_session_price + 35 * no_of_players;
				}
			} else {
				if (minutes == 15) {
					session_price = old_session_price + 20 * no_of_players;
				}
				else if (minutes === 30) {
					session_price = old_session_price + 35 * no_of_players;
				}
				else if (minutes === 60) {
					session_price = old_session_price + 75 * no_of_players;
				}
			}
		} else {
			return {
				returncode: 400,
				message: "Invalid No.of Players",
				output: []
			};
		}

		minutes = minutes + parseInt(record.Minutes);
		const hours = parseFloat(minutes / 60);


		const request_data = {
			"Hours": hours,
			"Minutes": minutes,
			"In_Time": in_time,
			"Out_Time": out_time,
			"Session_Price": session_price,
		};

		try {
			const result = await pb.collection('Gaming_Sessions').update(session_id, request_data);
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
