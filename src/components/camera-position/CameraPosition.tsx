import React, { FC, MouseEvent, useEffect, useState } from "react";
import Button from "../common/Button";
import { ButtonClass } from "../../utils/ButtonClass";
import { FlightController } from "@novorender/api";
import { Modal } from "../common/Modal";
import {
	PositionArgs,
	getCameraPositionButtonItems,
} from "./cameraPositionButtonItems";

interface CameraPositionProp {
	flightController: FlightController | null;
}

const CameraPosition: FC<CameraPositionProp> = ({ flightController }) => {
	const [showModal, setShowModal] = useState(false);
	const { cameraPositionButtons, setInitialPosition } =
		getCameraPositionButtonItems();

	useEffect(() => {
		if (flightController) {
			const { position, rotation } = flightController;
			setInitialPosition({ targetPosition: position, rotation });
		}
	}, [flightController]);

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

	const handleClick = async (event: MouseEvent) => {
		const target = event.target as HTMLElement;

		cameraPositionButtons.forEach(({ label, id }, i) => {
			if (label === target.innerText && flightController) {
				if (event.shiftKey && id !== "004") {
					// Create an object and assign the position and rotation
					// values destructured from flightController
					const currentPosition: PositionArgs = {
						targetPosition: flightController.position,
						rotation: flightController.rotation,
					};
					// Store values on the relevant position button
					cameraPositionButtons[i].storeCameraPosition!(currentPosition);

					return;
				}

				const { cameraPosition } = cameraPositionButtons[i];
				// Ascertain cameraPosition is defined and move to position
				if (cameraPosition) {
					const { targetPosition, rotation } = cameraPosition;
					flightController.moveTo(targetPosition, 1000, rotation);

					return;
				}

				// If no position has been stored, display a modal for guidance
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
};

export default CameraPosition;
