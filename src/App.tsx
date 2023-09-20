import "bootstrap/dist/css/bootstrap.css";
import React, { FC, useEffect, useContext } from "react";
import {
	FlightControllerContext,
	FlightControllerContextTypes,
	InitialPositionContext,
	InitialPositionContextType,
	SearchContext,
	SearchTermContextTypes,
} from "./context";
import { main } from "./main";
import CameraPosition from "./components/CameraPosition";
import Form from "./components/Form";

const App: FC = () => {
	const { searchTerm } = useContext(SearchContext) as SearchTermContextTypes;
	const { updateFlightController } = useContext(
		FlightControllerContext
	) as FlightControllerContextTypes;
	const { updateInitialPosition } = useContext(
		InitialPositionContext
	) as InitialPositionContextType;

	useEffect(() => {
		const start = async () => {
			const canvas = document.getElementById("canvas") as HTMLCanvasElement;
			const { view, flightController } = await main(canvas, searchTerm);
			updateInitialPosition({
				targetPosition: flightController.position,
				rotation: flightController.rotation,
			});

			updateFlightController(flightController);

			await view.run();
			view.dispose();
		};

		start();
	}, [searchTerm]);

	return (
		<div className="container">
			<CameraPosition />
			<Form />
		</div>
	);
};

export default App;
