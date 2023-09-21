import React, { MouseEvent, useContext, useEffect, useState } from "react";
import Button from "./Button";
import { ButtonClass } from "./ButtonClass";
import { ReadonlyVec3, ReadonlyQuat } from "gl-matrix";
import { ViewContext, ViewContextType } from "../context";
import { FlightController } from "@novorender/api";

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
	const [flightController, setFlightController] = useState<FlightController>();
	const [initialPosition, setInitialPosition] = useState<PositionArgs>();
	const [firstCameraPosition, setFirstPosition] = useState<PositionArgs>();
	const [secondCameraPosition, setSecondPosition] = useState<PositionArgs>();
	const [thirdCameraPosition, setThirdPosition] = useState<PositionArgs>();

	const { view } = useContext(ViewContext) as ViewContextType;

	useEffect(() => {
		if (view) setFlightController(view.controllers.flight);
		if (flightController) {
			const { position, rotation } = flightController;
			setInitialPosition({ targetPosition: position, rotation });
		}
	}, [view, flightController]);

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

	const handleClick = async (event: MouseEvent) => {
		const target = event.target as HTMLElement;

		// Store position values or move to stored position
		cameraPositionButtons.forEach(({ label }, i) => {
			if (label === target.innerText) {
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
