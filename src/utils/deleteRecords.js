import { pb } from "@/app/constants/pocketbase";

export async function deleteRecords(id) {
	try {
		const res = await pb.collection("Gaming_Sessions").delete(id);
		return ({ message: 'Record Deleted', output: res });
	} catch (error) {
		throw console.error(error);
	}
}
