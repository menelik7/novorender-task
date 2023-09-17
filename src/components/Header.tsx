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
					console.log("Store first Position");
					break;
				}
				console.log("Display first position.");
				break;
			case "Stored view 2":
				if (event.shiftKey) {
					console.log("Store second Position");
					break;
				}
				console.log("Display second position.");
				break;
			case "Stored view 3":
				if (event.shiftKey) {
					console.log("Store third Position");
					break;
				}
				console.log("Display third position.");
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
