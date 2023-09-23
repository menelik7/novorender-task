import { GPUTier, View, getDeviceProfile } from "@novorender/api";
import { SceneData, createAPI } from "@novorender/data-js-api";

export async function initView(canvas: HTMLCanvasElement) {
	const gpuTier: GPUTier = 2;
	const deviceProfile = getDeviceProfile(gpuTier);
	// Initialize the data API with the Novorender data server service
	const dataApi = createAPI({
		serviceUrl: "https://data.novorender.com/api",
	});

	// Load scene metadata
	const SCENE_ID = "95a89d20dd084d9486e383e131242c4c";
	const sceneData = (await dataApi.loadScene(SCENE_ID)) as SceneData;

	// Destructure relevant properties into variables
	const { url } = sceneData;
	// load the scene using URL gotten from `sceneData`
	const imports = await View.downloadImports({ baseUrl: "/novorender/api/" });
	const view = new View(canvas, deviceProfile, imports);
	const config = await view.loadSceneFromURL(new URL(url));
	const { center, radius } = config.boundingSphere;
	view.activeController.autoFit(center, radius);
	const flightController = await view.switchCameraController("flight");

	return { view, sceneData, flightController };
}
