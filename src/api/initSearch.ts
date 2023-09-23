import {
	RenderStateGroupAction,
	RenderStateHighlightGroups,
	View,
	createNeutralHighlight,
} from "@novorender/api";
import { SceneData } from "@novorender/data-js-api";

export async function initSearch(
	sceneData: SceneData,
	view: View,
	searchTerm: string
) {
	let loading = false;
	let defaultAction: RenderStateGroupAction | undefined = "hide";
	let abortController = new AbortController();

	// Abort currently running search if a new one is initiated
	if (loading) {
		abortController.abort();
		abortController = new AbortController();
	}

	const abortSignal = abortController.signal;
	loading = true;

	try {
		const { db } = sceneData as SceneData;
		if (db) {
			const iterator = db.search({ searchPattern: searchTerm }, abortSignal);

			// Isolate the objects using the object ID
			const result: number[] = [];
			for await (const object of iterator) {
				result.push(object.id);
			}

			// If the search returns no value
			if (!result.length) {
				defaultAction = undefined;
			}

			// Isolate the objects found
			const renderStateHighlightGroups: RenderStateHighlightGroups = {
				defaultAction,
				groups: [{ action: createNeutralHighlight(), objectIds: result }],
			};

			// Finally, modify the renderState if the search returns value
			view.modifyRenderState({ highlights: renderStateHighlightGroups });

			loading = false;
		}
	} catch (e) {
		console.warn(e);
	}
}
