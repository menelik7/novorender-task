import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import Main from "./main";
import Header from "./components/Header";
import Form from "./components/Form";

export default function App() {
	return (
		<div className="container">
			<Main />
			<Header />
			<Form />
		</div>
	);
}
