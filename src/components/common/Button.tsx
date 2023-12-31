import React, { FC, MouseEvent, ReactNode } from "react";
import { ButtonClass } from "../../utils/ButtonClass";

interface ButtonProps {
	buttonClass: ButtonClass;
	customClassNames?: string;
	onClick?: (event: MouseEvent) => void;
	children: ReactNode;
}

const Button: FC<ButtonProps> = ({
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
