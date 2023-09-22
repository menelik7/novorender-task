import React, { MouseEvent, useContext, useEffect, useState } from "react";
import Button from "./common/Button";
import { ButtonClass } from "../utils/ButtonClass";
import { ReadonlyVec3, ReadonlyQuat } from "gl-matrix";
import { ViewContext, ViewContextType } from "../context";
import { FlightController } from "@novorender/api";
import { Modal } from "./common/Modal";

interface PositionButton {
	id: string;
	label: string;
	className: ButtonClass;
	cameraPosition?: PositionArgs;
	storeCameraPosition?: (positionArgs: PositionArgs) => void;
}

interface PositionArgs {
	targetPosition: ReadonlyVec3;
	rotation?: ReadonlyQuat;
}

export default function CameraPosition() {
	const [showModal, setShowModal] = useState(false);
	const [flightController, setFlightController] = useState<FlightController>();
	const [initialPosition, setInitialPosition] = useState<PositionArgs>();
	const [firstCameraPosition, setFirstPosition] = useState<PositionArgs>();
	const [secondCameraPosition, setSecondPosition] = useState<PositionArgs>();
	const [thirdCameraPosition, setThirdPosition] = useState<PositionArgs>();

	const { view } = useContext(ViewContext) as ViewContextType;

	useEffect(() => {
		if (view) {
			setFlightController(view.controllers.flight);
		}

		if (flightController) {
			const { position, rotation } = flightController;
			setInitialPosition({ targetPosition: position, rotation });
		}
	}, [view, flightController]);

	const buttonClass = ButtonClass.secondary;

	const closeModal = () => {
		setShowModal(false);
	};

	const openModal = () => {
		setShowModal(true);
	};

	const actionBar = (
		<div>
			<Button buttonClass={ButtonClass.primary} onClick={closeModal}>
				Got it
			</Button>
		</div>
	);

	const modal = (
		<Modal onClose={closeModal} actionBar={actionBar}>
			<p>
				You have not yet stored a position on this button. If you would like to
				store a position that you can jump back to, fly to your desired
				position, and press shift + left-click.
			</p>
		</Modal>
	);

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
					if (label !== "Starting Position") {
						cameraPositionButtons[i].storeCameraPosition!(currentPosition);
					}

					return;
				}

				const { cameraPosition } = cameraPositionButtons[i];
				// Ascertain cameraPosition is defined and move to position
				if (cameraPosition) {
					const { targetPosition, rotation } = cameraPosition;
					flightController?.moveTo(targetPosition, 1000, rotation);

					return;
				}

				// If no position has been stored, display a modal with guidance
				openModal();
			}
		});
	};

	const renderedCameraPositionButtons = cameraPositionButtons.map(
		({ id, label, className }) => {
			return (
				<div
					key={id}
					className={`col-6 col-sm-4 ${
						id === "004" ? "col-lg-3 col-xl-2" : "col-lg-2"
					}`}
				>
					<Button
						onClick={handleClick}
						buttonClass={className}
						customClassNames="w-100"
					>
						{label}
					</Button>
				</div>
			);
		}
	);
	return (
		<div className="row pt-3 gy-2">
			{renderedCameraPositionButtons} {showModal && modal}
		</div>
	);
}
