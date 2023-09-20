import "bootstrap/dist/css/bootstrap.css";
import React, { FC, useEffect, useContext } from "react";
import {
	FlightControllerContext,
	FlightControllerContextTypes,
	SearchContext,
	SearchTermContextTypes,
} from "./context/search";
import { main } from "./main";
import Header from "./components/Header";
import Form from "./components/Form";

const App: FC = () => {
	const { searchTerm } = useContext(SearchContext) as SearchTermContextTypes;
	const { updateFlightController } = useContext(
		FlightControllerContext
	) as FlightControllerContextTypes;

	useEffect(() => {
		const start = async () => {
			const canvas = document.getElementById("canvas") as HTMLCanvasElement;
			const { view, flightController } = await main(canvas, searchTerm);

			updateFlightController(flightController);

			await view.run();
			view.dispose();
		};

		start();
	}, [searchTerm]);

	return (
		<div className="container">
			<Header />
			<Form />
		</div>
	);
};

export default App;
