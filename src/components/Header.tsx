import React, { MouseEvent, useState } from "react";
import Button from "./Button";
import { ButtonClass } from "./ButtonClass";
import { ReadonlyVec3, ReadonlyQuat } from "gl-matrix";
import { FlightController } from "@novorender/api";

interface PositionButton {
	id: string;
	label: string;
	storePosition: (positionArgs: PositionArgs) => void;
	// moveToPosition: (positionArgs: PositionArgs) => void;
}

interface PositionArgs {
	position?: ReadonlyVec3;
	rotation?: ReadonlyQuat;
}

export default function Header() {
	const [firstPosition, setFirstPosition] = useState<PositionArgs>({});
	const [secondPosition, setSecondPosition] = useState<PositionArgs>({});
	const [thirdPosition, setThirdPosition] = useState<PositionArgs>({});

	const positionButtons: PositionButton[] = [
		{
			id: "001",
			label: "Position 1",
			storePosition: setFirstPosition,
			// TODO
			// moveToPosition:
		},
		{
			id: "002",
			label: "Position 2",
			storePosition: setSecondPosition,
			// TODO
			// moveToPosition:
		},
		{
			id: "003",
			label: "Position 3",
			storePosition: setThirdPosition,
			// TODO
			// moveToPosition:
		},
	];

	const handleClick = (event: MouseEvent) => {
		const target = event.target as HTMLElement;

		// Store position values
		positionButtons.forEach((positionButton, i) => {
			if (positionButton.label === target.innerText) {
				if (event.shiftKey) {
					console.log("Storing", positionButtons[i].label);
					// TODO
					// Extract position and rotation RenderState??
					// Create an object with obtained values
					// const currentPosition: PositionArgs = {
					// 	position: [x, y, z],
					// 	rotation: [a, b, c, d]
					// }
					//  positionButtons[i].storePosition(position)

					return;
				}

				console.log("Moving to", positionButtons[i].label);
				// TODO
				// Move to stored position camera moveTo()
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
