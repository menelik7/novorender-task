import React, { MouseEvent } from "react";
import { ButtonClass } from "./ButtonClass";
import { ColumnWidth } from "./ColumnWidth";

interface ButtonClassProp {
	buttonClass: ButtonClass;
	columnWidth?: ColumnWidth;
	customClassNames?: string;
	onClick?: (event: MouseEvent) => void;
	children: React.ReactNode;
}

const Button: React.FC<ButtonClassProp> = ({
	buttonClass,
	columnWidth,
	customClassNames,
	onClick,
	children,
}) => {
	return (
		<button
			className={`btn ${buttonClass} ${columnWidth} ${customClassNames}`}
			onClick={onClick}
		>
			{children}
		</button>
	);
};

export default Button;
