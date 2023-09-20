import { initView } from "./initView";
import { initSearch } from "./initSearch";

export async function main(canvas: HTMLCanvasElement, searchTerm: string) {
	const { view, sceneData } = await initView(canvas);

	if (searchTerm) {
		await initSearch(sceneData, view, searchTerm);
	}

	const flightController = await view.switchCameraController("flight");
	return { view, flightController };
}
