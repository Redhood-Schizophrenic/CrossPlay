import { sales_dashboard } from "./controller";

export async function GET() {
	try {
		const result = await sales_dashboard();
		return Response.json({
			returncode: result.returncode,
			message: result.message,
			output: result.output,
		});

	} catch (error) {
		return Response.json({
			returncode: 500,
			message: `Error getting data: ${error.message}`,
			output: []
		}, {
			status: 500
		});
	}
}
