import { extend_pc_gaming_session } from "./controller";

export async function PUT(request) {
	try {
		const data = await request.json();
		const result = await extend_pc_gaming_session(data);

		return Response.json({
			returncode: result.returncode,
			message: result.message,
			output: result.output,
		});

	} catch (error) {
		return Response.json({
			returncode: 500,
			message: `Error extending Playstation Session: ${error.message}`,
			output: []
		}, {
			status: 500
		});
	}
}
