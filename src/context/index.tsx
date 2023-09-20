import { FlightController } from "@novorender/api";
import React, { createContext, useState } from "react";
import { ReadonlyVec3, ReadonlyQuat } from "gl-matrix";

interface ProviderProps {
	children: React.ReactNode;
}

export type SearchTermContextTypes = {
	searchTerm?: string;
	updateSearchTerm: (updatedSearchTerm: string) => void;
};

export type FlightControllerContextTypes = {
	flightController?: FlightController;
	updateFlightController: (updatedFlightController: FlightController) => void;
};

export type Position = {
	targetPosition: ReadonlyVec3;
	rotation?: ReadonlyQuat;
};
export type InitialPositionContextType = {
	initialPosition?: Position;
	updateInitialPosition: (updatedPosition: Position) => void;
};

export const SearchContext = createContext<SearchTermContextTypes | null>(null);
export const FlightControllerContext =
	createContext<FlightControllerContextTypes | null>(null);
export const InitialPositionContext =
	createContext<InitialPositionContextType | null>(null);

export const Provider: React.FC<ProviderProps> = ({ children }) => {
	const [searchTerm, setSearchTerm] = useState<string>();
	const [flightController, setFlightController] = useState<FlightController>();
	const [initialPosition, setInitialPosition] = useState<Position>();

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

	const initialPositionContextToShare = {
		initialPosition,
		updateInitialPosition: (updatedInitialPosition: Position) => {
			setInitialPosition(updatedInitialPosition);
		},
	};

	return (
		<SearchContext.Provider value={searchContextToShare}>
			<FlightControllerContext.Provider value={flightControllerContextToShare}>
				<InitialPositionContext.Provider value={initialPositionContextToShare}>
					{children}
				</InitialPositionContext.Provider>
			</FlightControllerContext.Provider>
		</SearchContext.Provider>
	);
};

export default Provider;
