import "bootstrap/dist/css/bootstrap.css";
import React, { FC, useEffect, useContext, useRef } from "react";

import CameraPosition from "./components/CameraPosition";
import Form from "./components/Form";
import { initView } from "./api/initView";
import {
	SceneDataContext,
	SceneDataContextType,
	ViewContext,
	ViewContextType,
} from "./context";

const App: FC = () => {
	const { updateView } = useContext(ViewContext) as ViewContextType;
	const { updateSceneData } = useContext(
		SceneDataContext
	) as SceneDataContextType;
	const canvasRef = useRef(null);

	const canvasDefaultStyle = {
		width: "100%",
		height: "100%",
	};

	useEffect(() => {
		const start = async () => {
			const { view, sceneData } = await initView(canvasRef.current!);
			updateView(view);
			updateSceneData(sceneData);
			view.switchCameraController("flight");
			view.run();
			view.dispose();
		};

		start();
	}, []);

	return (
		<div className="main-container">
			<canvas ref={canvasRef} id="canvas" style={canvasDefaultStyle}></canvas>
			<div className="overlay-content">
				<div className="container">
					<CameraPosition />
					<Form />
				</div>
			</div>
		</div>
	);
};

export default App;
