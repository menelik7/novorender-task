import React, { MouseEvent, useState } from "react";
import Button from "./Button";
import { ButtonClass } from "./ButtonClass";

interface PositionButton {
	id: string;
	label: string;
}

const positionButtons: PositionButton[] = [
	{
		id: "001",
		label: "Position 1",
	},
	{
		id: "002",
		label: "Position 2",
	},
	{
		id: "003",
		label: "Position 3",
	},
];

export default function Header() {
	const [firstPosition, setFirstPosition] = useState();
	const [secondPosition, setSecondPosition] = useState();
	const [thirdPosition, setThirdPosition] = useState();

	const handleClick = (event: MouseEvent) => {
		const target = event.target as HTMLElement;
		switch (target.innerText) {
			case "Position 1":
				if (event.shiftKey) {
					// TODO
					// Store position and rotation
					// setFirstPosition(position, rotation)
					console.log("Store position one");
					break;
				}
				// TODO
				// Move to stored position
				console.log("Fly to position one.");
				break;
			case "Position 2":
				if (event.shiftKey) {
					// TODO
					// Store position and rotation
					// setSecondPosition(position, rotation)
					console.log("Store position two");
					break;
				}
				// TODO
				// Move to stored position
				console.log("Fly to position two.");
				break;
			case "Position 3":
				if (event.shiftKey) {
					// TODO
					// Store position and rotation
					// setThirdPosition(position, rotation)
					console.log("Store position three");
					break;
				}
				// TODO
				// Move to stored position
				console.log("Fly to position three.");
				break;
			default:
				break;
		}
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
