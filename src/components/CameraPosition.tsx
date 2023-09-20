import React, { MouseEvent, useContext, useState } from "react";
import Button from "./Button";
import { ButtonClass } from "./ButtonClass";
import { ReadonlyVec3, ReadonlyQuat } from "gl-matrix";
import {
	FlightControllerContext,
	FlightControllerContextTypes,
	InitialPositionContext,
	InitialPositionContextType,
} from "../context";

interface PositionButton {
	id: string;
	label: string;
	cameraPosition?: PositionArgs;
	storeCameraPosition: (positionArgs: PositionArgs) => void;
}

interface PositionArgs {
	targetPosition: ReadonlyVec3;
	rotation?: ReadonlyQuat;
}

export default function CameraPosition() {
	const [firstCameraPosition, setFirstPosition] = useState<PositionArgs>();
	const [secondCameraPosition, setSecondPosition] = useState<PositionArgs>();
	const [thirdCameraPosition, setThirdPosition] = useState<PositionArgs>();

	const { flightController } = useContext(
		FlightControllerContext
	) as FlightControllerContextTypes;
	const { initialPosition } = useContext(
		InitialPositionContext
	) as InitialPositionContextType;

	const cameraPositionButtons: PositionButton[] = [
		{
			id: "001",
			label: "Position 1",
			cameraPosition: firstCameraPosition,
			storeCameraPosition: setFirstPosition,
		},
		{
			id: "002",
			label: "Position 2",
			cameraPosition: secondCameraPosition,
			storeCameraPosition: setSecondPosition,
		},
		{
			id: "003",
			label: "Position 3",
			cameraPosition: thirdCameraPosition,
			storeCameraPosition: setThirdPosition,
		},
	];

	const handleClick = (event: MouseEvent) => {
		const target = event.target as HTMLElement;

		// Store position values or move to stored position
		cameraPositionButtons.forEach((cameraPositionButton, i) => {
			if (cameraPositionButton.label === target.innerText) {
				if (event.shiftKey) {
					// Extract position and rotation RenderState??
					// Create an object with obtained values
					const currentPosition: PositionArgs = {
						targetPosition: flightController!.position,
						rotation: flightController!.rotation,
					};
					cameraPositionButtons[i].storeCameraPosition(currentPosition);

					return;
				}

				const { cameraPosition } = cameraPositionButtons[i];
				// Ascertain cameraPosition is defined and move to position
				if (cameraPosition) {
					const { targetPosition, rotation } = cameraPosition;
					flightController?.moveTo(targetPosition, 1000, rotation);

					return;
				}

				// If no position has been stored, jump back to the initial position
				if (flightController && initialPosition) {
					const { targetPosition, rotation } = initialPosition;
					flightController.moveTo(targetPosition, 1000, rotation);
				}
			}
		});
	};

	const renderedCameraPositionButtons = cameraPositionButtons.map(
		({ id, label }) => {
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
		}
	);
	return <div className="row pt-3 gy-2">{renderedCameraPositionButtons}</div>;
}
