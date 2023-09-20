import {
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
	try {
		const { db } = sceneData as SceneData;
		if (db) {
			const controller = new AbortController();
			const signal = controller.signal;

			// Run the searches
			// Fluffy search which will search all properties for words starting with <searchTerm>
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
