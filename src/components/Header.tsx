import React, { MouseEvent, useContext, useState } from "react";
import Button from "./Button";
import { ButtonClass } from "./ButtonClass";
import { ReadonlyVec3, ReadonlyQuat } from "gl-matrix";
import {
	FlightControllerContext,
	FlightControllerContextTypes,
} from "../context/search";

interface PositionButton {
	id: string;
	label: string;
	currentPosition?: PositionArgs;
	storePosition: (positionArgs: PositionArgs) => void;
}

interface PositionArgs {
	targetPosition: ReadonlyVec3;
	rotation?: ReadonlyQuat;
}

export default function Header() {
	const [firstPosition, setFirstPosition] = useState<PositionArgs>();
	const [secondPosition, setSecondPosition] = useState<PositionArgs>();
	const [thirdPosition, setThirdPosition] = useState<PositionArgs>();

	const { flightController } = useContext(
		FlightControllerContext
	) as FlightControllerContextTypes;

	const positionButtons: PositionButton[] = [
		{
			id: "001",
			label: "Position 1",
			currentPosition: firstPosition,
			storePosition: setFirstPosition,
		},
		{
			id: "002",
			label: "Position 2",
			currentPosition: secondPosition,
			storePosition: setSecondPosition,
		},
		{
			id: "003",
			label: "Position 3",
			currentPosition: thirdPosition,
			storePosition: setThirdPosition,
		},
	];

	const handleClick = (event: MouseEvent) => {
		const target = event.target as HTMLElement;

		// Store position values or moving to stored position
		positionButtons.forEach((positionButton, i) => {
			if (positionButton.label === target.innerText) {
				if (event.shiftKey) {
					// Extract position and rotation RenderState??
					// Create an object with obtained values
					const currentPosition: PositionArgs = {
						targetPosition: flightController!.position,
						rotation: flightController!.rotation,
					};
					positionButtons[i].storePosition(currentPosition);

					return;
				}

				if (positionButtons[i].currentPosition) {
					const { targetPosition, rotation } =
						positionButtons[i].currentPosition!;
					flightController?.moveTo(targetPosition, 1000, rotation);

					return;
				}

				// TODO
				// Display a modal that a position has not been stored yet
			}
		});
	};

	const renderedPositionButtons = positionButtons.map(({ id, label }) => {
		return (
			<div key={id} className="col-6 col-sm-4 col-lg-2">
				<Button
					onClick={handleClick}
					buttonClass={ButtonClass.secondary}
					customClassNames="w-100"
				>
					{label}
				</Button>
			</div>
		);
	});
	return <div className="row pt-3 gy-2">{renderedPositionButtons}</div>;
}
