import { pocketbase_url } from "@/app/constants/url_consts";
import PocketBase from 'pocketbase';
const pb = new PocketBase(pocketbase_url);

export const sales_dashboard = async () => {

	try {
		try {

			// const records = await pb.collection('Gaming_Sessions').getFullList();
			const records_response = await fetch(`${pocketbase_url}/api/collections/Gaming_Sessions/records/?perPage=100000000000000`);
			const devices_response = await fetch(`${pocketbase_url}/api/collections/Devices/records`);
			const devices = await devices_response.json();
			const records = await records_response.json();
			devices.items.filter((device) => {
				records.items.filter((record) => {
					if (device.id === record.Device) {
						record.DeviceInfo = device
					}
				});
			});

			return {
				returncode: 200,
				message: "Successfully fetched Dashboard",
				output: records
			};

		} catch (error) {
			return {
				returncode: 500,
				message: error.message,
				output: []
			};
		}

	} catch (error) {
		return {
			returncode: 400,
			message: "An error occurred",
			output: []
		};
	}
};
