import { useState } from "react";
import { ButtonClass } from "../../utils/ButtonClass";
import { ReadonlyVec3, ReadonlyQuat } from "gl-matrix";

interface PositionButton {
	id: string;
	label: string;
	className: ButtonClass;
	cameraPosition?: PositionArgs;
	storeCameraPosition?: (positionArgs: PositionArgs) => void;
}

export interface PositionArgs {
	targetPosition: ReadonlyVec3;
	rotation?: ReadonlyQuat;
}

export const getCameraPositionButtonItems = () => {
	const [initialPosition, setInitialPosition] = useState<PositionArgs>();
	const [firstCameraPosition, setFirstPosition] = useState<PositionArgs>();
	const [secondCameraPosition, setSecondPosition] = useState<PositionArgs>();
	const [thirdCameraPosition, setThirdPosition] = useState<PositionArgs>();

	const buttonClass = ButtonClass.secondary;

	const cameraPositionButtons: PositionButton[] = [
		{
			id: "001",
			label: "Position 1",
			className: buttonClass,
			cameraPosition: firstCameraPosition,
			storeCameraPosition: setFirstPosition,
		},
		{
			id: "002",
			label: "Position 2",
			className: buttonClass,
			cameraPosition: secondCameraPosition,
			storeCameraPosition: setSecondPosition,
		},
		{
			id: "003",
			label: "Position 3",
			className: buttonClass,
			cameraPosition: thirdCameraPosition,
			storeCameraPosition: setThirdPosition,
		},
		{
			id: "004",
			label: "Starting Position",
			className: ButtonClass.warning,
			cameraPosition: initialPosition,
		},
	];

	return {
		cameraPositionButtons,
		setInitialPosition,
	};
};
