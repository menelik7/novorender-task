import React, { FC, ReactNode, useEffect } from "react";
import ReactDOM from "react-dom";

interface ModalProps {
	onClose: () => void;
	actionBar: ReactNode;
	children: ReactNode;
}

export const Modal: FC<ModalProps> = ({ onClose, actionBar, children }) => {
	useEffect(() => {
		document.body.classList.add("overflow-hidden");

		return () => {
			document.body.classList.remove("overflow-hidden");
		};
	}, []);

	return ReactDOM.createPortal(
		<div>
			<div
				className="modal-wrapper position-fixed bg-secondary opacity-75"
				onClick={onClose}
			></div>
			<div className="modal-content w-auto position-fixed p-4 bg-light">
				<div className="d-flex flex-column justify-content-between h-100">
					{children}
					<div className="d-flex justify-content-end">{actionBar}</div>
				</div>
			</div>
		</div>,
		document.querySelector(".modal-container") as HTMLElement
	);
};
