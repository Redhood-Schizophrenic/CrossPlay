import { pocketbase_url } from "@/app/constants/url_consts";
import PocketBase from 'pocketbase';
const pb = new PocketBase(pocketbase_url);

export const close_pc_gaming_session = async(data) => {

	try {

		const session_id = await data['session_id'] || null;

		if (session_id === null) {
			return {
				returncode: 400,
				message: "Session Id missing",
				output: []
			}
		}

		const record = await pb.collection('Gaming_Sessions').getOne(session_id);
		const snacks = parseFloat(record.Snacks);
		const session_price = parseFloat(record.Session_Price);
		const total_price = snacks + session_price;

		const request_data = {
			"Total_Price": total_price,
			"Status": "Closed"
		};

		try {
			const result = await pb.collection('Gaming_Sessions').update(session_id, request_data);
			return {
				returncode: 200,
				message: "Succesfully closed session",
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
