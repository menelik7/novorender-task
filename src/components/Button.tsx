import React, { MouseEvent } from "react";
import { ButtonClass } from "./ButtonClass";

interface ButtonClassProp {
	buttonClass: ButtonClass;
	customClassNames?: string;
	onClick?: (event: MouseEvent) => void;
	children: React.ReactNode;
}

const Button: React.FC<ButtonClassProp> = ({
	buttonClass,
	customClassNames,
	onClick,
	children,
}) => {
	return (
		<button
			className={`btn ${buttonClass} ${customClassNames}`}
			onClick={onClick}
		>
			{children}
		</button>
	);
};

export default Button;
