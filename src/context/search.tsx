import { FlightController } from "@novorender/api";
import React, { createContext, useState } from "react";

interface ProviderProps {
	children: React.ReactNode;
}

export type SearchTermContextTypes = {
	searchTerm: string;
	updateSearchTerm: (updatedSearchTerm: string) => void;
};

export type FlightControllerContextTypes = {
	flightController?: FlightController;
	updateFlightController: (flightController: FlightController) => void;
};

export const SearchContext = createContext<SearchTermContextTypes | null>(null);

export const FlightControllerContext =
	createContext<FlightControllerContextTypes | null>(null);

export const Provider: React.FC<ProviderProps> = ({ children }) => {
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [flightController, setFlightController] = useState<FlightController>();

	const searchContextToShare = {
		searchTerm,
		updateSearchTerm: (updatedSearchTerm: string) => {
			setSearchTerm(updatedSearchTerm);
		},
	};

	const flightControllerContextToShare = {
		flightController,
		updateFlightController: (updatedFlightController: FlightController) => {
			setFlightController(updatedFlightController);
		},
	};

	return (
		<SearchContext.Provider value={searchContextToShare}>
			<FlightControllerContext.Provider value={flightControllerContextToShare}>
				{children}
			</FlightControllerContext.Provider>
		</SearchContext.Provider>
	);
};

export default Provider;
