import React, { useState, useContext, FC } from "react";
import Button from "../components/common/Button";
import { ButtonClass } from "../utils/ButtonClass";
import {
	SceneDataContext,
	SceneDataContextType,
	ViewContext,
	ViewContextType,
} from "../context";
import { initSearch } from "../api/initSearch";

const Form: FC = () => {
	const [text, setText] = useState<string>("");
	const { view } = useContext(ViewContext) as ViewContextType;
	const { sceneData } = useContext(SceneDataContext) as SceneDataContextType;

	const handleSubmit = (event: any) => {
		event.preventDefault();

		if (text && view && sceneData) {
			initSearch(sceneData, view, text);
		}

		setText("");
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className="row pt-3">
				<div className="form-group col-sm-6 col-lg-3">
					<label htmlFor="searchText">Search the scene for objects</label>
					<input
						id="searchText"
						type="text"
						className="form-control"
						value={text}
						onChange={(e) => setText(e.target.value)}
						autoComplete="searchText"
						required
					/>
				</div>
			</div>
			<Button buttonClass={ButtonClass.primary} customClassNames="mt-2">
				Submit
			</Button>
		</form>
	);
};

export default Form;
