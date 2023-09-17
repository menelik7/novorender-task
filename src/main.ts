import { FC, useEffect, useContext } from "react";
import {
	GPUTier,
	RenderStateHighlightGroups,
	View,
	createNeutralHighlight,
	getDeviceProfile,
} from "@novorender/api";
import { createAPI, type SceneData } from "@novorender/data-js-api";
import { SearchContext, SearchTermContextTypes } from "./context/search";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;

async function main(canvas: HTMLCanvasElement, searchTerm: string) {
	const gpuTier: GPUTier = 2;
	const deviceProfile = getDeviceProfile(gpuTier);
	// Initialize the data API with the Novorender data server service
	const dataApi = createAPI({
		serviceUrl: "https://data.novorender.com/api",
	});

	// Load scene metadata
	// Condos scene ID, but can be changed to any public scene ID
	const SCENE_ID = "95a89d20dd084d9486e383e131242c4c";

	const sceneData = (await dataApi.loadScene(SCENE_ID)) as SceneData;

	// Destructure relevant properties into variables
	const { url } = sceneData;
	// load the scene using URL gotten from `sceneData`
	const imports = await View.downloadImports({ baseUrl: "/novorender/api/" });
	const view = new View(canvas, deviceProfile, imports);
	const config = await view.loadSceneFromURL(new URL(url));
	const { center, radius } = config.boundingSphere;

	if (searchTerm) {
		try {
			const { db } = sceneData as SceneData;
			if (db) {
				const controller = new AbortController();
				const signal = controller.signal;

				// Run the searches
				// Fluffy search which will search all properties for words starting with <searchTerm>"
				// Example: "Roo" will still find roofs, but "oof" will not
				const iterator = db.search({ searchPattern: searchTerm }, signal);

				// In this example we just want to isolate the objects so all we need is the object ID
				const result: number[] = [];
				for await (const object of iterator) {
					result.push(object.id);
				}

				// If the search returns value
				if (result.length) {
					// Then we isolate the objects found
					const renderStateHighlightGroups: RenderStateHighlightGroups = {
						defaultAction: "hide",
						groups: [{ action: createNeutralHighlight(), objectIds: result }],
					};

					// Finally, modify the renderState if the search returns value
					view.modifyRenderState({ highlights: renderStateHighlightGroups });
				}
			}
		} catch (e) {
			console.warn(e);
		}
	}

	view.activeController.autoFit(center, radius);
	await view.switchCameraController("flight");
	await view.run();
	view.dispose();
}

const Main: FC = () => {
	const { searchTerm } = useContext(SearchContext) as SearchTermContextTypes;

	useEffect(() => {
		main(canvas, searchTerm);
	}, [searchTerm]);

	return null;
};

export default Main;
