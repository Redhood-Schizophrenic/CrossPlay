import { pocketbase_url } from "@/app/constants/url_consts";
import PocketBase from 'pocketbase';
const pb = new PocketBase(pocketbase_url);

export const extend_pc_gaming_session = async(data) => {

	try {

		const session_id = await data['session_id'] || null;
		let hours = parseFloat(data['hours']) || 1;
		const in_time = await data['in_time'] || null;
		const out_time = await data['out_time'] || null;

		if ( hours === null || in_time === null || out_time === null || session_id === null) {
			return {
				returncode: 400,
				message: "Missing some input values",
				output: []
			};
		}

		const record = await pb.collection('Gaming_Sessions').getOne(session_id);
		const old_hours = parseInt(record.Hours);

		// Supporting Values
		hours = hours + old_hours
		const minutes = hours * 60;
		let session_price;

		// Session Price Calculator
		if (minutes <= 150) {
			session_price = minutes;
		} else {
			session_price = 50 * hours;	
		}

		const request_data = {
			"Hours": hours,
			"Minutes": minutes,
			"In_Time": in_time,
			"Out_Time": out_time,
			"Session_Price": session_price
		};

		try {
			const result = await pb.collection('Gaming_Sessions').update(session_id ,request_data);
			return {
				returncode: 200,
				message: "Succesfully extended session",
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
			message: `An error occurred${error}`,
			output: []
		};
	}
};
