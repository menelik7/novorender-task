import "bootstrap/dist/css/bootstrap.css";
import React, { FC, useEffect, useRef, useState } from "react";

import CameraPosition from "./components/camera-position/CameraPosition";
import SearchForm from "./components/SearchForm";
import { initView } from "./api/initView";
import { FlightController, View } from "@novorender/api";
import { SceneData } from "@novorender/data-js-api";

const App: FC = () => {
	const [view, setView] = useState<View | null>(null);
	const [sceneData, setSceneData] = useState<SceneData | null>(null);
	const [flightController, setFlightController] =
		useState<FlightController | null>(null);
	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	useEffect(() => {
		const start = async () => {
			if (!canvasRef.current) {
				return;
			}

			const { view, sceneData, flightController } = await initView(
				canvasRef.current
			);

			setView(view);
			setSceneData(sceneData);
			setFlightController(flightController);

			view.run();
		};

		start();
	}, []);

	const canvasDefaultStyle = {
		width: "100%",
		height: "100%",
	};

	return (
		<div className="main-container">
			<canvas ref={canvasRef} id="canvas" style={canvasDefaultStyle}></canvas>
			<div className="overlay-content">
				<div className="container">
					<CameraPosition flightController={flightController} />
					<SearchForm view={view} sceneData={sceneData} />
				</div>
			</div>
		</div>
	);
};

export default App;
