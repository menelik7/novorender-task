import React, { useState, useContext } from "react";
import { SearchContext, SearchTermContextTypes } from "../context";
import Button from "./Button";
import { ButtonClass } from "./ButtonClass";

const Form: React.FC = () => {
	const [text, setText] = useState<string>("");
	const { updateSearchTerm } = useContext(
		SearchContext
	) as SearchTermContextTypes;

	const handleSubmit = (event: any) => {
		event.preventDefault();

		if (text) updateSearchTerm(text);
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
