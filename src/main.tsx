import "./App.css";
import React from "react";
import { createRoot } from "react-dom/client";

import Provider from "./context";
import App from "./App";

const el = document.getElementById("root") as HTMLElement;
const root = createRoot(el);

root.render(
	<Provider>
		<App />
	</Provider>
);
