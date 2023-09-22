import { View } from "@novorender/api";
import { SceneData } from "@novorender/data-js-api";
import React, { FC, createContext, useState } from "react";

interface ProviderProps {
	children: React.ReactNode;
}

export type ViewContextType = {
	view?: View;
	updateView: (view: View) => void;
};

export type SceneDataContextType = {
	sceneData?: SceneData;
	updateSceneData: (sceneData: SceneData) => void;
};

export const ViewContext = createContext<ViewContextType | null>(null);

export const SceneDataContext = createContext<SceneDataContextType | null>(
	null
);

const Provider: FC<ProviderProps> = ({ children }) => {
	const [view, setView] = useState<View>();
	const [sceneData, setSceneData] = useState<SceneData>();

	const viewContextToShare = {
		view,
		updateView: (updatedView: View) => setView(updatedView),
	};

	const sceneDataContextToShare = {
		sceneData,
		updateSceneData: (updatedSceneData: SceneData) =>
			setSceneData(updatedSceneData),
	};

	return (
		<ViewContext.Provider value={viewContextToShare}>
			<SceneDataContext.Provider value={sceneDataContextToShare}>
				{children}
			</SceneDataContext.Provider>
		</ViewContext.Provider>
	);
};

export default Provider;
