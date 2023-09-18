import "bootstrap/dist/css/bootstrap.css";
import React, { FC, useEffect, useContext } from "react";
import { SearchContext, SearchTermContextTypes } from "./context/search";
import { main } from "./main";
import Header from "./components/Header";
import Form from "./components/Form";

const App: FC = () => {
	const { searchTerm } = useContext(SearchContext) as SearchTermContextTypes;

	useEffect(() => {
		const canvas = document.getElementById("canvas") as HTMLCanvasElement;
		main(canvas, searchTerm);
	}, [searchTerm]);

	return (
		<div className="container">
			<Header />
			<Form />
		</div>
	);
};

export default App;
