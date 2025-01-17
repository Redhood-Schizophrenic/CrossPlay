import { add_playstation_session } from "./controller";

export async function POST(request) {
	try {
		const data = await request.json();
		const result = await add_playstation_session(data);

		return Response.json({
			returncode: result.returncode,
			message: result.message,
			output: result.output,
		});

	} catch (error) {
		return Response.json({
			returncode: 500,
			message: `Error adding Playstation Session: ${error.message}`,
			output: []
		}, {
			status: 500
		});
	}
}
