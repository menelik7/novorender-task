import React, { useState, FC, FormEvent } from "react";
import Button from "../components/common/Button";
import { ButtonClass } from "../utils/ButtonClass";
import { initSearch } from "../api/initSearch";
import { View } from "@novorender/api";
import { SceneData } from "@novorender/data-js-api";

interface SearchFormProps {
	view: View | null;
	sceneData: SceneData | null;
}

const Form: FC<SearchFormProps> = ({ view, sceneData }) => {
	const [text, setText] = useState<string>("");

	const handleSubmit = (event: FormEvent) => {
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
