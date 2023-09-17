import React, { MouseEvent, useState } from "react";
import Button from "./Button";
import { ButtonClass } from "./ButtonClass";

interface ButtonLabels {
	id: string;
	label: string;
}

const buttonLabels: ButtonLabels[] = [
	{
		id: "001",
		label: "Stored view 1",
	},
	{
		id: "002",
		label: "Stored view 2",
	},
	{
		id: "003",
		label: "Stored view 3",
	},
];

export default function Header() {
	const [firstPosition, setFirstPosition] = useState();
	const [secondPosition, setSecondPosition] = useState();
	const [thirdPosition, setThirdPosition] = useState();

	const handleClick = (event: MouseEvent) => {
		const target = event.target as HTMLElement;
		switch (target.innerText) {
			case "Stored view 1":
				if (event.shiftKey) {
					// setFirstPosition([x, y, z])
					console.log("Store first Position");
					break;
				}
				console.log("Fly to first position.");
				break;
			case "Stored view 2":
				if (event.shiftKey) {
					// setSecondPosition([x, y, z])
					console.log("Store second Position");
					break;
				}
				console.log("Fly to second position.");
				break;
			case "Stored view 3":
				if (event.shiftKey) {
					// setThirdPosition([x, y, z])
					console.log("Store third Position");
					break;
				}
				console.log("Fly to third position.");
				break;
			default:
				break;
		}
	};

	const renderedButtons = buttonLabels.map(({ id, label }) => {
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
	return <div className="row pt-3 gy-2">{renderedButtons}</div>;
}
